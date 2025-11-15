// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import authRoutes from "./routes/auth.js";
// import todosRoutes from "./routes/todos.js";
// import { errorHandler } from "./middleware/errorHandler.js";

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
// app.use(cors({
//   origin: [clientUrl, "http://localhost:5173"],
//   credentials: true
// }));

// app.get("/", (_req, res) => res.json({ ok: true, message: "Todo API" }));

// app.use("/api/auth", authRoutes);
// app.use("/api/todos", todosRoutes);

// // error handler (last)
// app.use(errorHandler);

// export default app;

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import todosRoutes from "./routes/todos.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());


const allowedOrigins: (string | RegExp | boolean)[] = [
  "http://localhost:5173",
  process.env.CLIENT_URL || "",
].filter(Boolean);


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


app.get("/", (_req, res) => res.json({ ok: true, message: "Todo API" }));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todosRoutes);

app.use(errorHandler);

export default app;
