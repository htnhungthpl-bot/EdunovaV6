import { VividWordChallenge } from '../../types/challenges';

export const VIVID_WORD_CHALLENGES: VividWordChallenge[] = [
  {
    id: 'vw-1',
    challengeNumber: 1,
    title: 'Tiếng suối reo giữa núi rừng',
    category: 'Âm thanh',
    prompt: 'Em hãy chọn từ gợi tả âm thanh hay nhất để hoàn thiện câu văn miêu tả dòng suối chảy qua khe đá:',
    sentenceContext: 'Ẩn mình dưới tán rừng già, dòng suối trong vắt chảy [...] qua những phiến đá rêu phong.',
    options: [
      { id: 'vw-1a', word: 'róc rách', isBest: true, nuance: 'Gợi âm thanh nước chảy êm dịu, trong trẻo và vui tai giữa tự nhiên.' },
      { id: 'vw-1b', word: 'ầm ĩ', isBest: false, nuance: 'Gợi tiếng ồn khó chịu, không phù hợp với vẻ thanh bình của dòng suối rừng.' },
      { id: 'vw-1c', word: 'ào ào', isBest: false, nuance: 'Gợi tiếng nước đổ dồn dập như lũ cuốn, không hợp với dòng suối nhỏ êm đềm.' }
    ],
    explanation: 'Từ "róc rách" là từ tượng thanh tuyệt đẹp của Tiếng Việt lớp 4, gợi lên sự êm đềm, thanh khiết của dòng suối tự nhiên.',
    openObservationTip: 'Khi tả cảnh thiên nhiên nhỏ bé, em nên chọn từ tượng thanh có âm hưởng thanh thoát như "róc rách, rón rén, ríu rít".'
  },
  {
    id: 'vw-2',
    challengeNumber: 2,
    title: 'Màu vàng của cánh đồng lúa chín',
    category: 'Màu sắc',
    prompt: 'Chọn từ gợi tả màu sắc đắt giá nhất để miêu tả cánh đồng lúa vào mùa gặt bội thu:',
    sentenceContext: 'Dưới nắng trưa hè rực rỡ, cánh đồng lúa trải rộng một màu [...] trĩu hạt ấm no.',
    options: [
      { id: 'vw-2a', word: 'vàng óng', isBest: true, nuance: 'Gợi màu vàng bóng bẩy, mỡ màng, ánh lên vẻ đẹp của hạt ngọc trời bội thu.' },
      { id: 'vw-2b', word: 'vàng ệch', isBest: false, nuance: 'Gợi cảm giác úa tàn hoặc bệnh tật, không thể hiện được vẻ đẹp của mùa màng.' },
      { id: 'vw-2c', word: 'vàng khè', isBest: false, nuance: 'Màu vàng gắt, thiếu sức sống và vẻ tươi đẹp của cánh đồng lúa chín.' }
    ],
    explanation: '"Vàng óng" là từ gợi tả sắc thái óng ả, đầy đặn, căng mọng ánh sáng của bông lúa mẩy hạt vào độ thu hoạch.',
    openObservationTip: 'Cùng là màu vàng nhưng "vàng óng, vàng xuộm, vàng rực" mang vẻ trù phú, còn "vàng úa, vàng hoe" gợi sự tàn phai.'
  },
  {
    id: 'vw-3',
    challengeNumber: 3,
    title: 'Dáng đi chú mèo rình mồi',
    category: 'Dáng vẻ',
    prompt: 'Từ nào miêu tả bước chân của chú mèo chuẩn xác và giàu tính nghệ thuật nhất?',
    sentenceContext: 'Phát hiện chú chuột nhắt đang lục lọi góc bếp, chú mèo mướp bước đi [...] không một tiếng động.',
    options: [
      { id: 'vw-3a', word: 'rón rén', isBest: true, nuance: 'Gợi từng bước chân nhẹ nhàng, giấu móng vuốt để không tạo tiếng động khi rình mồi.' },
      { id: 'vw-3b', word: 'huỳnh huỵch', isBest: false, nuance: 'Gợi bước đi nặng nề, cục mịch của người to béo hoặc việc nặng.' },
      { id: 'vw-3c', word: 'lững thững', isBest: false, nuance: 'Gợi bước đi thong thả, vô tư lự, không hợp với tư thế rình bắt mồi.' }
    ],
    explanation: 'Từ "rón rén" đặc tả bản năng săn mồi cẩn trọng, khéo léo và thông minh của loài mèo.',
    openObservationTip: 'Chú ý quan sát loài vật: chân mèo có đệm thịt êm ái nên đi "rón rén, uyển chuyển, nhẹ tênh".'
  },
  {
    id: 'vw-4',
    challengeNumber: 4,
    title: 'Ánh trăng rằm soi bóng hồ',
    category: 'Ánh sáng',
    prompt: 'Từ gợi tả ánh sáng nào giúp vầng trăng rằm mùa thu hiện lên lung linh nhất?',
    sentenceContext: 'Vầng trăng rằm tháng Tám tỏa ánh sáng [...] vắt qua mặt hồ phẳng lặng như gương.',
    options: [
      { id: 'vw-4a', word: 'vằng vặc', isBest: true, nuance: 'Gợi ánh trăng trong trẻo, sáng rõ đến từng ngọn cỏ cành cây giữa đêm thanh vắng.' },
      { id: 'vw-4b', word: 'chói chang', isBest: false, nuance: 'Dùng tả ánh nắng mặt trời gắt gỏng gay gắt, không hợp với sự êm đềm của ánh trăng.' },
      { id: 'vw-4c', word: 'le lói', isBest: false, nuance: 'Gợi ánh sáng nhỏ nhoi sắp tàn lụi, không đúng với trăng rằm tròn đầy.' }
    ],
    explanation: '"Trăng sáng vằng vặc" là hình ảnh thơ mộng kinh điển trong văn học thiếu nhi, gợi cảm giác thanh bình, trong mát.',
    openObservationTip: 'Dùng từ chỉ ánh sáng phù hợp: Trăng "vằng vặc, dịu mát", mặt trời "chói chang, gay gắt", ánh nến "le lói, bập bùng".'
  },
  {
    id: 'vw-5',
    challengeNumber: 5,
    title: 'Tiếng chim hót sớm mai',
    category: 'Âm thanh',
    prompt: 'Chọn từ miêu tả giọng hót líu lo, cao vút, ngọt ngào của chim sơn ca:',
    sentenceContext: 'Đón chào bình minh tươi đẹp, chú chim sơn ca cất tiếng hót [...] vang lừng giữa bầu trời trong xanh.',
    options: [
      { id: 'vw-5a', word: 'véo von', isBest: true, nuance: 'Gợi âm thanh ngân nga, lúc trầm lúc bổng, lảnh lót say đắm lòng người.' },
      { id: 'vw-5b', word: 'chát chúa', isBest: false, nuance: 'Gợi âm thanh gay gắt, khó nghe, hoàn toàn trái ngược với tiếng hót.' },
      { id: 'vw-5c', word: 'ồn ào', isBest: false, nuance: 'Từ khái quát tả sự huyên náo đông người, không thể hiện được chất nhạc của tiếng chim.' }
    ],
    explanation: 'Từ "véo von" gợi tả bản hòa ca tuyệt tác của chim ca đón bình minh, đem lại niềm yêu đời cho người nghe.',
    openObservationTip: 'Tiếng chim sâu thì "râm ran, lích chích", chim họa mi "véo von, lảnh lót", chim bồ câu "gù gù".'
  },
  {
    id: 'vw-6',
    challengeNumber: 6,
    title: 'Nụ cười hiền từ của bà ngoại',
    category: 'Cảm xúc',
    prompt: 'Chọn từ ngữ thể hiện tình cảm âu yếm, ấm áp của người bà dành cho cháu thơ:',
    sentenceContext: 'Nhìn đàn cháu nhỏ quây quần bên mâm cơm, bà nở nụ cười [...] chan chứa yêu thương.',
    options: [
      { id: 'vw-6a', word: 'hiền hậu', isBest: true, nuance: 'Gợi vẻ đôn hậu, bao dung, ấm áp như bà tiên trong truyện cổ tích.' },
      { id: 'vw-6b', word: 'gượng gạo', isBest: false, nuance: 'Gợi nụ cười không thật lòng, gượng ép, không hợp với tình cảm ruột thịt gia đình.' },
      { id: 'vw-6c', word: 'ngạo nghễ', isBest: false, nuance: 'Gợi thái độ kiêu ngạo, coi thường người khác.' }
    ],
    explanation: '"Hiền hậu" vừa tả nét mặt vừa bộc lộ cái tâm bao dung, nhân từ của người bà suốt đời hy sinh vì con cháu.',
    openObservationTip: 'Khi tả người thân cao tuổi, những từ như "hiền hậu, phúc hậu, ân cần, đôn hậu" luôn mang lại sự xúc động sâu lắng.'
  },
  {
    id: 'vw-7',
    challengeNumber: 7,
    title: 'Tiếng mưa rơi trên mái tôn',
    category: 'Âm thanh',
    prompt: 'Chọn từ tượng thanh diễn tả những giọt mưa đầu mùa rơi lộp độp trên mái nhà:',
    sentenceContext: 'Khi mây đen kéo tới, những hạt mưa đầu tiên rơi [...] trên mái hiên nhà.',
    options: [
      { id: 'vw-7a', word: 'lộp độp', isBest: true, nuance: 'Gợi từng giọt mưa to, nặng hạt gõ từng nhịp rõ rệt lúc bắt đầu mưa.' },
      { id: 'vw-7b', word: 'rì rào', isBest: false, nuance: 'Gợi tiếng gió thổi qua ngọn cây hoặc mưa phùn nhỏ nhẹ.' },
      { id: 'vw-7c', word: 'ầm ầm', isBest: false, nuance: 'Gợi tiếng sấm động lớn hoặc tiếng xe cộ, không hợp với giọt mưa đầu.' }
    ],
    explanation: '"Lộp độp" tái hiện rất chân thực âm thanh giọt mưa rào mùa hạ khi bắt đầu đổ xuống mái hiên nhà em.',
    openObservationTip: 'Mưa xuân thì "lất phất", mưa rào bắt đầu "lộp độp", khi mưa lớn "xối xả, rào rạt".'
  },
  {
    id: 'vw-8',
    challengeNumber: 8,
    title: 'Màu xanh của búp non đầu xuân',
    category: 'Màu sắc',
    prompt: 'Chọn từ miêu tả màu xanh tràn đầy sức sống của những chiếc mầm non mới nhú:',
    sentenceContext: 'Mùa xuân ấm áp trở về, trên những cành cây khẳng khiu nhú lên những mầm non [...] mỡ màng.',
    options: [
      { id: 'vw-8a', word: 'xanh biếc', isBest: true, nuance: 'Màu xanh non tơ, tươi sáng, mọng nước và tràn đầy nhựa sống thiên nhiên.' },
      { id: 'vw-8b', word: 'xanh xao', isBest: false, nuance: 'Gợi vẻ mặt gầy gò ốm yếu của con người, không dùng tả cây cối tốt tươi.' },
      { id: 'vw-8c', word: 'xanh lè', isBest: false, nuance: 'Màu xanh đậm gắt, thiếu thẩm mỹ trong miêu tả cảnh vật thiên nhiên.' }
    ],
    explanation: '"Xanh biếc" gợi lên màu xanh nõn nà, mỡ màng, tràn đầy sức sống mãnh liệt của chồi non mùa xuân.',
    openObservationTip: 'Lá non thì "xanh biếc, xanh nõn", lá bàng già thì "xanh thẫm", mặt nước hồ "xanh biếc, xanh ngắt".'
  },
  {
    id: 'vw-9',
    challengeNumber: 9,
    title: 'Dáng bước đi của chú rùa con',
    category: 'Dáng vẻ',
    prompt: 'Từ láy nào miêu tả đúng nhất sự chậm rãi, cẩn thận từng bước của chú rùa?',
    sentenceContext: 'Mang trên lưng chiếc mai nặng trịch, chú rùa nhỏ bước đi [...] từng bước trên bãi cát.',
    options: [
      { id: 'vw-9a', word: 'chậm chạp', isBest: true, nuance: 'Gợi sự nhẫn nại, chậm rãi nhưng kiên trì bước đi của loài rùa.' },
      { id: 'vw-9b', word: 'thoăn thoắt', isBest: false, nuance: 'Gợi bước đi nhanh nhẹn, khéo léo của sóc hoặc thỏ.' },
      { id: 'vw-9c', word: 'hớt hải', isBest: false, nuance: 'Gợi dáng vẻ hoảng hốt, sợ hãi vội vã.' }
    ],
    explanation: '"Chậm chạp" lột tả chính xác đặc tính kiên trì, từng bước vững chãi không nản lòng của rùa con.',
    openObservationTip: 'Mỗi con vật có nhịp bước đặc trưng: rùa "chậm chạp", thỏ "nhanh thoăn thoắt", vịt "lạch bạch".'
  },
  {
    id: 'vw-10',
    challengeNumber: 10,
    title: 'Ánh sao đêm lấp lánh trên trời',
    category: 'Ánh sáng',
    prompt: 'Chọn từ ngữ miêu tả ngàn vì sao sáng nhấp nháy trên bầu trời đêm thanh vắng:',
    sentenceContext: 'Bầu trời đêm không một gợn mây, muôn ngàn vì tinh tú tỏa sáng [...] như những hạt ngọc quý.',
    options: [
      { id: 'vw-10a', word: 'lấp lánh', isBest: true, nuance: 'Gợi ánh sáng nhỏ li ti nhấp nháy liên tục, rạng rỡ và huyền ảo.' },
      { id: 'vw-10b', word: 'chói lọi', isBest: false, nuance: 'Ánh sáng quá mạnh làm chói mắt, chỉ hợp với mặt trời giữa trưa.' },
      { id: 'vw-10c', word: 'ảm đạm', isBest: false, nuance: 'Gợi vẻ u tối, buồn tẻ, trái ngược với bầu trời đêm sao rực rỡ.' }
    ],
    explanation: '"Lấp lánh" mang lại cảm xúc kỳ diệu, gợi nhớ bầu trời tuổi thơ ngắm sao đêm của các em học sinh.',
    openObservationTip: 'Sao đêm thì "lấp lánh", đom đóm thì "lập lòe", trăng tròn thì "vằng vặc".'
  },
  {
    id: 'vw-11',
    challengeNumber: 11,
    title: 'Tiếng ve sầu mùa thi',
    category: 'Âm thanh',
    prompt: 'Từ ngữ nào diễn tả dàn đồng ca của loài ve ngân nga khắp sân trường mùa hè?',
    sentenceContext: 'Dưới những tán phượng vĩ đỏ rực, tiếng ve sầu cất lên [...] báo hiệu mùa thi đã đến.',
    options: [
      { id: 'vw-11a', word: 'râm ran', isBest: true, nuance: 'Gợi tiếng ve kêu rộn rã, vang vọng khắp các lùm cây kéo dài không ngớt.' },
      { id: 'vw-11b', word: 'chát chúa', isBest: false, nuance: 'Tiếng kim loại hoặc tiếng gõ đinh tai, không phải âm thanh của thiên nhiên hè.' },
      { id: 'vw-11c', word: 'thì thầm', isBest: false, nuance: 'Âm thanh quá nhỏ nhẹ kín đáo, không diễn tả được sự nhộn nhịp của mùa hè.' }
    ],
    explanation: '"Râm ran" gợi lên bản đại hợp xướng đặc trưng của tuổi học trò, gắn liền với tiếng ve và hoa phượng mùa hạ.',
    openObservationTip: 'Dùng từ gợi thanh theo mức độ: gió "thì thầm, rì rào", suối "róc rách", ve sầu "râm ran".'
  },
  {
    id: 'vw-12',
    challengeNumber: 12,
    title: 'Màu đỏ rực rỡ của hoa phượng',
    category: 'Màu sắc',
    prompt: 'Chọn từ ngữ giúp cành hoa phượng hè hiện lên rực cháy và tràn trề năng lượng:',
    sentenceContext: 'Bước vào tháng Năm, từng chùm hoa phượng bừng nở [...] như những ngọn lửa thắp sáng cả góc sân trường.',
    options: [
      { id: 'vw-12a', word: 'đỏ rực', isBest: true, nuance: 'Gợi sắc đỏ chói ngời, nồng nàn, thắp sáng cả một khoảng không gian hè.' },
      { id: 'vw-12b', word: 'đo đỏ', isBest: false, nuance: 'Sắc thái đỏ nhạt, nhẹ nhàng, không lột tả được vẻ rực rỡ mãnh liệt của hoa phượng.' },
      { id: 'vw-12c', word: 'đỏ ngầu', isBest: false, nuance: 'Màu nước lũ đục ngầu phù sa, mang cảm giác u ám.' }
    ],
    explanation: '"Đỏ rực" tạo điểm nhấn mạnh mẽ, gợi hình ảnh những đốm lửa bừng sáng của mùa hè tuổi học trò.',
    openObservationTip: 'Các từ láy đỏ: "đỏ thắm" (lá cờ), "đỏ rực" (hoa phượng, mặt trời), "đỏ ửng" (má em bé).'
  },
  {
    id: 'vw-13',
    challengeNumber: 13,
    title: 'Dáng mẹ thoăn thoắt gánh lúa',
    category: 'Dáng vẻ',
    prompt: 'Chọn từ láy tôn vinh sự nhanh nhẹn, khéo léo và cần cù của người mẹ trên đồng:',
    sentenceContext: 'Gánh đôi quang gánh trĩu nặng lúa vàng trên vai, mẹ bước đi [...] trên con đường làng quanh co.',
    options: [
      { id: 'vw-13a', word: 'thoăn thoắt', isBest: true, nuance: 'Gợi bước chân nhanh nhẹn, dẻo dai và dứt khoát của người quen lao động.' },
      { id: 'vw-13b', word: 'ì ạch', isBest: false, nuance: 'Gợi cảm giác chậm chạp, nặng nề, kiệt sức.' },
      { id: 'vw-13c', word: 'lập cập', isBest: false, nuance: 'Gợi sự run rẩy, bất an vì lạnh hoặc sợ hãi.' }
    ],
    explanation: '"Thoăn thoắt" ca ngợi vẻ đẹp chịu thương chịu khó, dẻo dai phi thường của người phụ nữ Việt Nam.',
    openObservationTip: 'Tay làm việc "thoăn thoắt", chân bước "nhanh nhẹn, thoăn thoắt" thể hiện kỹ năng thuần thục.'
  },
  {
    id: 'vw-14',
    challengeNumber: 14,
    title: 'Làn gió thu dịu mát',
    category: 'Thời tiết & Thiên nhiên',
    prompt: 'Chọn từ miêu tả làn gió heo may mùa thu mang lại sự dễ chịu cho con người:',
    sentenceContext: 'Xua tan đi cái nắng chói chang, ngọn gió thu [...] thổi qua làm lay động hàng liễu ven hồ.',
    options: [
      { id: 'vw-14a', word: 'mơn man', isBest: true, nuance: 'Gợi sự chạm nhẹ, êm ái, vỗ về vuốt ve làn da một cách dịu dàng.' },
      { id: 'vw-14b', word: 'hung hăng', isBest: false, nuance: 'Chỉ tính nết dữ dội, hung tợn của gió bão mùa đông.' },
      { id: 'vw-14c', word: 'lạnh buốt', isBest: false, nuance: 'Chỉ cái lạnh cắt da cắt thịt của mùa đông giá rét.' }
    ],
    explanation: '"Mơn man" là từ gợi cảm giác xúc giác tinh tế, làm nổi bật chất thơ và vẻ thanh khiết của mùa thu.',
    openObservationTip: 'Gió mùa xuân "ấm áp", gió thu "mơn man, hiu hiu", gió mùa hè "nóng rát", gió đông "lạnh buốt".'
  },
  {
    id: 'vw-15',
    challengeNumber: 15,
    title: 'Đôi mắt chú mèo con',
    category: 'Dáng vẻ',
    prompt: 'Từ nào miêu tả đôi mắt trong veo, tròn trịa đáng yêu của chú mèo con?',
    sentenceContext: 'Ngồi trong lòng em, chú mèo cưng mở to đôi mắt [...] như hai hòn bi ve xanh ngọc bích.',
    options: [
      { id: 'vw-15a', word: 'tròn xoe', isBest: true, nuance: 'Gợi hình khối tròn xoe, trong veo, ngây thơ và tinh nghịch.' },
      { id: 'vw-15b', word: 'thao láo', isBest: false, nuance: 'Gợi ánh mắt trợn to bất thường, thiếu thiện cảm.' },
      { id: 'vw-15c', word: 'lờ đờ', isBest: false, nuance: 'Gợi ánh mắt mệt mỏi, buồn ngủ, thiếu sức sống.' }
    ],
    explanation: '"Tròn xoe" kết hợp so sánh với "hòn bi ve" làm bừng sáng nét đáng yêu ngộ nghĩnh của chú mèo con.',
    openObservationTip: 'Mắt em bé "đen láy", mắt mèo "tròn xoe, xanh biếc", mắt người già "hiền từ, đôn hậu".'
  },
  {
    id: 'vw-16',
    challengeNumber: 16,
    title: 'Tiếng cười giòn giã của trẻ thơ',
    category: 'Âm thanh',
    prompt: 'Chọn từ tượng thanh diễn tả tiếng cười trong trẻo, sảng khoái và vô tư của các bạn nhỏ:',
    sentenceContext: 'Chơi đùa thỏa thích dưới bóng râm, các bạn nhỏ cất lên tiếng cười [...] rộn vang cả góc sân.',
    options: [
      { id: 'vw-16a', word: 'giòn giã', isBest: true, nuance: 'Gợi âm thanh tiếng cười trong trẻo, sảng khoái, không chút vướng bận lo âu.' },
      { id: 'vw-16b', word: 'khan đặc', isBest: false, nuance: 'Gợi giọng khàn do đau họng hoặc mệt mỏi.' },
      { id: 'vw-16c', word: 'the thé', isBest: false, nuance: 'Âm thanh chói gắt, the thé chói tai gây khó chịu.' }
    ],
    explanation: '"Giòn giã" là từ ngữ tuyệt đẹp thể hiện trọn vẹn niềm vui hồn nhiên, trong trẻo của tuổi thần tiên.',
    openObservationTip: 'Tiếng cười học trò: "giòn giã, giòn tan, trong trẻo, khúc khích, rôm rả".'
  },
  {
    id: 'vw-17',
    challengeNumber: 17,
    title: 'Màu trắng tinh khôi của đóa sen bạch liên',
    category: 'Màu sắc',
    prompt: 'Chọn từ gợi tả sắc trắng tinh khiết, thanh cao không một hạt bụi của bông hoa sen trắng:',
    sentenceContext: 'Giữa đầm lầy, đóa sen trắng vươn lên khoe sắc [...] thanh cao, tỏa hương ngào ngạt.',
    options: [
      { id: 'vw-17a', word: 'trắng muốt', isBest: true, nuance: 'Màu trắng mịn màng, tinh khiết, không vương chút bụi bẩn của đóa hoa sen.' },
      { id: 'vw-17b', word: 'trắng bệch', isBest: false, nuance: 'Màu trắng xanh xao, thiếu máu, không dùng miêu tả hoa cỏ thiên nhiên.' },
      { id: 'vw-17c', word: 'trăng trắng', isBest: false, nuance: 'Màu trắng nhờ nhợt, sắc thái yếu ớt.' }
    ],
    explanation: '"Trắng muốt" tôn vinh vẻ đẹp tinh khôi, trong sáng của đóa hoa biểu tượng cho tâm hồn người Việt.',
    openObservationTip: 'Sắc trắng: lông thỏ "trắng muốt, trắng nõn", trang giấy "trắng tinh", mây trời "trắng xốp".'
  },
  {
    id: 'vw-18',
    challengeNumber: 18,
    title: 'Ngọn đèn dầu le lói trong đêm',
    category: 'Ánh sáng',
    prompt: 'Chọn từ miêu tả ánh sáng mỏng manh của ngọn đèn dầu giữa đêm đông lạnh giá:',
    sentenceContext: 'Ngoài trời gió lạnh thấu xương, bên khung cửa sổ chỉ còn ngọn đèn dầu [...] trong đêm khuya.',
    options: [
      { id: 'vw-18a', word: 'le lói', isBest: true, nuance: 'Gợi ánh sáng nhỏ bé, lúc ẩn lúc hiện nhưng vẫn kiên cường tỏa ấm.' },
      { id: 'vw-18b', word: 'chói lòa', isBest: false, nuance: 'Ánh sáng quá mạnh, chỉ dùng cho tia chớp hay đèn pha công suất lớn.' },
      { id: 'vw-18c', word: 'rực rỡ', isBest: false, nuance: 'Ánh sáng chói lọi, muôn màu rực rỡ, không hợp với ngọn đèn dầu đơn độc.' }
    ],
    explanation: '"Le lói" khắc họa thành công không gian tĩnh mịch và gợi cảm giác ấm áp của ngọn đèn xua tan đêm lạnh.',
    openObservationTip: 'Quan sát ánh sáng theo nguồn phát: đèn đường "vàng rực", ngọn đèn dầu "le lói", ánh trăng "vằng vặc".'
  },
  {
    id: 'vw-19',
    challengeNumber: 19,
    title: 'Chú thỏ trắng nhút nhát',
    category: 'Dáng vẻ',
    prompt: 'Từ láy nào miêu tả dáng điệu sợ sệt nhưng rất đáng yêu của chú thỏ con khi có tiếng động?',
    sentenceContext: 'Nghe tiếng lá khô rơi xào xạc, chú thỏ trắng vểnh tai nghe ngóng rồi chạy [...] vào bụi cỏ rậm.',
    options: [
      { id: 'vw-19a', word: 'thoăn thoắt', isBest: true, nuance: 'Gợi động tác đôi chân nhỏ bé co lại và phóng vút đi một cách siêu tốc.' },
      { id: 'vw-19b', word: 'bước hụt', isBest: false, nuance: 'Diễn tả tai nạn bước hụt chân, không phải hành vi trốn chạy quen thuộc của thỏ.' },
      { id: 'vw-19c', word: 'uể oải', isBest: false, nuance: 'Gợi sự mệt mỏi, lười biếng, trái ngược với phản xạ nhạy bén của loài thỏ.' }
    ],
    explanation: '"Thoăn thoắt" đặc tả tốc độ phi thường và sự nhanh lẹ tuyệt vời của thỏ con khi gặp nguy hiểm.',
    openObservationTip: 'Khi tả phản xạ loài vật: chim "chao liệng nhịp nhàng", thỏ "phóng thoăn thoắt", khỉ "chuyền cành điêu luyện".'
  },
  {
    id: 'vw-20',
    challengeNumber: 20,
    title: 'Màu nước biển đảo Phú Quốc',
    category: 'Màu sắc',
    prompt: 'Chọn từ miêu tả sắc xanh sâu thẳm, trong lành của làn nước biển đảo quê hương:',
    sentenceContext: 'Dưới nắng vàng nhiệt đới, nước biển bãi Sao hiện lên một màu [...] nhìn thấu tận đáy cát trắng.',
    options: [
      { id: 'vw-20a', word: 'xanh ngắt', isBest: true, nuance: 'Gợi sắc xanh thẳm, thuần khiết và rộng lớn đến vô tận của đại dương.' },
      { id: 'vw-20b', word: 'xanh lè', isBest: false, nuance: 'Từ ngữ mang sắc thái chê bai, màu xanh không tự nhiên.' },
      { id: 'vw-20c', word: 'nhợt nhạt', isBest: false, nuance: 'Thiếu màu sắc, không phản ánh được vẻ đẹp tuyệt sắc của biển đảo.' }
    ],
    explanation: '"Xanh ngắt" là từ miêu tả độ sâu và độ trong của mặt nước đại dương bao la, gợi tình yêu biển đảo quê hương.',
    openObservationTip: 'Phân biệt màu nước: mặt hồ "xanh biếc", biển khơi "xanh ngắt", đầm nước "trong veo".'
  },
  {
    id: 'vw-21',
    challengeNumber: 21,
    title: 'Tình cảm nhớ thương gia đình',
    category: 'Cảm xúc',
    prompt: 'Từ láy nào diễn tả nỗi nhớ quê hương sâu sắc, cồn cào không nguôi trong lòng người đi xa?',
    sentenceContext: 'Những ngày đi học xa nhà, trong lòng em luôn trào dâng nỗi nhớ cha mẹ [...] khôn nguôi.',
    options: [
      { id: 'vw-21a', word: 'da diết', isBest: true, nuance: 'Gợi cảm giác nhớ nhung sâu nặng, day dứt, đong đầy trong tâm can.' },
      { id: 'vw-21b', word: 'thoang thoảng', isBest: false, nuance: 'Dùng tả mùi hương hoa nhẹ nhàng, không dùng tả nỗi nhớ tình cảm.' },
      { id: 'vw-21c', word: 'hờ hững', isBest: false, nuance: 'Thái độ thờ ơ, lãnh đạm, trái ngược hoàn toàn với tình yêu gia đình.' }
    ],
    explanation: '"Da diết" diễn tả chiều sâu thăm thẳm của nỗi nhớ thương chân thành, tạo nên sức lay động mạnh mẽ cho bài văn.',
    openObservationTip: 'Tả tình cảm sâu lắng: nhớ "da diết, khôn nguôi", yêu thương "tha thiết, vô bờ", biết ơn "sâu nặng".'
  },
  {
    id: 'vw-22',
    challengeNumber: 22,
    title: 'Tiếng lá rơi mùa thu',
    category: 'Âm thanh',
    prompt: 'Chọn từ tượng thanh diễn tả tiếng lá vàng khô khẽ chạm đất trong chiều thu tĩnh lặng:',
    sentenceContext: 'Một làn gió nhẹ lướt qua, chiếc lá vàng từ trên cành rơi [...] xuống mặt đường rợp bóng.',
    options: [
      { id: 'vw-22a', word: 'xào xạc', isBest: true, nuance: 'Gợi âm thanh lá khô cọ xát vào nhau nhè nhẹ, đặc trưng của mùa thu lá rụng.' },
      { id: 'vw-22b', word: 'rầm rầm', isBest: false, nuance: 'Tiếng va đập mạnh làm rung chuyển, không phải tiếng lá rơi nhẹ tênh.' },
      { id: 'vw-22c', word: 'ong óng', isBest: false, nuance: 'Từ miêu tả màu vàng óng ánh, không phải từ tượng thanh.' }
    ],
    explanation: '"Xào xạc" là thanh âm thi vị của mùa thu, đưa người đọc vào không gian thanh bình, êm ả của làng quê Việt.',
    openObservationTip: 'Tiếng lá khô rơi: "xào xạc, lao xao", tiếng gió lay cành: "xào xạc, vi vu".'
  },
  {
    id: 'vw-23',
    challengeNumber: 23,
    title: 'Đám mây mùa hè bồng bềnh',
    category: 'Dáng vẻ',
    prompt: 'Từ nào gợi tả dáng vẻ nhẹ nhàng, trôi lững lờ của những đám mây trắng trên trời xanh?',
    sentenceContext: 'Trên nền trời cao vời vợi, những đám mây trắng muốt [...] trôi như những đàn cừu non đang gặm cỏ.',
    options: [
      { id: 'vw-23a', word: 'bồng bềnh', isBest: true, nuance: 'Gợi cảm giác xốp nhẹ, nổi trôi nhè nhẹ giữa tầng không lộng gió.' },
      { id: 'vw-23b', word: 'nặng trĩu', isBest: false, nuance: 'Gợi mây giông đen kịt sắp đổ mưa, trái ngược với mây trắng thanh bình.' },
      { id: 'vw-23c', word: 'gập ghềnh', isBest: false, nuance: 'Dùng tả con đường đá gập ghềnh hiểm trở, không dùng cho mây trời.' }
    ],
    explanation: '"Bồng bềnh" kết hợp so sánh với "đàn cừu non" là hình ảnh miêu tả giàu trí tưởng tượng, rất đẹp cho văn lớp 4.',
    openObservationTip: 'Tả mây trời: mây trắng "bồng bềnh, lững lờ", mây đen "cuồn cuộn, vần vũ", mây hoàng hôn "rực rỡ".'
  },
  {
    id: 'vw-24',
    challengeNumber: 24,
    title: 'Hương thơm của bông hoa lài đêm',
    category: 'Cảm xúc',
    prompt: 'Chọn từ gợi tả hương hoa nhài thoang thoảng, thanh tao lan tỏa trong đêm thanh vắng:',
    sentenceContext: 'Đêm hè mát mẻ, vườn sau nhà tỏa ra một mùi hương hoa lài [...] ngây ngất lòng người.',
    options: [
      { id: 'vw-24a', word: 'ngào ngạt', isBest: true, nuance: 'Hương thơm đậm đà, thơm lừng lan tỏa khắp không gian vườn đêm.' },
      { id: 'vw-24b', word: 'nồng nặc', isBest: false, nuance: 'Mùi hôi thối hoặc mùi hóa chất khó chịu gây nhức đầu.' },
      { id: 'vw-24c', word: 'nhạt nhẽo', isBest: false, nuance: 'Không có vị hoặc không có mùi thơm gì, thiếu hấp dẫn.' }
    ],
    explanation: '"Ngào ngạt" đặc tả hương thơm quyến rũ, nồng đượm nhưng vẫn thanh khiết của loài hoa nhài thôn dã.',
    openObservationTip: 'Miêu tả khứu giác: hương thơm "ngào ngạt, thoang thoảng, dịu nhẹ, ngát hương, thơm lừng".'
  }
];
