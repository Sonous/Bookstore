export function removeVietnameseTones(str) {
    return str
        .normalize('NFD') // Tách các ký tự ra và kết hợp với dấu
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu
        .replace(/đ/g, 'd') // Chuyển đổi ký tự đặc biệt 'đ' thành 'd'
        .replace(/Đ/g, 'D') // Chuyển đổi ký tự đặc biệt 'Đ' thành 'D'
        .replace(/[^a-zA-Z0-9 ]/g, ''); // Loại bỏ các ký tự đặc biệt khác (nếu cần)
}

export const convertPriceToString = (price) => {
    let number = parseFloat(price);
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
