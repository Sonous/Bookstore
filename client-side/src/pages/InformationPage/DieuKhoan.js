import React, { useEffect } from 'react'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'
import { useNavigate } from 'react-router-dom';
export default function DieuKhoan() {
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
                        <p className="text-white uppercase text-3xl font-bold">Điều Khoản Dịch Vụ</p>
                        <p className="text-white">
                            <span
                                onClick={() => {
                                    navigate('/');
                                }}
                                className="hover:text-primary-color cursor-pointer transition-all"
                            >
                                Trang chủ
                            </span>{' '}
                            / Điều Khoản Dịch Vụ
                        </p>
                    </div>
                </div>
            </div>
    <div class="max-w-5xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Điều Khoản Dịch Vụ</h1>
    <p class="mb-4">Chào mừng bạn đến với website của Nhà xuất bản Kim Đồng!</p>
    <p class="mb-4">Cùng với việc truy cập và sử dụng các dịch vụ của website Kim Đồng để tìm kiếm thông tin hoặc mua sắm, bạn đã đồng ý tuân thủ các quy định và ràng buộc của Nhà xuất bản Kim Đồng. Bạn vui lòng đọc kỹ các điều khoản sử dụng và tuân thủ một cách hợp tác, nhờ đó Nhà xuất bản Kim Đồng có thể phục vụ bạn ngày càng tốt hơn.</p>

    <p class="mb-4">Nếu bạn có bất cứ câu hỏi hoặc thắc mắc nào về những điều khoản dưới đây, vui lòng liên hệ với chúng tôi qua địa chỉ <a href="mailto:info@nxbkimdong.com.vn" class="text-blue-500 hover:underline">info@nxbkimdong.com.vn</a> / <a href="mailto:cskh_online@nxbkimdong.com.vn" class="text-blue-500 hover:underline">cskh_online@nxbkimdong.com.vn</a> <br /> hoặc số điện thoại <strong>84. 243 9434490</strong>.</p>

    <p class="mb-4">Lưu ý các điều khoản sử dụng dưới đây Nhà xuất bản Kim Đồng có thể xem xét lại và thay đổi bất cứ lúc nào và được thông báo cụ thể trên website Kim Đồng vì vậy bạn nên thường xuyên cập nhật thông tin.</p>

    <h2 class="text-xl font-bold mt-6 mb-6" >1. Đăng Ký Tài Khoản</h2>
    <p class="text-indent-5 mb-4">Khi sử dụng dịch vụ trên website Kim Đồng, bạn sẽ cung cấp cho chúng tôi các thông tin bao gồm: họ tên, mật khẩu và địa chỉ email để đăng ký một tài khoản tại đây. Việc sử dụng và giữ kín thông tin tài khoản là trách nhiệm và quyền lợi của bạn.</p>
    <p class="text-indent-5 mb-4">Bên cạnh đó khi tiến hành đặt hàng, bạn cần cung cấp một vài thông tin khác trong đơn hàng bao gồm tên, địa chỉ…..là những thông tin giúp Nhà xuất bản Kim Đồng cung cấp đơn hàng một cách hiệu quả nhất. Nếu bạn cung cấp không đầy đủ hoặc không chính xác các thông tin này dẫn đến việc không thể giao hàng, chúng tôi có quyền từ chối phục vụ mà không phải chịu bất cứ trách nhiệm nào đối với bạn.</p>
    <p class="text-indent-5 mb-4">Chính vì vậy, bạn nên đảm bảo các thông tin cung cấp luôn đầy đủ, chính xác và được cập nhật.</p>

    <h2 class="text-xl font-bold mt-6 mb-6">2. Quyền Được Bảo Mật Thông Tin Của Khách Hàng</h2>
    <p class="text-indent-5 mb-4">Khi sử dụng dịch vụ trên website Kim Đồng, bạn được đảm bảo rằng những thông tin bạn cung cấp cho chúng tôi sẽ chỉ được dùng vào mục đích nâng cao hiệu quả phục vụ của Nhà xuất bản Kim Đồng. Những thông tin này sẽ không được chuyển giao cho bên thứ ba nào khác vì mục đích thương mại.</p>
    <p class="text-indent-5 mb-4">Những thông tin này hoàn toàn được bảo mật, chỉ trong trường hợp pháp luật yêu cầu, Nhà xuất bản buộc phải cung cấp thông tin cho bộ phận có chức năng.</p>
    <p class="text-indent-5 mb-4">Để tìm hiểu chi tiết bạn có thể tham khảo Chính sách bảo mật được đăng tại website này.</p>

    <h2 class="text-xl font-bold mt-6 mb-6">3. Kết Nối Vào / Ra Từ Website</h2>
    <p class="text-indent-5 mb-4">Trên website chúng tôi có thể có nhiều link tới website của các công ty hay đối tác khác, nhưng không là chủ quản của các website đó. Chúng tôi sẽ không chịu trách nhiệm hay quyền hạn đối với bất kỳ nội dung, quảng cáo, sản phẩm hay dịch vụ trên các website này.</p>
    <p class="text-indent-5 mb-4">Chúng tôi cũng không chịu trách nhiệm dù trực tiếp hay gián tiếp cho bất kỳ rủi ro hay nguyên nhân mất mát nào khi bạn sử dụng hay tin tưởng vào nội dung, quảng cáo, sản phẩm và dịch vụ của các website đó.</p>
    <p class="text-indent-5 mb-4">Các thông tin đăng tải với nguồn từ Nhà xuất bản Kim Đồng đều thuộc sở hữu của Nhà xuất bản Kim Đồng. Khi bạn muốn sao chép nội dung bài viết do đội ngũ BTV website đăng tải bạn cần ghi rõ nguồn lấy từ <a href="https://nxbkimdong.com.vn" class="text-blue-500 hover:underline">nxbkimdong.com.vn</a>.</p>

    <h2 class="text-xl font-bold mt-6 mb-6">4. Trách Nhiệm Của Khách Hàng Khi Sử Dụng Dịch Vụ Trên Website</h2>
    <p class="text-indent-5 mb-4">Bạn tuyệt đối không được xâm nhập bất hợp pháp vào hệ thống hoặc làm thay đổi cấu trúc dữ liệu của website Kim Đồng dưới bất kỳ hình thức nào.</p>
    <p class="text-indent-5 mb-4">Bạn không được sử dụng bất kỳ phương tiện nào để can thiệp, hoặc cổ vũ việc xâm nhập vào hệ thống máy chủ của chúng tôi. Nếu bạn phát hiện ra bất kỳ lỗi hệ thống trong quá trình sử dụng, xin vui lòng báo cho chúng tôi qua số điện thoại <strong>84. 243 9434490</strong> hoặc email <a href="mailto:info@nxbkimdong.com.vn" class="text-blue-500 hover:underline">info@nxbkimdong.com.vn</a> / <a href="mailto:cskh_online@nxbkimdong.com.vn" class="text-blue-500 hover:underline">cskh_online@nxbkimdong.com.vn</a>.</p>
    <p class="text-indent-5 mb-4">Bạn không được đưa ra những nhận xét, bình luận, đánh giá mang tính chính trị (tuyên truyền, chống phá, xuyên tạc chính quyền), kỳ thị tôn giáo, giới tính, sắc tộc, vi phạm pháp luật nước Cộng hòa xã hội chủ nghĩa Việt Nam.</p>
    <p class="text-indent-5 mb-4">Bạn không được đưa ra những nhận xét, bình luận, đánh giá có ý xúc phạm, quấy rối, làm phiền đối với người khác.</p>
    <p class="text-indent-5 mb-4">Bạn không được mạo nhận hoặc có hành vi cố ý tạo sự nhầm lẫn mình là một khách hàng hoặc là thành viên Ban quản trị của website Kim Đồng.</p>
    <p class="text-indent-5 mb-4">Chúng tôi không cho phép các tổ chức, cá nhân khác quảng bá sản phẩm tại website Kim Đồng mà chưa có sự đồng ý bằng văn bản từ Nhà xuất bản Kim Đồng.</p>
</div>
      <Footer />
      </>
  )
}
