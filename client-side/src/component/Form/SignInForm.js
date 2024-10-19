import React, { useContext, useState } from 'react';

import authApi from '~/apis/authApi';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '~/context/UserContextProvider';

const SignInForm = ({ toggleMode, onGetHelpClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { login } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form

        try {
            const token = await authApi.login(email, password); // Gọi API đăng nhập
            console.log('Đăng nhập thành công, token:', token);

            if (token) {
                localStorage.setItem('token', token); // Lưu token
                login();
                navigate('/');
            } else {
                setError('Email hoặc Mật khẩu không chính xác!');
            }
        } catch (error) {
            setError(error.message); // Lưu thông báo lỗi vào state
            console.error('Lỗi:', error);
        }
    };

    return (
        <form className="sign-in-form" onSubmit={handleSubmit}>
            <div className="logo">
                <img
                    src="https://file.hstatic.net/200000343865/article/img-default_d917dfb76c004bc4a7d3b1b19d625d1d_large.png"
                    alt="easyclass"
                />
                <h5 style={{ color: 'red', fontWeight: 800, fontSize: '1.2rem' }}>Nhà xuất bản Kim Đồng</h5>
            </div>

            <div className="heading">
                <h2>Welcome Back</h2>
                <h6>Chưa có tài khoản? </h6>
                <a href="#" onClick={toggleMode} className="toggle">
                    Đăng ký
                </a>
            </div>

            {error && (
                <p style={{ fontSize: '0.85rem', border: '1px solid #bbb', padding: '10px', borderRadius: '5px' }}>
                    {error}
                </p>
            )}

            <div className="actual-form">
                <div className="input-wrap">
                    <input
                        type="text"
                        className="input-field"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-wrap">
                    <input
                        type="password"
                        className="input-field"
                        required
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <input type="submit" value="Đăng nhập" className="sign-btn" />

                <p className="text">
                    Quên mật khẩu hoặc thông tin đăng nhập của bạn?{' '}
                    <a href="#" className="toggle" onClick={onGetHelpClick}>
                        Nhận trợ giúp
                    </a>
                </p>
            </div>
        </form>
    );
};

export default SignInForm;
