
export const formatCurrencyVND = (number: number): string => {
    return number?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}