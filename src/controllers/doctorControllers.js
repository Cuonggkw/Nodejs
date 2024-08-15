import doctorServices from "../services/doctorServices";
import user from "../models/user";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let respone = await doctorServices.getTopDoctorHome(+limit);
    // console.log("Test respone", respone);
    return res.status(200).json(respone);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorServices.getAllDoctors();
    return res.status(200).json(doctors);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const postInforDoctor = async (req, res) => {
  try {
    let respone = await doctorServices.saveDetailInforDoctor(req.body);
    return res.status(200).json(respone);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const getDetailDoctorById = async (req, res) => {
  try {
    let infor = await doctorServices.getDetailDoctorById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await doctorServices.bulkCreateSchedule(req.body);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const getScheduleByDate = async (req, res) => {
  try {
    let infor = await doctorServices.getScheduleDoctorByDate(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInforDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleByDate,
};

// User POST then req.body để lấy tham số trên đường link url (id)
// User GET then req.query (ko có trên url)
