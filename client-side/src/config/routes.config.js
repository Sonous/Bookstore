const routes = {
    home: '/',
    collections: '/collections/:collection/:genre?',
    blog: '/blog',
    blogdetail: '/blogs/:title',
    books: '/books/:name',
    signIn: '/signIn',
    signUp: '/signUp',
    cart: '/cart',
    paying: '/paying',
    bookDetail: '/bookdetails',

    dieuKhoan: '/dieu-khoan-dich-vu', // Điều khoản dịch vụ
    chinhSachBaoMat: '/chinh-sach-bao-mat', // Chính sách bảo mật
    huongDanDatHang: '/huong-dan-dat-hang', // Hướng dẫn đặt hàng
    lienHe: '/lien-he', // Liên hệ
    chinhSachDoiTra: '/chinh-sach-doi-tra',
    phuongThucVanChuyen: '/phuong-thuc-van-chuyen',

    user: '/user',
    usercheck: '/check',
    order: '/order',
    results: '/results',
    favorite: '/favorite',
};

export default routes;
