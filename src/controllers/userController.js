// Write API
import user from "../models/user";
import userService from "../services/userServices";

const handleLogin = async (req, res) => {
  //  API trả về state status.

  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    // status(500): status error(lỗi)
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }

  let userData = await userService.handleUserLogin(email, password);
  // console.log(userData);
  // Check email exist
  //  compare password
  // return userInfor
  // access_token:JWT
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};

let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; // type => All or id.
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
      users: [],
    });
  }
  // Phải truyền vào đầu vào
  let users = await userService.getAllUsers(id);
  console.log(users);
  return res.status(200).json({
    errCode: 1,
    errMessage: "OK",
    users,
  });
};

let handleCreateUsers = async (req, res) => {
  let message = await userService.handleCreateUsers(req.body);
  // console.log(message);
  return res.status(200).json(message);
};

let handleEditUsers = async (req, res) => {
  const data = req.body;
  const message = await userService.updateUserData(data);
  return res.status(200).json(message);
};

let handleDeleteUsers = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 2,
      errMessage: "Missing required parameters",
    });
  }
  let message = await userService.deleteUser(req.body.id);
  // console.log(message);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Get all code error", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleLogin,
  handleGetAllUsers,
  handleCreateUsers,
  handleEditUsers,
  handleDeleteUsers,
  getAllCode,
};

// Để lấy 1 values từ client truyền lên chỉ cần (.body.values)
// "timezone": "+07:00" => changes timezone
