import React, { useEffect } from 'react'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'

export default function HuongDanDatHang() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <>
    <Header />
    <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Hướng Dẫn Đặt Hàng Trên Website NXB Kim Đồng</h1>

            <h2 className="text-2xl font-semibold mt-6">Bước 1: Tìm Sản Phẩm</h2>
            <p>Bạn có thể tìm kiếm bằng các hình thức sau:</p>
            <ol className="list-decimal list-inside mb-4">
                <li><strong>Tìm kiếm theo tên sản phẩm:</strong> Nhập từ khóa vào ô tìm kiếm ở góc trên bên trái và nhấn Enter hoặc click vào biểu tượng kính lúp.</li>
                <li><strong>Tìm kiếm theo tên tác giả:</strong> Nhập tên tác giả vào ô “Tìm kiếm” và nhấn Enter.</li>
                <li>
                    <strong>Tìm kiếm theo nhóm sản phẩm:</strong> 
                    <ul className="list-disc list-inside mt-2">
                        <li><strong>Sách mới:</strong> Cập nhật các tác phẩm mới.</li>
                        <li><strong>Sách theo chủ đề:</strong> 
                            <ul>
                                <li>Lịch sử - truyền thống</li>
                                <li>Kiến thức – khoa học</li>
                                <li>Văn học Việt Nam</li>
                                <li>Văn học nước ngoài</li>
                                <li>Truyện tranh</li>
                                <li>Manga – Comic</li>
                                <li>Wings Books</li>
                            </ul>
                        </li>
                        <li><strong>Sách theo độ tuổi:</strong> Phân loại theo các nhóm độ tuổi (0-6, 6-11…).</li>
                        <li><strong>Khuyến mãi:</strong> Các sản phẩm đang giảm giá.</li>
                    </ul>
                </li>
            </ol>

            <h2 className="text-2xl font-semibold mt-6">Bước 2: Thêm Sản Phẩm vào Giỏ Hàng</h2>
            <p>Thêm sản phẩm vào giỏ hàng bằng cách:</p>
            <ul className="list-disc list-inside mb-4">
                <li><strong>Thêm nhanh:</strong> Click vào nút “đặt hàng” (hình xe đẩy) ở góc dưới bên phải của sản phẩm.</li>
                <li><strong>Xem chi tiết:</strong> Click vào sản phẩm, sau đó chọn “Thêm vào giỏ hàng” hoặc “Mua ngay”.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Bước 3: Kiểm Tra Giỏ Hàng</h2>
            <p>Kiểm tra thông tin và thao tác như sau:</p>
            <ul className="list-disc list-inside mb-4">
                <li>Chọn “Chọn thêm” để mua thêm.</li>
                <li>Chọn “Làm trống giỏ hàng” để xóa.</li>
                <li>Chọn “Cập nhật giỏ hàng” để thay đổi số lượng.</li>
                <li>Chọn “Thanh toán” để tiếp tục.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Bước 4: Điền Thông Tin Khách Hàng</h2>
            <p>Điền thông tin như sau:</p>
            <ul className="list-disc list-inside mb-4">
                <li><strong>Đăng ký tài khoản:</strong> Vào phần “Đăng ký” và điền thông tin theo yêu cầu.</li>
                <li><strong>Thông tin hóa đơn:</strong> Điền đầy đủ thông tin cần thiết.</li>
                <li><strong>Ghi chú hóa đơn:</strong> Nếu cần, thêm thông tin công ty và mã số thuế.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Bước 5: Chọn Phương Thức Vận Chuyển</h2>
            <p>Các phương thức vận chuyển:</p>
            <ul className="list-disc list-inside mb-4">
                <li>Vận chuyển trực tiếp trong 48h - Nội/ngoại thành Hà Nội, Tp.HCM.</li>
                <li>Vận chuyển tiết kiệm qua đường bưu điện.</li>
            </ul>
            <p>Xem thêm tại <a href="#" className="text-blue-500 hover:underline">Phương thức vận chuyển</a>.</p>

            <h2 className="text-2xl font-semibold mt-6">Bước 6: Chọn Phương Thức Thanh Toán</h2>
            <p>Các hình thức thanh toán:</p>
            <ul className="list-disc list-inside mb-4">
                <li><strong>Trả tiền khi nhận hàng (COD):</strong> Thanh toán cho nhân viên giao hàng.</li>
                <li><strong>Thanh toán trước (Chuyển khoản):</strong> Chuyển khoản cho NXB trước khi nhận sách.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Bước 7: Xác Nhận Đơn Hàng</h2>
            <p>Click vào “Xác nhận đơn hàng” sau khi kiểm tra lại thông tin.</p>
            <p>Bạn sẽ nhận được thông báo “Đơn hàng hoàn thành” cùng mã đơn hàng.</p>

            <h2 className="text-2xl font-semibold mt-6">Theo Dõi Đơn Hàng</h2>
            <p>Đăng nhập để theo dõi tình trạng đơn hàng. Nếu quên mật khẩu, bạn có thể lấy lại qua email đã đăng ký.</p>

            <h2 className="text-2xl font-semibold mt-6">Liên Hệ</h2>
            <p><strong>Điện thoại:</strong> 1900571595 (Giờ hành chính)</p>
            <p><strong>Email:</strong> cskh_online@nxbkimdong.com.vn</p>
        </div>
    <Footer />
      </>
  )
}
