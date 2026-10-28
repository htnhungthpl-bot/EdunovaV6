import { Grade4LessonItem } from '../types';

export interface GenreGuidance {
  genreKey: string;
  genreTitle: string;
  step1KeyQuestions: { id: string; label: string; placeholder: string; hint: string }[];
  step1PromptQuestions?: { id: string; question?: string; label?: string; placeholder: string; hint: string }[];
  step2StructureInfo: {
    introTitle: string;
    introDesc: string;
    bodyTitle: string;
    bodyDesc: string;
    conclusionTitle: string;
    conclusionDesc: string;
    keyStandards: string[];
  };
  step3IdeaQuestions: { id: string; question: string; hint: string; exampleAnswer: string }[];
  step4OutlineTemplate: {
    introGuide: string;
    introDefault: string;
    bodyGuide: string;
    bodyDefault: string;
    conclusionGuide: string;
    conclusionDefault: string;
  };
  step6FeedbackRules: {
    rubricPoints: string[];
    commonMistakes: string[];
  };
  step7RevisionChecklist: { id: string; label: string; tip: string }[];
  step8AssessmentCriteria: { id: string; label: string }[];
}

export function getGenreGuidance(lesson: Grade4LessonItem | null): GenreGuidance {
  const genreLower = (lesson?.genre || '').toLowerCase();

  // 1. MIÊU TẢ CÂY CỐI
  if (genreLower.includes('cây cối') || genreLower.includes('cây')) {
    return {
      genreKey: 'mieu-ta-cay-coi',
      genreTitle: 'Văn miêu tả cây cối (Lớp 4)',
      step1KeyQuestions: [
        {
          id: 'subject',
          label: 'Đề bài yêu cầu em miêu tả loài cây nào?',
          placeholder: 'Ví dụ: Cây bàng già ở góc sân trường em / Cây hoa hồng trong vườn nhà...',
          hint: 'Xác định rõ tên cây và địa điểm nơi cây sinh sống.'
        },
        {
          id: 'scope',
          label: 'Cây đó gắn bó với kỉ niệm hoặc hoàn cảnh nào của em?',
          placeholder: 'Ví dụ: Che mát cho chúng em giờ ra chơi / Được ông bà trồng từ khi em còn nhỏ...',
          hint: 'Nêu hoàn cảnh giúp bài viết có cảm xúc chân thực.'
        },
        {
          id: 'format',
          label: 'Kiểu bài và dung lượng yêu cầu:',
          placeholder: 'Bài văn miêu tả hoàn chỉnh (khoảng 140 - 200 từ, gồm 3 phần: Mở bài, Thân bài, Kết bài).',
          hint: 'Bài văn lớp 4 cần có bố cục rõ ràng và liên kết câu mạch lạc.'
        }
      ],
      step2StructureInfo: {
        introTitle: '1. Mở bài (Trực tiếp hoặc Gián tiếp)',
        introDesc: 'Giới thiệu bao quát về cây: tên cây, mọc ở đâu, do ai trồng hoặc vì sao em chú ý tới cây.',
        bodyTitle: '2. Thân bài (Tả theo bộ phận hoặc theo thời kì phát triển)',
        bodyDesc: 'Tả bao quát hình dáng cây từ xa (như chiếc ô, như người lính); tả chi tiết từng bộ phận (gốc, rễ, thân, cành, lá, hoa, quả) kết hợp tả chim chóc, ánh nắng, giờ vui chơi.',
        conclusionTitle: '3. Kết bài (Mở rộng hoặc Không mở rộng)',
        conclusionDesc: 'Nêu tình cảm, ấn tượng sâu sắc, kỉ niệm gắn bó và lời hứa chăm sóc, bảo vệ cây xanh.',
        keyStandards: [
          'Có đủ 3 phần: Mở bài - Thân bài - Kết bài.',
          'Sử dụng ít nhất 2 hình ảnh so sánh sinh động (như chiếc ô, như đàn trăn...).',
          'Vận dụng các từ ngữ gợi cảm (xum xuê, mỡ màng, xù xì, rì rào...).',
          'Thể hiện tình cảm tự nhiên, chữ viết sạch sẽ, đúng chính tả.'
        ]
      },
      step3IdeaQuestions: [
        {
          id: 'q1',
          question: 'Nhìn từ xa, dáng vẻ của cây trông giống hình ảnh gì quen thuộc?',
          hint: 'Ví dụ: như một chiếc ô khổng lồ màu ngọc bích, như người vệ sĩ canh gác sân trường...',
          exampleAnswer: 'Nhìn từ xa, cây sừng sững như một chiếc nấm xanh khổng lồ che rợp cả góc sân.'
        },
        {
          id: 'q2',
          question: 'Đến gần, gốc cây, rễ cây và thân cây có đặc điểm gì đặc biệt?',
          hint: 'Quan sát màu sắc vỏ cây, độ lớn thân cây (ôm vừa một vòng tay), rễ cây trồi lên mặt đất...',
          exampleAnswer: 'Thân cây to bằng một vòng tay em ôm, vỏ cây màu nâu xám xù xì bạc phếch theo năm tháng; rễ trồi lên như những chú trăn con.'
        },
        {
          id: 'q3',
          question: 'Lá cây, hoa hoặc quả thay đổi như thế nào theo thời gian hoặc mùa?',
          hint: 'Mùa xuân đâm chồi non mỡ màng, mùa hè xanh ngắt che bóng râm, mùa thu/đông lá đổi màu...',
          exampleAnswer: 'Mùa hè, tán lá xanh mướt mỡ màng che mát rượi, quả bàng chín vàng ươm rơi lộc cộc.'
        },
        {
          id: 'q4',
          question: 'Em và các bạn thường có những kỉ niệm hoặc hoạt động gì dưới bóng mát của cây?',
          hint: 'Ngồi đọc truyện, chơi nhảy dây, nhặt lá, trò chuyện tâm sự cùng bạn bè...',
          exampleAnswer: 'Mỗi giờ ra chơi, chúng em lại tụ tập dưới gốc cây để cùng đọc sách và chơi nhảy dây rộn rã.'
        }
      ],
      step4OutlineTemplate: {
        introGuide: 'Giới thiệu cây: Giới thiệu gián tiếp từ kỉ niệm sân trường hoặc trực tiếp cây em định tả.',
        introDefault: 'Mỗi giờ ra chơi, sân trường lại rộn rã tiếng cười đùa. Nhưng nơi em yêu thích nhất chính là bóng mát của cây bàng già bên góc sân.',
        bodyGuide: 'Thân bài: Tả bao quát hình dáng -> Tả chi tiết thân, rễ, cành, lá, hoa, quả -> Tả hoạt động của học sinh dưới tán cây.',
        bodyDefault: '1. Nhìn từ xa: Cây như chiếc ô khổng lồ màu xanh thẫm.\n2. Lại gần: Thân to, vỏ xù xì; rễ nổi gồ ghề; tán lá chia thành nhiều tầng lớp.\n3. Lá cây: Mùa hè xanh mỡ màng che mát rượi; tiếng lá reo rì rào trong gió.\n4. Kỉ niệm: Giờ ra chơi các bạn ngồi đọc sách, chơi đùa dưới bóng râm.',
        conclusionGuide: 'Kết bài: Bày tỏ tình cảm, kỉ niệm nhớ nhất và mong ước chăm sóc cây.',
        conclusionDefault: 'Em yêu quý cây như một người bạn hiền thân thiết của tuổi học trò. Dù sau này lớn lên, em vẫn luôn nhớ về bóng mát thân thương nơi mái trường.'
      },
      step6FeedbackRules: {
        rubricPoints: [
          'Độ dài bài văn đạt chuẩn học sinh lớp 4 (khoảng 140 - 200 từ).',
          'Đầy đủ 3 phần Mở bài - Thân bài - Kết bài rõ rệt.',
          'Đã vận dụng các hình ảnh so sánh hoặc nhân hoá sinh động.',
          'Có từ ngữ gợi tả đường nét, màu sắc và âm thanh (xù xì, mỡ màng, rì rào...).'
        ],
        commonMistakes: [
          'Chưa xuống dòng tách các đoạn mở bài, thân bài và kết bài.',
          'Liệt kê các bộ phận như một danh sách mà chưa gắn với từ ngữ so sánh gợi cảm.',
          'Quên bộc lộ cảm xúc và kỉ niệm gắn bó ở phần kết bài.'
        ]
      },
      step7RevisionChecklist: [
        { id: 'c1', label: 'Bài đã chia thành 3 phần (Mở bài, Thân bài, Kết bài) rõ ràng chưa?', tip: 'Hãy ấn Enter xuống dòng và lùi đầu dòng ở mỗi đoạn văn.' },
        { id: 'c2', label: 'Đã có ít nhất 1-2 câu sử dụng từ so sánh ("như", "tựa như") chưa?', tip: 'Thêm ví dụ: "tán lá xòe rộng như chiếc ô", "rễ trồi lên như những chú trăn con".' },
        { id: 'c3', label: 'Đã thay thế các từ kể đơn điệu bằng từ láy gợi cảm chưa?', tip: 'Thử dùng: sừng sững, xum xuê, mỡ màng, rì rào, lấp lánh...' },
        { id: 'c4', label: 'Đã kiểm tra dấu câu và lỗi chính tả chữ hoa đầu câu chưa?', tip: 'Đọc to từng câu để kiểm tra ngắt nghỉ nhịp nhàng.' }
      ],
      step8AssessmentCriteria: [
        { id: 'a1', label: 'Đúng đề bài văn miêu tả cây cối lớp 4' },
        { id: 'a2', label: 'Bố cục 3 phần rõ ràng, mạch lạc' },
        { id: 'a3', label: 'Có hình ảnh so sánh, nhân hoá sinh động' },
        { id: 'a4', label: 'Từ ngữ giàu sức gợi cảm, cảm xúc chân thực' },
        { id: 'a5', label: 'Chữ viết cẩn thận, không mắc lỗi chính tả' }
      ]
    };
  }

  // 2. MIÊU TẢ CON VẬT
  if (genreLower.includes('con vật')) {
    return {
      genreKey: 'mieu-ta-con-vat',
      genreTitle: 'Văn miêu tả con vật (Lớp 4)',
      step1KeyQuestions: [
        {
          id: 'subject',
          label: 'Đề bài yêu cầu em miêu tả con vật nào?',
          placeholder: 'Ví dụ: Chú mèo mướp nhà em nuôi / Chú chó vàng thông minh / Chú rùa nhỏ...',
          hint: 'Con vật nuôi trong nhà hoặc con vật em đã quan sát kĩ.'
        },
        {
          id: 'scope',
          label: 'Con vật có tên là gì, do ai tặng hoặc nuôi từ bao giờ?',
          placeholder: 'Ví dụ: Chú mèo tên là Miu, được bố tặng vào ngày sinh nhật 9 tuổi...',
          hint: 'Nêu lai lịch giúp mở bài thêm sinh động.'
        },
        {
          id: 'format',
          label: 'Yêu cầu kiểu bài và độ dài:',
          placeholder: 'Bài văn miêu tả con vật (130 - 190 từ), kết hợp tả ngoại hình và hoạt động, thói quen.',
          hint: 'Cần cân đối giữa tả hình dáng và tả thói quen đáng yêu.'
        }
      ],
      step2StructureInfo: {
        introTitle: '1. Mở bài',
        introDesc: 'Giới thiệu con vật định tả (tên gọi, nuôi từ khi nào, do ai tặng).',
        bodyTitle: '2. Thân bài',
        bodyDesc: 'Tả đặc điểm ngoại hình (bộ lông, đầu, mắt, tai, bốn chân, đuôi) và hoạt động, thói quen (bắt chuột, sưởi nắng, chạy nhảy, tiếng kêu).',
        conclusionTitle: '3. Kết bài',
        conclusionDesc: 'Bày tỏ tình cảm yêu mến, sự gắn bó và sự chăm sóc của em đối với con vật.',
        keyStandards: [
          'Bố cục 3 phần rõ ràng.',
          'Kết hợp hài hoà giữa tả ngoại hình và hoạt động tiêu biểu.',
          'Dùng từ ngữ so sánh miêu tả đôi mắt, bước đi, bộ lông.',
          'Lời văn ấm áp tình thương yêu loài vật.'
        ]
      },
      step3IdeaQuestions: [
        {
          id: 'q1',
          question: 'Bộ lông và hình dáng bao quát của con vật trông như thế nào?',
          hint: 'Màu sắc bộ lông (mềm như tơ lụa, vàng óng...), thân hình thon thả hay mũm mĩm...',
          exampleAnswer: 'Bộ lông màu vàng cam mềm mượt như nhung lụa, thân hình tròn trĩnh đáng yêu.'
        },
        {
          id: 'q2',
          question: 'Đôi mắt, đôi tai và khuôn mặt của con vật có nét gì ngộ nghĩnh?',
          hint: 'Mắt tròn xoe xanh như hòn bi ve, hai tai vểnh lên nghe ngóng, ria mép kiêu hãnh...',
          exampleAnswer: 'Đôi mắt tròn xoe xanh biếc tựa như hai hòn bi ve lấp lánh dưới ánh nắng.'
        },
        {
          id: 'q3',
          question: 'Bốn chân và bước đi của con vật có đặc điểm gì đặc biệt?',
          hint: 'Đệm thịt hồng giúp đi êm ru không tiếng động, móng vuốt sắc nhọn...',
          exampleAnswer: 'Bốn chân có đệm thịt màu hồng đào mềm mại, giúp chú bước đi êm ru nhẹ nhàng.'
        },
        {
          id: 'q4',
          question: 'Hoạt động hoặc thói quen nổi bật nhất của con vật khiến em yêu thích là gì?',
          hint: 'Rình bắt chuột nhanh như chớp, nũng nịu đòi ăn, sưởi nắng ngoài hiên...',
          exampleAnswer: 'Khi rình chuột, chú thu mình bất động rồi lao vút ra nhanh như một tia chớp.'
        }
      ],
      step4OutlineTemplate: {
        introGuide: 'Mở bài: Giới thiệu con vật em yêu quý.',
        introDefault: 'Vào ngày sinh nhật lần thứ chín, bố đã tặng cho em một chú mèo mướp rất tinh nghịch. Em đặt tên cho chú là Miu Miu.',
        bodyGuide: 'Thân bài: Tả hình dáng bao quát -> Tả chi tiết mắt, tai, chân -> Tả hoạt động, thói quen bắt chuột hoặc đùa giỡn.',
        bodyDefault: '1. Ngoại hình: Bộ lông mềm mịn; mắt xanh tròn như hai viên bi ve; đệm chân êm ái.\n2. Hoạt động: Nằm sưởi nắng lim dim; khi nghe tiếng động lạ thì vểnh tai nghe ngóng.\n3. Thói quen: Chạy quanh chân mẹ kêu meo meo nũng nịu; bắt chuột nhanh như cắt.',
        conclusionGuide: 'Kết bài: Nêu tình cảm gắn bó và lời hứa chăm sóc con vật.',
        conclusionDefault: 'Em yêu quý chú mèo Miu như một thành viên thân thiết trong gia đình. Em hứa sẽ luôn chăm sóc chú thật chu đáo.'
      },
      step6FeedbackRules: {
        rubricPoints: [
          'Đúng kiểu bài miêu tả con vật lớp 4.',
          'Có hình ảnh so sánh đặc sắc (mắt như bi ve, nhanh như chớp).',
          'Kết hợp được tả hình dáng và tả hoạt động sống động.'
        ],
        commonMistakes: [
          'Chỉ tả hình dáng mà quên kể hoạt động, thói quen của con vật.',
          'Dùng từ lặp đi lặp lại nhiều lần.'
        ]
      },
      step7RevisionChecklist: [
        { id: 'c1', label: 'Đã tả cả ngoại hình lẫn hoạt động của con vật chưa?', tip: 'Bổ sung thêm cảnh chú chạy nhảy hoặc bắt mồi.' },
        { id: 'c2', label: 'Có từ so sánh tả đôi mắt hoặc bước đi chưa?', tip: 'Thêm: "tròn xoe như hai hòn bi ve", "bước đi êm ru".' },
        { id: 'c3', label: 'Đã chia đoạn Mở bài, Thân bài, Kết bài chưa?', tip: 'Xuống dòng tách đoạn mạch lạc.' }
      ],
      step8AssessmentCriteria: [
        { id: 'a1', label: 'Tả đúng con vật yêu thích' },
        { id: 'a2', label: 'Hình ảnh ngoại hình và hoạt động sinh động' },
        { id: 'a3', label: 'Cảm xúc yêu quý loài vật chân thành' }
      ]
    };
  }

  // 3. ĐOẠN VĂN NÊU Ý KIẾN
  if (genreLower.includes('ý kiến')) {
    return {
      genreKey: 'doan-van-neu-y-kien',
      genreTitle: 'Đoạn văn nêu ý kiến (Lớp 4)',
      step1KeyQuestions: [
        {
          id: 'subject',
          label: 'Đề bài yêu cầu nêu ý kiến về câu chuyện hay vấn đề gì?',
          placeholder: 'Ví dụ: Câu chuyện Thi nhạc / Chuyện về tình cảm gia đình / Tình yêu thương...',
          hint: 'Nêu chính xác tên câu chuyện và tác giả nếu có.'
        },
        {
          id: 'format',
          label: 'Yêu cầu hình thức:',
          placeholder: 'Một đoạn văn liên tục không xuống dòng (khoảng 80 - 140 từ), có câu mở đoạn nêu ý kiến, các câu thân đoạn nêu lí do và câu kết đoạn khẳng định.',
          hint: 'Đoạn văn viết liền mạch từ đầu đến cuối.'
        }
      ],
      step2StructureInfo: {
        introTitle: '1. Mở đầu đoạn văn',
        introDesc: 'Nêu tên câu chuyện và bày tỏ ý kiến chung (rất thích, vô cùng xúc động, ấn tượng sâu sắc...).',
        bodyTitle: '2. Triển khai các lí do',
        bodyDesc: 'Nêu ít nhất 1-2 lí do vì sao em yêu thích câu chuyện kèm theo dẫn chứng cụ thể từ hành động, lời nói của nhân vật.',
        conclusionTitle: '3. Kết thúc đoạn văn',
        conclusionDesc: 'Khẳng định lại ý kiến của em hoặc bài học rút ra từ câu chuyện.',
        keyStandards: [
          'Đoạn văn viết liên tục, không xuống dòng giữa chừng.',
          'Ý kiến mở đầu rõ ràng, dứt khoát.',
          'Lí do thuyết phục, có dẫn chứng cụ thể từ tác phẩm.',
          'Câu kết khẳng định lại tình cảm hoặc bài học sâu sắc.'
        ]
      },
      step3IdeaQuestions: [
        {
          id: 'q1',
          question: 'Em thích nhất câu chuyện nào và điều gì gây ấn tượng đầu tiên?',
          hint: 'Tên câu chuyện, thế giới nhân vật kì thú hoặc hoàn cảnh cảm động...',
          exampleAnswer: 'Em rất yêu thích câu chuyện "Thi nhạc" của nhà văn Nguyễn Phan Hách vì không khí âm nhạc rộn ràng.'
        },
        {
          id: 'q2',
          question: 'Nhân vật hoặc chi tiết nào trong truyện khiến em cảm phục hoặc yêu mến nhất?',
          hint: 'Kể cụ thể một hành động, lời thoại hoặc sự việc đáng nhớ...',
          exampleAnswer: 'Hình ảnh ve sầu tự tin biểu diễn bản nhạc "Mùa hè" và lời dặn dò ấm áp của thầy vàng anh khiến em nhớ mãi.'
        },
        {
          id: 'q3',
          question: 'Câu chuyện đó mang lại cho em bài học hoặc suy nghĩ gì quý báu?',
          hint: 'Bài học về sự tự tin, lòng biết ơn, sự kiên trì hay tình cảm gia đình...',
          exampleAnswer: 'Câu chuyện giúp em hiểu rằng mỗi người đều có nét đẹp riêng và cần nỗ lực khẳng định bản thân.'
        }
      ],
      step4OutlineTemplate: {
        introGuide: 'Câu mở đoạn: Giới thiệu tên câu chuyện và nêu ý kiến yêu thích.',
        introDefault: 'Câu chuyện "Thi nhạc" của nhà văn Nguyễn Phan Hách đã cuốn em vào một thế giới đầy thú vị và để lại ấn tượng sâu sắc.',
        bodyGuide: 'Các câu triển khai: Nêu 2 lí do yêu thích kèm dẫn chứng về nhân vật và tình huống truyện.',
        bodyDefault: 'Trước hết, các nhân vật quen thuộc như ve sầu, dế mèn, hoạ mi đã hoá thành những nghệ sĩ tài ba với khúc ca riêng biệt. Đặc biệt, hình ảnh thầy giáo vàng anh nhân hậu luôn nâng đỡ ước mơ học trò làm em vô cùng xúc động.',
        conclusionGuide: 'Câu kết đoạn: Khẳng định lại ý kiến và tình cảm đối với câu chuyện.',
        conclusionDefault: 'Câu chuyện đã kết thúc nhưng dư âm ngọt ngào và bài học về nét đẹp riêng của mỗi người vẫn còn đọng mãi trong tâm trí em.'
      },
      step6FeedbackRules: {
        rubricPoints: [
          'Đoạn văn viết đúng thể thức (viết liền một đoạn, không xuống dòng).',
          'Có câu chủ đề mở đoạn nêu rõ ý kiến.',
          'Lí do đưa ra có dẫn chứng minh họa cụ thể từ câu chuyện.'
        ],
        commonMistakes: [
          'Kể lại toàn bộ câu chuyện thay vì nêu ý kiến và lí do.',
          'Chưa có dẫn chứng cụ thể từ tác phẩm.'
        ]
      },
      step7RevisionChecklist: [
        { id: 'c1', label: 'Đoạn văn đã viết liên tục không xuống dòng chưa?', tip: 'Kiểm tra quy cách trình bày một đoạn văn.' },
        { id: 'c2', label: 'Đã có câu mở đầu nêu rõ sự yêu thích chưa?', tip: 'Bắt đầu bằng: "Đọc câu chuyện... em vô cùng ấn tượng bởi..."' },
        { id: 'c3', label: 'Có đủ dẫn chứng cụ thể từ truyện chưa?', tip: 'Nhắc lại tên nhân vật hoặc hành động tiêu biểu.' }
      ],
      step8AssessmentCriteria: [
        { id: 'a1', label: 'Đúng kiểu đoạn văn nêu ý kiến' },
        { id: 'a2', label: 'Ý kiến rõ ràng, lí do thuyết phục' },
        { id: 'a3', label: 'Dẫn chứng chính xác từ câu chuyện' }
      ]
    };
  }

  // 4. BÀI VĂN THUẬT LẠI MỘT SỰ VIỆC
  if (genreLower.includes('thuật lại') || genreLower.includes('sự việc')) {
    return {
      genreKey: 'thuat-lai-su-viec',
      genreTitle: 'Bài văn thuật lại một sự việc (Lớp 4)',
      step1KeyQuestions: [
        {
          id: 'subject',
          label: 'Sự việc hoặc hoạt động trải nghiệm em muốn thuật lại là gì?',
          placeholder: 'Ví dụ: Buổi sinh hoạt lớp phát động xây dựng tủ sách / Lễ khai giảng / Chuyến tham quan nghĩa trang liệt sĩ...',
          hint: 'Chọn một hoạt động thực tế em đã tham gia hoặc chứng kiến.'
        },
        {
          id: 'format',
          label: 'Yêu cầu kiểu bài:',
          placeholder: 'Bài văn thuật lại sự việc theo trình tự thời gian (140 - 200 từ), có mở bài, thân bài nhiều đoạn, kết bài.',
          hint: 'Các hoạt động sắp xếp tuần tự: bắt đầu, tiếp theo, kết thúc.'
        }
      ],
      step2StructureInfo: {
        introTitle: '1. Mở bài',
        introDesc: 'Giới thiệu sự việc: thời gian, địa điểm, mục đích và những người tham gia.',
        bodyTitle: '2. Thân bài',
        bodyDesc: 'Thuật lại lần lượt các hoạt động theo trình tự thời gian (Trước giờ bắt đầu -> Trong buổi hoạt động: việc đầu tiên, việc tiếp theo, việc sau cùng).',
        conclusionTitle: '3. Kết bài',
        conclusionDesc: 'Nêu kết quả của sự việc và chia sẻ suy nghĩ, cảm xúc, bài học rút ra.',
        keyStandards: [
          'Thuật lại đúng trình tự thời gian diễn ra sự việc.',
          'Dùng các từ nối chuyển đoạn chỉ thời gian (đầu tiên, tiếp theo, sau đó, cuối cùng).',
          'Bộc lộ cảm xúc vui mừng, hào hứng hoặc tri ân sâu sắc.'
        ]
      },
      step3IdeaQuestions: [
        {
          id: 'q1',
          question: 'Sự việc diễn ra vào thời gian nào, ở đâu và gồm những ai tham gia?',
          hint: 'Sáng thứ Hai tại sân trường, chiều thứ Sáu tại phòng học lớp 4A1...',
          exampleAnswer: 'Sáng thứ Hai đầu tuần, trường em tổ chức lễ phát động phong trào quyên góp sách tại sân trường.'
        },
        {
          id: 'q2',
          question: 'Hoạt động bắt đầu như thế nào (công tác chuẩn bị, không khí ban đầu)?',
          hint: 'Cờ hoa phấp phới, các bạn học sinh xếp hàng ngay ngắn, tiếng trống rộn rã...',
          exampleAnswer: 'Từ sớm, các bạn đã háo hức mang theo những cuốn truyện tranh được bọc cẩn thận xếp ngay ngắn lên bàn trưng bày.'
        },
        {
          id: 'q3',
          question: 'Diễn biến chính tiếp theo diễn ra những hoạt động sôi nổi nào?',
          hint: 'Thầy cô phát biểu, đại diện các lớp trao tặng, thảo luận, văn nghệ...',
          exampleAnswer: 'Tiếp theo, cô tổng phụ trách phát biểu ý nghĩa của phong trào và đại diện từng tổ lần lượt lên ủng hộ trong tiếng vỗ tay rộn vang.'
        },
        {
          id: 'q4',
          question: 'Sự việc kết thúc ra sao và đọng lại trong em cảm xúc gì?',
          hint: 'Niềm vui, tự hào, mong muốn chia sẻ với các bạn vùng cao...',
          exampleAnswer: 'Buổi lễ khép lại trong niềm hân hoan; em cảm thấy ấm lòng vì đã góp một phần nhỏ bé giúp đỡ các bạn khó khăn.'
        }
      ],
      step4OutlineTemplate: {
        introGuide: 'Mở bài: Giới thiệu sự việc, thời gian và địa điểm.',
        introDefault: 'Sáng thứ Hai tươi đẹp, trường Tiểu học Kim Liên A tổ chức buổi lễ phát động phong trào "Nuôi heo đất giúp bạn vượt khó".',
        bodyGuide: 'Thân bài: Kể các hoạt động lần lượt: Bắt đầu -> Diễn biến chính -> Kết thúc.',
        bodyDefault: '1. Bắt đầu: Sân trường rực rỡ cờ hoa, chúng em tề tựu đông đủ với tâm trạng háo hức.\n2. Diễn biến: Sau nghi thức chào cờ, thầy Hiệu trưởng phát biểu ý nghĩa; từng chi đội hào hứng mang heo đất lên bục.\n3. Kết thúc: Cả trường cùng reo mừng khi tổng kết số tiền ủng hộ ý nghĩa.',
        conclusionGuide: 'Kết bài: Nêu cảm nghĩ và ý nghĩa của hoạt động đối với bản thân.',
        conclusionDefault: 'Buổi lễ kết thúc đã để lại trong em niềm tự hào và bài học sâu sắc về tinh thần tương thân tương ái.'
      },
      step6FeedbackRules: {
        rubricPoints: [
          'Kể đúng sự việc theo trình tự thời gian mạch lạc.',
          'Sử dụng các từ ngữ kết nối thời gian (trước tiên, tiếp đó, sau cùng).',
          'Có cảm xúc chân thành của người tham gia.'
        ],
        commonMistakes: [
          'Đảo lộn các mốc thời gian hoặc bỏ sót sự việc chính.',
          'Chưa nêu được kết quả của hoạt động.'
        ]
      },
      step7RevisionChecklist: [
        { id: 'c1', label: 'Các hoạt động đã được sắp xếp theo đúng trình tự thời gian chưa?', tip: 'Kiểm tra các từ nối: Đầu tiên -> Tiếp theo -> Sau đó -> Cuối cùng.' },
        { id: 'c2', label: 'Đã có đầy đủ mở bài, thân bài, kết bài chưa?', tip: 'Đảm bảo mỗi phần tách thành đoạn văn rõ ràng.' }
      ],
      step8AssessmentCriteria: [
        { id: 'a1', label: 'Thuật lại đúng trình tự sự việc' },
        { id: 'a2', label: 'Bố cục 3 phần rõ ràng' },
        { id: 'a3', label: 'Thể hiện cảm xúc chân thực' }
      ]
    };
  }

  // DEFAULT / FALLBACK (DÀNH CHO CÁC THỂ LOẠI KHÁC: KỂ CHUYỆN, TƯỞNG TƯỢNG, VIẾT THƯ, HƯỚNG DẪN...)
  return {
    genreKey: 'chung-lop-4',
    genreTitle: lesson?.genre || 'Tập làm văn lớp 4',
    step1KeyQuestions: [
      {
        id: 'subject',
        label: 'Đề bài yêu cầu em viết về nội dung gì?',
        placeholder: 'Xác định đối tượng hoặc sự việc trọng tâm của đề bài...',
        hint: 'Đọc kĩ các từ khóa chính trong đề bài SGK.'
      },
      {
        id: 'scope',
        label: 'Kiểu bài này thuộc thể loại nào và có yêu cầu gì đặc biệt?',
        placeholder: 'Ví dụ: Kể lại câu chuyện / Đoạn văn tưởng tượng / Viết thư / Viết hướng dẫn...',
        hint: 'Bám sát yêu cầu cần đạt của bài học.'
      }
    ],
    step2StructureInfo: {
      introTitle: '1. Mở bài / Mở đầu',
      introDesc: 'Dẫn dắt và giới thiệu đối tượng miêu tả, câu chuyện hoặc mục đích giao tiếp.',
      bodyTitle: '2. Thân bài / Triển khai',
      bodyDesc: 'Triển khai các ý chính theo trình tự logic, có chi tiết cụ thể, hình ảnh sinh động và lời văn liên kết.',
      conclusionTitle: '3. Kết bài / Kết thúc',
      conclusionDesc: 'Khẳng định lại cảm nghĩ, bài học hoặc gửi gắm tình cảm chân thành.',
      keyStandards: [
        'Đúng thể loại văn bản theo chương trình Tiếng Việt 4.',
        'Bố cục cân đối, mạch lạc.',
        'Sử dụng từ ngữ gợi cảm, giàu hình ảnh.',
        'Chính tả chuẩn xác, dấu câu rõ ràng.'
      ]
    },
    step3IdeaQuestions: [
      {
        id: 'q1',
        question: 'Điều gì khiến em quan tâm hoặc có nhiều cảm xúc nhất khi chuẩn bị viết bài này?',
        hint: 'Nhớ lại các hình ảnh, nhân vật hoặc kỉ niệm liên quan...',
        exampleAnswer: 'Em ấn tượng nhất với tình cảm chân thành và những việc làm ý nghĩa được nhắc tới.'
      },
      {
        id: 'q2',
        question: 'Những chi tiết, từ ngữ nào em dự định sẽ đưa vào bài để bài viết thêm sinh động?',
        hint: 'Từ tượng hình, từ tượng thanh, hình ảnh so sánh ngộ nghĩnh...',
        exampleAnswer: 'Em sẽ sử dụng các từ ngữ gợi cảm và hình ảnh so sánh gần gũi với tuổi học trò.'
      },
      {
        id: 'q3',
        question: 'Sau khi viết xong bài này, em muốn người đọc cảm nhận được điều gì?',
        hint: 'Niềm vui, sự xúc động, bài học bổ ích hay tình yêu thương...',
        exampleAnswer: 'Em muốn gửi gắm tình cảm yêu thương và bài học ý nghĩa đối với cuộc sống.'
      }
    ],
    step4OutlineTemplate: {
      introGuide: 'Mở bài: Giới thiệu đề tài bằng giọng văn tự nhiên.',
      introDefault: 'Mỗi câu chuyện hay kỉ niệm đều để lại trong em những rung động sâu sắc...',
      bodyGuide: 'Thân bài: Triển khai các ý chính có dẫn chứng cụ thể.',
      bodyDefault: '1. Ý chính thứ nhất: Nêu bối cảnh và chi tiết mở đầu.\n2. Ý chính thứ hai: Diễn biến cao trào hoặc miêu tả nét nổi bật.\n3. Ý chính thứ ba: Chi tiết xúc động hoặc kết quả.',
      conclusionGuide: 'Kết bài: Nêu cảm nghĩ và bài học.',
      conclusionDefault: 'Khép lại bài viết, lòng em vẫn trào dâng niềm tự hào và tình cảm chân thành.'
    },
    step6FeedbackRules: {
      rubricPoints: [
        'Bài viết đúng trọng tâm đề bài.',
        'Bố cục các phần cân đối, chuyển ý tự nhiên.',
        'Từ ngữ trong sáng, dùng dấu câu chuẩn xác.'
      ],
      commonMistakes: [
        'Chưa chú ý liên kết giữa các câu.',
        'Lặp từ nhiều lần.'
      ]
    },
    step7RevisionChecklist: [
      { id: 'c1', label: 'Bố cục bài viết đã đầy đủ và mạch lạc chưa?', tip: 'Kiểm tra mở bài, thân bài, kết bài.' },
      { id: 'c2', label: 'Đã trau chuốt từ ngữ và sửa lỗi chính tả chưa?', tip: 'Đọc to lại một lần để phát hiện lỗi.' }
    ],
    step8AssessmentCriteria: [
      { id: 'a1', label: 'Đạt yêu cầu kiểu bài của đề' },
      { id: 'a2', label: 'Diễn đạt trôi chảy, giàu cảm xúc' },
      { id: 'a3', label: 'Trình bày sạch sẽ, đúng quy cách' }
    ]
  };
}

// Client-side rule-based feedback generator for Step 6 (NO EXTERNAL AI, purely pedagogical heuristics)
export function generateRuleBasedFeedback(
  draftText: string,
  lesson: Grade4LessonItem | null
) {
  const clean = draftText.trim();
  const words = clean ? clean.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const paragraphs = clean.split(/\n+/).filter(p => p.trim().length > 0);

  const lower = clean.toLowerCase();
  const comparisonKeywords = ['như', 'tựa như', 'giống như', 'hệt như', 'chẳng khác nào'];
  const foundComparisons = comparisonKeywords.filter(k => lower.includes(k));

  const sensoryWords = [
    'xum xuê', 'sừng sững', 'mỡ màng', 'xù xì', 'gồ ghề', 'rì rào', 
    'mềm mại', 'tròn xoe', 'lanh lợi', 'êm ru', 'ấm áp', 'bồi hồi', 
    'giòn giã', 'lung linh', 'lấp lánh', 'vàng óng', 'thơm lừng'
  ];
  const foundSensory = sensoryWords.filter(s => lower.includes(s));

  const feedbackItems: { type: 'praise' | 'tip'; text: string }[] = [];

  // Word count check
  if (wordCount >= 120 && wordCount <= 220) {
    feedbackItems.push({
      type: 'praise',
      text: `Độ dài bài viết rất đạt chuẩn lớp 4 (${wordCount} từ). Bài văn đủ dung lượng để phát triển ý!`
    });
  } else if (wordCount < 120) {
    feedbackItems.push({
      type: 'tip',
      text: `Bài viết hiện có ${wordCount} từ (chưa đạt mức 120 từ). Em nên viết thêm 2-3 câu tả chi tiết hoặc kể kỉ niệm để bài văn trọn vẹn hơn nhé.`
    });
  } else {
    feedbackItems.push({
      type: 'tip',
      text: `Bài viết khá dài (${wordCount} từ). Em chú ý cô đọng câu văn, tránh lặp ý để bài viết gãy gọn hơn.`
    });
  }

  // Paragraph check
  if (paragraphs.length >= 3) {
    feedbackItems.push({
      type: 'praise',
      text: `Rất tốt! Em đã biết tách đoạn rõ ràng (${paragraphs.length} đoạn), thể hiện đủ Mở bài, Thân bài và Kết bài.`
    });
  } else {
    feedbackItems.push({
      type: 'tip',
      text: `Bài viết mới có ${paragraphs.length} đoạn. Hãy xuống dòng tách thành 3 phần: Mở bài (giới thiệu), Thân bài (chi tiết), Kết bài (cảm xúc).`
    });
  }

  // Comparison check
  if (foundComparisons.length >= 2) {
    feedbackItems.push({
      type: 'praise',
      text: `Tuyệt vời! Em đã sử dụng rất khéo các hình ảnh so sánh ("${foundComparisons.join('", "')}"), giúp câu văn sinh động như tranh vẽ.`
    });
  } else if (foundComparisons.length === 1) {
    feedbackItems.push({
      type: 'praise',
      text: `Em đã có 1 hình ảnh so sánh ("${foundComparisons[0]}"). Nếu thêm được 1 phép so sánh nữa thì bài sẽ càng cuốn hút!`
    });
  } else {
    feedbackItems.push({
      type: 'tip',
      text: `Mẹo nhỏ: Thử thêm 1 câu có từ "như" hoặc "tựa như" (Ví dụ: "lá xanh như chiếc ô che nắng") để bài văn thêm chất thơ.`
    });
  }

  // Sensory words check
  if (foundSensory.length > 0) {
    feedbackItems.push({
      type: 'praise',
      text: `Vốn từ ngữ gợi cảm phong phú! Em đã dùng các từ: ${foundSensory.slice(0, 3).join(', ')}...`
    });
  } else {
    feedbackItems.push({
      type: 'tip',
      text: `Gợi ý nâng cao: Hãy mở "Túi từ vựng" để chọn thêm các từ láy như "rì rào", "mỡ màng", "êm ru" chèn vào bài.`
    });
  }

  return {
    wordCount,
    paragraphCount: paragraphs.length,
    foundComparisons,
    foundSensory,
    feedbackItems
  };
}
