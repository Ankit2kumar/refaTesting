import express from "express"
import cors from "cors"
import blogPostRouter from "./src/services/blogPost/index.js"
import usersRouter from "./src/services/user/index.js"
import lib from "./src/lib/index.js"
import mongoose from 'mongoose'


const {errorHandlers, serverConfig} = lib


const server = express()
const { PORT } = process.env

server.use(express.json())
server.use(cors(serverConfig))

server.use("/blogPost", blogPostRouter)
server.use("/user", usersRouter)



server.use(errorHandlers.forbidden)
server.use(errorHandlers.notFound)
server.use(errorHandlers.badRequest)
server.use(errorHandlers.server)




mongoose.connect(process.env.MONGO_CONN)


mongoose.connection.on('connected', ()=> {
  console.log('Mongo connected')
  server.listen(PORT, async () => {
    console.log("🚀 Server is running on port ", PORT)
  })

  mongoose.connection.on('error', error =>{
    console.log('Mongo error: ', error)
  })


  
  server.on("error", (error) =>
    console.log("🚀 Server is crashed due to ", error)
  )
})


