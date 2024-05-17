const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const path = require("path");

io.on("connection", (socket) => {
  console.log("User is Conected");

  socket.on("submitNote", (param) => {
    socket.emit("funcSubmitCalled");
    //emitimos el evento
  });

  socket.emit("initialData", {});
});

app.use(express.static(path.join(__dirname, "home")));
app.use(express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/home/index.html`);
}); //conexion para profesor

server.listen(3010, () => {
  console.log("servidor corriendo en el puerto http://localhost:3010");
}); //iniciamos el servidor
