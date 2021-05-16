const express = require("express")
const mongoose = require("mongoose")

const offreRoutes = require("./routes/offre")
const filiereRoutes = require("./routes/filieres")
const authRoutes=require("./routes/auth")

const app = express();

require('dotenv').config()


//middlware
app.use(express.json())





mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology: true
})
.then(()=> console.log("Database connected"))
.catch(()=>console.log("Database ERROR"))

//Route pour les offres
app.use("/api/offres", offreRoutes);

//Route pour les filieres
app.use("/api/filieres", filiereRoutes)

//Route Pour la page d'authentification
app.use("/api/auth",authRoutes)

const port=process.env.PORT

app.listen(port, ()=> console.log("server is running in "+port));

