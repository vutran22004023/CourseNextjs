import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import evaluateAlgorithm from '../utils.js';
import { TournamentModel } from '../models/index.js';
const pythonScriptPath = path.resolve('python', 'generate_problem.py');
const jsonFilePath = path.resolve('output.json');

class AlgorithmController {
  async generateAlgorithms(req, res) {
    try {
      const command = `python "${pythonScriptPath}"`;
      console.log('Executing command:', command);

      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error.message}`);
          return res.status(500).send('Server Error');
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return res.status(500).send('Server Error');
        }

        // Read the JSON file after the Python script has executed
        fs.readFile(jsonFilePath, 'utf8', (readError, data) => {
          if (readError) {
            console.error(`Error reading JSON file: ${readError.message}`);
            return res.status(500).send('Error reading JSON file');
          }

          try {
            const jsonData = JSON.parse(data);

            // Return the JSON data as the response
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(jsonData);
          } catch (parseError) {
            console.error(`Error parsing JSON data: ${parseError.message}`);
            res.status(500).send('Error parsing JSON data');
          }
        });
      });
    } catch (error) {
      console.error('Lỗi khi gọi script Python:', error.message);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi tạo thuật toán.',
      });
    }
  }

  async checkAlgorithms(req, res) {
    const { ten, solution, userId } = req.body;

    try {
      // Đọc lại dữ liệu từ tệp JSON để đảm bảo là dữ liệu mới nhất
      const algorithms = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

      const algorithm = algorithms.find((alg) => alg.ten === ten);
      if (!algorithm) {
        return res.status(404).json({ error: 'Thuật toán không tìm thấy' });
      }

      // Thực thi giải pháp của người dùng
      const userResult = await evaluateAlgorithm(solution, { test_data: algorithm.test_data });
      // So sánh với kết quả dự kiến nếu có
      const accuracy = userResult === algorithm.result ? 100 : 0;

      await TournamentModel.create({
        userId: userId,
        nameAlgorithm: algorithm.ten,
        solution: solution,
        result: userResult,
        expected_result: algorithm.result,
        message: accuracy === 100 ? 'Kết quả chính xác!' : 'Kết quả sai. Vui lòng kiểm tra lại thuật toán của bạn.',
      });
      res.json({
        algorithm_name: algorithm.ten,
        accuracy: accuracy,
        description: algorithm.mo_ta,
        result: userResult,
        expected_result: algorithm.result,
        message: accuracy === 100 ? 'Kết quả chính xác!' : 'Kết quả sai. Vui lòng kiểm tra lại thuật toán của bạn.',
      });
    } catch (error) {
      console.error('Error executing solution:', error.message);
      res.status(500).json({ error: `Lỗi khi thực thi giải pháp: ${error.message}` });
    }
  }
}

export default new AlgorithmController();
