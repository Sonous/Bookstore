import Forget from "~/component/Form/ForgetForm";
import LoginForm from "~/component/Form/LoginForm";
import RegisterForm from "~/component/Form/RegisterForm";
import React, { useState } from 'react';
import Carousel from "~/component/Form/Carousel";




export default function SignInPage() {
    const [signUpMode, setSignUpMode] = useState(false);
  const [showForgetForm, setShowForgetForm] = useState(false); // Trạng thái hiển thị ForgetForm

  const toggleMode = () => {
    setSignUpMode(!signUpMode);
  };

  const handleShowForgetForm = () => {
    setShowForgetForm(true); // Mở ForgetForm
  };

  const handleCloseForgetForm = () => {
    setShowForgetForm(false); // Đóng ForgetForm
  };

  return (
    <main className={signUpMode ? 'sign-up-mode' : ''}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            {!signUpMode ? (
              <LoginForm toggleMode={toggleMode} onGetHelpClick={handleShowForgetForm} /> // Truyền hàm để mở ForgetForm
            ) : (
              <RegisterForm toggleMode={toggleMode} />
            )}
          </div>
          <Carousel />

          {/* Pop-up Forget Password */}
          {showForgetForm && <Forget onClose={handleCloseForgetForm} />} 
        </div>
      </div>
    </main>
  );
}
