import { Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { Breadcrumb } from 'antd';
import { Dropdown, Menu } from 'antd';

import bookApi from '~/apis/bookApi';
import Rating from '~/component/Rating/Rating';
import Book from '~/component/Book/Book';
import UserReview from '~/component/userReview/UserReview';
import request, { imageUrl } from '~/config/axios.config';
import { convertPriceToString } from '~/utils/functions';
import { UserContext } from '~/context/UserContextProvider';
import Swal from 'sweetalert2';
import DropdownButton from 'antd/es/dropdown/dropdown-button';
import CommentList from '~/component/userReview/CommentList';
import transportApi from '~/apis/transportApi';

function BookDetail() {
    const { name } = useParams(); // Extract the book name from the URL
    const [activeHeader, setActiveHeader] = useState('Đánh giá');
    const [book, setBook] = useState(null);
    const [authBooks, setAuthBooks] = useState([]);
    const [bookGenre, setBookGenre] = useState(null); // Renamed for clarity
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const { user, alertExpiredLogin, setIsReloadCart, isReloadCart } = useContext(UserContext);
    const [transportMethod, setTransportMethod] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            const method = await transportApi.getTransportMethodById();

            setTransportMethod(method);
        };

        fetchApi();
    }, []);

    // Fetch book details using the book name
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookData = await bookApi.getBookByName(encodeURIComponent(name));
                setBook(bookData);

                // Fetch other books by the same author
                const booksByAuthor = await bookApi.getBookByAuthor(bookData.book_author);
                setAuthBooks(booksByAuthor);

                const genreData = await bookApi.getGenreOfBook(bookData.book_id);
                if (genreData && genreData.length > 0) {
                    setBookGenre(genreData[0].genres); // Set the genres array
                }
            } catch (err) {
                console.error('Error fetching book details:', err);
                setError('Could not fetch book details');
            }
        };
        fetchBookDetails();
    }, [name]);

    const [selectedTab, setSelectedTab] = useState('desc');

    const handleDanhGiaClick = () => {
        setActiveHeader('Đánh giá');
    };

    const handleCauHoiClick = () => {
        setActiveHeader('Câu hỏi và trả lời');
    };

    if (error) return <div>{error}</div>;
    if (!book) return <div>Loading...</div>;

    const handleAddBookToCart = () => {
        const token = localStorage.getItem('token');

        request
            .post(
                `/user/${user.user_id}/cart/${book.book_id}`,
                {
                    quantity,
                },
                {
                    headers: {
                        'x-access-token': token,
                    },
                },
            )
            .then((res) => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Thêm sách vào giỏ hàng thành công!',
                });

                setIsReloadCart(true);
            })
            .catch((err) => {
                if (err.message === 'Unauthorized!') {
                    alertExpiredLogin();
                }
            });
    };

    const collectionDisplay = book && book.book_collection ? book.book_collection : 'Không có';
    const breadcrumbItems = [
        { title: 'Home', href: '/' },
        { title: collectionDisplay, href: '#' },
        { title: book ? book.book_name : 'Book', href: '#' }, // Using a hash for the current book
    ];
    const handleMenuClick = (e) => {
        console.log('Selected:', e.key);
        // Add your sorting logic here based on the selected value
    };
    const dropDownmenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="oldest">Mới nhất</Menu.Item>
            <Menu.Item key="popular">Phổ biến nhất</Menu.Item>
        </Menu>
    );

    const handlePurchase = () => {
        const orderBook = {
            book_id: book.book_id,
            book_name: book.book_name,
            book_cost: book.book_cost,
            book_discount: book.book_discount,
            book_end_cost: book.book_end_cost,
            book_sold: book.book_sold,
            book_star_rating: book.book_star_rating,
            book_status: book.book_status,
            created_at: book.created_at,
            updated_at: book.updated_at,
            cart: {
                quantity: quantity,
            },
            bookimages: book.bookimages,
        };

        const order = {
            order_books: [orderBook],
            books_total_prices: parseFloat(book.book_end_cost) * quantity,
            transport_name: transportMethod.transport_name,
            transport_cost: transportMethod.transport_cost,
            order_total_cost: transportMethod.transport_cost + parseFloat(book.book_end_cost) * quantity,
        };

        localStorage.setItem('order', JSON.stringify(order));
        navigate('/paying/directly');
    };

    return (
        <div>
            <div className="0 rounded-xl flex flex-col">
                <div className="breadcumb  mx-4 lg:mx-48 mt-10">
                    <Breadcrumb
                        className="font-semibold text-black"
                        items={breadcrumbItems.map((item) => ({
                            title: item.href ? <a href={item.href}>{item.title}</a> : item.title,
                        }))}
                    />
                </div>
                <section className="upperDetail flex flex-col lg:flex-row  mx-4 lg:mx-48 justify-between gap-10">
                    <div className="leftPicture flex w-full lg:w-5/12 justify-center gap-1 px-5 py-10 bg-white border border-gray-100 rounded-xl">
                        <div
                            className="smallPicture w-[120px] h-[120px] 2xl:w-[150px] 2xl:h-[150px] mt-5 bg-cover bg-center bg-gray-300"
                            style={{
                                backgroundImage: `url(${imageUrl}/${book.bookimages[0]?.book_image_url})`, // Use the first image
                            }}
                        ></div>
                        <div
                            className="bigPicture w-[300px] h-[300px] 2xl:w-[600px] 2xl:h-[570px] bg-cover bg-center hover:scale-105 cursor-pointer transition-all ease-out bg-gray-300"
                            style={{
                                backgroundImage: `url(${imageUrl}/${book.bookimages[0]?.book_image_url})`, // Use the first image
                            }}
                        ></div>
                    </div>
                    <div className="rightContent px-5 flex flex-col w-full lg:w-7/12 bg-white border border-gray-100 rounded-xl">
                        <div className="top-title py-5 flex justify-between border-b border-b-gray-400">
                            <div className="title-content flex flex-col text-center justify-center w-full">
                                <h1 className="font-bold text-xl 2xl:text-2xl">{book.book_name}</h1>
                                <div className="rating flex items-center justify-between text-center">
                                    <div className="rating flex items-center gap-5">
                                        <Rating rating={book.book_star_rating} />
                                        <h1 className="2xl:text-lg">{book.book_star_rating}</h1>
                                    </div>
                                    <a className="text-right">
                                        Tác giả: <span className="font-semibold">{book.book_author}</span>
                                    </a>
                                </div>
                            </div>
                            <div className="heart-icon"></div>
                        </div>
                        <div className="price-content flex justify-start items-center text-center py-5 gap-5">
                            <h1 className="text-red-500 font-bold text-2xl 2xl:text-4xl">
                                {convertPriceToString(book.book_end_cost)}
                            </h1>
                            <h1 className="discount text-gray-500 font-bold text-xl 2xl:text-2xl line-through">
                                {convertPriceToString(book.book_cost)}
                            </h1>
                            <h1 className="2xl:text-md">
                                (Tiết kiệm {convertPriceToString(book.book_cost * book.book_discount)} )
                            </h1>
                        </div>
                        <div className="genre">
                            <h3 className="">
                                Thể loại:{' '}
                                <span>
                                    {bookGenre ? (
                                        bookGenre.map((genre, index) => (
                                            <span key={index} className="font-bold">
                                                {genre.genre_name}
                                                {index < bookGenre.length - 1 ? ', ' : ''}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="font-bold">N/A</span>
                                    )}
                                </span>
                            </h3>
                        </div>
                        <div className="information-content flex flex-col justify-around text-center py-5">
                            <div className="description h-[200px] border text-left px-5  flex flex-col gap-3 py-3 rounded-xl">
                                <h3 className="">
                                    Bộ sưu tập:{' '}
                                    <span className="font-bold">
                                        {' '}
                                        {book.book_collection ? book.book_collection : 'Không có'}
                                    </span>
                                </h3>
                                <h3 className="">
                                    Hình thức bìa: <span className="font-bold">{book.book_format}</span>
                                </h3>
                                <h3 className="">
                                    Số trang: <span className="font-bold">{book.book_page_num}</span>
                                </h3>
                                <h3 className="">
                                    Tình trạng: <span className="font-bold">{book.book_status}</span>
                                </h3>
                                <div className="flex justify-between gap-5">
                                    <h3 className="">
                                        Sách đang có: <span className="font-bold">{book.book_available}</span>
                                    </h3>
                                    <h3 className="">
                                        Sách đã bán: <span className="font-bold">{book.book_sold}</span>
                                    </h3>
                                </div>
                            </div>
                            <div className="add-to-cart gap-5">
                                <form className="add-to-cart-Form" id="AddToCartForm">
                                    <div className="qty-cart flex flex-col justify-end items-center">
                                        <span className="block mb-2 font-medium">Số lượng</span>
                                        <div className="qty-interact items-center border border-black rounded-md justify-between w-48">
                                            <button
                                                type="button"
                                                className="border-r border-black py-1"
                                                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                id="quantity"
                                                className="border-x-0 border-t border-b border-black text-center w-16"
                                                value={quantity}
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                className="border-l border-black py-1"
                                                onClick={() => setQuantity(quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div className="button-container flex justify-evenly">
                                    <Button
                                        className="bg-blue-500 text-white font-bold text-lg w-48"
                                        onClick={handleAddBookToCart}
                                    >
                                        Thêm vào giỏ hàng
                                    </Button>
                                    <Button
                                        className="bg-blue-500 text-white font-bold text-lg w-48"
                                        onClick={handlePurchase}
                                    >
                                        Mua ngay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="lowerDesc flex mx-4 lg:mx-48 mt-5 gap-10">
                    <div className="desc-content flex flex-col w-full lg:w-9/12">
                        <div className="bg-gray-100 border border-gray-600 rounded-xl">
                            <div className="heading bg-red-400 flex text-center rounded-t-xl">
                                <div
                                    className={`desc rounded-tl-xl px-5 cursor-pointer ${
                                        selectedTab === 'desc'
                                            ? 'bg-red-600 text-white'
                                            : 'hover:bg-red-600 hover:text-white'
                                    }`}
                                    onClick={() => setSelectedTab('desc')}
                                >
                                    <h1 className="font-semibold text-lg">Mô tả - Đánh giá</h1>
                                </div>
                                <div
                                    className={`cmt px-5 cursor-pointer ${
                                        selectedTab === 'cmt'
                                            ? 'bg-red-600 text-white'
                                            : 'hover:bg-red-600 hover:text-white'
                                    }`}
                                    onClick={() => setSelectedTab('cmt')}
                                >
                                    <h1 className="font-semibold text-lg">Bình luận</h1>
                                </div>
                            </div>
                            <div className="desc-text px-5">
                                {selectedTab === 'desc' ? (
                                    <div className="desc-text">{parse(book.book_description)}</div>
                                ) : (
                                    <div className="comment-form py-3 flex flex-col gap-3">
                                        <div className="top-comment  flex justify-between items-center">
                                            <h3>0 bình luận</h3>

                                            <Dropdown overlay={dropDownmenu} trigger={['click']}>
                                                <Button>
                                                    Sắp xếp theo<span>▼</span>
                                                </Button>
                                            </Dropdown>
                                        </div>

                                        {/* Example form elements */}
                                        <div className="form w-full">
                                            <textarea
                                                placeholder="Write your comment here..."
                                                className="border p-2 w-full"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="rating border-gray-600 mt-5 border px-5 rounded-xl py-5">
                            <h1 className="text-2xl">Đánh giá sản phẩm</h1>
                            <h1 className="flex items-center gap-5">
                                Rating: <Rating rating={book.book_star_rating} /> {book.book_star_rating || 'N/A'}
                            </h1>
                            <div className="danhgia flex">
                                <h1
                                    className={`cursor-pointer ${
                                        activeHeader === 'Đánh giá' ? 'font-bold underline' : ''
                                    }`}
                                    onClick={handleDanhGiaClick}
                                >
                                    Đánh giá
                                </h1>
                                <h1
                                    className={`ml-4 cursor-pointer ${
                                        activeHeader === 'Câu hỏi và trả lời' ? 'font-bold underline' : ''
                                    }`}
                                    onClick={handleCauHoiClick}
                                >
                                    Câu hỏi và trả lời
                                </h1>
                            </div>
                            <div className="content">{activeHeader === 'Đánh giá' && <UserReview />}</div>
                            <div className="content">{activeHeader === 'Câu hỏi và trả lời' && <CommentList />}</div>
                        </div>
                    </div>
                    <div className="same-author text-center items-center w-full lg:w-3/12 bg-white rounded-xl border mb-5">
                        <h1>Sách cùng tác giả</h1>
                        {authBooks.length > 0 ? (
                            authBooks.slice(0, 4).map((item, index) => (
                                <Book key={index} {...item} /> // Ensure Book component is defined
                            ))
                        ) : (
                            <div>No other books found by this author.</div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default BookDetail;
