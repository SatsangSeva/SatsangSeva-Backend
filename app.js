import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import userRouter from "./routes/user-routes";
import userRouter from "./routes/user-routes.js";
// import adminRouter from "./routes/admin-routes.js";
import eventsRouter from "./routes/events-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
import cors from "cors";
import { searchEvents } from "./controllers/event-controller.js";
dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
// app.use("/admin", adminRouter);
app.use("/events", eventsRouter);
app.use("/event/search", searchEvents);
app.use("/booking", bookingsRouter);

app.use(express.static('./eventImages'));

mongoose.connect(process.env.MONGODB_URL)
  .then(() =>
    app.listen(process.env.PORT || 8000, () =>
      console.log(`Connected To Database And Server is running on port ${process.env.PORT || 8000}`)
    )
  )
  .catch((e) => console.log(e));
