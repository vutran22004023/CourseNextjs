export const formatCurrencyVND = (number: number): string => {
  return number?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const parseTime = (time: string) => {
  const [minutes, seconds] = time.split(":").map(Number);
  return minutes * 60 + seconds;
};
export const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours} giờ ${minutes} phút`;
};

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}
export const formatDateUS = (isoString: string) => {
  const date = new Date(isoString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return `${year}/${month}/${day}`;
}

export const formatDateRoom =(dateString: string) => {
  const date = new Date(dateString);

  // Lấy giờ và phút
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Lấy ngày, tháng, năm (dạng 2 chữ số cho ngày và tháng, 2 chữ số cuối cho năm)
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear().toString().slice(2); // Lấy 2 chữ số cuối của năm

  // Ghép thành chuỗi định dạng
  return `${hours}:${minutes} - ${day}/${month}/${year}`;
}