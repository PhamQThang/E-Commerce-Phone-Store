const products = [
  {
    id: "iphone-16-pro-max",
    images: ["/image/ip.png", "/image/ip.png", "/image/ip.png"],
    category: "Iphone",
    title: "Iphone 16 Pro Max 256GB",
    oldPrice: "33,500,000",
    newPrice: "32,500,000",
    rating: 5,
    colors: ["Silver", "Graphite", "Gold", "Sierra Blue"],
    storageOptions: ["128GB", "256GB", "512GB", "1TB"],
    description: {
      text: "iPhone 15 Pro Max 512GB là ấn phẩm smartphone mới của Apple, nổi bật với bộ nhớ trong lên đến 512GB, cung cấp khả năng ghi nhớ, lưu trữ không giới hạn. Bên cạnh đó, thế hệ iPhone mới này cũng đặc biệt mang tới những trải nghiệm siêu mượt mà trong mọi tác vụ nhờ được kế thừa sức mạnh xử lý từ con chip A17 Pro. Chưa hết, máy còn đi kèm với cụm ba camera sau 48MP hỗ trợ chụp đêm và quay phim chuyên nghiệp, giúp nâng tầm khả năng nhiếp ảnh của người dùng.",
      images: ["/image/ip.png", "/image/ip.png"],
    },
    specifications: [
      {
        category: "Màn hình",
        name: "Công nghệ",
        value: "Super Retina XDR OLED",
      },
      { category: "Màn hình", name: "Kích thước", value: "6.7 inches" },
      { category: "Màn hình", name: "Tần số quét", value: "120Hz" },
      { category: "Hiệu suất", name: "Chipset", value: "Apple A18 Bionic" },
      { category: "Hiệu suất", name: "RAM", value: "8GB" },
      { category: "Camera", name: "Camera chính", value: "48MP, f/1.78" },
      { category: "Camera", name: "Camera góc rộng", value: "12MP, f/2.2" },
      { category: "Pin", name: "Dung lượng", value: "4422 mAh" },
      {
        category: "Sạc",
        name: "Công nghệ",
        value: "Sạc nhanh 20W, sạc không dây 15W",
      },
    ],
  },
  {
    id: "apple-airpods-max",
    images: ["/image/airpods1.png", "/image/airpods2.png"],
    category: "AirPods",
    title: "Apple AirPods Max",
    oldPrice: "14,500,000",
    newPrice: "12,900,000",
    rating: 4,
    colors: ["Space Gray", "Silver", "Green", "Pink", "Sky Blue"],
    storageOptions: [], // Không có bộ nhớ vì đây là tai nghe
    description:
      "Tai nghe không dây cao cấp với công nghệ chống ồn chủ động, âm thanh không gian và thiết kế sang trọng.",
    specifications: [
      {
        category: "Âm thanh",
        name: "Công nghệ",
        value: "Spatial Audio, Adaptive EQ",
      },
      {
        category: "Chống ồn",
        name: "ANC",
        value: "Có, Active Noise Cancelling",
      },
      { category: "Kết nối", name: "Bluetooth", value: "Bluetooth 5.0" },
      {
        category: "Thời lượng pin",
        name: "Nghe nhạc",
        value: "Lên đến 20 giờ",
      },
      { category: "Sạc", name: "Cổng sạc", value: "Lightning" },
      { category: "Trọng lượng", name: "Khối lượng", value: "384.8g" },
    ],
  },
  {
    id: "macbook-pro-2024",
    images: ["/image/macbook1.png", "/image/macbook2.png"],
    category: "MacBook",
    title: "MacBook Pro 16-inch M3 Max",
    oldPrice: "75,000,000",
    newPrice: "72,500,000",
    rating: 5,
    colors: ["Space Gray", "Silver"],
    storageOptions: ["512GB", "1TB", "2TB", "4TB"],
    description:
      "MacBook Pro M3 Max với màn hình Liquid Retina XDR, hiệu năng mạnh mẽ, và thời lượng pin ấn tượng.",
    specifications: [
      { category: "Màn hình", name: "Công nghệ", value: "Liquid Retina XDR" },
      { category: "Màn hình", name: "Kích thước", value: "16.2 inches" },
      { category: "Màn hình", name: "Tần số quét", value: "120Hz (ProMotion)" },
      { category: "Hiệu suất", name: "Chipset", value: "Apple M3 Max" },
      { category: "Hiệu suất", name: "RAM", value: "32GB / 64GB" },
      { category: "Lưu trữ", name: "SSD", value: "512GB / 1TB / 2TB / 4TB" },
      { category: "Cổng kết nối", name: "USB-C", value: "3 x Thunderbolt 4" },
      { category: "Cổng kết nối", name: "HDMI", value: "1 x HDMI 2.1" },
      { category: "Cổng kết nối", name: "Jack tai nghe", value: "Có, 3.5mm" },
      { category: "Pin", name: "Thời lượng", value: "Lên đến 22 giờ" },
    ],
  },
];

export default products;
