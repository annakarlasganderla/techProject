import { PasswordHash } from 'src/commons/services/common.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Connection } from 'typeorm';

export default class Seeder {
    
    public static async run(connection: Connection):Promise<void> {
        const passwordHash = PasswordHash();

        const userRepository = connection.getRepository(User);

        const defaultUser: CreateUserDto = {
            email: 'user@gmail.com',
            name: 'Administrador',
            password: await passwordHash.hashPassword('admin'),
            userName: 'admin',
            createdAt: new Date(),
            userType: 2
        }

        if ((await userRepository.find()).length === 0) {
            await userRepository.insert(defaultUser);
        }
    }
}