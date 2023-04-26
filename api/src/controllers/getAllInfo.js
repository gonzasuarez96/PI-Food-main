const { getInfoApi } = require('./getInfoApi')
const { getInfoDb } = require('./getInfoDB')

const getAllInfo = async() => {
    const apiInfo = await getInfoApi()
    const dbInfo = await getInfoDb()
    const allInfo = apiInfo.concat(dbInfo);
  
    return allInfo;

};

module.exports = { getAllInfo };