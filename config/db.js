const  mongoose  = require("mongoose")//bch tzid biblotheque jdida !
const mongodb_options={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:true,
}
const mongodb_uri="mongodb+srv://root:root@cluster0.bturw.mongodb.net/carsdriven?retryWrites=true&w=majority"
mongoose.connect(mongodb_uri,mongodb_options).then(()=>console.log("we are conected to database")).catch(()=> console.log("connection error!")) //tconecti serveur b lien * 
module.exports=mongoose

