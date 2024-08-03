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
  router.get("/api/topdoctor-home", doctorController.getTopDoctorHome);

  return app.use("/", router);
};

module.exports = initWebRoutes;

// Một web bắt đầu từ 1 route => controller sẽ điều hướng đến file có chứa data

// Web là người dùng.
