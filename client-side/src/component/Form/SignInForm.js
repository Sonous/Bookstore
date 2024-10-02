import React from 'react';


const SignInForm = ({ toggleMode,  onGetHelpClick }) => {
  return (
    <form className="sign-in-form">
      <div className="logo">
        <img src="https://file.hstatic.net/200000343865/article/img-default_d917dfb76c004bc4a7d3b1b19d625d1d_large.png" alt="easyclass" />
        <h5 style={{ color: "red" }}>Nhà xuất bản Kim Đồng</h5>
      </div>

      <div className="heading">
        <h2>Welcome Back</h2>
        <h6>Not registered yet? </h6>
        <a href="#" onClick={toggleMode} className="toggle">Sign up</a>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input type="text" className="input-field" required placeholder="Name" />
          
        </div>

        <div className="input-wrap">
          <input type="password" className="input-field" required placeholder="Password" />
          
        </div>

        <input type="submit" value="Sign In" className="sign-btn" />

        <p className="text">
          Forgotten your password or your login details? <a href="#" onClick={onGetHelpClick}>Get help</a> signing in
        </p>
      </div>
    </form>
  );
};

export default SignInForm;
