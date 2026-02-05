import axios from 'axios';

export const TAXONOMY_DATA = [
  // TYPE
  {
    name: 'Món nước',
    type: 'TYPE',
    description: 'Các món có nước dùng như Phở, Bún, Miến...',
  },
  {
    name: 'Món khô',
    type: 'TYPE',
    description: 'Các món khô như Cơm rang, Mì trộn, Xôi...',
  },
  {
    name: 'Đồ ăn nhanh',
    type: 'TYPE',
    description: 'Burger, Gà rán, Pizza, Sandwich...',
  },
  {
    name: 'Lẩu',
    type: 'TYPE',
    description: 'Các loại lẩu đa dạng (Thái, ếch, riêu cua...)',
  },
  {
    name: 'Đồ nướng',
    type: 'TYPE',
    description: 'Các món nướng tại bàn hoặc nướng sẵn',
  },
  {
    name: 'Ăn vặt',
    type: 'TYPE',
    description: 'Các món ăn nhẹ như Nem chua rán, bánh tráng trộn...',
  },
  {
    name: 'Tráng miệng',
    type: 'TYPE',
    description: 'Chè, kem, bánh ngọt, hoa quả...',
  },
  {
    name: 'Đồ uống',
    type: 'TYPE',
    description: 'Cà phê, trà sữa, nước ép, sinh tố...',
  },
  {
    name: 'Bánh mì',
    type: 'TYPE',
    description: 'Các loại bánh mì kẹp, bánh mì chảo...',
  },
  {
    name: 'Cơm văn phòng',
    type: 'TYPE',
    description: 'Các suất cơm set, cơm gia đình phục vụ nhanh',
  },

  // STYLE
  {
    name: 'Vỉa hè',
    type: 'STYLE',
    description: 'Quán bình dân, trải nghiệm dân dã',
  },
  {
    name: 'Sang trọng',
    type: 'STYLE',
    description: 'Nhà hàng cao cấp, decor đẹp, phục vụ chuyên nghiệp',
  },
  {
    name: 'Máy lạnh',
    type: 'STYLE',
    description: 'Quán có không gian kín và điều hòa',
  },
  {
    name: 'Ẩm thực Việt',
    type: 'STYLE',
    description: 'Các món ăn thuần Việt theo vùng miền',
  },
  {
    name: 'Ẩm thực Hàn',
    type: 'STYLE',
    description: 'Các món như Tokbokki, Kimbap, thịt nướng Hàn',
  },
  {
    name: 'Ẩm thực Nhật',
    type: 'STYLE',
    description: 'Sushi, Sashimi, Ramen, Takoyaki...',
  },
  {
    name: 'Ẩm thực Trung',
    type: 'STYLE',
    description: 'Dimsum, vịt quay, mì kéo...',
  },
  {
    name: 'Healthy',
    type: 'STYLE',
    description: 'Đồ ăn ít calo, Salad, Eat clean, đồ chay',
  },
  {
    name: 'Cay',
    type: 'STYLE',
    description: 'Các món ăn có đặc trưng cay nồng',
  },
  {
    name: 'Cổ điển',
    type: 'STYLE',
    description: 'Không gian hoài cổ, Vintage',
  },

  // OCCASION
  {
    name: 'Một mình',
    type: 'OCCASION',
    description: 'Không gian yên tĩnh, món ăn suất đơn',
  },
  {
    name: 'Hẹn hò',
    type: 'OCCASION',
    description: 'Không gian lãng mạn, riêng tư cho cặp đôi',
  },
  {
    name: 'Nhóm bạn',
    type: 'OCCASION',
    description: 'Quán nhộn nhịp, bàn lớn, món dạng sharing',
  },
  {
    name: 'Gia đình',
    type: 'OCCASION',
    description: 'Không gian ấm cúng, có khu vực cho trẻ em',
  },
  {
    name: 'Ăn đêm',
    type: 'OCCASION',
    description: 'Các quán mở cửa sau 22h đêm',
  },
];

const API_URL = 'http://localhost:3000/taxonomy';

async function seed() {
  console.log('🚀 Bắt đầu quá trình Seed Taxonomy...');
  let successCount = 0;
  let errorCount = 0;

  for (const item of TAXONOMY_DATA) {
    try {
      await axios.post(API_URL, item);
      console.log(`✅ Đã tạo: ${item.name}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Lỗi khi tạo ${item.name}:`, error);
      errorCount++;
    }
  }

  console.log('---');
  console.log(
    `🎉 Hoàn tất! Thành công: ${successCount}, Thất bại: ${errorCount}`,
  );
}

seed();
