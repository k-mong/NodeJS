import * as Swagger from "../controllers/swagger";
import defaultSwagger from "./defaultSwagger";
console.log(Swagger);

// (1) 가공하는 코드
// paths 라는 객체안에 객체를 만들어 객체 안에 값은 Swagger 를 다 합쳐서 넣어줘
// 그 합친 값들이 acc, apis 
const{ paths } = Object.values(Swagger).reduce(
    (acc, apis)=>{
        const APIs = Object.values(apis).map((api)=>{
            return {...api};
        });
        APIs.forEach((api) => {
            const key = Object.keys(api)[0];
            console.log(key);
            if(!acc.paths[key]){
                acc.paths = {
                    ...acc.paths,
                    ...api,
                };
            } else {
                acc.paths[key] = {
                    ...acc.paths[key],
                    ...api[key],
                };
            }
        });
        console.log(acc);
        return acc;
    },
    { paths: {} }
);

// (2) 스웨거에 등록할 json 만들기

export const swaggerDocs = {
    ...defaultSwagger,
    // path 등록
    paths,
};

// (3) 스웨거에 등록하는 방법
// 이 부분은 복사 붙여넣기 해서 사용하기
export const options = {
    swaggerOptions: {
        url: "swagger.json",
    },
};