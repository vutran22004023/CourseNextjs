easyAlgorithms = [
  {
    'name': 'Tổng hai số',
    'description': 'Tìm tổng của hai số.',
    'solution': '''
      function tong(a, b) {
        return a + b;
      }
    '''
  },
  {
    'name': 'Tìm số lớn hơn',
    'description': 'Tìm số lớn nhất giữa hai số.',
    'solution': '''
      function lonHon(a, b) {
        return a > b ? a : b;
      }
    '''
  },
  {
    'name': 'Tìm số nhỏ hơn',
    'description': 'Tìm số nhỏ nhất giữa hai số.',
    'solution': '''
      function nhoHon(a, b) {
        return a < b ? a : b;
      }
    '''
  },
  {
    'name': 'Tính giai thừa',
    'description': 'Tính giai thừa của một số nguyên không âm.',
    'solution': '''
      function giaithua(n) {
        if (n === 0) return 1;
        return n * giaithua(n - 1);
      }
    '''
  },
  {
    'name': 'Kiểm tra số nguyên tố',
    'description': 'Kiểm tra xem một số có phải là số nguyên tố không.',
    'solution': '''
      function laSoNguyenTo(n) {
        if (n <= 1) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
          if (n % i === 0) return false;
        }
        return true;
      }
    '''
  },
  {
    'name': 'Tính tổng của dãy số',
    'description': 'Tính tổng của tất cả các số từ 1 đến n.',
    'solution': '''
      function tongDay(n) {
        let tong = 0;
        for (let i = 1; i <= n; i++) {
          tong += i;
        }
        return tong;
      }
    '''
  },
  {
    'name': 'Sắp xếp mảng (Bubble Sort)',
    'description': 'Sắp xếp một mảng các số bằng thuật toán Bubble Sort.',
    'solution': '''
      function bubbleSort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
          }
        }
        return arr;
      }
    '''
  },
  {
    'name': 'Tìm giá trị lớn nhất trong mảng',
    'description': 'Tìm giá trị lớn nhất trong một mảng.',
    'solution': '''
      function giaTriLonNhat(arr) {
        return Math.max(...arr);
      }
    '''
  },
  {
    'name': 'Tìm giá trị nhỏ nhất trong mảng',
    'description': 'Tìm giá trị nhỏ nhất trong một mảng.',
    'solution': '''
      function giaTriNhoNhat(arr) {
        return Math.min(...arr);
      }
    '''
  },
  {
    'name': 'Tính tổng các số chẵn trong mảng',
    'description': 'Tính tổng của tất cả các số chẵn trong một mảng.',
    'solution': '''
      function tongSoChan(arr) {
        return arr.filter(x => x % 2 === 0).reduce((sum, val) => sum + val, 0);
      }
    '''
  },
  {
    'name': 'Đảo ngược một chuỗi',
    'description': 'Đảo ngược một chuỗi ký tự.',
    'solution': '''
      function daoNguocChuoi(str) {
        return str.split('').reverse().join('');
      }
    '''
  },
  {
    'name': 'Kiểm tra chuỗi đối xứng',
    'description': 'Kiểm tra xem một chuỗi có phải là chuỗi đối xứng không.',
    'solution': '''
      function laChuoiDoiXung(str) {
        const reversed = str.split('').reverse().join('');
        return str === reversed;
      }
    '''
  },
  {
    'name': 'Tính giá trị trung bình của mảng',
    'description': 'Tính giá trị trung bình của các số trong một mảng.',
    'solution': '''
      function giaTriTrungBinh(arr) {
        const tong = arr.reduce((sum, val) => sum + val, 0);
        return tong / arr.length;
      }
    '''
  },
  {
    'name': 'Đếm số từ trong chuỗi',
    'description': 'Đếm số từ trong một chuỗi.',
    'solution': '''
      function demTu(str) {
        return str.trim().split(/\s+/).length;
      }
    '''
  },
  {
    'name': 'Tìm phần tử xuất hiện nhiều nhất trong mảng',
    'description': 'Tìm phần tử xuất hiện nhiều nhất trong một mảng.',
    'solution': '''
      function phanTuXuatHienNhieuNhat(arr) {
        const countMap = arr.reduce((map, val) => {
          map[val] = (map[val] || 0) + 1;
          return map;
        }, {});
        return Object.keys(countMap).reduce((a, b) => countMap[a] > countMap[b] ? a : b);
      }
    '''
  },
  {
    'name': 'Chuyển đổi số sang chuỗi nhị phân',
    'description': 'Chuyển đổi một số nguyên sang chuỗi nhị phân.',
    'solution': '''
      function soSangNhiPhan(num) {
        return num.toString(2);
      }
    '''
  },
  {
    'name': 'Chuyển đổi chuỗi nhị phân sang số',
    'description': 'Chuyển đổi chuỗi nhị phân thành số nguyên.',
    'solution': '''
      function nhiPhanSangSo(binStr) {
        return parseInt(binStr, 2);
      }
    '''
  },
  {
    'name': 'Tạo mảng các số từ 1 đến n',
    'description': 'Tạo một mảng chứa các số từ 1 đến n.',
    'solution': '''
      function taoMang(n) {
        return Array.from({ length: n }, (_, i) => i + 1);
      }
    '''
  },
  {
    'name': 'Xóa phần tử khỏi mảng',
    'description': 'Xóa phần tử khỏi mảng theo chỉ số.',
    'solution': '''
      function xoaPhanTu(arr, index) {
        return arr.slice(0, index).concat(arr.slice(index + 1));
      }
    '''
  },
  {
    'name': 'Chèn phần tử vào mảng',
    'description': 'Chèn một phần tử vào mảng tại chỉ số chỉ định.',
    'solution': '''
      function chenPhanTu(arr, index, value) {
        return [...arr.slice(0, index), value, ...arr.slice(index)];
      }
    '''
  },
  {
    'name': 'Chuyển đổi chuỗi thành mảng các từ',
    'description': 'Chuyển đổi chuỗi thành mảng các từ dựa trên khoảng trắng.',
    'solution': '''
      function chuyenDoiChuoi(str) {
        return str.split(' ');
      }
    '''
  },
  {
    'name': 'Tạo một mảng chứa các số Fibonacci',
    'description': 'Tạo một mảng chứa các số Fibonacci cho đến n.',
    'solution': '''
      function soFibonacci(n) {
        const arr = [0, 1];
        for (let i = 2; i < n; i++) {
          arr.push(arr[i - 1] + arr[i - 2]);
        }
        return arr;
      }
    '''
  }
];
