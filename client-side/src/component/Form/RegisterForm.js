import React from 'react';


const RegisterForm = ({ toggleMode }) => {
  return (
    <form className="sign-up-form">
      <div className="logo">
        <img src="https://file.hstatic.net/200000343865/article/img-default_d917dfb76c004bc4a7d3b1b19d625d1d_large.png" alt="easyclass" />
        <h5 style={{ color: "red" }}>Nhà xuất bản Kim Đồng</h5>

      </div>

      <div className="heading">
        <h2>Get Started</h2>
        <h6>Already have an account? </h6>
        <a href="#" onClick={toggleMode} className="toggle">Sign in</a>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input type="text" className="input-field" required placeholder="Name"/>
          
        </div>

        <div className="input-wrap">
          <input type="email" className="input-field" required placeholder="Email"/>
          
        </div>

        <div className="input-wrap">
          <input type="password" className="input-field" required placeholder="Password"/>
          
        </div>

        <input type="submit" value="Sign Up" className="sign-btn" />

        <p className="text">
          By signing up, I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
