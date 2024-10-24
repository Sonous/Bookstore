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

import userApi from '~/apis/userApi';
import addressApi from '~/apis/addressApi';

function UserCard() {
    const { user, setUser } = useContext(UserContext);
    const [newAvatar, setNewAvatar] = useState(null);
    const [addressId, setAddressId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addressData, setAddressData] = useState({
        address_id: '',
        address_house_number: '',
        address_ward: '',
        address_district: '',
        address_province: '',
    });
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_phone: '',
    });
 
    const [validateAddress, setValidateAddress] = useState([]);
    const [form] = Form.useForm();
    const [message, setMessage] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                setFormData({
                    user_name: user.user_name || '',
                    user_email: user.user_email || '',
                    user_phone: user.user_phone || '',
                });

                try {
                    const addressData = await addressApi.getAddressByUser(user.user_id);
                    console.log('Fetched address data:', addressData);
                    if (Array.isArray(addressData) && addressData.length > 0) {
                        const fetchedAddress = addressData[0]; // Adjust this based on your API response
                        setAddressData({
                            address_id: fetchedAddress.address_id,
                            address_house_number: fetchedAddress.address_house_number || '',
                            address_ward: fetchedAddress.address_ward || '',
                            address_district: fetchedAddress.address_district || '',
                            address_province: fetchedAddress.address_province || '',
                        });
                    } else {
                        console.error('No address data found for this user');
                        setMessage('No address data found for this user');
                    }
                } catch (error) {
                    console.error('Error fetching user address:', error);
                } finally {
                    setLoading(false); // Set loading to false after fetching
                }
            }
        };

        fetchData();
    }, [user]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleUpdateUser = async () => {
        try {
            // Call the updateUser function with the current form data
            const updatedUserData = await userApi.updateUser(user?.user_id, formData);
            console.log('User updated successfully:', updatedUserData);
            // Handle successful update (e.g., display a success message)
            setMessage('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error.message);
            setMessage('An error occurred while updating the user.'); // Informative error message
        } finally {
            // Optionally clear the form after submission
            setFormData({
                user_name: '',
                user_email: '',
                user_phone: '',
            });
        }
    };


    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewAvatar(file);
        }
    };

    // const uploadAvatar = async () => {
    //     if (!newAvatar) return;

    //     const formData = new FormData();
    //     formData.append('avatar', newAvatar);

    //     try {
    //         const updatedUser = await userApi.updateUserAvatar(user.user_id, formData);
    //         setUser(updatedUser); // Update context with new avatar
    //         setMessage('Avatar updated successfully!');
    //         console.log('Avatar uploaded successfully');
    //     } catch (error) {
    //         console.error('Error uploading avatar:', error);
    //         setMessage('An error occurred while uploading the avatar.');
    //     }
    // };

    // const deleteAvatar = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         const userId = user.user_id;

    //         const response = await axios.delete(`http://localhost:5000/api/user/${userId}/user_avatar_url`, {
    //             headers: {
    //                 'x-access-token': token,
    //             },
    //         });

    //         if (response.status === 200) {
    //             setUser({ ...user, user_avatar_url: null }); // Clear the avatar URL
    //             setMessage('Avatar deleted successfully!');
    //         } else {
    //             console.error('Failed to delete avatar');
    //         }
    //     } catch (error) {
    //         console.error('Error deleting avatar:', error);
    //     }
    // };

    // const getCity = async () => {
    //     const response = await axios.get('https://provinces.open-api.vn/api/');
    //     const dataCity = [];
    //     response.data.map((city, idx) => {
    //         dataCity.push({
    //             label: city.name,
    //             value: city.code,
    //         });
    //     });
    //     setCity(dataCity);
    // };

    // const getDistrict = async (e) => {
    //     const response = await axios.get(`https://provinces.open-api.vn/api/p/${e}?depth=2`);
    //     const dataDistrict = [];
    //     response.data.districts.map((district, idx) => {
    //         dataDistrict.push({
    //             label: district.name,
    //             value: district.code,
    //         });
    //     });
    //     setDistrict(dataDistrict);
    // };

    // const getWards = async (e) => {
    //     const response = await axios.get(`https://provinces.open-api.vn/api/d/${e}?depth=2`);

    //     const dataWard = [];
    //     response.data.wards.map((ward, idx) => {
    //         dataWard.push({
    //             label: ward.name,
    //             value: ward.code,
    //         });
    //     });
    //     setWard(dataWard);
    // };
    // const handleChangeCity = async (value) => {
    //     setDistrict([]); // Reset districts and wards
    //     setWard([]);
    //     await getDistrict(value); // Fetch districts for selected city
    // };

    // const handleChangeDistrict = async (value) => {
    //     setWard([]); // Reset wards
    //     await getWards(value); // Fetch wards for selected district
    // };

    const onFinish = async (values) => {
        console.log('Address update values:', values);
        try {
            const updatedAddress = {
                address_house_number: values.address,
                address_ward: values.ward,
                address_district: values.district,
                address_province: values.city,
                address_description: 'Your address description here',
            };

            await addressApi.updateAddress(user.user_id, addressId, updatedAddress);
            setMessage('Address updated successfully!');
        } catch (error) {
            console.error('Error updating address:', error);
            setMessage('An error occurred while updating the address.');
        }
    };

    // useEffect(() => {
    //     getCity();
    // }, []);
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
                                }}
                                onClick={() => document.getElementById('avatar-upload').click()} ></div>
                                <div className="flex flex-col space-y-2 lg:ml-8">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                    id="avatar-upload" // Associate with label
                                />
                                {/* <label htmlFor="avatar-upload">
                                    <Button className="font-medium hover:bg-slate-800" onClick={uploadAvatar}>
                                        Change Avatar
                                    </Button>
                                </label> */}
                                {/* <Button className="font-medium bg-white text-black hover:bg-slate-300" onClick={deleteAvatar}>
                                    Delete Avatar
                                </Button> */}
                                </div>
                            </div>
                            {/* Update Info */}
                            <Form className="mt-8 2xl:mt-14 text-[#202142]" form={form}>
                                <div className="flex flex-col 2xl:flex-row 2xl:space-x-4 space-y-2 2xl:space-y-0">
                                    <div className="w-full">
                                        <p className="block mb-2 text-sm font-medium text-indigo-900">Your Name</p>
                                        <input
                                            type="text"
                                            name="user_name" // Match with state key
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
                                        name="user_email" // Match with state key
                                        value={formData.user_email}
                                        onChange={handleChange}
                                        className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                                    />
                                </div>
                                <div className="mb-6">
                                    <p className="block mb-2 text-sm font-medium text-indigo-900">Your Number</p>
                                    <input
                                        type="text"
                                        name="user_phone" // Match with state key
                                        value={formData.user_phone}
                                        onChange={handleChange}
                                        className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                                    />
                                </div>
                                <div className="flex justify-end mt-5">
                                    <Button type="button" onClick={handleUpdateUser}>
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
                        className="flex flex-col h-full justify-between my-4 w-full"
                        onSubmit={onFinish}
                        autoComplete="off"
                    >
                        <div className="mb-4">
                            <label className="min-w-[130px] text-start text-sm">Họ và tên</label>
                            <div className="w-full font-semibold">{formData.user_name}</div>
                        </div>

                        <div className="mb-4">
                            <label className="min-w-[130px] text-start text-sm">Tỉnh/Thành Phố:</label>
                            <input
                                type="text"
                                style={{ width: '100%' }} // Adjust width as needed
                                defaultValue={addressData.address_province}
                                placeholder="Nhập tỉnh/thành phố"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="min-w-[130px] text-start text-sm">Quận/Huyện:</label>
                            <input
                                type="text"
                                placeholder="Nhập quận/huyện"
                                style={{ width: '100%' }}
                                defaultValue={addressData.address_district}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="min-w-[130px] text-start text-sm">Phường/Xã:</label>
                            <input
                                type="text"
                                placeholder="Nhập phường/xã"
                                style={{ width: '100%' }}
                                defaultValue={addressData.address_ward}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="min-w-[130px] text-start text-sm">Địa chỉ nhận hàng:</label>
                            <input
                                type="text"
                                className="w-[150px]"
                                placeholder="Enter your address"
                                defaultValue={addressData.address_house_number}
                                required
                            />
                        </div>

                        <div>
                            {/* <button className="mb-5 items-center" type="submit">
                                Save Address
                            </button> */}
                        </div>
                    </Form>
                 

                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserCard;
