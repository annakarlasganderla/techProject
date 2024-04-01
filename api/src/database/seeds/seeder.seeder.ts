import { PasswordHash } from 'src/commons/services/common.service';
import { CreateDirectorDto } from 'src/directors/dto/create-director.dto';
import { Director } from 'src/directors/entities/director.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Connection } from 'typeorm';

export default class Seeder {
    
    public static async run(connection: Connection):Promise<void> {
        const passwordHash = PasswordHash();

        const userRepository = connection.getRepository(User);
        const directorRepository = connection.getRepository(Director);

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

        const defaultDirector: CreateDirectorDto[] = [{
            name: "Martin Scorcese",
            createdAt: new Date()
        }, {
            name: "Quentin Tarantino",
            createdAt: new Date()
        }]

        if ((await directorRepository.find()).length === 0) {
            defaultDirector.map((e) => {
                directorRepository.insert(e);
            })
        }
    }
}