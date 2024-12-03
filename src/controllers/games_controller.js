import gameModel from '../models/game.js'
import {v2 as cloudinary} from 'cloudinary'
import {v4 as uuidv4} from 'uuid'

const getAllGamesControllers = async (req, res) => {
    const games = await gameModel.getAllGamesModel()
    res.status(200).json(games)
}

const getGameControllerByID = async (req, res) => {
    const { id } = req.params
    try {
        const game = await gameModel.getGameByIdModel(id)
        const status = game.error ? 404 : 200
        res.status(status).json(game)
    } catch (error) {
        res.status(500).json(error)
    }
}

const createGameController = async (req, res) => {
    const newGameData = {
        id: uuidv4(),
        ...req.body
    }
    try {

        const cloudinaryResponse = await cloudinary.uploader.upload(req.files.imagen.tempFilePath, {
            folder: 'games'
        })

    newGameData.imagen = cloudinaryResponse.secure_url
    newGameData.public_id = cloudinaryResponse.public_id
        const game = await gameModel.createGameModel(newGameData)
        res.status(201).json(game)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateGameController = async (req, res) => {
    const { id } = req.params
    try {
        const game = await gameModel.updateGameModel(id, req.body)
        res.status(200).json(game)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteGameController = async (req, res) => {
    const { id } = req.params
    try {
        await gameModel.deleteGameModel(id)
        res.status(200).json({ msg: "Game eliminado" })
    } catch (error) {
        res.status(500).json(error)
    }
}

const getGamesByLocationController = async (req, res) => {
    const { location } = req.params; 
    try {
        const games = await gameModel.getGamesByLocationModel(location);
        const status = games.error ? 404 : 200; 
        res.status(status).json(games);
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor", error: error.message });
    }
}

const getGamesByPriceController = async (req, res) => {
    const { price } = req.params; 
    try {
        const games = await gameModel.getGamesByPriceModel(price);
        const status = games.error ? 404 : 200; 
        res.status(status).json(games);
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor", error: error.message });
    }
};

const getGamesByGenreController = async (req, res) => {
    const { genre } = req.params; 
    try {
        const games = await gameModel.getGamesByGenreModel(genre);
        const status = games.error ? 404 : 200; 
        res.status(status).json(games);
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor", error: error.message });
    }
};

export {
    getAllGamesControllers,
    getGameControllerByID,
    createGameController,
    updateGameController,
    deleteGameController,
    getGamesByLocationController,
    getGamesByPriceController,
    getGamesByGenreController
}
