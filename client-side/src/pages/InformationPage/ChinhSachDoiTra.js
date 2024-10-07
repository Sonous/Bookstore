import React, { useEffect } from 'react'
import Footer from '~/layouts/Footer/Footer'
import Header from '~/layouts/Header/Header'

export default function ChinhSachDoiTra() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <>
    <Header />
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Chính Sách Đổi Trả - Hoàn Tiền</h1>
      <p className="text-gray-700 mb-4">
        Sau khi Quý khách đặt mua sản phẩm trên website nxbkimdong.com.vn, Nhà xuất bản sẽ kiểm duyệt trước khi giao hàng cho Quý khách. Tuy nhiên, trong trường hợp sản phẩm không đúng như Quý khách đã đặt mua qua Website hoặc có sai sót, lỗi sản phẩm… Quý khách có thể yêu cầu NXB Kim Đồng đổi, trả lại theo đúng đơn hàng Quý khách đã đặt.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Các trường hợp được ĐỔI sản phẩm</h2>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Sản phẩm không đảm bảo chất lượng và bị hư hỏng do quá trình vận chuyển: sản phẩm bị rách nát, hoen ố, bẩn, ướt…</li>
        <li>Sản phẩm không đúng với yêu cầu đặt hàng.</li>
        <li>Sản phẩm lỗi kĩ thuật: lỗi trang, lỗi in ấn….</li>
      </ul>

      <h2 className="text-xl font-semibold  mt-6 mb-2">Các trường hợp được TRẢ sản phẩm</h2>
      <p className="text-gray-700 mb-4">
        Khách hàng có thể trả sản phẩm và nhận lại tiền mà không chịu bất kỳ phí tổn nào trong 2 trường hợp bao gồm: Đơn hàng chưa được chuyển đi hoặc Sản phẩm bị lỗi nhưng NXB không còn sản phẩm khác để thay thế.
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>
          Với các đơn hàng chưa được chuyển đi (tình trạng đơn hàng: Chờ xử lý hoặc Đang xử lý):
          <ul className="list-disc list-inside ml-4">
            <li>Khách hàng có thể trả toàn bộ hoặc một phần đơn hàng.</li>
            <li>Đối với các đơn hàng đã được thanh toán, NXB sẽ hoàn lại tiền tương ứng với số hàng được trả.</li>
          </ul>
        </li>
        <li>
          Với các sản phẩm bị lỗi nhưng hết sản phẩm thay thế, NXB sẽ thông báo cho khách hàng và hoàn lại số tiền tương ứng.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Quy trình đổi sản phẩm</h2>
      <p className="text-gray-700 mb-4">
        Khi nhận sản phẩm từ nhân viên chuyển phát, Quý khách nên kiểm tra lại số lượng, tình trạng sản phẩm….trước khi kí xác nhận. Trong trường hợp Quý khách phát hiện nhầm lẫn, sai sót, hư hỏng…Quý khách vui lòng liên hệ với NXB trong thời gian 3 ngày kể từ thời điểm nhận hàng (trừ ngày thứ 7, chủ nhật và nghỉ lễ) để nhận được sự giải quyết kịp thời.
      </p>
      <p className="text-gray-700 mb-4">
        Quý khách có thể liên hệ bằng các hình thức sau:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Liên hệ theo số điện thoại: 1900571595 trong thời gian: 8h30 – 18h00 (trừ ngày nghỉ lễ, thứ 7 và chủ nhật)</li>
        <li>Gửi email về địa chỉ: cskh_online@nxbkimdong.com.vn</li>
      </ul>

      <p className="text-gray-700 mb-4">
        Chậm nhất sau 48h kể từ thời điểm nhận được thông tin yêu cầu hỗ trợ (không tính ngày nghỉ lễ, thứ 7 và chủ nhật) NXB sẽ liên hệ với Quý khách để giải quyết khiếu nại.
      </p>

      <p className="text-gray-700 mb-4">
        Với các trường hợp được đổi, trả sản phẩm theo quy định của NXB, Quý khách sẽ không phải chịu thêm bất cứ chi phí phát sinh nào khác. NXB sẽ gửi lại sản phẩm theo đúng yêu cầu đặt hàng của quý khách. Trong trường hợp không còn hàng thay thế, quý khách có thể yêu cầu thay đổi sản phẩm khác hoặc được hoàn lại tiền theo giá trị của sản phẩm đó.
      </p>
    </div>
    <Footer />
      </>
  )
}
