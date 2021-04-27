import express from 'express';
import { routes } from "./routes"
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import path from "path";

import "./database"

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) => {
    return response.render("html/client.html")
})

const http = createServer(app); // Criando protocolo http
const io = new Server(http); // Protocolo WebSocker

io.on("connection", (socket: Socket) => {
    console.log("Se conectou", socket.id);
})


app.use(express.json())

app.use(routes)

http.listen(3000, () => {
    console.log("http://localhost:3000");
})