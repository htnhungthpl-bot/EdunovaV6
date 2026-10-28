import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  Lightbulb, 
  ArrowRight,
  HelpCircle,
  Eye,
  PenTool,
  Heart
} from 'lucide-react';

interface WritingLessonsViewProps {
  onNavigateToWorkshop: () => void;
  onNavigateToWriting: () => void;
}

interface SkillTopic {
  id: string;
  number: number;
  title: string;
  summary: string;
  coreRule: string;
  badExample: string;
  badReason: string;
  goodExample: string;
  goodReason: string;
  tips: string[];
}

const LESSON_SKILLS: SkillTopic[] = [
  {
    id: 'cau-ro-nghia',
    number: 1,
    title: 'Viết câu rõ nghĩa, trọn vẹn',
    summary: 'Biết cách viết câu có đầy đủ bộ phận chính (Ai? Làm gì? / Thế nào?), chấm câu đúng lúc.',
    coreRule: 'Một câu văn hoàn chỉnh cần trả lời được: Ai (Cái gì)? Làm gì (Thế nào)? Sau khi diễn đạt trọn vẹn một ý, em cần đặt dấu chấm câu.',
    badExample: 'Mỗi khi mùa hè đến sân trường Kim Liên A.',
    badReason: 'Câu chưa trọn vẹn (thiếu bộ phận vị ngữ nói rõ sân trường thế nào hoặc ai làm gì khi mùa hè đến).',
    goodExample: 'Mỗi khi mùa hè đến, sân trường Kim Liên A lại rộn vang tiếng ve kêu và rực rỡ sắc hoa phượng đỏ.',
    goodReason: 'Câu có đầy đủ trạng ngữ chỉ thời gian, chủ ngữ "sân trường Kim Liên A" và vị ngữ rõ nghĩa.',
    tips: [
      'Đọc to câu văn lên xem tai mình nghe đã êm tai và hiểu rõ nghĩa chưa.',
      'Tránh dùng quá 3 từ "và" hoặc "rồi" trong cùng một câu dài.',
      'Hết một ý trọn vẹn thì đặt dấu chấm, ngắt ý phụ thì dùng dấu phẩy.'
    ]
  },
  {
    id: 'tim-phat-trien-y',
    number: 2,
    title: 'Tìm và phát triển ý cho bài văn',
    summary: 'Biết mở rộng từ một đối tượng quen thuộc thành nhiều chi tiết sống động.',
    coreRule: 'Đừng chỉ dừng lại ở một câu chung chung. Hãy tự đặt câu hỏi: Nó có hình dáng thế nào? Màu sắc ra sao? Gợi cho em nhớ đến điều gì?',
    badExample: 'Nhà em có nuôi một con mèo. Con mèo rất ngoan.',
    badReason: 'Các câu cụt ngủn, chưa phát triển được hình ảnh đặc sắc của chú mèo.',
    goodExample: 'Chú mèo Miu nhà em có bộ lông màu vàng cam mềm mịn như tơ. Đôi mắt chú tròn xoe và xanh biếc như hai hòn bi ve bắt sáng.',
    goodReason: 'Người viết đã phát triển chi tiết bộ lông và đôi mắt bằng hình ảnh so sánh cụ thể.',
    tips: [
      'Dùng quy tắc "Nhìn gần – Nhìn xa – Lắng nghe".',
      'Tìm 1 điểm khác biệt nhất của con vật hoặc cây cối mà em miêu tả.',
      'Ghi lại những ý nghĩ bất chợt vào Sổ tay kim cương.'
    ]
  },
  {
    id: 'phan-biet-doan-va-bai',
    number: 3,
    title: 'Phân biệt đoạn văn với bài văn',
    summary: 'Hiểu rõ cấu trúc hình thức và nội dung của đoạn văn so với bài văn hoàn chỉnh.',
    coreRule: 'Đoạn văn được viết lùi đầu dòng và chấm xuống dòng ở cuối đoạn, tập trung diễn đạt một ý trọn vẹn. Bài văn gồm nhiều đoạn hợp thành 3 phần: Mở bài, Thân bài, Kết bài.',
    badExample: 'Viết cả bài văn dài 200 từ thành một khối chữ duy nhất từ đầu đến cuối không xuống dòng.',
    badReason: 'Làm người đọc rối mắt, không nhận diện được phần mở đầu, diễn biến và kết thúc.',
    goodExample: 'Tách bài thành các đoạn rõ ràng: 1 đoạn Mở bài, 2-3 đoạn Thân bài (mỗi đoạn tả một bộ phận hoặc thời điểm), 1 đoạn Kết bài.',
    goodReason: 'Bố cục sáng sủa, người đọc dễ dàng theo dõi mạch cảm xúc của em.',
    tips: [
      'Một bài văn 3 phần không nhất thiết chỉ có đúng 3 đoạn! Thân bài có thể gồm 2 đến 3 đoạn nhỏ.',
      'Mỗi đoạn thân bài nên có một câu mở đoạn nêu ý chính.',
      'Đầu mỗi đoạn nhớ viết lùi vào một ô li nhé.'
    ]
  },
  {
    id: 'quan-sat-chon-chi-tiet',
    number: 4,
    title: 'Quan sát và chọn chi tiết đắt giá',
    summary: 'Chọn lọc chi tiết tiêu biểu, tránh liệt kê dàn trải như bản kiểm kê.',
    coreRule: 'Em không cần phải tả tất cả mọi thứ! Hãy chọn 2 hoặc 3 chi tiết đặc sắc nhất khiến đối tượng trở nên độc đáo và đáng yêu.',
    badExample: 'Cây có rễ màu nâu, thân màu nâu, cành màu nâu, lá màu xanh, quả màu vàng.',
    badReason: 'Liệt kê tẻ nhạt, màu sắc đơn điệu, không để lại ấn tượng trong lòng người đọc.',
    goodExample: 'Thân bàng già bạc phếch vì sương gió, nổi lên những mắt bướu sần sùi như vết tích của năm tháng. Rễ cây trồi lên mặt đất uốn lượn như đàn trăn con đang say ngủ.',
    goodReason: 'Chọn được hình ảnh so sánh đặc sắc (mắt bướu sần sùi, đàn trăn con) làm cây bàng trở nên sống động.',
    tips: [
      'Thay vì đếm số lượng, hãy tả cảm giác khi chạm tay vào hoặc ngửi mùi hương.',
      'Sử dụng các từ ngữ gợi cảm xúc: mỡ màng, óng ánh, xù xì, thoang thoảng.',
      'Quan sát vào các thời điểm đặc biệt: buổi sáng sớm có giọt sương, giờ ra chơi rộn rã.'
    ]
  },
  {
    id: 'cam-xuc-co-can-cu',
    number: 5,
    title: 'Thể hiện cảm xúc chân thực có căn cứ',
    summary: 'Gắn tình cảm yêu quý với hành động và kỷ niệm cụ thể, tránh hô hào sáo rỗng.',
    coreRule: 'Đừng chỉ lặp đi lặp lại câu: "Em rất yêu cây bàng/chú mèo". Hãy cho người đọc thấy vì sao em yêu quý nó bằng một kỷ niệm ấm áp.',
    badExample: 'Em rất yêu quý chú cún Bông. Em rất thích nó. Em sẽ chăm sóc nó thật tốt.',
    badReason: 'Khẳng định tình cảm nhưng không nêu được lý do và hành động cụ thể chứng minh tình cảm ấy.',
    goodExample: 'Mỗi buổi chiều đi học về, nghe tiếng cún Bông sủa mừng rối rít và cái đuôi ngoáy tít như cánh quạt nhỏ, mọi mệt mỏi trong em dường như tan biến hết.',
    goodReason: 'Cảm xúc vui mừng của em hiện lên rõ ràng qua hành động đón bạn của chú cún.',
    tips: [
      'Kể một việc em làm cho đối tượng (cho ăn, tưới nước, cùng chơi đùa).',
      'Nêu cảm giác trong lòng em khi ở bên cạnh đối tượng đó.',
      'Cảm xúc chân thật bao giờ cũng chạm tới trái tim thầy cô chấm bài.'
    ]
  },
  {
    id: 'lien-ket-y',
    number: 6,
    title: 'Liên kết ý mạch lạc, tự nhiên',
    summary: 'Dùng từ nối và chuyển ý nhịp nhàng giữa các câu trong đoạn và giữa các đoạn.',
    coreRule: 'Các câu văn không đứng rời rạc. Chúng được nối với nhau bằng các từ chuyển tiếp tự nhiên (thời gian, không gian, từ thay thế).',
    badExample: 'Sân trường rất vắng. Tiếng trống vang lên. Học sinh chạy ùa ra. Mọi người chơi nhảy dây.',
    badReason: 'Các câu rời rạc như những mảnh ghép chưa được gắn keo.',
    goodExample: 'Mới ban nãy, sân trường còn im ắng dưới nắng sớm. Thế rồi, khi hồi trống ra chơi vang lên giòn giã, các bạn học sinh từ khắp các lớp ùa ra như đàn chim vỡ tổ.',
    goodReason: 'Dùng từ nối thời gian ("Mới ban nãy", "Thế rồi, khi...") tạo mạch chuyển biến nhịp nhàng.',
    tips: [
      'Từ nối không gian: Nhìn từ xa... Đến lại gần... Dưới gốc cây... Trên vòm tán...',
      'Từ nối thời gian: Sáng sớm... Khi mùa hè đến... Lúc hoàng hôn buông xuống...',
      'Dùng từ đồng nghĩa để tránh lặp lại tên đối tượng quá nhiều lần.'
    ]
  },
  {
    id: 'doc-lai-va-tu-sua',
    number: 7,
    title: 'Kỹ năng đọc lại và tự sửa bài',
    summary: 'Biết cách tự rà soát chính tả, dấu câu và hoàn thiện bài văn trước khi nộp.',
    coreRule: 'Người viết giỏi là người biết tự sửa bài văn của mình. Đọc lại bài ít nhất 2 lần: lần 1 kiểm tra ý và câu, lần 2 bắt lỗi chính tả và dấu câu.',
    badExample: 'Viết xong câu cuối cùng là gấp vở nộp bài ngay mà không đọc lại dù chỉ một lần.',
    badReason: 'Dễ bỏ sót lỗi thiếu dấu câu, viết sai phụ âm đầu (ch/tr, s/x, d/gi) hoặc lặp từ ngớ ngẩn.',
    goodExample: 'Dành 5 phút đọc thầm từng câu, dùng bút chì gạch chân từ chưa ưng ý để thay thế bằng từ hay hơn.',
    goodReason: 'Bài viết sạch sẽ, câu cú chỉn chu, điểm số chắc chắn sẽ cao hơn hẳn!',
    tips: [
      'Đọc thầm nhấp nháy môi để kiểm tra xem có chỗ nào bị vấp câu không.',
      'Kiểm tra lại xem mở bài và kết bài đã ăn khớp với đề chưa.',
      'Sử dụng Trợ lý AI EDUNOVA ở Bước 6 để nhận gợi ý đọc lại trước khi nộp.'
    ]
  }
];

export const WritingLessonsView: React.FC<WritingLessonsViewProps> = ({
  onNavigateToWorkshop,
  onNavigateToWriting,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillTopic>(LESSON_SKILLS[0]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Học cách viết • 7 Nền tảng cốt lõi</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Bí quyết viết văn hay cho Học sinh Lớp 4
          </h2>
          <p className="text-amber-100 text-xs sm:text-sm max-w-xl">
            "Viết hay hơn mỗi ngày" bằng cách nắm chắc từng kỹ năng: đặt câu rõ nghĩa, chọn lọc chi tiết, gắn kết cảm xúc và tự sửa bài.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateToWorkshop}
            className="px-4 py-2.5 rounded-2xl bg-white text-amber-900 font-bold text-xs sm:text-sm hover:bg-amber-50 transition-colors shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Thực hành tại Xưởng luyện viết</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left List + Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 mb-2">
            7 kỹ năng nền tảng
          </div>
          {LESSON_SKILLS.map((skill) => {
            const isSelected = skill.id === selectedSkill.id;
            return (
              <button
                key={skill.id}
                onClick={() => setSelectedSkill(skill)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20 scale-101'
                    : 'bg-white hover:bg-amber-50/70 border-slate-200 text-slate-700'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl font-heading font-extrabold text-sm flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
                }`}>
                  {skill.number}
                </div>
                <div className="grow min-w-0">
                  <div className="font-bold text-xs sm:text-sm truncate">{skill.title}</div>
                  <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                    {skill.summary}
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
              </button>
            );
          })}
        </div>

        {/* Detail Panel (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">
                {selectedSkill.number}
              </span>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                Kỹ năng trọng tâm
              </span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-800 mt-2">
              {selectedSkill.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {selectedSkill.summary}
            </p>
          </div>

          {/* Core Rule */}
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm text-amber-950">
              <strong className="font-bold block text-amber-900">Quy tắc vàng:</strong>
              <p className="leading-relaxed font-medium">{selectedSkill.coreRule}</p>
            </div>
          </div>

          {/* Comparison Cards: Chưa hay vs Hay */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Chưa hay */}
            <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-red-800">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span>Ví dụ câu chưa hay:</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-red-100 italic text-slate-800 font-medium">
                "{selectedSkill.badExample}"
              </div>
              <div className="text-[11px] text-red-700">
                <strong>Vì sao chưa đạt:</strong> {selectedSkill.badReason}
              </div>
            </div>

            {/* Viết hay */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cách viết hay & gợi cảm:</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-100 italic text-slate-800 font-medium">
                "{selectedSkill.goodExample}"
              </div>
              <div className="text-[11px] text-emerald-700">
                <strong>Ưu điểm:</strong> {selectedSkill.goodReason}
              </div>
            </div>
          </div>

          {/* Tips of the teacher */}
          <div className="space-y-3 pt-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>3 Bí quyết của Cô giáo dạy Tiếng Việt</span>
            </h4>
            <div className="space-y-2">
              {selectedSkill.tips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <button
              onClick={onNavigateToWorkshop}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Luyện tập bài này ở Xưởng viết</span>
            </button>

            <button
              onClick={onNavigateToWriting}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              <span>Áp dụng vào Bàn viết bài</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
