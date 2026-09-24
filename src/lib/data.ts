export const company = {
  name: "KIM HƯNG",
  legalName: "CÔNG TY TNHH ĐẦU TƯ & PHÁT TRIỂN KIM HƯNG",
  tagline: "TECHNOLOGY & DIAGNOSTICS",
  hotline: "0909 115 115",
  hotlineHref: "tel:0909115115",
  email: "info@kimhung.vn",
  emailHref: "mailto:info@kimhung.vn",
  taxId: "0314273846",
  address:
    "Địa chỉ: 184/1A Lê Văn Sỹ, Phường 10, Quận Phú Nhuận, TP. Hồ Chí Minh, Việt Nam",
  mapsQuery:
    "184/1A Lê Văn Sỹ, Phường 10, Quận Phú Nhuận, Hồ Chí Minh, Việt Nam",
  facebook: "https://www.facebook.com",
  youtube: "https://www.youtube.com",
  description:
    "Nhà nhập khẩu và phân phối hàng đầu Việt Nam các giải pháp test ma túy nhanh, thiết bị đo nồng độ cồn và giải pháp an ninh chuyên dụng.",
};

export type CategoryId =
  | "que-thu-ma-tuy"
  | "may-do-nong-do-con"
  | "thiet-bi-an-ninh"
  | "vat-tu-tieu-hao";

export const categories: {
  id: CategoryId;
  name: string;
  shortName: string;
  href: string;
  image: string;
  description: string;
  listingIntro: string;
}[] = [
  {
    id: "que-thu-ma-tuy",
    name: "Que Thử Nhanh Ma Túy",
    shortName: "Que thử ma túy nhanh",
    href: "/san-pham?danh-muc=que-thu-ma-tuy",
    image: "/images/cat-drug.png",
    description: "Mẫu thử nước tiểu & nước bọt đạt chuẩn bộ y tế.",
    listingIntro:
      "Kim Hưng nhập khẩu và phân phối trực tiếp các dòng que thử nhanh ma túy đa chất (từ 4 đến 12 chất) dạng khay hoặc dạng cốc test đa liên chính hãng từ Mỹ và Châu Âu, có chứng chỉ FDA, CE và số đăng ký lưu hành y tế tại Việt Nam.",
  },
  {
    id: "may-do-nong-do-con",
    name: "Máy Đo Nồng Độ Cồn",
    shortName: "Máy đo nồng độ cồn",
    href: "/san-pham?danh-muc=may-do-nong-do-con",
    image: "/images/cat-alcohol.png",
    description: "Thiết bị cầm tay chuyên dụng có máy in mini.",
    listingIntro:
      "Phân phối máy đo nồng độ cồn chính hãng Alcolife, Alcolizer phục vụ lực lượng chức năng, doanh nghiệp vận tải và kiểm soát an toàn lao động.",
  },
  {
    id: "thiet-bi-an-ninh",
    name: "Thiết Bị An Ninh",
    shortName: "Thiết bị an ninh chuyên dụng",
    href: "/san-pham?danh-muc=thiet-bi-an-ninh",
    image: "/images/cat-security.png",
    description: "Cổng dò kim loại, máy dò cầm tay công nghiệp.",
    listingIntro:
      "Cung cấp cổng dò kim loại, máy dò cầm tay và thiết bị rà phá bom mìn cho nhà máy, sự kiện, biên phòng và an ninh công cộng.",
  },
  {
    id: "vat-tu-tieu-hao",
    name: "Vật Tư Tiêu Hao",
    shortName: "Vật tư tiêu hao đi kèm",
    href: "/san-pham?danh-muc=vat-tu-tieu-hao",
    image: "/images/cat-consumable.png",
    description: "Ống thổi, phễu gom cồn, giấy in nhiệt chính hãng.",
    listingIntro:
      "Vật tư tiêu hao chính hãng: ống thổi cồn, phễu gom mẫu, giấy in nhiệt và phụ kiện đi kèm thiết bị đo lường.",
  },
];

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  sku: string;
  categoryId: CategoryId;
  image: string;
  thumbs: string[];
  excerpt: string;
  listingExcerpt: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  benefits: string[];
  specs: { label: string; value: string }[];
  usage: string[];
  legal: string;
  certifications: string;
  categoryLabel: string;
};

export const products: Product[] = [
  {
    slug: "que-thu-nhanh-5-chat-doa",
    name: "Que Thử Nhanh 5 Chất Ma Túy DOA",
    shortName: "Que thử 5 chất DOA",
    sku: "DOA-05KH",
    categoryId: "que-thu-ma-tuy",
    image: "/images/product-doa.png",
    thumbs: [
      "/images/detail-main.png",
      "/images/detail-thumb-2.png",
      "/images/detail-thumb-3.png",
      "/images/detail-thumb-4.png",
    ],
    excerpt: "Phát hiện nhanh AMP, MET, THC, MOP, MDMA trong mẫu nước tiểu.",
    listingExcerpt: "Phát hiện nhanh AMP, MET, THC, MOP, MDMA trong nước tiểu.",
    featured: true,
    rating: 4.9,
    reviewCount: 128,
    description:
      "Bộ sản phẩm cốc test nước tiểu đa liên tích hợp 5 bảng kiểm phát hiện cùng lúc: AMP (Ma túy đá), MET (Hồng phiến), THC (Cần sa), MOP (Heroin/Morphine) và MDMA (Thuốc lắc). Thao tác đơn giản, kết quả rõ ràng trong 5 phút.",
    benefits: [
      "Không cần tiếp xúc trực tiếp hay nhỏ mẫu thử thủ công — Chỉ cần rót mẫu nước tiểu vào cốc.",
      "Vạch kết quả phát sáng huỳnh quang rõ ràng dưới ánh sáng phân tích chuyên dụng.",
      "Vỏ cốc được làm bằng nhựa chịu lực cấp y tế PP cao cấp, có nắp xoáy ren silicon chống rò rỉ tối đa.",
      "Được dán tem chính hãng từ nhà phân phối Kim Hưng và hướng dẫn tiếng Việt chuẩn quy chế.",
    ],
    specs: [
      { label: "Loại mẫu", value: "Nước tiểu" },
      { label: "Số chất phát hiện", value: "5 chất (AMP, MET, THC, MOP, MDMA)" },
      { label: "Thời gian đọc kết quả", value: "5 phút" },
      { label: "Công nghệ", value: "Miễn dịch sắc ký dòng chảy bên" },
      { label: "Nhiệt độ bảo quản", value: "2°C – 30°C" },
      { label: "Chứng nhận", value: "FDA, CE, ISO 13485, BYT Việt Nam" },
    ],
    usage: [
      "Mở niêm phong, kiểm tra hạn sử dụng và tem chính hãng Kim Hưng.",
      "Thu thập mẫu nước tiểu vào cốc thử, đậy nắp xoáy chặt.",
      "Đặt cốc trên bề mặt phẳng, đọc kết quả sau đúng 5 phút.",
      "Hai vạch (C và T) là âm tính; chỉ vạch C là dương tính; không có vạch C là không hợp lệ.",
    ],
    legal:
      "Sản phẩm đạt FDA, CE, ISO 13485 và giấy phép lưu hành Bộ Y Tế Việt Nam. Dùng cho cơ sở y tế, lực lượng chức năng và doanh nghiệp có nhu cầu kiểm tra nội bộ theo quy định.",
    certifications:
      "FDA, CE, ISO 13485, Giấy phép lưu hành Bộ Y Tế Việt Nam",
    categoryLabel: "Que thử ma túy nhanh nước tiểu",
  },
  {
    slug: "que-thu-ma-tuy-nuoc-bot-6-chat",
    name: "Que thử ma túy qua nước bọt 6 chất",
    shortName: "Que thử nước bọt 6 chất",
    sku: "SAL-06KH",
    categoryId: "que-thu-ma-tuy",
    image: "/images/product-saliva.png",
    thumbs: [
      "/images/product-saliva.png",
      "/images/related-saliva.png",
      "/images/list-saliva.png",
      "/images/detail-thumb-2.png",
    ],
    excerpt: "Thử mẫu nước bọt tiện lợi, không xâm lấn, kết quả trong 5 phút.",
    listingExcerpt: "Thử mẫu nước bọt nhanh gọn, kết quả khách quan tuyệt đối.",
    featured: true,
    rating: 4.8,
    reviewCount: 86,
    description:
      "Que thử nước bọt 6 chất giúp kiểm tra nhanh tại hiện trường mà không cần phòng xét nghiệm. Không xâm lấn, thao tác đơn giản, phù hợp lực lượng chức năng và doanh nghiệp.",
    benefits: [
      "Thu mẫu nước bọt nhanh, không cần nước tiểu.",
      "Phát hiện 6 nhóm chất phổ biến trong một lần thử.",
      "Kết quả rõ trong 5 phút, dễ mang theo hiện trường.",
      "Tem chính hãng Kim Hưng, hướng dẫn tiếng Việt.",
    ],
    specs: [
      { label: "Loại mẫu", value: "Nước bọt" },
      { label: "Số chất phát hiện", value: "6 chất" },
      { label: "Thời gian đọc kết quả", value: "5 phút" },
      { label: "Hình thức", value: "Que / khay cầm tay" },
    ],
    usage: [
      "Lấy que thấm mẫu nước bọt theo hướng dẫn.",
      "Đặt que vào khay thử, chờ 5 phút.",
      "Đọc vạch C/T theo bảng diễn giải kèm theo.",
    ],
    legal: "Sản phẩm nhập khẩu chính ngạch, có chứng chỉ CE/FDA tùy lô hàng.",
    certifications: "CE, FDA, BYT Việt Nam",
    categoryLabel: "Que thử ma túy nhanh nước bọt",
  },
  {
    slug: "que-test-amphetamine",
    name: "Que test nhanh Amphetamine đơn chất",
    shortName: "Que test Amphetamine",
    sku: "AMP-01KH",
    categoryId: "que-thu-ma-tuy",
    image: "/images/list-amp.png",
    thumbs: ["/images/list-amp.png", "/images/related-amp.png"],
    excerpt: "Thử nhanh chất kích thích nhóm hồng phiến, ma túy đá.",
    listingExcerpt: "Thử nhanh chất kích thích nhóm hồng phiến, ma túy đá.",
    featured: false,
    rating: 4.7,
    reviewCount: 41,
    description:
      "Que test đơn chất Amphetamine dùng để sàng lọc nhanh nhóm kích thích d-amphetamine trong mẫu nước tiểu.",
    benefits: [
      "Chuyên biệt nhóm AMP, độ nhạy cao.",
      "Giá thành phù hợp xét nghiệm số lượng lớn.",
      "Kết quả sắc nét, dễ diễn giải.",
    ],
    specs: [
      { label: "Loại mẫu", value: "Nước tiểu" },
      { label: "Chất phát hiện", value: "Amphetamine (AMP)" },
      { label: "Thời gian đọc kết quả", value: "5 phút" },
    ],
    usage: [
      "Nhúng que vào mẫu theo vạch đánh dấu.",
      "Đặt ngang, đọc kết quả sau 5 phút.",
    ],
    legal: "Dùng cho sàng lọc, không thay thế xét nghiệm khẳng định phòng lab.",
    certifications: "CE, FDA",
    categoryLabel: "Que thử ma túy nhanh nước tiểu",
  },
  {
    slug: "khay-thu-thc",
    name: "Khay thử phát hiện ma túy cần sa THC",
    shortName: "Khay thử THC",
    sku: "THC-01KH",
    categoryId: "que-thu-ma-tuy",
    image: "/images/list-thc.png",
    thumbs: ["/images/list-thc.png", "/images/product-doa.png"],
    excerpt: "Kiểm tra định lượng THC cực nhạy trong mẫu nước tiểu.",
    listingExcerpt: "Kiểm tra định lượng THC cực nhạy trong mẫu nước tiểu.",
    featured: false,
    rating: 4.6,
    reviewCount: 33,
    description:
      "Khay thử THC phát hiện chất chuyển hóa cần sa trong nước tiểu với ngưỡng cắt chuẩn quốc tế.",
    benefits: [
      "Độ nhạy cao với THC-COOH.",
      "Khay ổn định, dễ vận chuyển.",
      "Phù hợp xét nghiệm định kỳ doanh nghiệp.",
    ],
    specs: [
      { label: "Loại mẫu", value: "Nước tiểu" },
      { label: "Chất phát hiện", value: "THC (Cần sa)" },
      { label: "Ngưỡng cắt", value: "50 ng/mL" },
    ],
    usage: [
      "Nhỏ mẫu vào giếng thử.",
      "Đọc kết quả sau 5 phút, không quá 10 phút.",
    ],
    legal: "Sản phẩm chẩn đoán in-vitro, tuân thủ hướng dẫn nhà sản xuất.",
    certifications: "CE, FDA",
    categoryLabel: "Que thử ma túy nhanh nước tiểu",
  },
  {
    slug: "coc-test-12-chat",
    name: "Cốc test nhanh ma túy 12 chất tổng hợp",
    shortName: "Cốc test 12 chất",
    sku: "CUP-12KH",
    categoryId: "que-thu-ma-tuy",
    image: "/images/list-cup12.png",
    thumbs: ["/images/list-cup12.png", "/images/related-cup.png"],
    excerpt: "Giải pháp toàn diện nhất cho các cơ sở cai nghiện và kiểm tra nội bộ.",
    listingExcerpt:
      "Giải pháp toàn diện nhất cho các cơ sở cai nghiện và kiểm tra nội bộ.",
    featured: false,
    rating: 4.8,
    reviewCount: 54,
    description:
      "Cốc đa chức năng 12 chất kèm nhiệt kế, phù hợp cơ sở cai nghiện, bệnh viện và kiểm tra nội bộ quy mô lớn.",
    benefits: [
      "Phát hiện 12 nhóm chất trong một cốc.",
      "Tích hợp nhiệt kế chống gian lận mẫu.",
      "Nắp chống rò rỉ, an toàn nhân viên y tế.",
    ],
    specs: [
      { label: "Loại mẫu", value: "Nước tiểu" },
      { label: "Số chất phát hiện", value: "12 chất" },
      { label: "Tiện ích", value: "Nhiệt kế tích hợp" },
    ],
    usage: [
      "Thu mẫu vào cốc, đậy nắp.",
      "Kiểm tra nhiệt độ mẫu, đọc panel sau 5 phút.",
    ],
    legal: "Nhập khẩu chính ngạch, có giấy phép lưu hành tùy mã hàng.",
    certifications: "FDA, CE, ISO 13485",
    categoryLabel: "Que thử ma túy nhanh nước tiểu",
  },
  {
    slug: "que-test-morphine-mop",
    name: "Que test nhanh Morphine/Heroin MOP",
    shortName: "Que test Morphine MOP",
    sku: "MOP-01KH",
    categoryId: "que-thu-ma-tuy",
    image: "/images/list-mop.png",
    thumbs: ["/images/list-mop.png", "/images/related-mop.png"],
    excerpt: "Phát hiện nhanh nhóm chất gây nghiện gốc thuốc phiện.",
    listingExcerpt: "Phát hiện nhanh nhóm chất gây nghiện gốc thuốc phiện.",
    featured: false,
    rating: 4.7,
    reviewCount: 29,
    description:
      "Que test MOP dùng sàng lọc morphine/heroin và nhóm opiate trong nước tiểu.",
    benefits: [
      "Chuyên biệt nhóm thuốc phiện.",
      "Thao tác đơn giản, chi phí thấp.",
      "Kết quả rõ trong 5 phút.",
    ],
    specs: [
      { label: "Loại mẫu", value: "Nước tiểu" },
      { label: "Chất phát hiện", value: "Morphine / Opiate (MOP)" },
      { label: "Ngưỡng cắt", value: "300 ng/mL" },
    ],
    usage: [
      "Nhúng que đến vạch max.",
      "Đọc kết quả sau 5 phút.",
    ],
    legal: "Dùng cho sàng lọc y tế và kiểm soát nội bộ.",
    certifications: "CE, FDA",
    categoryLabel: "Que thử ma túy nhanh nước tiểu",
  },
  {
    slug: "may-do-nong-do-con-alcolife-f5",
    name: "Máy Đo Nồng Độ Cồn Alcolife F5",
    shortName: "Alcolife F5",
    sku: "ALC-F5",
    categoryId: "may-do-nong-do-con",
    image: "/images/product-alcolife.png",
    thumbs: ["/images/product-alcolife.png", "/images/cat-alcohol.png"],
    excerpt: "Độ chính xác cao, thời gian đo nhanh, tích hợp máy in không dây.",
    listingExcerpt: "Độ chính xác cao, thời gian đo nhanh, tích hợp máy in không dây.",
    featured: true,
    rating: 4.9,
    reviewCount: 72,
    description:
      "Máy đo nồng độ cồn Alcolife F5 cầm tay, đo nhanh, in kết quả không dây — phù hợp CSGT và doanh nghiệp vận tải.",
    benefits: [
      "Cảm biến điện hóa chính xác.",
      "In biên bản tại chỗ.",
      "Hiệu chuẩn định kỳ tại Kim Hưng.",
    ],
    specs: [
      { label: "Hãng", value: "Alcolife (Đức)" },
      { label: "Cảm biến", value: "Điện hóa" },
      { label: "In ấn", value: "Máy in không dây" },
    ],
    usage: [
      "Bật máy, gắn ống thổi mới.",
      "Yêu cầu đối tượng thổi đều đến tín hiệu.",
      "In hoặc lưu kết quả.",
    ],
    legal: "Thiết bị đo lường, nên hiệu chuẩn định kỳ theo quy định.",
    certifications: "CE, chuẩn đo lường",
    categoryLabel: "Máy đo nồng độ cồn",
  },
  {
    slug: "may-do-nong-do-con-prodigy-2",
    name: "Máy Đo Nồng Độ Cồn Prodigy 2",
    shortName: "Prodigy 2",
    sku: "ALC-PG2",
    categoryId: "may-do-nong-do-con",
    image: "/images/product-prodigy.png",
    thumbs: ["/images/product-prodigy.png", "/images/cat-alcohol.png"],
    excerpt: "Thiết bị của hãng Alcolizer Úc tiêu chuẩn cảnh sát giao thông.",
    listingExcerpt: "Thiết bị của hãng Alcolizer Úc tiêu chuẩn cảnh sát giao thông.",
    featured: true,
    rating: 4.9,
    reviewCount: 61,
    description:
      "Alcolizer Prodigy 2 là thiết bị chuẩn cảnh sát giao thông Úc, độ bền cao, phù hợp điều kiện thời tiết khắc nghiệt.",
    benefits: [
      "Tiêu chuẩn lực lượng chức năng Úc.",
      "Bền bỉ ngoài trời.",
      "Hỗ trợ hiệu chuẩn khí chuẩn quốc tế.",
    ],
    specs: [
      { label: "Hãng", value: "Alcolizer Technology (Úc)" },
      { label: "Model", value: "Prodigy 2" },
      { label: "Ứng dụng", value: "CSGT / doanh nghiệp" },
    ],
    usage: [
      "Khởi động và tự kiểm.",
      "Gắn ống thổi, thực hiện phép đo.",
      "Xuất biên bản theo quy trình đơn vị.",
    ],
    legal: "Khuyến nghị hiệu chuẩn hàng năm tại trung tâm kỹ thuật Kim Hưng.",
    certifications: "Chuẩn Úc, CE",
    categoryLabel: "Máy đo nồng độ cồn",
  },
  {
    slug: "cong-do-kim-loai-security-gate",
    name: "Cổng Dò Kim Loại Security Gate",
    shortName: "Security Gate",
    sku: "SEC-GATE6",
    categoryId: "thiet-bi-an-ninh",
    image: "/images/product-gate.png",
    thumbs: ["/images/product-gate.png", "/images/cat-security.png"],
    excerpt: "6 vùng dò độc lập, báo động bằng âm thanh và đèn LED siêu sáng.",
    listingExcerpt: "6 vùng dò độc lập, báo động bằng âm thanh và đèn LED siêu sáng.",
    featured: true,
    rating: 4.8,
    reviewCount: 38,
    description:
      "Cổng dò kim loại 6 vùng độc lập, báo động âm thanh và LED, dùng cho nhà máy, sự kiện, tòa nhà.",
    benefits: [
      "6 vùng dò độc lập.",
      "LED siêu sáng, còi báo rõ.",
      "Lắp đặt và bảo trì bởi kỹ thuật Kim Hưng.",
    ],
    specs: [
      { label: "Số vùng dò", value: "6 vùng" },
      { label: "Báo động", value: "Âm thanh + LED" },
      { label: "Ứng dụng", value: "Nhà máy, sự kiện, an ninh" },
    ],
    usage: [
      "Lắp cổng theo hướng dẫn kỹ thuật.",
      "Hiệu chỉnh độ nhạy theo môi trường.",
      "Người qua cổng đứng thẳng, bỏ vật kim loại theo quy định.",
    ],
    legal: "Thiết bị an ninh công nghiệp, lắp đặt theo hiện trường.",
    certifications: "CE, ISO",
    categoryLabel: "Thiết bị an ninh chuyên dụng",
  },
  {
    slug: "thiet-bi-ra-bom-min-cam-tay",
    name: "Thiết bị rà bom mìn cầm tay",
    shortName: "Máy rà bom mìn",
    sku: "SEC-HHD",
    categoryId: "thiet-bi-an-ninh",
    image: "/images/product-bomb.png",
    thumbs: ["/images/product-bomb.png", "/images/cat-security.png"],
    excerpt: "Độ nhạy cực cao dùng cho quân đội, biên phòng, sự kiện.",
    listingExcerpt: "Độ nhạy cực cao dùng cho quân đội, biên phòng, sự kiện.",
    featured: true,
    rating: 4.8,
    reviewCount: 22,
    description:
      "Máy dò cầm tay độ nhạy cao phục vụ quân đội, biên phòng và an ninh sự kiện.",
    benefits: [
      "Độ nhạy cao, phát hiện kim loại nhỏ.",
      "Thiết kế cầm tay, pin lâu.",
      "Phù hợp tuần tra và cổng kiểm soát.",
    ],
    specs: [
      { label: "Loại", value: "Handheld detector" },
      { label: "Ứng dụng", value: "Quân đội, biên phòng, sự kiện" },
    ],
    usage: [
      "Bật máy, kiểm tra âm báo.",
      "Quét đều quanh đối tượng / hành lý.",
    ],
    legal: "Cung cấp cho đơn vị có chức năng an ninh, quốc phòng.",
    certifications: "CE",
    categoryLabel: "Thiết bị an ninh chuyên dụng",
  },
  {
    slug: "ong-thoi-con-chinh-hang",
    name: "Ống thổi máy đo nồng độ cồn",
    shortName: "Ống thổi cồn",
    sku: "ACC-TUBE",
    categoryId: "vat-tu-tieu-hao",
    image: "/images/cat-consumable.png",
    thumbs: ["/images/cat-consumable.png"],
    excerpt: "Ống thổi dùng một lần, đạt chuẩn kỹ thuật không sai số.",
    listingExcerpt: "Ống thổi dùng một lần, đạt chuẩn kỹ thuật không sai số.",
    featured: false,
    rating: 4.9,
    reviewCount: 90,
    description:
      "Ống thổi chính hãng dùng một lần cho máy đo nồng độ cồn, tránh nhiễm chéo mẫu.",
    benefits: [
      "Dùng một lần, vệ sinh.",
      "Tương thích Alcolife / Alcolizer.",
      "Bán theo lô số lượng lớn.",
    ],
    specs: [
      { label: "Loại", value: "Vật tư tiêu hao" },
      { label: "Đóng gói", value: "Theo lô" },
    ],
    usage: ["Gắn ống mới cho mỗi lần đo.", "Hủy sau khi sử dụng."],
    legal: "Vật tư đi kèm thiết bị đo lường.",
    certifications: "Theo hãng máy",
    categoryLabel: "Vật tư tiêu hao đi kèm",
  },
  {
    slug: "giay-in-nhiet-may-do-con",
    name: "Giấy in nhiệt máy đo nồng độ cồn",
    shortName: "Giấy in nhiệt",
    sku: "ACC-PAPER",
    categoryId: "vat-tu-tieu-hao",
    image: "/images/cat-consumable.png",
    thumbs: ["/images/cat-consumable.png"],
    excerpt: "Giấy in nhiệt chính hãng cho biên bản đo cồn tại hiện trường.",
    listingExcerpt: "Giấy in nhiệt chính hãng cho biên bản đo cồn tại hiện trường.",
    featured: false,
    rating: 4.8,
    reviewCount: 44,
    description:
      "Cuộn giấy in nhiệt dùng cho máy in mini trên thiết bị đo nồng độ cồn.",
    benefits: ["Chữ in rõ, bền.", "Đúng khổ máy in chính hãng."],
    specs: [
      { label: "Loại", value: "Giấy nhiệt" },
      { label: "Ứng dụng", value: "Máy đo cồn có in" },
    ],
    usage: ["Lắp cuộn giấy đúng chiều phủ nhiệt."],
    legal: "Vật tư tiêu hao.",
    certifications: "Theo hãng máy",
    categoryLabel: "Vật tư tiêu hao đi kèm",
  },
];

export const stats = [
  { value: 10, suffix: "+", unit: "Năm", label: "Kinh Nghiệm Phân Phối" },
  { value: 500, suffix: "+", unit: "Doanh Nghiệp", label: "Tin Tưởng Hợp Tác" },
  { value: 50, suffix: "+", unit: "Sản Phẩm", label: "Đạt Chuẩn Bộ Y Tế" },
  { value: 100, suffix: "%", unit: "", label: "Bảo Hành Chính Hãng" },
];

export const certifications = ["FDA", "CE", "ISO 13485", "Bộ Y Tế VN"];

export type PriceTierId = "duoi-1tr" | "1-5tr" | "tren-5tr" | "lien-he";

export const priceRanges: { id: PriceTierId; label: string }[] = [
  { id: "duoi-1tr", label: "Dưới 1,000,000đ" },
  { id: "1-5tr", label: "1,000,000đ - 5,000,000đ" },
  { id: "tren-5tr", label: "Trên 5,000,000đ" },
  { id: "lien-he", label: "Liên hệ báo giá thương mại" },
];

export const brands = [
  "Abbott Diagnostics (Mỹ)",
  "Alcolizer Technology (Úc)",
  "Alcolife (Đức)",
  "SecurityGate Inc.",
];

export const productCommerce: Record<
  string,
  { brand: string; priceTier: PriceTierId }
> = {
  "que-thu-nhanh-5-chat-doa": {
    brand: "Abbott Diagnostics (Mỹ)",
    priceTier: "1-5tr",
  },
  "que-thu-ma-tuy-nuoc-bot-6-chat": {
    brand: "Abbott Diagnostics (Mỹ)",
    priceTier: "1-5tr",
  },
  "que-test-amphetamine": {
    brand: "Abbott Diagnostics (Mỹ)",
    priceTier: "duoi-1tr",
  },
  "khay-thu-thc": { brand: "Abbott Diagnostics (Mỹ)", priceTier: "duoi-1tr" },
  "coc-test-12-chat": { brand: "Abbott Diagnostics (Mỹ)", priceTier: "1-5tr" },
  "que-test-morphine-mop": {
    brand: "Abbott Diagnostics (Mỹ)",
    priceTier: "duoi-1tr",
  },
  "may-do-nong-do-con-alcolife-f5": {
    brand: "Alcolife (Đức)",
    priceTier: "tren-5tr",
  },
  "may-do-nong-do-con-prodigy-2": {
    brand: "Alcolizer Technology (Úc)",
    priceTier: "tren-5tr",
  },
  "cong-do-kim-loai-security-gate": {
    brand: "SecurityGate Inc.",
    priceTier: "lien-he",
  },
  "thiet-bi-ra-bom-min-cam-tay": {
    brand: "SecurityGate Inc.",
    priceTier: "lien-he",
  },
  "ong-thoi-con-chinh-hang": {
    brand: "Alcolife (Đức)",
    priceTier: "duoi-1tr",
  },
  "giay-in-nhiet-may-do-con": {
    brand: "Alcolizer Technology (Úc)",
    priceTier: "duoi-1tr",
  },
};

export const partners = [
  "TTYT Dự phòng Quận 1",
  "Công an GT Đồng Nai",
  "Nhà máy Thép Việt-Úc",
  "Bệnh viện đa khoa tỉnh",
  "Cảng Tân Cảng",
  "Doanh nghiệp vận tải Bắc Nam",
  "Trung tâm cai nghiện",
  "Ban an ninh KCN",
];

export const processSteps = [
  {
    step: "01",
    title: "Tư vấn nhu cầu",
    description:
      "Khảo sát quy mô đơn vị, loại mẫu thử và yêu cầu pháp lý để chọn đúng danh mục.",
  },
  {
    step: "02",
    title: "Báo giá & hồ sơ thầu",
    description:
      "Báo giá sỉ, CO/CQ, giấy phép lưu hành và bộ hồ sơ đấu thầu y tế đầy đủ.",
  },
  {
    step: "03",
    title: "Giao hàng chuẩn y tế",
    description:
      "Đóng gói kiểm soát nhiệt, giao toàn quốc, bàn giao biên bản và hướng dẫn.",
  },
  {
    step: "04",
    title: "Hiệu chuẩn & bảo trì",
    description:
      "Hiệu chuẩn định kỳ, sửa chữa linh kiện chính hãng và hỗ trợ kỹ thuật 24/7.",
  },
];

export const cases = [
  {
    metric: "5 năm",
    title: "Sàng lọc ổn định tại TTYT",
    org: "Trung tâm Y tế Dự phòng Quận 1",
    result: "Chuỗi cung ứng que thử đa chất không gián đoạn, kết quả kiểm định đều.",
  },
  {
    metric: "24/7",
    title: "Máy đo cồn cho lực lượng GT",
    org: "Công an Giao thông tỉnh Đồng Nai",
    result: "Thiết bị bền ngoài trời, in biên bản tại chỗ, hiệu chuẩn đúng hạn.",
  },
  {
    metric: "6 vùng",
    title: "An ninh nhà máy thép",
    org: "Nhà máy Thép Việt-Úc",
    result: "Cổng dò + test nội bộ giúp siết kỷ luật ra vào và an toàn lao động.",
  },
];

export const faqs = [
  {
    q: "Sản phẩm có giấy phép Bộ Y Tế không?",
    a: "Các dòng que thử và thiết bị chẩn đoán Kim Hưng phân phối có CO, CQ, chứng chỉ FDA/CE/ISO và giấy phép lưu hành tại Việt Nam theo từng mã hàng.",
  },
  {
    q: "Có bán lẻ hay chỉ bán sỉ / thầu?",
    a: "Ưu tiên đại lý, bệnh viện, lực lượng chức năng và đơn vị thầu. Vẫn hỗ trợ đơn vị cần số lượng mẫu để đánh giá trước khi ký hợp đồng.",
  },
  {
    q: "Máy đo cồn hiệu chuẩn bao lâu một lần?",
    a: "Khuyến nghị hiệu chuẩn định kỳ 6–12 tháng bằng khí chuẩn, tùy mật độ sử dụng và yêu cầu pháp lý của đơn vị.",
  },
  {
    q: "Thời gian giao hàng toàn quốc?",
    a: "Hàng sẵn kho tại TP.HCM thường 1–3 ngày. Đơn thầu lớn sẽ chốt lịch theo hợp đồng và điều kiện bảo quản y tế.",
  },
];

export const services = [
  {
    icon: "settings",
    title: "Kiểm định & Hiệu chuẩn hàng năm",
    description:
      "Hiệu chuẩn máy đo nồng độ cồn định kỳ bằng khí chuẩn quốc tế, cấp chứng nhận đạt chuẩn đo lường.",
  },
  {
    icon: "hammer",
    title: "Sửa chữa & Thay thế linh kiện",
    description:
      "Sửa chữa bo mạch, cảm biến nồng độ cồn, pin chuyên dụng chính hãng của các thương hiệu hàng đầu.",
  },
  {
    icon: "layers",
    title: "Cung cấp vật tư tiêu hao chính hãng",
    description:
      "Cung cấp ống thổi cồn, phễu cồn, giấy nhiệt số lượng lớn đạt tiêu chuẩn kỹ thuật không sai số.",
  },
];

export const reasons = [
  {
    title: "Sản phẩm chính hãng 100%",
    description:
      "Nhập khẩu trực tiếp từ Úc, Mỹ, Châu Âu đầy đủ CO, CQ và giấy phép của Bộ Y Tế.",
  },
  {
    title: "Đội ngũ kỹ thuật chuyên nghiệp",
    description:
      "Kỹ sư được đào tạo chuyên sâu bởi hãng sản xuất, có khả năng hiệu chuẩn chính xác.",
  },
  {
    title: "Giao hàng toàn quốc",
    description:
      "Vận chuyển nhanh chóng, đóng gói đạt chuẩn y tế phòng tránh ảnh hưởng nhiệt độ.",
  },
  {
    title: "Hỗ trợ kỹ thuật 24/7",
    description:
      "Luôn sẵn sàng hỗ trợ cài đặt, vận hành và xử lý lỗi kỹ thuật khẩn cấp cho doanh nghiệp.",
  },
];

export const testimonials = [
  {
    quote:
      "Chúng tôi đã tin dùng sản phẩm que thử ma túy của Kim Hưng suốt 5 năm qua. Chất lượng kiểm định cực kỳ ổn định, giao hàng nhanh chóng.",
    name: "Bác sĩ Nguyễn Văn Minh",
    org: "Trung tâm Y tế Dự phòng Quận 1",
  },
  {
    quote:
      "Thiết bị đo cồn do Kim Hưng cung cấp đạt độ bền cao dưới thời tiết khắc nghiệt, kết quả đo chính xác tuyệt đối, hỗ trợ kỹ thuật 24/7.",
    name: "Đại úy Lê Hoàng Nam",
    org: "Công an Giao thông Tỉnh Đồng Nai",
  },
  {
    quote:
      "Giải pháp cổng dò an ninh và máy test nhanh định kỳ giúp kiểm soát kỷ luật an toàn lao động hiệu quả. Rất hài lòng với dịch vụ.",
    name: "Anh Trần Ngọc Anh - Trưởng ban An ninh",
    org: "Nhà máy Thép Việt-Úc",
  },
];

export const posts = [
  {
    slug: "huong-dan-phan-biet-chat-ma-tuy-moi",
    date: "15/02/2026",
    title: "Hướng dẫn phân biệt các chất ma túy mới qua que thử đa chất",
    excerpt:
      "Các loại ma túy tổng hợp mới xuất hiện đòi hỏi phương pháp test nhạy bén hơn. Cùng Kim Hưng tìm hiểu giải pháp.",
    image: "/images/blog-1.png",
  },
  {
    slug: "tam-quan-trong-hieu-chuan-may-do-con",
    date: "10/02/2026",
    title: "Tầm quan trọng của việc hiệu chuẩn máy đo cồn định kỳ",
    excerpt:
      "Sau bao lâu thì cần hiệu chuẩn lại cảm biến đo nồng độ cồn để đảm bảo độ chính xác pháp lý?",
    image: "/images/blog-2.png",
  },
  {
    slug: "tieu-chuan-cong-do-kim-loai-nha-may",
    date: "05/02/2026",
    title: "Tiêu chuẩn kỹ thuật cổng dò kim loại cho nhà máy sản xuất linh kiện",
    excerpt:
      "Chống thất thoát tài sản bằng hệ thống an ninh tích hợp kiểm soát ra vào chuyên nghiệp.",
    image: "/images/blog-3.png",
  },
];

export const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Sản phẩm", href: "/san-pham", dropdown: true },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId?: CategoryId) {
  if (!categoryId) return products;
  return products.filter((p) => p.categoryId === categoryId);
}

export function getRelatedProducts(slug: string, limit = 4) {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  return products
    .filter((p) => p.slug !== slug && p.categoryId === current.categoryId)
    .concat(products.filter((p) => p.slug !== slug))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, limit);
}

export function getCategory(id: string | undefined) {
  return categories.find((c) => c.id === id);
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getCommerce(slug: string) {
  return productCommerce[slug];
}
