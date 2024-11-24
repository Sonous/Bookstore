import { Button, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import importReceiptApi from '~/apis/importReceiptApi';
import { formatDate } from '~/utils/formatDate';
import ReceiptModal from './WarehouseManagement/ReceiptModal';
import { AdminContext } from '~/context/AdminContextProvider';
import StatusTag from '~/components/StatusTag';

const tags = ['Tất cả', 'Đang xử lí', 'Hoàn tất', 'Bị hủy'];

export default function Provider() {
    const [currentTag, setCurrentTag] = useState('Tất cả');
    const [receipts, setReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [reload, setReload] = useState(false);
    const { admin } = useContext(AdminContext);

    useEffect(() => {
        const fetchApi = async () => {
            const data = await importReceiptApi.getReceiptsByStatus(currentTag);

            setReceipts(() => {
                return data.map((receipt) => ({
                    ...receipt,
                    receipt_status: receipt.receipt_status.replace(' - Đã cập nhật', ''),
                }));
            });
        };

        fetchApi();
    }, [currentTag, reload]);

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

    const handleUpdateDb = async () => {};

    const handleUpdateReceipt = async (status) => {
        const item_list = selectedReceipt.item_list.map((item) => ({
            ...item,
            book_status: status,
        }));

        await importReceiptApi.updateReceipt(
            {
                item_list: JSON.stringify(item_list),
                receipt_status: status === 'Bị hủy' ? 'Bị hủy' : 'Hoàn tất',
            },
            selectedReceipt.id,
        );
        setOpenModal(false);
        setReload(!reload);
    };

    return (
        <div className="flex h-svh justify-center items-center ">
            <div className="flex flex-col p-12 gap-5 shadow border-[1px] border-black rounded-xl w-[1000px]">
                <p className="text-2xl font-bold">Quản lý đơn đặt hàng</p>

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
                        receipts={selectedReceipt}
                        isProvider
                        columnItems={[
                            {
                                title: admin.role === 'provider' ? '' : 'Trạng thái',
                                dataIndex: admin.role === 'provider' ? '' : 'book_status',
                            },
                        ]}
                        handleUpdateDb={handleUpdateDb}
                        handleUpdateReceipt={handleUpdateReceipt}
                    />
                )}
            </div>
        </div>
    );
}
