const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

const {
  get_Current_User,
  user_Disconnect,
  join_User,
} = require("./socketUser");
// const { fetchHistory } = require("./fetchHistory");

const app = express();
app.use(cors());
const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://yzhang4:123456abc@cluster0.rspyf.mongodb.net/My_test_project?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express());

const port = 4200;

const server = app.listen(
  port,
  console.log(`Server is running on port: ${port} `)
);

const io = socket(server, { cors: { origin: "*" } });

//listener#1: initialise socket io connection
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, roomname }) => {
    //* create user
    const p_user = join_User(socket.id, username, roomname);
    console.log(socket.id, "=id");
    socket.join(p_user.roomname);
  });

  //listener#2: user sending message
  socket.on("chat", (messageBody) => {
    //gets the room user and the message sent
    console.log(socket.id);
    const p_user = get_Current_User(socket.id);
    console.log(p_user.username, p_user.roomname, messageBody, "<<<<<<<<");

    // insert sent message into database
    async function insertIntoDB() {
      try {
        await client.connect();
        const database = client.db("My_test_project");
        const history = database.collection("chatHistory");
        // create a document to insert
        const doc = {
          username: `${p_user.username}`,
          roomName: `${p_user.roomname}`,
          messageBody: `${messageBody}`,
          timestamp: new Date(),
        };
        const result = await history.insertOne(doc);
        console.log(
          `A document was inserted with the _id: ${result.insertedId}`
        );
      } finally {
        await client.close();
      }
    }
    insertIntoDB().catch(console.dir);

    //emit sent messages using sockitIO
    io.to(p_user.roomname).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      messageBody: messageBody,
    });
  });

  //listener#3: when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a message displayed
    const p_user = user_Disconnect(socket.id);

    if (p_user) {
      io.to(p_user.roomname).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        messageBody: `${p_user.username} has left the chat`,
      });
    }
  });
});
