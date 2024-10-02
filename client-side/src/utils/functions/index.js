// export const convertToSlug = (str) => {
//     return str
//         .normalize('NFD') // Chuẩn hóa chuỗi
//         .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
//         .replace(/-/g, '') // Loại bỏ tất cả dấu '-'
//         .replace(/\s+/g, '-') // Thay thế dấu cách bằng dấu '-'
//         .toLowerCase(); // Chuyển tất cả chữ thành chữ thường
// };

export const sum = (input, property = null) => {
    let arr = [...input];
    if (property) {
        arr = arr.map((item) => item[property]);
    }

    return arr.reduce((total, current) => {
        return (total += current) && total;
    }, 0);
};

export const convertPriceToString = (price) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
