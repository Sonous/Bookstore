const routes = {
    home: '/',
    category: '/categories/:category/:genre',
    blog: '/blogs/:title',
    books: '/books/:name',
    signUp: '/signup',
    signIn: '/signIn',
    cart: '/cart',
    paying: '/paying',
    bookDetail: '/bookdetails',
    dieuKhoan: '/dieu-khoan-dich-vu', // Điều khoản dịch vụ
    chinhSachBaoMat: '/chinh-sach-bao-mat', // Chính sách bảo mật
    huongDanDatHang: '/huong-dan-dat-hang', // Hướng dẫn đặt hàng
    lienHe:'/lien-he', // Liên hệ
    chinhSachDoiTra:'/chinh-sach-doi-tra',
    phuongThucVanChuyen:'/phuong-thuc-van-chuyen',
};

export default routes;
