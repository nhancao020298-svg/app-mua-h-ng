import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Tai nghe Sony Wireless",
    price: 2500000,
    category: "Electronics",
    description: "Tai nghe chống ồn chủ động, pin 30 giờ, âm thanh chất lượng cao.",
    image: "https://picsum.photos/id/1/400/400",
    rating: 4.5
  },
  {
    id: 2,
    name: "Áo Khoác Denim Vintage",
    price: 850000,
    category: "Fashion",
    description: "Phong cách cổ điển, chất liệu vải bò bền bỉ, phù hợp mọi lứa tuổi.",
    image: "https://picsum.photos/id/2/400/400",
    rating: 4.8
  },
  {
    id: 3,
    name: "Đồng hồ thông minh SmartWatch Gen 5",
    price: 3200000,
    category: "Electronics",
    description: "Theo dõi sức khỏe, nhịp tim, thông báo tin nhắn, chống nước.",
    image: "https://picsum.photos/id/3/400/400",
    rating: 4.2
  },
  {
    id: 4,
    name: "Đèn bàn làm việc Minimalist",
    price: 450000,
    category: "Home",
    description: "Thiết kế tối giản, ánh sáng bảo vệ mắt, điều chỉnh độ sáng cảm ứng.",
    image: "https://picsum.photos/id/4/400/400",
    rating: 4.6
  },
  {
    id: 5,
    name: "Giày Sneaker Sport Pro",
    price: 1200000,
    category: "Fashion",
    description: "Êm ái, thoáng khí, đế cao su chống trượt, phù hợp chạy bộ.",
    image: "https://picsum.photos/id/5/400/400",
    rating: 4.7
  },
  {
    id: 6,
    name: "Máy pha cà phê Mini",
    price: 1800000,
    category: "Home",
    description: "Pha cà phê espresso nhanh chóng, thiết kế nhỏ gọn cho gia đình.",
    image: "https://picsum.photos/id/6/400/400",
    rating: 4.4
  },
  {
    id: 7,
    name: "Kem dưỡng ẩm da mặt",
    price: 350000,
    category: "Beauty",
    description: "Cấp ẩm sâu, chiết xuất tự nhiên, phù hợp cho da nhạy cảm.",
    image: "https://picsum.photos/id/7/400/400",
    rating: 4.9
  },
  {
    id: 8,
    name: "Loa Bluetooth Bass Boost",
    price: 990000,
    category: "Electronics",
    description: "Âm bass mạnh mẽ, chống nước IPX7, pin 12 giờ liên tục.",
    image: "https://picsum.photos/id/8/400/400",
    rating: 4.3
  }
];

export const FORMAT_CURRENCY = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};