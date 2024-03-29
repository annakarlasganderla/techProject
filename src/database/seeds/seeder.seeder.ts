import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Connection } from 'typeorm';

export default class Seeder {
    public static async run(connection: Connection):Promise<void> {

        const userRepository = connection.getRepository(User);

        const defaultUser: CreateUserDto = {
            email: 'user@gmail.com',
            name: 'Administrador',
            password: 'admin',
            userName: 'admin',
            createdAt: new Date()
        }

        if ((await userRepository.find()).length === 0) {
            await userRepository.insert(defaultUser);
        }
    }
}