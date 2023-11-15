import defaultSwagger from "./defaultSwagger";
import * as UserSwagger from '../users/swagger';

const Swaggers = {
    UserSwagger,
}

const{ path } = Object.values(Swaggers).reduce(
    (acc, apis) => {
        const APIs = Object.values(apis).map((api) => {
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
    {paths: {}}
);

// (2) 스웨거에 등록할 json 만들기

export const swaggerDocs = {
    ...defaultSwagger,
    // path 등록
    path,
};

// (3) 스웨거에 등록하는 방법
// 이 부분은 복사 붙여넣기 해서 사용하기
export const options = {
    swaggerOptions: {
        url: "/swagger.json",
    },
};