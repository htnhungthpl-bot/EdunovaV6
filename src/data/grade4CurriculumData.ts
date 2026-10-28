import { Grade4LessonItem } from '../types';

export const RAW_CURRICULUM_DATA: Grade4LessonItem[] = [
  // ===================== HỌC KÌ I =====================
  // Tuần 1 - Bài 1
  {
    id: 'kntt-hk1-w1-b1',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 1,
    lessonNumber: 1,
    lessonTitle: 'Tìm hiểu đoạn văn và câu chủ đề',
    page: 10,
    theme: 'Mỗi người một vẻ',
    readingLesson: 'Điều kì diệu',
    genre: 'Đoạn văn & câu chủ đề',
    stage: 'Tìm hiểu nền tảng',
    writingPrompt: 'Đọc các đoạn văn trang 10-11 SGK, nhận xét về hình thức trình bày, tìm ý chính và câu nêu ý chính (câu chủ đề) của mỗi đoạn văn.',
    learningObjective: 'Nhận biết đoạn văn, câu chủ đề và mối liên hệ giữa các câu trong đoạn văn; rèn thói quen viết lùi đầu dòng và chấm kết đoạn.',
    practiceSteps: {
      step1Explore: 'Đọc 2 đoạn văn mẫu (theo Ni-cô-lai Nô-xốp và Vũ Tú Nam); xác định câu nêu ý chính và các câu làm rõ ý.',
      step2GatherIdeas: 'Gạch chân câu chủ đề; ghi lại nội dung chính của từng đoạn văn ra phiếu học tập.',
      step3Outline: 'Sắp xếp câu chủ đề (đứng đầu hoặc cuối đoạn) và các câu triển khai theo quan hệ ý nghĩa tương thích.',
      step4Draft: 'Hoàn thành phiếu phân tích đoạn văn; thử viết một đoạn ngắn 3-4 câu có câu chủ đề rõ ràng.',
      step5Revise: 'Kiểm tra xem đoạn văn có tập trung vào một ý chính không; các câu triển khai có liên kết chặt chẽ không.'
    },
    evaluationRubric: [
      'Xác định đúng vị trí câu chủ đề (đầu hoặc cuối đoạn)',
      'Các câu trong đoạn cùng làm rõ cho câu chủ đề',
      'Hình thức đoạn văn chuẩn (lùi đầu dòng, viết hoa đầu câu, chấm cuối đoạn)'
    ],
    resources: {
      guideNotes: 'Mỗi đoạn văn thường gồm một số câu được viết liên tục, không xuống dòng, trình bày một ý nhất định. Câu đầu tiên được viết lùi đầu dòng. Câu chủ đề là câu nêu ý chính của đoạn văn, thường nằm ở đầu hoặc ở cuối đoạn.',
      suggestedQuestions: [
        'Nhận xét về hình thức trình bày của các đoạn văn?',
        'Ý chính của mỗi đoạn văn là gì?',
        'Tìm câu nêu ý chính của mỗi đoạn. Câu đó nằm ở vị trí nào?'
      ],
      vocabAndPatterns: ['chuẩn bị', 'khiêu vũ', 'sân khấu', 'hiệp sĩ diệt sâu róm', 'cần cù', 'siêng năng']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp hoàn toàn mục lục và nội dung SGK Tiếng Việt 4 Tập một, tr. 10; chặng luyện tập/rubric thiết kế theo tài liệu tập huấn giáo viên.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 1, Bài 1, tr. 10',
    isSampleData: true
  },

  // Tuần 1 - Bài 2
  {
    id: 'kntt-hk1-w1-b2',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 1,
    lessonNumber: 2,
    lessonTitle: 'Tìm hiểu cách viết đoạn văn nêu ý kiến',
    page: 14,
    theme: 'Mỗi người một vẻ',
    readingLesson: 'Thi nhạc',
    genre: 'Đoạn văn nêu ý kiến',
    stage: 'Tìm hiểu kiểu bài',
    writingPrompt: 'Đọc 2 đoạn văn trang 14-15 SGK về câu chuyện "Thi nhạc" và "Bà cháu", tìm hiểu người viết muốn nói gì và cách sắp xếp ý kiến trong đoạn.',
    learningObjective: 'Hiểu cấu trúc đoạn văn nêu ý kiến (Mở đầu, Triển khai lí do, Kết thúc khẳng định ý kiến) và vai trò của dẫn chứng minh họa.',
    practiceSteps: {
      step1Explore: 'Phân tích 2 bài mẫu: đoạn văn cảm nhận về câu chuyện "Thi nhạc" của Tùng Anh và "Bà cháu" của Vĩnh Nga.',
      step2GatherIdeas: 'Xác định ý kiến chung, các lí do yêu thích và các chi tiết minh họa từ câu chuyện.',
      step3Outline: 'Lập khung đoạn văn theo 2 cách: Cách 1 (Mở đầu -> Triển khai), Cách 2 (Mở đầu -> Triển khai -> Kết thúc khẳng định lại).',
      step4Draft: 'Hoàn thành sơ đồ cấu trúc đoạn văn nêu ý kiến và bài tập nhận diện các phần.',
      step5Revise: 'Kiểm tra ý kiến có rõ ràng không; các lí do đưa ra có thuyết phục và có dẫn chứng cụ thể hỗ trợ không.'
    },
    evaluationRubric: [
      'Nhận diện đúng kiểu đoạn văn nêu ý kiến',
      'Ý kiến mở đầu rõ ràng, thể hiện sự yêu thích hoặc ấn tượng',
      'Đưa ra ít nhất 2 lí do hoặc dẫn chứng cụ thể từ câu chuyện',
      'Biết cách khẳng định lại ý kiến ở phần kết đoạn'
    ],
    resources: {
      guideNotes: 'Khi viết đoạn văn nêu ý kiến về một câu chuyện, cần nói rõ mình thích hoặc không thích câu chuyện đó và nêu rõ lí do.',
      suggestedQuestions: [
        'Người viết muốn nói gì qua đoạn văn trên?',
        'Câu mở đầu cho biết điều gì?',
        'Những câu tiếp theo cho biết người viết yêu thích những điều gì ở câu chuyện?',
        'Câu kết thúc đoạn ý nói gì?'
      ],
      vocabAndPatterns: ['cuốn tôi vào một thế giới đầy thú vị', 'để lại ấn tượng khó quên', 'tình cảm ấm áp', 'bài học sâu sắc']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 14-15.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 1, Bài 2, tr. 14',
    isSampleData: true
  },

  // Tuần 2 - Bài 3
  {
    id: 'kntt-hk1-w2-b3',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 2,
    lessonNumber: 3,
    lessonTitle: 'Tìm ý cho đoạn văn nêu ý kiến',
    page: 19,
    theme: 'Mỗi người một vẻ',
    readingLesson: 'Anh em sinh đôi',
    genre: 'Đoạn văn nêu ý kiến',
    stage: 'Tìm ý',
    writingPrompt: 'Chọn 1 trong 2 đề: Đề 1: Viết đoạn văn nêu lí do yêu thích một câu chuyện về tình cảm gia đình; Đề 2: Viết đoạn văn nêu lí do yêu thích một câu chuyện về các con vật đã đọc hoặc đã nghe.',
    learningObjective: 'Biết chọn câu chuyện yêu thích, ghi chép lí do và tìm các chi tiết minh họa cụ thể để phục vụ đoạn văn nêu ý kiến.',
    practiceSteps: {
      step1Explore: 'Đọc kĩ yêu cầu đề bài; phân biệt giữa ý kiến chung, lí do yêu thích và chi tiết minh họa sinh động.',
      step2GatherIdeas: 'Ghi tên câu chuyện, tác giả (nếu nhớ), lí do thích câu chuyện (nội dung, nhân vật, chi tiết ấn tượng).',
      step3Outline: 'Sắp xếp ý theo trình tự 3 phần: Mở đầu (giới thiệu tên truyện & ý kiến chung) -> Triển khai (nêu 1-2 lí do kèm dẫn chứng) -> Kết thúc (khẳng định lại).',
      step4Draft: 'Điền thông tin đầy đủ vào phiếu tìm ý cá nhân.',
      step5Revise: 'Loại bỏ ý trùng lặp hoặc lan man; bổ sung chi tiết cụ thể để lời nhận xét giàu sức thuyết phục.'
    },
    evaluationRubric: [
      'Chọn đúng câu chuyện theo chủ đề đề bài yêu cầu',
      'Nêu rõ lí do yêu thích có căn cứ',
      'Có dẫn chứng cụ thể từ hành động, lời nói của nhân vật',
      'Bố cục tìm ý đủ 3 phần: Mở đầu - Triển khai - Kết thúc'
    ],
    resources: {
      guideNotes: 'Chuẩn bị: Em thích câu chuyện nào? Câu chuyện đó em đã đọc hay được nghe kể? Vì sao em thích? Chi tiết nào ấn tượng?',
      sampleTemplate: 'Mở đầu: Giới thiệu tên câu chuyện và ý kiến chung -> Triển khai: Lí do 1 + dẫn chứng cụ thể; Lí do 2 + dẫn chứng -> Kết thúc: Khẳng định lại ý kiến.',
      vocabAndPatterns: ['cảm động', 'hấp dẫn', 'ngộ nghĩnh', 'bài học nhân văn', 'ấm áp tình thương']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và nội dung SGK tr. 19.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 2, Bài 3, tr. 19',
    isSampleData: true
  },

  // Tuần 2 - Bài 4
  {
    id: 'kntt-hk1-w2-b4',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 2,
    lessonNumber: 4,
    lessonTitle: 'Viết đoạn văn nêu ý kiến',
    page: 21,
    theme: 'Mỗi người một vẻ',
    readingLesson: 'Công chúa và người dẫn chuyện',
    genre: 'Đoạn văn nêu ý kiến',
    stage: 'Viết bài',
    writingPrompt: 'Dựa vào các ý đã tìm trong hoạt động Viết ở Bài 3, viết đoạn văn nêu lí do yêu thích một câu chuyện đã đọc hoặc đã nghe.',
    learningObjective: 'Viết được một đoạn văn nêu ý kiến hoàn chỉnh (từ 8 đến 10 câu), diễn đạt trôi chảy, có từ ngữ liên kết và thể hiện tình cảm chân thực.',
    practiceSteps: {
      step1Explore: 'Nhắc lại cấu trúc đoạn văn nêu ý kiến và những lưu ý khi viết (viết liên tục không xuống dòng, có câu mở đoạn gây ấn tượng).',
      step2GatherIdeas: 'Mở phiếu tìm ý đã chuẩn bị ở Bài 3 để làm căn cứ diễn đạt câu chữ.',
      step3Outline: 'Xác định thứ tự các câu trong đoạn: câu mở đầu dẫn dắt, các câu thân đoạn phát triển lí do, câu kết đoạn đúc kết.',
      step4Draft: 'Viết đoạn văn vào vở bằng lời văn tự nhiên của học sinh.',
      step5Revise: 'Đọc lại bài; kiểm tra cách mở đoạn, cách trình bày lí do, cách kết thúc, cách dùng từ, đặt câu và lỗi chính tả.'
    },
    evaluationRubric: [
      'Đoạn văn viết đúng quy cách (lùi đầu dòng, không xuống dòng giữa chừng)',
      'Có câu mở đoạn nêu ý kiến chung hấp dẫn',
      'Trình bày lí do rõ ràng, có dẫn chứng minh họa thuyết phục',
      'Câu văn liên kết mạch lạc, không mắc lỗi dùng từ và chính tả'
    ],
    resources: {
      guideNotes: 'Lưu ý: Chọn cách giới thiệu câu chuyện gây được chú ý; trình bày rõ các lí do yêu thích và đưa dẫn chứng minh họa; các câu trong đoạn được viết liên tục.',
      vocabAndPatterns: ['Đối với em, câu chuyện...', 'Điều khiến em xúc động nhất là...', 'Hình ảnh... mãi in đậm trong tâm trí em.']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 21.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 2, Bài 4, tr. 21',
    isSampleData: true
  },

  // Tuần 3 - Bài 5
  {
    id: 'kntt-hk1-w3-b5',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 3,
    lessonNumber: 5,
    lessonTitle: 'Trả bài viết đoạn văn nêu ý kiến',
    page: 25,
    theme: 'Mỗi người một vẻ',
    readingLesson: 'Thằn lằn xanh và tắc kè',
    genre: 'Đoạn văn nêu ý kiến',
    stage: 'Trả bài / chỉnh sửa',
    writingPrompt: 'Nghe thầy cô giáo nhận xét chung; đọc lại bài làm của em và nhận xét của thầy cô; sửa chữa các lỗi trong bài và viết lại một số câu cho hay hơn.',
    learningObjective: 'Biết tự đánh giá và sửa chữa bài viết đoạn văn nêu ý kiến dựa trên nhận xét của giáo viên; học tập những câu văn hay của bạn.',
    practiceSteps: {
      step1Explore: 'Lắng nghe giáo viên nhận xét ưu điểm và nhược điểm chung của cả lớp về cách mở đoạn, dùng từ, nêu dẫn chứng.',
      step2GatherIdeas: 'Đọc kĩ lời phê trong bài của mình; xác định các lỗi: cách mở đoạn, trình bày lí do và dẫn chứng, dùng từ, đặt câu, chính tả.',
      step3Outline: 'Lập kế hoạch sửa lỗi: ưu tiên sửa nội dung lí do chưa thuyết phục trước, sau đó chỉnh sửa câu văn gãy gọn.',
      step4Draft: 'Viết lại 1-2 câu văn hoặc đoạn văn cần cải thiện vào vở bài tập.',
      step5Revise: 'So sánh đoạn văn trước và sau khi sửa; đọc bài của bạn để học hỏi những cách diễn đạt sáng tạo.'
    },
    evaluationRubric: [
      'Nhận diện đúng lỗi trong bài viết của mình',
      'Biết cách sửa lỗi dùng từ, lỗi câu chưa trọn ý',
      'Viết lại câu văn giàu hình ảnh và cảm xúc hơn'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Cách viết mở đầu, triển khai, kết thúc; Cách trình bày lí do và dẫn chứng; Cách dùng từ, đặt câu; Chính tả.',
      suggestedQuestions: [
        'Bài làm của em đã có đủ mở đầu, triển khai, kết thúc chưa?',
        'Các lí do em nêu đã có dẫn chứng minh họa cụ thể chưa?',
        'Có câu nào bị lặp từ hoặc sai chính tả không?'
      ]
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 25.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 3, Bài 5, tr. 25',
    isSampleData: true
  },

  // Tuần 3 - Bài 6
  {
    id: 'kntt-hk1-w3-b6',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 3,
    lessonNumber: 6,
    lessonTitle: 'Tìm hiểu cách viết báo cáo thảo luận nhóm',
    page: 28,
    theme: 'Mỗi người một vẻ',
    readingLesson: 'Nghệ sĩ trống',
    genre: 'Báo cáo thảo luận nhóm',
    stage: 'Tìm hiểu kiểu văn bản',
    writingPrompt: 'Đọc báo cáo kết quả thảo luận nhóm về "Hoạt động chuẩn bị chào mừng ngày Nhà giáo Việt Nam" trang 28 SGK và trả lời các câu hỏi về bố cục.',
    learningObjective: 'Nhận biết mục đích, thể thức và 3 phần cơ bản của một bản báo cáo thảo luận nhóm (Phần đầu, Phần chính, Phần cuối).',
    practiceSteps: {
      step1Explore: 'Quan sát bản báo cáo mẫu của Nhóm 3 lớp 4A trường Tiểu học Yên Ninh; xác định các mục trong báo cáo.',
      step2GatherIdeas: 'Phân tích các thông tin: quốc hiệu - tiêu ngữ, địa điểm - ngày tháng, tiêu đề, người nhận, nội dung báo cáo, người viết báo cáo.',
      step3Outline: 'Tạo sơ đồ cấu trúc báo cáo thảo luận nhóm gồm 3 phần với các mục rõ ràng.',
      step4Draft: 'Hoàn thành phiếu nhận diện các thành phần của văn bản báo cáo.',
      step5Revise: 'Kiểm tra xem các mục đã được sắp xếp khoa học, nội dung báo cáo đã phân loại theo từng nhóm việc rõ ràng chưa.'
    },
    evaluationRubric: [
      'Chỉ ra đúng 3 phần của bản báo cáo thảo luận nhóm',
      'Nêu đúng vị trí quốc hiệu, tiêu ngữ, ngày tháng và chữ kí',
      'Hiểu cách sắp xếp nội dung thảo luận theo từng đề mục rõ ràng'
    ],
    resources: {
      guideNotes: 'Báo cáo thảo luận nhóm gồm 3 phần: Phần đầu (quốc hiệu và tiêu ngữ, địa điểm và thời gian viết báo cáo); Phần chính (tiêu đề, người nhận, nội dung báo cáo); Phần cuối (chữ kí, họ và tên của người viết báo cáo). Nội dung nêu kết quả thảo luận được sắp xếp theo mục để dễ theo dõi.',
      suggestedQuestions: [
        'Báo cáo trên viết về điều gì?',
        'Ai là người viết báo cáo? Báo cáo được gửi cho ai?',
        'Báo cáo gồm mấy phần? Mỗi phần có những thông tin gì?'
      ],
      sampleTemplate: 'Phần đầu: Quốc hiệu, tiêu ngữ, Địa điểm, ngày... tháng... năm... -> Phần chính: BÁO CÁO KẾT QUẢ THẢO LUẬN NHÓM, Kính gửi..., Nội dung... -> Phần cuối: Đại diện nhóm kí tên.'
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 28-29.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 3, Bài 6, tr. 28',
    isSampleData: true
  },

  // Tuần 4 - Bài 7
  {
    id: 'kntt-hk1-w4-b7',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 4,
    lessonNumber: 7,
    lessonTitle: 'Lập dàn ý cho báo cáo thảo luận nhóm',
    page: 33,
    theme: 'Mỗi người một vẻ',
    readingLesson: 'Những bức chân dung',
    genre: 'Báo cáo thảo luận nhóm',
    stage: 'Lập dàn ý',
    writingPrompt: 'Viết báo cáo thảo luận nhóm về một trong các chủ đề: Chủ đề 1: Kế hoạch quyên góp sách báo tặng các trường vùng khó khăn; Chủ đề 2: Kế hoạch trang trí lớp học chuẩn bị cho một ngày đặc biệt của lớp, của trường...',
    learningObjective: 'Biết tổ chức thảo luận nhóm, ghi chép ý kiến đóng góp và lập dàn ý báo cáo với các mục phân công công việc cụ thể.',
    practiceSteps: {
      step1Explore: 'Chọn chủ đề thảo luận; ôn lại mẫu báo cáo đã học ở Bài 6.',
      step2GatherIdeas: 'Thảo luận nhóm 3 bước: Nêu ý kiến -> Trao đổi, thảo luận -> Thống nhất kết quả; ghi chép thời gian, địa điểm, cách thức, phân công nhiệm vụ.',
      step3Outline: 'Đóng vai nhóm trưởng, sắp xếp các ý đã thống nhất vào khung dàn ý theo 3 phần của báo cáo.',
      step4Draft: 'Hoàn thiện bản dàn ý chi tiết của nhóm ra giấy khổ lớn hoặc vở ghi.',
      step5Revise: 'Góp ý và chỉnh sửa dàn ý: Báo cáo có đầy đủ các phần theo quy định chưa? Kết quả thảo luận được thể hiện chính xác, rõ ràng chưa?'
    },
    evaluationRubric: [
      'Dàn ý đủ 3 phần chuẩn thể thức văn bản',
      'Có đầy đủ các nội dung thảo luận (thời gian, địa điểm, cách thức, phân công)',
      'Nhiệm vụ phân công cho các thành viên hợp lí và cụ thể'
    ],
    resources: {
      guideNotes: 'Tổ chức thảo luận: Bước 1: Nêu ý kiến (Từng thành viên nêu ý kiến) -> Bước 2: Trao đổi, thảo luận -> Bước 3: Thống nhất kết quả thảo luận (Nhóm trưởng tổng hợp).',
      vocabAndPatterns: ['quyên góp', 'phân công nhiệm vụ', 'thống nhất', 'trang trí', 'triển khai']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 33.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 4, Bài 7, tr. 33',
    isSampleData: true
  },

  // Tuần 4 - Bài 8
  {
    id: 'kntt-hk1-w4-b8',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 4,
    lessonNumber: 8,
    lessonTitle: 'Viết báo cáo thảo luận nhóm',
    page: 36,
    theme: 'Mỗi người một vẻ',
    readingLesson: 'Đò ngang',
    genre: 'Báo cáo thảo luận nhóm',
    stage: 'Viết văn bản thực hành',
    writingPrompt: 'Dựa vào dàn ý đã lập trong hoạt động Viết ở Bài 7, viết báo cáo theo yêu cầu của đề bài. Lưu ý: Dùng dấu gạch ngang đánh dấu mỗi kết quả thảo luận.',
    learningObjective: 'Viết được bản báo cáo thảo luận nhóm hoàn chỉnh, đúng thể thức, nội dung trung thực, trình bày sạch sẽ rõ ràng.',
    practiceSteps: {
      step1Explore: 'Xem lại dàn ý và mẫu thể thức báo cáo thảo luận nhóm; lưu ý quy tắc dùng dấu gạch ngang đầu dòng.',
      step2GatherIdeas: 'Kiểm tra lại số liệu, tên người được phân công phụ trách từng phần việc.',
      step3Outline: 'Bám sát khung: Tiêu đề -> Kính gửi -> Nội dung thảo luận (phân mục rõ ràng) -> Kí tên đại diện.',
      step4Draft: 'Viết bản báo cáo hoàn chỉnh bằng chữ viết ngay ngắn, trình bày đúng vị trí quy định.',
      step5Revise: 'Đọc soát: Cấu trúc báo cáo, Nội dung báo cáo, Cách dùng từ, viết câu, Chính tả.'
    },
    evaluationRubric: [
      'Trình bày đúng thể thức văn bản hành chính đơn giản',
      'Nội dung báo cáo phản ánh trung thực kết quả thảo luận của nhóm',
      'Sử dụng dấu gạch ngang hoặc số thứ tự rành mạch ở từng mục việc'
    ],
    resources: {
      guideNotes: 'Lưu ý: Dùng dấu gạch ngang đánh dấu mỗi kết quả thảo luận. Đọc lại bài làm của em và chỉnh sửa theo nhận xét của thầy cô.',
      vocabAndPatterns: ['CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM', 'Độc lập – Tự do – Hạnh phúc', 'Kính gửi: Cô giáo chủ nhiệm...', 'Thay mặt nhóm...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 36-37.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 4, Bài 8, tr. 36',
    isSampleData: true
  },

  // Tuần 5 - Bài 9
  {
    id: 'kntt-hk1-w5-b9',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 5,
    lessonNumber: 9,
    lessonTitle: 'Tìm hiểu cách viết bài văn thuật lại một sự việc',
    page: 42,
    theme: 'Trải nghiệm và khám phá',
    readingLesson: 'Bầu trời trong quả trứng',
    genre: 'Bài văn thuật lại một sự việc',
    stage: 'Tìm hiểu kiểu bài',
    writingPrompt: 'Đọc bài văn "Trong buổi sinh hoạt lớp chiều nay..." trang 42 SGK và trả lời các câu hỏi về bố cục và trình tự thuật lại sự việc.',
    learningObjective: 'Hiểu cấu trúc 3 phần của bài văn thuật lại sự việc và cách sắp xếp các hoạt động theo trình tự thời gian hợp lí.',
    practiceSteps: {
      step1Explore: 'Đọc bài văn mẫu thuật lại lễ phát động xây dựng thư viện lớp của bạn Ánh Nguyên (trang 42 SGK).',
      step2GatherIdeas: 'Xác định các việc diễn ra: Trước giờ sinh hoạt lớp (vẽ tranh trang trí, kê bàn ghế) -> Trong giờ sinh hoạt lớp (cô phát biểu, lớp trưởng phát động, thảo luận, đăng kí quyên góp) -> Sau giờ sinh hoạt lớp.',
      step3Outline: 'Lập sơ đồ tư duy phân nhánh các hoạt động theo trình tự thời gian.',
      step4Draft: 'Hoàn thành phiếu nhận diện các từ ngữ chỉ thời gian, thứ tự (đầu tiên, tiếp theo, sau đó, cuối cùng).',
      step5Revise: 'Kiểm tra mối liên hệ giữa các đoạn văn và cảm xúc của người viết ở phần kết bài.'
    },
    evaluationRubric: [
      'Xác định rõ 3 phần: Mở bài (giới thiệu sự việc), Thân bài (các diễn biến theo thời gian), Kết bài (cảm nghĩ)',
      'Nhận diện các từ ngữ chuyển tiếp chỉ trình tự thời gian',
      'Phát hiện được cảm xúc chân thực của người thuật lại sự việc'
    ],
    resources: {
      guideNotes: 'Bài văn thuật lại một sự việc thường gồm 3 phần: Mở bài: Giới thiệu sự việc được chứng kiến hoặc tham gia; Thân bài: Thuật lại các hoạt động, việc làm chính theo trình tự thời gian hoặc phạm vi không gian bằng một hoặc nhiều đoạn văn; Kết bài: Nêu suy nghĩ, cảm xúc về sự việc.',
      suggestedQuestions: [
        'Bài văn trên có mấy phần? Đó là những phần nào?',
        'Phần mở bài giới thiệu những gì?',
        'Nêu những hoạt động được thuật lại ở thân bài theo đúng trình tự?',
        'Phần kết bài chia sẻ suy nghĩ, cảm xúc gì?'
      ],
      vocabAndPatterns: ['Trước giờ sinh hoạt...', 'Mở đầu buổi lễ...', 'Tiếp theo...', 'Sau một hồi thảo luận...', 'Buổi sinh hoạt kết thúc trong niềm vui...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 42-43.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 5, Bài 9, tr. 42',
    isSampleData: true
  },

  // Tuần 5 - Bài 10
  {
    id: 'kntt-hk1-w5-b10',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 5,
    lessonNumber: 10,
    lessonTitle: 'Lập dàn ý cho bài văn thuật lại một sự việc',
    page: 46,
    theme: 'Trải nghiệm và khám phá',
    readingLesson: 'Tiếng nói của cỏ cây',
    genre: 'Bài văn thuật lại một sự việc',
    stage: 'Lập dàn ý',
    writingPrompt: 'Viết bài văn thuật lại một hoạt động trải nghiệm em đã tham gia và chia sẻ suy nghĩ, cảm xúc của em về hoạt động đó.',
    learningObjective: 'Biết chọn lọc một hoạt động trải nghiệm thực tế (tham quan làng nghề, làm sản phẩm thủ công, tham gia CLB...) và lập dàn ý 3 phần.',
    practiceSteps: {
      step1Explore: 'Lựa chọn hoạt động trải nghiệm cụ thể đã tham gia và liệt kê các việc đã làm.',
      step2GatherIdeas: 'Xác định thời gian, địa điểm, những người tham gia, mục đích của hoạt động.',
      step3Outline: 'Lập dàn ý 3 phần: Mở bài (Cách 1: Trực tiếp, Cách 2: Gián tiếp) -> Thân bài (kể lần lượt hoạt động: đầu tiên, tiếp theo, sau đó, cuối cùng) -> Kết bài (kết quả và cảm xúc, bài học).',
      step4Draft: 'Điền chi tiết các mốc hoạt động vào khung dàn ý.',
      step5Revise: 'Góp ý và chỉnh sửa: Các hoạt động đã sắp xếp hợp lí chưa? Kết quả của hoạt động nêu rõ chưa? Cảm xúc đã được thể hiện sâu sắc chưa?'
    },
    evaluationRubric: [
      'Chọn được hoạt động trải nghiệm giàu ý nghĩa',
      'Dàn ý đủ 3 phần, có phân đoạn thân bài rõ ràng',
      'Sử dụng các từ ngữ chỉ thời gian để liên kết diễn biến',
      'Có cảm xúc và bài học rút ra ở phần kết bài'
    ],
    resources: {
      guideNotes: 'Mở bài: Cách 1 (Giới thiệu tên, thời gian, địa điểm), Cách 2 (Nêu tên hoạt động và lí do muốn tham gia); Thân bài: Kể lần lượt hoạt động theo trình tự (đầu tiên, tiếp theo, sau đó, trong khi đó, bên cạnh đó, cuối cùng); Kết bài: Nêu kết quả và bày tỏ suy nghĩ, tình cảm.',
      vocabAndPatterns: ['háo hức', 'ngỡ ngàng', 'tận mắt chứng kiến', 'bàn tay khéo léo', 'tự hào về truyền thống quê hương']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 46-47.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 5, Bài 10, tr. 46',
    isSampleData: true
  },

  // Tuần 6 - Bài 11
  {
    id: 'kntt-hk1-w6-b11',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 6,
    lessonNumber: 11,
    lessonTitle: 'Viết bài văn thuật lại một sự việc',
    page: 50,
    theme: 'Trải nghiệm và khám phá',
    readingLesson: 'Tập làm văn',
    genre: 'Bài văn thuật lại một sự việc',
    stage: 'Viết bài',
    writingPrompt: 'Dựa vào dàn ý đã lập trong hoạt động Viết ở Bài 10, viết bài văn thuật lại một hoạt động trải nghiệm em đã tham gia và chia sẻ suy nghĩ, cảm xúc của em về hoạt động đó.',
    learningObjective: 'Viết được một bài văn hoàn chỉnh (gồm mở bài, thân bài nhiều đoạn và kết bài), dùng từ ngữ gợi cảm, bộc lộ tình cảm tự nhiên.',
    practiceSteps: {
      step1Explore: 'Đọc lại dàn ý chi tiết ở Bài 10; chọn cách mở bài và kết bài phù hợp.',
      step2GatherIdeas: 'Chuẩn bị các từ nối thời gian và từ tượng hình, từ ngữ biểu cảm.',
      step3Outline: 'Triển khai thân bài thành các đoạn văn nhỏ tương ứng với từng giai đoạn trải nghiệm.',
      step4Draft: 'Viết bài văn hoàn chỉnh với giọng kể hào hứng, chân thực.',
      step5Revise: 'Đọc soát và chỉnh sửa: Trình tự sắp xếp các việc, Dùng từ đặt câu, Chính tả, Cách thể hiện cảm xúc.'
    },
    evaluationRubric: [
      'Bài viết có bố cục 3 phần rõ ràng',
      'Thân bài diễn đạt mạch lạc theo trình tự thời gian',
      'Có đan xen cảm xúc vui vẻ, hào hứng hoặc xúc động',
      'Không mắc lỗi dùng từ, câu văn ngắt nghỉ đúng chỗ'
    ],
    resources: {
      guideNotes: 'Tiêu chí soát lỗi: Trình tự sắp xếp các việc; Dùng từ, đặt câu; Chính tả; Cách thể hiện suy nghĩ, cảm xúc về hoạt động trải nghiệm.',
      vocabAndPatterns: ['Sau chuyến đi, em học thêm được...', 'Kỉ niệm ấy sẽ mãi đọng lại trong em...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 50-51.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 6, Bài 11, tr. 50',
    isSampleData: true
  },

  // Tuần 7 - Bài 12
  {
    id: 'kntt-hk1-w7-b12',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 7,
    lessonNumber: 12,
    lessonTitle: 'Tìm hiểu cách viết bài văn kể lại một câu chuyện',
    page: 52,
    theme: 'Trải nghiệm và khám phá',
    readingLesson: 'Nhà phát minh 6 tuổi',
    genre: 'Bài văn kể lại một câu chuyện',
    stage: 'Tìm hiểu kiểu bài',
    writingPrompt: 'Đọc bài văn kể lại câu chuyện "Cô bé Lọ Lem" trang 52 SGK, tìm phần mở bài, thân bài, kết bài và phân tích các sự việc chính.',
    learningObjective: 'Hiểu cấu trúc bài văn kể chuyện (mở bài giới thiệu câu chuyện, thân bài kể chuỗi sự việc có mở đầu - diễn biến - kết thúc, kết bài nêu cảm nghĩ/bài học).',
    practiceSteps: {
      step1Explore: 'Đọc bài văn kể lại chuyện "Cô bé Lọ Lem" của bạn Nguyễn Ngọc Mai Chi (trang 52-53 SGK).',
      step2GatherIdeas: 'Xác định các sự việc: Mẹ mất -> Bố mất -> Lọ Lem khóc vì không được dự hội -> Bụt hiện lên giúp đỡ -> Đi dự hội làm rơi giày -> Hoàng tử tìm chủ nhân chiếc giày.',
      step3Outline: 'Vẽ chuỗi sơ đồ diễn biến nối tiếp nhau từ sự việc 1 đến sự việc 6.',
      step4Draft: 'Hoàn thành phiếu phân tích câu chuyện; chú ý các từ in đậm chỉ thời gian (Chuyện kể rằng, Không lâu sau, Một ngày nọ, Đến gần 12 giờ, Từ đó).',
      step5Revise: 'Kiểm tra xem câu chuyện được kể theo trình tự nào (theo chuỗi sự việc hay theo đặc điểm nhân vật).'
    },
    evaluationRubric: [
      'Chỉ ra đúng 3 phần của bài văn kể chuyện',
      'Liệt kê đầy đủ và đúng trình tự các sự việc chính',
      'Nhận biết tác dụng của các từ ngữ kết nối sự việc'
    ],
    resources: {
      guideNotes: 'Bài văn kể lại một câu chuyện thường gồm 3 phần: Mở bài: Giới thiệu về câu chuyện (tên câu chuyện, lí do biết câu chuyện hoặc ấn tượng về câu chuyện); Thân bài: Kể lại câu chuyện theo trình tự diễn ra các sự việc (chú ý sử dụng từ ngữ kết nối các sự việc); Kết bài: Nêu suy nghĩ, cảm xúc về câu chuyện, mong muốn sau khi đọc câu chuyện hoặc bài học rút ra từ câu chuyện.',
      suggestedQuestions: [
        'Tìm phần mở bài, thân bài, kết bài và nêu nội dung chính của mỗi phần?',
        'Nối tiếp diễn biến của các sự việc trong phần thân bài?',
        'Những từ ngữ in đậm trong bài văn có tác dụng gì?'
      ],
      vocabAndPatterns: ['Chuyện kể rằng...', 'Không lâu sau...', 'Một ngày nọ...', 'Thế rồi...', 'Từ đó...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 52-54.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 7, Bài 12, tr. 52',
    isSampleData: true
  },

  // Tuần 7 - Bài 13
  {
    id: 'kntt-hk1-w7-b13',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 7,
    lessonNumber: 13,
    lessonTitle: 'Luyện viết đoạn mở bài, kết bài cho bài văn kể lại một câu chuyện',
    page: 57,
    theme: 'Trải nghiệm và khám phá',
    readingLesson: 'Con vẹt xanh',
    genre: 'Bài văn kể lại một câu chuyện',
    stage: 'Luyện viết bộ phận bài',
    writingPrompt: 'Xếp các mở bài vào nhóm thích hợp (mở bài trực tiếp / mở bài gián tiếp); xác định kiểu kết bài (kết bài mở rộng / không mở rộng); viết thử mở bài gián tiếp và kết bài mở rộng.',
    learningObjective: 'Phân biệt và thực hành viết thành thạo mở bài trực tiếp, mở bài gián tiếp, kết bài mở rộng và kết bài không mở rộng cho bài văn kể chuyện.',
    practiceSteps: {
      step1Explore: 'So sánh các ví dụ mở bài trực tiếp (giới thiệu ngay vào chuyện) và mở bài gián tiếp (dẫn từ hoàn cảnh được đọc/kể, kỉ niệm).',
      step2GatherIdeas: 'So sánh kết bài không mở rộng (chỉ nêu cảm xúc yêu thích) và kết bài mở rộng (nêu suy nghĩ, liên tưởng, ước mơ).',
      step3Outline: 'Chọn câu chuyện "Cô bé Lọ Lem" hoặc "Con vẹt xanh" để lập ý mở bài gián tiếp và kết bài mở rộng.',
      step4Draft: 'Viết đoạn mở bài gián tiếp và kết bài mở rộng hoàn chỉnh.',
      step5Revise: 'Kiểm tra mở bài có dẫn nhập tự nhiên không; kết bài có tạo được dư ba và ý nghĩa sâu sắc không.'
    },
    evaluationRubric: [
      'Phân biệt chính xác giữa mở bài trực tiếp và gián tiếp',
      'Viết được mở bài gián tiếp tự nhiên, không kể hết chuyện',
      'Viết được kết bài mở rộng có liên tưởng sâu sắc'
    ],
    resources: {
      guideNotes: 'Có hai cách viết mở bài và hai cách viết kết bài cho bài văn kể lại một câu chuyện: Mở bài trực tiếp: Giới thiệu ngay vào câu chuyện; Mở bài gián tiếp: Nói chuyện khác để dẫn vào câu chuyện; Kết bài mở rộng: Nêu suy nghĩ, cảm xúc và những liên tưởng, suy luận được gợi ra từ câu chuyện; Kết bài không mở rộng: Nêu suy nghĩ, cảm xúc về câu chuyện.',
      vocabAndPatterns: ['Tối nào cũng vậy, bằng giọng ấm áp...', 'Mỗi trang sách khép lại nhưng...', 'Ước gì trong giấc mơ, em được bước vào thế giới ấy...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 57-58.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 7, Bài 13, tr. 57',
    isSampleData: true
  },

  // Tuần 7 - Bài 14
  {
    id: 'kntt-hk1-w7-b14',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 7,
    lessonNumber: 14,
    lessonTitle: 'Lập dàn ý cho bài văn kể lại một câu chuyện',
    page: 61,
    theme: 'Trải nghiệm và khám phá',
    readingLesson: 'Chân trời cuối phố',
    genre: 'Bài văn kể lại một câu chuyện',
    stage: 'Lập dàn ý',
    writingPrompt: 'Chọn 1 trong 3 đề: Đề 1: Kể lại một câu chuyện cổ tích mà em yêu thích; Đề 2: Kể lại một câu chuyện mà em đã đọc trong sách giáo khoa Tiếng Việt; Đề 3: Kể lại một câu chuyện có nhân vật chính là trẻ em.',
    learningObjective: 'Lựa chọn câu chuyện phù hợp đề bài và lập dàn ý 3 phần hoàn chỉnh (mở bài trực tiếp/gián tiếp; thân bài chuỗi sự việc; kết bài mở rộng/không mở rộng).',
    practiceSteps: {
      step1Explore: 'Chọn 1 trong 3 đề bài; nhớ lại tên câu chuyện, tác giả, các nhân vật chính và bối cảnh.',
      step2GatherIdeas: 'Ghi chép các sự việc chính theo trình tự: sự việc mở đầu, các sự việc diễn biến cao trào, sự việc kết thúc.',
      step3Outline: 'Điền vào khung dàn ý: Mở bài (chọn trực tiếp hoặc gián tiếp) -> Thân bài (sự việc 1, 2, 3...) -> Kết bài (chọn mở rộng hoặc không mở rộng).',
      step4Draft: 'Hoàn thiện dàn ý chi tiết vào phiếu học tập.',
      step5Revise: 'Góp ý và chỉnh sửa: Thông tin về câu chuyện rõ ràng, đầy đủ; Các sự việc được sắp xếp theo trình tự hợp lí.'
    },
    evaluationRubric: [
      'Chọn đúng câu chuyện theo yêu cầu đề bài',
      'Dàn ý đủ 3 phần rõ ràng',
      'Các sự việc trong thân bài sắp xếp logic, không đảo lộn mốc thời gian'
    ],
    resources: {
      guideNotes: 'Mở bài: Giới thiệu câu chuyện theo cách mở bài trực tiếp hoặc gián tiếp; Thân bài: Kể câu chuyện theo trình tự các sự việc, chú ý kể đủ các nhân vật, tình huống chính của câu chuyện; Kết bài: Nêu suy nghĩ, cảm xúc... và những liên tưởng.',
      vocabAndPatterns: ['nhân vật chính', 'bối cảnh diễn ra', 'diễn biến kịch tính', 'kết thúc có hậu']
    },
    verificationStatus: 'needs_verification',
    verificationNotes: 'LƯU Ý ĐỐI CHIẾU: Trong bảng Excel của giáo viên ghi tên bài là "Viết bài văn kể lại một câu chuyện", nhưng SGK Tiếng Việt 4 Tập một tr. 61 và mục lục ghi chính xác là "Lập dàn ý cho bài văn kể lại một câu chuyện". Đã sửa chuẩn theo SGK và đánh dấu xác minh.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 7, Bài 14, tr. 61',
    isSampleData: true
  },

  // Tuần 8 - Bài 15
  {
    id: 'kntt-hk1-w8-b15',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 8,
    lessonNumber: 15,
    lessonTitle: 'Viết bài văn kể lại một câu chuyện',
    page: 65,
    theme: 'Trải nghiệm và khám phá',
    readingLesson: 'Gặt chữ trên non',
    genre: 'Bài văn kể lại một câu chuyện',
    stage: 'Viết bài',
    writingPrompt: 'Dựa vào dàn ý đã lập trong hoạt động Viết ở Bài 14, viết bài văn theo yêu cầu của đề bài (kể lại câu chuyện cổ tích / câu chuyện trong SGK / câu chuyện có nhân vật là trẻ em).',
    learningObjective: 'Viết được bài văn kể chuyện hoàn chỉnh, diễn đạt mạch lạc, dùng từ ngữ kết nối sự việc khéo léo và bộc lộ cảm xúc sâu sắc.',
    practiceSteps: {
      step1Explore: 'Đọc lại dàn ý đã lập ở Bài 14; rà soát lại các chi tiết then chốt của câu chuyện.',
      step2GatherIdeas: 'Lựa chọn các từ ngữ mở đầu đoạn, các từ nối liên kết sự việc (thoạt đầu, bất ngờ, chẳng bao lâu sau).',
      step3Outline: 'Triển khai thân bài thành các đoạn văn, mỗi đoạn kể một hoặc cụm sự việc liên quan.',
      step4Draft: 'Viết bài văn hoàn chỉnh vào vở bằng giọng kể truyền cảm.',
      step5Revise: 'Đọc soát: Cách viết mở bài/kết bài; Trình tự các sự việc ở thân bài; Cách dùng từ, đặt câu; Lỗi chính tả.'
    },
    evaluationRubric: [
      'Bài viết có bố cục 3 phần cân đối',
      'Kể đủ các sự việc chính mà không bỏ sót tình tiết quan trọng',
      'Mở bài và kết bài viết sáng tạo, giàu cảm xúc',
      'Ít lỗi dùng từ và lỗi ngữ pháp'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Cách viết mở bài, kết bài; Trình tự các sự việc được kể ở thân bài; Cách dùng từ, đặt câu; Chính tả.',
      vocabAndPatterns: ['Ngày xửa ngày xưa...', 'Bỗng nhiên...', 'Trải qua bao thử thách...', 'Câu chuyện để lại cho em bài học quý giá về...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 65.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 8, Bài 15, tr. 65',
    isSampleData: true
  },

  // Tuần 8 - Bài 16
  {
    id: 'kntt-hk1-w8-b16',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 8,
    lessonNumber: 16,
    lessonTitle: 'Trả bài văn kể lại một câu chuyện',
    page: 68,
    theme: 'Trải nghiệm và khám phá',
    readingLesson: 'Trước ngày xa quê',
    genre: 'Bài văn kể lại một câu chuyện',
    stage: 'Trả bài / chỉnh sửa',
    writingPrompt: 'Nghe thầy cô giáo nhận xét chung; đọc lại bài làm và lời phê; trao đổi bài làm trong nhóm; sửa lỗi và viết lại một đoạn cho hay hơn.',
    learningObjective: 'Biết tự đánh giá và sửa chữa bài viết kể chuyện dựa trên nhận xét; nâng cao kĩ năng diễn đạt bằng cách viết lại đoạn văn giàu hình ảnh.',
    practiceSteps: {
      step1Explore: 'Lắng nghe giáo viên nhận xét ưu và nhược điểm chung của bài văn kể chuyện.',
      step2GatherIdeas: 'Đối chiếu bài làm của mình với 4 tiêu chuẩn: Đủ mở - thân - kết bài; Sắp xếp sự việc đúng trình tự; Dùng từ, viết câu đúng; Không mắc lỗi chính tả.',
      step3Outline: 'Đánh dấu chỗ kể bị vắn tắt, thiếu từ nối hoặc lủng củng; lên phương án sửa đổi.',
      step4Draft: 'Viết lại một đoạn văn (mở bài, đoạn kịch tính ở thân bài, hoặc kết bài) ra vở chỉnh sửa.',
      step5Revise: 'So sánh đoạn mới viết lại với đoạn cũ; lắng nghe bạn đọc và góp ý.'
    },
    evaluationRubric: [
      'Tự nhận ra được lỗi diễn đạt hoặc thiếu sự việc trong bài',
      'Đoạn văn viết lại mạch lạc, từ ngữ biểu cảm hơn',
      'Tác phong chỉnh sửa bài cẩn thận, cầu thị'
    ],
    resources: {
      guideNotes: 'Tiêu chí đánh giá: Bài có đủ mở bài, thân bài, kết bài; Sắp xếp các sự việc theo đúng trình tự; Kể đầy đủ các sự việc chính; Dùng từ, viết câu đúng; Không mắc lỗi chính tả.',
      suggestedQuestions: [
        'Bài làm của em đã đủ 3 phần chưa?',
        'Các sự việc đã kể đúng theo trình tự diễn biến chưa?',
        'Em có thể thêm chi tiết tả nhân vật hoặc lời thoại nào để câu chuyện sinh động hơn?'
      ]
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 68.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 8, Bài 16, tr. 68',
    isSampleData: true
  },

  // Tuần 10 - Bài 17
  {
    id: 'kntt-hk1-w10-b17',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 10,
    lessonNumber: 17,
    lessonTitle: 'Tìm hiểu cách viết đoạn văn tưởng tượng',
    page: 79,
    theme: 'Niềm vui sáng tạo',
    readingLesson: 'Vẽ màu',
    genre: 'Đoạn văn tưởng tượng',
    stage: 'Tìm hiểu kiểu bài',
    writingPrompt: 'Đọc 2 đoạn văn về câu chuyện loài vật tìm mặt trời trang 79-80 SGK, so sánh chi tiết tưởng tượng được viết thêm và rút ra bài học ghi nhớ.',
    learningObjective: 'Hiểu cách viết đoạn văn tưởng tượng dựa trên câu chuyện đã đọc/nghe bằng 3 cách: bổ sung chi tiết (lời kể, tả), bổ sung lời thoại, hoặc thay đổi/viết tiếp đoạn kết.',
    practiceSteps: {
      step1Explore: 'Đọc đoạn trích gốc của Vũ Tú Nam và đoạn văn tưởng tượng viết thêm lời thoại của chim gõ kiến, công, liễu điếu, chích choè, gà trống.',
      step2GatherIdeas: 'Xác định chi tiết tưởng tượng có gì thú vị; nhận ra các cách tưởng tượng khác nhau.',
      step3Outline: 'Lập sơ đồ 3 cách viết tưởng tượng: Cách 1 (Viết thêm chi tiết kể/tả), Cách 2 (Viết thêm lời thoại), Cách 3 (Thay hoặc viết tiếp đoạn kết).',
      step4Draft: 'Hoàn thành phiếu nhận diện cách viết tưởng tượng.',
      step5Revise: 'Kiểm tra xem chi tiết tưởng tượng có hợp lí, có làm câu chuyện thêm hấp dẫn không.'
    },
    evaluationRubric: [
      'Phân biệt được chi tiết có trong câu chuyện gốc và chi tiết do người viết tưởng tượng ra',
      'Hiểu rõ 3 cách phát triển đoạn văn tưởng tượng',
      'Ý tưởng tưởng tượng độc đáo, ngộ nghĩnh và phù hợp tâm lí lứa tuổi'
    ],
    resources: {
      guideNotes: 'Khi viết đoạn văn tưởng tượng dựa vào một câu chuyện đã đọc hoặc đã nghe, người viết cần phát huy trí tưởng tượng để thay đổi, bổ sung chi tiết cho câu chuyện. Có nhiều cách viết đoạn văn tưởng tượng như: bổ sung chi tiết (lời kể, tả,...), bổ sung lời thoại của nhân vật, thay hoặc viết tiếp đoạn kết,...',
      suggestedQuestions: [
        'Đoạn văn tưởng tượng dưới đây đã viết thêm những gì so với đoạn văn của Vũ Tú Nam?',
        'Các chi tiết tưởng tượng trong đoạn văn trên có gì thú vị?',
        'Nếu viết đoạn văn tưởng tượng, em thích cách viết nào?'
      ],
      vocabAndPatterns: ['Tớ còn bận tập múa!', 'Tớ còn bận luyện giọng!', 'Đường xa vạn dặm, tớ thì bé nhỏ...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 79-81.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 10, Bài 17, tr. 79',
    isSampleData: true
  },

  // Tuần 11 - Bài 18
  {
    id: 'kntt-hk1-w11-b18',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 11,
    lessonNumber: 18,
    lessonTitle: 'Tìm ý cho đoạn văn tưởng tượng',
    page: 83,
    theme: 'Niềm vui sáng tạo',
    readingLesson: 'Đồng cỏ nở hoa',
    genre: 'Đoạn văn tưởng tượng',
    stage: 'Tìm ý',
    writingPrompt: 'Viết đoạn văn tưởng tượng dựa vào một câu chuyện đã đọc hoặc đã nghe (Ví dụ: Sự tích cây vú sữa - chọn Phương án 1: Bổ sung lời kể, tả; Phương án 2: Viết tiếp đoạn kết; hoặc Phương án khác).',
    learningObjective: 'Biết chọn một câu chuyện quen thuộc, chọn phương án tưởng tượng thích hợp và lập ý chi tiết cho đoạn văn (Mở đầu, Triển khai, Kết thúc).',
    practiceSteps: {
      step1Explore: 'Chọn câu chuyện yêu thích (như Sự tích cây vú sữa, Cây khế, Rùa và thỏ...).',
      step2GatherIdeas: 'Chọn 1 phương án tưởng tượng: Phương án 1 (Bổ sung tâm trạng hối hận hoặc sự thay đổi của cậu bé); Phương án 2 (Mẹ trở về hoặc tất cả chỉ là giấc mơ tỉnh dậy ôm chầm lấy mẹ).',
      step3Outline: 'Lập ý 3 phần: Mở đầu (giới thiệu tên truyện & liên tưởng) -> Triển khai (kể, tả những gì tưởng tượng, tạo bất ngờ, dùng so sánh/nhân hoá) -> Kết thúc (cảm nghĩ).',
      step4Draft: 'Ghi chép các ý tưởng vào phiếu tìm ý.',
      step5Revise: 'Rà soát: Trình bày rõ những điều đã tưởng tượng; Nội dung thể hiện sự sáng tạo và tính nhân văn.'
    },
    evaluationRubric: [
      'Chọn phương án tưởng tượng rõ ràng',
      'Tạo được chi tiết bất ngờ, giàu cảm xúc cho câu chuyện',
      'Sử dụng biện pháp nhân hoá, so sánh làm cho câu văn sinh động'
    ],
    resources: {
      guideNotes: 'Mở đầu: Giới thiệu tên câu chuyện đã gợi cho em những liên tưởng, tưởng tượng; Triển khai: Kể, tả những gì em đã tưởng tượng về câu chuyện theo phương án đã chọn (Lưu ý tạo được sự bất ngờ, thú vị; sử dụng biện pháp nhân hoá, so sánh); Kết thúc: Nêu cảm nghĩ hoặc gợi ra những điều tưởng tượng tiếp theo.',
      vocabAndPatterns: ['Bỗng một phép màu xảy ra...', 'Trong làn sương mờ ảo...', 'Cậu bé mở mắt ra và nhận ra đó là một giấc mơ...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 83-85.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 11, Bài 18, tr. 83',
    isSampleData: true
  },

  // Tuần 11 - Bài 19
  {
    id: 'kntt-hk1-w11-b19',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 11,
    lessonNumber: 19,
    lessonTitle: 'Viết đoạn văn tưởng tượng',
    page: 88,
    theme: 'Niềm vui sáng tạo',
    readingLesson: 'Thanh âm của núi',
    genre: 'Đoạn văn tưởng tượng',
    stage: 'Viết bài',
    writingPrompt: 'Dựa vào các ý đã tìm trong hoạt động Viết ở Bài 18, viết đoạn văn theo yêu cầu của đề bài (viết đoạn văn tưởng tượng dựa vào một câu chuyện đã đọc hoặc đã nghe).',
    learningObjective: 'Viết được một đoạn văn tưởng tượng giàu hình ảnh, bất ngờ, ngôn từ trong sáng, kết nối tự nhiên với câu chuyện gốc.',
    practiceSteps: {
      step1Explore: 'Đọc lại phiếu tìm ý ở Bài 18; chuẩn bị mở đoạn thật lôi cuốn.',
      step2GatherIdeas: 'Lựa chọn các chi tiết miêu tả không gian, hành động, lời nói của nhân vật mang tính kì ảo hoặc sáng tạo.',
      step3Outline: 'Triển khai liên tục các câu theo trình tự diễn biến tưởng tượng.',
      step4Draft: 'Viết đoạn văn hoàn chỉnh vào vở bằng lời văn tự nhiên.',
      step5Revise: 'Đọc soát: Nội dung tưởng tượng kết nối với truyện đã đọc; Có bất ngờ, thú vị; Cách viết mở đầu/kết thúc mới mẻ; Không mắc lỗi chính tả.'
    },
    evaluationRubric: [
      'Đoạn văn thể hiện trí tưởng tượng phong phú',
      'Chi tiết tưởng tượng gắn kết hợp lí với cốt truyện gốc',
      'Mở đầu và kết thúc mới mẻ, hấp dẫn người đọc'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Nội dung đoạn văn tưởng tượng kết nối với câu chuyện đã đọc hoặc đã nghe; Những điều tưởng tượng tạo được sự bất ngờ, thú vị; Cách viết mở đầu hoặc kết thúc mới mẻ, hấp dẫn; Không mắc lỗi về dùng từ, đặt câu, chính tả.',
      vocabAndPatterns: ['kì diệu', 'lung linh', 'ôm chầm lấy', 'giọt nước mắt hối hận', 'ngập tràn ánh sáng']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 88-89.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 11, Bài 19, tr. 88',
    isSampleData: true
  },

  // Tuần 12 - Bài 20
  {
    id: 'kntt-hk1-w12-b20',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 12,
    lessonNumber: 20,
    lessonTitle: 'Trả bài viết đoạn văn tưởng tượng',
    page: 91,
    theme: 'Niềm vui sáng tạo',
    readingLesson: 'Bầu trời mùa thu',
    genre: 'Đoạn văn tưởng tượng',
    stage: 'Trả bài / chỉnh sửa',
    writingPrompt: 'Nghe thầy cô giáo nhận xét chung; đọc nhận xét để biết ưu và nhược điểm; trao đổi với bạn để tìm cách sửa lỗi; viết lại câu văn cho hay hơn.',
    learningObjective: 'Biết tiếp thu nhận xét, sửa lỗi diễn đạt và học tập những chi tiết tưởng tượng độc đáo, sáng tạo của bạn trong lớp.',
    practiceSteps: {
      step1Explore: 'Lắng nghe giáo viên biểu dương những bài có chi tiết tưởng tượng độc đáo, giàu cảm xúc.',
      step2GatherIdeas: 'Tự đánh giá đoạn văn của mình xem có đủ mở đầu, triển khai, kết thúc chưa; câu văn có lủng củng không.',
      step3Outline: 'Đánh dấu câu văn hoặc chi tiết cần chỉnh sửa (tăng thêm yếu tố bất ngờ hoặc sửa câu chưa rõ ý).',
      step4Draft: 'Viết lại câu hoặc đoạn văn vào vở chỉnh sửa.',
      step5Revise: 'Đọc to câu văn mới viết để kiểm tra ngữ điệu và tính mạch lạc.'
    },
    evaluationRubric: [
      'Nhận biết ưu điểm và điểm cần khắc phục trong bài viết',
      'Chỉnh sửa câu văn mạch lạc, hấp dẫn hơn',
      'Học hỏi các chi tiết tưởng tượng thú vị từ bạn bè'
    ],
    resources: {
      guideNotes: 'Tiêu chí đánh giá: Cách viết mở đầu có sức cuốn hút; Cách viết kết thúc gây bất ngờ hoặc có sức gợi mở; Những chi tiết tưởng tượng độc đáo, thú vị, có nhiều sáng tạo.',
      suggestedQuestions: [
        'Đoạn văn có đủ mở đầu, triển khai, kết thúc không?',
        'Những điều em tưởng tượng có kết nối với câu chuyện không?',
        'Đoạn văn có mắc lỗi về dùng từ, viết câu, chính tả không?'
      ]
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 91-92.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 12, Bài 20, tr. 91',
    isSampleData: true
  },

  // Tuần 12 - Bài 21
  {
    id: 'kntt-hk1-w12-b21',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 12,
    lessonNumber: 21,
    lessonTitle: 'Tìm hiểu cách viết hướng dẫn thực hiện một công việc',
    page: 95,
    theme: 'Niềm vui sáng tạo',
    readingLesson: 'Làm thỏ con bằng giấy',
    genre: 'Văn bản hướng dẫn',
    stage: 'Tìm hiểu kiểu văn bản',
    writingPrompt: 'Đọc văn bản hướng dẫn "Cách làm một chú nghé ọ bằng lá" trang 95-96 SGK và trả lời các câu hỏi về cấu trúc, cách trình bày các bước.',
    learningObjective: 'Nhận biết cấu trúc 2 phần của bài viết hướng dẫn thực hiện một công việc: Phần chuẩn bị (dụng cụ, vật liệu) và Phần hướng dẫn thực hiện (các bước theo thứ tự).',
    practiceSteps: {
      step1Explore: 'Đọc văn bản mẫu "Cách làm một chú nghé ọ bằng lá" (chuẩn bị lá to, sợi dây cước; Bước 1: dùng kéo cắt; Bước 2: cuộn phần lá làm bụng).',
      step2GatherIdeas: 'Xác định các dụng cụ cần chuẩn bị và hành động ở từng bước làm đồ chơi.',
      step3Outline: 'Lập sơ đồ cấu trúc bài viết hướng dẫn gồm 2 phần rõ rệt.',
      step4Draft: 'Làm bài tập nối các bước theo đúng trình tự logic.',
      step5Revise: 'Kiểm tra tính chính xác, rõ ràng của câu hướng dẫn để người khác có thể làm theo được.'
    },
    evaluationRubric: [
      'Nêu đủ 2 phần: Chuẩn bị và Hướng dẫn thực hiện',
      'Các bước sắp xếp đúng quy trình thực hiện công việc',
      'Câu văn ngắn gọn, dễ hiểu, sử dụng động từ chỉ thao tác chính xác'
    ],
    resources: {
      guideNotes: 'Bài viết hướng dẫn thực hiện một công việc thường gồm 2 phần: Phần chuẩn bị: Nêu những dụng cụ hoặc vật liệu cần có để thực hiện công việc; Phần hướng dẫn thực hiện: Nêu các bước thực hiện.',
      suggestedQuestions: [
        'Bài viết hướng dẫn thực hiện công việc gì?',
        'Phần chuẩn bị yêu cầu phải có những gì?',
        'Phần hướng dẫn thực hiện gồm mấy bước? Nêu nội dung của mỗi bước?'
      ],
      vocabAndPatterns: ['Dụng cụ, vật liệu', 'Bước 1: Dùng kéo cắt...', 'Bước 2: Cuộn phần lá...', 'Thế là chú nghé ọ đã sẵn sàng...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 95-97.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 12, Bài 21, tr. 95',
    isSampleData: true
  },

  // Tuần 12 - Bài 22 (LƯU Ý ĐỐI CHIẾU: BẢNG EXCEL GHI SAI TÊN BÀI!)
  {
    id: 'kntt-hk1-w12-b22',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 12,
    lessonNumber: 22,
    lessonTitle: 'Viết hướng dẫn thực hiện một công việc',
    page: 99,
    theme: 'Niềm vui sáng tạo',
    readingLesson: 'Bức tường có nhiều phép lạ',
    genre: 'Văn bản hướng dẫn',
    stage: 'Viết văn bản thực hành',
    writingPrompt: 'Đề bài: Viết hướng dẫn các bước làm một đồ chơi mà em yêu thích (Chuẩn bị dụng cụ, vật liệu; Lập dàn ý các bước; Viết hướng dẫn theo dàn ý; Đọc soát và chỉnh sửa).',
    learningObjective: 'Viết được một bài hướng dẫn ngắn gọn, mạch lạc về các bước làm đồ chơi quen thuộc (như gấp máy bay, làm con diều, làm thỏ giấy...).',
    practiceSteps: {
      step1Explore: 'Chọn đồ chơi để viết hướng dẫn; xác định đồ chơi đó làm bằng gì và cần những vật liệu nào.',
      step2GatherIdeas: 'Liệt kê các dụng cụ: kéo, bút chì, hồ dán, giấy màu... và trình tự các thao tác.',
      step3Outline: 'Lập dàn ý 2 phần: Dụng cụ, vật liệu cần chuẩn bị -> Hướng dẫn thực hiện: Bước 1, Bước 2, Bước 3...',
      step4Draft: 'Viết bài hướng dẫn hoàn chỉnh theo dàn ý đã lập.',
      step5Revise: 'Đọc soát: Cách trình bày các bước có rõ ràng không, dùng từ chỉ thao tác có chính xác không.'
    },
    evaluationRubric: [
      'Nêu đủ dụng cụ, vật liệu cần thiết',
      'Các bước hướng dẫn rõ ràng, đúng thứ tự thực hiện',
      'Người đọc có thể thực hành làm theo thành công'
    ],
    resources: {
      guideNotes: 'Lập dàn ý: Những dụng cụ, vật liệu cần chuẩn bị; Hướng dẫn thực hiện: kể lại các bước hướng dẫn làm đồ chơi (Ví dụ: 1. Vẽ; 2. Cắt; 3. Dán;...). Viết hướng dẫn theo dàn ý đã lập.',
      vocabAndPatterns: ['cắt hình chữ nhật', 'gấp theo đường kẻ nét đứt', 'dán mép giấy', 'dùng bút màu trang trí']
    },
    verificationStatus: 'needs_verification',
    verificationNotes: 'LƯU Ý ĐỐI CHIẾU CẦN GIÁO VIÊN XÁC MINH: Trong bảng Excel (trang 11 PDF 3), dòng Tuần 12 Bài 22 Trang 99 ghi nhầm là "Lập dàn ý cho bài văn miêu tả con vật". Tuy nhiên, theo SGK Tiếng Việt 4 Tập một tr. 99 (thuộc bài 22 Bức tường có nhiều phép lạ), tên bài thực tế là "Viết hướng dẫn thực hiện một công việc" (Đề bài: Viết hướng dẫn các bước làm một đồ chơi mà em yêu thích). Hệ thống đã cập nhật đúng theo SGK gốc.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 12, Bài 22, tr. 99',
    isSampleData: true
  },

  // Tuần 13 - Bài 23
  {
    id: 'kntt-hk1-w13-b23',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 13,
    lessonNumber: 23,
    lessonTitle: 'Tìm hiểu cách viết đơn',
    page: 104,
    theme: 'Niềm vui sáng tạo',
    readingLesson: 'Bét-tô-ven và bản xô-nát Ánh trăng',
    genre: 'Viết đơn',
    stage: 'Tìm hiểu kiểu văn bản',
    writingPrompt: 'Đọc lá đơn "Đơn xin tham gia Câu lạc bộ Sáng tạo" trang 104 SGK và trả lời các câu hỏi về thể thức, mục đích, người gửi, người nhận đơn.',
    learningObjective: 'Nắm vững quy cách trình bày một lá đơn chuẩn mực theo quy định (Quốc hiệu tiêu ngữ, Tên đơn, Nơi nhận đơn, Nội dung đơn, Lời cam đoan/cảm ơn, Địa điểm ngày tháng, Chữ kí).',
    practiceSteps: {
      step1Explore: 'Đọc lá đơn của bạn Vũ Nam Hải gửi Ban Giám hiệu Trường Tiểu học Trung Hoà (trang 104 SGK).',
      step2GatherIdeas: 'Xác định mục đích viết đơn, người nhận, thông tin bản thân, lí do viết đơn và lời hứa.',
      step3Outline: 'Ghi nhớ thứ tự các phần bắt buộc phải có trong đơn.',
      step4Draft: 'Thực hành điền các thông tin còn thiếu vào mẫu đơn nhận diện.',
      step5Revise: 'Kiểm tra xem tên đơn viết chữ in hoa chưa, nơi nhận có trang trọng và có chữ kí rõ họ tên chưa.'
    },
    evaluationRubric: [
      'Nhận biết đầy đủ các phần cấu thành một lá đơn',
      'Hiểu rõ mục đích viết đơn và đối tượng nhận đơn',
      'Trình bày đúng thể thức văn bản hành chính'
    ],
    resources: {
      guideNotes: 'Cần trình bày đơn đúng quy định: Quốc hiệu, tiêu ngữ; Tên đơn; Nơi nhận đơn; Nội dung đơn (giới thiệu bản thân, lí do viết đơn, lời hứa, lời cảm ơn); Địa điểm, thời gian viết đơn; Chữ kí và họ tên người viết đơn.',
      suggestedQuestions: [
        'Đơn trên được viết nhằm mục đích gì?',
        'Đơn do ai viết? Đơn được gửi cho ai?',
        'Người viết đã trình bày những gì trong đơn?',
        'Đơn gồm có những mục nào? Nêu cách sắp xếp các mục đó.'
      ],
      sampleTemplate: 'CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM / Độc lập – Tự do – Hạnh phúc / ĐƠN XIN... / Kính gửi:... / Em tên là:... / Em viết đơn này xin được... / Em xin hứa:... / Em xin chân thành cảm ơn! / Địa điểm, ngày... tháng... năm... / Người viết đơn (kí tên)'
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 104-105.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 13, Bài 23, tr. 104',
    isSampleData: true
  },

  // Tuần 13 - Bài 24
  {
    id: 'kntt-hk1-w13-b24',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 13,
    lessonNumber: 24,
    lessonTitle: 'Viết đơn',
    page: 107,
    theme: 'Niềm vui sáng tạo',
    readingLesson: 'Người tìm đường lên các vì sao',
    genre: 'Viết đơn',
    stage: 'Viết văn bản thực hành',
    writingPrompt: 'Chọn 1 trong 2 đề: Đề 1: Viết đơn xin tham gia câu lạc bộ em yêu thích; Đề 2: Viết đơn xin nghỉ một buổi học.',
    learningObjective: 'Tự viết được một lá đơn hoàn chỉnh gửi Ban Giám hiệu hoặc Giáo viên chủ nhiệm, đúng thể thức, lời văn lễ phép, lí do chính đáng.',
    practiceSteps: {
      step1Explore: 'Chọn đề bài (xin vào CLB hoặc xin nghỉ ốm/nghỉ việc gia đình); xác định người nhận đơn.',
      step2GatherIdeas: 'Ghi thông tin cá nhân (họ tên, lớp, trường); lí do cụ thể; lời hứa chấp hành nội quy/chép bài đầy đủ.',
      step3Outline: 'Sắp xếp theo thứ tự: Quốc hiệu, tiêu ngữ -> Tên đơn -> Kính gửi -> Thông tin học sinh -> Nội dung đơn -> Lời hứa & cảm ơn -> Ngày tháng, Chữ kí.',
      step4Draft: 'Viết lá đơn hoàn chỉnh vào vở.',
      step5Revise: 'Đọc soát: Kiểm tra quốc hiệu, tiêu ngữ, tên đơn, nơi nhận, nội dung, lời cảm ơn, chữ kí.'
    },
    evaluationRubric: [
      'Đúng thể thức mẫu đơn quy định',
      'Lí do viết đơn rõ ràng, chính đáng',
      'Lời văn lễ phép, có lời hứa trách nhiệm',
      'Không mắc lỗi chính tả, trình bày sạch đẹp'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Quốc hiệu, tiêu ngữ; Tên đơn; Nơi nhận đơn; Nội dung đơn (thông tin người viết, lí do, lời cam đoan, lời cảm ơn); Địa điểm, ngày tháng; Chữ kí và họ tên.',
      vocabAndPatterns: ['Kính gửi: Cô giáo chủ nhiệm Lớp 4...', 'Lí do em viết đơn là...', 'Em xin hứa sẽ chép bài và làm bài tập đầy đủ.']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 107-108.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 13, Bài 24, tr. 107',
    isSampleData: true
  },

  // Tuần 14 - Bài 25
  {
    id: 'kntt-hk1-w14-b25',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 14,
    lessonNumber: 25,
    lessonTitle: 'Tìm hiểu cách viết bài văn miêu tả con vật',
    page: 112,
    theme: 'Chắp cánh ước mơ',
    readingLesson: 'Bay cùng ước mơ',
    genre: 'Miêu tả con vật',
    stage: 'Tìm hiểu kiểu bài',
    writingPrompt: 'Đọc bài văn "Su là chú rùa nhỏ..." trang 112-113 SGK và trả lời các câu hỏi về bố cục 3 phần, cách mở bài, kết bài và các đặc điểm miêu tả con vật.',
    learningObjective: 'Hiểu cấu trúc 3 phần của bài văn miêu tả con vật: Mở bài (trực tiếp hoặc gián tiếp), Thân bài (tả đặc điểm ngoại hình, hoạt động, thói quen), Kết bài (mở rộng hoặc không mở rộng).',
    practiceSteps: {
      step1Explore: 'Đọc bài văn tả chú rùa Su của bạn Nguyễn Ngọc Minh Anh (trang 112 SGK).',
      step2GatherIdeas: 'Tìm các chi tiết tả ngoại hình (mai cứng gồ ghề màu nâu vàng, đầu thuôn nhọn, mắt hạt đậu, bốn chân tí hon) và hoạt động (bò, leo trèo).',
      step3Outline: 'So sánh mở bài trực tiếp vs mở bài gián tiếp; kết bài không mở rộng vs kết bài mở rộng.',
      step4Draft: 'Vẽ sơ đồ cấu trúc bài văn miêu tả con vật.',
      step5Revise: 'Kiểm tra sự cân đối giữa tả ngoại hình và tả hoạt động, thói quen của con vật.'
    },
    evaluationRubric: [
      'Nắm vững bố cục 3 phần của bài văn tả con vật',
      'Phân biệt được 2 cách mở bài và 2 cách kết bài',
      'Biết cách chọn lọc các chi tiết tiêu biểu về hình dáng và hoạt động'
    ],
    resources: {
      guideNotes: 'Bài văn miêu tả con vật thường gồm 3 phần: Mở bài: Giới thiệu về con vật theo cách mở bài trực tiếp hoặc gián tiếp; Thân bài: Tả đặc điểm ngoại hình, hoạt động,... của con vật; Kết bài: Nêu suy nghĩ, cảm xúc,... về con vật theo cách kết bài mở rộng hoặc không mở rộng.',
      suggestedQuestions: [
        'Tìm phần mở bài, thân bài, kết bài của bài văn trên?',
        'Phần thân bài có mấy đoạn? Mỗi đoạn miêu tả đặc điểm gì của con rùa?',
        'Nêu những điểm khác nhau giữa hai cách mở bài và hai cách kết bài?'
      ],
      vocabAndPatterns: ['gồ ghề như chiếc áo giáp', 'nhỏ xíu như hạt đậu', 'bốn chiếc chân tí hon', 'bò chậm rãi']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 112-114.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 14, Bài 25, tr. 112',
    isSampleData: true
  },

  // Tuần 14 - Bài 26
  {
    id: 'kntt-hk1-w14-b26',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 14,
    lessonNumber: 26,
    lessonTitle: 'Quan sát con vật',
    page: 116,
    theme: 'Chắp cánh ước mơ',
    readingLesson: 'Con trai người làm vườn',
    genre: 'Miêu tả con vật',
    stage: 'Quan sát / thu thập ý',
    writingPrompt: 'Lựa chọn một con vật (vật nuôi trong nhà hoặc động vật hoang dã); sử dụng các giác quan để quan sát trực tiếp hoặc qua tranh ảnh, ti vi; ghi chép kết quả quan sát theo bảng.',
    learningObjective: 'Biết quan sát có mục đích, kết hợp mắt nhìn, tai nghe, tay chạm để ghi chép đặc điểm bao quát, chi tiết từng bộ phận và hoạt động của con vật.',
    practiceSteps: {
      step1Explore: 'Chọn con vật quan sát (chó, mèo, thỏ, chim bồ câu, trâu, ngựa...).',
      step2GatherIdeas: 'Ghi chép đặc điểm bao quát (hình dáng, kích thước, màu sắc, bộ lông/da) và chi tiết từng bộ phận (mắt, mũi, miệng, tai, chân, đuôi).',
      step3Outline: 'Ghi chép hoạt động, thói quen (nằm ngủ, chạy nhảy, trèo cây, rình bắt mồi, tiếng kêu).',
      step4Draft: 'Điền thông tin vào bảng quan sát con vật hai cột (Đặc điểm bao quát & Hoạt động, thói quen).',
      step5Revise: 'Chọn chi tiết nổi bật khiến em thích thú nhất; phân biệt giữa quan sát thực tế với suy đoán.'
    },
    evaluationRubric: [
      'Ghi chép được các chi tiết cụ thể, chân thực',
      'Quan sát bằng nhiều giác quan',
      'Chọn được đặc điểm nổi bật riêng biệt của con vật'
    ],
    resources: {
      guideNotes: 'Lưu ý: Quan sát kĩ đặc điểm nổi bật của con vật khiến em thấy thú vị (ví dụ: sừng trâu cong vút, đuôi mèo dài, mỏ vẹt khoằm,...). Quan sát kĩ hoạt động, thói quen nổi bật.',
      vocabAndPatterns: ['trắng muốt', 'mềm mại', 'tròn xoe', 'nhỏ xíu', 'cong cong', 'cuộn tròn', 'êm ru', 'nhanh thoăn thoắt']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 116-118.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 14, Bài 26, tr. 116',
    isSampleData: true
  },

  // Tuần 15 - Bài 27
  {
    id: 'kntt-hk1-w15-b27',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 15,
    lessonNumber: 27,
    lessonTitle: 'Luyện viết đoạn văn miêu tả con vật',
    page: 120,
    theme: 'Chắp cánh ước mơ',
    readingLesson: 'Nếu em có một khu vườn',
    genre: 'Miêu tả con vật',
    stage: 'Luyện viết',
    writingPrompt: 'Đọc các đoạn văn miêu tả con ong xanh biếc, cá rô ron, vòi con voi trang 120-121 SGK; viết đoạn văn tả hoạt động hoặc một đặc điểm ngoại hình của con vật mà em yêu thích.',
    learningObjective: 'Viết được một đoạn văn miêu tả tập trung vào ngoại hình nổi bật hoặc hoạt động đặc trưng của con vật, sử dụng từ ngữ gợi tả và so sánh.',
    practiceSteps: {
      step1Explore: 'Đọc 3 đoạn văn mẫu của Vũ Tú Nam, Nguyễn Văn Chương, Vũ Hùng; tìm những từ in đậm gợi tả.',
      step2GatherIdeas: 'Chọn một đặc điểm hoặc hoạt động nổi bật từ bảng quan sát ở Bài 26.',
      step3Outline: 'Sắp xếp câu từ bao quát đến chi tiết hoặc theo diễn biến hành động của con vật.',
      step4Draft: 'Viết đoạn văn từ 5 đến 7 câu vào vở.',
      step5Revise: 'Sửa câu liệt kê đơn điệu; bổ sung thêm từ tượng hình hoặc biện pháp so sánh, nhân hoá sinh động.'
    },
    evaluationRubric: [
      'Đoạn văn tập trung vào một đối tượng con vật cụ thể',
      'Có từ ngữ gợi tả đường nét, màu sắc hoặc âm thanh',
      'Sử dụng khéo léo phép so sánh hoặc nhân hoá'
    ],
    resources: {
      guideNotes: 'Đọc các đoạn văn: Đoạn 1 (tả con ong xanh biếc), Đoạn 2 (tả đàn cá rô ron tinh nghịch), Đoạn 3 (tả chiếc vòi kì lạ của chú voi con). Viết đoạn văn tả hoạt động hoặc một đặc điểm ngoại hình.',
      vocabAndPatterns: ['bụng nó tròn, thon, bóng loáng', 'lướt nhanh', 'lao vụt như một mũi tên', 'ngúng nguẩy', 'đung đưa vòi']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 120-122.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 15, Bài 27, tr. 120',
    isSampleData: true
  },

  // Tuần 15 - Bài 28
  {
    id: 'kntt-hk1-w15-b28',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 15,
    lessonNumber: 28,
    lessonTitle: 'Lập dàn ý cho bài văn miêu tả con vật',
    page: 123,
    theme: 'Chắp cánh ước mơ',
    readingLesson: 'Bốn mùa mơ ước',
    genre: 'Miêu tả con vật',
    stage: 'Lập dàn ý',
    writingPrompt: 'Chọn 1 trong 2 đề: Đề 1: Miêu tả một con vật mà em đã chăm sóc và gắn bó; Đề 2: Miêu tả một con vật mà em đã được quan sát trên ti vi hoặc trong phim ảnh.',
    learningObjective: 'Hoàn thiện dàn ý chi tiết cho bài văn miêu tả con vật gồm đủ 3 phần, cân đối giữa ngoại hình và hoạt động, thói quen.',
    practiceSteps: {
      step1Explore: 'Chọn đề bài và xác định đối tượng con vật định tả.',
      step2GatherIdeas: 'Tổng hợp các ý từ bảng quan sát (bài 26) và đoạn văn đã luyện viết (bài 27).',
      step3Outline: 'Lập dàn ý 3 phần: Mở bài (giới thiệu con vật) -> Thân bài (Ngoại hình bao quát & chi tiết; Hoạt động & thói quen quen thuộc) -> Kết bài (tình cảm, kỉ niệm, mong muốn).',
      step4Draft: 'Ghi chép dàn ý chi tiết vào phiếu học tập.',
      step5Revise: 'Kiểm tra độ bao quát, tính cân đối giữa các phần và tránh liệt kê rời rạc.'
    },
    evaluationRubric: [
      'Dàn ý đủ 3 phần rõ ràng',
      'Chọn được đặc điểm tiêu biểu, không liệt kê tràn lan',
      'Trình tự miêu tả hợp lí từ ngoài vào trong, từ hình dáng đến hoạt động'
    ],
    resources: {
      guideNotes: 'Lưu ý: Miêu tả kĩ hơn những đặc điểm nổi bật của con vật hoặc những đặc điểm em thấy thú vị. Các ý trong phần thân bài được sắp xếp hợp lí.',
      vocabAndPatterns: ['Mở bài: giới thiệu tên con vật, xuất xứ...', 'Thân bài: bộ lông, đôi mắt, bốn chân, thói quen bắt chuột/chơi đùa...', 'Kết bài: tình bạn gắn bó...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 123-125.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 15, Bài 28, tr. 123',
    isSampleData: true
  },

  // Tuần 16 - Bài 29
  {
    id: 'kntt-hk1-w16-b29',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 16,
    lessonNumber: 29,
    lessonTitle: 'Viết bài văn miêu tả con vật',
    page: 128,
    theme: 'Chắp cánh ước mơ',
    readingLesson: 'Ở Vương quốc Tương Lai',
    genre: 'Miêu tả con vật',
    stage: 'Viết bài',
    writingPrompt: 'Dựa vào dàn ý đã lập trong hoạt động Viết ở Bài 28, viết bài văn theo yêu cầu của đề bài (tả con vật gắn bó hoặc xem trên ti vi).',
    learningObjective: 'Viết được một bài văn miêu tả con vật hoàn chỉnh, giàu hình ảnh so sánh, nhân hoá, từ ngữ gợi tả sinh động và dạt dào tình cảm yêu thương loài vật.',
    practiceSteps: {
      step1Explore: 'Đọc lại dàn ý chi tiết ở Bài 28; nhắc lại các tiêu chí đánh giá bài văn miêu tả.',
      step2GatherIdeas: 'Chuẩn bị từ vựng miêu tả con vật (từ tượng thanh tiếng kêu, từ tượng hình dáng dấp, phép so sánh đôi mắt, bước đi).',
      step3Outline: 'Triển khai mở bài (gián tiếp), thân bài (tách thành các đoạn tả ngoại hình và hoạt động), kết bài (mở rộng tình cảm).',
      step4Draft: 'Viết toàn bài văn vào vở bài tập.',
      step5Revise: 'Đọc soát: Bố cục, các đặc điểm của con vật, trình tự sắp xếp các ý, cách dùng từ, viết câu, lỗi chính tả.'
    },
    evaluationRubric: [
      'Đúng đề bài, đúng thể loại văn miêu tả con vật',
      'Đặc điểm nổi bật, lời văn sinh động, giàu hình ảnh so sánh',
      'Tình cảm gắn bó với con vật chân thành, tự nhiên',
      'Bài viết sạch đẹp, đúng chính tả'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Các đặc điểm của con vật; Trình tự sắp xếp các ý; Cách dùng từ, viết câu; Sửa lỗi trong bài làm (nếu có).',
      vocabAndPatterns: ['bộ lông óng ả', 'mắt tròn xoe như hai hòn bi ve', 'bước đi êm ái', 'quấn quýt bên em', 'người bạn nhỏ trung thành']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 128-129.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 16, Bài 29, tr. 128',
    isSampleData: true
  },

  // Tuần 16 - Bài 30
  {
    id: 'kntt-hk1-w16-b30',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 16,
    lessonNumber: 30,
    lessonTitle: 'Trả bài văn miêu tả con vật',
    page: 130,
    theme: 'Chắp cánh ước mơ',
    readingLesson: 'Cánh chim nhỏ',
    genre: 'Miêu tả con vật',
    stage: 'Trả bài / chỉnh sửa',
    writingPrompt: 'Nghe thầy cô giáo nhận xét chung; đọc lại bài làm và lời phê; đọc bài làm của các bạn được khen; sửa lỗi và viết lại 1-2 đoạn trong bài làm cho hay hơn.',
    learningObjective: 'Biết phân tích ưu nhược điểm bài viết của bản thân, sửa lỗi dùng từ, lỗi câu liệt kê và rèn luyện kĩ năng viết lại đoạn văn miêu tả sống động hơn.',
    practiceSteps: {
      step1Explore: 'Lắng nghe cô giáo nhận xét tổng thể về bài làm của cả lớp.',
      step2GatherIdeas: 'Đọc kĩ nhận xét của cô giáo để biết ưu điểm và nhược điểm (bố cục, lựa chọn đặc điểm, dùng từ, chính tả).',
      step3Outline: 'Đọc bài văn hay của bạn; ghi lại những cách mở bài, kết bài hay, cách sử dụng biện pháp so sánh, nhân hoá độc đáo.',
      step4Draft: 'Viết lại 1-2 đoạn trong bài làm của em cho hay hơn vào vở.',
      step5Revise: 'So sánh đoạn mới với đoạn cũ; đối chiếu với tiêu chí đánh giá.'
    },
    evaluationRubric: [
      'Xác định được các điểm cần sửa chữa trong bài',
      'Viết lại đoạn văn giàu cảm xúc và hình ảnh hơn',
      'Ghi chép được điều bổ ích từ bài làm của bạn'
    ],
    resources: {
      guideNotes: 'Học tập từ bài của bạn: Cách mở bài, kết bài; Cách lựa chọn từ ngữ miêu tả; Cách sử dụng biện pháp so sánh, nhân hoá; Cách thể hiện tình cảm, cảm xúc.',
      suggestedQuestions: [
        'Bài làm có đủ mở bài, thân bài, kết bài không?',
        'Các đặc điểm của con vật có được lựa chọn và miêu tả theo trình tự hợp lí không?',
        'Bài làm mắc mấy lỗi về dùng từ, đặt câu, chính tả?'
      ]
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 130-132.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 16, Bài 30, tr. 130',
    isSampleData: true
  },

  // Tuần 17 - Bài 31
  {
    id: 'kntt-hk1-w17-b31',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 17,
    lessonNumber: 31,
    lessonTitle: 'Tìm hiểu cách viết thư',
    page: 134,
    theme: 'Chắp cánh ước mơ',
    readingLesson: 'Nếu chúng mình có phép lạ',
    genre: 'Viết thư',
    stage: 'Tìm hiểu kiểu văn bản',
    writingPrompt: 'Đọc bức thư của bạn Phương Linh gửi bạn Việt Phương trang 134 SGK và trả lời các câu hỏi về bố cục bức thư (địa điểm, thời gian, lời chào, nội dung chính, lời chúc, chữ kí).',
    learningObjective: 'Hiểu mục đích, bố cục 3 phần của một bức thư (Phần đầu, Phần chính, Phần cuối) và cách xưng hô phù hợp với người nhận thư.',
    practiceSteps: {
      step1Explore: 'Đọc bức thư thăm bạn của Phương Linh (Hà Nội, ngày 19 tháng 7 năm 2022).',
      step2GatherIdeas: 'Xác định các thành phần: địa điểm, ngày tháng, lời xưng hô, thăm hỏi sức khoẻ/học tập, chia sẻ ước mơ, lời chúc và chữ kí.',
      step3Outline: 'Hệ thống hoá cấu trúc 3 phần chuẩn của bức thư giao tiếp.',
      step4Draft: 'Thực hành trao đổi về những thông tin em muốn viết trong thư gửi cho bạn ở xa.',
      step5Revise: 'Kiểm tra xem lời chào, lời xưng hô đã thân mật và đúng mực chưa.'
    },
    evaluationRubric: [
      'Chỉ ra đúng 3 phần của một bức thư',
      'Hiểu rõ nội dung cần viết trong từng phần',
      'Xưng hô phù hợp với quan hệ giữa người viết và người nhận thư'
    ],
    resources: {
      guideNotes: 'Một bức thư thường gồm những nội dung sau đây: Phần đầu: Địa điểm và thời gian viết thư; lời thưa gửi, lời chào đầu thư; Phần chính: Thăm hỏi tình hình của người nhận thư; chia sẻ tin tức của người viết thư; Phần cuối: Lời cảm ơn, lời chúc, hứa hẹn; chữ kí và tên hoặc họ, tên.',
      suggestedQuestions: [
        'Thư trên của ai gửi cho ai? Dựa vào đâu mà em biết?',
        'Bức thư gồm mấy phần? Nêu nội dung của từng phần?'
      ],
      vocabAndPatterns: ['Việt Phương thân mến!', 'Dạo này cậu và gia đình vẫn khoẻ chứ?', 'Cho tớ gửi lời chúc sức khoẻ tới gia đình cậu.', 'Bạn của cậu / Cháu ngoan của ông bà']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 134-135.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 17, Bài 31, tr. 134',
    isSampleData: true
  },

  // Tuần 17 - Bài 32
  {
    id: 'kntt-hk1-w17-b32',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 17,
    lessonNumber: 32,
    lessonTitle: 'Viết thư',
    page: 136,
    theme: 'Chắp cánh ước mơ',
    readingLesson: 'Anh Ba',
    genre: 'Viết thư',
    stage: 'Viết văn bản giao tiếp',
    writingPrompt: 'Đề bài: Viết một bức thư cho người thân hoặc bạn bè ở xa (thăm hỏi tình hình sức khoẻ, kể chuyện học tập, chia sẻ ước mơ, gửi lời chúc tốt đẹp).',
    learningObjective: 'Tự viết được một bức thư hoàn chỉnh gửi người thân (ông bà, bố mẹ) hoặc bạn bè ở xa, giàu cảm xúc, đúng thể thức và phép lịch sự.',
    practiceSteps: {
      step1Explore: 'Xác định đối tượng nhận thư (ông bà ở quê, bạn cũ chuyển trường) và mục đích viết thư.',
      step2GatherIdeas: 'Ghi chép các ý: lời thăm hỏi, tin vui về học tập của bản thân, kỉ niệm nhớ nhất, lời chúc tết/sức khoẻ.',
      step3Outline: 'Sắp xếp theo thứ tự 3 phần: Phần đầu -> Phần chính -> Phần cuối.',
      step4Draft: 'Viết bức thư hoàn chỉnh bằng nét chữ nắn nót.',
      step5Revise: 'Đọc soát: Các phần của bức thư; Nội dung thư (thăm hỏi, chia sẻ tin tức); Dùng từ, viết câu; Chính tả.'
    },
    evaluationRubric: [
      'Đúng cấu trúc 3 phần của bức thư',
      'Lời thưa gửi, xưng hô lễ phép, ấm áp',
      'Nội dung thăm hỏi và chia sẻ chân thành, tự nhiên',
      'Trình bày đúng quy cách dòng đầu và dòng cuối'
    ],
    resources: {
      guideNotes: 'Lưu ý: Cần lựa chọn cách xưng hô phù hợp; cần thể hiện sự quan tâm, tình cảm, cảm xúc của em đối với người nhận thư. Đọc soát và chỉnh sửa theo các tiêu chí.',
      vocabAndPatterns: ['Ông bà kính yêu của cháu!', 'Nhân dịp năm mới, cháu kính chúc...', 'Cháu hứa sẽ cố gắng học giỏi...', 'Cháu gái của ông bà']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK tr. 136-138.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 17, Bài 32, tr. 136',
    isSampleData: true
  },

  // ===================== HỌC KÌ II =====================
  // Tuần 19 - Bài 1
  {
    id: 'kntt-hk2-w19-b1',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 19,
    lessonNumber: 1,
    lessonTitle: 'Tìm hiểu cách viết đoạn văn nêu tình cảm, cảm xúc',
    page: 10,
    theme: 'Sống để yêu thương',
    readingLesson: 'Hải Thượng Lãn Ông',
    genre: 'Đoạn văn nêu tình cảm, cảm xúc',
    stage: 'Tìm hiểu kiểu bài',
    writingPrompt: 'Đọc đoạn văn của Nguyễn Nhật Ánh trang 10-11 SGK Tập hai (kể về tình bạn ấm áp với nhỏ Thắm) và trả lời các câu hỏi về cách bộc lộ cảm xúc.',
    learningObjective: 'Nhận biết cách thể hiện tình cảm, cảm xúc qua đoạn văn có bố cục rõ ràng (Mở đầu khẳng định tình cảm, Triển khai kỉ niệm gắn bó, Kết thúc lời hứa/khẳng định mãi không đổi thay).',
    practiceSteps: {
      step1Explore: 'Đọc đoạn văn mẫu của nhà văn Nguyễn Nhật Ánh (trang 10-11 SGK Tập hai).',
      step2GatherIdeas: 'Xác định đối tượng được bày tỏ tình cảm (bạn Thắm), chi tiết gây xúc động và từ ngữ biểu cảm.',
      step3Outline: 'Lập sơ đồ cấu trúc đoạn văn nêu tình cảm, cảm xúc: Mở đầu -> Triển khai (kỉ niệm, suy nghĩ) -> Kết thúc.',
      step4Draft: 'Làm bài tập nhận diện các câu văn trực tiếp biểu đạt tình cảm trong bài đọc.',
      step5Revise: 'Kiểm tra xem cảm xúc có gắn với chi tiết cụ thể và được diễn đạt chân thực không.'
    },
    evaluationRubric: [
      'Nhận biết đúng cấu trúc 3 phần của đoạn văn nêu tình cảm, cảm xúc',
      'Chỉ ra được các từ ngữ trực tiếp bộc lộ tình cảm',
      'Hiểu cách gắn cảm xúc với kỉ niệm cụ thể của người viết'
    ],
    resources: {
      guideNotes: 'Viết đoạn văn nêu tình cảm, cảm xúc cần nêu được tình cảm, cảm xúc đó là gì và được biểu lộ như thế nào. Đoạn văn thường có 3 phần: mở đầu, triển khai, kết thúc.',
      suggestedQuestions: [
        'Tìm phần mở đầu, triển khai và kết thúc của đoạn văn trên?',
        'Tìm nội dung tương ứng với từng phần của đoạn văn?',
        'Tìm từ ngữ trực tiếp biểu đạt tình cảm, cảm xúc trong đoạn văn?'
      ],
      vocabAndPatterns: ['ấm áp và thân thiết', 'nhớ không biết chừng nào', 'tình bạn mãi mãi không thay đổi', 'gắn bó keo sơn']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tiếng Việt 4 Tập hai, tr. 10-11.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 19, Bài 1, tr. 10',
    isSampleData: true
  },

  // Tuần 19 - Bài 2
  {
    id: 'kntt-hk2-w19-b2',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 19,
    lessonNumber: 2,
    lessonTitle: 'Tìm ý cho đoạn văn nêu tình cảm, cảm xúc về một người gần gũi, thân thiết',
    page: 14,
    theme: 'Sống để yêu thương',
    readingLesson: 'Vệt phấn trên mặt bàn',
    genre: 'Đoạn văn nêu tình cảm, cảm xúc',
    stage: 'Tìm ý',
    writingPrompt: 'Đề bài: Viết đoạn văn nêu tình cảm, cảm xúc về một người gần gũi, thân thiết (Chuẩn bị: chọn người thân/bạn bè; tìm ý: cử chỉ, lời nói, kỉ niệm, việc làm; lập khung dàn ý).',
    learningObjective: 'Lựa chọn kỉ niệm, lời nói hoặc việc làm đáng nhớ của một người gần gũi (ông bà, cha mẹ, anh chị em, thầy cô, bạn thân) để lập ý cho đoạn văn.',
    practiceSteps: {
      step1Explore: 'Chọn người gần gũi, thân thiết em muốn viết (ông bà, bố mẹ, thầy cô, người bạn thân).',
      step2GatherIdeas: 'Ghi chép: cử chỉ, lời nói, việc làm của người đó khiến em xúc động; kỉ niệm đáng nhớ nhất; tình cảm của người đó dành cho em.',
      step3Outline: 'Sắp xếp ý: Mở đầu (giới thiệu người thân thiết & tình cảm) -> Triển khai (chi tiết gây xúc động, từ ngữ biểu cảm) -> Kết thúc (khẳng định tình cảm).',
      step4Draft: 'Điền thông tin vào phiếu tìm ý cá nhân.',
      step5Revise: 'Chọn chi tiết chân thực, xúc động; tránh kể liệt kê quá nhiều việc không liên quan.'
    },
    evaluationRubric: [
      'Xác định rõ người thân thiết và tình cảm dành cho người đó',
      'Có kỉ niệm hoặc chi tiết cụ thể khiến người đọc xúc động',
      'Ý kiến và cảm xúc được sắp xếp theo trình tự rõ ràng'
    ],
    resources: {
      guideNotes: 'Mở đầu: Giới thiệu người gần gũi, thân thiết mà em muốn bày tỏ tình cảm, cảm xúc; Triển khai: Nêu những điều ở người đó làm em xúc động (cử chỉ, lời nói, kỉ niệm), nêu rõ tình cảm của em; Kết thúc: Khẳng định tình cảm, cảm xúc của em.',
      vocabAndPatterns: ['yêu quý', 'khâm phục', 'trân trọng', 'ngưỡng mộ', 'nhớ mong', 'tần tảo', 'hiền từ']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 14-15.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 19, Bài 2, tr. 14',
    isSampleData: true
  },

  // Tuần 20 - Bài 3
  {
    id: 'kntt-hk2-w20-b3',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 20,
    lessonNumber: 3,
    lessonTitle: 'Viết đoạn văn nêu tình cảm, cảm xúc về một người gần gũi, thân thiết',
    page: 19,
    theme: 'Sống để yêu thương',
    readingLesson: 'Ông Bụt đã đến',
    genre: 'Đoạn văn nêu tình cảm, cảm xúc',
    stage: 'Viết bài',
    writingPrompt: 'Dựa vào các ý đã tìm được trong hoạt động Viết ở Bài 2, viết đoạn văn theo yêu cầu của đề bài (nêu tình cảm, cảm xúc về một người gần gũi, thân thiết).',
    learningObjective: 'Viết được một đoạn văn hoàn chỉnh (7-9 câu) bày tỏ tình cảm chân thực, sâu sắc đối với người gần gũi, có sử dụng từ ngữ gợi cảm và câu văn liên kết.',
    practiceSteps: {
      step1Explore: 'Xem lại phiếu tìm ý ở Bài 2 và tranh minh hoạ gợi ý các hoàn cảnh gần gũi trong gia đình.',
      step2GatherIdeas: 'Lựa chọn từ ngữ trực tiếp và gián tiếp biểu lộ tình cảm yêu thương, biết ơn.',
      step3Outline: 'Viết câu mở đoạn gây ấn tượng, triển khai 4-5 câu chi tiết, kết đoạn bằng lời khẳng định tha thiết.',
      step4Draft: 'Viết đoạn văn bằng lời văn của chính em vào vở.',
      step5Revise: 'Đọc soát: Cách sắp xếp ý trong đoạn văn; Cách nêu những cử chỉ, lời nói khiến em xúc động; Cách chọn từ ngữ bộc lộ cảm xúc; Lỗi chính tả.'
    },
    evaluationRubric: [
      'Đoạn văn viết đúng quy cách, có câu mở đoạn và kết đoạn rõ',
      'Cảm xúc chân thực, gắn liền với hành động cụ thể của người thân',
      'Câu văn giàu hình ảnh, dùng từ biểu cảm đúng chỗ'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Cách sắp xếp ý trong đoạn văn; Cách nêu những cử chỉ, lời nói, suy nghĩ, việc làm của người gần gũi khiến em có tình cảm; Cách chọn từ ngữ, cách viết câu bộc lộ tình cảm; Chính tả.',
      vocabAndPatterns: ['Mỗi khi nhìn bàn tay chai sạn của mẹ...', 'Giọng nói ấm áp của bà như dòng nước mát...', 'Em tự nhủ sẽ luôn ngoan ngoãn để ông bà vui lòng.']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 19-20.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 20, Bài 3, tr. 19',
    isSampleData: true
  },

  // Tuần 20 - Bài 4
  {
    id: 'kntt-hk2-w20-b4',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 20,
    lessonNumber: 4,
    lessonTitle: 'Tìm ý cho đoạn văn nêu tình cảm, cảm xúc về một nhân vật trong văn học',
    page: 22,
    theme: 'Sống để yêu thương',
    readingLesson: 'Quả ngọt cuối mùa',
    genre: 'Đoạn văn nêu tình cảm, cảm xúc',
    stage: 'Tìm ý',
    writingPrompt: 'Đề bài: Viết đoạn văn nêu tình cảm, cảm xúc của em về một nhân vật trong câu chuyện hoặc bài thơ đã đọc, đã nghe.',
    learningObjective: 'Biết chọn một nhân vật văn học giàu ý nghĩa (Ma-ri-a, người nhạc sĩ, bà ngoại, chú gà con...) và tìm dẫn chứng chi tiết để bày tỏ cảm xúc.',
    practiceSteps: {
      step1Explore: 'Chọn một nhân vật trong tác phẩm đã học mang lại cho em nhiều xúc động nhất.',
      step2GatherIdeas: 'Ghi lại: điều ở nhân vật gây ấn tượng (ngoại hình, phẩm chất, việc làm); cảm xúc của em (thích thú, khâm phục, thương mến); cách thể hiện tình cảm.',
      step3Outline: 'Lập dàn ý 3 phần: Mở đầu (giới thiệu nhân vật & ấn tượng chung) -> Triển khai (nêu chi tiết ấn tượng, cảm xúc & hành động học tập) -> Kết thúc (đánh giá về nhân vật & khẳng định tình cảm).',
      step4Draft: 'Điền vào bảng chi tiết nhân vật - dẫn chứng tác phẩm - cảm xúc của em.',
      step5Revise: 'Kiểm tra xem nhận xét có căn cứ chính xác từ câu chuyện không; tránh nhớ nhầm tình tiết.'
    },
    evaluationRubric: [
      'Chọn đúng nhân vật văn học trong sách',
      'Nêu được đặc điểm nổi bật kèm dẫn chứng cụ thể từ tác phẩm',
      'Bộc lộ rõ cảm xúc trân trọng, khâm phục nhân vật'
    ],
    resources: {
      guideNotes: 'Mở đầu: Giới thiệu nhân vật và nêu ý kiến khái quát; Triển khai: Nêu những điều em ấn tượng (lòng vị tha, kiên nhẫn, đức hi sinh), nêu cảm xúc của em, thể hiện tình cảm; Kết thúc: Đánh giá về nhân vật và khẳng định lại tình cảm, cảm xúc.',
      vocabAndPatterns: ['nhân hậu', 'hi sinh thầm lặng', 'kiên trì vượt khó', 'tấm lòng nhân ái', 'người thầy tận tâm']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 22-24.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 20, Bài 4, tr. 22',
    isSampleData: true
  },

  // Tuần 21 - Bài 5
  {
    id: 'kntt-hk2-w21-b5',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 21,
    lessonNumber: 5,
    lessonTitle: 'Viết đoạn văn nêu tình cảm, cảm xúc về một nhân vật trong văn học',
    page: 27,
    theme: 'Sống để yêu thương',
    readingLesson: 'Tờ báo tường của tôi',
    genre: 'Đoạn văn nêu tình cảm, cảm xúc',
    stage: 'Viết bài',
    writingPrompt: 'Dựa vào các ý đã tìm trong hoạt động Viết ở Bài 4, viết đoạn văn theo yêu cầu của đề bài (nêu cảm xúc về một nhân vật văn học).',
    learningObjective: 'Viết được một đoạn văn hoàn chỉnh (7-9 câu) nêu cảm xúc về nhân vật văn học, dẫn chứng chính xác và thể hiện tình cảm chân thực.',
    practiceSteps: {
      step1Explore: 'Xem lại phiếu tìm ý ở Bài 4; chú ý cách dẫn dắt tên tác phẩm và nhân vật.',
      step2GatherIdeas: 'Dùng từ ngữ biểu cảm để kết nối giữa phẩm chất của nhân vật với bài học cho bản thân.',
      step3Outline: 'Viết câu mở đoạn nêu ấn tượng, các câu thân đoạn phân tích việc làm của nhân vật, câu kết đoạn khẳng định sự yêu mến.',
      step4Draft: 'Viết đoạn văn hoàn chỉnh vào vở.',
      step5Revise: 'Đọc soát: Bố cục đoạn văn; Cách thể hiện tình cảm, cảm xúc; Cách dùng từ, đặt câu; Lỗi chính tả.'
    },
    evaluationRubric: [
      'Đoạn văn có kết cấu chặt chẽ, mạch lạc',
      'Dẫn chứng chi tiết trong tác phẩm chính xác',
      'Cảm xúc bộc lộ sâu sắc, rút ra được bài học cho bản thân'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Bố cục đoạn văn; Cách thể hiện tình cảm, cảm xúc; Cách dùng từ, đặt câu; Chính tả. Sửa lỗi trong đoạn văn của em (nếu có).',
      vocabAndPatterns: ['Hình ảnh nhân vật... đã để lại trong em ấn tượng sâu sắc.', 'Em học được ở nhân vật lòng dũng cảm...', 'Mỗi lần đọc lại câu chuyện, em lại thêm khâm phục...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 27-28.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 21, Bài 5, tr. 27',
    isSampleData: true
  },

  // Tuần 21 - Bài 6
  {
    id: 'kntt-hk2-w21-b6',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 21,
    lessonNumber: 6,
    lessonTitle: 'Trả bài viết đoạn văn nêu tình cảm, cảm xúc về một nhân vật trong văn học',
    page: 29,
    theme: 'Sống để yêu thương',
    readingLesson: 'Tiếng ru',
    genre: 'Đoạn văn nêu tình cảm, cảm xúc',
    stage: 'Trả bài / chỉnh sửa',
    writingPrompt: 'Nghe thầy cô giáo nhận xét chung; đọc hoặc nghe bài viết của bạn để học tập; sửa lỗi trong bài viết và viết lại những câu văn cho hay hơn.',
    learningObjective: 'Biết tự rà soát và hoàn thiện đoạn văn nêu cảm xúc về nhân vật; học tập bạn bè cách chọn chi tiết đắt giá và từ ngữ truyền cảm.',
    practiceSteps: {
      step1Explore: 'Lắng nghe giáo viên nhận xét chung về bài làm của lớp.',
      step2GatherIdeas: 'Đối chiếu bài làm của mình với các tiêu chí: chọn nhân vật thú vị, cảm xúc chân thành, câu văn hay.',
      step3Outline: 'Đánh dấu những chỗ còn kể chuyện lan man thay vì bộc lộ cảm xúc để lên phương án sửa chữa.',
      step4Draft: 'Viết lại câu hoặc đoạn văn vào vở chỉnh sửa.',
      step5Revise: 'So sánh đoạn mới với đoạn cũ; ghi nhớ bài học kinh nghiệm.'
    },
    evaluationRubric: [
      'Nhận diện đúng chỗ diễn đạt chưa đạt yêu cầu',
      'Biết thay thế từ ngữ chung chung bằng từ ngữ gợi cảm',
      'Đoạn văn sau khi sửa thể hiện tình cảm rõ ràng và sâu sắc hơn'
    ],
    resources: {
      guideNotes: 'Học tập từ bài viết của bạn: Chọn được nhân vật thú vị trong câu chuyện hoặc bài thơ; Đoạn văn thể hiện được cảm xúc chân thành; Viết được câu văn hay.',
      suggestedQuestions: [
        'Em đã nêu được những chi tiết ấn tượng về nhân vật chưa?',
        'Cách bộc lộ cảm xúc của em đã chân thực chưa hay còn gượng ép?',
        'Có câu văn nào mắc lỗi dùng từ, câu sai ngữ pháp không?'
      ]
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 29-30.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 21, Bài 6, tr. 29',
    isSampleData: true
  },

  // Tuần 22 - Bài 7
  {
    id: 'kntt-hk2-w22-b7',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 22,
    lessonNumber: 7,
    lessonTitle: 'Tìm hiểu cách viết hướng dẫn sử dụng một sản phẩm',
    page: 33,
    theme: 'Sống để yêu thương',
    readingLesson: 'Con muốn làm một cái cây',
    genre: 'Văn bản hướng dẫn',
    stage: 'Tìm hiểu kiểu văn bản',
    writingPrompt: 'Đọc văn bản "Hướng dẫn sử dụng nồi cơm điện" trang 33-34 SGK Tập hai và trả lời các câu hỏi về các bước thao tác, lưu ý an toàn.',
    learningObjective: 'Nhận biết cấu trúc và ngôn ngữ của văn bản hướng dẫn sử dụng sản phẩm (Trước khi dùng, Trong khi dùng, Sau khi dùng; các lưu ý an toàn và bảo quản).',
    practiceSteps: {
      step1Explore: 'Đọc văn bản hướng dẫn sử dụng nồi cơm điện (1. Trước khi nấu cơm; 2. Khi nấu cơm; 3. Sau khi nấu cơm).',
      step2GatherIdeas: 'Xác định các thao tác đúng và những việc không nên làm (không vo gạo trong lòng nồi, lau khô mặt ngoài, không mở nắp khi đang nấu).',
      step3Outline: 'Lập sơ đồ quy trình 3 giai đoạn sử dụng sản phẩm gia dụng.',
      step4Draft: 'Hoàn thành bài tập nhận diện câu mệnh lệnh/hướng dẫn trong văn bản.',
      step5Revise: 'Kiểm tra tính chính xác và an toàn của các bước hướng dẫn.'
    },
    evaluationRubric: [
      'Chỉ ra đúng các bước sử dụng sản phẩm theo trình tự',
      'Nêu được những lưu ý an toàn quan trọng',
      'Ngôn ngữ ngắn gọn, rõ ràng, dễ thao tác theo'
    ],
    resources: {
      guideNotes: 'Cách viết hướng dẫn sử dụng một sản phẩm: Hướng dẫn rõ các bước sử dụng sản phẩm; Trong mỗi bước, nêu rõ những việc cần làm.',
      suggestedQuestions: [
        'Văn bản trên hướng dẫn sử dụng sản phẩm gì?',
        'Việc sử dụng sản phẩm đó chia làm mấy bước?',
        'Trong mỗi bước, sản phẩm đó được sử dụng như thế nào?'
      ],
      vocabAndPatterns: ['Trước khi sử dụng...', 'Khi đang sử dụng...', 'Sau khi sử dụng...', 'Lưu ý: Không nên...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 33-35.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 22, Bài 7, tr. 33',
    isSampleData: true
  },

  // Tuần 22 - Bài 8
  {
    id: 'kntt-hk2-w22-b8',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 22,
    lessonNumber: 8,
    lessonTitle: 'Viết hướng dẫn sử dụng một sản phẩm',
    page: 37,
    theme: 'Sống để yêu thương',
    readingLesson: 'Trên khóm tre đầu ngõ',
    genre: 'Văn bản hướng dẫn',
    stage: 'Viết văn bản hướng dẫn',
    writingPrompt: 'Đề bài: Viết hướng dẫn sử dụng một đồ dùng quen thuộc với em (ví dụ: mũ bảo hiểm, xe đạp trẻ em, ti vi...).',
    learningObjective: 'Viết được một bài hướng dẫn sử dụng đồ dùng cụ thể, ngắn gọn, đúng trình tự (chuẩn bị, sử dụng, bảo quản cất giữ) và lưu ý an toàn.',
    practiceSteps: {
      step1Explore: 'Chọn một đồ dùng quen thuộc (xe đạp, mũ bảo hiểm, điều khiển ti vi, đèn bàn...).',
      step2GatherIdeas: 'Thu thập thông tin: kiểm tra trước khi dùng, thao tác khi dùng, cách cất giữ và bảo quản sau khi dùng.',
      step3Outline: 'Lập dàn ý 3 bước: 1. Trước khi dùng; 2. Khi dùng; 3. Sau khi dùng (kèm lưu ý việc nên và không nên làm).',
      step4Draft: 'Viết văn bản hướng dẫn hoàn chỉnh vào vở.',
      step5Revise: 'Đọc soát: Trình tự các bước, Cách hướng dẫn sử dụng, Cách dùng từ, viết câu, Lỗi chính tả.'
    },
    evaluationRubric: [
      'Nêu đủ các bước theo trình tự thực tế',
      'Chỉ ra việc nên làm và không nên làm rõ ràng',
      'Lời văn gãy gọn, chính xác, không suy đoán sai thông số'
    ],
    resources: {
      guideNotes: 'Lưu ý: Có thể chỉ ra những việc nên làm và không nên làm khi sử dụng sản phẩm. Tiêu chí đọc soát: Trình tự các bước; Cách hướng dẫn sử dụng; Cách dùng từ, viết câu; Chính tả.',
      vocabAndPatterns: ['cài quai chắc chắn', 'kiểm tra phanh và lốp', 'tắt nguồn điện khi không sử dụng', 'lau chùi bằng khăn mềm']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 37-38.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 22, Bài 8, tr. 37',
    isSampleData: true
  },

  // Tuần 23 - Bài 9
  {
    id: 'kntt-hk2-w23-b9',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 23,
    lessonNumber: 9,
    lessonTitle: 'Lập dàn ý cho bài văn kể lại một câu chuyện',
    page: 43,
    theme: 'Uống nước nhớ nguồn',
    readingLesson: 'Sự tích con Rồng cháu Tiên',
    genre: 'Bài văn kể lại một câu chuyện',
    stage: 'Lập dàn ý',
    writingPrompt: 'Đề bài: Viết bài văn kể lại câu chuyện về một nhân vật lịch sử mà em đã đọc, đã nghe (Trần Quốc Toản, Phạm Ngũ Lão, Yết Kiêu, Lê Lai, Nguyễn Trung Trực, Hồ Chí Minh, Kim Đồng...).',
    learningObjective: 'Biết chọn câu chuyện về nhân vật lịch sử giàu ý nghĩa và lập dàn ý 3 phần (mở bài trực tiếp/gián tiếp; thân bài các sự việc chính làm nổi bật suy nghĩ, hành động của nhân vật; kết bài).',
    practiceSteps: {
      step1Explore: 'Chọn câu chuyện về nhân vật lịch sử em yêu mến (Trần Quốc Toản bóp nát quả cam, Phạm Ngũ Lão đan sọt, Kim Đồng...).',
      step2GatherIdeas: 'Ghi chép: bối cảnh lịch sử, mở đầu, diễn biến sự việc chính, đóng góp của nhân vật đối với đất nước, cảm xúc của em.',
      step3Outline: 'Lập khung dàn ý: Mở bài (trực tiếp/gián tiếp) -> Thân bài (kể chuỗi sự việc, làm nổi bật lòng yêu nước) -> Kết bài (mở rộng/không mở rộng).',
      step4Draft: 'Điền chi tiết các mốc lịch sử vào phiếu dàn ý.',
      step5Revise: 'Góp ý và chỉnh sửa: Dàn ý có đủ 3 phần; Chi tiết được lựa chọn hợp lí; Sự việc sắp xếp đúng diễn biến câu chuyện.'
    },
    evaluationRubric: [
      'Chọn đúng nhân vật lịch sử và câu chuyện chính xác',
      'Dàn ý đủ 3 phần rõ ràng',
      'Làm nổi bật được hành động, phẩm chất cao đẹp của người anh hùng lịch sử'
    ],
    resources: {
      guideNotes: 'Mở bài: Chọn cách mở bài trực tiếp hoặc gián tiếp; Thân bài: Kể các sự việc chính theo diễn biến của câu chuyện, chú ý làm nổi bật suy nghĩ, hành động,... của nhân vật lịch sử; Kết bài: Chọn cách kết bài mở rộng hoặc không mở rộng.',
      vocabAndPatterns: ['Lòng yêu nước nồng nàn', 'Bóp nát quả cam vì căm thù giặc', 'Quên mình vì đại nghĩa', 'Tấm gương sáng ngời cho thế hệ mai sau']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 43-44.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 23, Bài 9, tr. 43',
    isSampleData: true
  },

  // Tuần 23 - Bài 10
  {
    id: 'kntt-hk2-w23-b10',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 23,
    lessonNumber: 10,
    lessonTitle: 'Viết bài văn kể lại một câu chuyện',
    page: 45,
    theme: 'Uống nước nhớ nguồn',
    readingLesson: 'Cảm xúc Trường Sa',
    genre: 'Bài văn kể lại một câu chuyện',
    stage: 'Viết bài',
    writingPrompt: 'Dựa vào dàn ý đã lập trong hoạt động Viết ở Bài 9, viết bài văn kể lại câu chuyện về một nhân vật lịch sử mà em đã đọc, đã nghe.',
    learningObjective: 'Viết được một bài văn kể chuyện hoàn chỉnh, tái hiện sinh động khí phách của nhân vật lịch sử, lời kể trang nghiêm và dạt dào niềm tự hào dân tộc.',
    practiceSteps: {
      step1Explore: 'Đọc lại dàn ý ở Bài 9; kiểm tra lại sự kiện và lời nói của nhân vật lịch sử.',
      step2GatherIdeas: 'Lựa chọn từ ngữ trang trọng, gợi không khí hào hùng của lịch sử.',
      step3Outline: 'Triển khai thân bài thành các đoạn văn nối tiếp nhau theo diễn biến trận đánh hoặc câu chuyện.',
      step4Draft: 'Viết bài văn hoàn chỉnh vào vở.',
      step5Revise: 'Đọc soát: Kể đúng trình tự sự việc; Nêu đủ chi tiết tiêu biểu của nhân vật lịch sử; Thể hiện tình cảm, cảm xúc; Sửa lỗi chính tả.'
    },
    evaluationRubric: [
      'Bố cục 3 phần hoàn chỉnh, đúng kiểu bài kể chuyện',
      'Kể đúng sự thật lịch sử, tôn trọng nhân vật',
      'Giọng văn truyền cảm, bộc lộ lòng biết ơn sâu sắc'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Bài văn có kể đúng trình tự những sự việc trong câu chuyện không? Nội dung bài có đủ các chi tiết tiêu biểu của nhân vật lịch sử không? Bài văn có thể hiện được tình cảm, cảm xúc đối với câu chuyện hoặc với nhân vật lịch sử được nói đến trong câu chuyện không?',
      vocabAndPatterns: ['khí phách hiên ngang', 'bền gan vững chí', 'muôn đời ghi nhớ công ơn', 'trang sử vẻ vang']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 45-47.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 23, Bài 10, tr. 45',
    isSampleData: true
  },

  // Tuần 24 - Bài 11
  {
    id: 'kntt-hk2-w24-b11',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 24,
    lessonNumber: 11,
    lessonTitle: 'Trả bài văn kể lại một câu chuyện',
    page: 50,
    theme: 'Uống nước nhớ nguồn',
    readingLesson: 'Sáng tháng Năm',
    genre: 'Bài văn kể lại một câu chuyện',
    stage: 'Trả bài / chỉnh sửa',
    writingPrompt: 'Nghe thầy cô giáo nhận xét chung; đọc lại bài làm để phát hiện lỗi; học tập những bài làm tốt của bạn; sửa lỗi và viết lại một đoạn văn cho hay hơn.',
    learningObjective: 'Biết tiếp thu phản hồi, nhận diện lỗi diễn đạt, sửa chữa các chi tiết chưa chính xác về nhân vật lịch sử và viết lại đoạn văn giàu cảm xúc hơn.',
    practiceSteps: {
      step1Explore: 'Lắng nghe giáo viên tổng kết kết quả chấm bài của cả lớp.',
      step2GatherIdeas: 'Đọc nhận xét của cô giáo về mở bài, diễn biến các sự việc và cách dùng từ ngữ lịch sử.',
      step3Outline: 'Ghi lại những chi tiết kể còn sơ sài hoặc câu văn chưa liền mạch để chuẩn bị sửa chữa.',
      step4Draft: 'Viết lại đoạn văn cần chỉnh sửa vào vở.',
      step5Revise: 'Đọc lại đoạn văn vừa viết; so sánh với bài của bạn để rút kinh nghiệm.'
    },
    evaluationRubric: [
      'Chỉ ra chính xác chỗ thiếu chi tiết hoặc lỗi diễn đạt',
      'Đoạn văn viết lại sống động, khắc hoạ rõ nét phẩm chất nhân vật',
      'Có thái độ học hỏi và cầu tiến'
    ],
    resources: {
      guideNotes: 'Gợi ý đọc soát: Câu chuyện em kể có mở đầu, diễn biến và kết thúc rõ ràng không? Những chi tiết về nhân vật lịch sử có đúng với câu chuyện em đã được đọc, được nghe không? Việc sắp xếp các chi tiết có hợp lí không? Bài làm có mắc lỗi về dùng từ, đặt câu, chính tả không?',
      suggestedQuestions: [
        'Nhân vật lịch sử em kể có đóng góp gì to lớn?',
        'Chi tiết nào làm nổi bật lòng yêu nước của nhân vật?',
        'Em có thể viết lại đoạn kết bài thế nào để bộc lộ lòng biết ơn sâu sắc hơn?'
      ]
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 50-51.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 24, Bài 11, tr. 50',
    isSampleData: true
  },

  // Tuần 24 - Bài 12 (LƯU Ý ĐỐI CHIẾU: BẢNG EXCEL GHI "TRẢ BÀI", SGK GHI "VIẾT ĐOẠN VĂN NÊU Ý KIẾN")
  {
    id: 'kntt-hk2-w24-b12',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 24,
    lessonNumber: 12,
    lessonTitle: 'Viết đoạn văn nêu ý kiến',
    page: 53,
    theme: 'Uống nước nhớ nguồn',
    readingLesson: 'Chàng trai làng Phù Ủng',
    genre: 'Đoạn văn nêu ý kiến',
    stage: 'Viết bài',
    writingPrompt: 'Đề bài: Viết đoạn văn nêu lí do em yêu thích một câu chuyện về tình yêu thương hoặc lòng biết ơn (Chuẩn bị: chọn câu chuyện Tờ báo tường của tôi, Trên khóm tre đầu ngõ...; Tìm ý; Viết đoạn văn; Đọc soát và chỉnh sửa).',
    learningObjective: 'Củng cố kĩ năng viết đoạn văn nêu ý kiến, đưa ra các lí do thuyết phục và dẫn chứng cảm động về tình yêu thương hoặc lòng biết ơn.',
    practiceSteps: {
      step1Explore: 'Chọn câu chuyện viết về tình yêu thương hoặc lòng biết ơn (ví dụ Tờ báo tường của tôi, Trên khóm tre đầu ngõ...).',
      step2GatherIdeas: 'Tìm các lí do yêu thích: bài học sâu sắc, nhân vật hấp dẫn, chi tiết cảm động.',
      step3Outline: 'Lập dàn ý: Mở đầu (tên truyện, tác giả, ý kiến chung) -> Triển khai (nêu các lí do kèm dẫn chứng) -> Kết thúc (khẳng định lại ý kiến).',
      step4Draft: 'Viết đoạn văn hoàn chỉnh vào vở.',
      step5Revise: 'Đọc soát: Đoạn văn có đủ 3 phần; Lí do được trình bày rõ ràng; Không có lỗi về từ, câu, chính tả.'
    },
    evaluationRubric: [
      'Đoạn văn có cấu trúc 3 phần rõ ràng',
      'Các lí do nêu bật được chủ đề tình yêu thương hoặc lòng biết ơn',
      'Có dẫn chứng cụ thể từ tác phẩm minh hoạ cho ý kiến'
    ],
    resources: {
      guideNotes: 'Lưu ý: Khi có nhiều lí do, em cần lựa chọn những lí do nổi bật và sắp xếp theo một trình tự hợp lí. Đoạn văn có đủ 3 phần, lí do được trình bày rõ ràng.',
      vocabAndPatterns: ['Tình yêu thương lan toả...', 'Lòng biết ơn sâu sắc đối với...', 'Câu chuyện như một bài học quý về sự sẻ chia...']
    },
    verificationStatus: 'needs_verification',
    verificationNotes: 'LƯU Ý ĐỐI CHIẾU CẦN GIÁO VIÊN XÁC MINH: Bảng Excel (trang 22 PDF 3) ghi tên bài là "Trả bài viết đoạn văn nêu ý kiến". Tuy nhiên, SGK Tiếng Việt 4 Tập hai tr. 53-54 và mục lục ghi chính thức là "Viết: Viết đoạn văn nêu ý kiến" (Đề bài: Viết đoạn văn nêu lí do em yêu thích một câu chuyện về tình yêu thương hoặc lòng biết ơn). Bài trả bài của nội dung này thực chất diễn ra ở Bài 13 tiếp theo.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 24, Bài 12, tr. 53',
    isSampleData: true
  },

  // Tuần 25 - Bài 13 (LƯU Ý ĐỐI CHIẾU: BẢNG EXCEL GHI THUẬT LẠI SỰ VIỆC, SGK GHI TRẢ BÀI Ý KIẾN)
  {
    id: 'kntt-hk2-w25-b13',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 25,
    lessonNumber: 13,
    lessonTitle: 'Trả bài viết đoạn văn nêu ý kiến',
    page: 58,
    theme: 'Uống nước nhớ nguồn',
    readingLesson: 'Vườn của ông tôi',
    genre: 'Đoạn văn nêu ý kiến',
    stage: 'Trả bài / chỉnh sửa',
    writingPrompt: 'Nghe thầy cô nhận xét chung; đọc lại đoạn văn của em và lời nhận xét để biết ưu nhược điểm; trao đổi bài làm với bạn; sửa lỗi và viết lại một số câu cho hay hơn.',
    learningObjective: 'Rút kinh nghiệm và hoàn thiện kĩ năng viết đoạn văn nêu ý kiến về chủ đề tình yêu thương/lòng biết ơn; học hỏi cách mở đầu độc đáo và cách giải thích lí do hợp lí.',
    practiceSteps: {
      step1Explore: 'Lắng nghe giáo viên nhận xét ưu và nhược điểm chung của bài viết.',
      step2GatherIdeas: 'Đối chiếu bài làm của mình với 3 tiêu chí: Cách mở đầu độc đáo, Ý kiến nêu rõ ràng, Lí do giải thích hợp lí.',
      step3Outline: 'Đánh dấu những câu văn còn chung chung, thiếu dẫn chứng thuyết phục để chuẩn bị viết lại.',
      step4Draft: 'Viết lại một số câu văn vào vở bài tập.',
      step5Revise: 'Đọc cho bạn cùng bàn nghe và góp ý.'
    },
    evaluationRubric: [
      'Chỉ ra được điểm mạnh và điểm cần cải thiện trong đoạn văn',
      'Sửa đúng trọng tâm lí do và dẫn chứng',
      'Đoạn văn sau khi sửa có tính thuyết phục cao hơn'
    ],
    resources: {
      guideNotes: 'Tiêu chí đánh giá đoạn văn của bạn: Cách mở đầu độc đáo; Ý kiến nêu rõ ràng; Lí do giải thích hợp lí. Sửa lỗi trong bài hoặc viết lại một số câu văn cho hay hơn.',
      suggestedQuestions: [
        'Cách mở đầu đoạn văn của em đã gây được sự chú ý chưa?',
        'Các lí do em đưa ra có thực sự gắn với tình yêu thương hoặc lòng biết ơn không?',
        'Dẫn chứng từ câu chuyện có chính xác không?'
      ]
    },
    verificationStatus: 'needs_verification',
    verificationNotes: 'LƯU Ý ĐỐI CHIẾU CẦN GIÁO VIÊN XÁC MINH: Trong bảng Excel (trang 23 PDF 3) ghi là "Trả bài văn thuật lại một sự việc", nhưng theo mục lục SGK Tiếng Việt 4 Tập hai tr. 4 và nội dung trang 58, bài viết này là "Trả bài viết đoạn văn nêu ý kiến" (trả bài cho đề bài ở Bài 12). Hệ thống đã ghi chú đối chiếu để giáo viên nắm rõ.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 25, Bài 13, tr. 58',
    isSampleData: true
  },

  // Tuần 25 - Bài 14
  {
    id: 'kntt-hk2-w25-b14',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 25,
    lessonNumber: 14,
    lessonTitle: 'Lập dàn ý cho bài văn thuật lại một sự việc',
    page: 61,
    theme: 'Uống nước nhớ nguồn',
    readingLesson: 'Trong lời mẹ hát',
    genre: 'Bài văn thuật lại một sự việc',
    stage: 'Lập dàn ý',
    writingPrompt: 'Đề bài: Viết bài văn thuật lại một sự việc thể hiện truyền thống Uống nước nhớ nguồn và chia sẻ suy nghĩ, cảm xúc của em về sự việc đó (ví dụ: thăm viện bảo tàng, chăm sóc nghĩa trang liệt sĩ, thăm hỏi gia đình thương binh liệt sĩ, tặng quà người già, chào mừng Ngày Nhà giáo Việt Nam...).',
    learningObjective: 'Biết chọn lọc một sự việc giàu ý nghĩa giáo dục truyền thống "Uống nước nhớ nguồn" và lập dàn ý theo trình tự thời gian hợp lí.',
    practiceSteps: {
      step1Explore: 'Chọn sự việc đã tham gia hoặc chứng kiến gắn liền với đạo lí "Uống nước nhớ nguồn".',
      step2GatherIdeas: 'Ghi chép: thời gian, địa điểm, những người tham gia, các hoạt động chính theo trình tự bắt đầu - tiếp theo - kết thúc.',
      step3Outline: 'Lập dàn ý 3 phần: Mở bài (giới thiệu sự việc) -> Thân bài (thuật lại diễn biến cụ thể) -> Kết bài (bày tỏ lòng biết ơn và mong muốn tiếp nối truyền thống).',
      step4Draft: 'Điền chi tiết các hoạt động vào khung dàn ý.',
      step5Revise: 'Góp ý và chỉnh sửa: Bố cục đủ 3 phần; Diễn biến sự việc đúng trình tự; Việc lựa chọn hoạt động, việc làm tiêu biểu.'
    },
    evaluationRubric: [
      'Chọn đúng sự việc thể hiện truyền thống Uống nước nhớ nguồn',
      'Dàn ý đủ 3 phần, các hoạt động sắp xếp logic theo trình tự thời gian',
      'Bộc lộ được suy nghĩ, cảm xúc tri ân sâu sắc'
    ],
    resources: {
      guideNotes: 'Mở bài: Giới thiệu sự việc: địa điểm, thời gian tổ chức, những người tham gia hoạt động...; Thân bài: Nêu diễn biến của sự việc theo trình tự thời gian: bắt đầu – tiếp theo – kết thúc...; Kết bài: Bày tỏ suy nghĩ, cảm xúc về sự việc được tham gia, chứng kiến hoặc nêu việc mình muốn làm tiếp theo để thể hiện truyền thống Uống nước nhớ nguồn.',
      vocabAndPatterns: ['thăm viếng nghĩa trang liệt sĩ', 'thắp nén hương thơm', 'tri ân các anh hùng liệt sĩ', 'uống nước nhớ nguồn', 'đời đời ghi nhớ công ơn']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 61-62.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 25, Bài 14, tr. 61',
    isSampleData: true
  },

  // Tuần 26 - Bài 15
  {
    id: 'kntt-hk2-w26-b15',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 26,
    lessonNumber: 15,
    lessonTitle: 'Viết bài văn thuật lại một sự việc',
    page: 66,
    theme: 'Uống nước nhớ nguồn',
    readingLesson: 'Người thầy đầu tiên của bố tôi',
    genre: 'Bài văn thuật lại một sự việc',
    stage: 'Viết bài',
    writingPrompt: 'Dựa vào dàn ý đã lập trong hoạt động Viết ở Bài 14, viết bài văn thuật lại một sự việc thể hiện truyền thống Uống nước nhớ nguồn và chia sẻ suy nghĩ, cảm xúc của em về sự việc đó.',
    learningObjective: 'Viết được một bài văn hoàn chỉnh thuật lại sự việc thể hiện truyền thống dân tộc, dùng từ nối thời gian mạch lạc, thể hiện tình cảm biết ơn chân thành.',
    practiceSteps: {
      step1Explore: 'Đọc lại dàn ý ở Bài 14; chuẩn bị mở bài và kết bài truyền cảm.',
      step2GatherIdeas: 'Dùng ghi chép và các mốc hoạt động cụ thể để triển khai các câu văn chi tiết.',
      step3Outline: 'Triển khai các mốc diễn biến bằng từ nối phù hợp (sáng sớm hôm ấy, sau lễ dâng hương, tiếp đó, trước khi ra về).',
      step4Draft: 'Viết toàn bộ bài văn vào vở.',
      step5Revise: 'Đọc soát: Bố cục đủ 3 phần; Sự việc có thể hiện truyền thống Uống nước nhớ nguồn không; Các hoạt động sắp xếp đúng trình tự; Từ ngữ dùng phù hợp.'
    },
    evaluationRubric: [
      'Bài viết có bố cục 3 phần rõ ràng',
      'Thuật lại đúng và đủ các hoạt động theo trình tự thời gian',
      'Khắc hoạ được ý nghĩa thiêng liêng của hoạt động đền ơn đáp nghĩa',
      'Ngôn ngữ trang trọng, đúng chính tả'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Bố cục bài văn có đủ 3 phần không? Sự việc được kể có thể hiện truyền thống Uống nước nhớ nguồn không? Các hoạt động, việc làm có được sắp xếp đúng trình tự không? Từ ngữ dùng có phù hợp không?',
      vocabAndPatterns: ['không khí trang nghiêm', 'nén hương tri ân', 'lòng biết ơn vô hạn', 'tiếp bước cha anh']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 66-67.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 26, Bài 15, tr. 66',
    isSampleData: true
  },

  // Tuần 26 - Bài 16
  {
    id: 'kntt-hk2-w26-b16',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 26,
    lessonNumber: 16,
    lessonTitle: 'Trả bài văn thuật lại một sự việc',
    page: 68,
    theme: 'Uống nước nhớ nguồn',
    readingLesson: 'Ngựa biên phòng',
    genre: 'Bài văn thuật lại một sự việc',
    stage: 'Trả bài / chỉnh sửa',
    writingPrompt: 'Nghe thầy cô nhận xét chung; đọc lại bài làm để nhận ra ưu và nhược điểm; tự chữa bài theo nhận xét của thầy cô; học tập bài văn tốt; viết lại một đoạn trong bài cho hay hơn.',
    learningObjective: 'Biết tự rà soát, sửa lỗi về sự việc, trình tự thời gian và diễn đạt trong bài văn thuật lại sự việc; viết lại đoạn văn giàu cảm xúc tri ân hơn.',
    practiceSteps: {
      step1Explore: 'Lắng nghe giáo viên nhận xét chung về bài văn thuật lại sự việc của cả lớp.',
      step2GatherIdeas: 'Đọc nhận xét của thầy cô theo các tiêu chí: bố cục, trình tự sắp xếp các sự việc, dùng từ, đặt câu, chính tả.',
      step3Outline: 'Xác định thứ tự sửa nội dung trước, sau đó chỉnh sửa câu văn và từ ngữ.',
      step4Draft: 'Viết lại đoạn văn cần cải thiện vào vở chỉnh sửa.',
      step5Revise: 'So sánh đoạn mới với bản ban đầu để thấy rõ sự tiến bộ.'
    },
    evaluationRubric: [
      'Chỉ ra chính xác các lỗi còn tồn tại trong bài',
      'Đoạn văn viết lại diễn tả diễn biến rõ ràng và cảm xúc sâu sắc hơn',
      'Rút ra kinh nghiệm bổ ích cho các bài viết sau'
    ],
    resources: {
      guideNotes: 'Tiêu chí đánh giá: Bố cục; Trình tự sắp xếp các sự việc; Dùng từ, đặt câu, chính tả. Sửa lỗi trong bài văn (nếu có). Viết lại một đoạn trong bài của em theo cách hay hơn.',
      suggestedQuestions: [
        'Bài văn của em đã thể hiện rõ đạo lí Uống nước nhớ nguồn chưa?',
        'Các hoạt động đã được thuật lại mạch lạc theo đúng trình tự thời gian chưa?',
        'Có câu văn nào mắc lỗi lặp từ hoặc câu tối nghĩa không?'
      ]
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 68-70.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 26, Bài 16, tr. 68',
    isSampleData: true
  },

  // Tuần 28 - Bài 17
  {
    id: 'kntt-hk2-w28-b17',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 28,
    lessonNumber: 17,
    lessonTitle: 'Tìm hiểu cách viết bài văn miêu tả cây cối',
    page: 83,
    theme: 'Quê hương trong tôi',
    readingLesson: 'Cây đa quê hương',
    genre: 'Miêu tả cây cối',
    stage: 'Tìm hiểu kiểu bài',
    writingPrompt: 'Đọc bài văn "Cây sim" của Băng Sơn trang 83-84 SGK Tập hai và trả lời các câu hỏi về bố cục 3 phần, cách miêu tả từng bộ phận (hoa sim, quả sim) và cảm xúc của người viết.',
    learningObjective: 'Hiểu cấu trúc 3 phần của bài văn miêu tả cây cối (mở bài giới thiệu bao quát, thân bài tả lần lượt từng bộ phận của cây, kết bài nêu ấn tượng hoặc tình cảm).',
    practiceSteps: {
      step1Explore: 'Đọc bài văn miêu tả "Cây sim" của nhà văn Băng Sơn (trang 83-84 SGK).',
      step2GatherIdeas: 'Xác định các bộ phận được miêu tả: hoa sim (màu tím nhạt, không thơm, nét riêng tươi non), quả sim (hình dáng như con trâu mộng tí hon, vị ngọt lịm, màu tím thẫm).',
      step3Outline: 'Lập sơ đồ cấu trúc 3 phần của bài văn tả cây cối theo từng bộ phận.',
      step4Draft: 'Hoàn thành bảng phân tích đặc điểm các bộ phận của cây dừa hoặc cây hoa trong vườn.',
      step5Revise: 'Kiểm tra cách tác giả sử dụng biện pháp so sánh để làm nổi bật nét riêng của hoa và quả.'
    },
    evaluationRubric: [
      'Chỉ ra đúng 3 phần của bài văn tả cây cối',
      'Nắm được cách tả lần lượt từng bộ phận của cây',
      'Phát hiện được các hình ảnh so sánh độc đáo trong bài mẫu'
    ],
    resources: {
      guideNotes: 'Bài văn miêu tả cây cối thường có 3 phần: Mở bài: Giới thiệu bao quát về cây (tên cây, nơi cây mọc,...); Thân bài: Tả lần lượt từng bộ phận của cây; Kết bài: Nêu ấn tượng đặc biệt hoặc tình cảm của người tả với cây.',
      suggestedQuestions: [
        'Tìm phần mở bài, thân bài, kết bài của bài văn trên?',
        'Mở bài giới thiệu những gì về cây sim?',
        'Cây sim được miêu tả như thế nào ở phần thân bài (hoa sim, quả sim)?',
        'Phần kết bài nói về điều gì? Tình cảm của người viết đối với cây sim?'
      ],
      vocabAndPatterns: ['tươi non như một niềm vui', 'như một con trâu mộng tí hon', 'ngọt lịm', 'tím thẫm', 'nhớ mãi không quên']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 83-85.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 28, Bài 17, tr. 83',
    isSampleData: true
  },

  // Tuần 28 - Bài 18
  {
    id: 'kntt-hk2-w28-b18',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 28,
    lessonNumber: 18,
    lessonTitle: 'Tìm hiểu cách viết bài văn miêu tả cây cối (tiếp theo)',
    page: 87,
    theme: 'Quê hương trong tôi',
    readingLesson: 'Bước mùa xuân',
    genre: 'Miêu tả cây cối',
    stage: 'Tìm hiểu mở rộng',
    writingPrompt: 'Đọc bài văn "Cây cà chua" của Ngô Văn Phú trang 87 SGK Tập hai, tìm hiểu cách miêu tả cây cối theo từng thời kì phát triển (vươn ngọn -> nở hoa -> toả tán -> ra quả -> quả chín) và kết hợp tả sự vật liên quan.',
    learningObjective: 'Hiểu thêm cách miêu tả cây cối theo thời kì phát triển từ lúc cây lớn đến khi ra hoa kết trái, kết hợp miêu tả sự vật, con người và hoạt động liên quan.',
    practiceSteps: {
      step1Explore: 'Đọc bài văn mẫu "Cây cà chua" (Ngô Văn Phú, trang 87 SGK).',
      step2GatherIdeas: 'Xác định các chi tiết theo thời kì phát triển: vươn ngọn, toả tán, nở hoa, ra quả non, quả chín mọng như mặt trời nhỏ.',
      step3Outline: 'So sánh giữa 2 cách tả: Cách 1 (tả từng bộ phận của cây) và Cách 2 (tả theo từng thời kì phát triển).',
      step4Draft: 'Sắp xếp các thẻ chi tiết phát triển của cây cà chua theo đúng vòng đời sinh trưởng.',
      step5Revise: 'Kiểm tra cách tác giả kết hợp tả con chim sếu, đàn bướm, nắng hè để bức tranh cây cối thêm sinh động.'
    },
    evaluationRubric: [
      'Phân biệt được 2 cách miêu tả cây cối (theo bộ phận và theo thời kì phát triển)',
      'Nhận biết được trình tự phát triển tự nhiên của cây',
      'Hiểu tác dụng của việc kết hợp tả các sự vật liên quan xung quanh cây'
    ],
    resources: {
      guideNotes: 'Ngoài cách tả lần lượt từng bộ phận của cây, ta có thể tả đặc điểm của cây theo từng thời kì phát triển. Có thể kết hợp tả sự vật, hoạt động có liên quan đến cây.',
      suggestedQuestions: [
        'Tìm phần mở bài, thân bài, kết bài của bài văn "Cây cà chua"?',
        'Trong phần thân bài, đặc điểm của cây cà chua được miêu tả theo trình tự nào?',
        'Trong bài văn, chi tiết nào cho thấy tác giả tả cây kết hợp với tả những sự vật có liên quan đến cây?'
      ],
      vocabAndPatterns: ['phủ kín mặt ruộng', 'hoa như đàn bướm nhỏ', 'quả nhung nhúc như đàn gà con', 'thắp đèn lồng trong lùm cây']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 87-89.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 28, Bài 18, tr. 87',
    isSampleData: true
  },

  // Tuần 29 - Bài 19
  {
    id: 'kntt-hk2-w29-b19',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 29,
    lessonNumber: 19,
    lessonTitle: 'Quan sát cây cối',
    page: 91,
    theme: 'Quê hương trong tôi',
    readingLesson: 'Đi hội chùa Hương',
    genre: 'Miêu tả cây cối',
    stage: 'Quan sát / thu thập ý',
    writingPrompt: 'Lựa chọn cây để quan sát (cây ăn quả, cây bóng mát, cây hoa...); sử dụng các giác quan (mắt nhìn, tai nghe, mũi ngửi, tay sờ, nếm vị) để quan sát bao quát và từng bộ phận; ghi chép kết quả vào bảng.',
    learningObjective: 'Rèn luyện kĩ năng quan sát cây cối bằng đa giác quan, ghi chép đặc điểm bao quát, đặc điểm từng bộ phận (thân, cành, lá, hoa, quả) và sự vật có liên quan.',
    practiceSteps: {
      step1Explore: 'Chọn cây định tả (cây bàng sân trường, cây phượng vĩ, cây xoài, cây hoa hồng, cây bưởi...).',
      step2GatherIdeas: 'Quan sát bằng 5 giác quan: mắt nhìn (hình dáng, màu sắc), tai nghe (tiếng lá reo, tiếng chim hót), mũi ngửi (mùi hoa, mùi quả), tay sờ (thân ráp, lá mượt), nếm (vị ngọt quả chín).',
      step3Outline: 'Phân nhóm ghi chép theo bộ phận: gốc, rễ, thân, cành, lá, hoa, quả và hoạt động dưới tán cây.',
      step4Draft: 'Điền thông tin vào bảng quan sát cây cối hoàn chỉnh.',
      step5Revise: 'Chọn chi tiết tiêu biểu, khác biệt của cây để chuẩn bị cho bài viết văn.'
    },
    evaluationRubric: [
      'Ghi chép cụ thể đặc điểm của từng bộ phận cây',
      'Vận dụng nhiều giác quan khi quan sát',
      'Chọn được nét riêng biệt, độc đáo của loài cây được tả'
    ],
    resources: {
      guideNotes: 'Sử dụng các giác quan: 1. Mắt nhìn thấy hình dáng của cây, màu sắc; 2. Tai nghe tiếng lá reo trong gió, tiếng chim; 3. Mũi ngửi thấy mùi hoa, mùi quả; 4. Nếm được vị của quả; 5. Chạm tay vào thấy thân cây ram ráp, lá cây mềm mượt...',
      vocabAndPatterns: ['to lớn sừng sững', 'tán lá xòe rộng như chiếc ô', 'thân xù xì bạc phếch', 'hoa trắng muốt thơm dịu', 'chim chóc ríu rít']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 91-93.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 29, Bài 19, tr. 91',
    isSampleData: true
  },

  // Tuần 29 - Bài 20
  {
    id: 'kntt-hk2-w29-b20',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 29,
    lessonNumber: 20,
    lessonTitle: 'Luyện viết đoạn văn miêu tả cây cối',
    page: 95,
    theme: 'Quê hương trong tôi',
    readingLesson: 'Chiều ngoại ô',
    genre: 'Miêu tả cây cối',
    stage: 'Luyện viết',
    writingPrompt: 'Đọc 4 đoạn văn mẫu tả lá bàng (Đoàn Giỏi), tả hoa sầu riêng (Mai Văn Tạo), tả quả nhãn (Vũ Tú Nam), tả thân cây sồi (Lép Tôn-xtôi) trang 95-97 SGK; viết đoạn văn tả một bộ phận của cây mà em đã quan sát.',
    learningObjective: 'Viết được một đoạn văn miêu tả tập trung vào một bộ phận của cây (lá, hoa, quả hoặc thân cây), sử dụng thành thạo phép so sánh và nhân hoá.',
    practiceSteps: {
      step1Explore: 'Đọc và phân tích 4 đoạn văn mẫu miêu tả bộ phận cây đặc sắc của các nhà văn lớn.',
      step2GatherIdeas: 'Chọn một bộ phận của cây từ bảng quan sát ở Bài 19 mà em tâm đắc nhất.',
      step3Outline: 'Sắp xếp câu: câu mở đoạn giới thiệu bộ phận, các câu thân đoạn tả chi tiết màu sắc, hình dáng, hương thơm, câu kết đoạn nêu cảm nhận.',
      step4Draft: 'Viết đoạn văn từ 5 đến 7 câu vào vở.',
      step5Revise: 'Sửa các câu liệt kê đơn điệu; bổ sung từ láy, từ gợi tả và phép so sánh làm đoạn văn thêm sức sống.'
    },
    evaluationRubric: [
      'Đoạn văn tập trung tả một bộ phận của cây',
      'Có từ ngữ gợi tả sinh động về màu sắc, đường nét hoặc hương vị',
      'Vận dụng thành công ít nhất một hình ảnh so sánh hoặc nhân hoá'
    ],
    resources: {
      guideNotes: 'Các đoạn văn mẫu: Tả lá (lá bàng qua 4 mùa), Tả hoa (hoa sầu riêng ngát hương), Tả quả (chùm nhãn tròn xoe như viên bi), Tả thân cây (cây sồi già xù xì đứng sừng sững bên vệ đường). Viết đoạn văn tả một bộ phận của cây mà em đã quan sát.',
      vocabAndPatterns: ['như những ngọn lửa xanh', 'hương thơm ngát như hương cau', 'béo tròn múp míp', 'quái vật già nua đứng sừng sững']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 95-97.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 29, Bài 20, tr. 95',
    isSampleData: true
  },

  // Tuần 30 - Bài 21
  {
    id: 'kntt-hk2-w30-b21',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 30,
    lessonNumber: 21,
    lessonTitle: 'Luyện viết mở bài, kết bài cho bài văn miêu tả cây cối',
    page: 101,
    theme: 'Quê hương trong tôi',
    readingLesson: 'Những cánh buồm',
    genre: 'Miêu tả cây cối',
    stage: 'Luyện viết bộ phận bài',
    writingPrompt: 'Đọc bài văn tả cây khế của Vũ Tú Nam trang 101 SGK; phân tích và xếp các mở bài vào nhóm trực tiếp/gián tiếp; xếp kết bài vào nhóm mở rộng/không mở rộng; viết mở bài và kết bài cho bài văn miêu tả cây cối.',
    learningObjective: 'Phân biệt và thực hành viết mở bài trực tiếp, mở bài gián tiếp, kết bài mở rộng và kết bài không mở rộng cho bài văn miêu tả cây cối.',
    practiceSteps: {
      step1Explore: 'Đọc bài văn "Cây khế" của Vũ Tú Nam; phân tích cách mở đầu và kết thúc của bài văn.',
      step2GatherIdeas: 'So sánh mở bài trực tiếp (giới thiệu ngay cây khế) với mở bài gián tiếp (dẫn từ vườn cây ăn trái sum suê); kết bài không mở rộng với kết bài mở rộng (gắn với kỉ niệm sinh nhật và lòng biết ơn cây).',
      step3Outline: 'Chọn loài cây em yêu thích để chuẩn bị viết mở bài và kết bài.',
      step4Draft: 'Viết thử nghiệm cả hai phương án mở bài và hai phương án kết bài.',
      step5Revise: 'Kiểm tra xem mở bài dẫn vào đúng cây không; kết bài có gắn kết tự nhiên với thân bài không.'
    },
    evaluationRubric: [
      'Phân biệt chính xác giữa mở bài trực tiếp và mở bài gián tiếp',
      'Viết được mở bài gián tiếp tự nhiên, gợi cảm',
      'Viết được kết bài mở rộng giàu tình cảm và ý nghĩa'
    ],
    resources: {
      guideNotes: 'Mở bài trực tiếp: Giới thiệu ngay vào cây định tả; Mở bài gián tiếp: Dẫn dắt từ khung cảnh khác trước khi vào cây; Kết bài mở rộng: Nêu cảm nghĩ, liên tưởng và mong muốn chăm sóc cây; Kết bài không mở rộng: Nêu cảm nghĩ yêu thích đối với cây.',
      vocabAndPatterns: ['Mảnh vườn nhỏ sau nhà ông bà trồng rất nhiều cây ăn trái...', 'Cây khế gắn liền với tuổi ấu thơ của em...', 'Mỗi mùa quả chín, lòng em lại dạt dào niềm vui...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 101-102.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 30, Bài 21, tr. 101',
    isSampleData: true
  },

  // Tuần 30 - Bài 22
  {
    id: 'kntt-hk2-w30-b22',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 30,
    lessonNumber: 22,
    lessonTitle: 'Lập dàn ý cho bài văn miêu tả cây cối',
    page: 104,
    theme: 'Quê hương trong tôi',
    readingLesson: 'Cái cầu',
    genre: 'Miêu tả cây cối',
    stage: 'Lập dàn ý',
    writingPrompt: 'Chọn 1 trong 3 đề: Đề 1: Viết bài văn miêu tả một cây ăn quả mà em yêu thích; Đề 2: Viết bài văn miêu tả một cây ở sân trường đã gắn bó với em và bạn bè; Đề 3: Viết bài văn miêu tả một cây mà em biết qua phim ảnh, sách báo.',
    learningObjective: 'Lựa chọn cây định tả, chọn trình tự miêu tả (theo bộ phận hoặc theo thời kì phát triển) và lập dàn ý 3 phần chi tiết.',
    practiceSteps: {
      step1Explore: 'Chọn 1 trong 3 đề bài; xác định loài cây em nắm vững đặc điểm nhất.',
      step2GatherIdeas: 'Huy động các kết quả quan sát (ở Bài 19) và đoạn văn đã luyện (ở Bài 20, 21).',
      step3Outline: 'Lập dàn ý 3 phần: Mở bài (trực tiếp hoặc gián tiếp) -> Thân bài (Tả đặc điểm theo trình tự đã chọn; Tả cảnh vật, con người xung quanh) -> Kết bài (nêu cảm nghĩ, cách kết bài mở rộng hoặc không mở rộng).',
      step4Draft: 'Điền chi tiết các ý vào phiếu dàn ý cá nhân.',
      step5Revise: 'Góp ý và chỉnh sửa: Bố cục 3 phần; Trình tự miêu tả nhất quán; Việc chọn lọc đặc điểm nổi bật của cây.'
    },
    evaluationRubric: [
      'Chọn đúng đối tượng cây theo yêu cầu đề bài',
      'Dàn ý đủ 3 phần, thân bài có sự kết hợp tả cảnh vật xung quanh',
      'Trình tự miêu tả hợp lí, logic'
    ],
    resources: {
      guideNotes: 'Mở bài: Giới thiệu cây định tả theo cách mở bài trực tiếp hoặc gián tiếp; Thân bài: Tả đặc điểm của cây theo trình tự đã lựa chọn (tập trung vào đặc điểm đáng chú ý của thân, cành, lá, hoa,...), tả sự vật, hoạt động có liên quan; Kết bài: Nêu cảm nghĩ theo cách mở rộng hoặc không mở rộng.',
      vocabAndPatterns: ['cây bàng sân trường', 'cây xoài trĩu quả', 'tán lá xum xuê', 'rợp bóng mát', 'kỉ niệm giờ ra chơi']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 104-105.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 30, Bài 22, tr. 104',
    isSampleData: true
  },

  // Tuần 31 - Bài 23
  {
    id: 'kntt-hk2-w31-b23',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 31,
    lessonNumber: 23,
    lessonTitle: 'Viết bài văn miêu tả cây cối',
    page: 108,
    theme: 'Quê hương trong tôi',
    readingLesson: 'Đường đi Sa Pa',
    genre: 'Miêu tả cây cối',
    stage: 'Viết bài',
    writingPrompt: 'Dựa vào dàn ý đã lập trong hoạt động Viết ở Bài 22, viết bài văn theo yêu cầu của đề bài (tả cây ăn quả / cây bóng mát sân trường / cây qua phim ảnh).',
    learningObjective: 'Viết được một bài văn miêu tả cây cối hoàn chỉnh, đúng bố cục, hình ảnh so sánh sinh động, câu văn mượt mà và thể hiện tình cảm gắn bó với thiên nhiên.',
    practiceSteps: {
      step1Explore: 'Đọc lại dàn ý ở Bài 22; ôn lại các tiêu chí đánh giá bài văn miêu tả cây cối.',
      step2GatherIdeas: 'Dùng dàn ý và bảng quan sát để chọn các từ ngữ gợi tả màu sắc, hình dáng, chuyển động.',
      step3Outline: 'Triển khai ba phần: mở bài gián tiếp, thân bài phân đoạn rõ ràng, kết bài mở rộng.',
      step4Draft: 'Viết toàn bộ bài văn hoàn chỉnh vào vở.',
      step5Revise: 'Đọc soát và chỉnh sửa: Lỗi sắp xếp ý, Lỗi dùng từ, viết câu, Lỗi chính tả.'
    },
    evaluationRubric: [
      'Đúng đề bài, đúng thể loại văn miêu tả cây cối',
      'Đặc điểm của cây được miêu tả nổi bật, giàu hình ảnh',
      'Ngôn ngữ sinh động, sử dụng tốt các biện pháp tu từ (so sánh, nhân hoá)',
      'Bài viết có cảm xúc tự nhiên, đúng chính tả'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Lỗi sắp xếp ý; Lỗi dùng từ, viết câu; Lỗi chính tả. Sửa lỗi trực tiếp vào bài hoặc ghi vào sổ tay những lỗi cần sửa.',
      vocabAndPatterns: ['chiếc ô xanh khổng lồ', 'những chú trăn con nằm ngủ', 'rì rào trong gió', 'người bạn thân thiết của tuổi thơ']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 108-109.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 31, Bài 23, tr. 108',
    isSampleData: true
  },

  // Tuần 31 - Bài 24
  {
    id: 'kntt-hk2-w31-b24',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 31,
    lessonNumber: 24,
    lessonTitle: 'Trả bài văn miêu tả cây cối',
    page: 110,
    theme: 'Quê hương trong tôi',
    readingLesson: 'Quê ngoại',
    genre: 'Miêu tả cây cối',
    stage: 'Trả bài / chỉnh sửa',
    writingPrompt: 'Nghe thầy cô nhận xét chung; đọc lại bài làm để nhận ra ưu và nhược điểm; đọc bài của các bạn được khen; sửa lỗi và viết lại một đoạn văn cho hay hơn.',
    learningObjective: 'Biết tự đánh giá chất lượng bài viết miêu tả cây cối của mình; tiếp thu nhận xét của giáo viên để sửa chữa và nâng cao năng lực viết văn miêu tả cảnh vật.',
    practiceSteps: {
      step1Explore: 'Lắng nghe cô giáo nhận xét về bố cục, cách quan sát và diễn đạt của cả lớp.',
      step2GatherIdeas: 'Đọc lời phê của cô; xác định chi tiết còn chung chung, thiếu hoặc chưa chính xác.',
      step3Outline: 'Đọc bài văn hay của bạn; học tập cách mở bài, kết bài hấp dẫn, cách làm nổi bật đặc điểm riêng biệt của cây.',
      step4Draft: 'Viết lại một đoạn trong bài của em theo cách hay hơn vào vở.',
      step5Revise: 'Đối chiếu bản viết lại với rubric để kiểm tra mức độ tiến bộ.'
    },
    evaluationRubric: [
      'Xác định đúng lỗi trong bài của mình',
      'Viết lại đoạn văn cụ thể, sinh động hơn',
      'Học tập được cách miêu tả giàu hình ảnh từ bài của bạn'
    ],
    resources: {
      guideNotes: 'Học tập từ bài viết của bạn: Mở bài, kết bài hấp dẫn; Cách miêu tả làm nổi bật đặc điểm riêng biệt của cây; Thể hiện được tình cảm với cây hoặc người trồng cây.',
      suggestedQuestions: [
        'Bài làm của em đã đủ mở bài, thân bài, kết bài chưa?',
        'Trình tự miêu tả cây có hợp lí không?',
        'Cách quan sát cây và lựa chọn đặc điểm có tinh tế không?',
        'Từ ngữ miêu tả, các biện pháp so sánh, nhân hoá đã đúng và hay chưa?'
      ]
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 110-112.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 31, Bài 24, tr. 110',
    isSampleData: true
  },

  // Tuần 32 - Bài 25
  {
    id: 'kntt-hk2-w32-b25',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 32,
    lessonNumber: 25,
    lessonTitle: 'Viết đoạn văn tưởng tượng',
    page: 116,
    theme: 'Vì một thế giới bình yên',
    readingLesson: 'Khu bảo tồn động vật hoang dã Ngô-rông-gô-rô',
    genre: 'Đoạn văn tưởng tượng',
    stage: 'Viết bài',
    writingPrompt: 'Chọn 1 trong 3 đề: Đề 1: Đóng vai Sơn Tinh kể lại cuộc chiến đấu với Thuỷ Tinh hoặc đóng vai Thuỷ Tinh nói chuyện với Sơn Tinh khi mình thua trận; Đề 2: Đóng vai Mi-lô thuyết phục cha cho mình tham gia lớp học chơi trống; Đề 3: Đóng vai ông nhạc sĩ nói lên suy nghĩ khi nghe thấy lời thì thầm của bé Mai.',
    learningObjective: 'Biết đóng vai một nhân vật trong câu chuyện đã học để viết đoạn văn tưởng tượng, bổ sung chi tiết mới và lời thoại phù hợp với tính cách nhân vật.',
    practiceSteps: {
      step1Explore: 'Chọn 1 trong 3 đề bài; nhớ lại câu chuyện và nhân vật được chọn để đóng vai.',
      step2GatherIdeas: 'Lựa chọn cách xưng hô phù hợp (xưng "ta", "con", "tôi"); chuẩn bị chi tiết mới vừa hợp lí vừa mang yếu tố bất ngờ.',
      step3Outline: 'Sắp xếp ý: Mở đầu giới thiệu nhân vật và hoàn cảnh -> Triển khai diễn biến tưởng tượng -> Kết thúc lời tâm sự.',
      step4Draft: 'Viết đoạn văn tưởng tượng vào vở bài tập.',
      step5Revise: 'Đọc lại đoạn văn, tự sửa các lỗi về nội dung và các lỗi về câu, từ ngữ, chính tả.'
    },
    evaluationRubric: [
      'Đóng vai đúng nhân vật, xưng hô phù hợp',
      'Chi tiết tưởng tượng bất ngờ nhưng vẫn logic với cốt truyện',
      'Thể hiện rõ cảm xúc, tâm trạng của nhân vật khi đóng vai'
    ],
    resources: {
      guideNotes: 'Lưu ý: Lựa chọn cách xưng hô phù hợp (ví dụ xưng "ta" khi đóng vai Sơn Tinh để nói chuyện với Thuỷ Tinh; xưng "con" khi đóng vai Mi-lô nói chuyện với cha; xưng "tôi" khi đóng vai ông nhạc sĩ); Bổ sung những chi tiết mới vừa phù hợp với câu chuyện và sự phát triển tính cách của nhân vật, vừa mang yếu tố bất ngờ.',
      vocabAndPatterns: ['Ta là Sơn Tinh, chúa tể non cao...', 'Thưa cha, con có một giọng đọc truyền cảm...', 'Chứng kiến tấm lòng của bé Mai, lòng tôi dâng lên niềm xúc động...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 116-117.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 32, Bài 25, tr. 116',
    isSampleData: true
  },

  // Tuần 32 - Bài 26
  {
    id: 'kntt-hk2-w32-b26',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 32,
    lessonNumber: 26,
    lessonTitle: 'Trả bài viết đoạn văn tưởng tượng',
    page: 118,
    theme: 'Vì một thế giới bình yên',
    readingLesson: 'Ngôi nhà của yêu thương',
    genre: 'Đoạn văn tưởng tượng',
    stage: 'Trả bài / chỉnh sửa',
    writingPrompt: 'Nghe thầy cô nhận xét chung; đọc lại đoạn văn của em để biết lỗi cần sửa; trao đổi bài làm của bạn; sửa lỗi trong bài (nếu có) hoặc viết lại một số câu văn cho hay hơn.',
    learningObjective: 'Điều chỉnh đoạn văn tưởng tượng để tăng tính hợp lí, hấp dẫn và tính nhất quán của lời kể khi đóng vai nhân vật.',
    practiceSteps: {
      step1Explore: 'Lắng nghe cô giáo nhận xét về cách đóng vai, xưng hô và các chi tiết sáng tạo của lớp.',
      step2GatherIdeas: 'Đọc nhận xét để kiểm tra: cách xưng hô và lời kể có phù hợp với vai nhân vật không; nội dung tưởng tượng có kết nối với câu chuyện không.',
      step3Outline: 'Đánh dấu chi tiết gây khó hiểu hoặc mâu thuẫn để lên phương án sửa chữa.',
      step4Draft: 'Viết lại đoạn văn hoặc câu văn vào vở.',
      step5Revise: 'Kiểm tra tính mạch lạc và sức lôi cuốn của đoạn văn sau khi sửa.'
    },
    evaluationRubric: [
      'Nhận diện đúng lỗi trong bài của mình',
      'Cách xưng hô và ngôn ngữ phù hợp với vai đóng',
      'Đoạn văn sau khi sửa giàu tính sáng tạo và cảm xúc hơn'
    ],
    resources: {
      guideNotes: 'Tiêu chí đọc soát: Cách xưng hô và lời kể có phù hợp với vai nhân vật đã lựa chọn không? Nội dung tưởng tượng có kết nối với câu chuyện không? Có mắc lỗi dùng từ, đặt câu, chính tả không?',
      suggestedQuestions: [
        'Em đã xưng hô đúng giọng điệu của nhân vật chưa?',
        'Chi tiết tưởng tượng có làm nổi bật thêm tính cách nhân vật không?',
        'Có câu nào mắc lỗi diễn đạt không?'
      ]
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 118-120.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 32, Bài 26, tr. 118',
    isSampleData: true
  },

  // Tuần 33 - Bài 27
  {
    id: 'kntt-hk2-w33-b27',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 33,
    lessonNumber: 27,
    lessonTitle: 'Viết đoạn văn tưởng tượng',
    page: 122,
    theme: 'Vì một thế giới bình yên',
    readingLesson: 'Băng tan',
    genre: 'Đoạn văn tưởng tượng',
    stage: 'Luyện viết / vận dụng',
    writingPrompt: 'Đề bài: Viết đoạn kết thúc khác cho một câu chuyện đã đọc, đã nghe (ví dụ: Vệt phấn trên mặt bàn - tưởng tượng bạn Thi Ca trở lại lớp khi đã lành tay; Bài học quý - chim sẻ từ chối hạt kê và sau này nhận bài học quý; Đôi cánh của ngựa trắng...).',
    learningObjective: 'Vận dụng kĩ năng tưởng tượng để sáng tạo một kết thúc mới mẻ, bất ngờ và giàu ý nghĩa nhân văn cho câu chuyện quen thuộc.',
    practiceSteps: {
      step1Explore: 'Chọn câu chuyện đã học; nhớ lại đoạn kết gốc của tác phẩm.',
      step2GatherIdeas: 'Lên ý tưởng cho cái kết mới: Thi Ca vui mừng quay lại lớp cùng Minh, Ngựa trắng trưởng thành sau chuyến đi xa...',
      step3Outline: 'Sắp xếp nội dung: dẫn dắt từ tình huống trước đó -> diễn biến kết thúc mới -> cảm xúc lắng đọng.',
      step4Draft: 'Viết đoạn văn kết thúc mới vào vở.',
      step5Revise: 'Tự kiểm tra mạch lạc, tính hợp lí của chi tiết tưởng tượng và lỗi chính tả.'
    },
    evaluationRubric: [
      'Tạo được kết thúc mới khác biệt so với truyện gốc',
      'Cái kết hợp lí, nhân văn, phù hợp với tính cách nhân vật',
      'Câu văn giàu cảm xúc, giàu hình ảnh gợi mở'
    ],
    resources: {
      guideNotes: 'Chuẩn bị: Chọn câu chuyện, đọc hoặc nhớ lại đoạn kết của câu chuyện; Dự kiến cách kết thúc khác cho câu chuyện. Viết: Bám sát vào phần chuẩn bị để viết đoạn kết khác; Chú ý tính hợp lí trong các chi tiết tưởng tượng.',
      vocabAndPatterns: ['Ngày hôm ấy, khi cánh cửa lớp mở ra...', 'Minh nghẹn ngào chạy lại đón bạn...', 'Bài học ấy đã theo suốt cuộc đời...']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 122-124.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 33, Bài 27, tr. 122',
    isSampleData: true
  },

  // Tuần 33 - Bài 28
  {
    id: 'kntt-hk2-w33-b28',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 33,
    lessonNumber: 28,
    lessonTitle: 'Hướng dẫn cách viết thư',
    page: 125,
    theme: 'Vì một thế giới bình yên',
    readingLesson: 'Chuyến du lịch thú vị',
    genre: 'Viết thư điện tử (Email)',
    stage: 'Tìm hiểu / hướng dẫn kiểu bài',
    writingPrompt: 'Đọc thư điện tử trang 125 SGK Tập hai (thư chúc mừng sinh nhật cô giáo của Minh Khôi) và tìm hiểu các bước soạn thảo thư điện tử trên máy tính.',
    learningObjective: 'Ôn tập và hệ thống hoá cách viết thư điện tử (Email): tạo chủ đề ngắn gọn, viết nội dung thư, đính kèm tệp (ảnh, video) và bấm nút gửi.',
    practiceSteps: {
      step1Explore: 'Đọc bức thư điện tử mẫu từ Minh Khôi gửi cô An (anlamnguyen@gmail.com).',
      step2GatherIdeas: 'Xác định các thành phần của thư điện tử: địa chỉ người nhận, chủ đề thư, lời chào, nội dung chúc mừng, tệp ảnh đính kèm, lời tạm biệt.',
      step3Outline: 'Học quy trình 3 bước gửi thư điện tử: Bước 1 (Tạo chủ đề ngắn gọn) -> Bước 2 (Viết thư & đính kèm tệp) -> Bước 3 (Bấm nút "gửi").',
      step4Draft: 'Làm bài tập nhận diện các thao tác soạn thư trên máy tính.',
      step5Revise: 'Kiểm tra lỗi chính tả, nội dung diễn đạt và địa chỉ email trước khi gửi.'
    },
    evaluationRubric: [
      'Xác định đúng các trường thông tin trong thư điện tử',
      'Biết cách đặt tiêu đề thư ngắn gọn, rõ ràng',
      'Hiểu quy trình đính kèm tệp và kiểm tra trước khi bấm gửi'
    ],
    resources: {
      guideNotes: 'Khi viết thư điện tử, em cần: Tạo chủ đề cho thư; Viết ngắn gọn; Lựa chọn đúng tệp đính kèm (nếu có). Ba bước: Bước 1: Tạo chủ đề cho thư điện tử -> Bước 2: Viết thư, Đính kèm tệp -> Bước 3: Bấm nút "gửi".',
      suggestedQuestions: [
        'Nội dung thư viết về điều gì? Dựa vào đâu để nhận biết nhanh nội dung thư?',
        'Trong thư, bạn nhỏ gửi ảnh cho cô bằng cách nào?'
      ],
      vocabAndPatterns: ['Chủ đề: Chúc mừng sinh nhật cô', 'Tệp đính kèm: Anh_ca_nha_di_du_lich.jpg', 'Tạm biệt cô yêu quý!']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 125-127.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 33, Bài 28, tr. 125',
    isSampleData: true
  },

  // Tuần 34 - Bài 29
  {
    id: 'kntt-hk2-w34-b29',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 34,
    lessonNumber: 29,
    lessonTitle: 'Viết thư',
    page: 130,
    theme: 'Vì một thế giới bình yên',
    readingLesson: 'Lễ hội ở Nhật Bản',
    genre: 'Viết thư điện tử (Email)',
    stage: 'Viết văn bản giao tiếp',
    writingPrompt: 'Đề bài: Viết thư điện tử cho một người bạn ở xa mà đã lâu em chưa gặp (Chủ đề, nội dung thăm hỏi sức khoẻ, kể chuyện học tập, tệp đính kèm tranh ảnh).',
    learningObjective: 'Viết được một bức thư điện tử hoàn chỉnh gửi cho bạn, đúng thể thức số, ngôn từ thân thiện, có chủ đề rõ ràng và lời chúc tốt đẹp.',
    practiceSteps: {
      step1Explore: 'Xác định người bạn ở xa em muốn gửi thư điện tử.',
      step2GatherIdeas: 'Ghi chép: chủ đề thư (Thư thăm bạn, Kể chuyện trường mới...), tin tức muốn chia sẻ, dự định sắp tới, chọn ảnh đính kèm nếu có.',
      step3Outline: 'Bố cục thư: Chủ đề -> Lời chào thân mật -> Thăm hỏi & kể chuyện -> Lời chúc & tạm biệt.',
      step4Draft: 'Soạn thư vào giao diện thư điện tử mô phỏng.',
      step5Revise: 'Đọc soát: Các phần của thư; Nội dung chính; Tệp đính kèm; Địa chỉ email chính xác.'
    },
    evaluationRubric: [
      'Đặt tiêu đề thư điện tử ngắn gọn, đúng trọng tâm',
      'Lời văn gần gũi, ấm áp, thể hiện tình bạn trong sáng',
      'Cấu trúc thư điện tử đầy đủ các thành phần quy định'
    ],
    resources: {
      guideNotes: 'Lưu ý: Viết thư theo nội dung đã chuẩn bị. Nếu soạn thư trên máy tính, có thể sử dụng các biểu tượng cảm xúc hoặc đính kèm ảnh, video,... Đọc soát và chỉnh sửa theo 4 phần.',
      vocabAndPatterns: ['Chủ đề: Gửi bạn thân mến ở Đà Nẵng', 'Dạo này cậu học hành thế nào?', 'Hè này cậu có về thăm quê không?', 'Mong sớm nhận được thư cậu!']
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 130-131.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 34, Bài 29, tr. 130',
    isSampleData: true
  },

  // Tuần 34 - Bài 30
  {
    id: 'kntt-hk2-w34-b30',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 34,
    lessonNumber: 30,
    lessonTitle: 'Viết giấy mời',
    page: 132,
    theme: 'Vì một thế giới bình yên',
    readingLesson: 'Ngày hội',
    genre: 'Viết giấy mời',
    stage: 'Viết văn bản thực hành',
    writingPrompt: 'Đọc giấy mời "Tham dự buổi thi Kể chuyện sáng tạo" trang 132 SGK; viết giấy mời để mời một bạn lớp bên tới dự buổi thi Hùng biện tiếng Việt do lớp em tổ chức.',
    learningObjective: 'Biết viết giấy mời ngắn gọn, đầy đủ thông tin chuẩn xác (tiêu đề, người mời, người được mời, sự kiện, thời gian, địa điểm, mong muốn đón tiếp).',
    practiceSteps: {
      step1Explore: 'Đọc mẫu giấy mời của lớp trưởng 4A Vũ Mạnh Hoàn gửi bạn Ngô Minh Loan lớp trưởng 4B.',
      step2GatherIdeas: 'Xác định các thông tin cần có trong giấy mời tham dự cuộc thi Hùng biện tiếng Việt (thời gian cụ thể, phòng học, người đại diện mời).',
      step3Outline: 'Sắp xếp theo thứ tự: Tiêu đề giấy mời -> Người được mời -> Sự kiện -> Thời gian -> Địa điểm -> Lời đón tiếp -> Người mời kí tên.',
      step4Draft: 'Viết giấy mời hoàn chỉnh, có thể trang trí khung viền đẹp mắt.',
      step5Revise: 'Kiểm tra chính xác tên, thời gian, địa điểm và cách trình bày trang trọng.'
    },
    evaluationRubric: [
      'Ghi chính xác thời gian và địa điểm tổ chức sự kiện',
      'Lời mời lịch sự, thể hiện lòng hiếu khách',
      'Hình thức trình bày gọn gàng, trang nhã'
    ],
    resources: {
      guideNotes: 'Các mục trong giấy mời: Tiêu đề giấy mời; Người mời; Người được mời; Sự kiện mời; Thời gian tổ chức sự kiện; Địa điểm tổ chức sự kiện; Mong muốn và đề nghị.',
      suggestedQuestions: [
        'Giấy mời gồm những mục nào?',
        'Thời gian và địa điểm được ghi rõ như thế nào?',
        'Lời mời thể hiện sự chân thành ra sao?'
      ],
      sampleTemplate: 'GIẤY MỜI / THAM DỰ BUỔI THI HÙNG BIỆN TIẾNG VIỆT / Thân mời: Bạn..., Lớp... / Đến dự buổi thi... / Thời gian:... / Địa điểm:... / Rất vui được đón tiếp bạn! / Thay mặt tập thể lớp... (kí tên)'
    },
    verificationStatus: 'verified',
    verificationNotes: 'Khớp mục lục và SGK Tập hai, tr. 132-134.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 34, Bài 30, tr. 132',
    isSampleData: true
  },

  // Tuần 9 & Tuần 18, 27, 35 - Các bài Ôn tập cần xác minh từ giáo viên
  {
    id: 'kntt-hk1-w9-review',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 9,
    lessonNumber: 0,
    lessonTitle: 'Ôn tập và Đánh giá giữa học kì I',
    page: 69,
    theme: 'Ôn tập học kì',
    readingLesson: 'Nai con Bam-bi / Con chim chiền chiện',
    genre: 'Bài văn thuật sự việc / kể chuyện',
    stage: 'Đánh giá giữa kì',
    writingPrompt: 'Phần 2 - Đánh giá giữa học kì I (tr. 75 SGK): Chọn 1 trong 2 đề: Đề 1: Viết bài văn thuật lại một giờ học đáng nhớ đối với em; Đề 2: Viết bài văn kể lại một câu chuyện đã đọc hoặc đã nghe về trí thông minh hoặc khả năng tìm tòi, sáng tạo của con người.',
    learningObjective: 'Tổng hợp và vận dụng kĩ năng viết bài văn thuật lại sự việc và kể lại câu chuyện đã học trong 8 tuần đầu của Học kì I.',
    practiceSteps: {
      step1Explore: 'Đọc kĩ 2 đề kiểm tra; chọn đề bài phù hợp với vốn trải nghiệm của bản thân.',
      step2GatherIdeas: 'Nhớ lại các mốc sự việc của giờ học đáng nhớ hoặc câu chuyện về nhà phát minh, sáng tạo.',
      step3Outline: 'Lập dàn ý 3 phần hoàn chỉnh theo chuẩn yêu cầu kiểu bài.',
      step4Draft: 'Viết bài văn hoàn chỉnh trong thời gian quy định (35-40 phút).',
      step5Revise: 'Tự đọc soát lại toàn bài, sửa lỗi chính tả và lỗi câu trước khi nộp.'
    },
    evaluationRubric: [
      'Đúng kiểu bài và đề bài đã chọn',
      'Bố cục 3 phần mạch lạc, diễn biến sự việc rõ ràng',
      'Lời văn tự nhiên, có cảm xúc chân thực'
    ],
    resources: {
      guideNotes: 'Đề 1: Thuật lại một giờ học đáng nhớ đối với em; Đề 2: Kể lại một câu chuyện về trí thông minh hoặc sáng tạo của con người.',
      vocabAndPatterns: ['giờ học sôi nổi', 'say sưa phát biểu', 'khám phá điều mới lạ', 'bài học bổ ích']
    },
    verificationStatus: 'needs_verification',
    verificationNotes: 'Cần giáo viên xác minh: Bảng Excel tài liệu giáo viên chưa tạo dòng dữ liệu cho tuần ôn tập kiểm tra giữa kì I; dữ liệu này được đối chiếu bổ sung trực tiếp từ trang 69-75 SGK Tiếng Việt 4 Tập một.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 9, tr. 69-75',
    isSampleData: true
  },

  {
    id: 'kntt-hk1-w18-review',
    semester: 'Học kì I',
    bookVolume: 'Tập một',
    week: 18,
    lessonNumber: 0,
    lessonTitle: 'Ôn tập và Đánh giá cuối học kì I',
    page: 138,
    theme: 'Ôn tập học kì',
    readingLesson: 'Nhắm mắt lại / Hương vị đồng quê',
    genre: 'Miêu tả con vật / Tưởng tượng',
    stage: 'Đánh giá cuối kì',
    writingPrompt: 'Phần 2 - Đánh giá cuối học kì I (tr. 145 SGK): Chọn 1 trong 2 đề: Đề 1: Viết bài văn miêu tả một con vật mà em từng nuôi hoặc từng nhìn thấy và có ấn tượng đặc biệt; Đề 2: Viết đoạn văn tưởng tượng dựa vào một câu chuyện thú vị mà em đã đọc hoặc đã nghe.',
    learningObjective: 'Tổng hợp và kiểm tra kĩ năng viết bài văn miêu tả con vật và viết đoạn văn tưởng tượng đã rèn luyện trong suốt Học kì I.',
    practiceSteps: {
      step1Explore: 'Chọn 1 trong 2 đề kiểm tra cuối kì I phù hợp năng khiếu.',
      step2GatherIdeas: 'Huy động vốn từ ngữ miêu tả con vật hoặc trí tưởng tượng sáng tạo.',
      step3Outline: 'Lập dàn ý nhanh ra giấy nháp trước khi viết bài.',
      step4Draft: 'Viết bài văn hoặc đoạn văn hoàn chỉnh theo thời gian quy định.',
      step5Revise: 'Rà soát lỗi chính tả, từ ngữ và dấu câu.'
    },
    evaluationRubric: [
      'Đáp ứng trọn vẹn yêu cầu kiểu bài của đề bài',
      'Sử dụng tốt các biện pháp nghệ thuật so sánh, nhân hoá',
      'Diễn đạt trôi chảy, bài viết sạch sẽ, đúng ngữ pháp'
    ],
    resources: {
      guideNotes: 'Đề 1: Tả con vật từng nuôi hoặc nhìn thấy; Đề 2: Viết đoạn văn tưởng tượng dựa vào câu chuyện thú vị.',
      vocabAndPatterns: ['bộ lông mềm mượt', 'nhanh nhẹn', 'thế giới kì diệu', 'phép màu cổ tích']
    },
    verificationStatus: 'needs_verification',
    verificationNotes: 'Cần giáo viên xác minh: Bảng Excel tài liệu giáo viên chưa có dòng riêng cho tuần ôn tập cuối kì I; dữ liệu đối chiếu bổ sung trực tiếp từ trang 138-145 SGK Tiếng Việt 4 Tập một.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập một, Tuần 18, tr. 138-145',
    isSampleData: true
  },

  {
    id: 'kntt-hk2-w27-review',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 27,
    lessonNumber: 0,
    lessonTitle: 'Ôn tập và Đánh giá giữa học kì II',
    page: 70,
    theme: 'Ôn tập học kì',
    readingLesson: 'Con rắn vuông / Người nông dân và con chim ưng',
    genre: 'Nêu ý kiến / Cảm xúc / Kể chuyện',
    stage: 'Đánh giá giữa kì',
    writingPrompt: 'Phần 2 - Đánh giá giữa học kì II (tr. 78 SGK): Chọn 1 trong 3 đề: Đề 1: Viết đoạn văn nêu lí do em thích một câu chuyện đã đọc hoặc đã nghe trong một chủ điểm đã học; Đề 2: Viết đoạn văn nêu tình cảm, cảm xúc về nhân vật bác nông dân trong câu chuyện "Người nông dân và con chim ưng"; Đề 3: Viết bài văn kể lại câu chuyện dân gian về một người anh hùng chống ngoại xâm (Thánh Gióng, An Dương Vương...).',
    learningObjective: 'Đánh giá toàn diện kĩ năng viết đoạn văn nêu ý kiến, nêu tình cảm cảm xúc về nhân vật và bài văn kể lại câu chuyện dân gian.',
    practiceSteps: {
      step1Explore: 'Đọc 3 đề kiểm tra, chọn đề bài phát huy tốt nhất khả năng viết của em.',
      step2GatherIdeas: 'Xác định dẫn chứng trong tác phẩm hoặc sự việc lịch sử anh hùng.',
      step3Outline: 'Lập dàn ý nhanh: mở đầu, triển khai, kết thúc.',
      step4Draft: 'Viết bài theo yêu cầu thời gian thi.',
      step5Revise: 'Đọc soát lỗi chính tả, dùng từ và mạch lạc câu văn.'
    },
    evaluationRubric: [
      'Đúng kiểu bài và đề bài đã chọn',
      'Lập luận rõ ràng hoặc câu chuyện hào hùng, cảm động',
      'Trình bày bài thi cẩn thận, chuẩn mực'
    ],
    resources: {
      guideNotes: 'Đề 1: Nêu lí do thích câu chuyện; Đề 2: Nêu cảm xúc về bác nông dân nhân hậu; Đề 3: Kể chuyện Thánh Gióng hoặc An Dương Vương.',
      vocabAndPatterns: ['ở hiền gặp lành', 'nghĩa cử cao đẹp', 'khí thế hào hùng', 'người anh hùng dân tộc']
    },
    verificationStatus: 'needs_verification',
    verificationNotes: 'Cần giáo viên xác minh: Bảng Excel giáo viên chưa có dòng cho tuần 27 ôn tập giữa kì II; dữ liệu đối chiếu bổ sung trực tiếp từ trang 70-78 SGK Tiếng Việt 4 Tập hai.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 27, tr. 70-78',
    isSampleData: true
  },

  {
    id: 'kntt-hk2-w35-review',
    semester: 'Học kì II',
    bookVolume: 'Tập hai',
    week: 35,
    lessonNumber: 0,
    lessonTitle: 'Ôn tập và Đánh giá cuối năm học',
    page: 134,
    theme: 'Ôn tập học kì',
    readingLesson: 'Chiều thu quê em / Hơn một nghìn ngày vòng quanh Trái Đất',
    genre: 'Miêu tả cây cối / Tưởng tượng',
    stage: 'Đánh giá cuối năm',
    writingPrompt: 'Phần 2 - Đánh giá cuối năm học (tr. 138 & 141 SGK): Đề 1: Viết bài văn miêu tả một cây hoa mà em thấy ở trường, trong vườn nhà hoặc trên đường đi học; Đề 2: Hãy tưởng tượng em tham gia đoàn thám hiểm của Ma-gien-lăng và vừa trở về đất liền, kể lại cuộc gặp gỡ đón em.',
    learningObjective: 'Tổng kết năng lực viết văn cả năm học lớp 4: hoàn thành bài văn miêu tả cây hoa giàu hình ảnh hoặc câu chuyện tưởng tượng thám hiểm hấp dẫn.',
    practiceSteps: {
      step1Explore: 'Chọn đề văn miêu tả cây hoa hoặc tưởng tượng chuyến thám hiểm Ma-gien-lăng.',
      step2GatherIdeas: 'Ghi lại các chi tiết nổi bật về sắc hoa, hương thơm hoặc cảm xúc đoàn tụ sau chuyến thám hiểm vượt đại dương.',
      step3Outline: 'Lập dàn ý 3 phần chuẩn bị viết bài.',
      step4Draft: 'Viết bài văn hoàn chỉnh bằng tất cả vốn ngôn từ đã tích lũy trong năm học.',
      step5Revise: 'Rà soát cẩn thận từng câu chữ, dấu câu và chính tả.'
    },
    evaluationRubric: [
      'Đạt chuẩn kĩ năng viết văn miêu tả hoặc tưởng tượng của học sinh lớp 4',
      'Ngôn ngữ trong sáng, giàu sức gợi cảm và liên tưởng',
      'Bố cục cân đối, chữ viết rõ ràng, đúng chính tả'
    ],
    resources: {
      guideNotes: 'Tiết 5 (tr. 138): Viết bài văn miêu tả loài cây có nhiều ở địa phương em. Tiết 6-7 (tr. 141): Đề 1 (tả cây hoa), Đề 2 (tưởng tượng trở về từ đoàn thám hiểm Ma-gien-lăng).',
      vocabAndPatterns: ['rực rỡ sắc màu', 'hương thơm ngào ngạt', 'vượt qua bão táp đại dương', 'khám phá chân trời mới']
    },
    verificationStatus: 'needs_verification',
    verificationNotes: 'Cần giáo viên xác minh: Bảng Excel giáo viên kết thúc ở tuần 34; dữ liệu tuần 35 đối chiếu trực tiếp từ trang 134-142 SGK Tiếng Việt 4 Tập hai.',
    sourceLabel: 'SGK Tiếng Việt 4 Tập hai, Tuần 35, tr. 134-142',
    isSampleData: true
  }
];

export const LOCAL_STORAGE_KEY_CURRICULUM = 'edunova_grade4_curriculum_data_v1';

export function getInitialCurriculumData(): Grade4LessonItem[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CURRICULUM);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read curriculum data from localStorage', err);
  }
  return RAW_CURRICULUM_DATA;
}

export function saveCurriculumData(data: Grade4LessonItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_CURRICULUM, JSON.stringify(data));
  } catch (err) {
    console.error('Could not save curriculum data to localStorage', err);
  }
}
