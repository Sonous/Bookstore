import React, { useContext } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import authApi from '~/apis/authApi';
import Swal from 'sweetalert2';
import { AdminContext } from '~/context/AdminContextProvider';

export default function Login() {
    const navigate = useNavigate();

    const { getAdminInfo } = useContext(AdminContext);

    const onFinish = async (values) => {
        try {
            const token = await authApi.login(values.username, values.password);

            localStorage.setItem('token', token);
            getAdminInfo();
            navigate('/');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: error.message,
                toast: true,
                timer: 2500,
                timerProgressBar: true,
                position: 'top-end',
                showConfirmButton: false,
            });
        }
    };
    return (
        <div className="flex justify-center items-center h-svh">
            <div className="shadow-lg px-10 py-5 w-[400px] rounded-xl shadow-blue-300">
                <h1 className="text-center text-2xl pb-5">Login</h1>
                <Form
                    name="login"
                    style={{
                        maxWidth: 360,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                        or{' '}
                        <span className="cursor-pointer hover:text-blue-500" onClick={() => navigate('/register')}>
                            Register now!
                        </span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
