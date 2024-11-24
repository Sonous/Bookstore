import React, { useContext, useEffect, useState } from 'react';
import { imageUrl } from '~/configs/axios.config';
import { Button, Checkbox, Input, InputNumber, Modal, Table } from 'antd';
import { convertPriceToString } from '~/utils';
import importReceiptApi from '~/apis/importReceiptApi';
import Swal from 'sweetalert2';
import bookApi from '~/apis/bookApi';
import { AdminContext } from '~/context/AdminContextProvider';
import { formatDate } from '~/utils/formatDate';
import { useNavigate } from 'react-router-dom';

export default function ReceiptModal({
    openModal,
    setOpenModal,
    selectedBooks,
    setSelectedBooks,
    setSelectedRowKeys,
    setRefresh,
    isCreated = false,
    isProvider = false,
    columnItems = [],
    receipts,
    handleUpdateReceipt,
}) {
    const [note, setNote] = useState('');
    const [showNote, setShowNote] = useState(false);
    const [showUpdateBtn, setShowUpdateBtn] = useState([]);
    const { admin } = useContext(AdminContext);
    const navigate = useNavigate();

    const selectedBookColumns = [
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
        },
        {
            title: 'Số lượng nhập',
            dataIndex: 'quantity',
            render: (text, record) => {
                return (
                    <div className="flex gap-2 items-center">
                        <InputNumber
                            min={0}
                            value={record.quantity}
                            onChange={(value) => handleChangeQuantity(value, record.key)}
                            readOnly={isCreated || isProvider}
                        />
                    </div>
                );
            },
        },
        {
            title: 'Đơn giá',
            dataIndex: 'book_cost',
            render: (text) => <p>{convertPriceToString(text)}</p>,
        },
        {
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
            render: (text, record) => <p>{convertPriceToString(record.book_cost * record.quantity)}</p>,
        },
        ...columnItems,
    ];

    const handleChangeQuantity = (value, key) => {
        const newData = selectedBooks.map((item) =>
            item.key === key
                ? {
                      ...item,
                      quantity: value,
                      totalPrice: value * item.book_cost,
                  }
                : item,
        );

        setSelectedBooks(newData);
    };

    const handleSubmit = async () => {
        const isInValiedData = selectedBooks.find((item) => item.quantity === 0 || item.quantity === null);
        if (isInValiedData) {
            Swal.fire({
                toast: true,
                position: 'top-right',
                timer: 1500,
                timerProgressBar: true,
                text: 'Vui lòng nhập số lượng cần nhập!',
                icon: 'error',
                showConfirmButton: false,
            });
            return;
        }
        await Promise.all(
            selectedBooks.map((book) =>
                bookApi.updateBook(book.book_id, {
                    book_status: 'Đang nhập hàng',
                }),
            ),
        );

        await importReceiptApi.createReceipt({
            createBy: admin?.admin_name,
            store_name: 'Kim Đồng',
            store_address: 'Số 55 Quang Trung, Nguyễn Du, Hai Bà Trưng, Hà Nội',
            store_phone: '0536127893',
            provider_name: 'BookStar',
            provider_address: '60-62 Lê Lợi, Q.1, TP. HCM',
            provider_phone: '0123456789',
            item_list: JSON.stringify(
                selectedBooks.map((book) => ({
                    ...book,
                    book_status: 'Đang nhập hàng',
                })),
            ),
            note,
            total_price: selectedBooks.reduce((total, curr) => {
                return (total += curr.totalPrice);
            }, 0),
            receipt_status: 'Đang xử lí',
        });

        await Swal.fire({
            timer: 1500,
            timerProgressBar: true,
            text: 'Gửi phiếu nhập thành công!',
            icon: 'success',
            showConfirmButton: false,
        });
        setSelectedRowKeys([]);
        setOpenModal(false);
        setRefresh((prev) => !prev);
    };

    const handleUpdateDb = async () => {
        await Promise.all(
            receipts.item_list.map((book) =>
                bookApi.updateBook(book.book_id, {
                    book_status: book.book_status === 'Bị hủy' ? 'Nhập không thành công' : 'Còn hàng',
                    book_available:
                        book.book_status === 'Bị hủy' ? book.book_available : book.book_available + book.quantity,
                }),
            ),
        );

        await importReceiptApi.updateReceipt(
            {
                receipt_status: `${receipts.receipt_status} - Đã cập nhật`,
            },
            receipts.id,
        );

        await Swal.fire({
            timer: 1500,
            timerProgressBar: true,
            text: 'Cập nhật kho thành công!',
            icon: 'success',
            showConfirmButton: false,
        });
        setShowUpdateBtn((prev) => [...prev, receipts.id]);
        setOpenModal(false);
        setRefresh((prev) => !prev);
    };

    return (
        <Modal
            title={isCreated ? `Phiếu nhập #${receipts.id.slice(0, 8)}` : 'Tạo phiếu nhập hàng'}
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={
                !receipts || isCreated ? (
                    <div className="flex gap-2 justify-end">
                        <Button
                            type="primary"
                            onClick={async () => {
                                if (isCreated) {
                                    handleUpdateDb();
                                } else {
                                    await handleSubmit();
                                    navigate('/quan-li-kho-hang/phieu-nhap');
                                }
                            }}
                            disabled={
                                isCreated &&
                                (receipts.receipt_status === 'Đang xử lí' ||
                                    receipts.receipt_status.includes('Đã cập nhật'))
                            }
                        >
                            {isCreated ? 'Cập nhật kho' : 'Gửi phiếu nhập'}
                        </Button>
                    </div>
                ) : (
                    receipts.receipt_status === 'Đang xử lí' && (
                        <div className="flex gap-2 justify-end">
                            {isProvider && <Button onClick={() => handleUpdateReceipt('Bị hủy')}>Hủy đơn hàng</Button>}
                            <Button
                                type="primary"
                                onClick={() => {
                                    handleUpdateReceipt('Chấp thuận');
                                }}
                            >
                                Chấp nhận tất cả
                            </Button>
                        </div>
                    )
                )
            }
            width={1000}
        >
            <div className="flex flex-col gap-3">
                {admin?.role === 'provider' ? (
                    <div>
                        <p>
                            <strong>Tên cửa hàng:</strong> {receipts.store_name}
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> {receipts.store_address}
                        </p>
                        <p>
                            <strong>Số điện thoại:</strong> {receipts.store_phone}
                        </p>
                    </div>
                ) : (
                    <div>
                        <p>
                            <strong>Người lập phiếu:</strong> {admin?.admin_name}
                        </p>
                        <p>
                            <strong>Tên nhà cung cấp:</strong> BookStar
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong> 60-62 Lê Lợi, Q.1, TP. HCM
                        </p>
                        <p>
                            <strong>Số điện thoại:</strong> 0123456789
                        </p>
                    </div>
                )}
                <Table columns={selectedBookColumns} dataSource={selectedBooks} />
                <div className="flex flex-col gap-2">
                    {!isCreated && !isProvider ? (
                        <div>
                            <Checkbox onChange={(e) => setShowNote(e.target.checked)}>Ghi chú</Checkbox>
                            {showNote && <Input.TextArea value={note} onChange={(e) => setNote(e.target.value)} />}
                        </div>
                    ) : (
                        <>
                            <p>
                                <strong>Ghi chú: </strong>
                                {receipts.note || 'Không có ghi chú'}
                            </p>

                            <p>
                                <strong>Trạng thái: </strong> {receipts.receipt_status}
                            </p>

                            <p>
                                <strong>Ngày lập phiếu: </strong> {formatDate(receipts.created_at)}
                            </p>
                        </>
                    )}

                    <p>
                        <strong>Tổng giá trị:</strong>{' '}
                        {convertPriceToString(
                            selectedBooks.reduce((total, curr) => {
                                return (total += curr.totalPrice);
                            }, 0),
                        )}
                    </p>
                </div>
            </div>
        </Modal>
    );
}
