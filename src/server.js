// Requerir módulos 
import express from 'express'
import routerGame from './routers/games_routes.js' // Cambié a 'games_routes'
import routerUser from './routers/user_routes.js'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'
// Inicializaciones
const app = express()

dotenv.config()
console.log(process.env.CLOUDINARY_CLOUD_NAME)

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// Variables 
app.set('port', process.env.puertito || 3000)

// Middlewares
app.use(express.json())

// Rutas 
app.get('/', (req, res) => {
    res.send("Server on")
})

// Rutas Games
app.use('/api', routerGame)

// Rutas Usuarios
app.use('/api', routerUser)

// Exportar la variable app 
export default app
