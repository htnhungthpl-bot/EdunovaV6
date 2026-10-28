import { AIFeedbackResult } from '../types';

export function evaluateGrade4Writing(
  text: string, 
  targetMin: number = 130, 
  targetMax: number = 200
): AIFeedbackResult {
  const cleanText = text.trim();
  const words = cleanText ? cleanText.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  if (wordCount < 15) {
    return {
      stars: 1,
      overallPraise: 'Bé ơi, bài viết của em còn hơi ngắn nhé! Hãy mạnh dạn viết thêm 2-3 câu nữa để Nova hỗ trợ nhận xét chi tiết hơn nha.',
      detectedTechniques: [],
      grammarChecks: [
        {
          type: 'tip',
          message: 'Em hãy nhấn vào mục "Túi từ vựng" bên phải để xem các từ ngữ gợi ý hay nhé!'
        }
      ],
      scoreBreakdown: { structure: 3, vocabulary: 3, emotion: 4 },
      suggestions: [
        'Bắt đầu bằng một câu mở bài giới thiệu đối tượng miêu tả.',
        'Kể ít nhất 2 đặc điểm nổi bật nhất (hình dáng, màu sắc, hoạt động).'
      ]
    };
  }

  // Detect comparison & rhetoric
  const lower = cleanText.toLowerCase();
  const comparisonKeywords = ['như', 'tựa như', 'giống như', 'hệt như', 'như là', 'chẳng khác nào'];
  const detectedComparisons: string[] = [];
  comparisonKeywords.forEach(kw => {
    if (lower.includes(kw) && !detectedComparisons.includes(kw)) {
      detectedComparisons.push(kw);
    }
  });

  // Descriptive sensory words
  const sensoryKeywords = [
    'xanh ngắt', 'mỡ màng', 'xù xì', 'gồ ghề', 'rì rào', 'râm ran', 
    'mềm mại', 'tròn xoe', 'lanh lợi', 'êm ru', 'ấm áp', 'bồi hồi',
    'giòn giã', 'lung linh', 'lấp lánh', 'vàng óng', 'thơm lừng'
  ];
  const detectedSensory: string[] = [];
  sensoryKeywords.forEach(kw => {
    if (lower.includes(kw)) {
      detectedSensory.push(kw);
    }
  });

  // Paragraph count
  const paragraphs = cleanText.split(/\n+/).filter(p => p.trim().length > 0);
  const hasThreeParts = paragraphs.length >= 3;

  // Compute stars and breakdown
  let structureScore = 6;
  if (hasThreeParts) structureScore = 9;
  else if (paragraphs.length === 2) structureScore = 7.5;

  let vocabScore = 6;
  if (detectedComparisons.length >= 2 || detectedSensory.length >= 3) vocabScore = 9.5;
  else if (detectedComparisons.length >= 1 || detectedSensory.length >= 1) vocabScore = 8;

  let emotionScore = 7.5;
  if (lower.includes('yêu quý') || lower.includes('thân thương') || lower.includes('kỷ niệm') || lower.includes('nhớ') || lower.includes('biết ơn') || lower.includes('hạnh phúc')) {
    emotionScore = 9.5;
  }

  // Average
  const average = (structureScore + vocabScore + emotionScore) / 3;
  let stars = 3;
  if (average >= 9 && wordCount >= targetMin) stars = 5;
  else if (average >= 7.5) stars = 4;
  else if (wordCount < 60) stars = 2;

  // Praises
  const detectedTechniques: string[] = [];
  if (detectedComparisons.length > 0) {
    detectedTechniques.push(`Biện pháp so sánh (${detectedComparisons.length} lần xuất hiện)`);
  }
  if (detectedSensory.length > 0) {
    detectedTechniques.push(`Từ tượng hình / từ gợi cảm (${detectedSensory.length} từ)`);
  }
  if (hasThreeParts) {
    detectedTechniques.push('Bố cục 3 phần (Mở bài - Thân bài - Kết bài) chuẩn');
  }

  // Grammar / tips
  const grammarChecks: { type: 'praise' | 'warning' | 'tip'; message: string }[] = [];
  
  if (wordCount >= targetMin && wordCount <= targetMax + 40) {
    grammarChecks.push({
      type: 'praise',
      message: `Độ dài bài văn đạt chuẩn lớp 4 (${wordCount} từ / mục tiêu ${targetMin}-${targetMax} từ). Rất tuyệt vời!`
    });
  } else if (wordCount < targetMin) {
    grammarChecks.push({
      type: 'tip',
      message: `Bài viết hiện có ${wordCount} từ. Em nên viết thêm khoảng ${targetMin - wordCount} từ nữa để bài văn đầy đủ chi tiết hơn nhé.`
    });
  } else {
    grammarChecks.push({
      type: 'tip',
      message: `Bài viết khá dài (${wordCount} từ). Em chú ý cô đọng câu văn, tránh lặp ý để bài viết súc tích hơn.`
    });
  }

  if (hasThreeParts) {
    grammarChecks.push({
      type: 'praise',
      message: 'Em đã biết tách đoạn Mở bài, Thân bài và Kết bài rất mạch lạc.'
    });
  } else {
    grammarChecks.push({
      type: 'warning',
      message: 'Em nên xuống dòng tách thành 3 đoạn: Mở bài (giới thiệu), Thân bài (tả chi tiết), Kết bài (nêu tình cảm).'
    });
  }

  if (detectedComparisons.length === 0) {
    grammarChecks.push({
      type: 'tip',
      message: 'Mẹo nhỏ: Em hãy thêm 1-2 câu có từ "như" hoặc "tựa như" để câu văn thêm sinh động (Ví dụ: "lá xanh như chiếc ô che nắng").'
    });
  }

  const suggestions: string[] = [];
  if (!hasThreeParts) {
    suggestions.push('Chia bài viết thành 3 phần rõ ràng: mở đầu giới thiệu, thân bài miêu tả, kết thúc nêu cảm nghĩ.');
  }
  if (detectedComparisons.length < 2) {
    suggestions.push('Thử dùng thêm phép so sánh bằng cách ví vật được tả với một đồ vật hoặc hình ảnh quen thuộc của tuổi thơ.');
  }
  if (emotionScore < 8.5) {
    suggestions.push('Đừng quên bộc lộ tình cảm sâu sắc của mình ở câu kết (như yêu quý, gắn bó, lời hứa giữ gìn).');
  }
  if (suggestions.length === 0) {
    suggestions.push('Bài viết của em đã rất hoàn chỉnh! Em có thể đọc to thành tiếng một lần để kiểm tra dấu câu trước khi gửi cô nhé.');
  }

  let overallPraise = 'Bé viết văn rất có hồn và giàu trí tưởng tượng!';
  if (stars === 5) {
    overallPraise = '🌟 Xuất sắc! Bài văn của em giàu hình ảnh, bố cục chặt chẽ và cảm xúc rất tự nhiên. Em xứng đáng nhận bông hoa điểm 10!';
  } else if (stars === 4) {
    overallPraise = '👏 Rất đáng khen! Em đã nắm vững cách làm bài văn lớp 4. Chỉ cần bổ sung thêm một chút chi tiết nhỏ là bài sẽ hoàn hảo.';
  }

  return {
    stars,
    overallPraise,
    detectedTechniques,
    grammarChecks,
    scoreBreakdown: {
      structure: Math.round(structureScore * 10) / 10,
      vocabulary: Math.round(vocabScore * 10) / 10,
      emotion: Math.round(emotionScore * 10) / 10
    },
    suggestions
  };
}
