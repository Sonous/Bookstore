import React from 'react';
import { Link } from 'react-router-dom';
import { BiHomeAlt } from 'react-icons/bi';
import NotFoundImage from '../assets/images/404.svg';

function NotFound() {
    return (
        <div className="flex-colo gap-8 w-full min-h-screen text-black lg:py-20 py-10 px-6">
            <img className="w-full h-96 object-contain" src={NotFoundImage} alt="notfound" />

            <div className="flex flex-col items-center justify-center mt-20 ">
                <h1 className="lg:text-4xl font-bold">Oops ... Không tìm thấy trang</h1>
                <Link
                    to="/"
                    className="mt-10 flex bg-red-600 transition text-white text-xl items-center flex-row gap-4 font-medium py-3 hover:text-black px-6 rounded-md"
                >
                    <BiHomeAlt className="text-2xl"/>
                    Trở về Trang chủ
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
