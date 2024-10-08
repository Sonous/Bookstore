import React, { useEffect, useState } from 'react';
import Header from '~/layouts/Header/Header'
import { Link } from 'react-router-dom';
import { routes } from '~/config';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import axios from 'axios';
import { searchResult } from '~/dataTemorary';
import Book from '~/component/Book/Book';
import Review from '~/component/Review/Review';
import UserHeading from './UserHeading';


function UserPage({ UserData }) {
    // console.log(UserData);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        number: '',
      });
      useEffect(() => {
        if (UserData) {
          setFormData({
            firstname: UserData.firstname || '',
            lastname: UserData.lastname || '',
            email: UserData.email || '',
            number: UserData.number || '',
          });
        }
      }, [UserData]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleSave = (e) => {
        e.preventDefault();  // Prevent form from reloading
        console.log('Updated data:', formData);  // Simulate saving by logging
        // Here you can add code to send formData to a backend or API
      };
    const onFinish = (values) => {
      console.log('Success:', values);
    };
    const [validateAddress, setValidateAddress] = useState([]);
    const [form] = Form.useForm();
    const [city, setCity] = useState();
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
  
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
        <UserHeading/>
        <section className='userInfo flex bg-gray-300 mx-5 rounded-xl justify-between '>
            <div className="left-info flex flex-col w-full xl:w-3/12 mx-auto"> 
                <div className="bg-white rounded-xl p-5 mx-5 mt-5"> 
                    <h1 className="text-2xl font-bold 2xl:text-xl text-center py-5 border-b border-blue-500">
                        Public Profile
                    </h1>
                    {/* Avatar */}
                    <div className="grid max-w-2xl mx-auto mt-8">
                        <div className="flex flex-col lg:flex-row justify-between items-center space-y-5 2xl:space-y-0 2xl:space-x-4"> {/* Flex adjustments */}
                            <div className="bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png')] w-32 h-32 2xl:w-40 2xl:h-40 rounded-full bg-cover ring-2 ring-indigo-300"></div>
                            <div className="flex flex-col space-y-2 lg:ml-8"> {/* Adjusted space */}
                                <Button className="font-medium hover:bg-slate-800">Change Avatar</Button>
                                <Button className="font-medium bg-white text-black hover:bg-slate-300">Delete Avatar</Button>
                            </div>
                        </div>
                        {/* Update Info */}
                        <div className="mt-8 2xl:mt-14 text-[#202142]">
                            <div className="flex flex-col 2xl:flex-row 2xl:space-x-4 space-y-2 2xl:space-y-0">
                                <div className="w-full">
                                    <p className="block mb-2 text-sm font-medium text-indigo-900">Your First Name</p>
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={formData.firstname}
                                        onChange={handleChange}
                                        className="bg-indigo-50 border border-indigo-300 text-sm rounded-lg w-full p-2.5"
                                    />
                                </div>
                                <div className="w-full">
                                    <p className="block mb-2 text-sm font-medium text-indigo-900">Your Last Name</p>
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={formData.lastname}
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
                                <Button onClick={handleSave} className="text-white bg-indigo-700 hover:bg-indigo-800 rounded-lg px-5 py-2.5">Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
            <div className="mid-review w-6/12">
                <div className="review rounded-xl px-10 mt-5  dark:text-white"> {/* Removed round-xl */}
              
                    <Review /> {/* Ensure Review takes the full width */}
                </div>
            </div>

            <div className="right w-full lg:w-3/12 mx-auto"> 
                <div className="right-address bg-white rounded-xl px-5 lg:px-10 mx-5 mt-5"> 
                    <h1 className="text-2xl font-bold lg:text-xl text-center py-5 border-b border-blue-500">
                        Address
                    </h1>
                    <Form 
                        form={form} 
                        className="flex flex-col h-full justify-between my-4 w-full" 
                        name="basic" 
                        onFinish={onFinish} 
                        autoComplete="off"
                        initialValues={{ username: `${formData.firstname} ${formData.lastname}` }}
                    >
                        <Form.Item
                            label={<p className="min-w-[130px] text-start text-sm">Họ và tên</p>} 
                            name="username"
                        >
                            <Input className="w-full" placeholder="Enter your name" />
                        </Form.Item>
                        
                        <Form.Item 
                            label={<p className="min-w-[130px] text-start text-sm">Tỉnh/Thành Phố:</p>}
                            name="city"
                            rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố' }]}
                        >
                            <Select
                                placeholder="Chọn tỉnh/thành phố"
                                style={{ width: '150%' }} 
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
                                style={{ width: '150%' }} 
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
                                style={{ width: '150%' }} 
                                onChange={() => {
                                    setValidateAddress((prev) => [...prev, 'ward']);
                                }}
                                options={ward}
                            />
                        </Form.Item>

                        <Form.Item
                            label={<p className="w-[130px] text-start text-sm">Địa chỉ nhận hàng:</p>}
                            name="address"
                            rules={[{ required: true, message: 'Vui lòng nhập số địa chỉ nhận hàng' }]}
                        >
                            <Input className="w-[180px]" placeholder="Enter your address" />
                        </Form.Item>

                    
                    </Form>
                    <Button className='mb-5 items-center'>Save Address</Button>
                </div>

                <div className="right-info-likerecently bg-white rounded-xl px-5 sm:px-10 mx-5 mt-5"> 
                        <h1 className="text-2xl font-bold sm:text-xl text-center py-5">
                            Danh sách yêu thích gần đây
                        </h1>
                        <span className='text-right hover:underline hover:font-semibold hover:cursor-pointer'>Xem thêm</span>
                        {searchResult.slice(0, 3).map((item, index) => (
                        <Book key={index} {...item} />
                    ))}
                    </div>

                  
                </div>


            

        </section>
</div>
  )

}

export default UserPage;
