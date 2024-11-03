import React, { useEffect } from 'react'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import { useNavigate } from 'react-router-dom';
export default function PhuongThucVanChuyen() {
  const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <>
    <Header />
    <div className="parallax h-[350px] relative">
                <div className="absolute w-full h-full bg-black/50">
                    <div className="absolute px-[15%] mt-28">
                        <p className="text-white uppercase text-3xl font-bold">Phương Thức Vận Chuyển</p>
                        <p className="text-white">
                            <span
                                onClick={() => {
                                    navigate('/');
                                }}
                                className="hover:text-primary-color cursor-pointer transition-all"
                            >
                                Trang chủ
                            </span>{' '}
                            / Phương Thức Vận Chuyển
                        </p>
                    </div>
                </div>
            </div>
    <div className="max-w-3xl mx-auto p-6  ">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Phương Thức Vận Chuyển</h1>
      <p className="text-gray-700 mb-4">
        (Áp dụng cho khách hàng đặt mua sách qua website hoặc qua số điện thoại 1900571595)
      </p>
      <p className="text-gray-700 mb-4">
        Hiện tại chúng tôi cung cấp 4 phương thức vận chuyển chính như sau: (Mức phí được áp dụng từ ngày 01/05/2022)
      </p>
      <p className="text-gray-700 mb-4">
        Miễn phí vận chuyển đối với các đơn hàng có giá trị lớn hơn hoặc bằng 200.000đ nhận Tại Hà Nội hoặc Tp.HCM.
      </p>
      <p className="text-gray-700 mb-4">
        Miễn phí vận chuyển đối với các đơn hàng có giá trị lớn hơn hoặc bằng 400.000đ nhận tại các tỉnh thành phố khác.
      </p>

      <h2 className="text-xl font-semibold  mt-6 mb-2">1. Vận chuyển trực tiếp trong - Nội/ngoại thành Hà Nội, Tp.HCM</h2>
      <p className="text-gray-700 mb-2">
        * Áp dụng đối với địa chỉ nhận hàng trong địa bàn Hà Nội và Tp.HCM
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Hà Nội:</strong> Ba Đình, Hoàn Kiếm, Đống Đa, Tây Hồ, Hai Bà Trưng, Cầu Giấy, Thanh Xuân, Long Biên, Hà Đông, Từ Liêm, Hoàng Mai
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Tp.HCM:</strong> Quận 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, Bình Thạnh, Gò Vấp, Phú Nhuận, Tân Bình, Tân Phú, Quận 9, Quận 12, Thủ Đức, Bình Tân
      </p>
      <p className="text-gray-700 mb-4">
        - Phí vận chuyển: <strong>25.000đ</strong> đối với tất cả các đơn hàng
      </p>

      <h2 className="text-xl font-semibold  mt-6 mb-2">2. Vận chuyển trực tiếp trong - Huyện / Xã Hà Nội, Tp.HCM</h2>
      <p className="text-gray-700 mb-2">
        * Áp dụng đối với địa chỉ nhận hàng trong địa bàn Hà Nội và Tp.HCM
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Hà Nội:</strong> Đông Anh, Gia Lâm, Hoài Đức, Chương Mỹ, Mê Linh, Đan Phượng, Thanh Oai, Thanh Trì
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Tp.HCM:</strong> Huyện Cần Giờ, Củ Chi, Nhà Bè, Bình Chánh, Hóc Môn
      </p>
      <p className="text-gray-700 mb-4">
        - Phí vận chuyển: <strong>35.000đ</strong> đối với tất cả các đơn hàng
      </p>

      <h2 className="text-xl font-semibold  mt-6 mb-2">3. Vận chuyển tiết kiệm qua đường bưu điện</h2>
      <p className="text-gray-700 mb-2">
        * Áp dụng đối với địa chỉ nhận hàng trong địa bàn các tỉnh thành phố không thuộc Hà Nội và Tp.HCM
      </p>
      <p className="text-gray-700 mb-2">
        (Thời gian: 3-10 ngày làm việc, trừ T7 và Chủ Nhật kể từ ngày đặt hàng)
      </p>
      <p className="text-gray-700 mb-4">
        - Phí vận chuyển: <strong>35.000đ</strong> đối với tất cả các đơn hàng
      </p>

      <p className="text-gray-700 mb-4">
        Lưu ý: mức phí vận chuyển trên có thể được thay đổi mà không thông báo trước.
      </p>
    </div>
    <Footer />
      </>
  )
}
