import classNames from 'classnames';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import Header from '~/layouts/Header/Header';
import { Checkbox, Dropdown, Pagination } from 'antd';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';

import { searchResult } from '~/dataTemorary';
import Book from '~/component/Book/Book';
import Footer from '~/layouts/Footer/Footer';

const mangaCommicGenres = ['Trinh thám', 'Hành động', 'Fantasty', 'Slice of Life'];
const prices = [
    {
        label: 'Nhỏ hơn 100,000₫',
        value: {
            maxPrice: 150000,
        },
    },
    {
        label: 'Từ 100,000₫ - 200,000₫',
        value: {
            minPrice: 100000,
            maxPrice: 200000,
        },
    },
    {
        label: 'Từ 200,000₫ - 300,000₫',
        value: {
            minPrice: 200000,
            maxPrice: 300000,
        },
    },
    {
        label: 'Từ 300,000₫ - 400,000₫',
        value: {
            minPrice: 300000,
            maxPrice: 400000,
        },
    },
    {
        label: 'Từ 400,000₫ - 500,000₫',
        value: {
            minPrice: 400000,
            maxPrice: 500000,
        },
    },
    {
        label: 'Lớn hơn 500,000₫',
        value: {
            minPrice: 500000,
        },
    },
];

const priceLables = prices.map((price) => price.label);

const orders = ['Mới nhất', 'Cũ nhất', 'Giá tăng dần', 'Giá giảm dần', 'Bán chạy nhất'];

function CollectionsPage() {
    const { collection } = useParams();
    const [genres, setGenres] = useState(mangaCommicGenres);
    const [checkedPrice, setCheckedPrice] = useState('');
    const [orderSelection, setOrderSelection] = useState('Mới nhất');
    const [books, setBooks] = useState(searchResult);
    const [paging, setPaging] = useState({ page: 1, pageSize: 24 });

    const dropdownItems = orders.map((order, index) => ({
        key: index,
        label: <span className="cursor-pointer">{order}</span>,
        onClick: () => {
            setOrderSelection(order);
        },
    }));
    // console.log(books.length)

    return (
        <>
            <Header />
            <div className="w-full flex justify-center bg-main-bg-color py-5">
                <div className="w-main-width">
                    <div className="nav text-base font-semibold flex items-center gap-2">
                        <Link to="/">
                            <span className="hover:text-primary-color cursor-pointer transition-all">TRANG CHỦ</span>
                        </Link>
                        <FontAwesomeIcon icon={faChevronRight} className="text-xs font-medium" />
                        <span>{collection.toUpperCase()}</span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mt-4">
                        <div className="aside bg-white shadow-sm px-3 py-2">
                            <div className="genres pb-2">
                                <span className=" font-bold">THỂ LOẠI</span>
                                <Checkbox.Group
                                    className="flex flex-col py-2"
                                    options={genres}
                                    onChange={(checkedValues) => console.log(checkedValues)}
                                />
                                <div className="flex justify-center">
                                    <span className="text-center font-medium cursor-pointer hover:text-primary-color">
                                        Xem thêm
                                        <FontAwesomeIcon icon={faChevronDown} className="ml-1 text-sm" />
                                    </span>
                                </div>
                            </div>

                            <div className="prices border-t-2 py-2">
                                <span className=" font-bold">GIÁ</span>
                                <Checkbox.Group
                                    className="flex flex-col py-2"
                                    options={priceLables}
                                    value={checkedPrice}
                                    onChange={(checkedValues) => setCheckedPrice(...checkedValues)}
                                />
                            </div>
                        </div>

                        <div className="content col-span-3 row-span-2 bg-white shadow-sm p-3">
                            <div className="header-collections p-4 flex  ">
                                <span className="font-bold flex-1 text-lg">{collection.toUpperCase()}</span>
                                <div>
                                    Sắp xếp theo:
                                    <Dropdown
                                        menu={{
                                            items: dropdownItems,
                                        }}
                                        trigger={['click']}
                                    >
                                        <span className="cursor-pointer py-1 px-2 ml-3 rounded-md border-2 border-gray-400 w-40 inline-flex">
                                            <span className="flex-1">{orderSelection}</span>
                                            <DownOutlined />
                                        </span>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="main-collections grid grid-cols-4">
                                {books.filter((book, index) => {
                                    return (index >= ((paging.page - 1) * paging.pageSize)) && (index < (paging.page * paging.pageSize))
                                }).map((book, index) => {
                                    return <Book key={index} collection {...book} />;
                                })}
                            </div>

                            <div className="paging flex justify-center py-5">
                                <Pagination
                                    total={books.length}
                                    defaultPageSize={24}
                                    responsive
                                    onChange={(page, pageSize) => setPaging({page, pageSize})}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CollectionsPage;
