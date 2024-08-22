import path from 'path';
import { exec } from 'child_process';

// Đường dẫn đến script Python
const pythonScriptPath = path.resolve('python', 'generate_problem.py');
console.log('Python script path:', pythonScriptPath);

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

        // Trả về kết quả từ script Python
        res.setHeader('Content-Type', 'application/json');
        res.send(stdout);
      });
    } catch (error) {
      console.error('Lỗi khi gọi script Python:', error.message);
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra khi tạo thuật toán.',
      });
    }
  }
}

export default new AlgorithmController();
