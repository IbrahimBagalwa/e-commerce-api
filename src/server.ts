import http from "http";
import app from "./app";
import connectDB from "./db/connectDB";

const server = http.createServer(app);

const port = process.env.PORT || 9000;

const startServer = async () => {
  try {
    if (typeof process.env.MONGO_URI === "string") {
      await connectDB(process.env.MONGO_URI);
      server.listen(port, () => {
        console.log(`Server listening on ${port}...`);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

startServer();
