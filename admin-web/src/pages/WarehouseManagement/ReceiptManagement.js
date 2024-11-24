import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import importReceiptApi from '~/apis/importReceiptApi';
import Aside from '~/layouts/Aside';
import DefaultLayout from '~/layouts/DefaultLayout';
import { formatDate } from '~/utils/formatDate';
import ReceiptModal from './ReceiptModal';
import bookApi from '~/apis/bookApi';
import StatusTag from '~/components/StatusTag';

const tags = ['Tất cả', 'Đang xử lí', 'Hoàn tất', 'Bị hủy'];

export default function ReceiptManagement() {
    const [currentTag, setCurrentTag] = useState('Tất cả');
    const [receipts, setReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchApi = async () => {
            const data = await importReceiptApi.getReceiptsByStatus(currentTag);

            setReceipts(data);
        };

        fetchApi();
    }, [currentTag, refresh]);

    const columns = [
        {
            title: 'Mã phiếu',
            dataIndex: 'id',
            render: (text) => <p>{text.slice(0, 8)}</p>,
        },
        {
            title: 'Người lập',
            dataIndex: 'createBy',
        },
        {
            title: 'Ngày lập',
            dataIndex: 'created_at',
            render: (text) => <p>{formatDate(text)}</p>,
        },
        {
            title: 'Số sản phẩm nhập',
            dataIndex: 'item_list',
            render: (text) => <p>{text.length}</p>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'receipt_status',
            render: (text) => (
                <div className="flex">
                    <StatusTag status={text} />
                </div>
            ),
        },
        {
            render: (_, record) => {
                return (
                    <Button
                        type="primary"
                        onClick={() => {
                            setSelectedReceipt(record);
                            setOpenModal(true);
                        }}
                    >
                        Xem chi tiết
                    </Button>
                );
            },
            width: 40,
        },
    ];

    const handleChangTag = (tag) => {
        setCurrentTag(tag);
    };

    return (
        <DefaultLayout AsideElement={<Aside openedKey={'Sách'} selectedKey={'Quản lí kho hàng'} />}>
            <div className="flex flex-col p-12 gap-5">
                <p className="text-2xl font-bold">Quản lý phiếu nhập</p>

                <div>
                    <div className="flex gap-3">
                        {tags.map((tag, index) => (
                            <Button
                                key={index}
                                type={currentTag === tag ? 'primary' : 'default'}
                                onClick={() => handleChangTag(tag)}
                            >
                                {tag}
                            </Button>
                        ))}
                    </div>
                    <Table columns={columns} dataSource={receipts} />
                </div>

                {receipts.length > 0 && selectedReceipt && (
                    <ReceiptModal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        selectedBooks={selectedReceipt.item_list}
                        isCreated
                        receipts={selectedReceipt}
                        setRefresh={setRefresh}
                        columnItems={[
                            {
                                title: 'Trạng thái',
                                dataIndex: 'book_status',
                            },
                        ]}
                    />
                )}
            </div>
        </DefaultLayout>
    );
}
