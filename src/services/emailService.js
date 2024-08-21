require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: '"Check email 👻" <cp9188950@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare.</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu các thông tin trên là đúng. Vui lòng click vào đường link để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
    <div>
     <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>Xin chân thành cảm ơn</div>
    `, // html body
  });
};

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
}

module.exports = {
  sendSimpleEmail,
};
