import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Pagination, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';

import Book from '~/component/Book/Book';

const sortedList = [
    { key: 0, title: 'Mới nhất' },
    { key: 1, title: 'Cũ nhất' },
    { key: 2, title: 'Giá tăng dần' },
    { key: 3, title: 'Giá giảm dần' },
    { key: 4, title: 'Bán chạy nhất' },
];

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

function Result({ collection = '', searchPage = false, data = [] }) {
    const [sortedSelection, setSortedSelection] = useState(sortedList[0]);
    const [books, setBooks] = useState([]);
    const [paging, setPaging] = useState({ page: 1, pageSize: 24 });
    const [genres, setGenres] = useState(mangaCommicGenres);
    const [checkedPrice, setCheckedPrice] = useState('');

    useEffect(() => {
        setBooks(data);
    }, [data]);

    const dropdownItems = sortedList.map((item) => ({
        key: item.key,
        label: <span className="cursor-pointer">{item.title}</span>,
        title: item.title,
    }));

    const handleSelection = (info) => {
        setSortedSelection({ key: info.key, title: info.item.props.title });
    };

    return (
        <div className="grid grid-cols-4 gap-4 mt-4 max-lg:grid-cols-2">
            <div className="aside bg-white shadow-sm px-3 py-2 max-lg:col-span-2">
                {!searchPage && (
                    <div className="genres pb-2 border-b-2">
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

            <div className="content col-span-3 row-span-2 bg-white shadow-sm p-5">
                <div className="header-collections p-4 flex  ">
                    <span className="font-bold flex-1 text-lg max-sm:hidden">
                        {!searchPage ? collection.toUpperCase() : `Kết quả tìm kiếm (${data.length})`}
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
                    {books
                        .filter((book, index) => {
                            return (
                                index >= (paging.page - 1) * paging.pageSize && index < paging.page * paging.pageSize
                            );
                        })
                        .map((book, index) => {
                            return <Book key={index} collection {...book} />;
                        })}
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

export default Result;
