export const getUserSwagger = {
    "/detail/:id": {
        get: {
            tags: ["User"],
            summary: "유저 상세 조회 합니다.",
            parameters: [   // id 에 대한 내용
                {
                    in: "path", // URL의 path /:id 부분에 들어간다
                    name: "id",
                    required: true, // 필수요소 인지 true
                    schema: {   // 객체의 속성이나 값의 데이터 유형을 지정
                        type: "number", //타입은 number
                    },
                },
            ],
            responses: {    // 응답에 대한 내용
                200: {    // 200번 응답
                    content: { 
                        "application/json": {
                            schema: {   // 객체의 속성이나 값의 데이터 유형을 지정
                                type: "object",
                                properties: {
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "number",
                                            },
                                            name: {
                                                type: "string",
                                            },
                                            age: {
                                                type: "number",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export const getUsersSwagger = {
    "/detail/:id": {
        post: {
            tags: ["User"],
            summary: "유저 상세 조회 합니다.",
            parameters: [   // id 에 대한 내용
                {
                    in: "path", // URL의 path /:id 부분에 들어간다
                    name: "id",
                    required: true, // 필수요소 인지 true
                    schema: {   // 객체의 속성이나 값의 데이터 유형을 지정
                        type: "number", //타입은 number
                    },
                },
            ],
            responses: {    // 응답에 대한 내용
                200: {    // 200번 응답
                    content: { 
                        "application/json": {
                            schema: {   // 객체의 속성이나 값의 데이터 유형을 지정
                                type: "object",
                                properties: {
                                    user: {
                                        type: "object",
                                        properties: {
                                            id: {
                                                type: "number",
                                            },
                                            name: {
                                                type: "string",
                                            },
                                            age: {
                                                type: "number",
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};