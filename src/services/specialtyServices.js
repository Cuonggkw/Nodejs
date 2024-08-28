const { reject } = require("lodash");
const db = require("../models");
const { where } = require("sequelize");

const createSepcialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        await db.Specialties.create({
          name: data.name,
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

const getAllSpecialty = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Specialties.findAll({
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

const getDetailSpecialtyById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId || !location) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Specialties.findOne({
          where: { id: inputId },
          attributes: ["descriptionHTML", "descriptionMarkdown", "image"],
        });

        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};

        if (data) {
          // do something
          let doctorSpecialty = [];
          if (location === "ALL") {
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId },
              attributes: ["doctorId", "provinceId"],
            });
          } else {
            // find by location
            doctorSpecialty = await db.Doctor_Infor.findAll({
              where: { specialtyId: inputId, provinceId: location },
              attributes: ["doctorId", "provinceId"],
            });
          }

          data.doctorSpecialty = doctorSpecialty;
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
  createSepcialty,
  getAllSpecialty,
  getDetailSpecialtyById,
};
