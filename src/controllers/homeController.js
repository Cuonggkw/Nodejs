import db from "../models/index";
import CRUDService from "../services/CRUDService";

const getHomePage = (req, res) => {
  return res.send("Hello world from controller");
};

const getEjs = async (req, res) => {
  try {
    let data = await db.User.findAll();

    // Đã config trong file viewEngine nên ko cần đường dẫn, auto tìm đến.
    return res.render("home.ejs", { data: JSON.stringify(data) });
  } catch (e) {
    console.log(e);
  }
};

const getCRUD = async (req, res) => {
  return res.render("crud.ejs");
};

const postCRUD = async (req, res) => {
  // Service có nhiệm vụ nhận data từ homeController.
  const message = await CRUDService.createNewUser(req.body);

  return res.send("Post CRUD from sever");

  // dòng lệnh được các tham số từ client request lên server.
};

const readCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  // console.log(data);
  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

const getEditCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    const userData = await CRUDService.getUserInfoById(userId);
    // Check user data not found
    return res.render("editCRUD.ejs", {
      // x <- y
      user: userData,
    });
  } else {
    return res.send("Edit khong thanh cong");
  }
};

const getDeleteCRUD = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    await CRUDService.deleteUserById(userId);
    return res.send("Delete from user!");
  } else {
    return res.send("User not found!");
  }
};

const putCRUD = async (req, res) => {
  const data = req.body;
  const allUser = await CRUDService.updateUserData(data);
  return res.render("displayCRUD.ejs", {
    dataTable: allUser,
  });
};

// object: {
//   key:"",
//   values: "";
// }
module.exports = {
  getHomePage,
  getEjs,
  getCRUD,
  postCRUD,
  readCRUD,
  getEditCRUD,
  getDeleteCRUD,
  putCRUD,
};
// Hiểu đơn giản homeController là sếp
// Sau khi Service có kết quả trả về cho homeController sau đó homeController sẽ trả ra cho user.
// http://localhost:3000/put-crud => API
// render ra 1 object as JSON
