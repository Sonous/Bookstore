import { Dropdown, Pagination, Checkbox } from 'antd';
import { memo, useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';

import Book from '~/component/Book/Book';
import images from '~/assets/images';
import classNames from 'classnames';

const sortedList = [
    { key: 0, title: 'Mới nhất' },
    { key: 1, title: 'Cũ nhất' },
    { key: 2, title: 'Giá tăng dần' },
    { key: 3, title: 'Giá giảm dần' },
    { key: 4, title: 'Bán chạy nhất' },
];

const prices = [
    {
        label: 'Nhỏ hơn 100,000₫',
        value: {
            minPrice: 0,
            maxPrice: 100000,
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
            maxPrice: 99999999999,
        },
    },
];

const priceLables = prices.map((price) => price.label);

function Result({ category, selectedGenres, searchPage = false, data = [], setSelectedGeners, otherPage = false }) {
    const [sortedSelection, setSortedSelection] = useState(sortedList[0]);
    const [books, setBooks] = useState([]);
    const [paging, setPaging] = useState({ page: 1, pageSize: 24 });
    const [genres, setGenres] = useState([]);
    const [checkedPrice, setCheckedPrice] = useState('');

    useEffect(() => {
        if (!checkedPrice) {
            setSortedSelection(sortedList[0]);
            setBooks(() => {
                data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                return data;
            });
            return;
        }

        const priceCondition = prices.find((price) => {
            return price.label === checkedPrice;
        });

        const filteredBooks = data.filter((book) => {
            const price = parseFloat(book.book_end_cost);

            return price >= priceCondition.value.minPrice && price <= priceCondition.value.maxPrice;
        });

        setBooks(filteredBooks);
    }, [data, checkedPrice]);

    useEffect(() => {
        if (category) {
            setGenres(category.genres.map((genre) => genre.genre_name));
        }
    }, [category]);

    const dropdownItems = sortedList.map((item) => ({
        key: item.key,
        label: <span className="cursor-pointer">{item.title}</span>,
        title: item.title,
    }));

    useEffect(() => {
        setSortedSelection(sortedList[0]);
        setCheckedPrice('');
    }, [data]);

    const handleSelection = (info) => {
        switch (parseInt(info.key)) {
            case 0:
                setBooks((prev) => {
                    prev.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    return prev;
                });
                break;
            case 1:
                setBooks((prev) => {
                    prev.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                    return prev;
                });
                break;
            case 2:
                setBooks((prev) => {
                    prev.sort((a, b) => parseFloat(a.book_end_cost) - parseFloat(b.book_end_cost));
                    return prev;
                });
                break;
            case 3:
                setBooks((prev) => {
                    prev.sort((a, b) => parseFloat(b.book_end_cost) - parseFloat(a.book_end_cost));
                    return prev;
                });
                break;
            case 4:
                setBooks((prev) => {
                    prev.sort((a, b) => b.book_sold - a.book_sold);
                    return prev;
                });
                break;

            default:
                break;
        }

        setSortedSelection({ key: info.key, title: info.item.props.title });
    };

    return (
        <div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2">
            {!otherPage && (
                <div className="aside bg-white shadow-sm px-3 py-2 max-lg:col-span-2">
                    {!searchPage && (
                        <div className="genres pb-2 border-b-2">
                            <span className=" font-bold">THỂ LOẠI</span>
                            <Checkbox.Group
                                className="flex flex-col py-2"
                                options={genres}
                                onChange={(checkedValues) => setSelectedGeners(checkedValues)}
                                value={selectedGenres}
                            />
                        </div>
                    )}

                    <div className="prices py-2">
                        <span className=" font-bold">GIÁ</span>
                        <Checkbox.Group
                            className="flex flex-col py-2"
                            options={priceLables}
                            value={checkedPrice}
                            onChange={(checkedValues) => setCheckedPrice(...checkedValues)}
                        />
                    </div>
                </div>
            )}

            <div
                className={classNames('content col-span-3 row-span-2 bg-white shadow-sm p-5', {
                    'col-span-4': otherPage,
                })}
            >
                <div className="header-collections p-4 flex  ">
                    <span className="font-bold flex-1 text-lg max-sm:hidden">
                        {!searchPage
                            ? category && category.category_name.toUpperCase()
                            : `Kết quả tìm kiếm (${data.length})`}
                    </span>
                    <div>
                        Sắp xếp theo:
                        <Dropdown
                            menu={{
                                items: dropdownItems,
                                selectedKeys: [sortedSelection.key || '0'],
                                onClick: handleSelection,
                            }}
                            trigger={['click']}
                        >
                            <span className="cursor-pointer py-1 px-2 ml-3 rounded-md border-2 border-gray-400 w-40 inline-flex">
                                <span className="flex-1">{sortedSelection.title}</span>
                                <DownOutlined />
                            </span>
                        </Dropdown>
                    </div>
                </div>

                <ul className="main-collections grid grid-cols-4 gap-4 sm:max-md:grid-cols-3 max-sm:grid-cols-2">
                    {books.length ? (
                        books
                            .filter((book, index) => {
                                return (
                                    index >= (paging.page - 1) * paging.pageSize &&
                                    index < paging.page * paging.pageSize
                                );
                            })
                            .map((book, index) => {
                                return <Book key={index} collection {...book} />;
                            })
                    ) : (
                        <div className="flex flex-col items-center col-span-4 py-5">
                            <span>
                                <img src={images.nothingIcon} alt="" className="w-36 h-w-36" />
                            </span>
                            <span className="text-2xl font-bold">Không tìm thấy kết quả....</span>
                        </div>
                    )}
                </ul>

                <div className="paging flex justify-center py-5">
                    <Pagination
                        total={books.length}
                        defaultPageSize={24}
                        responsive
                        onChange={(page, pageSize) => setPaging({ page, pageSize })}
                    />
                </div>
            </div>
        </div>
    );
}

export default memo(Result);
