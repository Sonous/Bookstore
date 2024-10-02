import classNames from 'classnames/bind';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import images from '~/assets/images';

const cx = classNames.bind(styles);

const footerItems = [
    {
        title: 'Dịch vụ',
        options: ['Điều khoản sử dụng', 'Chính sách bảo mật', 'Liên hệ'],
    },
    {
        title: 'Hỗ trợ',
        options: ['Hướng dẫn đặt hàng', 'Chính sách đổi trả - hoàn tiền', 'Phương thức vận chuyển'],
    },
];

function Footer() {
    return (
        <footer>
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
                                {item.options.map((option, index) => {
                                    return <span key={index}>{option}</span>;
                                })}
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
