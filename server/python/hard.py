hardAlgorithms = [
  {
    'name': 'Sắp xếp trộn',
    'description': 'Sắp xếp một mảng bằng thuật toán sắp xếp trộn.',
    'solution': '''
      function sapXepTron(arr) {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const trai = sapXepTron(arr.slice(0, mid));
        const phai = sapXepTron(arr.slice(mid));
        return tron(trai, phai);
      }
      
      function tron(trai, phai) {
        let ketQua = [], i = 0, j = 0;
        while (i < trai.length && j < phai.length) {
          if (trai[i] < phai[j]) {
            ketQua.push(trai[i]);
            i++;
          } else {
            ketQua.push(phai[j]);
            j++;
          }
        }
        return ketQua.concat(trai.slice(i)).concat(phai.slice(j));
      }
    '''
  },
  {
    'name': 'Bài toán ba lô',
    'description': 'Giải quyết bài toán ba lô 0/1.',
    'solution': '''
      function baiToanBaLo(giaTri, trongLuong, sucChua) {
        const n = giaTri.length;
        const dp = Array(n + 1).fill().map(() => Array(sucChua + 1).fill(0));
        
        for (let i = 1; i <= n; i++) {
          for (let w = 0; w <= sucChua; w++) {
            if (trongLuong[i - 1] <= w) {
              dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - trongLuong[i - 1]] + giaTri[i - 1]);
            } else {
              dp[i][w] = dp[i - 1][w];
            }
          }
        }
        return dp[n][sucChua];
      }
      
      const giaTri = [60, 100, 120];
      const trongLuong = [10, 20, 30];
      const sucChua = 50;
    '''
  },
  {
    'name': 'Tìm đường đi ngắn nhất (Dijkstra)',
    'description': 'Tìm đường đi ngắn nhất từ một đỉnh đến tất cả các đỉnh khác trong đồ thị có trọng số.',
    'solution': '''
      function dijkstra(graph, start) {
        const distances = {};
        const visited = new Set();
        const nodes = new PriorityQueue();
        
        for (let node in graph) {
          distances[node] = Infinity;
        }
        distances[start] = 0;
        nodes.enqueue(start, 0);
        
        while (!nodes.isEmpty()) {
          const { value: currentNode } = nodes.dequeue();
          
          if (visited.has(currentNode)) continue;
          visited.add(currentNode);
          
          for (let neighbor in graph[currentNode]) {
            const distance = graph[currentNode][neighbor];
            const newDist = distances[currentNode] + distance;
            
            if (newDist < distances[neighbor]) {
              distances[neighbor] = newDist;
              nodes.enqueue(neighbor, newDist);
            }
          }
        }
        
        return distances;
      }
      
      class PriorityQueue {
        constructor() {
          this.values = [];
        }
        
        enqueue(value, priority) {
          this.values.push({ value, priority });
          this.sort();
        }
        
        dequeue() {
          return this.values.shift();
        }
        
        sort() {
          this.values.sort((a, b) => a.priority - b.priority);
        }
        
        isEmpty() {
          return this.values.length === 0;
        }
      }
    '''
  },
  {
    'name': 'Tìm kiếm nhị phân',
    'description': 'Tìm kiếm một giá trị trong một mảng đã được sắp xếp.',
    'solution': '''
      function timKiemNhiPhan(arr, target) {
        let left = 0, right = arr.length - 1;
        
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (arr[mid] === target) return mid;
          if (arr[mid] < target) left = mid + 1;
          else right = mid - 1;
        }
        
        return -1;
      }
    '''
  },
  {
    'name': 'Tính số Fibonacci (Đệ quy tối ưu)',
    'description': 'Tính số Fibonacci thứ n với tối ưu hóa.',
    'solution': '''
      const fibonacci = (function() {
        const memo = {};
        function fib(n) {
          if (n in memo) return memo[n];
          if (n <= 1) return n;
          memo[n] = fib(n - 1) + fib(n - 2);
          return memo[n];
        }
        return fib;
      })();
    '''
  },
  {
    'name': 'Sắp xếp nhanh (Quick Sort)',
    'description': 'Sắp xếp một mảng bằng thuật toán Quick Sort.',
    'solution': '''
      function quickSort(arr) {
        if (arr.length <= 1) return arr;
        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => x < pivot);
        const middle = arr.filter(x => x === pivot);
        const right = arr.filter(x => x > pivot);
        return [...quickSort(left), ...middle, ...quickSort(right)];
      }
    '''
  },
  {
    'name': 'Tìm kiếm chiều sâu (DFS)',
    'description': 'Tìm kiếm theo chiều sâu trong đồ thị.',
    'solution': '''
      function dfs(graph, start) {
        const result = [];
        const visited = new Set();
        
        function visit(node) {
          if (!node) return;
          visited.add(node);
          result.push(node);
          graph[node].forEach(neighbor => {
            if (!visited.has(neighbor)) visit(neighbor);
          });
        }
        
        visit(start);
        return result;
      }
    '''
  },
  {
    'name': 'Tìm kiếm chiều rộng (BFS)',
    'description': 'Tìm kiếm theo chiều rộng trong đồ thị.',
    'solution': '''
      function bfs(graph, start) {
        const result = [];
        const visited = new Set();
        const queue = [start];
        
        while (queue.length > 0) {
          const node = queue.shift();
          if (!visited.has(node)) {
            visited.add(node);
            result.push(node);
            queue.push(...graph[node].filter(neighbor => !visited.has(neighbor)));
          }
        }
        
        return result;
      }
    '''
  },
  {
    'name': 'Tính tổng của ma trận',
    'description': 'Tính tổng của tất cả các phần tử trong một ma trận.',
    'solution': '''
      function tongMaTran(matrix) {
        return matrix.flat().reduce((sum, val) => sum + val, 0);
      }
    '''
  },
  {
    'name': 'Tìm chuỗi con dài nhất không lặp lại',
    'description': 'Tìm chuỗi con dài nhất trong một chuỗi không chứa ký tự lặp lại.',
    'solution': '''
      function chuoiConDaiNhat(str) {
        let maxLength = 0, start = 0;
        const indexMap = new Map();
        
        for (let end = 0; end < str.length; end++) {
          if (indexMap.has(str[end])) {
            start = Math.max(indexMap.get(str[end]) + 1, start);
          }
          indexMap.set(str[end], end);
          maxLength = Math.max(maxLength, end - start + 1);
        }
        
        return maxLength;
      }
    '''
  },
  {
    'name': 'Tính số lượng đường đi trong ma trận',
    'description': 'Tính số lượng đường đi từ góc trên bên trái đến góc dưới bên phải trong ma trận chỉ có 0 và 1.',
    'solution': '''
      function soLuongDuongDi(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const dp = Array(rows).fill().map(() => Array(cols).fill(0));
        
        if (matrix[0][0] === 0) dp[0][0] = 1;
        
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            if (matrix[i][j] === 1) continue;
            if (i > 0) dp[i][j] += dp[i - 1][j];
            if (j > 0) dp[i][j] += dp[i][j - 1];
          }
        }
        
        return dp[rows - 1][cols - 1];
      }
    '''
  },
  {
    'name': 'Tính số lượng cách phân phối hàng hóa',
    'description': 'Tính số lượng cách phân phối hàng hóa cho các nhóm với số lượng không giới hạn.',
    'solution': '''
      function phanPhoiHangHoa(n, k) {
        const dp = Array(n + 1).fill(0);
        dp[0] = 1;
        
        for (let i = 1; i <= k; i++) {
          for (let j = i; j <= n; j++) {
            dp[j] += dp[j - i];
          }
        }
        
        return dp[n];
      }
    '''
  },
  {
    'name': 'Tìm kiếm nhị phân với điều kiện',
    'description': 'Tìm kiếm nhị phân trong mảng đã được sắp xếp theo một điều kiện nhất định.',
    'solution': '''
      function timKiemNhiPhanDK(arr, target) {
        let left = 0, right = arr.length - 1;
        
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          if (arr[mid] === target) return mid;
          if (arr[mid] < target) left = mid + 1;
          else right = mid - 1;
        }
        
        return -1;
      }
    '''
  },
  {
    'name': 'Tìm chuỗi con chung dài nhất (LCS)',
    'description': 'Tìm chuỗi con chung dài nhất giữa hai chuỗi.',
    'solution': '''
      function chuoiConChungDaiNhat(str1, str2) {
        const m = str1.length, n = str2.length;
        const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
        
        for (let i = 1; i <= m; i++) {
          for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
              dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
              dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
          }
        }
        
        return dp[m][n];
      }
    '''
  },
  {
    'name': 'Tìm đường đi ngắn nhất (Bellman-Ford)',
    'description': 'Tìm đường đi ngắn nhất trong đồ thị với trọng số âm.',
    'solution': '''
      function bellmanFord(graph, start) {
        const distances = {};
        const nodes = Object.keys(graph);
        
        nodes.forEach(node => distances[node] = Infinity);
        distances[start] = 0;
        
        for (let i = 0; i < nodes.length - 1; i++) {
          nodes.forEach(node => {
            for (let neighbor in graph[node]) {
              const weight = graph[node][neighbor];
              if (distances[node] + weight < distances[neighbor]) {
                distances[neighbor] = distances[node] + weight;
              }
            }
          });
        }
        
        return distances;
      }
    '''
  },
  {
    'name': 'Tính toán đường đi ngắn nhất (Floyd-Warshall)',
    'description': 'Tính toán đường đi ngắn nhất giữa tất cả các cặp đỉnh trong đồ thị.',
    'solution': '''
      function floydWarshall(graph) {
        const nodes = Object.keys(graph);
        const dist = {};
        
        nodes.forEach(u => {
          dist[u] = {};
          nodes.forEach(v => {
            dist[u][v] = u === v ? 0 : (graph[u][v] || Infinity);
          });
        });
        
        nodes.forEach(k => {
          nodes.forEach(i => {
            nodes.forEach(j => {
              if (dist[i][k] + dist[k][j] < dist[i][j]) {
                dist[i][j] = dist[i][k] + dist[k][j];
              }
            });
          });
        });
        
        return dist;
      }
    '''
  },
  {
    'name': 'Tìm số nguyên tố',
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
    '''
  },
  {
    'name': 'Tìm đỉnh khớp trong đồ thị bipartite',
    'description': 'Tìm một đỉnh khớp trong đồ thị bipartite.',
    'solution': '''
      function bipartiteMatching(graph) {
        const match = {};
        const visited = {};
        
        function dfs(u) {
          for (let v of graph[u]) {
            if (visited[v]) continue;
            visited[v] = true;
            if (!match[v] || dfs(match[v])) {
              match[v] = u;
              return true;
            }
          }
          return false;
        }
        
        for (let u in graph) {
          visited = {};
          dfs(u);
        }
        
        return match;
      }
    '''
  },
  {
    'name': 'Tìm tập hợp con có tổng bằng x',
    'description': 'Tìm tập hợp con của mảng sao cho tổng bằng một giá trị cho trước.',
    'solution': '''
      function tapHopCon(arr, target) {
        const dp = Array(arr.length + 1).fill().map(() => Array(target + 1).fill(false));
        dp[0][0] = true;
        
        for (let i = 1; i <= arr.length; i++) {
          dp[i][0] = true;
          for (let j = 1; j <= target; j++) {
            dp[i][j] = dp[i - 1][j];
            if (arr[i - 1] <= j) {
              dp[i][j] = dp[i][j] || dp[i - 1][j - arr[i - 1]];
            }
          }
        }
        
        return dp[arr.length][target];
      }
    '''
  },
  {
    'name': 'Tìm số chính phương',
    'description': 'Tìm số chính phương trong một khoảng cho trước.',
    'solution': '''
      function soChinhPhuong(n) {
        const result = [];
        for (let i = 1; i * i <= n; i++) {
          result.push(i * i);
        }
        return result;
      }
    '''
  },
  {
    'name': 'Tính toán chuỗi nhị phân',
    'description': 'Tính toán các phép toán trên chuỗi nhị phân, như cộng, trừ.',
    'solution': '''
      function congNhiPhan(a, b) {
        let carry = 0, result = '';
        const maxLength = Math.max(a.length, b.length);
        a = a.padStart(maxLength, '0');
        b = b.padStart(maxLength, '0');
        
        for (let i = maxLength - 1; i >= 0; i--) {
          const sum = parseInt(a[i]) + parseInt(b[i]) + carry;
          carry = Math.floor(sum / 2);
          result = (sum % 2) + result;
        }
        
        if (carry) result = carry + result;
        return result;
      }
    '''
  },
  {
    'name': 'Giải phương trình bậc hai',
    'description': 'Giải phương trình bậc hai với các hệ số cho trước.',
    'solution': '''
      function phuongTrinhBacHai(a, b, c) {
        const delta = b * b - 4 * a * c;
        if (delta < 0) return 'Không có nghiệm thực';
        const x1 = (-b + Math.sqrt(delta)) / (2 * a);
        const x2 = (-b - Math.sqrt(delta)) / (2 * a);
        return [x1, x2];
      }
    '''
  },
  {
    'name': 'Tìm đỉnh độc lập tối đa',
    'description': 'Tìm tập hợp đỉnh độc lập tối đa trong đồ thị.',
    'solution': '''
      function dinhDocLapToiDa(graph) {
        // Giải thuật này có thể phức tạp và cần nhiều cách tiếp cận khác nhau.
        // Dưới đây là cách tiếp cận đơn giản sử dụng quy hoạch động.
        const dp = Array(graph.length).fill(0);
        const result = [];
        
        function helper(index) {
          if (index >= graph.length) return 0;
          let include = 1;
          for (let neighbor of graph[index]) {
            include += helper(neighbor);
          }
          let exclude = helper(index + 1);
          dp[index] = Math.max(include, exclude);
          return dp[index];
        }
        
        helper(0);
        return dp;
      }
    '''
  },
  {
    'name': 'Tìm chuỗi con dài nhất với ký tự lặp lại',
    'description': 'Tìm chuỗi con dài nhất trong chuỗi cho phép có ký tự lặp lại.',
    'solution': '''
      function chuoiConDaiNhatLapLai(str) {
        let maxLength = 0;
        for (let i = 0; i < str.length; i++) {
          for (let j = i; j < str.length; j++) {
            const substring = str.slice(i, j + 1);
            if (new Set(substring).size <= 2) {
              maxLength = Math.max(maxLength, substring.length);
            }
          }
        }
        return maxLength;
      }
    '''
  },
  {
    'name': 'Tính toán số Fibonacci lớn',
    'description': 'Tính toán số Fibonacci lớn với số lượng lớn.',
    'solution': '''
      function fibonacci(n) {
        if (n <= 1) return n;
        let a = 0, b = 1;
        for (let i = 2; i <= n; i++) {
          [a, b] = [b, a + b];
        }
        return b;
      }
    '''
  },
  {
    'name': 'Tính toán xác suất',
    'description': 'Tính toán xác suất của một sự kiện dựa trên xác suất của các sự kiện con.',
    'solution': '''
      function tinhXacSuat(p1, p2) {
        return p1 * p2;
      }
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
    '''
  },
  {
    'name': 'Tính toán chỉ số nội bộ (Indexing)',
    'description': 'Tính toán chỉ số nội bộ cho một cấu trúc dữ liệu.',
    'solution': '''
      function tinhChiSoNoiBo(arr) {
        const index = {};
        arr.forEach((value, i) => {
          index[value] = i;
        });
        return index;
      }
    '''
  },
  {
    'name': 'Tính toán tổng các số nguyên tố',
    'description': 'Tính tổng của tất cả các số nguyên tố trong một khoảng cho trước.',
    'solution': '''
      function tongSoNguyenTo(n) {
        let sum = 0;
        const isPrime = Array(n + 1).fill(true);
        isPrime[0] = isPrime[1] = false;
        
        for (let i = 2; i * i <= n; i++) {
          if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
              isPrime[j] = false;
            }
          }
        }
        
        for (let i = 2; i <= n; i++) {
          if (isPrime[i]) sum += i;
        }
        
        return sum;
      }
    '''
  },
  {
    'name': 'Tìm số chính phương gần nhất',
    'description': 'Tìm số chính phương gần nhất nhỏ hơn hoặc bằng một số cho trước.',
    'solution': '''
      function soChinhPhuongGanNhat(n) {
        let result = 0;
        for (let i = 1; i * i <= n; i++) {
          result = i * i;
        }
        return result;
      }
    '''
  },
  {
    'name': 'Tính toán khoảng cách Levenshtein',
    'description': 'Tính khoảng cách Levenshtein giữa hai chuỗi.',
    'solution': '''
      function khoangCachLevenshtein(a, b) {
        const dp = Array(a.length + 1).fill().map(() => Array(b.length + 1).fill(0));
        
        for (let i = 0; i <= a.length; i++) dp[i][0] = i;
        for (let j = 0; j <= b.length; j++) dp[0][j] = j;
        
        for (let i = 1; i <= a.length; i++) {
          for (let j = 1; j <= b.length; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
          }
        }
        
        return dp[a.length][b.length];
      }
    '''
  }
];

