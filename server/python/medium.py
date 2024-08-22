mediumAlgorithms = [
  {
    'name': 'Sắp xếp nổi bọt',
    'description': 'Sắp xếp một mảng sử dụng thuật toán sắp xếp nổi bọt.',
    'solution': '''
      function sapXepNoiBong(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
          }
        }
        return arr;
      }
      console.log(sapXepNoiBong([5, 3, 8, 1, 2])); // Kết quả: [1, 2, 3, 5, 8]
    '''
  },
  {
    'name': 'Tìm số lớn nhất trong mảng',
    'description': 'Tìm số lớn nhất trong mảng.',
    'solution': '''
      function timSoLonNhat(arr) {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
          if (arr[i] > max) {
            max = arr[i];
          }
        }
        return max;
      }
      console.log(timSoLonNhat([5, 3, 8, 1, 2])); // Kết quả: 8
    '''
  },
  {
    'name': 'Đảo ngược chuỗi',
    'description': 'Đảo ngược một chuỗi.',
    'solution': '''
      function daoNguocChuoi(str) {
        return str.split('').reverse().join('');
      }
      console.log(daoNguocChuoi('hello')); // Kết quả: 'olleh'
    '''
  },
  {
    'name': 'Tính tổng các số trong mảng',
    'description': 'Tính tổng tất cả các số trong mảng.',
    'solution': '''
      function tongCacSo(arr) {
        return arr.reduce((tong, so) => tong + so, 0);
      }
      console.log(tongCacSo([1, 2, 3, 4, 5])); // Kết quả: 15
    '''
  },
  {
    'name': 'Sắp xếp chọn',
    'description': 'Sắp xếp một mảng sử dụng thuật toán sắp xếp chọn.',
    'solution': '''
      function sapXepChon(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
          let minIndex = i;
          for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
              minIndex = j;
            }
          }
          [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
        return arr;
      }
      console.log(sapXepChon([5, 3, 8, 1, 2])); // Kết quả: [1, 2, 3, 5, 8]
    '''
  },
  {
    'name': 'Tính số lượng chữ cái trong chuỗi',
    'description': 'Đếm số lượng chữ cái trong một chuỗi.',
    'solution': '''
      function demChuCai(str) {
        const result = {};
        for (const char of str) {
          if (char.match(/[a-zA-Z]/)) {
            result[char] = (result[char] || 0) + 1;
          }
        }
        return result;
      }
      console.log(demChuCai('Hello World')); // Kết quả: { H: 1, e: 1, l: 3, o: 2, W: 1, r: 1, d: 1 }
    '''
  },
  {
    'name': 'Tìm tất cả các số nguyên tố trong một khoảng',
    'description': 'Tìm tất cả các số nguyên tố trong một khoảng cho trước.',
    'solution': '''
      function timSoNguyenTo(n) {
        const isPrime = Array(n + 1).fill(true);
        isPrime[0] = isPrime[1] = false;
        for (let i = 2; i * i <= n; i++) {
          if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
              isPrime[j] = false;
            }
          }
        }
        return isPrime.reduce((primes, prime, num) => {
          if (prime) primes.push(num);
          return primes;
        }, []);
      }
      console.log(timSoNguyenTo(30)); // Kết quả: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
    '''
  },
  {
    'name': 'Tính tích các số trong mảng',
    'description': 'Tính tích tất cả các số trong mảng.',
    'solution': '''
      function tichCacSo(arr) {
        return arr.reduce((tich, so) => tich * so, 1);
      }
      console.log(tichCacSo([1, 2, 3, 4])); // Kết quả: 24
    '''
  },
  {
    'name': 'Đếm số lần xuất hiện của một ký tự trong chuỗi',
    'description': 'Đếm số lần xuất hiện của một ký tự trong chuỗi.',
    'solution': '''
      function demKyTu(str, kyTu) {
        return str.split(kyTu).length - 1;
      }
      console.log(demKyTu('hello world', 'o')); // Kết quả: 2
    '''
  },
  {
    'name': 'Tìm giá trị trung bình của mảng',
    'description': 'Tính giá trị trung bình của các số trong mảng.',
    'solution': '''
      function giaTriTrungBinh(arr) {
        const tong = arr.reduce((sum, num) => sum + num, 0);
        return tong / arr.length;
      }
      console.log(giaTriTrungBinh([1, 2, 3, 4, 5])); // Kết quả: 3
    '''
  },
  {
    'name': 'Tìm tất cả các hoán vị của một chuỗi',
    'description': 'Tìm tất cả các hoán vị của một chuỗi cho trước.',
    'solution': '''
      function hoanVi(str) {
        const result = [];
        function permute(prefix, str) {
          if (str.length === 0) {
            result.push(prefix);
          } else {
            for (let i = 0; i < str.length; i++) {
              permute(prefix + str[i], str.slice(0, i) + str.slice(i + 1));
            }
          }
        }
        permute('', str);
        return result;
      }
      console.log(hoanVi('abc')); // Kết quả: ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
    '''
  },
  {
    'name': 'Tìm số nguyên tố đầu tiên lớn hơn một số',
    'description': 'Tìm số nguyên tố đầu tiên lớn hơn một số cho trước.',
    'solution': '''
      function soNguyenToLonHon(n) {
        function isPrime(num) {
          if (num <= 1) return false;
          for (let i = 2; i * i <= num; i++) {
            if (num % i === 0) return false;
          }
          return true;
        }
        let candidate = n + 1;
        while (!isPrime(candidate)) {
          candidate++;
        }
        return candidate;
      }
      console.log(soNguyenToLonHon(10)); // Kết quả: 11
    '''
  },
  {
    'name': 'Tính tổng các số chính phương trong mảng',
    'description': 'Tính tổng các số chính phương trong mảng.',
    'solution': '''
      function tongSoChinhPhuong(arr) {
        function isSquare(num) {
          const root = Math.sqrt(num);
          return root === Math.floor(root);
        }
        return arr.filter(isSquare).reduce((sum, num) => sum + num, 0);
      }
      console.log(tongSoChinhPhuong([1, 4, 9, 16, 20])); // Kết quả: 30
    '''
  },
  {
    'name': 'Tìm giá trị lớn thứ hai trong mảng',
    'description': 'Tìm giá trị lớn thứ hai trong mảng.',
    'solution': '''
      function giaTriLonThuHai(arr) {
        let max = -Infinity, secondMax = -Infinity;
        for (const num of arr) {
          if (num > max) {
            secondMax = max;
            max = num;
          } else if (num > secondMax && num < max) {
            secondMax = num;
          }
        }
        return secondMax;
      }
      console.log(giaTriLonThuHai([5, 1, 9, 2, 7])); // Kết quả: 7
    '''
  },
  {
    'name': 'Kiểm tra chuỗi đối xứng',
    'description': 'Kiểm tra xem một chuỗi có phải là chuỗi đối xứng không.',
    'solution': '''
      function laChuoiDoiXung(str) {
        return str === str.split('').reverse().join('');
      }
      console.log(laChuoiDoiXung('radar')); // Kết quả: true
    '''
  },
  {
    'name': 'Tìm số Fibonacci lớn hơn một số',
    'description': 'Tìm số Fibonacci lớn hơn một số cho trước.',
    'solution': '''
      function soFibonacciLonHon(n) {
        let a = 0, b = 1;
        while (b <= n) {
          [a, b] = [b, a + b];
        }
        return b;
      }
      console.log(soFibonacciLonHon(15)); // Kết quả: 21
    '''
  },
  {
    'name': 'Tìm chuỗi con dài nhất không chứa ký tự lặp lại',
    'description': 'Tìm chuỗi con dài nhất trong một chuỗi không chứa ký tự lặp lại.',
    'solution': '''
      function chuoiConDaiNhat(str) {
        let longest = '', current = '';
        for (const char of str) {
          if (current.includes(char)) {
            current = current.slice(current.indexOf(char) + 1);
          }
          current += char;
          longest = current.length > longest.length ? current : longest;
        }
        return longest;
      }
      console.log(chuoiConDaiNhat('abcabcbb')); // Kết quả: 'abc'
    '''
  },
  {
    'name': 'Tìm số nguyên tố nhỏ nhất lớn hơn một số cho trước',
    'description': 'Tìm số nguyên tố nhỏ nhất lớn hơn một số cho trước.',
    'solution': '''
      function soNguyenToNhoHon(n) {
        function isPrime(num) {
          if (num <= 1) return false;
          for (let i = 2; i * i <= num; i++) {
            if (num % i === 0) return false;
          }
          return true;
        }
        let candidate = n - 1;
        while (!isPrime(candidate)) {
          candidate--;
        }
        return candidate;
      }
      console.log(soNguyenToNhoHon(10)); // Kết quả: 7
    '''
  },
  {
    'name': 'Tính tổng các số lẻ trong mảng',
    'description': 'Tính tổng tất cả các số lẻ trong mảng.',
    'solution': '''
      function tongSoLe(arr) {
        return arr.filter(num => num % 2 !== 0).reduce((sum, num) => sum + num, 0);
      }
      console.log(tongSoLe([1, 2, 3, 4, 5])); // Kết quả: 9
    '''
  },
  {
    'name': 'Sắp xếp mảng bằng thuật toán chèn',
    'description': 'Sắp xếp mảng sử dụng thuật toán sắp xếp chèn.',
    'solution': '''
      function sapXepChen(arr) {
        for (let i = 1; i < arr.length; i++) {
          let key = arr[i];
          let j = i - 1;
          while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
          }
          arr[j + 1] = key;
        }
        return arr;
      }
      console.log(sapXepChen([5, 3, 8, 1, 2])); // Kết quả: [1, 2, 3, 5, 8]
    '''
  },
  {
    'name': 'Tính tổng các số chẵn trong mảng',
    'description': 'Tính tổng tất cả các số chẵn trong mảng.',
    'solution': '''
      function tongSoChan(arr) {
        return arr.filter(num => num % 2 === 0).reduce((sum, num) => sum + num, 0);
      }
      console.log(tongSoChan([1, 2, 3, 4, 5])); // Kết quả: 6
    '''
  },
  {
    'name': 'Sắp xếp mảng bằng thuật toán trộn',
    'description': 'Sắp xếp một mảng sử dụng thuật toán sắp xếp trộn.',
    'solution': '''
      function sapXepTron(arr) {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = sapXepTron(arr.slice(0, mid));
        const right = sapXepTron(arr.slice(mid));
        return tron(left, right);
      }
      
      function tron(left, right) {
        let result = [], i = 0, j = 0;
        while (i < left.length && j < right.length) {
          if (left[i] < right[j]) {
            result.push(left[i++]);
          } else {
            result.push(right[j++]);
          }
        }
        return result.concat(left.slice(i)).concat(right.slice(j));
      }
      
      console.log(sapXepTron([5, 3, 8, 1, 2])); // Kết quả: [1, 2, 3, 5, 8]
    '''
  },
  {
    'name': 'Tính trung bình cộng của mảng',
    'description': 'Tính trung bình cộng của tất cả các số trong mảng.',
    'solution': '''
      function trungBinhCong(arr) {
        return arr.reduce((sum, num) => sum + num, 0) / arr.length;
      }
      console.log(trungBinhCong([1, 2, 3, 4, 5])); // Kết quả: 3
    '''
  },
  {
    'name': 'Tìm số xuất hiện nhiều nhất trong mảng',
    'description': 'Tìm số xuất hiện nhiều nhất trong mảng.',
    'solution': '''
      function soXuatHienNhieuNhat(arr) {
        const frequency = {};
        let maxCount = 0;
        let mostFrequent;
        for (const num of arr) {
          frequency[num] = (frequency[num] || 0) + 1;
          if (frequency[num] > maxCount) {
            maxCount = frequency[num];
            mostFrequent = num;
          }
        }
        return mostFrequent;
      }
      console.log(soXuatHienNhieuNhat([1, 3, 3, 2, 1, 1])); // Kết quả: 1
    '''
  },
  {
    'name': 'Tìm tất cả các phần tử trùng lặp trong mảng',
    'description': 'Tìm tất cả các phần tử trùng lặp trong mảng.',
    'solution': '''
      function timPhanTuTrungLap(arr) {
        const seen = new Set();
        const duplicates = new Set();
        for (const num of arr) {
          if (seen.has(num)) {
            duplicates.add(num);
          } else {
            seen.add(num);
          }
        }
        return Array.from(duplicates);
      }
      console.log(timPhanTuTrungLap([1, 2, 3, 2, 4, 5, 5])); // Kết quả: [2, 5]
    '''
  },
  {
    'name': 'Tìm giá trị nhỏ nhất trong ma trận',
    'description': 'Tìm giá trị nhỏ nhất trong một ma trận số.',
    'solution': '''
      function giaTriNhoNhat(matrix) {
        return matrix.flat().reduce((min, num) => Math.min(min, num), Infinity);
      }
      console.log(giaTriNhoNhat([[1, 2, 3], [4, 5, 6], [7, 8, 9]])); // Kết quả: 1
    '''
  },
  {
    'name': 'Sắp xếp mảng bằng thuật toán quicksort',
    'description': 'Sắp xếp mảng sử dụng thuật toán quicksort.',
    'solution': '''
      function quickSort(arr) {
        if (arr.length <= 1) return arr;
        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => x < pivot);
        const middle = arr.filter(x => x === pivot);
        const right = arr.filter(x => x > pivot);
        return [...quickSort(left), ...middle, ...quickSort(right)];
      }
      console.log(quickSort([5, 3, 8, 1, 2])); // Kết quả: [1, 2, 3, 5, 8]
    '''
  }
];
