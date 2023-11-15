import express, {Router} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Controllers from './controllers';
import { swaggerDocs, options } from './swagger';
import swaggerUi from 'swagger-ui-express';
import database from './database';


(async () => {
    const app = express();
    await database.$connect();

    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({extended: true, limit: "700mb"}));

    Controllers.forEach((controller) => {
        app.use(controller.path, controller.router);
    });

    app.get("/swagger.json", (req, res)=>{
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
})();