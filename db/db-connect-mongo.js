const mongoose = require('mongoose');
const getConnection = async () => {

    try{
        const url = 'mongodb://sebastianrestrepo:xZYJfhGpiOdw5Wmm@ac-ehtge2x-shard-00-00.a4acmm0.mongodb.net:27017,ac-ehtge2x-shard-00-01.a4acmm0.mongodb.net:27017,ac-ehtge2x-shard-00-02.a4acmm0.mongodb.net:27017/dbmongo?ssl=true&replicaSet=atlas-kyz5st-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
    await mongoose.connect(url);
    console.log('Conección exitosa')

    }catch(error){
        console.log(error);
    }
    
}
module.exports ={
    getConnection,
}