const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

// Permite receber JSON no body
app.use(express.json())

const User = require('./models/User')

// Conectando ao MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Banco conectado com sucesso 🚀"))
.catch((err) => console.log("Erro ao conectar:", err))

// CREATE
app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// READ
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        res.json(user)
    } catch (error) {
        res.status(400).json({ error: "ID inválido" })
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } 
            // new:true retorna o documento atualizado
        )

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        res.json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

        res.json({ message: "Usuário deletado com sucesso" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})