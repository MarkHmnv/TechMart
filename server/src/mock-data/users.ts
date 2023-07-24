import * as bcrypt from 'bcrypt';
import {Role} from "../model/enum/role.enum";

async function createUser(name: string, email: string, role = Role.USER) {
    const passwordHash = await bcrypt.hash('password', 10);
    return {
        name: name,
        email: email,
        password: passwordHash,
        role: role,
    };
}

export async function createUsers() {
    return await Promise.all([
        createUser('Admin User', 'admin@gmail.com', Role.ADMIN),
        createUser('Mark Himonov', 'markhmnv@gmail.com'),
        createUser('John Doe', 'johndoe@gmail.com'),
        createUser('Elon Musk', 'elonmusk@gmail.com'),
    ]);
}