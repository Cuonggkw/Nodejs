"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_Infor extends Model {
    static associate(models) {
      // define association here
    }
  }
  Doctor_Infor.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.STRING,
      nameClinic: DataTypes.STRING,
      note: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    // doctorId
    // priceId
    // provinceId
    // paymentId
    // addressClinic
    // nameClinic
    // note
    // count
    {
      sequelize,
      modelName: "Doctor_Infor",
    }
  );
  return Doctor_Infor;
};
