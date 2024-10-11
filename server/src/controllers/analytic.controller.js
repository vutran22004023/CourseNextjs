import mongoose from 'mongoose';
import { PayCourse, CourseModel, UserModel } from '../models/index.js'; // Import models

class AlgorithmController {
    async getAnalyticCourse(req, res) {
        try {
            const { limit = 10, page = 1, sort = 'desc', date, month, year } = req.query;
            
            // Khởi tạo startDate và endDate mặc định (ngày hiện tại)
            let startDate, endDate, startOfPreviousPeriod, endOfPreviousPeriod;

            // 1. Xử lý nếu có query `date` (ví dụ: '2024-01-19')
            if (date) {
                const selectedDate = new Date(date);
                startDate = new Date(selectedDate.setHours(0, 0, 0, 0)); // Bắt đầu từ 0:00 của ngày
                endDate = new Date(selectedDate.setHours(23, 59, 59, 999)); // Kết thúc lúc 23:59 của ngày
                // Ngày trước đó
                startOfPreviousPeriod = new Date(startDate);
                startOfPreviousPeriod.setFullYear(startOfPreviousPeriod.getFullYear() - 1); // Cùng ngày năm trước
                endOfPreviousPeriod = new Date(endDate);
                endOfPreviousPeriod.setFullYear(endOfPreviousPeriod.getFullYear() - 1);

            // 2. Xử lý nếu có query `month` và `year` (ví dụ: month=1&year=2024)
            } else if (month && year) {
                const selectedYear = parseInt(year, 10);
                const selectedMonth = parseInt(month, 10) - 1; // Trừ 1 vì tháng trong JS bắt đầu từ 0
                startDate = new Date(selectedYear, selectedMonth, 1); // Ngày đầu tiên của tháng
                endDate = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59, 999); // Ngày cuối cùng của tháng
                // Tháng trước đó
                startOfPreviousPeriod = new Date(startDate);
                startOfPreviousPeriod.setFullYear(startOfPreviousPeriod.getFullYear() - 1); // Cùng tháng năm trước
                endOfPreviousPeriod = new Date(endDate);
                endOfPreviousPeriod.setFullYear(endOfPreviousPeriod.getFullYear() - 1);

            // 3. Xử lý nếu chỉ có query `year` (ví dụ: year=2024)
            } else if (year) {
                const selectedYear = parseInt(year, 10);
                startDate = new Date(selectedYear, 0, 1); // Ngày đầu tiên của năm
                endDate = new Date(selectedYear, 11, 31, 23, 59, 59, 999); // Ngày cuối cùng của năm
                // Năm trước đó
                startOfPreviousPeriod = new Date(startDate);
                startOfPreviousPeriod.setFullYear(startOfPreviousPeriod.getFullYear() - 1); // Cùng ngày đầu của năm trước
                endOfPreviousPeriod = new Date(endDate);
                endOfPreviousPeriod.setFullYear(endOfPreviousPeriod.getFullYear() - 1);

            // 4. Mặc định lấy dữ liệu của tháng hiện tại nếu không có query
            } else {
                const now = new Date();
                startDate = new Date(now.getFullYear(), now.getMonth(), 1); // Ngày đầu tháng hiện tại
                endDate = now; // Ngày hiện tại
                // Tháng trước đó
                startOfPreviousPeriod = new Date(startDate);
                startOfPreviousPeriod.setFullYear(startOfPreviousPeriod.getFullYear() - 1); // Cùng tháng năm trước
                endOfPreviousPeriod = new Date(endDate);
                endOfPreviousPeriod.setFullYear(endOfPreviousPeriod.getFullYear() - 1);
            }

            // 1. Tính tổng số tiền trong khoảng thời gian đã chọn
            const salesData = await PayCourse.aggregate([
                {
                    $match: {
                        paymentStatus: 'completed',
                        createdAt: { $gte: startDate, $lte: endDate }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalMoney: { $sum: "$money" }
                    }
                }
            ]);

            const totalMoney = salesData[0]?.totalMoney || 0;

            // 2. Tính tổng số tiền của khoảng thời gian trước đó
            const previousSalesData = await PayCourse.aggregate([
                {
                    $match: {
                        paymentStatus: 'completed',
                        createdAt: { $gte: startOfPreviousPeriod, $lte: endOfPreviousPeriod }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalMoney: { $sum: "$money" }
                    }
                }
            ]);

            const previousTotalMoney = previousSalesData[0]?.totalMoney || 0;

            // 3. Tính phần trăm thay đổi cho tổng số tiền
            let moneyPercentageChange = 0;
            if (previousTotalMoney > 0) {
                moneyPercentageChange = ((totalMoney - previousTotalMoney) / previousTotalMoney) * 100;
            }

            // 4. Tính tổng số người dùng hiện tại
            const totalUsers = await UserModel.countDocuments({});

            // 5. Tính tổng số người dùng của khoảng thời gian trước đó
            const previousTotalUsers = await UserModel.countDocuments({
                createdAt: { $gte: startOfPreviousPeriod, $lte: endOfPreviousPeriod }
            });

            // 6. Tính phần trăm thay đổi cho tổng số người dùng
            let usersPercentageChange = 0;
            if (previousTotalUsers > 0) {
                usersPercentageChange = ((totalUsers - previousTotalUsers) / previousTotalUsers) * 100;
            }

            // Lấy top 10 khóa học được mua nhiều nhất trong khoảng thời gian đã xác định
            const topTransactions = await PayCourse.aggregate([
                {
                    $match: {
                        paymentStatus: 'completed',
                        createdAt: { $gte: startDate, $lte: endDate }
                    }
                },
                {
                    $group: {
                        _id: "$courseId",
                        totalPurchases: { $sum: 1 },
                        totalMoney: { $sum: "$money" }
                    }
                },
                {
                    $sort: { totalPurchases: -1 }
                },
                {
                    $limit: 10
                }
            ]);

            // Lấy thông tin chi tiết của các khóa học trong top 10
            const topCourses = await Promise.all(
                topTransactions.map(async (transaction) => {
                    const course = await CourseModel.findById(transaction._id).select('name slug image'); // Lấy thông tin khóa học
                    return {
                        courseId: transaction._id,
                        courseName: course.name,
                        slug: course.slug,
                        image: course.image,
                        totalPurchases: transaction.totalPurchases,
                        totalMoney: transaction.totalMoney
                    };
                })
            );

            // Trả về kết quả
            res.json({
                totalMoney,                // Tổng số tiền trong khoảng thời gian hiện tại
                previousTotalMoney,         // Tổng số tiền của khoảng thời gian trước đó
                moneyPercentageChange,      // Phần trăm thay đổi tổng số tiền
                totalUsers,                 // Tổng số người đăng ký hiện tại
                previousTotalUsers,         // Tổng số người đăng ký trước đó
                usersPercentageChange,      // Phần trăm thay đổi tổng số người dùng
                topCourses                  // Danh sách top khóa học
            });

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default new AlgorithmController();
