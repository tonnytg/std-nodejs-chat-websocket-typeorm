import {getCustomRepository, Repository} from "typeorm";
import {UsersRepository} from "../repositories/UsersRepository";
import { User } from "../entities/users"


class UsersService {
    private userRepository: Repository<User>

    constructor() {
        this.userRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string) {

        // Verificar se usuário exisitr
        const userExists = await this.userRepository.findOne({
            email
        })

        // Senão existir, salvar no DB
        if (userExists) {
            return userExists
        }

        const user = this.userRepository.create({
            email
        })

        await this.userRepository.save(user);

        // Se existir, retornar user
        return user;
    }
}

export { UsersService }