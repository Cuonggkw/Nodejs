"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Doctor_CS extends Model {
    static associate(models) {
      // define association here
    }
  }
  Doctor_CS.init(
    {
      doctorId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Doctor_CS",
    }
  );
  return Doctor_CS;
};
