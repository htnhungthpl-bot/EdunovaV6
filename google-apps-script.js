/**
 * =========================================================================
 * GOOGLE APPS SCRIPT WEB APP DÀNH CHO EDUNOVA DATABASE (TÙY CHỌN BỔ TRỢ)
 * =========================================================================
 * Nếu bạn muốn triển khai Google Apps Script làm webhook trung gian ghi dữ liệu:
 * 1. Mở https://script.google.com/ và tạo một dự án mới tên "EDUNOVA_DATABASE_SYNC".
 * 2. Dán toàn bộ mã nguồn bên dưới vào file Code.gs.
 * 3. Thay SPREADSHEET_ID bên dưới bằng ID bảng tính của bạn (nếu đã có), hoặc để trống để tự tạo.
 * 4. Bấm "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment) -> Loại "Ứng dụng web" (Web app).
 * 5. Chọn:
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Chủ sở hữu bảng tính).
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone).
 * 6. Sao chép URL ứng dụng web (dạng https://script.google.com/macros/s/.../exec)
 *    và dán vào phần "Cấu hình Google Sheets" trong giao diện Quản trị/Giáo viên của EDUNOVA.
 */

const SPREADSHEET_NAME = "EDUNOVA_DATABASE";
const API_SECRET = "edunova-sheets-secure-key-2026"; // Mã bảo vệ chống truy cập trái phép

const SCHEMAS = {
  USERS: [
    "user_id", "full_name", "email", "role", "school_id", "class_id",
    "auth_provider", "status", "created_at", "updated_at", "last_login_at"
  ],
  SCHOOLS: [
    "school_id", "school_name", "status", "created_at", "updated_at"
  ],
  CLASSES: [
    "class_id", "class_name", "school_id", "teacher_ids", "school_year",
    "status", "created_at", "updated_at"
  ],
  STUDENT_PROFILES: [
    "student_id", "user_id", "full_name", "school_id", "class_id",
    "student_code", "status", "created_at", "updated_at"
  ],
  POSTS: [
    "post_id", "student_id", "author_name", "school_id", "class_id",
    "title", "content", "category", "status", "visibility",
    "teacher_feedback", "created_at", "updated_at", "published_at"
  ],
  POST_HISTORY: [
    "history_id", "post_id", "actor_id", "action", "old_status",
    "new_status", "note", "created_at"
  ],
  SYSTEM_LOGS: [
    "log_id", "actor_id", "action", "resource_type", "resource_id",
    "result", "created_at"
  ]
};

function getOrCreateSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  let spreadsheetId = props.getProperty("SPREADSHEET_ID");
  let ss;

  if (spreadsheetId) {
    try {
      ss = SpreadsheetApp.openById(spreadsheetId);
    } catch (e) {
      ss = null;
    }
  }

  if (!ss) {
    ss = SpreadsheetApp.create(SPREADSHEET_NAME);
    spreadsheetId = ss.getId();
    props.setProperty("SPREADSHEET_ID", spreadsheetId);

    // Tạo các trang tính
    for (const sheetName in SCHEMAS) {
      let sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        sheet = ss.insertSheet(sheetName);
      }
      // Ghi dòng tiêu đề
      sheet.getRange(1, 1, 1, SCHEMAS[sheetName].length).setValues([SCHEMAS[sheetName]]);
      sheet.getRange(1, 1, 1, SCHEMAS[sheetName].length).setFontWeight("bold").setBackground("#fef3c7");
    }

    // Xóa Sheet1 mặc định nếu có
    const defaultSheet = ss.getSheetByName("Sheet1");
    if (defaultSheet && ss.getSheets().length > 1) {
      ss.deleteSheet(defaultSheet);
    }
  }

  return ss;
}

function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents || "{}");
    const action = contents.action;
    const ss = getOrCreateSpreadsheet();

    if (action === "initSpreadsheet") {
      return jsonResponse({
        success: true,
        spreadsheetId: ss.getId(),
        spreadsheetUrl: ss.getUrl()
      });
    }

    if (action === "appendRow") {
      const sheetName = contents.sheet;
      const row = contents.row;
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        return jsonResponse({ success: false, error: "Sheet không tồn tại: " + sheetName });
      }
      sheet.appendRow(row);
      return jsonResponse({ success: true, message: "Đã thêm dòng thành công" });
    }

    if (action === "getRows") {
      const sheetName = contents.sheet;
      const sheet = ss.getSheetByName(sheetName);
      if (!sheet) {
        return jsonResponse({ success: false, error: "Sheet không tồn tại" });
      }
      const data = sheet.getDataRange().getValues();
      return jsonResponse({ success: true, rows: data });
    }

    return jsonResponse({ success: false, error: "Hành động không hợp lệ" });
  } catch (error) {
    return jsonResponse({ success: false, error: error.toString() });
  }
}

function doGet(e) {
  const ss = getOrCreateSpreadsheet();
  return jsonResponse({
    success: true,
    message: "EDUNOVA Database Apps Script API đang hoạt động!",
    spreadsheetId: ss.getId(),
    spreadsheetUrl: ss.getUrl()
  });
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
