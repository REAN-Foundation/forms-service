import * as express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { QuestionController } from "../controller/question.controller";

export const register = (app: express.Application) => {
  const QuestionService = express.Router();

  const controller = new QuestionController();

  QuestionService.get("/all", controller.get);

  QuestionService.get("/:id", controller.getById);

  QuestionService.post("/", controller.create);

  QuestionService.put("/:id", controller.update);

  QuestionService.delete("/delete/:id", controller.delete);

  QuestionService.delete("/delete/all", controller.delete);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors());
  const corsOptions = {
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));

  app.use("/api/v1/questionService", QuestionService);
};
