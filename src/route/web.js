// Cevis gọi đến Controller

import express from "express";
import userController from "../controllers/userController";
import homeController, {
  getEjs,
  getHomePage,
  getCRUD,
  postCRUD,
  readCRUD,
  getEditCRUD,
  getDeleteCRUD,
  putCRUD,
} from "../controllers/homeController";
import doctorController from "../controllers/doctorControllers";
import patientController from "../controllers/patientController";

const router = express.Router();

// A server bằng a app (truyền app to the server).
const initWebRoutes = (app) => {
  router.get("/", getHomePage);

  router.get("/it", getEjs);

  router.get("/crud", getCRUD);

  router.post("/post-crud", postCRUD);

  router.get("/get-crud", readCRUD);

  router.get("/edit-crud", getEditCRUD);
  router.get("/delete-crud", getDeleteCRUD);

  router.post("/put-crud", putCRUD);

  // Vào 1 link => contrller sẽ gọi tới it is function.
  router.post("/api/login", userController.handleLogin);

  router.get("/api/get-all-users", userController.handleGetAllUsers);

  router.post("/api/create-users", userController.handleCreateUsers);

  router.put("/api/edit-users", userController.handleEditUsers);

  router.delete("/api/delete-users", userController.handleDeleteUsers); // restAPI

  router.get("/api/allcode", userController.getAllCode);

  // API Featured Doctor.
  router.get("/api/topdoctor-home", doctorController.getTopDoctorHome);

  // API All Doctor
  router.get("/api/get-all-doctor", doctorController.getAllDoctors);
  // API Infor Doctor
  router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get("/api/get-schedule-bydate", doctorController.getScheduleByDate);

  // API Extra Infor Doctor
  router.get(
    "/api/get-extra-doctor-infor-by-id",
    doctorController.getExtraInforDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );

  return app.use("/", router);
};

module.exports = initWebRoutes;

// Một web bắt đầu từ 1 route => controller sẽ điều hướng đến file có chứa data

// Web là người dùng.
