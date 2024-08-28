const { reject } = require("lodash");
const db = require("../models");
const { where } = require("sequelize");

const createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Clinics.create({
          name: data.name,
          address: data.address,
          image: data.imageBase64,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
        });

        resolve({
          errCode: 0,
          errMessage: "Create success!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllClinic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinics.findAll({
        // attributes: {
        //   exclude: ["image"],
        // },
      });
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }

      resolve({
        errCode: 0,
        errMessage: "OK",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Clinics.findOne({
          where: { id: inputId },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
            "image",
          ],
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};

        if (data) {
          // do something
          let doctorClinic = [];

          doctorClinic = await db.Doctor_Infor.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorClinic = doctorClinic;
        } else data = {};

        resolve({
          errCode: 0,
          errMessage: "OK",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createClinic,
  getAllClinic,
  getDetailClinicById,
};
