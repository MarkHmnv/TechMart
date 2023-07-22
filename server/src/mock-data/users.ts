import * as bcrypt from 'bcrypt';

async function createUser(name: string, email: string, role = "user") {
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
        createUser('Admin User', 'admin@gmail.com', "admin"),
        createUser('Mark Himonov', 'markhmnv@gmail.com'),
        createUser('John Doe', 'johndoe@gmail.com'),
        createUser('Elon Musk', 'elonmusk@gmail.com'),
    ]);
}