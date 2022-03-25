const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('users', {      
      nickName:{
        type:DataTypes.STRING,
        unique:true
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
      },
      alt:{
        type:DataTypes.STRING,
        allowNull:false
      },
      password:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar:{
        type:DataTypes.TEXT//url
      },
      coins:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
      },
      Exp:{
        type:DataTypes.INTEGER,        
      }
  });
}; 