import nodemailer from 'nodemailer';
import 'dotenv/config';

const Emailauthenticateduser = async (user, resetToken) => {
  // đương dẫn client tới chỗ input nhập lại mật khẩu
  const resetUrl = `${process.env.URL_CLIENT}/form-status-auth?token=${resetToken}&user=${user.name}`;
  let htmlContent = `
      <h2>Xác thực tài khoản</h2>
      <p>Xin chào ${user.name}</p>
      <p>Bạn đã đăng ký tài khoản thành công. Vui lòng nhấp vào liên kết dưới đây để xác thực tài khoản của bạn:</p>
      <a href="${resetUrl}">Xác thực tài khoản</a>
      <p>Nếu bạn không thực hiện đăng ký, vui lòng bỏ qua email này.</p>
      <p>Trân trọng,</p>
      <p>Đội ngũ hỗ trợ của chúng tôi</p>
  `;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: user.email,
    subject: 'Xác thực người dùng',
    html: htmlContent,
  });
  console.log('Message sent: %s', info.messageId);
};

export default Emailauthenticateduser;
