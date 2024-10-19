import React, { useContext, useEffect, useState } from 'react';
import Footer from '~/layouts/Footer/Footer';
import Header from '~/layouts/Header/Header';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '~/context/UserContextProvider';
import favoriteApi from '~/apis/favoriteApi.js';

import BookFavorite from '~/component/Book/BookFavorite';
import images from '~/assets/images';

export default function FavoriteLayout() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [favoriteInfo, setFavoriteInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // console.log('Nguoi DUng:', user);
    
    
    const fetchFavoriteBooks = async () => {
        try {
            const books = await favoriteApi.getFavoriteBooksByUser(user.user_id);
            
            setFavoriteInfo(books);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.user_id) {
            fetchFavoriteBooks();
        }
    }, [user]);

    useEffect(() => {
        
        console.log('Favorite Info updated:', favoriteInfo);
    }, [favoriteInfo]);
   

    
    

    const handleRemoveAllFavorites = async () => {
        try {
            await favoriteApi.removeAllFavoriteBooks(user.user_id); // Gọi API xóa tất cả
            setFavoriteInfo([]); // Cập nhật state để xóa tất cả sách yêu thích
        } catch (error) {
            console.error("Error removing all favorite books:", error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div>
        
        

            <div className="mt-12 px-24 flex-col">
            <p className=" text-2xl font-bold  ">WishList</p>
            <div className="my-5 border border-gray-400"></div>  
            <div className="flex justify-end">
            <button onClick={handleRemoveAllFavorites}
            className="mb-6 rounded-md border-[1px] bg-primary-color text-center text-white px-2 py-2 hover:bg-red-800 ">Xóa tất cả</button>
            </div>

            
            </div>
            <div className='container mx-auto'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[40px] mx-24">
            {favoriteInfo.length > 0 ? (
                
                    favoriteInfo.map((favoriteBook, index) => {
                        const book = favoriteBook.Book; // Lấy đối tượng Book
const idUser = favoriteBook.user_id;
const idBook = favoriteBook.book_id;
                        return (
                            
                            <BookFavorite
                            key={index}
                                bookimages={book.bookimages}
                                book_name={book.book_name}
                                book_cost={book.book_cost}
                                
                                book_end_cost={book.book_end_cost}
                                book_star_rating={book.book_star_rating}
                                book_id={idBook}
                                user_id={idUser}
                                onRemove={fetchFavoriteBooks}
                            />
                            
                        );
                    })
                
            ) : (
                <div className="flex flex-col items-center py-5">
                            <img src={images.nothingIcon} alt="nothing" className="w-44 h-44" />
                            <span >Bạn chưa có sách yêu thích nào...</span>
                        </div>
            )}
            </div>
            </div>
            
            <div className="my-12"></div>
            
    </div>
  )
}
