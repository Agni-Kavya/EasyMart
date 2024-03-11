import express from "express";
const app = express();
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/error.js";

//Handle Uncaught Exceptions
process.on('uncaughtException',(err)=>{
  console.log(`ERROR:${err}`);
  console.log("Shutting down due to uncaught exception")
  process.exit(1);
})



dotenv.config({ path: "backend/config/config.env" });

// Connecting to database
connectDatabase();

app.use(express.json())
app.use(cookieParser())
// console.log(hello)
// Import all routes
import productRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";



app.use("/api/v1", productRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", orderRoutes);



//Using error middleware
app.use(errorMiddleware);

const server=app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//handle unhandled promise rejection
process.on('unhandledRejection',(err)=>{
  console.log(`ERROR:${err}`)
  console.log('Shutting down the server due to Unhandle Promise Rejection')
  server.close(()=>{
    process.exit(1)
  });
})