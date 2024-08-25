
export const formatCurrencyVND = (number: number): string => {
    return number?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export const parseTime = (time: string) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return minutes * 60 + seconds;
  };
export const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours} giờ ${minutes} phút`;
  };