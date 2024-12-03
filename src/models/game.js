import dotenv from 'dotenv'
dotenv.config()

const gameModel = {

    async getAllGamesModel() {
        const peticion = await fetch(process.env.BDD_GAMES)
        const games = await peticion.json()
        return games
    },

    async getGameByIdModel(gameId) {
        const response = await fetch(`${process.env.BDD_GAMES}/${gameId}`);
        if (!response.ok) {
            return { error: "Game no encontrado" }
        }
        const data = await response.json()
        return data
    },

    async createGameModel(newGame) {
        const url = process.env.BDD_GAMES
        const peticion = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(newGame),
            headers: { 'Content-Type': 'application/json' }
        })
        const data = await peticion.json()
        return data
    },

    async updateGameModel(gameId, updateGameModel) {
        // CONEXIÓN A BDD
        const url = `${process.env.BDD_GAMES}/${gameId}`
        // ENVIAR INFO A BDD
        const peticion = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(updateGameModel),
            headers: { 'Content-Type': "application/json" }
        })
        // OBTENER RESPUESTA DE BDD
        const data = await peticion.json()
        // MANDAR RESPUESTA A CONTROLADOR
        return data
    },

    async deleteGameModel(gameId) {
        // CONEXIÓN A BDD
        const url = `${process.env.BDD_GAMES}/${gameId}`
        // ENVIAR INFO A BDD
        const peticion = await fetch(url, {
            method: "DELETE"
        })
        // OBTENER RESPUESTA DE BDD
        const data = await peticion.json()
        // MANDAR RESPUESTA A CONTROLADOR
        return data
    },

    async getGameByID(gameId) {
        const peticion = await fetch(`${process.env.BDD_GAMES}/${gameId}`)
        const data = await peticion.json()
        return data
    }

}

export default gameModel
