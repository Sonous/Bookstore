import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '~/component/Form/SignInForm';
import SignUpForm from '~/component/Form/SignUpForm';
import Carousel from '~/component/Form/Carousel';
import ForgetForm from '~/component/Form/ForgetForm';

export default function SignInPage() {
    const [signUpMode, setSignUpMode] = useState(false);
    const [showForgetForm, setShowForgetForm] = useState(false); // Trạng thái hiển thị ForgetForm
    const navigate = useNavigate();

    const toggleMode = () => {
        setSignUpMode(!signUpMode);
    };

    const handleShowForgetForm = () => {
        setShowForgetForm(true); // Mở ForgetForm
    };

    const handleCloseForgetForm = () => {
        setShowForgetForm(false); // Đóng ForgetForm
    };

    // Theo dõi sự thay đổi của signUpMode
    useEffect(() => {
        if (signUpMode) {
            navigate('/signUp'); // Điều hướng đến signUp
        } else {
            navigate('/signIn'); // Điều hướng đến signIn
        }
    }, [signUpMode, navigate]);

    return (
        <main className={signUpMode ? 'sign-up-mode' : ''}>
            <div className="box">
                <div className="inner-box">
                    <div className="forms-wrap">
                        {!signUpMode ? (
                            <SignInForm toggleMode={toggleMode} onGetHelpClick={handleShowForgetForm} /> // Truyền hàm để mở ForgetForm
                        ) : (
                            <SignUpForm toggleMode={toggleMode} />
                        )}
                    </div>
                    <Carousel />

                    {/* Pop-up Forget Password */}
                    {showForgetForm && <ForgetForm onClose={handleCloseForgetForm} />}
                </div>
            </div>
        </main>
    );
}
