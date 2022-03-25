const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('question', {
      question:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer:{
        type:DataTypes.STRING,
        allowNull:false
      },
      respuestasIncorrectas:{
        type:DataTypes.ARRAY(DataTypes.JSON),//{respuesta uno, respuesta dos, Respuesta, tres}
      },
    //   false1:{
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
    //   false2:{
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //   },
    //   false3:{
    //     type:DataTypes.STRING,
    //     allowNull:false
    //   },
      category:{
        type:DataTypes.STRING,
        allowNull:false
      }
  });
}; 