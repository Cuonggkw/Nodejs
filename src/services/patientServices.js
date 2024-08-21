require("dotenv").config();
import { raw } from "body-parser";
import db from "../models/index";
import { where } from "sequelize";
import emailService from "./emailService";

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.date || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        // send email booking an appointment
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: "Bookingcare",
          time: "8:00 - 10:00 Chủ nhật 25/08/2024",
          doctorName: "Hoàng Tiến Dũng",
          redirectLink:
            "https://www.facebook.com/profile.php?id=100011258555032",
        });

        // upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
          raw: true,
        });
        // console.log("Check user:", user[0]);
        if (user && user[0]) {
          await db.Bookings.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
        }

        // create a booking record
        resolve({
          errCode: 0,
          errMessage: "Save infor patient succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { postBookAppointment };
