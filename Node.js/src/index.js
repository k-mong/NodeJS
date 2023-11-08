import express, { Router } from "express";
import cors from 'cors';
import helmet from 'helmet';
//import UserController from "./users";
import Controllers from "./controllers";
import { swaggerDocs, options } from "./swagger";
import swaggerUi from "swagger-ui-express";
const app = express();

// 미들웨어 (클라이언트에서 요청이 들어오면 작업을 처리하는 곳 애플리케이션 공통처리담당).
app.use(cors());    // 지정한 url 의 요청만 허용하게함.
app.use(helmet());  // 보안 강화
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "700mb" }));

// app.use("/users", UserController.router);

Controllers.forEach((controller) =>{
    app.use(controller.path, controller.router);
});

// 이 부분은 이런식으로 등록하기만 하면 된다 정도로 알면 됨
app.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocs);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, options));

app.use((err, req, res, next) => {
    console.log(err);
    // err에 status가 있으면 status 를 쓰고 err.message를 출력해줘 그게아니면 "서버에서 에러가 발생하였습니다" 를 출력해줘
    res.status( err.status || 500).json({message: err.message || "서버에서 에러가 발생하였습니다."});
});

app.get("/", (req, res) => {
    res.send("Nodejs");
});

app.listen(8000, () => {
    console.log("서버 시작");
});