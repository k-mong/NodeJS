import { Router } from "express";
import { USerDTO, CreateUserDTO } from "./dto/UserDTO";

// Router
class UserController {
    router;
    path = "/users";
    users = [
        {
            id: 1,
            firstName: "John",
            lastName: "Don",
            age: 12,
        },
    ];
    //클래스를 사용하기위한 생성자 함수
    constructor(){
        this.router = Router();
        this.init();
    }


    init(){
        this.router.get("/", this.getUsers.bind(this));
        this.router.get("/detail/:id/fullName", this.getUSerFullName.bind(this));
        this.router.get("/detail/:id", this.getUser.bind(this));
        this.router.post("/", this.createUser.bind(this));
    }

    // 전체 사용자 조회
    getUsers(req, res, next){
        try{
            const users = this.users.map((user) => new UserDTO(user));

            res.status(200).json({ users });
        }catch(err){
            next(err);
        }
    }

    // 한 명의 사용자 조회
    getUser(req, res, next){
        try{
            const {id} = req.params;
    
            const targetUser = this.users.find((user) => user.id == Number(id));

            if(!targetUser){
                throw{ status: 404, message: "사용자를 찾을 수 없습니다." };
            }
            const user = new UserDTO(targetUser);
            
            res.status(200).json({user});
        }catch(err){
            next(err);
        }

    }
    // 사용자 이름 찾기
    getUSerFullName ( req, res, next ){
        try{
            const {id} = req.params;
    
            const targetUser = this.users.find((user) => user.id == Number(id));

            if(!targetUser){
                throw{ status: 404, message: "사용자를 찾을 수 없습니다." };
            }
            
            const user = new UserDTO.userFullName(targetUser);

            res.status(200).json({ fullName: user.getFullName() });
        }catch(err){
            next(err);
        }
    }

    // 유저 생성
    createUser(req, res, next){
        try{
            const {firstName, lastName, age} = req.body;
            
            if(!firstName || !lastName){
                throw { stasts: 400, message: "이름을 입력해 주세요" };
            }else if(!age){
                throw { status: 400, message: "나이를 입력해 주세요" };
            }
            const newUser = new CreateUserDTO(firstName, lastName, age).getNewUser();

            this.users.push(newUser);

            this.users.push({
                id: new Date().getTime(),
                firstName,
                lastName,
                age,
            });
    
            res.status(201).json({users: this.users});

        }catch(err){
            next(err);
        }
    }
}

const userController = new UserController();
export default userController;