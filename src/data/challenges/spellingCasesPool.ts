import { SpellingCase } from '../../types/challenges';

export const SPELLING_CASES: SpellingCase[] = [
  {
    id: 'sp-1',
    caseNumber: 1,
    title: 'Vụ án: Bức thư gửi mẹ',
    topic: 'l/n',
    passage: 'Mỗi khi xa nhà, em luôn lo lắng cho sức khỏe của mẹ và mong manh manh áo ấm cho mẹ lúc mùa đông.',
    wrongWord: 'lo lắng',
    correctWord: 'lo lắng',
    options: [
      { id: 'opt-1a', word: 'lo lắng', isCorrect: true },
      { id: 'opt-1b', word: 'no nắng', isCorrect: false },
      { id: 'opt-1c', word: 'lo nắng', isCorrect: false }
    ],
    explanation: '"Lo lắng" (viết bằng "l") chỉ tâm trạng bồn chồn, quan tâm đến người thân. Còn "no" là trạng thái ăn no, "nắng" là ánh mặt trời.',
    spellingRule: 'Quy tắc chính tả L/N: "Lo lắng" đi đôi phụ âm L; "No nê" đi đôi phụ âm N.'
  },
  {
    id: 'sp-2',
    caseNumber: 2,
    title: 'Vụ án: Nụ cười bé thơ',
    topic: 's/x',
    passage: 'Bé Na có khuôn mặt bầu bĩnh và nụ cười xinh xắn khiến ai nhìn vào cũng thấy vui vẻ, yêu đời.',
    wrongWord: 'xinh xắn',
    correctWord: 'xinh xắn',
    options: [
      { id: 'opt-2a', word: 'xinh xắn', isCorrect: true },
      { id: 'opt-2b', word: 'sinh xắn', isCorrect: false },
      { id: 'opt-2c', word: 'xinh sắn', isCorrect: false }
    ],
    explanation: '"Xinh xắn" (viết bằng "x") là từ láy miêu tả vẻ đẹp nhỏ nhắn, dễ thương. Chữ "sinh" chỉ sự sinh sôi hoặc học sinh.',
    spellingRule: 'Phân biệt S/X: Các từ chỉ vẻ đẹp tươi tắn thường bắt đầu bằng X: "xinh xắn", "xinh đẹp", "xinh tươi".'
  },
  {
    id: 'sp-3',
    caseNumber: 3,
    title: 'Vụ án: Bác thợ mộc trong xưởng',
    topic: 'tr/ch',
    passage: 'Bác Ba là người thợ mộc chăm chỉ nhất làng, sớm hôm miệt mài bên những thớ gỗ thơm lừng.',
    wrongWord: 'chăm chỉ',
    correctWord: 'chăm chỉ',
    options: [
      { id: 'opt-3a', word: 'chăm chỉ', isCorrect: true },
      { id: 'opt-3b', word: 'trăm chỉ', isCorrect: false },
      { id: 'opt-3c', word: 'chăm trỉ', isCorrect: false }
    ],
    explanation: '"Chăm chỉ" (viết bằng "ch") diễn tả đức tính siêng năng, chịu khó. Chữ "trăm" là số từ (một trăm, trăm năm).',
    spellingRule: 'Phân biệt TR/CH: Từ láy chỉ tính cách đức tính: "chăm chỉ", "chăm sóc", "chịu khó" đều viết bằng CH.'
  },
  {
    id: 'sp-4',
    caseNumber: 4,
    title: 'Vụ án: Kỳ nghỉ cuối tuần',
    topic: 'dấu hỏi/dấu ngã',
    passage: 'Sau một tuần học tập say mê, ngày chủ nhật là khoảng thời gian để chúng em nghỉ ngơi, thư giãn bên gia đình.',
    wrongWord: 'nghỉ ngơi',
    correctWord: 'nghỉ ngơi',
    options: [
      { id: 'opt-4a', word: 'nghỉ ngơi', isCorrect: true },
      { id: 'opt-4b', word: 'ngĩ ngơi', isCorrect: false },
      { id: 'opt-4c', word: 'nghĩ ngơi', isCorrect: false }
    ],
    explanation: '"Nghỉ ngơi" mang dấu hỏi, chỉ trạng thái tạm ngừng làm việc để lấy lại sức. Còn "suy nghĩ" mang dấu ngã, chỉ hoạt động trí óc.',
    spellingRule: 'Phân biệt Dấu Hỏi / Dấu Ngã: "Nghỉ ngơi, nghỉ hè, nghỉ phép" (dấu hỏi); "Suy nghĩ, ngẫm nghĩ" (dấu ngã).'
  },
  {
    id: 'sp-5',
    caseNumber: 5,
    title: 'Vụ án: Bình minh trên biển',
    topic: 'd/gi/r',
    passage: 'Mặt trời đội nước nhô lên, tỏa ánh bình minh rực rỡ nhuộm hồng cả một vùng biển rộng bao la.',
    wrongWord: 'rực rỡ',
    correctWord: 'rực rỡ',
    options: [
      { id: 'opt-5a', word: 'rực rỡ', isCorrect: true },
      { id: 'opt-5b', word: 'dực dỡ', isCorrect: false },
      { id: 'opt-5c', word: 'giực giỡ', isCorrect: false }
    ],
    explanation: '"Rực rỡ" bắt đầu bằng phụ âm "r" và mang thanh ngã ở tiếng thứ hai, gợi tả ánh sáng chói lọi, màu sắc tươi tắn tuyệt đẹp.',
    spellingRule: 'Phân biệt R/D/GI: Từ láy tượng hình ánh sáng chói lòa: "rực rỡ", "rạng rỡ", "rạng ngời" đều bắt đầu bằng R.'
  },
  {
    id: 'sp-6',
    caseNumber: 6,
    title: 'Vụ án: Vận động viên tí hon',
    topic: 'dấu hỏi/dấu ngã',
    passage: 'Nhờ nỗ lực không ngừng nghỉ mỗi ngày, bạn Minh đã xuất sắc giành huy chương vàng môn cờ vua cấp trường.',
    wrongWord: 'nỗ lực',
    correctWord: 'nỗ lực',
    options: [
      { id: 'opt-6a', word: 'nỗ lực', isCorrect: true },
      { id: 'opt-6b', word: 'nổ lực', isCorrect: false }
    ],
    explanation: '"Nỗ lực" viết bằng thanh ngã (~), có nghĩa là đem hết sức lực và ý chí để làm một việc khó khăn. Còn "nổ" (dấu hỏi) là phát nổ.',
    spellingRule: 'Thanh điệu tiếng Việt: "Nỗ lực, nỗ thần, quyết chí" dùng dấu ngã (~); "Bộc phát, súng nổ, nổ tung" dùng dấu hỏi (?).'
  },
  {
    id: 'sp-7',
    caseNumber: 7,
    title: 'Vụ án: Buổi sáng trên nương',
    topic: 'l/n',
    passage: 'Những tia nắng ấm ban mai xua tan màn sương sớm, đánh thức muôn nụ hoa rừng cựa mình hé nở.',
    wrongWord: 'nắng ấm',
    correctWord: 'nắng ấm',
    options: [
      { id: 'opt-7a', word: 'nắng ấm', isCorrect: true },
      { id: 'opt-7b', word: 'lắng ấm', isCorrect: false }
    ],
    explanation: '"Nắng ấm" bắt đầu bằng "n", chỉ ánh sáng mặt trời dịu nhẹ. Còn "lắng" bắt đầu bằng "l" mang nghĩa lắng đọng, lắng nghe.',
    spellingRule: 'Phân biệt L/N: Từ chỉ hiện tượng tự nhiên mặt trời: "ánh nắng", "nắng ấm", "ngày nắng" viết bằng N.'
  },
  {
    id: 'sp-8',
    caseNumber: 8,
    title: 'Vụ án: Ngôi trường mới khang trang',
    topic: 's/x',
    passage: 'Ngôi trường Tiểu học mới xây dựng nằm giữa hàng cây xanh, phòng học nào cũng sáng sủa, thoáng mát.',
    wrongWord: 'sáng sủa',
    correctWord: 'sáng sủa',
    options: [
      { id: 'opt-8a', word: 'sáng sủa', isCorrect: true },
      { id: 'opt-8b', word: 'xáng xủa', isCorrect: false },
      { id: 'opt-8c', word: 'sáng xủa', isCorrect: false }
    ],
    explanation: '"Sáng sủa" bắt đầu bằng "s", từ láy miêu tả không gian đầy đủ ánh sáng, sạch sẽ và thông thoáng.',
    spellingRule: 'Phân biệt S/X: Từ láy âm đầu S: "sáng sủa", "sáng sớm", "sạch sẽ".'
  },
  {
    id: 'sp-9',
    caseNumber: 9,
    title: 'Vụ án: Tiếng suối reo trong rừng',
    topic: 'tr/ch',
    passage: 'Lắng tai nghe, tiếng nước suối chảy trong trẻo như tiếng đàn cầm êm dịu giữa chốn rừng sâu.',
    wrongWord: 'trong trẻo',
    correctWord: 'trong trẻo',
    options: [
      { id: 'opt-9a', word: 'trong trẻo', isCorrect: true },
      { id: 'opt-9b', word: 'chong chẻo', isCorrect: false },
      { id: 'opt-9c', word: 'trong chẻo', isCorrect: false }
    ],
    explanation: '"Trong trẻo" viết bằng "tr", là từ láy gợi tả âm thanh trong vắt hoặc làn nước thanh khiết không gợn đục.',
    spellingRule: 'Phân biệt TR/CH: Các từ láy chỉ tính chất thanh sạch: "trong trẻo", "trong trắng", "trong veo" đều dùng TR.'
  },
  {
    id: 'sp-10',
    caseNumber: 10,
    title: 'Vụ án: Đêm hội hoa đăng',
    topic: 'l/n',
    passage: 'Hàng ngàn ngọn đèn hoa đăng trôi trên mặt nước lung linh như dải ngân hà rực rỡ sắc màu.',
    wrongWord: 'lung linh',
    correctWord: 'lung linh',
    options: [
      { id: 'opt-10a', word: 'lung linh', isCorrect: true },
      { id: 'opt-10b', word: 'nung ninh', isCorrect: false },
      { id: 'opt-10c', word: 'lung ninh', isCorrect: false }
    ],
    explanation: '"Lung linh" viết bằng "l", gợi tả ánh sáng lấp lánh phản chiếu chuyển động mềm mại trên mặt nước.',
    spellingRule: 'Phân biệt L/N: Từ láy tả ánh sáng: "lung linh", "lấp lánh", "lấp lóa" đều bắt đầu bằng L.'
  },
  {
    id: 'sp-11',
    caseNumber: 11,
    title: 'Vụ án: Bài học đạo đức',
    topic: 's/x',
    passage: 'Câu chuyện thầy giáo kể để lại cho chúng em một bài học sâu sắc về lòng nhân ái và tình bạn chân thành.',
    wrongWord: 'sâu sắc',
    correctWord: 'sâu sắc',
    options: [
      { id: 'opt-11a', word: 'sâu sắc', isCorrect: true },
      { id: 'opt-11b', word: 'xâu xắc', isCorrect: false },
      { id: 'opt-11c', word: 'sâu xắc', isCorrect: false }
    ],
    explanation: '"Sâu sắc" viết bằng "s", chỉ sự hiểu biết thấu đáo, thấu hiểu đến tận chiều sâu của ý nghĩa.',
    spellingRule: 'Phân biệt S/X: "Sâu sắc, sâu đậm, sâu thẳm" đều bắt đầu bằng S; còn "xâu chuỗi, xâu kim" bắt đầu bằng X.'
  },
  {
    id: 'sp-12',
    caseNumber: 12,
    title: 'Vụ án: Tiếng cười ngày hội',
    topic: 'dấu hỏi/dấu ngã',
    passage: 'Cả lớp em tham gia trò chơi kéo co trong tiếng hò reo, ai nấy đều vui vẻ rạng rỡ nụ cười.',
    wrongWord: 'vui vẻ',
    correctWord: 'vui vẻ',
    options: [
      { id: 'opt-12a', word: 'vui vẻ', isCorrect: true },
      { id: 'opt-12b', word: 'vui vẽ', isCorrect: false }
    ],
    explanation: '"Vui vẻ" mang thanh hỏi (?), là từ láy diễn tả tâm trạng hân hoan, rộn rã. Chữ "vẽ" (ngã) mang nghĩa hội họa, vẽ tranh.',
    spellingRule: 'Thanh điệu tiếng Việt: "Vui vẻ, tươi tắn, nhỏ nhẹ" dùng dấu hỏi (?); "Vẽ tranh, tập vẽ" dùng dấu ngã (~).'
  },
  {
    id: 'sp-13',
    caseNumber: 13,
    title: 'Vụ án: Lời ru của mẹ',
    topic: 'd/gi/r',
    passage: 'Bên chiếc võng đung đưa, tiếng mẹ ru con ngọt ngào, dịu dàng đưa em vào giấc ngủ say nồng.',
    wrongWord: 'dịu dàng',
    correctWord: 'dịu dàng',
    options: [
      { id: 'opt-13a', word: 'dịu dàng', isCorrect: true },
      { id: 'opt-13b', word: 'rịu ràng', isCorrect: false },
      { id: 'opt-13c', word: 'giịu gàng', isCorrect: false }
    ],
    explanation: '"Dịu dàng" bắt đầu bằng phụ âm "d", miêu tả cử chỉ, giọng nói êm ái, hiền từ và chan chứa tình cảm thương yêu.',
    spellingRule: 'Phân biệt D/GI/R: Từ láy tả tính nết, giọng điệu nhẹ nhàng: "dịu dàng", "dễ chịu", "dặt dìu" viết bằng D.'
  },
  {
    id: 'sp-14',
    caseNumber: 14,
    title: 'Vụ án: Tấm gương vượt khó',
    topic: 'c/k',
    passage: 'Nhờ lòng kiên trì luyện viết chữ đẹp từng ngày, bài thi của bạn Hoa đã được chọn đi triển lãm.',
    wrongWord: 'kiên trì',
    correctWord: 'kiên trì',
    options: [
      { id: 'opt-14a', word: 'kiên trì', isCorrect: true },
      { id: 'opt-14b', word: 'ciên trì', isCorrect: false }
    ],
    explanation: 'Theo quy tắc chính tả tiếng Việt, trước các nguyên âm "i, e, ê, iê", phụ âm đầu "c/k" bắt buộc phải viết bằng "k".',
    spellingRule: 'Luật chính tả C/K: Viết K trước i, e, ê (kiên trì, kính yêu, kéo co, kể chuyện). Viết C trước a, o, ô, u (chăm chỉ, cái cây).'
  },
  {
    id: 'sp-15',
    caseNumber: 15,
    title: 'Vụ án: Tình bạn quý giá',
    topic: 'tr/ch',
    passage: 'Bạn Minh là người luôn chân thật với thầy cô và bạn bè, chưa bao giờ nói dối hay che giấu lỗi lầm.',
    wrongWord: 'chân thật',
    correctWord: 'chân thật',
    options: [
      { id: 'opt-15a', word: 'chân thật', isCorrect: true },
      { id: 'opt-15b', word: 'trân thật', isCorrect: false },
      { id: 'opt-15c', word: 'chân thực', isCorrect: true }
    ],
    explanation: '"Chân thật" viết bằng "ch", có nghĩa là thật thà, xuất phát từ đáy lòng. Còn "trân trọng" viết bằng "tr".',
    spellingRule: 'Phân biệt TR/CH: "Chân thật, chân thành, chân chất" viết bằng CH; "Trân trọng, trân quý" viết bằng TR.'
  },
  {
    id: 'sp-16',
    caseNumber: 16,
    title: 'Vụ án: Vở sạch chữ đẹp',
    topic: 'l/n',
    passage: 'Em ngồi ngay ngắn, tay cầm bút nắn nót từng nét chữ tròn đều trên trang giấy trắng tinh.',
    wrongWord: 'nắn nót',
    correctWord: 'nắn nót',
    options: [
      { id: 'opt-16a', word: 'nắn nót', isCorrect: true },
      { id: 'opt-16b', word: 'lắn lót', isCorrect: false }
    ],
    explanation: '"Nắn nót" bắt đầu bằng "n", là từ láy miêu tả hành động viết hoặc làm việc hết sức cẩn thận, tỉ mỉ từng chi tiết.',
    spellingRule: 'Phân biệt L/N: "Nắn nót, nâng niu, nơm nớp" dùng âm đầu N; "Lắng nghe, lo liệu" dùng âm đầu L.'
  },
  {
    id: 'sp-17',
    caseNumber: 17,
    title: 'Vụ án: Tiếng trống khai trường',
    topic: 'd/gi/r',
    passage: 'Tiếng trống trường rộn ràng vang lên báo hiệu một năm học mới đầy hứng khởi và niềm vui đã bắt đầu.',
    wrongWord: 'rộn ràng',
    correctWord: 'rộn ràng',
    options: [
      { id: 'opt-17a', word: 'rộn ràng', isCorrect: true },
      { id: 'opt-17b', word: 'dộn dàng', isCorrect: false },
      { id: 'opt-17c', word: 'giộn giàng', isCorrect: false }
    ],
    explanation: '"Rộn ràng" bắt đầu bằng "r", là từ láy tượng thanh miêu tả âm thanh rộn rã tấp nập, gợi cảm xúc vui mừng náo nức.',
    spellingRule: 'Phân biệt R/D/GI: Từ láy tả âm thanh rộn rã: "rộn ràng", "rộn rã", "reo rắt" đều viết bằng R.'
  },
  {
    id: 'sp-18',
    caseNumber: 18,
    title: 'Vụ án: Giờ giải toán khó',
    topic: 'dấu hỏi/dấu ngã',
    passage: 'Đứng trước bài toán đố hóc búa, bạn Nam ngồi ngẫm nghĩ một hồi lâu rồi reo lên vì đã tìm ra lời giải.',
    wrongWord: 'ngẫm nghĩ',
    correctWord: 'ngẫm nghĩ',
    options: [
      { id: 'opt-18a', word: 'ngẫm nghĩ', isCorrect: true },
      { id: 'opt-18b', word: 'ngẩm nghỉ', isCorrect: false },
      { id: 'opt-18c', word: 'ngẫm nghỉ', isCorrect: false }
    ],
    explanation: 'Cả hai tiếng trong từ láy "ngẫm nghĩ" đều mang dấu ngã (~), chỉ hoạt động tư duy, suy xét sâu xa trong đầu.',
    spellingRule: 'Quy tắc hòa phối thanh điệu: Nhóm thanh Ngã thường đi đôi với nhau: "ngẫm nghĩ", "nghĩ ngợi", "nghĩ ngợi lung tung".'
  },
  {
    id: 'sp-19',
    caseNumber: 19,
    title: 'Vụ án: Cây ăn quả trong vườn ông',
    topic: 's/x',
    passage: 'Khu vườn của ông rợp bóng cây xanh, cành nào cành nấy đều sum suê trĩu quả chín mọng ngọt lành.',
    wrongWord: 'sum suê',
    correctWord: 'sum suê',
    options: [
      { id: 'opt-19a', word: 'sum suê', isCorrect: true },
      { id: 'opt-19b', word: 'xum xuê', isCorrect: false },
      { id: 'opt-19c', word: 'sum xuê', isCorrect: false }
    ],
    explanation: '"Sum suê" chuẩn chính tả tiếng Việt viết bằng "s", gợi tả cành lá cây cối xum xuê rậm rạp, tốt tươi phát triển.',
    spellingRule: 'Từ vựng tiếng Việt lớp 4: "Sum suê" viết bằng S theo từ điển chính tả Tiếng Việt của Viện Ngôn ngữ học.'
  },
  {
    id: 'sp-20',
    caseNumber: 20,
    title: 'Vụ án: Bánh chưng ngày Tết',
    topic: 'tr/ch',
    passage: 'Bà khéo léo gói những chiếc bánh chưng xanh vuông vắn, bên cạnh mâm bánh tét tròn trịa đón Tết cổ truyền.',
    wrongWord: 'tròn trịa',
    correctWord: 'tròn trịa',
    options: [
      { id: 'opt-20a', word: 'tròn trịa', isCorrect: true },
      { id: 'opt-20b', word: 'tròn chịa', isCorrect: false },
      { id: 'opt-20c', word: 'chòn chịa', isCorrect: false }
    ],
    explanation: '"Tròn trịa" là từ láy toàn bộ âm đầu "tr", miêu tả hình khối tròn đều đặn, hoàn hảo và đẹp mắt.',
    spellingRule: 'Phân biệt TR/CH: Từ láy tả hình dạng: "tròn trịa", "tròn trĩnh", "trùng trục" đều đi với phụ âm TR.'
  },
  {
    id: 'sp-21',
    caseNumber: 21,
    title: 'Vụ án: Lâu đài cổ tích',
    topic: 'l/n',
    passage: 'Trong câu chuyện cổ tích bà kể, tòa lâu đài hoàng gia hiện lên vô cùng lộng lẫy và nguy nga tráng lệ.',
    wrongWord: 'lộng lẫy',
    correctWord: 'lộng lẫy',
    options: [
      { id: 'opt-21a', word: 'lộng lẫy', isCorrect: true },
      { id: 'opt-21b', word: 'nộng nẫy', isCorrect: false },
      { id: 'opt-21c', word: 'lộng nẫy', isCorrect: false }
    ],
    explanation: '"Lộng lẫy" bắt đầu bằng "l", gợi vẻ đẹp rực rỡ, lấp lánh ánh kim sa làm say đắm lòng người.',
    spellingRule: 'Phân biệt L/N: Từ láy sắc thái sang trọng: "lộng lẫy", "lung linh", "lấp lánh" bắt đầu bằng L.'
  },
  {
    id: 'sp-22',
    caseNumber: 22,
    title: 'Vụ án: Bác Hồ kính yêu',
    topic: 'd/gi/r',
    passage: 'Tuy là Chủ tịch nước, Bác Hồ kính yêu luôn giữ nếp sống giản dị, từ bữa cơm đến bộ quần áo kaki bạc màu.',
    wrongWord: 'giản dị',
    correctWord: 'giản dị',
    options: [
      { id: 'opt-22a', word: 'giản dị', isCorrect: true },
      { id: 'opt-22b', word: 'dản dị', isCorrect: false }
    ],
    explanation: '"Giản dị" viết bằng "gi", biểu đạt đức tính mộc mạc, khiêm tốn, không cầu kỳ phô trương.',
    spellingRule: 'Phân biệt D/GI: "Giản dị, giản đơn, đơn giản" đều dùng GI; "Dịu dàng, dễ dàng" dùng D.'
  },
  {
    id: 'sp-23',
    caseNumber: 23,
    title: 'Vụ án: Làn gió mùa thu',
    topic: 'âm cuối',
    passage: 'Làn gió thu thổi qua kẽ lá mang theo hơi nước mát mẻ, làm dịu đi cái oi nồng của những ngày hè vừa qua.',
    wrongWord: 'mát mẻ',
    correctWord: 'mát mẻ',
    options: [
      { id: 'opt-23a', word: 'mát mẻ', isCorrect: true },
      { id: 'opt-23b', word: 'mác mẻ', isCorrect: false }
    ],
    explanation: 'Tiếng "mát" có âm cuối là "t" (m - a - t - mát), chỉ nhiệt độ dễ chịu. Còn "mác" là đồ vật (con dao mác) hoặc nhãn mác thương hiệu.',
    spellingRule: 'Phân biệt âm cuối T/C: "Mát mẻ, mát rượi, bát ngát" dùng âm cuối T; "Man mác, ngơ ngác" dùng âm cuối C.'
  },
  {
    id: 'sp-24',
    caseNumber: 24,
    title: 'Vụ án: Nụ cười ngày tựu trường',
    topic: 'v/d',
    passage: 'Gặp lại thầy cô và bè bạn sau ba tháng hè, gương mặt bạn nào cũng vui vẻ rạng ngời phấn khởi.',
    wrongWord: 'vui vẻ',
    correctWord: 'vui vẻ',
    options: [
      { id: 'opt-24a', word: 'vui vẻ', isCorrect: true },
      { id: 'opt-24b', word: 'dui dẻ', isCorrect: false }
    ],
    explanation: '"Vui vẻ" viết bằng phụ âm "v", chỉ cảm xúc rộn ràng hạnh phúc. Một số vùng miền phát âm v thành d nhưng chính tả chuẩn là V.',
    spellingRule: 'Phân biệt V/D: "Vui vẻ, vui mừng, vẫy chào" viết bằng V; tránh viết theo phát âm địa phương "dui dẻ".'
  }
];
