const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    health_score: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate:{
        min: 0,
        max:100,
      }
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false
    }
  },{timestamps:false});
}
