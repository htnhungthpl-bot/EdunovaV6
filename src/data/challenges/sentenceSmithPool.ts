import { SentenceSmithLevel } from '../../types/challenges';

export const SENTENCE_SMITH_LEVELS: SentenceSmithLevel[] = [
  {
    id: 'ss-1',
    levelNumber: 1,
    title: 'Biến câu trơ trụi thành bức tranh cây cối',
    levelName: 'Cấp độ 1: Thêm Trạng ngữ & Từ láy gợi tả',
    originalSentence: 'Cây bàng ra lá.',
    guidingQuestion: 'Câu văn trên quá ngắn ngủi. Em hãy thêm thời gian xảy ra, màu sắc của chiếc lá và cảm xúc tươi mới vào câu nhé!',
    targetFocus: 'Thêm trạng ngữ thời gian + từ láy tả màu lá biếc non tơ',
    suggestedVocab: ['Vào mùa xuân', 'mầm non mơn mởn', 'xanh biếc', 'nhú lên', 'như ngọn nến'],
    modelResponses: [
      'Vào mùa xuân ấm áp, trên những cành cây khẳng khiu, từng chồi non bàng xanh biếc bắt đầu nhú lên như những ngọn nến xanh.',
      'Khi làn gió xuân nhẹ nhàng thổi qua, cây bàng già bỗng bừng tỉnh, đâm chồi nảy lộc với những chiếc lá non xanh mướt mát mẻ.'
    ],
    rubricCriteria: [
      { label: 'Trạng ngữ', description: 'Có trạng ngữ thời gian hoặc nơi chốn chỉ bối cảnh' },
      { label: 'Từ láy gợi hình', description: 'Có ít nhất 1 từ láy (mơn mởn, xanh biếc, khẳng khiu...)' },
      { label: 'Độ dài & Trôi chảy', description: 'Câu dài ít nhất 10 từ, diễn đạt mạch lạc, giàu hình ảnh' }
    ]
  },
  {
    id: 'ss-2',
    levelNumber: 2,
    title: 'Khắc họa tư thế chú mèo săn mồi',
    levelName: 'Cấp độ 2: Thêm Hành động chi tiết & Cảm giác',
    originalSentence: 'Con mèo bắt chuột.',
    guidingQuestion: 'Chú mèo bắt chuột trong tư thế nào? Đôi mắt chú ra sao và bước chân nhẹ nhàng thế nào?',
    targetFocus: 'Tả dáng điệu rình mồi + đôi mắt tinh ranh + cú vồ chuẩn xác',
    suggestedVocab: ['rón rén', 'tròn xoe', 'thu mình', 'lao vút', 'bất thình lình', 'móng vuốt'],
    modelResponses: [
      'Thu mình sau góc bếp, chú mèo mướp giương to đôi mắt tròn xoe sáng quắc, rồi bất thình lình lao vút tới tóm gọn chú chuột nhắt.',
      'Với bước chân rón rén êm như nhung, chú mèo tiến lại gần con chuột rồi tung một cú vồ chuẩn xác khiến con mồi không kịp trở tay.'
    ],
    rubricCriteria: [
      { label: 'Từ gợi tả cử chỉ', description: 'Dùng từ đặc tả tư thế, dáng điệu (rón rén, thu mình, lao vút)' },
      { label: 'Chi tiết quan sát', description: 'Miêu tả mắt, tai hoặc bước chân của loài mèo' },
      { label: 'Cấu trúc câu phong phú', description: 'Có kết hợp câu nhiều vế hành động nhịp nhàng' }
    ]
  },
  {
    id: 'ss-3',
    levelNumber: 3,
    title: 'Nghệ thuật So sánh & Tình cảm quê hương',
    levelName: 'Cấp độ 3: Lồng ghép Hình ảnh So sánh giàu chất thơ',
    originalSentence: 'Dòng sông chảy qua làng em.',
    guidingQuestion: 'Dòng sông quê hương trông giống vật gì thân thương? Nước sông có màu gì và mang lại điều gì cho bà con?',
    targetFocus: 'Lồng ghép so sánh (như dải lụa) + từ láy diễn tả sự êm đềm',
    suggestedVocab: ['uốn lượn', 'như dải lụa mềm', 'hiền hòa', 'phù sa màu mỡ', 'ấp ôm'],
    modelResponses: [
      'Dòng sông quê em uốn lượn hiền hòa như một dải lụa đào mềm mại, ấp ôm lấy xóm làng và tưới mát cho những cánh đồng trù phú.',
      'Chảy qua làng em, dòng sông Hồng đỏ nặng phù sa trôi lững lờ như một chứng nhân lịch sử gắn bó sâu nặng với tuổi thơ bao thế hệ.'
    ],
    rubricCriteria: [
      { label: 'Hình ảnh so sánh', description: 'Sử dụng từ so sánh (như, tựa như, giống như) với hình ảnh đẹp' },
      { label: 'Từ láy cảm xúc', description: 'Dùng từ láy diễn tả sự êm đềm, hiền hòa, trù phú' },
      { label: 'Cảm xúc gắn bó', description: 'Thể hiện được tình yêu quê hương làng xóm' }
    ]
  },
  {
    id: 'ss-4',
    levelNumber: 4,
    title: 'Thổi hồn Nhân hóa vào Cảnh sân trường',
    levelName: 'Cấp độ 4: Bậc thầy Nhân hóa & Đại từ gợi cảm',
    originalSentence: 'Sân trường đông vui khi ra chơi.',
    guidingQuestion: 'Khi tiếng trống vang lên, sân trường biến chuyển ra sao? Cây cối, chim chóc hay chính sân trường vui cùng học trò?',
    targetFocus: 'Nhân hóa sân trường/cây cối + từ tượng thanh rộn ràng',
    suggestedVocab: ['bừng tỉnh', 'rộn rã', 'khoác áo mới', 'tiếng cười giòn tan', 'nhảy múa'],
    modelResponses: [
      'Vừa dứt ba hồi trống báo giờ ra chơi, sân trường như bừng tỉnh sau giấc ngủ trưa, rộn rã hẳn lên bởi tiếng cười nói giòn tan của các bạn học sinh.',
      'Sân trường bỗng biến thành một ngày hội náo nức, từng đàn chim nhỏ trên cành bàng già cũng hót líu lo hòa cùng niềm vui của chúng em.'
    ],
    rubricCriteria: [
      { label: 'Biện pháp nhân hóa', description: 'Gán cho cảnh vật hành động, cảm xúc con người (bừng tỉnh, reo vui)' },
      { label: 'Từ tượng thanh, tượng hình', description: 'Có từ tượng thanh (giòn tan, rộn rã, líu lo)' },
      { label: 'Ấn tượng bối cảnh', description: 'Tái hiện không khí sôi động, rực rỡ sắc màu tuổi học trò' }
    ]
  },
  {
    id: 'ss-5',
    levelNumber: 5,
    title: 'Hương sen thơm ngát giữa đầm quê',
    levelName: 'Cấp độ 1: Thêm nơi chốn & Màu sắc hương thơm',
    originalSentence: 'Hoa sen nở trong đầm.',
    guidingQuestion: 'Những bông hoa sen có màu gì? Hương thơm của hoa lan tỏa thế nào và nổi bật giữa lá xanh ra sao?',
    targetFocus: 'Thêm trạng ngữ không gian + màu hồng thanh khiết + hương ngào ngạt',
    suggestedVocab: ['Giữa đầm nước trong veo', 'hồng tươi', 'ngào ngạt', 'vươn cao kiêu hãnh', 'tinh khôi'],
    modelResponses: [
      'Giữa đầm nước trong veo thơm mát, những đóa sen hồng tươi vươn cao kiêu hãnh, tỏa hương thơm ngào ngạt làm dịu mát cả trưa hè.',
      'Ẩn mình dưới những phiến lá xanh mướt như chiếc nón quai thao, bông hoa sen đầu mùa khẽ hé nở cánh hoa hồng thắm ngát hương.'
    ],
    rubricCriteria: [
      { label: 'Trạng ngữ nơi chốn', description: 'Có trạng ngữ định vị không gian đầm sen' },
      { label: 'Gợi tả đa giác quan', description: 'Vừa có màu sắc vừa có mùi hương (ngào ngạt, thơm mát)' },
      { label: 'Cấu trúc hoàn chỉnh', description: 'Câu diễn đạt trôi chảy, đúng chuẩn văn miêu tả lớp 4' }
    ]
  },
  {
    id: 'ss-6',
    levelNumber: 6,
    title: 'Đàn chim bay về tổ trong hoàng hôn',
    levelName: 'Cấp độ 2: Tạo bối cảnh ánh chiều tà thơ mộng',
    originalSentence: 'Đàn chim bay về tổ.',
    guidingQuestion: 'Thời điểm hoàng hôn nhuộm màu gì lên bầu trời? Cánh chim chao liệng thế nào sau một ngày kiếm ăn?',
    targetFocus: 'Khung cảnh hoàng hôn đỏ rực + nhịp cánh chao nghiêng nhịp nhàng',
    suggestedVocab: ['Khi hoàng hôn buông xuống', 'đỏ rực', 'chao liệng nhịp nhàng', 'ríu rít', 'bình yên'],
    modelResponses: [
      'Khi ánh hoàng hôn đỏ rực buông xuống đường chân trời, từng đàn chim ríu rít chao liệng nhịp nhàng tìm đường về tổ ấm.',
      'Dưới ánh chiều tà nhuộm tím cả khoảng trời, những cánh chim mỏi mệt nhưng rộn rã niềm vui cùng nhau bay về khu rừng bình yên.'
    ],
    rubricCriteria: [
      { label: 'Bối cảnh thời gian', description: 'Trạng ngữ thời gian lúc chiều tà, hoàng hôn' },
      { label: 'Từ láy cử động', description: 'Dùng từ láy diễn tả nhịp cánh (chao liệng, nhịp nhàng)' },
      { label: 'Cảm giác bình yên', description: 'Gợi được hơi ấm của tổ ấm gia đình muôn loài' }
    ]
  },
  {
    id: 'ss-7',
    levelNumber: 7,
    title: 'Bữa cơm chiều ấm áp của mẹ',
    levelName: 'Cấp độ 3: Khắc họa tình mẫu tử thiêng liêng',
    originalSentence: 'Mẹ nấu cơm trong bếp.',
    guidingQuestion: 'Bên ánh lửa bập bùng, bóng mẹ cặm cụi ra sao? Tình yêu thương mẹ gửi gắm vào từng món ăn thế nào?',
    targetFocus: 'Ngọn lửa ấm áp + cử chỉ cặm cụi ân cần + hương vị gia đình',
    suggestedVocab: ['Bên bếp lửa hồng ấm áp', 'cặm cụi', 'thoang thoảng', 'chan chứa yêu thương', 'nụ cười hiền'],
    modelResponses: [
      'Bên bếp lửa hồng ấm áp, mẹ cặm cụi nấu từng món ăn thơm ngon, gửi gắm trọn vẹn tình yêu thương vào bữa cơm chiều của cả gia đình.',
      'Dưới ánh đèn vàng mờ ấm cúng, đôi bàn tay mẹ khéo léo nêm nếm nồi canh nóng hổi, chốc chốc lại mỉm cười đón các con đi học về.'
    ],
    rubricCriteria: [
      { label: 'Từ ngữ chỉ thái độ', description: 'Dùng từ láy gợi sự tận tụy (cặm cụi, khéo léo, ân cần)' },
      { label: 'Không gian ấm cúng', description: 'Gợi được bếp lửa, ánh sáng ấm áp của gia đình' },
      { label: 'Cảm xúc biết ơn', description: 'Bộc lộ lòng yêu thương mẹ sâu sắc' }
    ]
  },
  {
    id: 'ss-8',
    levelNumber: 8,
    title: 'Cơn mưa rào bất chợt tưới mát phố phường',
    levelName: 'Cấp độ 4: Diễn tả sức sống mãnh liệt của thiên nhiên',
    originalSentence: 'Trời mưa to.',
    guidingQuestion: 'Cơn mưa đến bất ngờ như thế nào? Tiếng mưa rơi, làn nước xối xả và cỏ cây đón nhận mưa ra sao?',
    targetFocus: 'Từ tượng thanh rào rạt + mưa trắng xóa + vạn vật reo mừng',
    suggestedVocab: ['Bất thình lình', 'sấm chớp ầm ầm', 'xối xả', 'trắng xóa', 'hả hê đón nhận'],
    modelResponses: [
      'Sau tiếng sấm rền vang bất thình lình, cơn mưa rào trút nước xối xả, làm vạn vật cây cỏ hả hê tắm mát sau chuỗi ngày nắng gắt.',
      'Bầu trời đen kịt bỗng chốc buông màn mưa trắng xóa, từng giọt nước nhảy múa reo vui trên những mái ngói rêu phong của phố cổ.'
    ],
    rubricCriteria: [
      { label: 'Từ tượng thanh sinh động', description: 'Có từ tượng thanh (rền vang, xối xả, lộp độp)' },
      { label: 'Nhân hóa cỏ cây', description: 'Cây cối biết hả hê, nhảy múa đón giọt nước mát' },
      { label: 'Hình ảnh sống động', description: 'Tạo nên bức tranh thiên nhiên giàu sức gợi tả' }
    ]
  },
  {
    id: 'ss-9',
    levelNumber: 9,
    title: 'Bác nông dân trên cánh đồng mùa gặt',
    levelName: 'Cấp độ 2: Tôn vinh giọt mồ hôi người lao động',
    originalSentence: 'Bác nông dân gặt lúa.',
    guidingQuestion: 'Dưới nắng trưa, bác nông dân tay thoăn thoắt đưa liềm ra sao? Nụ cười mùa màng bội thu bừng sáng thế nào?',
    targetFocus: 'Ánh nắng chang chang + tay liềm thoăn thoắt + nụ cười rạng rỡ',
    suggestedVocab: ['Dù giọt mồ hôi ướt đẫm', 'tay thoăn thoắt', 'lúa vàng trĩu hạt', 'nụ cười rạng ngời', 'ấm no'],
    modelResponses: [
      'Dù những giọt mồ hôi ướt đẫm lưng áo, bác nông dân vẫn thoăn thoắt đưa lưỡi liềm gặt từng ôm lúa vàng óng với nụ cười rạng ngời hạnh phúc.',
      'Giữa biển lúa chín vàng bao la, bóng dáng bác nông dân cần mẫn hiện lên thật đẹp đẽ, làm nên những hạt ngọc trời quý giá nuôi sống muôn nhà.'
    ],
    rubricCriteria: [
      { label: 'Từ ngữ lao động cần cù', description: 'Dùng từ đặc tả hành động (thoăn thoắt, cần mẫn)' },
      { label: 'Chi tiết giọt mồ hôi', description: 'Gợi sự vất vả mà lạc quan của nhà nông' },
      { label: 'Ý nghĩa biết ơn', description: 'Tôn vinh giá trị hạt gạo và người lao động' }
    ]
  },
  {
    id: 'ss-10',
    levelNumber: 10,
    title: 'Đêm trăng tròn trên sông nước',
    levelName: 'Cấp độ 3: Kết hợp So sánh lấp lánh và Không gian tĩnh lặng',
    originalSentence: 'Mặt trăng nhô lên cao.',
    guidingQuestion: 'Vầng trăng đêm rằm giống như chiếc đĩa gì? Ánh trăng rát vàng rát bạc lên dòng sông thế nào?',
    targetFocus: 'So sánh trăng như đĩa bạc + ánh trăng dát vàng lung linh',
    suggestedVocab: ['Từ từ nhô lên', 'như chiếc đĩa bạc khổng lồ', 'dát vàng', 'lấp lánh', 'dịu mát'],
    modelResponses: [
      'Từ từ nhô lên sau lũy tre làng, vầng trăng tròn vành vạnh như một chiếc đĩa bạc khổng lồ, dát ánh sáng lung linh xuống dòng sông quê êm đềm.',
      'Vầng trăng đêm rằm tỏa ánh sáng dịu mát vằng vặc khắp không gian, soi bóng xuống mặt nước phẳng lặng tạo nên một bức tranh thủy mặc diệu kỳ.'
    ],
    rubricCriteria: [
      { label: 'Biện pháp so sánh', description: 'So sánh vầng trăng với hình ảnh đẹp đẽ (chiếc đĩa bạc, quả cầu sáng)' },
      { label: 'Từ ngữ ánh sáng', description: 'Dùng từ láy diễn tả ánh trăng (vằng vặc, lung linh, lấp lánh)' },
      { label: 'Cảm giác thơ mộng', description: 'Tạo được không gian tĩnh lặng, trong mát của đêm quê' }
    ]
  },
  {
    id: 'ss-11',
    levelNumber: 11,
    title: 'Tiếng suối reo vui trong đại ngàn',
    levelName: 'Cấp độ 4: Hòa phối Âm nhạc và Nhân hóa tự nhiên',
    originalSentence: 'Dòng suối chảy qua núi.',
    guidingQuestion: 'Từ trên đỉnh núi cao, dòng suối vượt qua ghềnh đá với tiếng reo vui như bài ca thế nào?',
    targetFocus: 'Âm thanh róc rách + so sánh khúc nhạc đại ngàn + nước trong vắt',
    suggestedVocab: ['Từ trên đỉnh núi cao vời vợi', 'róc rách', 'như bản tình ca', 'uốn mình qua ghềnh đá', 'trong veo'],
    modelResponses: [
      'Từ đỉnh núi cao đại ngàn, dòng suối nhỏ trong veo uốn mình róc rách chảy qua từng khe đá như một bản tình ca vui tươi của núi rừng Tây Bắc.',
      'Dòng suối nguồn trong vắt rượt đuổi qua muôn trùng ghềnh thác, cất tiếng reo vui hòa cùng tiếng gió rừng tạo nên khúc ca bất tận của thiên nhiên.'
    ],
    rubricCriteria: [
      { label: 'Từ tượng thanh tinh tế', description: 'Có từ tượng thanh gợi âm nhạc (róc rách, reo vui)' },
      { label: 'So sánh tiếng đàn, tiếng ca', description: 'Ví tiếng suối như bản nhạc, khúc tình ca' },
      { label: 'Hình ảnh chuyển động', description: 'Tả suối uốn mình, len lỏi, rượt đuổi' }
    ]
  },
  {
    id: 'ss-12',
    levelNumber: 12,
    title: 'Thầy giáo say sưa trên bục giảng',
    levelName: 'Cấp độ 2: Tả giọng nói ấm áp và ánh mắt truyền lửa',
    originalSentence: 'Thầy giáo dạy học.',
    guidingQuestion: 'Đứng trên bục giảng, giọng thầy ấm áp thế nào? Từng trang sách mở ra chân trời tri thức ra sao?',
    targetFocus: 'Giọng nói truyền cảm + ánh mắt trìu mến + chắp cánh ước mơ',
    suggestedVocab: ['Trên bục giảng thân yêu', 'say sưa', 'ấm áp truyền cảm', 'ánh mắt trìu mến', 'chắp cánh ước mơ'],
    modelResponses: [
      'Đứng trên bục giảng thân yêu, thầy giáo say sưa giảng bài với giọng nói ấm áp, ánh mắt trìu mến chắp cánh cho bao ước mơ của học trò.',
      'Từng lời thầy giảng như những hạt giống tri thức gieo vào tâm hồn chúng em, mở ra biết bao điều kỳ diệu của cuộc sống bao la.'
    ],
    rubricCriteria: [
      { label: 'Từ ngữ tôn kính', description: 'Dùng từ thể hiện lòng yêu kính thầy cô (ấm áp, trìu mến, say sưa)' },
      { label: 'Hình ảnh ẩn dụ', description: 'Hình ảnh chắp cánh ước mơ, hạt giống tri thức' },
      { label: 'Ý nghĩa nhân văn', description: 'Nêu bật công ơn dạy dỗ của người thầy' }
    ]
  },
  {
    id: 'ss-13',
    levelNumber: 13,
    title: 'Chú gà trống oai vệ đón bình minh',
    levelName: 'Cấp độ 3: Nhân hóa chú gà như chàng dũng sĩ',
    originalSentence: 'Gà trống cất tiếng gáy.',
    guidingQuestion: 'Chú gà trống choai đứng trên đống rơm oai vệ thế nào? Tiếng gáy vang dội xua tan màn đêm ra sao?',
    targetFocus: 'Dáng đứng oai vệ + vỗ cánh phành phạch + tiếng gáy dõng dạc',
    suggestedVocab: ['Trên đống rơm vàng óng', 'chú gà trống oai vệ', 'vỗ cánh phành phạch', 'dõng dạc', 'đánh thức xóm làng'],
    modelResponses: [
      'Đứng sừng sững trên đống rơm vàng óng như một chàng dũng sĩ, chú gà trống choai vỗ cánh phành phạch rồi cất tiếng gáy dõng dạc xua tan bóng đêm.',
      'Chú gà trống với chiếc mào đỏ chót vươn cao cổ, dõng dạc cất lên khúc ca rộn rã đánh thức cả xóm làng đón chào ngày mới.'
    ],
    rubricCriteria: [
      { label: 'Biện pháp nhân hóa/so sánh', description: 'Ví gà trống như chàng dũng sĩ oai phong' },
      { label: 'Từ láy hành động', description: 'Dùng từ tả hành động (phành phạch, sừng sững, dõng dạc)' },
      { label: 'Tác dụng của tiếng gáy', description: 'Xua tan bóng đêm, đánh thức xóm làng' }
    ]
  },
  {
    id: 'ss-14',
    levelNumber: 14,
    title: 'Cây bàng mùa đông kiên cường đón gió',
    levelName: 'Cấp độ 4: Khắc họa sức sống quật cường của thiên nhiên',
    originalSentence: 'Cây bàng rụng lá mùa đông.',
    guidingQuestion: 'Dưới cơn gió bấc lạnh buốt, cây bàng trụi lá nhưng vẫn ấp ủ điều kỳ diệu gì cho mùa xuân?',
    targetFocus: 'Gió bấc lạnh lùng + cành khẳng khiu + ấp ủ mầm xanh xuân tới',
    suggestedVocab: ['Giữa mùa đông giá rét', 'gió bấc căm căm', 'khẳng khiu kiên cường', 'lá đỏ ối', 'ấp ủ mầm non'],
    modelResponses: [
      'Dưới làn gió bấc căm căm của mùa đông, cây bàng già dẫu trút bỏ những chiếc lá đỏ ối cuối cùng nhưng vẫn kiên cường ấp ủ muôn mầm non chờ xuân sang.',
      'Cây bàng đứng sừng sững giữa sân trường giá lạnh, những cành khẳng khiu như những cánh tay gân guốc che chở cho góc sân trường thân thương.'
    ],
    rubricCriteria: [
      { label: 'Sự tương phản ấn tượng', description: 'Tương phản giữa cái lạnh mùa đông và sức sống mầm non' },
      { label: 'Từ láy gợi cảm xúc', description: 'Có từ láy (căm căm, khẳng khiu, sừng sững)' },
      { label: 'Ý chí kiên cường', description: 'Khắc họa sức mạnh bền bỉ trước gian khó' }
    ]
  },
  {
    id: 'ss-15',
    levelNumber: 15,
    title: 'Chiếc cặp sách - người bạn nhỏ đến trường',
    levelName: 'Cấp độ 2: Tả đồ dùng học tập gắn bó tình bạn',
    originalSentence: 'Em đeo cặp đi học.',
    guidingQuestion: 'Chiếc cặp sách màu gì, nằm ngoan ngoãn trên lưng em ra sao và bảo vệ sách vở thế nào?',
    targetFocus: 'Người bạn đồng hành + màu sắc xinh xắn + cùng bước tới tương lai',
    suggestedVocab: ['Mỗi sớm mai tinh khôi', 'chiếc cặp xanh da trời', 'ngoan ngoãn trên lưng', 'người bạn đồng hành', 'tự tin bước vào lớp'],
    modelResponses: [
      'Mỗi sớm mai tinh khôi, chiếc cặp sách màu xanh da trời lại ngoan ngoãn nằm trên lưng, cùng em tự tin sải bước tới mái trường thân yêu.',
      'Là người bạn nhỏ thân thiết giữ gìn từng trang sách vở sạch đẹp, chiếc cặp sách đã gắn bó và chứng kiến từng bước trưởng thành của em suốt năm học.'
    ],
    rubricCriteria: [
      { label: 'Nhân hóa đồ vật', description: 'Cặp sách biết ngoan ngoãn, là người bạn đồng hành' },
      { label: 'Cảm xúc học trò', description: 'Gợi niềm vui, sự tự hào khi cắp sách đến trường' },
      { label: 'Cấu trúc câu phong phú', description: 'Mở đầu bằng trạng ngữ thời gian tươi sáng' }
    ]
  },
  {
    id: 'ss-16',
    levelNumber: 16,
    title: 'Sóng biển dạt dào hôn bờ cát trắng',
    levelName: 'Cấp độ 4: Bản giao hưởng biển cả và tình yêu quê hương',
    originalSentence: 'Sóng biển vỗ vào bờ.',
    guidingQuestion: 'Những con sóng bạc đầu xô bờ với nhịp điệu thế nào? Bờ cát trắng mịn đón nhận sóng ra sao?',
    targetFocus: 'Sóng bạc đầu nhấp nhô + bờ cát trắng mịn màng + khúc ca biển cả',
    suggestedVocab: ['Dưới ánh bình minh rạng rỡ', 'từng đợt sóng bạc đầu', 'dạt dào vỗ về', 'bờ cát trắng mịn màng', 'bản tình ca của đại dương'],
    modelResponses: [
      'Dưới ánh bình minh rực rỡ, từng đợt sóng bạc đầu dạt dào xô bờ, dịu dàng vỗ về dải cát trắng mịn màng như bản tình ca muôn thuở của đại dương.',
      'Sóng biển quê hương ngày đêm rì rào tung bọt trắng xóa, vẽ nên bức tranh thiên nhiên kỳ vĩ và dạt dào tình yêu biển đảo non sông.'
    ],
    rubricCriteria: [
      { label: 'Nghệ thuật nhân hóa sóng biển', description: 'Sóng biết dịu dàng vỗ về, hát bản tình ca' },
      { label: 'Từ láy tạo hình, tạo thanh', description: 'Dùng từ láy tượng hình tượng thanh (dạt dào, mịn màng, rực rỡ, rì rào)' },
      { label: 'Tình yêu non sông đất nước', description: 'Gắn liền với lòng tự hào biển đảo quê hương' }
    ]
  }
];
