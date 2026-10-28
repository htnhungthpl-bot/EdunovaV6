import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface GoogleSheetsConfig {
  spreadsheetId: string | null;
  spreadsheetUrl: string | null;
  scriptUrl: string | null;
  connected: boolean;
  lastSyncTime: string | null;
  syncError: string | null;
  mode: 'oauth' | 'apps_script' | 'unconfigured';
}

export interface SheetRowRecord {
  [column: string]: any;
}

export const SHEET_SCHEMAS = {
  USERS: [
    'user_id',
    'full_name',
    'email',
    'role',
    'school_id',
    'class_id',
    'auth_provider',
    'status',
    'created_at',
    'updated_at',
    'last_login_at',
  ],
  SCHOOLS: [
    'school_id',
    'school_name',
    'status',
    'created_at',
    'updated_at',
  ],
  CLASSES: [
    'class_id',
    'class_name',
    'school_id',
    'teacher_ids',
    'school_year',
    'status',
    'created_at',
    'updated_at',
  ],
  STUDENT_PROFILES: [
    'student_id',
    'user_id',
    'full_name',
    'school_id',
    'class_id',
    'student_code',
    'status',
    'created_at',
    'updated_at',
  ],
  POSTS: [
    'post_id',
    'student_id',
    'author_name',
    'school_id',
    'class_id',
    'title',
    'content',
    'category',
    'status',
    'visibility',
    'teacher_feedback',
    'created_at',
    'updated_at',
    'published_at',
  ],
  POST_HISTORY: [
    'history_id',
    'post_id',
    'actor_id',
    'action',
    'old_status',
    'new_status',
    'note',
    'created_at',
  ],
  SYSTEM_LOGS: [
    'log_id',
    'actor_id',
    'action',
    'resource_type',
    'resource_id',
    'result',
    'created_at',
  ],
};

const CONFIG_PATH = path.resolve(__dirname, '../../data/sheets-config.json');

export class GoogleSheetsService {
  private config: GoogleSheetsConfig = {
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || null,
    spreadsheetUrl: null,
    scriptUrl: process.env.GOOGLE_SHEETS_SCRIPT_URL || null,
    connected: false,
    lastSyncTime: null,
    syncError: null,
    mode: 'unconfigured',
  };

  private activeGoogleToken: string | null = null;
  private tokenExpiresAt: number = 0;

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    try {
      if (fs.existsSync(CONFIG_PATH)) {
        const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
        const parsed = JSON.parse(raw);
        this.config = {
          ...this.config,
          ...parsed,
          spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || parsed.spreadsheetId || null,
          scriptUrl: process.env.GOOGLE_SHEETS_SCRIPT_URL || parsed.scriptUrl || null,
        };
        if (this.config.spreadsheetId) {
          this.config.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${this.config.spreadsheetId}`;
        }
      }
    } catch (err) {
      console.error('[GoogleSheetsService] Error loading sheets-config.json:', err);
    }
  }

  private saveConfig() {
    try {
      const dir = path.dirname(CONFIG_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(this.config, null, 2), 'utf-8');
    } catch (err) {
      console.error('[GoogleSheetsService] Error saving sheets-config.json:', err);
    }
  }

  public setAccessToken(token: string, expiresInSeconds: number = 3600) {
    this.activeGoogleToken = token;
    this.tokenExpiresAt = Date.now() + expiresInSeconds * 1000;
    this.config.connected = true;
    this.config.syncError = null;
    this.config.mode = 'oauth';
    this.saveConfig();
    console.log('[GoogleSheetsService] Active Google OAuth Access Token updated.');
  }

  public getAccessToken(): string | null {
    if (this.activeGoogleToken && Date.now() < this.tokenExpiresAt - 30000) {
      return this.activeGoogleToken;
    }
    return this.activeGoogleToken;
  }

  public getStatus(): GoogleSheetsConfig & { hasToken: boolean; sheetSchemas: typeof SHEET_SCHEMAS } {
    return {
      ...this.config,
      hasToken: !!this.activeGoogleToken,
      sheetSchemas: SHEET_SCHEMAS,
    };
  }

  public updateManualConfig(spreadsheetId?: string, scriptUrl?: string): GoogleSheetsConfig {
    if (spreadsheetId !== undefined) {
      const cleanId = spreadsheetId.trim();
      // Extract from full google sheets URL if user pasted the entire URL
      const match = cleanId.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
      this.config.spreadsheetId = match ? match[1] : cleanId || null;
      if (this.config.spreadsheetId) {
        this.config.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${this.config.spreadsheetId}`;
      } else {
        this.config.spreadsheetUrl = null;
      }
    }
    if (scriptUrl !== undefined) {
      this.config.scriptUrl = scriptUrl.trim() || null;
    }
    if (this.config.scriptUrl) {
      this.config.mode = 'apps_script';
      this.config.connected = true;
    } else if (this.activeGoogleToken && this.config.spreadsheetId) {
      this.config.mode = 'oauth';
      this.config.connected = true;
    }
    this.config.syncError = null;
    this.saveConfig();
    return this.config;
  }

  /**
   * Automatically create or ensure EDUNOVA_DATABASE spreadsheet with all 7 sheets
   */
  public async ensureSpreadsheet(tokenOverride?: string | null): Promise<{ success: boolean; spreadsheetId?: string | null; spreadsheetUrl?: string | null; error?: string | null }> {
    const token = tokenOverride || this.getAccessToken();

    // If Google Apps Script is configured
    if (this.config.scriptUrl && !token) {
      return this.ensureViaAppsScript();
    }

    if (!token) {
      return {
        success: false,
        error: 'Chưa có Google Access Token. Giáo viên hoặc Quản trị viên vui lòng bấm "Đăng nhập Google" để cấp quyền.',
      };
    }

    try {
      // If we already have a spreadsheet ID, verify it exists and verify all 7 sheets
      if (this.config.spreadsheetId) {
        const verifyRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (verifyRes.ok) {
          const sheetData = await verifyRes.json();
          await this.ensureSheetTabsAndHeaders(this.config.spreadsheetId, sheetData, token);
          this.config.connected = true;
          this.config.syncError = null;
          this.config.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${this.config.spreadsheetId}`;
          this.saveConfig();
          return {
            success: true,
            spreadsheetId: this.config.spreadsheetId,
            spreadsheetUrl: this.config.spreadsheetUrl,
          };
        }
      }

      // Create new EDUNOVA_DATABASE spreadsheet
      console.log('[GoogleSheetsService] Creating new Google Spreadsheet: EDUNOVA_DATABASE...');
      const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            title: 'EDUNOVA_DATABASE',
          },
          sheets: Object.keys(SHEET_SCHEMAS).map(sheetName => ({
            properties: { title: sheetName },
          })),
        }),
      });

      if (!createRes.ok) {
        const errText = await createRes.text();
        throw new Error(`Google API error (${createRes.status}): ${errText}`);
      }

      const created = await createRes.json();
      const newSpreadsheetId = created.spreadsheetId;
      this.config.spreadsheetId = newSpreadsheetId;
      this.config.spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${newSpreadsheetId}`;
      this.config.connected = true;
      this.config.syncError = null;
      this.config.mode = 'oauth';
      this.saveConfig();

      // Write column headers for all 7 sheets
      await this.writeAllHeaders(newSpreadsheetId, token);

      return {
        success: true,
        spreadsheetId: newSpreadsheetId,
        spreadsheetUrl: this.config.spreadsheetUrl,
      };
    } catch (err: any) {
      console.error('[GoogleSheetsService] ensureSpreadsheet error:', err);
      this.config.connected = false;
      this.config.syncError = err.message || 'Lỗi kết nối Google Sheets';
      this.saveConfig();
      return { success: false, error: this.config.syncError };
    }
  }

  private async ensureViaAppsScript(): Promise<{ success: boolean; spreadsheetId?: string | null; spreadsheetUrl?: string | null; error?: string | null }> {
    try {
      const res = await fetch(this.config.scriptUrl!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'initSpreadsheet' }),
      });
      const data = await res.json();
      if (data.success && data.spreadsheetId) {
        this.config.spreadsheetId = data.spreadsheetId;
        this.config.spreadsheetUrl = data.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${data.spreadsheetId}`;
        this.config.connected = true;
        this.config.syncError = null;
        this.config.mode = 'apps_script';
        this.saveConfig();
        return { success: true, spreadsheetId: data.spreadsheetId, spreadsheetUrl: this.config.spreadsheetUrl };
      }
      return { success: false, error: data.error || 'Apps Script khởi tạo thất bại' };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }

  private async ensureSheetTabsAndHeaders(spreadsheetId: string, sheetMetadata: any, token: string) {
    const existingTitles: string[] = (sheetMetadata.sheets || []).map((s: any) => s.properties?.title);
    const requiredSheets = Object.keys(SHEET_SCHEMAS);
    const missingSheets = requiredSheets.filter(name => !existingTitles.includes(name));

    if (missingSheets.length > 0) {
      console.log(`[GoogleSheetsService] Adding missing sheets: ${missingSheets.join(', ')}`);
      const addRequests = missingSheets.map(title => ({
        addSheet: { properties: { title } },
      }));

      await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requests: addRequests }),
      });
    }

    // Write headers for all sheets
    await this.writeAllHeaders(spreadsheetId, token);
  }

  private async writeAllHeaders(spreadsheetId: string, token: string) {
    const dataUpdates: Array<{ range: string; values: string[][] }> = [];

    for (const [sheetName, columns] of Object.entries(SHEET_SCHEMAS)) {
      dataUpdates.push({
        range: `${sheetName}!A1:${String.fromCharCode(64 + columns.length)}1`,
        values: [columns],
      });
    }

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valueInputOption: 'USER_ENTERED',
        data: dataUpdates,
      }),
    });
  }

  /**
   * Append a single row to a specific sheet
   */
  public async appendRow(sheetName: keyof typeof SHEET_SCHEMAS, rowData: Record<string, any>, tokenOverride?: string | null): Promise<boolean> {
    const token = tokenOverride || this.getAccessToken();
    const columns = SHEET_SCHEMAS[sheetName];
    if (!columns) return false;

    const rowValues = columns.map(col => {
      const val = rowData[col] !== undefined ? rowData[col] : (rowData[this.camelCase(col)] ?? '');
      if (typeof val === 'object' && val !== null) return JSON.stringify(val);
      return val === null || val === undefined ? '' : String(val);
    });

    // Strategy 1: Google Apps Script Web App
    if (this.config.scriptUrl && !token) {
      try {
        await fetch(this.config.scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'appendRow',
            sheet: sheetName,
            row: rowValues,
          }),
        });
        return true;
      } catch (err) {
        console.warn(`[GoogleSheetsService] Apps Script appendRow to ${sheetName} failed:`, err);
      }
    }

    // Strategy 2: Google Sheets API v4 with Bearer OAuth Token
    if (this.config.spreadsheetId && token) {
      try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${sheetName}!A:A:append?valueInputOption=USER_ENTERED`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: [rowValues],
          }),
        });
        if (res.ok) {
          this.config.connected = true;
          this.config.lastSyncTime = new Date().toISOString();
          return true;
        } else {
          const txt = await res.text();
          console.warn(`[GoogleSheetsService] appendRow ${sheetName} status ${res.status}:`, txt);
        }
      } catch (err) {
        console.warn(`[GoogleSheetsService] appendRow error:`, err);
      }
    }

    return false;
  }

  /**
   * Update an existing row in a sheet matching an ID column
   */
  public async updateRow(
    sheetName: keyof typeof SHEET_SCHEMAS,
    idColumn: string,
    idValue: string,
    rowData: Record<string, any>,
    tokenOverride?: string | null
  ): Promise<boolean> {
    const token = tokenOverride || this.getAccessToken();
    const columns = SHEET_SCHEMAS[sheetName];
    if (!columns || !this.config.spreadsheetId || !token) {
      // Fallback: append if cannot find / update
      return this.appendRow(sheetName, rowData, tokenOverride);
    }

    try {
      // Read column values to find the matching row
      const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${sheetName}!A:Z`;
      const readRes = await fetch(readUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!readRes.ok) return this.appendRow(sheetName, rowData, tokenOverride);

      const data = await readRes.json();
      const rows: string[][] = data.values || [];
      if (rows.length <= 1) return this.appendRow(sheetName, rowData, tokenOverride);

      const headerRow = rows[0];
      const idColIdx = headerRow.indexOf(idColumn);
      if (idColIdx === -1) return this.appendRow(sheetName, rowData, tokenOverride);

      let targetRowIndex = -1;
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][idColIdx] === idValue) {
          targetRowIndex = i + 1; // 1-indexed in Sheets
          break;
        }
      }

      if (targetRowIndex === -1) {
        // Row doesn't exist yet, append it
        return this.appendRow(sheetName, rowData, tokenOverride);
      }

      const rowValues = columns.map(col => {
        const val = rowData[col] !== undefined ? rowData[col] : (rowData[this.camelCase(col)] ?? '');
        if (typeof val === 'object' && val !== null) return JSON.stringify(val);
        return val === null || val === undefined ? '' : String(val);
      });

      const endColLetter = String.fromCharCode(64 + columns.length);
      const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${sheetName}!A${targetRowIndex}:${endColLetter}${targetRowIndex}?valueInputOption=USER_ENTERED`;
      const updateRes = await fetch(updateUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [rowValues] }),
      });

      if (updateRes.ok) {
        this.config.lastSyncTime = new Date().toISOString();
        return true;
      }
    } catch (err) {
      console.warn(`[GoogleSheetsService] updateRow error in ${sheetName}:`, err);
    }

    return false;
  }

  /**
   * Sync all database tables to Google Sheets in a single coordinated batch
   */
  public async syncAllDatabaseToSheets(db: any, tokenOverride?: string | null): Promise<{ success: boolean; details: Record<string, number>; error?: string | null }> {
    const token = tokenOverride || this.getAccessToken();
    if (!token && !this.config.scriptUrl) {
      return { success: false, details: {}, error: 'Chưa có thông tin xác thực Google Sheets.' };
    }

    // Ensure spreadsheet exists first
    const initRes = await this.ensureSpreadsheet(token);
    if (!initRes.success || !this.config.spreadsheetId) {
      return { success: false, details: {}, error: initRes.error || 'Không thể tạo hoặc mở Google Spreadsheet' };
    }

    const spreadsheetId = this.config.spreadsheetId;
    const details: Record<string, number> = {};

    try {
      const batchData: Array<{ range: string; values: string[][] }> = [];

      // 1. USERS
      const usersRows = (db.users || []).map((u: any) => [
        u.id || '',
        u.fullName || '',
        u.email || '',
        (u.role || '').toUpperCase(),
        u.schoolId || 'school-kimlien-a',
        u.classId || 'class-4a8',
        u.authProvider || (u.email ? 'GOOGLE' : 'INTERNAL'),
        (u.status || 'ACTIVE').toUpperCase(),
        u.createdAt || '',
        u.updatedAt || '',
        u.lastLoginAt || '',
      ]);
      batchData.push({
        range: `USERS!A1:K${usersRows.length + 1}`,
        values: [SHEET_SCHEMAS.USERS, ...usersRows],
      });
      details.USERS = usersRows.length;

      // 2. SCHOOLS
      const schoolsRows = (db.schools || []).map((s: any) => [
        s.id || '',
        s.name || '',
        'ACTIVE',
        s.createdAt || '',
        s.updatedAt || s.createdAt || '',
      ]);
      batchData.push({
        range: `SCHOOLS!A1:E${schoolsRows.length + 1}`,
        values: [SHEET_SCHEMAS.SCHOOLS, ...schoolsRows],
      });
      details.SCHOOLS = schoolsRows.length;

      // 3. CLASSES
      const classesRows = (db.classes || []).map((c: any) => [
        c.id || '',
        c.name || '',
        c.schoolId || 'school-kimlien-a',
        Array.isArray(c.teacherIds) ? c.teacherIds.join(',') : (c.teacherIds || ''),
        '2026-2027',
        'ACTIVE',
        c.createdAt || '',
        c.updatedAt || c.createdAt || '',
      ]);
      batchData.push({
        range: `CLASSES!A1:H${classesRows.length + 1}`,
        values: [SHEET_SCHEMAS.CLASSES, ...classesRows],
      });
      details.CLASSES = classesRows.length;

      // 4. STUDENT_PROFILES
      const studentUsers = (db.users || []).filter((u: any) => u.role === 'student');
      const studentProfilesRows = studentUsers.map((s: any) => [
        s.id || '',
        s.id || '',
        s.fullName || '',
        s.schoolId || 'school-kimlien-a',
        s.classId || 'class-4a8',
        s.studentCode || '',
        (s.status || 'ACTIVE').toUpperCase(),
        s.createdAt || '',
        s.updatedAt || '',
      ]);
      batchData.push({
        range: `STUDENT_PROFILES!A1:I${studentProfilesRows.length + 1}`,
        values: [SHEET_SCHEMAS.STUDENT_PROFILES, ...studentProfilesRows],
      });
      details.STUDENT_PROFILES = studentProfilesRows.length;

      // 5. POSTS
      const postsList = db.posts || [];
      const postsRows = postsList.map((p: any) => [
        p.id || '',
        p.studentId || '',
        p.authorName || '',
        p.schoolId || 'school-kimlien-a',
        p.classId || 'class-4a8',
        p.title || '',
        p.content || '',
        p.category || 'Văn miêu tả',
        (p.status || 'SUBMITTED').toUpperCase(),
        (p.visibility || 'CLASS').toUpperCase(),
        p.teacherFeedback || '',
        p.createdAt || '',
        p.updatedAt || '',
        p.publishedAt || '',
      ]);
      batchData.push({
        range: `POSTS!A1:N${postsRows.length + 1}`,
        values: [SHEET_SCHEMAS.POSTS, ...postsRows],
      });
      details.POSTS = postsRows.length;

      // 6. POST_HISTORY
      const historyList = db.postHistory || [];
      const historyRows = historyList.map((h: any) => [
        h.id || '',
        h.postId || '',
        h.actorId || '',
        h.action || '',
        h.oldStatus || '',
        h.newStatus || '',
        h.note || '',
        h.createdAt || '',
      ]);
      batchData.push({
        range: `POST_HISTORY!A1:H${historyRows.length + 1}`,
        values: [SHEET_SCHEMAS.POST_HISTORY, ...historyRows],
      });
      details.POST_HISTORY = historyRows.length;

      // 7. SYSTEM_LOGS
      const logsList = (db.auditLogs || []).slice(0, 100);
      const logsRows = logsList.map((l: any) => [
        l.id || '',
        l.userId || '',
        l.action || '',
        'SYSTEM',
        l.details || '',
        'SUCCESS',
        l.timestamp || '',
      ]);
      batchData.push({
        range: `SYSTEM_LOGS!A1:G${logsRows.length + 1}`,
        values: [SHEET_SCHEMAS.SYSTEM_LOGS, ...logsRows],
      });
      details.SYSTEM_LOGS = logsRows.length;

      // Send batch update to Google Sheets
      const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          valueInputOption: 'USER_ENTERED',
          data: batchData,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Google Sheets batchUpdate error (${res.status}): ${errorText}`);
      }

      this.config.connected = true;
      this.config.lastSyncTime = new Date().toISOString();
      this.config.syncError = null;
      this.saveConfig();

      return {
        success: true,
        details,
      };
    } catch (err: any) {
      console.error('[GoogleSheetsService] syncAllDatabaseToSheets error:', err);
      this.config.syncError = err.message || 'Lỗi đồng bộ dữ liệu sang Google Sheets';
      this.saveConfig();
      return { success: false, details, error: this.config.syncError };
    }
  }

  private camelCase(str: string): string {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
  }
}

export const googleSheetsService = new GoogleSheetsService();
