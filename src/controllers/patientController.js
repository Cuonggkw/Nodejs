import patientServices from "../services/patientServices";

const postBookAppointment = async (req, res) => {
  try {
    let infor = await patientServices.postBookAppointment(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

const postVerifyBookAppointment = async (req, res) => {
  try {
    let infor = await patientServices.postVerifyBookAppointment(req.body);
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
  postBookAppointment,
  postVerifyBookAppointment,
};
