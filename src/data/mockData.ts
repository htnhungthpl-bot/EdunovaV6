import { Lesson, StudentSubmission, UserProfile, Badge } from '../types';

export const SAMPLE_DATA_NOTICE = "DỮ LIỆU MẪU - MINH HỌA CHƯƠNG TRÌNH TIẾNG VIỆT 4";

export const SAMPLE_USERS: Record<string, UserProfile> = {
  admin: {
    id: 'user-admin-01',
    name: 'Quản trị viên Hệ thống (Admin)',
    username: 'admin',
    role: 'admin',
    school: 'Phòng GD&ĐT / EDUNOVA Hub',
    className: 'Quản trị viên toàn hệ thống',
    avatar: '🛡️',
    mustChangePassword: true,
  },
  school: {
    id: 'user-school-01',
    name: 'Ban Giám Hiệu – TH Kim Liên A',
    username: 'bgh_kimlien_a',
    role: 'school',
    school: 'Trường Tiểu học Kim Liên A',
    schoolId: 'school-kimlien-a',
    className: 'Ban Giám Hiệu',
    avatar: '🏫',
  },
  teacher1: {
    id: 'teacher-thu-ha',
    name: 'Cô Nguyễn Thu Hà',
    username: 'cothuha',
    role: 'teacher',
    school: 'Trường Tiểu học Kim Liên A',
    schoolId: 'school-kimlien-a',
    className: 'Lớp 4A1',
    classId: 'class-4a1',
    avatar: '👩‍🏫',
    email: 'nguyenthuha.kimliena@gmail.com',
  },
  student1: {
    id: 'student-1792740957743-wap7',
    name: 'Nguyễn Thế Anh',
    username: 'hs_4a8_01',
    studentCode: 'HS4A8-01',
    pinCode: '1234',
    role: 'student',
    school: 'Trường Tiểu học Kim Liên A',
    schoolId: 'school-kimlien-a',
    className: 'Lớp 4A8',
    classId: 'class-4a8',
    avatar: '👦',
    starsCount: 42,
    streakDays: 4,
    completedEssays: 6,
  },
  student2: {
    id: 'student-1792740957743-aond',
    name: 'Phạm Phương Anh',
    username: 'hs_4a8_02',
    studentCode: 'HS4A8-02',
    pinCode: '1235',
    role: 'student',
    school: 'Trường Tiểu học Kim Liên A',
    schoolId: 'school-kimlien-a',
    className: 'Lớp 4A8',
    classId: 'class-4a8',
    avatar: '👧',
    starsCount: 28,
    streakDays: 2,
    completedEssays: 4,
  },
};

export const SAMPLE_LESSONS: Lesson[] = [
  {
    id: 'lesson-01',
    title: 'Miêu tả cây bóng mát: Cây bàng thân thuộc ở góc sân trường',
    category: 'mieu-ta-cay-coi',
    categoryName: 'Miêu tả cây cối',
    curriculum: 'ket-noi-tri-thuc',
    curriculumName: 'Bộ sách Kết nối tri thức',
    difficulty: 'Cơ bản',
    estimatedTime: '25-35 phút',
    targetWordCount: { min: 140, max: 200 },
    shortDescription: 'Tập quan sát sự thay đổi màu sắc lá bàng qua 4 mùa và tán cây che mát cho học sinh.',
    prompt: 'Em hãy viết một bài văn ngắn (khoảng 150 - 200 từ) miêu tả cây bàng ở góc sân trường gắn bó với tuổi học trò của em.',
    outline: {
      intro: [
        'Mở bài gián tiếp: Giới thiệu sân trường giờ ra chơi hoặc kỷ niệm góc sân.',
        'Mở bài trực tiếp: Giới thiệu trực tiếp cây bàng đứng sừng sững bên cạnh lớp học.'
      ],
      body: [
        'Tả bao quát: Cây bàng nhìn từ xa như chiếc ô khổng lồ màu xanh thẫm.',
        'Tả chi tiết: Gốc cây to, rễ nổi gồ ghề như những chú trăn; thân cây xù xì bạc phếch.',
        'Tán lá theo mùa: Mùa xuân lá non mỡ màng, mùa hè xanh mướt che mát, mùa đông lá đỏ au rơi rụng.',
        'Kỷ niệm: Giờ ra chơi các bạn ngồi đọc sách, nhặt quả bàng chín vàng thơm lừng.'
      ],
      conclusion: [
        'Tình cảm của em đối với cây bàng.',
        'Lời hứa chăm sóc, bảo vệ cây xanh của trường em.'
      ]
    },
    suggestedVocab: {
      words: ['xum xuê', 'sừng sững', 'gồ ghề', 'mỡ màng', 'xanh ngắt', 'rì rào', 'đỏ au', 'râm ran'],
      rhetoric: [
        'như một chiếc ô khổng lồ che chở nắng mưa',
        'những chiếc rễ trồi lên mặt đất như đàn trăn con đang uốn lượn',
        'từng đợt gió khẽ luồn qua tán lá như lời thì thầm của người bạn hiền'
      ]
    },
    sampleEssay: {
      title: 'Cây bàng thân thương nơi góc sân trường Kim Liên A',
      content: `Mỗi giờ ra chơi, sân trường em lại rộn rã tiếng cười đùa. Nhưng nơi em thích nhất chính là góc sân rợp bóng mát dưới tán cây bàng già.

Nhìn từ xa, cây bàng như một chiếc dù khổng lồ màu ngọc bích tỏa bóng dịu dàng. Thân cây to bằng một vòng tay em ôm, lớp vỏ nâu xám xù xì mang dấu vết của năm tháng. Rễ cây trồi lên mặt đất uốn lượn như những chú trăn con đang say giấc ngủ. Những cành cây vươn dài chia thành nhiều tầng lớp trật tự. Mùa hè đến, lá bàng xanh mỡ màng, dày dặn, che mát cho chúng em những buổi trưa oi ả. Quả bàng chín vàng ươm thơm nhè nhẹ, rơi lộc cộc trên thảm cỏ xanh.

Em yêu quý cây bàng sân trường như một người bạn tri kỷ. Mỗi ngày đến trường, được nghe tiếng lá reo rì rào trong gió, em lại thấy thêm yêu mến mái trường thân yêu.`,
      highlights: [
        { phrase: 'như một chiếc dù khổng lồ màu ngọc bích', note: 'Biện pháp so sánh sinh động' },
        { phrase: 'uốn lượn như những chú trăn con', note: 'So sánh hình ảnh ngộ nghĩnh' },
        { phrase: 'xanh mỡ màng, dày dặn', note: 'Từ gợi tả màu sắc đầy sức sống' },
        { phrase: 'như một người bạn tri kỷ', note: 'Nhân hóa, thể hiện tình cảm gắn bó sâu sắc' }
      ]
    },
    sampleTag: true,
  },
  {
    id: 'lesson-02',
    title: 'Miêu tả con vật nuôi: Chú mèo mướp ngộ nghĩnh nhà em',
    category: 'mieu-ta-con-vat',
    categoryName: 'Miêu tả con vật',
    curriculum: 'canh-dieu',
    curriculumName: 'Bộ sách Cánh diều',
    difficulty: 'Cơ bản',
    estimatedTime: '20-30 phút',
    targetWordCount: { min: 130, max: 180 },
    shortDescription: 'Luyện tập quan sát hình dáng bộ lông, đôi mắt ngọc bích và thói quen rình chuột đáng yêu của chú mèo.',
    prompt: 'Hãy tả chú mèo mà em yêu quý, nêu bật ngoại hình xinh xắn và hoạt động bắt chuột lanh lợi của chú.',
    outline: {
      intro: [
        'Giới thiệu chú mèo (Tên là Miu/Mướp, do ai tặng hoặc nuôi từ khi nào).'
      ],
      body: [
        'Hình dáng: Bộ lông sọc vằn mềm như nhung, bốn chân đi êm ru.',
        'Khuôn mặt: Đôi mắt tròn xoe xanh như hai hòn bi ve, ria mép vểnh lên kiêu hãnh.',
        'Hoạt động: Nằm sưởi nắng lim dim ngoài hiên, khi rình chuột thì kiên nhẫn, lao vụt như một tia chớp.'
      ],
      conclusion: [
        'Tình cảm yêu mến của em dành cho chú mèo, xem chú như một thành viên trong nhà.'
      ]
    },
    suggestedVocab: {
      words: ['mềm mại', 'óng ả', 'tròn xoe', 'lanh lợi', 'êm ru', 'nhẹ nhàng', 'ngoan ngoãn', 'linh hoạt'],
      rhetoric: [
        'đôi mắt xanh biếc tựa như hai hòn bi ve lấp lánh',
        'bước đi nhẹ nhàng như đang lướt trên đệm mút bông',
        'lao vụt như một tia chớp chộp gọn chú chuột láu cá'
      ]
    },
    sampleEssay: {
      title: 'Chú mèo Miu đáng yêu của gia đình em',
      content: `Vào ngày sinh nhật lần thứ chín, bố đã tặng em một chú mèo mướp rất dễ thương. Em đặt tên cho chú là Miu Miu.

Miu khoác trên mình bộ lông sọc vàng trắng mềm mượt như tơ lụa. Đầu chú tròn như một trái cam nhỏ, hai tai hình tam giác lúc nào cũng vểnh lên nghe ngóng. Đôi mắt Miu xanh biếc và tròn xoe như hai hòn bi ve trong veo dưới ánh mặt trời. Bốn chân chú có đệm thịt màu hồng đào mềm mại, giúp chú bước đi êm ru không hề phát ra tiếng động. Khi rình chuột, Miu thu mình bất động rồi phóng vút tới như mũi tên, khiến con mồi không kịp tẩu thoát.

Miu là người bạn nhỏ thân thiết luôn quấn quýt bên em mỗi khi đi học về. Em hứa sẽ chăm sóc chú thật cẩn thận để Miu luôn khỏe mạnh.`,
      highlights: [
        { phrase: 'mềm mượt như tơ lụa', note: 'So sánh xúc giác mượt mà' },
        { phrase: 'tròn xoe như hai hòn bi ve', note: 'So sánh hình ảnh quen thuộc' },
        { phrase: 'phóng vút tới như mũi tên', note: 'Tả chuyển động nhanh nhẹn' }
      ]
    },
    sampleTag: true,
  },
  {
    id: 'lesson-03',
    title: 'Viết thư thăm hỏi: Gửi người thân ở xa nhân dịp năm mới',
    category: 'viet-thu',
    categoryName: 'Viết thư',
    curriculum: 'chan-troi-sang-tao',
    curriculumName: 'Bộ sách Chân trời sáng tạo',
    difficulty: 'Trung bình',
    estimatedTime: '25-35 phút',
    targetWordCount: { min: 140, max: 210 },
    shortDescription: 'Rèn luyện bố cục bức thư chuẩn mực: địa điểm, ngày tháng, lời xưng hô, thăm hỏi sức khỏe và kể chuyện học tập.',
    prompt: 'Nhân dịp Tết đến xuân về, hãy viết một bức thư gửi cho ông bà hoặc người thân ở xa để thăm hỏi sức khỏe và chia sẻ kết quả học tập của em.',
    outline: {
      intro: [
        'Dòng đầu thư: Địa điểm và thời gian (Hà Nội, ngày... tháng... năm...)',
        'Lời chào xưng hô kính cẩn (Ông bà kính yêu, Bác kính mến...)'
      ],
      body: [
        'Lý do viết thư: Lâu rồi chưa được về thăm, nhân dịp xuân mới.',
        'Thăm hỏi sức khỏe: Dạo này thời tiết lạnh ông bà có đau khớp không?',
        'Kể chuyện bản thân: Kết quả học kỳ 1, được khen ngợi môn Tiếng Việt, giữ chức lớp phó.'
      ],
      conclusion: [
        'Lời chúc tết và lời hứa: Chúc ông bà sống lâu trăm tuổi, hứa hè sẽ về quê thăm.',
        'Chữ ký và họ tên cháu.'
      ]
    },
    suggestedVocab: {
      words: ['kính yêu', 'dạt dào', 'bồi hồi', 'ấm áp', 'khoan dung', 'chăm ngoan', 'biết ơn'],
      rhetoric: [
        'mỗi khi cơn gió bấc tràn về, cháu lại nhớ hơi ấm bàn tay ông bà',
        'lời dặn của ông như ngọn hải đăng soi sáng con đường học tập của cháu'
      ]
    },
    sampleEssay: {
      title: 'Bức thư gửi ông bà ngoại nơi quê hương Nam Định',
      content: `Hà Nội, ngày 10 tháng 1 năm 2026

Ông bà ngoại kính yêu của cháu!

Những ngày giáp Tết, trời Hà Nội se lạnh, nhìn những nụ đào phai hé nở bên khung cửa sổ, cháu lại bồi hồi nhớ ông bà da diết. Dạo này chân bà còn bị đau nhức khi trở trời không ạ? Ông vẫn giữ thói quen tưới vườn phong lan vào mỗi buổi sáng sớm chứ ạ?

Cháu xin khoe với ông bà một tin vui: Học kỳ vừa rồi cháu đạt danh hiệu Học sinh Xuất sắc, bài thi môn Tiếng Việt đạt điểm 10 trọn vẹn nhờ cô giáo chỉ dạy tận tình. Bố mẹ cháu vẫn khỏe mạnh và đều đặn công tác. Cả nhà cháu đang đếm từng ngày để được về quê quây quần bên nồi bánh chưng xanh ấm cúng cùng ông bà.

Cháu xin dừng bút tại đây. Cháu kính chúc ông bà năm mới an khang thịnh vượng, sống lâu trăm tuổi cùng con cháu.

Cháu gái ngoan của ông bà
Nguyễn Mai Anh`,
      highlights: [
        { phrase: 'Hà Nội, ngày 10 tháng 1...', note: 'Địa điểm, ngày tháng chuẩn quy cách' },
        { phrase: 'Ông bà ngoại kính yêu của cháu!', note: 'Lời chào xưng hô lễ phép, ấm áp' },
        { phrase: 'Cháu xin khoe với ông bà một tin vui', note: 'Chuyển đoạn tự nhiên, tình cảm gia đình' }
      ]
    },
    sampleTag: true,
  },
  {
    id: 'lesson-04',
    title: 'Thuật lại sự việc: Ngày hội khai giảng rộn ràng cờ hoa',
    category: 'thuat-lai-su-viec',
    categoryName: 'Thuật lại sự việc',
    curriculum: 'ket-noi-tri-thuc',
    curriculumName: 'Bộ sách Kết nối tri thức',
    difficulty: 'Trung bình',
    estimatedTime: '30-40 phút',
    targetWordCount: { min: 150, max: 220 },
    shortDescription: 'Thuật lại các hoạt động theo trình tự thời gian: chuẩn bị, lễ chào cờ, tiếng trống khai trường giòn giã.',
    prompt: 'Hãy thuật lại không khí tưng bừng của buổi lễ khai giảng năm học mới tại trường tiểu học Kim Liên A mà em nhớ nhất.',
    outline: {
      intro: [
        'Thời gian, địa điểm diễn ra buổi lễ (Sáng mùng 5 tháng 9 rực rỡ nắng vàng).'
      ],
      body: [
        'Trước buổi lễ: Sân trường rợp bóng cờ hoa, các bạn học sinh khăn quàng đỏ thắm.',
        'Lễ khai mạc: Nghi thức chào cờ trang nghiêm, đón các em học sinh lớp Một.',
        'Điểm nhấn: Thầy Hiệu trưởng đọc diễn văn và tiếng trống trường giòn giã vang lên.'
      ],
      conclusion: [
        'Cảm xúc lắng đọng: Hồi hộp, tự hào và quyết tâm bước vào năm học mới với nhiều thành tích tốt.'
      ]
    },
    suggestedVocab: {
      words: ['rộn ràng', 'nô nức', 'trang nghiêm', 'giòn giã', 'bát ngát', 'phấp phới', 'ngập tràn'],
      rhetoric: [
        'sân trường như một vườn hoa rực rỡ dưới nắng thu êm ả',
        'tiếng trống trường "Tùng! Tùng! Tùng!" ngân vang như giục giã bước chân em tiến về phía trước'
      ]
    },
    sampleEssay: {
      title: 'Tiếng trống khai trường rộn rã mùa thu',
      content: `Sáng ngày mùng 5 tháng 9, bầu trời thu trong xanh không một gợn mây. Em cùng các bạn hân hoan bước vào sân trường Tiểu học Kim Liên A để dự lễ khai giảng.

Từ sáng sớm, cổng trường đã rợp bóng cờ hoa phấp phới. Trên sân, hàng trăm bạn học sinh xúng xính trong bộ đồng phục trắng tinh tươm, chiếc khăn quàng đỏ thắm bay trên vai. Mở đầu buổi lễ là lễ đón các em nhỏ lớp Một với ánh mắt tròn xoe bỡ ngỡ. Sau nghi thức chào cờ trang nghiêm, giây phút thiêng liêng nhất đã đến khi thầy Hiệu trưởng tiến lên bục, gióng lên hồi trống khai trường. Tiếng trống "Tùng! Tùng! Tùng!" trầm hùng, giòn giã vang vọng khắp không gian, như đánh thức những ước mơ trong sáng của tuổi thơ.

Buổi lễ kết thúc trong tiếng vỗ tay rộn rã. Lòng em trào dâng niềm tự hào và quyết tâm đạt thật nhiều hoa điểm mười trong năm học mới này.`,
      highlights: [
        { phrase: 'rợp bóng cờ hoa phấp phới', note: 'Từ láy gợi hình ảnh không khí tươi vui' },
        { phrase: 'Tiếng trống "Tùng! Tùng! Tùng!" trầm hùng, giòn giã', note: 'Từ tượng thanh sinh động' },
        { phrase: 'như đánh thức những ước mơ trong sáng', note: 'Biện pháp so sánh gợi cảm' }
      ]
    },
    sampleTag: true,
  },
  {
    id: 'lesson-05',
    title: 'Đoạn văn cảm nghĩ: Bày tỏ tình cảm đối với bài thơ "Hạt gạo làng ta"',
    category: 'cam-nghi-tinh-cam',
    categoryName: 'Cảm nghĩ - Tình cảm',
    curriculum: 'canh-dieu',
    curriculumName: 'Bộ sách Cánh diều',
    difficulty: 'Thử thách',
    estimatedTime: '20-30 phút',
    targetWordCount: { min: 120, max: 170 },
    shortDescription: 'Tập viết đoạn văn thể hiện sự trân trọng giọt mồ hôi của người nông dân và hạt gạo quê hương.',
    prompt: 'Viết một đoạn văn ngắn nêu cảm nghĩ của em sau khi học bài thơ "Hạt gạo làng ta" của nhà thơ Trần Đăng Khoa.',
    outline: {
      intro: [
        'Câu mở đoạn: Giới thiệu bài thơ "Hạt gạo làng ta" và cảm nhận chung sâu sắc.'
      ],
      body: [
        'Cảm nhận về hình ảnh: Hạt gạo mang vị phù sa ngọt ngào, hương sen thơm ngát.',
        'Cảm nhận về sự vất vả: Mẹ lội cấy lúa giữa trưa hè "những trưa tháng sáu, nước như ai nấu, chết cả cá cờ".'
      ],
      conclusion: [
        'Bài học cho bản thân: Luôn biết ơn người nông dân, không lãng phí thức ăn.'
      ]
    },
    suggestedVocab: {
      words: ['nghẹn ngào', 'bồi hồi', 'biết ơn', 'vất vả', 'ngọt bùi', 'trân quý', 'chắt chiu'],
      rhetoric: [
        'từng hạt gạo dẻo thơm kết tinh từ bao giọt mồ hôi mặn mòi',
        'mỗi bát cơm như chứa chan cả tấm lòng thơm thảo của mẹ cha'
      ]
    },
    sampleEssay: {
      title: 'Cảm nghĩ về hạt ngọc trời quê hương',
      content: `Đọc bài thơ "Hạt gạo làng ta" của nhà thơ Trần Đăng Khoa, trong lòng em trào dâng niềm xúc động và biết ơn vô hạn. Tác giả đã giúp em hiểu rằng đằng sau mỗi hạt gạo dẻo thơm không chỉ là vị phù sa sông Kinh Thầy ngọt lịm, mà còn là biết bao giọt mồ hôi nhọc nhằn của các bác nông dân. Hình ảnh "Những trưa tháng sáu/ Nước như ai nấu/ Chết cả cá cờ/ Cua ngoi lên bờ/ Mẹ em xuống cấy" khiến em rưng rưng nước mắt vì thương người mẹ tần tảo. Nhờ bài thơ, em thêm trân quý từng hạt cơm trên đĩa và tự nhắc nhở bản thân không bao giờ được lãng phí thức ăn.`,
      highlights: [
        { phrase: 'trong lòng em trào dâng niềm xúc động', note: 'Mở đoạn trực diện, cảm xúc chân thực' },
        { phrase: 'khiến em rưng rưng nước mắt vì thương người mẹ tần tảo', note: 'Bộc lộ tình cảm sâu sắc của lứa tuổi học sinh' },
        { phrase: 'tự nhắc nhở bản thân không bao giờ được lãng phí', note: 'Rút ra bài học hành động thiết thực' }
      ]
    },
    sampleTag: true,
  }
];

// PRODUCTION BASELINE: Fake student submissions removed. Submissions are loaded persistently from /api/submissions
export const SAMPLE_SUBMISSIONS: StudentSubmission[] = [];

export const SAMPLE_BADGES: Badge[] = [
  {
    id: 'badge-01',
    title: 'Họa sĩ ngôn từ',
    description: 'Sử dụng thành thạo từ 10 hình ảnh so sánh và nhân hóa trong các bài văn.',
    icon: '🎨',
    isUnlocked: true,
    unlockedAt: '05/10/2026',
    category: 'creativity'
  },
  {
    id: 'badge-02',
    title: 'Cây bút chăm chỉ',
    description: 'Hoàn thành bài tập viết 5 ngày liên tiếp cùng Trợ lý EDUNOVA.',
    icon: '✍️',
    isUnlocked: true,
    unlockedAt: '08/10/2026',
    category: 'effort'
  },
  {
    id: 'badge-03',
    title: 'Bông hoa điểm 10',
    description: 'Được cô giáo chủ nhiệm chấm bài đạt điểm từ 9.5 trở lên.',
    icon: '🌸',
    isUnlocked: true,
    unlockedAt: '09/10/2026',
    category: 'mastery'
  },
  {
    id: 'badge-04',
    title: 'Nhà thám hiểm thiên nhiên',
    description: 'Hoàn thành xuất sắc 3 bài văn miêu tả cây cối và con vật.',
    icon: '🌿',
    isUnlocked: false,
    category: 'mastery'
  },
  {
    id: 'badge-05',
    title: 'Thần tốc miêu tả',
    description: 'Hoàn thiện dàn ý và bài viết đạt chuẩn trong vòng 25 phút.',
    icon: '⚡',
    isUnlocked: false,
    category: 'effort'
  },
  {
    id: 'badge-06',
    title: 'Trái tim ấm áp',
    description: 'Viết bức thư thăm hỏi giàu tình cảm được cả lớp bình chọn.',
    icon: '💌',
    isUnlocked: false,
    category: 'creativity'
  }
];

export const VOCABULARY_TOOLBOX = {
  tuLay: [
    { word: 'rì rào', hint: 'Tiếng lá cây lay động trong gió' },
    { word: 'râm ran', hint: 'Âm thanh tiếng ve kêu mùa hè' },
    { word: 'sừng sững', hint: 'Dáng đứng to lớn, vững chãi' },
    { word: 'gồ ghề', hint: 'Mặt đất hoặc rễ cây nhấp nhô' },
    { word: 'mỡ màng', hint: 'Vẻ tươi tốt, bóng bẩy của lá non' },
    { word: 'lấp lánh', hint: 'Ánh sáng phản chiếu lung linh' },
    { word: 'ngoan ngoãn', hint: 'Hiền lành, vâng lời' },
    { word: 'lanh lợi', hint: 'Nhanh nhẹn, thông minh' },
    { word: 'lom khom', hint: 'Dáng đứng hơi còng xuống khi làm việc' },
    { word: 'thầm thì', hint: 'Nói nhỏ nhẹ như tâm sự' },
  ],
  phepSoSanh: [
    { text: 'như chiếc ô xanh khổng lồ', hint: 'Tả tán cây bàng, phượng, đa' },
    { text: 'như hai hòn bi ve trong veo', hint: 'Tả đôi mắt của chú mèo, chú chó' },
    { text: 'như đàn trăn con uốn lượn', hint: 'Tả rễ cây cổ thụ trồi lên mặt đất' },
    { text: 'như ngọn hải đăng soi sáng', hint: 'Tả lời dạy bảo của thầy cô, cha mẹ' },
    { text: 'êm như nhung lụa', hint: 'Tả bộ lông của mèo mướp, thỏ trắng' },
    { text: 'nhanh như một tia chớp', hint: 'Tả chuyển động chộp chuột của mèo' },
    { text: 'như những nốt nhạc vui trên khuông nhạc', hint: 'Tả chim sẻ đậu trên cành' },
  ],
  moBaiGoiY: [
    { type: 'Gián tiếp', text: 'Tuổi thơ của mỗi người học trò đều gắn liền với một góc thân thương dưới mái trường...' },
    { type: 'Trực tiếp', text: 'Ngay giữa khoảng sân trường rực nắng, cây bàng già đã đứng đó từ bao giờ...' },
  ]
};
