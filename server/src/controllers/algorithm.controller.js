import 'dotenv/config';
import { Random } from 'random-js';
import easyAlgorithms from '../algorithms/easy.js';
import mediumAlgorithms from '../algorithms/medium.js';
import hardAlgorithms from '../algorithms/hard.js';

// Tạo đối tượng Random để sinh số ngẫu nhiên
const random = new Random();

class AlgorithmController {
  async generateAlgorithms(req, res) {
    try {
      // Hàm để chọn ngẫu nhiên n phần tử từ danh sách
      const getRandomItems = (array, numItems) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numItems);
      };

      const easySelected = getRandomItems(easyAlgorithms, 1);
      const mediumSelected = getRandomItems(mediumAlgorithms, 1);
      const hardSelected = getRandomItems(hardAlgorithms, 1);

      const allSelectedAlgorithms = [
        ...easySelected,
        ...mediumSelected,
        ...hardSelected
      ];

      const adjustAlgorithmScores = (algorithms) => {
        return algorithms.map((algorithm) => {
          algorithm.score = random.integer(1, 100);
          return algorithm;
        });
      };

      // Điều chỉnh chỉ số của tất cả các thuật toán đã chọn
      const adjustedAlgorithms = adjustAlgorithmScores(allSelectedAlgorithms);

      // Tạo cấu trúc dữ liệu phân loại theo mức độ
      const categorizedAlgorithms = {
        easy: adjustedAlgorithms.filter(alg => easyAlgorithms.includes(alg)),
        medium: adjustedAlgorithms.filter(alg => mediumAlgorithms.includes(alg)),
        hard: adjustedAlgorithms.filter(alg => hardAlgorithms.includes(alg)),
      };

      // Trả về tất cả các thuật toán đã chọn với chỉ số đã điều chỉnh và phân loại
      res.status(200).json({
        success: true,
        algorithms: categorizedAlgorithms,
      });
    } catch (error) {
      console.error('Lỗi khi tạo thuật toán:', error);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi tạo thuật toán.',
      });
    }
  }
}

export default new AlgorithmController();
