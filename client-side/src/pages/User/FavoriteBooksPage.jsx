import React, { useState } from 'react';
import Header from '~/layouts/Header/Header';
import UserHeading from './UserHeading';
import Footer from '~/layouts/Footer/Footer';
import images from '~/assets/images';

export default function FavoriteBooksPage() {
    const [haveAnyBooks, setHaveAnyBooks] = useState(false);

    return (
        <>
            <Header />
            <UserHeading />
            <div className="bg-main-bg-color py-10">
                <div className="right-info-likerecently w-full  bg-white rounded-xl px-5 sm:px-10 mx-5 mt-5">
                    <h1 className="text-2xl font-bold border-b-2 sm:text-xl text-center py-3">Danh sách yêu thích</h1>
                    {haveAnyBooks ? (
                        <div>
                            {/* <span className="text-right hover:underline hover:font-semibold hover:cursor-pointer">
                        Xem thêm
                    </span>
                    {searchResult.slice(0, 3).map((item, index) => (
                        <Book key={index} {...item} />
                    ))}  */}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center py-5">
                            <img src={images.nothingIcon} alt="nothing" className="w-44 h-44" />
                            <span>Bạn chưa có sách yêu thích nào...</span>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}
