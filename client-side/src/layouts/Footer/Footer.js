import classNames from 'classnames/bind';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import { routes } from '~/config';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const footerItems = [
    {
        title: 'Dịch vụ',
        options: [
            { name: 'Điều khoản sử dụng', path: routes.dieuKhoan },
            { name: 'Chính sách bảo mật', path: routes.chinhSachBaoMat },
            { name: 'Liên hệ', path: routes.lienHe },
        ],
    },
    {
        title: 'Hỗ trợ',
        options: [
            { name: 'Hướng dẫn đặt hàng', path: routes.huongDanDatHang },
            { name: 'Chính sách đổi trả', path: routes.chinhSachDoiTra },
            { name: 'Phương thức vận chuyển', path: routes.phuongThucVanChuyen },
        ],
    },
];

function Footer() {
    return (
        <footer className="px-5">
            <div className={cx('wrapper')}>
                <div className={cx('footer-nav')}>
                    <h3>Nhà xuất bản Kim Đồng</h3>
                    <div className={cx('info')}>
                        <span>Địa chỉ: Số 55 Quang Trung, Nguyễn Du, Hai Bà Trưng, Hà Nội</span>
                        <span>Số điện thoại: (+84) 1900571595</span>
                        <span>Email: cskh_online@nxbkimdong.com.vn</span>
                    </div>
                </div>

                {footerItems.map((item, index) => {
                    return (
                        <div key={index} className={cx('footer-nav')}>
                            <h3>{item.title}</h3>
                            <div className={cx('info', 'link')}>
                                {item.options.map((option, index) => (
                                    <Link key={index} to={option.path}>
                                        <span>{option.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}

                <div className={cx('footer-nav')}>
                    <h3>Kết nối mạng xã hội</h3>

                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faFacebook} />
                        <FontAwesomeIcon icon={faYoutube} />
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
