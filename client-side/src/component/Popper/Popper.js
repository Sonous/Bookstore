import classNames from 'classnames/bind';
import styles from './Popper.module.css';

const cx = classNames.bind(styles);

function Popper({ children, className }) {
    return <ul className={cx('wrapper', className)}>{children}</ul>;
}

export default Popper;
