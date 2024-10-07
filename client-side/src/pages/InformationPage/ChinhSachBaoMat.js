import React, { useEffect } from 'react'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'

export default function ChinhSachBaoMat() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <>
    <Header />
    <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Chính sách bảo mật</h1>
            <p className="mb-4">
                Website <strong>Nxbkimdong.com.vn</strong> (và ứng dụng NXB Kim Đồng) cam kết bảo mật an toàn tuyệt đối với thông tin cá nhân của khách hàng theo chính sách bảo vệ thông tin của doanh nghiệp và các quy định của pháp luật Việt Nam. Cụ thể:
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Mục đích thu thập thông tin cá nhân</h2>
            <ul className="list-disc pl-8 mb-4">
                <li>Việc thu thập dữ liệu trên bao gồm: email, điện thoại, tên đăng nhập, mật khẩu đăng nhập, địa chỉ khách hàng (thành viên). Đây là các thông tin cần thành viên cung cấp bắt buộc khi đăng ký sử dụng dịch vụ và để liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ trên ứng dụng nhằm đảm bảo quyền lợi cho người tiêu dùng.</li>
                <li>Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư điện tử của mình.</li>
                <li>Ứng dụng có thể lưu trữ ảnh để giúp người dùng sử dụng các chức năng như chat, cập nhật ảnh đại diện, ...</li>
                <li>Ứng dụng có thể yêu cầu quyền truy cập Camera để chụp ảnh, quét mã QR.</li>
                <li>Ứng dụng có thể yêu cầu quyền truy cập Thư viện/Bộ nhớ để giúp người dùng chọn, tải, lưu ảnh.</li>
                <li>Ứng dụng có thể yêu cầu quyền truy cập Vị trí để đưa ra các kết quả hợp lý nhất với người dùng.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Phạm vi thu thập thông tin</h2>
            <p className="mb-4">
                Website Nxbkimdong.com.vn (và ứng dụng NXB Kim Đồng) sử dụng thông tin thành viên cung cấp để:
            </p>
            <ul className="list-disc pl-8 mb-4">
                <li>Cung cấp các dịch vụ đến Thành viên;</li>
                <li>Gửi các thông báo về các hoạt động trao đổi thông tin giữa thành viên và người quản trị.</li>
                <li>Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của thành viên hoặc các hoạt động giả mạo Thành viên;</li>
                <li>Liên lạc và giải quyết với thành viên trong những trường hợp đặc biệt.</li>
                <li>Không sử dụng thông tin cá nhân của thành viên ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại Website.</li>
                <li>Trong trường hợp có yêu cầu của pháp luật, chúng tôi có trách nhiệm hợp tác cung cấp thông tin cá nhân thành viên khi có yêu cầu từ cơ quan tư pháp.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Thời gian lưu trữ thông tin</h2>
            <p className="mb-4">
                Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của chúng tôi.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Những người hoặc tổ chức có thể được tiếp cận với thông tin đó</h2>
            <ul className="list-disc pl-8 mb-4">
                <li>Các đối tác là bên cung cấp dịch vụ cho chúng tôi liên quan đến thực hiện đơn hàng.</li>
                <li>Chúng tôi sử dụng dịch vụ từ một nhà cung cấp dịch vụ bên thứ ba để thực hiện một số hoạt động liên quan.</li>
                <li>Các chương trình có tính liên kết, đồng thực hiện, thuê ngoài cho các mục đích được nêu tại Website.</li>
                <li>Yêu cầu pháp lý: Chúng tôi có thể tiết lộ các thông tin cá nhân nếu điều đó do luật pháp yêu cầu.</li>
                <li>Chuyển giao kinh doanh (nếu có): trong trường hợp sáp nhập, hợp nhất toàn bộ hoặc một phần với công ty khác.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Địa chỉ của đơn vị thu thập và quản lý thông tin</h2>
            <p className="mb-4">
                <strong>Tên doanh nghiệp:</strong> Nhà xuất bản Kim Đồng<br/>
                <strong>Trụ sở chính:</strong> 55 Quang Trung, Nguyễn Du, Hai Bà Trưng, Hà Nội<br/>
                <strong>Điện thoại:</strong> 0243 943 4730<br/>
                <strong>Email:</strong> <a href="mailto:cskh_online@nxbkimdong.com.vn" className="text-blue-500 hover:underline">cskh_online@nxbkimdong.com.vn</a>
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">6. Phương thức và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu</h2>
            <ul className="list-disc pl-8 mb-4">
                <li>Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình.</li>
                <li>Thành viên có quyền gửi khiếu nại về việc lộ thông tin cá nhân cho bên thứ 3 đến Ban quản trị của Website.</li>
            </ul>
        </div>
    <Footer />
      </>
  )
}
