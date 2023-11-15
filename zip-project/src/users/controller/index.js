import { Router } from "express";
import { pagination } from "../../middleware/pagination";
import { UsersDTO, CreateUserDTO, UpdateUserDTO } from "../dto";
import { UserService } from "../service";

class UserController {
    router;
    path = "/users";

    constructor(){
        this.router = Router();
        this.init();
        this.userService = new UserService();
    }

    init(){
        this.router.get("/", pagination, this.getUsers.bind(this));
        this.router.get("/detail/:id", this.getUser.bind(this));
        this.router.post("/", this.createUser.bind(this));
        this.router.post("/:id", this.updateUser.bind(this));
        this.router.post("/:id", this.deleteUser.bind(this));
    }

    // 전체 user 조회
    async getUsers(req, res, next){
        console.log(this.getUsers);
        try{
            const {users, age} = this.userService.findUsers({ 
                skip: req.skip, 
                take: req.take,
            });

            res.status(200).json({user: users.map((user)=> new UsersDTO(user)), count});
        } catch(err) {
            next(err);
        }
    }

    // Id 를 조건으로 한 명의 사용자 조회
    async getUser(req, res, next){
        try{
            const {id} = req.params;
            const user = await this.userController.findUsers(id);

            res.status(200).json({ user: new UsersDTO(user) });
        } catch(err) {
            next(err);
        }
    }

    // user생성
    async createUser(req, res, next){
        try{    
            const CreateUserDto = new CreateUserDTO(req.body);

            const newUserId = await this.userService.createUser(CreateUserDto);

            res.status(201).json({ id: newUserId });
        }catch(err){
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try{
            const {id} = req.params;
            const UpdateUserDto = new UpdateUserDTO(req.body);

            await this.userService.updateUser(id, this.UpdateUserDto);

            res.status(204).json({});
        } catch(err) {
            next(err);
        }
    }

    async deleteUser(req, res, next){
        try{
            const { id } = req.params;

            await this.userController.deleteUser(id);

            res.status(204).json({});
        } catch(err){
            next(err);
        }
    }
}

const userController = new UserController();
export default userController;