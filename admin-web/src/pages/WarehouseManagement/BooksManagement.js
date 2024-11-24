import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import bookApi from '~/apis/bookApi';
import { imageUrl } from '~/configs/axios.config';
import Aside from '~/layouts/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';
import { removeVietnameseTones } from '~/utils';
import ReceiptModal from './ReceiptModal';

export default function BooksManagement() {
    const [books, setBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const searchInput = useRef(null);

    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys, selectedRows) => {
            setSelectedRowKeys(newSelectedRowKeys);
            setSelectedBooks(selectedRows);
        },
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => {
            const bookName = removeVietnameseTones(record[dataIndex].toString().toLowerCase());
            return bookName.includes(removeVietnameseTones(value.toLowerCase()));
        },
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
    });

    const bookColumns = [
        {
            title: 'Ảnh',
            dataIndex: 'bookimages',
            render: (text) => {
                return (
                    <img src={`${imageUrl}/${text[0].book_image_url}`} className="w-20 h-20 object-contain" alt="" />
                );
            },
        },
        {
            title: 'Tên sách',
            dataIndex: 'book_name',
            ...getColumnSearchProps('book_name'),
        },
        {
            title: 'Số sách đã bán',
            dataIndex: 'book_sold',
            sorter: {
                compare: (a, b) => a.book_sold - b.book_sold,
                multiple: 2,
            },
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Số sách còn lại',
            dataIndex: 'book_available',
            sorter: {
                compare: (a, b) => a.book_available - b.book_available,
                multiple: 2,
            },
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Trạng thái',
            dataIndex: 'book_status',
            filters: [
                {
                    text: 'Còn hàng',
                    value: 'Còn hàng',
                },
                {
                    text: 'Hết hàng',
                    value: 'Hết hàng',
                },
            ],
            onFilter: (value, record) => record.book_status.includes(value),
        },
    ];

    useEffect(() => {
        const fetchApi = async () => {
            const results = await bookApi.getAllBooks();

            setBooks(() =>
                results.map((book, index) => ({
                    key: index,
                    quantity: 0,
                    totalPrice: 0,
                    ...book,
                })),
            );
        };

        fetchApi();
    }, [refresh]);

    return (
        <DefaultLayout AsideElement={<Aside openedKey={'Sách'} selectedKey={'Quản lí kho hàng'} />}>
            <div className="flex flex-col p-12 gap-5">
                <p className="text-2xl font-bold">Danh sách sản phẩm</p>
                <div className="flex justify-end">
                    <Button
                        icon={<PlusOutlined />}
                        disabled={selectedBooks.length < 1}
                        onClick={() => setOpenModal(true)}
                    >
                        Tạo phiếu nhập
                    </Button>
                </div>
                <Table rowSelection={{ ...rowSelection }} columns={bookColumns} dataSource={books} />
                <ReceiptModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    selectedBooks={selectedBooks}
                    setSelectedBooks={setSelectedBooks}
                    setSelectedRowKeys={setSelectedRowKeys}
                    setRefresh={setRefresh}
                />
            </div>
        </DefaultLayout>
    );
}
