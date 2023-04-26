const { Diet } = require('../db');

const dietsHandler = async(req,res) =>{
    try{
        let diet = await Diet.findAll();
        res.status(200).send(diet)
    }catch(error){
        res.status(400).send('error')
    }
}

module.exports = { dietsHandler }