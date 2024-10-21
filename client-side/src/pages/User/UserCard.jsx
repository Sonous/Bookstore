import React, { useContext, useEffect, useState } from 'react';
import Header from '~/layouts/Header/Header';
import { Link } from 'react-router-dom';
import { routes } from '~/config';
import { Button, Checkbox, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import Review from '~/component/Review/Review';
import UserHeading from './UserHeading';
import { UserContext } from '~/context/UserContextProvider';
import request, { imageUrl } from '~/config/axios.config';

function UserCard({ UserData  }) {
    // console.log(UserData);
    const { user } = useContext(UserContext);
    const [newAvatar, setNewAvatar] = useState(null);

    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        number: '',
    });
    const [validateAddress, setValidateAddress] = useState([]);
    const [form] = Form.useForm();
    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [message, setMessage] = useState('');
    useEffect(() => {
        if ( user) {
            setFormData({
                user_name: user.user_name || '',
                email: user.user_email || '',
                number: user.user_phone || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSave = async (data) => {
        const token = localStorage.getItem('token'); // Lấy token từ local storage
        try {
            const response = await request.put(`/user/${user.user_id}`, data, {
                headers: {
                    'x-access-token': token,
                },
            });
            // Cập nhật trạng thái thông báo thành công
            setMessage('Update successful!');
            console.log('Update successful:', response.data);
        } catch (error) {
            // Cập nhật trạng thái thông báo lỗi
            setMessage('Error updating user: ' + (error.response ? error.response.data : error.message));
            console.error('Error updating user:', error.response ? error.response.data : error.message);
        }
    };
    
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadAvatar = async () => {
        if (!newAvatar) {
            message.error('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', newAvatar);

        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            const userId = user.user_id; // Ensure this matches your user structure

            const response = await axios.put(`http://localhost:5000/api/user/${userId}/avatar`, formData, {
                headers: {
                    'x-access-token': token,
                },
            });

            if (response.status === 200) {
                message.success('Avatar updated successfully!');
                // Optionally, refresh user data to get the new avatar
            } else {
                message.error('Failed to update avatar.');
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            message.error('Error uploading avatar.');
        }
    };

    const deleteAvatar = async () => {
        try {
            const token = localStorage.getItem('token'); // Get the token from localStorage
            const userId = user.user_id; // Ensure this matches your user structure

            const response = await axios.delete(`http://localhost:5000/api/user/${userId}/avatar`, {
                headers: {
                    'x-access-token': token,
                },
            });

            if (response.status === 200) {

            } else {
            }
        } catch (error) {
            console.error('Error deleting avatar:', error);
        }
    };


    const getCity = async () => {
        const response = await axios.get('https://provinces.open-api.vn/api/');
        const dataCity = [];
        response.data.map((city, idx) => {
            dataCity.push({
                label: city.name,
                value: city.code,
            });
        });
        setCity(dataCity);
    };

    const getDistrict = async (e) => {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${e}?depth=2`);
        const dataDistrict = [];
        response.data.districts.map((district, idx) => {
            dataDistrict.push({
                label: district.name,
                value: district.code,
            });
        });
        setDistrict(dataDistrict);
    };

    const getWards = async (e) => {
        const response = await axios.get(`https://provinces.open-api.vn/api/d/${e}?depth=2`);

        const dataWard = [];
        response.data.wards.map((ward, idx) => {
            dataWard.push({
                label: ward.name,
                value: ward.code,
            });
        });
        setWard(dataWard);
    };

    useEffect(() => {
        getCity();
       
    }, []);

    // Your JSX code here

    return (
        <div>
            <Header />
            <UserHeading />
            <section className="userInfo flex bg-gray-300 mx-5 rounded-xl justify-between ">
                <div className="left-info flex flex-col w-full xl:w-3/12 ">
                    <div className="bg-white rounded-xl p-5 mx-5 mt-5">
                        <h1 className="text-2xl font-bold 2xl:text-xl text-center py-5 border-b border-blue-500">
                            Public Profile
                        </h1>
                        {/* Avatar */}
                        <div className="flex flex-col max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col lg:flex-row justify-between items-center space-y-5 2xl:space-y-0 2xl:space-x-4">
                                {' '}
                                {/* Flex adjustments */}
                                <div className=" w-32 h-32 2xl:w-40 2xl:h-40 rounded-full bg-cover ring-2 ring-indigo-300" 
                                 style={{
                                    backgroundImage: `url(${imageUrl}/${user.user_avatar_url})`, // Use the first image
                                }}></div>
                                <div className="flex flex-col space-y-2 lg:ml-8">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                    id="avatar-upload" // Associate with label
                                />
                                <label htmlFor="avatar-upload">
                                    <Button className="font-medium hover:bg-slate-800" onClick={uploadAvatar}>
                                        Change Avatar
                                    </Button>
                                </label>
                                <Button className="font-medium bg-white text-black hover:bg-slate-300" onClick={deleteAvatar}>
                                    Delete Avatar
                                </Button>
                                </div>
                            </div>
                            {/* Update Info */}
                            <Form className="mt-8 2xl:mt-14 text-[#202142]">
                                <div className="flex flex-col 2xl:flex-row 2xl:space-x-4 space-y-2 2xl:space-y-0">
                                    <div className="w-full">
                                        <p className="block mb-2 text-sm font-medium text-indigo-900">
                                            Your Name
                                        </p>
                                        <input
                                            type="text"
                                            name="firstname"
                                            value={formData.user_name}
                                            onChange={handleChange}
                                            className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                                        />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <p className="block mb-2 text-sm font-medium text-indigo-900">Your Email</p>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                                    />
                                </div>
                                <div className="mb-6">
                                    <p className="block mb-2 text-sm font-medium text-indigo-900">Your Number</p>
                                    <input
                                        type="text"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                                    />
                                </div>
                                <div className="flex justify-end mt-5">
                                    <Button onClick={() => handleSave(formData)}
                                        
                                        className="text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg px-5 py-2.5"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="mid-review w-6/12">
                    <div className="review rounded-xl px-2 mt-5  dark:text-white">
                        {' '}
                        {/* Removed round-xl */}
                        <Review /> {/* Ensure Review takes the full width */}
                    </div>
                </div>

                <div className="right w-full lg:w-3/12 mx-auto">
                    <div className="right-address bg-white rounded-xl px-5 lg:px-5 mx-5 mt-5">
                        <h1 className="text-2xl font-bold lg:text-xl text-center py-5 border-b border-blue-500">
                            Address
                        </h1>
                        <Form
                            form={form}
                            className="flex flex-col h-full justify-between my-4 w-full"
                            name="basic"
                            onFinish={onFinish}
                            autoComplete="off"
                            initialValues={{ username: `${formData.user_name}` }}
                        >
                            <Form.Item
                                label={<p className="min-w-[130px] text-start text-sm ">Họ và tên</p>}
                                name="username"
                            >
                                <div className="w-full font-semibold" >{formData.user_name}</div>
                            </Form.Item>

                            <Form.Item
                                label={<p className="min-w-[130px] text-start text-sm">Tỉnh/Thành Phố:</p>}
                                name="city"
                                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
                            >
                                <Select
                                    placeholder="Chọn tỉnh/thành phố"
                                    style={{ width: '120%' }}
                                    onChange={(e) => {
                                        getDistrict(e);
                                        form.setFieldsValue({ district: null, ward: null });
                                        setValidateAddress((prev) => ['city']);
                                    }}
                                    options={city}
                                />
                            </Form.Item>

                            <Form.Item
                                label={<p className="min-w-[130px] text-start text-sm">Quận/Huyện:</p>}
                                name="district"
                                rules={[{ required: true, message: 'Vui lòng chọn quận' }]}
                            >
                                <Select
                                    disabled={validateAddress.includes('city') ? false : true}
                                    placeholder="Chọn quận/huyện"
                                    style={{ width: '120%' }}
                                    onChange={(e) => {
                                        getWards(e);
                                        form.setFieldsValue({ ward: null });
                                        setValidateAddress((prev) => ['city', 'district']);
                                    }}
                                    options={district}
                                />
                            </Form.Item>

                            <Form.Item
                                label={<p className="min-w-[130px] text-start text-sm">Phường/Xã:</p>}
                                name="ward"
                                rules={[{ required: true, message: 'Vui lòng chọn phường/xã' }]}
                            >
                                <Select
                                    disabled={validateAddress.includes('district') ? false : true}
                                    placeholder="Chọn phường/xã"
                                    style={{ width: '120%' }}
                                    onChange={() => {
                                        setValidateAddress((prev) => [...prev, 'ward']);
                                    }}
                                    options={ward}
                                />
                            </Form.Item>

                            <Form.Item className='items-end'
                                label={<p className="w-[120px] text-start text-sm">Địa chỉ nhận hàng:</p>}
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng nhập số địa chỉ nhận hàng' }]}
                                
                            >
                                <Input className="w-[150px] " placeholder="Enter your address" />
                            </Form.Item>
                        </Form>
                        <Button className="mb-5 items-center">Save Address</Button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserCard;
