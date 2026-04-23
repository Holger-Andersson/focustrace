import express from "express"
import cors from "cors"
import tasksRoutes from "./routes/tasks.routes"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/tasks", tasksRoutes);

const PORT = 5000;

app.listen (PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
