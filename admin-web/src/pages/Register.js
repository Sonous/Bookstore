import React, { useContext } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import authApi from '~/apis/authApi';
import Swal from 'sweetalert2';
import { AdminContext } from '~/context/AdminContextProvider';

export default function Register() {
    const navigate = useNavigate();

    const { getAdminInfo } = useContext(AdminContext);

    const onFinish = async (values) => {
        try {
            const adminInfo = await authApi.regiter(values.username, values.password, values.name, values.role);

            const token = await authApi.login(adminInfo.admin_username, adminInfo.admin_password, adminInfo.role);

            localStorage.setItem('token', token);
            getAdminInfo();
            if (values.role === 'admin') {
                navigate('/');
            } else {
                navigate('/provider');
            }
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
                <h1 className="text-center text-2xl pb-5">Register</h1>
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
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Your name" />
                    </Form.Item>
                    <Form.Item
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your role!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                {
                                    value: 'admin',
                                    label: 'admin',
                                },
                                {
                                    value: 'provider',
                                    label: 'provider',
                                },
                            ]}
                            placeholder="Select your role"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                    </Form.Item>

                    <Form.Item
                        name="Confirm password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Register
                        </Button>
                        or{' '}
                        <span className="cursor-pointer hover:text-blue-500" onClick={() => navigate('/login')}>
                            Log in now!
                        </span>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
