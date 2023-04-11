require('dotenv').config()
const express = require(`express`)
const app = express()
const route = require(`./routes`)
const mongoose = require(`mongoose`)

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(express.static(`public`));

app.set(`views`, `./src/views`)
app.set(`view engine`, `ejs`)
app.listen(process.env.PORT), () => {}

app.use(route)