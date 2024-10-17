import React, { useState } from 'react';
import authApi from '~/apis/authApi';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ toggleMode }) => {
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của form

      try {
          // Gọi API đăng ký
          const userDetails = { 
              user_name: name, 
              user_email: email, 
              user_password: password, 
              user_phone: phone, 
              user_avatar_url: "" 
          };
          const newUser = await authApi.register(userDetails);
          navigate('/');
          console.log('Đăng ký thành công:', newUser);
          // Có thể chuyển hướng hoặc hiển thị thông báo thành công

      } catch (error) {
          setError(error.message); // Lưu thông báo lỗi vào state
          console.error('Lỗi:', error);
      }
  };
  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <div className="logo">
        <img src="https://file.hstatic.net/200000343865/article/img-default_d917dfb76c004bc4a7d3b1b19d625d1d_large.png" alt="easyclass" />
        <h5 style={{ color: "red", fontWeight: 800, fontSize: '1.2rem' }}>Nhà xuất bản Kim Đồng</h5>

      </div>

      <div className="heading">
        <h2>Get Started</h2>
        <h6>Đã có tài khoản ? </h6>
        <a href="#" onClick={toggleMode} className="toggle">Đăng nhập</a>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
        <input 
                        type="text" 
                        className="input-field" 
                        required 
                        placeholder="Họ và Tên" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
          
        </div>

        <div className="input-wrap">
        <input 
                        type="email" 
                        className="input-field" 
                        required 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
          
        </div>

        <div className="input-wrap">
                    <input 
                        type="text" 
                        className="input-field" 
                        required 
                        placeholder="Số điện thoại" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
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

        <input type="submit" value="Đăng ký" className="sign-btn" />

        

        <p className="text">
        Bằng cách đăng ký, tôi đồng ý với <a href="#">Điều khoản dịch vụ</a> và <a href="#">Chính sách bảo mật</a>
        </p>
      </div>
    </form>
  );
};

export default SignUpForm;
