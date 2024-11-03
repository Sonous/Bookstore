import React, { useState, useRef } from 'react';
import './ForgetForm.css'; // Tạo file CSS riêng để tùy chỉnh giao diện



const ForgetForm = ({ onClose }) => {

  const [step, setStep] = useState(1); // Quản lý các bước
  const [method, setMethod] = useState(null); // Email hoặc số điện thoại
  const [emailOrPhone, setEmailOrPhone] = useState(''); // Lưu thông tin email hoặc số điện thoại
  const [otp, setOtp] = useState(Array(6).fill('')); // Lưu OTP
  const [newPassword, setNewPassword] = useState(''); // Lưu mật khẩu mới
  const [confirmPassword, setConfirmPassword] = useState(''); // Lưu mật khẩu xác nhận

  const otpRefs = useRef([]); // Tạo mảng refs để quản lý các ô OTP

  const handleMethodSelect = (method) => {
    setMethod(method);
    setStep(2); // Chuyển sang bước nhập thông tin
  };

  const handleSubmit = () => {
    if (step === 2) {
      setStep(3); // Chuyển sang bước nhập OTP
    } else if (step === 3) {
      setStep(4); // Chuyển sang bước tạo mật khẩu
    } else if (step === 4) {
      if (newPassword === confirmPassword) {
        alert('Mật khẩu đã được đặt lại thành công');
        onClose(); // Đóng pop-up khi hoàn tất
      } else {
        alert('Mật khẩu không khớp!');
      }
    }
  };

  // Xử lý nhập OTP và chuyển ô tiếp theo
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Chuyển sang ô tiếp theo nếu có
      if (index < 5 && value !== '') {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  return (
    <div className="forget-form-overlay">
      <div className="forget-form-container">
        <button className="close-btn" onClick={onClose}>X</button> {/* Nút thoát */}
        
        {step === 1 && (
          <div className="popup-step">
            <h2>Quên mật khẩu</h2>
            <div className="method-buttons">
              <button onClick={() => handleMethodSelect('email')}>📧 Email</button>
              <button onClick={() => handleMethodSelect('phone')}>📱 Số điện thoại</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="popup-step">
            <h3>Quên mật khẩu</h3>
            <div className="form-row">
              <h5>{method === 'email' ? 'Email' : 'Số điện thoại'}:</h5> 
              
              <input 
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder={`Điền ${method === 'email' ? 'email' : 'số điện thoại'}`}
              /> 
              </div>
              <button className='btn' onClick={handleSubmit}>Lấy mã</button>
            
          </div>
        )}

        {step === 3 && (
          <div className="popup-step">
            <h3>Nhập mã OTP</h3> <br />
            <p>Vui lòng nhập mã OTP từ {method === 'email' ? 'email' : 'số điện thoại'} của bạn.</p>
            <div className="otp-inputs">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => otpRefs.current[index] = el} // Gán ref cho từng ô input
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyUp={(e) => {
                    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
                      otpRefs.current[index - 1].focus(); // Quay lại ô trước đó khi nhấn Backspace
                    }
                  }}
                />
              ))}
            </div>
            <p>Bạn chưa nhận được mã? <a href="#">Gửi lại</a></p>
            <button className='btn' onClick={handleSubmit}>Xác nhận</button>
          </div>
        )}

        {step === 4 && (
          <div className="popup-step">
            <h3>Tạo mật khẩu mới</h3>
            <div className='form-row'>
              <h5>Mật khẩu mới:&emsp;&nbsp;</h5>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nhập mật khẩu mới"
              />
            </div>
            <div className='form-row'>
              <h5>Nhập lại mật khẩu:</h5>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Nhập lại mật khẩu mới"
              />
            </div>
            <button className='btn' onClick={handleSubmit}>Đặt lại mật khẩu</button>
          </div>
        )}
      </div>
    </div>
  );
};


export default ForgetForm;

