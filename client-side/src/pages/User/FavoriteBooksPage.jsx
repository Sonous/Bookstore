import React, { useState } from 'react';
import Header from '~/layouts/Header/Header';
import UserHeading from './UserHeading';
import Footer from '~/layouts/Footer/Footer';
import images from '~/assets/images';
import FavoriteLayout from '../FavoritePage/FavoriteLayout';

export default function FavoriteBooksPage() {
    const [haveAnyBooks, setHaveAnyBooks] = useState(false);

    return (
        <>
            <Header />
            <UserHeading />
            <div className="bg-main-bg-color py-10">
                <div className="right-info-likerecently bg-white rounded-xl px-5 sm:px-10 mx-5 mt-5">
                    <FavoriteLayout />
                </div>
            </div>

            <Footer />
        </>
    );
}
