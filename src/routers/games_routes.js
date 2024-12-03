import { Router } from 'express'
import { 
    createGameController, 
    deleteGameController, 
    getGameControllerByID, 
    getAllGamesControllers, 
    updateGameController,
    getGamesByLocationController,
    getGamesByPriceController,
    getGamesByGenreController

} from '../controllers/games_controller.js'
import { verifyToken } from '../middlewares/auth.js'

const router = Router()

router.get('/games', getAllGamesControllers)

router.get('/games/:id', getGameControllerByID)

router.get('/games/price/:price', getGamesByPriceController)

router.get('/games/genre/:genre', getGamesByGenreController)

router.get('/Ubicacion/:location', getGamesByLocationController);

// Rutas protegidas con JWT
router.post('/games', verifyToken, createGameController)

router.put('/games/:id', verifyToken, updateGameController)

router.delete('/games/:id', verifyToken, deleteGameController)

export default router
