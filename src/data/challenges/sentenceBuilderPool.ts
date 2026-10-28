import { SentenceBuilderRound } from '../../types/challenges';

export const SENTENCE_BUILDER_ROUNDS: SentenceBuilderRound[] = [
  {
    id: 'sb-1',
    roundNumber: 1,
    title: 'Miêu tả mầm non mùa xuân',
    theme: 'Cây cối & Thiên nhiên',
    pieces: [
      'Vào mùa xuân,',
      'những mầm non biếc',
      'nhú lên',
      'như những ngọn nến xanh.'
    ],
    validSentences: [
      'Vào mùa xuân, những mầm non biếc nhú lên như những ngọn nến xanh.',
      'Những mầm non biếc nhú lên như những ngọn nến xanh vào mùa xuân.',
      'Vào mùa xuân những mầm non biếc nhú lên như những ngọn nến xanh'
    ],
    hint: 'Em hãy đặt trạng ngữ chỉ thời gian "Vào mùa xuân," ở đầu câu, tiếp theo là chủ ngữ chỉ sự vật, hành động rồi đến hình ảnh so sánh nhé!',
    explanation: 'Câu văn hoàn chỉnh và rất sinh động: Có trạng ngữ thời gian mở đầu ("Vào mùa xuân,"), chủ ngữ "những mầm non biếc" và vị ngữ giàu hình ảnh so sánh "nhú lên như những ngọn nến xanh".',
    grammaticalTip: 'Cấu trúc câu: Trạng ngữ thời gian + Chủ ngữ + Vị ngữ (có so sánh).'
  },
  {
    id: 'sb-2',
    roundNumber: 2,
    title: 'Miêu tả chú mèo sưởi nắng',
    theme: 'Con vật quen thuộc',
    pieces: [
      'Chú mèo mướp',
      'nằm cuộn tròn',
      'sưởi nắng',
      'bên hiên nhà ấm áp.'
    ],
    validSentences: [
      'Chú mèo mướp nằm cuộn tròn sưởi nắng bên hiên nhà ấm áp.',
      'Bên hiên nhà ấm áp, chú mèo mướp nằm cuộn tròn sưởi nắng.'
    ],
    hint: 'Chủ ngữ thực hiện hành động là ai nhỉ? Đúng rồi, là "Chú mèo mướp". Sau đó hãy ghép dáng điệu nằm, hành động sưởi nắng và địa điểm nhé!',
    explanation: 'Rất chính xác! Câu văn miêu tả rõ nét chú mèo với dáng điệu lười biếng đáng yêu ("nằm cuộn tròn"), hành động ("sưởi nắng") và không gian ấm áp bên hiên nhà.',
    grammaticalTip: 'Cấu trúc câu: Chủ ngữ + Cụm vị ngữ diễn tả tư thế, hành động và nơi chốn.'
  },
  {
    id: 'sb-3',
    roundNumber: 3,
    title: 'Miêu tả dòng sông quê hương',
    theme: 'Cảnh đẹp quê hương',
    pieces: [
      'Dòng sông quê em',
      'uốn lượn hiền hòa',
      'như một dải lụa mềm',
      'vắt qua cánh đồng.'
    ],
    validSentences: [
      'Dòng sông quê em uốn lượn hiền hòa như một dải lụa mềm vắt qua cánh đồng.',
      'Vắt qua cánh đồng, dòng sông quê em uốn lượn hiền hòa như một dải lụa mềm.'
    ],
    hint: 'Bắt đầu bằng sự vật trung tâm: "Dòng sông quê em", sau đó miêu tả vẻ êm ả và hình ảnh so sánh với dải lụa mềm mại vắt qua đồng ruộng.',
    explanation: 'Tuyệt vời! Đây là một câu văn so sánh mẫu mực của phân môn Luyện từ và câu lớp 4, giúp dòng sông quê hương hiện lên mềm mại và đầy chất thơ.',
    grammaticalTip: 'Nghệ thuật so sánh: Dòng sông (Sự vật 1) uốn lượn + như (Từ so sánh) + một dải lụa mềm (Sự vật 2).'
  },
  {
    id: 'sb-4',
    roundNumber: 4,
    title: 'Khung cảnh giờ ra chơi náo nhiệt',
    theme: 'Mái trường & Bạn bè',
    pieces: [
      'Giờ ra chơi,',
      'sân trường',
      'rộn rã',
      'tiếng cười nói',
      'của các bạn học sinh.'
    ],
    validSentences: [
      'Giờ ra chơi, sân trường rộn rã tiếng cười nói của các bạn học sinh.',
      'Sân trường rộn rã tiếng cười nói của các bạn học sinh trong giờ ra chơi.',
      'Giờ ra chơi sân trường rộn rã tiếng cười nói của các bạn học sinh'
    ],
    hint: 'Đặt mốc thời gian "Giờ ra chơi," ở đầu, tiếp theo là nơi chốn "sân trường" rồi đến âm thanh nhộn nhịp của các bạn học sinh nhé!',
    explanation: 'Rất chuẩn! Trạng ngữ thời gian ở đầu câu giúp tạo bối cảnh, từ láy "rộn rã" làm nổi bật không khí vui tươi, hồn nhiên nơi trường lớp.',
    grammaticalTip: 'Trạng ngữ thời gian + Chủ ngữ (Sân trường) + Vị ngữ miêu tả âm thanh nhộn nhịp.'
  },
  {
    id: 'sb-5',
    roundNumber: 5,
    title: 'Chị gió xuân đánh thức nụ hoa',
    theme: 'Nhân hóa thiên nhiên',
    pieces: [
      'Chị gió xuân',
      'nhẹ nhàng',
      'lay động',
      'từng cánh hoa mai vàng',
      'đang hé nở.'
    ],
    validSentences: [
      'Chị gió xuân nhẹ nhàng lay động từng cánh hoa mai vàng đang hé nở.',
      'Nhẹ nhàng, chị gió xuân lay động từng cánh hoa mai vàng đang hé nở.'
    ],
    hint: 'Chủ ngữ được nhân hóa là "Chị gió xuân", tiếp đến là cách thức "nhẹ nhàng", động từ "lay động" và đối tượng là những cánh hoa mai vàng.',
    explanation: 'Xuất sắc! Biện pháp nhân hóa gọi gió là "Chị" kết hợp động từ "lay động nhẹ nhàng" khiến thiên nhiên mùa xuân trở nên ấm áp và có tâm hồn.',
    grammaticalTip: 'Biện pháp nhân hóa: Gọi sự vật (Gió xuân) bằng từ ngữ chỉ người (Chị) và gán cho hành động âu yếm.'
  },
  {
    id: 'sb-6',
    roundNumber: 6,
    title: 'Tình cảm với trang vở học trò',
    theme: 'Học tập & Rèn luyện',
    pieces: [
      'Em luôn tự hào',
      'và nâng niu',
      'từng trang vở ô ly',
      'sạch đẹp của mình.'
    ],
    validSentences: [
      'Em luôn tự hào và nâng niu từng trang vở ô ly sạch đẹp của mình.',
      'Từng trang vở ô ly sạch đẹp của mình luôn được em tự hào và nâng niu.'
    ],
    hint: 'Bắt đầu bằng cảm xúc của em: "Em luôn tự hào", kết nối thái độ "và nâng niu", rồi đến đồ vật thân yêu là "từng trang vở ô ly sạch đẹp của mình".',
    explanation: 'Câu văn thật đẹp và giàu ý nghĩa! Thể hiện tình cảm trân trọng, ý thức giữ gìn sách vở cẩn thận, đúng tinh thần học sinh lớp 4 chăm ngoan.',
    grammaticalTip: 'Chủ ngữ (Em) + Cụm vị ngữ chỉ cảm xúc và hành vi nâng niu đồ dùng học tập.'
  },
  {
    id: 'sb-7',
    roundNumber: 7,
    title: 'Chú gà trống đánh thức xóm làng',
    theme: 'Con vật quen thuộc',
    pieces: [
      'Mỗi sớm mai thức dậy,',
      'chú gà trống choai',
      'lại vỗ cánh phành phạch',
      'cất tiếng gáy vang.'
    ],
    validSentences: [
      'Mỗi sớm mai thức dậy, chú gà trống choai lại vỗ cánh phành phạch cất tiếng gáy vang.',
      'Chú gà trống choai lại vỗ cánh phành phạch cất tiếng gáy vang mỗi sớm mai thức dậy.'
    ],
    hint: 'Bắt đầu bằng trạng ngữ thời gian "Mỗi sớm mai thức dậy,", sau đó đến chú gà trống cùng hành động vỗ cánh và cất tiếng gáy dõng dạc.',
    explanation: 'Câu văn giàu âm thanh và hình ảnh: chú gà trống trở thành "chiếc đồng hồ báo thức" sống động, thân thuộc của làng quê.',
    grammaticalTip: 'Trạng ngữ thời gian + Chủ ngữ + Hai vị ngữ liên tiếp miêu tả hành động.'
  },
  {
    id: 'sb-8',
    roundNumber: 8,
    title: 'Bác bàng già che bóng mát sân trường',
    theme: 'Mái trường & Cây cối',
    pieces: [
      'Giữa sân trường rộng rãi,',
      'bác bàng già',
      'xòe tán lá xanh um',
      'như một chiếc ô khổng lồ.'
    ],
    validSentences: [
      'Giữa sân trường rộng rãi, bác bàng già xòe tán lá xanh um như một chiếc ô khổng lồ.',
      'Bác bàng già xòe tán lá xanh um như một chiếc ô khổng lồ giữa sân trường rộng rãi.'
    ],
    hint: 'Bắt đầu bằng nơi chốn "Giữa sân trường rộng rãi,", sau đó là chủ ngữ nhân hóa "bác bàng già" cùng tán lá so sánh với chiếc ô.',
    explanation: 'Biện pháp nhân hóa gọi cây bàng là "bác" kết hợp so sánh tán lá như "chiếc ô khổng lồ" gợi vẻ che chở, gắn bó thân thương.',
    grammaticalTip: 'Trạng ngữ nơi chốn + Nhân hóa (bác bàng) + So sánh (như một chiếc ô).'
  },
  {
    id: 'sb-9',
    roundNumber: 9,
    title: 'Cánh đồng lúa chín mùa gặt',
    theme: 'Cảnh đẹp quê hương',
    pieces: [
      'Dưới ánh nắng vàng rực rỡ,',
      'cánh đồng lúa chín',
      'nhấp nhô từng đợt sóng vàng',
      'chạy tít tắp đến chân trời.'
    ],
    validSentences: [
      'Dưới ánh nắng vàng rực rỡ, cánh đồng lúa chín nhấp nhô từng đợt sóng vàng chạy tít tắp đến chân trời.',
      'Cánh đồng lúa chín nhấp nhô từng đợt sóng vàng chạy tít tắp đến chân trời dưới ánh nắng vàng rực rỡ.'
    ],
    hint: 'Trạng ngữ ánh sáng ở đầu câu, sau đó là cánh đồng lúa chín và hình ảnh chuyển động nhấp nhô đến tận chân trời.',
    explanation: 'Hình ảnh ẩn dụ "đợt sóng vàng" miêu tả những bông lúa trĩu hạt dập dờn theo gió, gợi mùa màng bội thu, no ấm.',
    grammaticalTip: 'Trạng ngữ thời gian/không gian + Chủ ngữ + Cụm vị ngữ mở rộng giàu tính tạo hình.'
  },
  {
    id: 'sb-10',
    roundNumber: 10,
    title: 'Mẹ hiền bên ngọn đèn khuya',
    theme: 'Gia đình yêu thương',
    pieces: [
      'Bên ngọn đèn bàn ấm áp,',
      'mẹ ân cần',
      'chỉ bảo cho em',
      'từng bài toán khó.'
    ],
    validSentences: [
      'Bên ngọn đèn bàn ấm áp, mẹ ân cần chỉ bảo cho em từng bài toán khó.',
      'Mẹ ân cần chỉ bảo cho em từng bài toán khó bên ngọn đèn bàn ấm áp.'
    ],
    hint: 'Bắt đầu với không gian "Bên ngọn đèn bàn ấm áp,", sau đó là người mẹ với cử chỉ ân cần kèm hành động giảng bài cho em.',
    explanation: 'Câu văn chứa chan tình mẫu tử: ngọn đèn ấm áp soi rọi tấm lòng bao la, kiên nhẫn dạy dỗ con nên người.',
    grammaticalTip: 'Trạng ngữ nơi chốn + Chủ ngữ + Vị ngữ kết hợp từ ngữ chỉ thái độ (ân cần).'
  },
  {
    id: 'sb-11',
    roundNumber: 11,
    title: 'Cơn mưa rào mùa hạ',
    theme: 'Thiên nhiên & Thời tiết',
    pieces: [
      'Sau tiếng sấm rền vang,',
      'những hạt mưa rào rạt',
      'đổ xuống',
      'tắm mát cho vạn vật.'
    ],
    validSentences: [
      'Sau tiếng sấm rền vang, những hạt mưa rào rạt đổ xuống tắm mát cho vạn vật.',
      'Những hạt mưa rào rạt đổ xuống tắm mát cho vạn vật sau tiếng sấm rền vang.'
    ],
    hint: 'Dấu hiệu báo cơn mưa "Sau tiếng sấm rền vang," đặt ở đầu, theo sau là những hạt mưa rơi xối xả làm mát cỏ cây.',
    explanation: 'Từ tượng thanh "rào rạt" diễn tả cơn mưa hạ đến thật nhanh, đem lại sự sống tươi mới cho muôn loài cây cỏ.',
    grammaticalTip: 'Trạng ngữ thời gian diễn tiến + Chủ ngữ + Vị ngữ mục đích (tắm mát cho vạn vật).'
  },
  {
    id: 'sb-12',
    roundNumber: 12,
    title: 'Tình bạn thân thiết cùng tiến',
    theme: 'Bạn bè & Trường lớp',
    pieces: [
      'Trong góc thư viện yên tĩnh,',
      'hai bạn nhỏ',
      'say sưa đọc sách',
      'và chia sẻ những điều bổ ích.'
    ],
    validSentences: [
      'Trong góc thư viện yên tĩnh, hai bạn nhỏ say sưa đọc sách và chia sẻ những điều bổ ích.',
      'Hai bạn nhỏ say sưa đọc sách và chia sẻ những điều bổ ích trong góc thư viện yên tĩnh.'
    ],
    hint: 'Đặt địa điểm "Trong góc thư viện yên tĩnh," lên trước, rồi đến chủ thể "hai bạn nhỏ" cùng hoạt động học tập tích cực.',
    explanation: 'Câu văn toát lên vẻ đẹp trong sáng của tình bạn học trò: cùng nhau khám phá tri thức và chia sẻ niềm say mê đọc sách.',
    grammaticalTip: 'Trạng ngữ nơi chốn + Chủ ngữ + Hai vị ngữ đồng chức năng liên kết bằng từ "và".'
  },
  {
    id: 'sb-13',
    roundNumber: 13,
    title: 'Đêm trăng rằm Trung thu',
    theme: 'Lễ hội & Tuổi thơ',
    pieces: [
      'Vào đêm rằm Trung thu,',
      'vầng trăng tròn vành vạnh',
      'tỏa ánh sáng dịu mát',
      'xuống khắp các nẻo đường làng.'
    ],
    validSentences: [
      'Vào đêm rằm Trung thu, vầng trăng tròn vành vạnh tỏa ánh sáng dịu mát xuống khắp các nẻo đường làng.',
      'Vầng trăng tròn vành vạnh tỏa ánh sáng dịu mát xuống khắp các nẻo đường làng vào đêm rằm Trung thu.'
    ],
    hint: 'Bắt đầu bằng thời điểm đặc biệt "Vào đêm rằm Trung thu,", tiếp đến hình ảnh vầng trăng tròn và ánh sáng lan tỏa.',
    explanation: 'Từ láy "tròn vành vạnh" gợi tả trọn vẹn vẻ đẹp lung linh của đêm hội rước đèn ông sao.',
    grammaticalTip: 'Trạng ngữ thời gian + Chủ ngữ có tính từ láy + Vị ngữ chỉ hướng lan tỏa ánh sáng.'
  },
  {
    id: 'sb-14',
    roundNumber: 14,
    title: 'Thầy giáo ân cần trên bục giảng',
    theme: 'Thầy cô kính mến',
    pieces: [
      'Trên bục giảng thân quen,',
      'thầy giáo say sưa',
      'truyền đạt tri thức',
      'bằng tất cả tình yêu thương.'
    ],
    validSentences: [
      'Trên bục giảng thân quen, thầy giáo say sưa truyền đạt tri thức bằng tất cả tình yêu thương.',
      'Thầy giáo say sưa truyền đạt tri thức bằng tất cả tình yêu thương trên bục giảng thân quen.'
    ],
    hint: 'Trạng ngữ vị trí "Trên bục giảng thân quen," đứng đầu, theo sau là người thầy cùng ngọn lửa nhiệt huyết vì học sinh.',
    explanation: 'Câu văn thể hiện lòng biết ơn sâu sắc đối với người thầy tận tụy vun đắp ước mơ cho bao thế hệ học trò.',
    grammaticalTip: 'Trạng ngữ nơi chốn + Chủ ngữ + Vị ngữ mở rộng bằng trạng từ cách thức (bằng tất cả tình yêu thương).'
  },
  {
    id: 'sb-15',
    roundNumber: 15,
    title: 'Đôi chim sâu chuyền cành thoăn thoắt',
    theme: 'Thiên nhiên quanh ta',
    pieces: [
      'Trên cành ổi đầu vườn,',
      'chú chim sâu nhỏ nhắn',
      'chuyền cành thoăn thoắt',
      'để tìm bắt sâu bọ.'
    ],
    validSentences: [
      'Trên cành ổi đầu vườn, chú chim sâu nhỏ nhắn chuyền cành thoăn thoắt để tìm bắt sâu bọ.',
      'Chú chim sâu nhỏ nhắn chuyền cành thoăn thoắt để tìm bắt sâu bọ trên cành ổi đầu vườn.'
    ],
    hint: 'Bắt đầu từ cành cây nơi chim đậu, tiếp theo là chú chim nhỏ và hành động chuyền cành kèm mục đích bắt sâu.',
    explanation: 'Từ láy "nhỏ nhắn", "thoăn thoắt" làm nổi bật sự nhanh nhẹn, có ích của loài chim bảo vệ mùa màng.',
    grammaticalTip: 'Trạng ngữ vị trí + Chủ ngữ có từ láy miêu tả + Cụm vị ngữ chỉ mục đích (để tìm bắt sâu bọ).'
  },
  {
    id: 'sb-16',
    roundNumber: 16,
    title: 'Cây hoa sen trong đầm',
    theme: 'Cảnh đẹp quê hương',
    pieces: [
      'Giữa đầm nước trong veo,',
      'những đóa sen hồng ngát hương',
      'vươn cao kiêu hãnh',
      'đón ánh nắng mai.'
    ],
    validSentences: [
      'Giữa đầm nước trong veo, những đóa sen hồng ngát hương vươn cao kiêu hãnh đón ánh nắng mai.',
      'Những đóa sen hồng ngát hương vươn cao kiêu hãnh đón ánh nắng mai giữa đầm nước trong veo.'
    ],
    hint: 'Không gian đầm nước mát lành ở đầu câu, sau đó là hoa sen cùng tư thế vươn lên đón ban mai tươi sáng.',
    explanation: 'Hoa sen - biểu tượng thanh khiết của người Việt - hiện lên đầy sức sống và vẻ đẹp trang nhã.',
    grammaticalTip: 'Trạng ngữ không gian + Chủ ngữ mở rộng tính từ + Vị ngữ biểu cảm.'
  },
  {
    id: 'sb-17',
    roundNumber: 17,
    title: 'Bác nông dân trên đồng ruộng',
    theme: 'Người lao động',
    pieces: [
      'Dưới cái nắng ban trưa,',
      'bác nông dân',
      'vẫn cần mẫn cuốc đất',
      'để gieo mầm hy vọng.'
    ],
    validSentences: [
      'Dưới cái nắng ban trưa, bác nông dân vẫn cần mẫn cuốc đất để gieo mầm hy vọng.',
      'Bác nông dân vẫn cần mẫn cuốc đất để gieo mầm hy vọng dưới cái nắng ban trưa.'
    ],
    hint: 'Trạng ngữ thời tiết khắc nghiệt đi trước, tôn vinh hình ảnh người nông dân chăm chỉ, kiên cường.',
    explanation: 'Câu văn giúp học sinh thấu hiểu giá trị của giọt mồ hôi người lao động làm ra từng hạt cơm thơm dẻo.',
    grammaticalTip: 'Trạng ngữ hoàn cảnh + Chủ ngữ + Vị ngữ nhấn mạnh đức tính chịu thương chịu khó.'
  },
  {
    id: 'sb-18',
    roundNumber: 18,
    title: 'Dòng suối nguồn trong vắt',
    theme: 'Núi rừng Tây Bắc',
    pieces: [
      'Từ đỉnh núi cao,',
      'dòng suối nhỏ',
      'róc rách chảy',
      'như khúc nhạc vui tươi của đại ngàn.'
    ],
    validSentences: [
      'Từ đỉnh núi cao, dòng suối nhỏ róc rách chảy như khúc nhạc vui tươi của đại ngàn.',
      'Dòng suối nhỏ róc rách chảy như khúc nhạc vui tươi của đại ngàn từ đỉnh núi cao.'
    ],
    hint: 'Khởi nguồn từ đỉnh núi, dòng suối reo vui với âm thanh so sánh như bản nhạc của núi rừng.',
    explanation: 'Nghệ thuật so sánh âm thanh dòng suối chảy róc rách với tiếng nhạc du dương của thiên nhiên bao la.',
    grammaticalTip: 'Trạng ngữ xuất phát điểm + Chủ ngữ + Vị ngữ có từ tượng thanh và so sánh tượng trưng.'
  },
  {
    id: 'sb-19',
    roundNumber: 19,
    title: 'Đàn hải âu trên biển xanh',
    theme: 'Biển đảo quê hương',
    pieces: [
      'Trên nền trời xanh biếc,',
      'từng đàn chim hải âu',
      'chao liệng nhịp nhàng',
      'theo từng con sóng bạc đầu.'
    ],
    validSentences: [
      'Trên nền trời xanh biếc, từng đàn chim hải âu chao liệng nhịp nhàng theo từng con sóng bạc đầu.',
      'Từng đàn chim hải âu chao liệng nhịp nhàng theo từng con sóng bạc đầu trên nền trời xanh biếc.'
    ],
    hint: 'Bầu trời bao la ở đầu câu, đàn chim chao liệng cánh trắng trên những ngọn sóng biển quê hương.',
    explanation: 'Bức tranh biển đảo tự do, thanh bình với hình ảnh đàn hải âu tung cánh rộn ràng trên sóng nước.',
    grammaticalTip: 'Trạng ngữ không gian cao rộng + Chủ ngữ tập hợp + Vị ngữ nhịp điệu sinh động.'
  },
  {
    id: 'sb-20',
    roundNumber: 20,
    title: 'Cây bút máy nắn nót dòng chữ',
    theme: 'Đồ dùng học tập',
    pieces: [
      'Trên trang giấy trắng tinh,',
      'ngòi bút máy kim tinh',
      'chăm chỉ viết nên',
      'những dòng chữ ngay ngắn, thẳng hàng.'
    ],
    validSentences: [
      'Trên trang giấy trắng tinh, ngòi bút máy kim tinh chăm chỉ viết nên những dòng chữ ngay ngắn, thẳng hàng.',
      'Ngòi bút máy kim tinh chăm chỉ viết nên những dòng chữ ngay ngắn, thẳng hàng trên trang giấy trắng tinh.'
    ],
    hint: 'Bắt đầu từ trang giấy học trò, tiếp theo là ngòi bút chăm chỉ làm nên nét chữ nết người.',
    explanation: 'Nhân hóa ngòi bút máy như một người bạn nhỏ cần mẫn giúp em luyện chữ đẹp mỗi ngày.',
    grammaticalTip: 'Trạng ngữ vị trí + Chủ ngữ nhân hóa + Vị ngữ kết quả thành phẩm tươi đẹp.'
  },
  {
    id: 'sb-21',
    roundNumber: 21,
    title: 'Chú chó cưng mừng chủ về',
    theme: 'Con vật nuôi',
    pieces: [
      'Vừa thấy em đi học về,',
      'chú cún Vàng',
      'đã rối rít vẫy đuôi',
      'chạy ùa ra cổng đón mừng.'
    ],
    validSentences: [
      'Vừa thấy em đi học về, chú cún Vàng đã rối rít vẫy đuôi chạy ùa ra cổng đón mừng.',
      'Chú cún Vàng đã rối rít vẫy đuôi chạy ùa ra cổng đón mừng vừa thấy em đi học về.'
    ],
    hint: 'Thời điểm em về đến nhà đặt đầu câu, tiếp đến sự mừng rỡ đáng yêu của chú cún trung thành.',
    explanation: 'Từ láy "rối rít" lột tả trọn vẹn sự mừng rỡ, quấn quýt và tình cảm gắn bó của loài vật nuôi trong nhà.',
    grammaticalTip: 'Trạng ngữ điều kiện - thời gian + Chủ ngữ + Cụm vị ngữ diễn tả cảm xúc mừng rỡ.'
  },
  {
    id: 'sb-22',
    roundNumber: 22,
    title: 'Đoàn thuyền đánh cá trở về',
    theme: 'Quê hương & Biển cả',
    pieces: [
      'Khi bình minh vừa ló rạng,',
      'đoàn thuyền đánh cá',
      'tấp nập cập bến',
      'với những khoang cá tươi ngon, đầy ắp.'
    ],
    validSentences: [
      'Khi bình minh vừa ló rạng, đoàn thuyền đánh cá tấp nập cập bến với những khoang cá tươi ngon, đầy ắp.',
      'Đoàn thuyền đánh cá tấp nập cập bến với những khoang cá tươi ngon, đầy ắp khi bình minh vừa ló rạng.'
    ],
    hint: 'Khoảnh khắc bình minh trên biển đặt trước, đoàn thuyền cập bến mang lại niềm vui đầy ắp cho ngư dân.',
    explanation: 'Hình ảnh đoàn thuyền trở về trong nắng sớm vẽ nên cuộc sống lao động hăng say, ấm no của ngư dân vùng biển.',
    grammaticalTip: 'Trạng ngữ thời gian mở đầu + Chủ ngữ + Vị ngữ kèm trạng từ phụ bổ sung kết quả.'
  },
  {
    id: 'sb-23',
    roundNumber: 23,
    title: 'Chiếc cầu vồng sau cơn mưa',
    theme: 'Kỳ quan thiên nhiên',
    pieces: [
      'Sau khi cơn mưa rào dứt hạt,',
      'chiếc cầu vồng bảy sắc',
      'bỗng hiện lên lung linh',
      'vắt ngang qua vòm trời cao.'
    ],
    validSentences: [
      'Sau khi cơn mưa rào dứt hạt, chiếc cầu vồng bảy sắc bỗng hiện lên lung linh vắt ngang qua vòm trời cao.',
      'Chiếc cầu vồng bảy sắc bỗng hiện lên lung linh vắt ngang qua vòm trời cao sau khi cơn mưa rào dứt hạt.'
    ],
    hint: 'Sau cơn mưa, chiếc cầu vồng xuất hiện rực rỡ sắc màu bắc cầu trên bầu trời xanh thẳm.',
    explanation: 'Từ láy "lung linh" cùng cụm từ "vắt ngang qua vòm trời cao" tạo cảm giác huyền ảo, kỳ diệu của tự nhiên.',
    grammaticalTip: 'Trạng ngữ thời gian nguyên nhân + Chủ ngữ + Vị ngữ trạng thái kỳ ảo.'
  },
  {
    id: 'sb-24',
    roundNumber: 24,
    title: 'Lá cờ đỏ sao vàng tung bay',
    theme: 'Lòng yêu nước & Tự hào',
    pieces: [
      'Trong gió sớm đầu tuần,',
      'lá cờ Tổ quốc đỏ thắm',
      'kiêu hãnh tung bay',
      'trên nền trời mùa thu trong vắt.'
    ],
    validSentences: [
      'Trong gió sớm đầu tuần, lá cờ Tổ quốc đỏ thắm kiêu hãnh tung bay trên nền trời mùa thu trong vắt.',
      'Lá cờ Tổ quốc đỏ thắm kiêu hãnh tung bay trên nền trời mùa thu trong vắt trong gió sớm đầu tuần.'
    ],
    hint: 'Bắt đầu bằng khoảnh khắc chào cờ đầu tuần, lá cờ thiêng liêng bay phấp phới trong niềm tự hào dân tộc.',
    explanation: 'Câu văn trang nghiêm và dạt dào niềm xúc động, khơi dậy tình yêu quê hương đất nước trong tâm hồn các em học sinh.',
    grammaticalTip: 'Trạng ngữ hoàn cảnh + Chủ ngữ trang trọng + Vị ngữ gợi niềm tự hào non sông.'
  }
];
