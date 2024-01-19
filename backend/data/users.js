import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Binh Nguyen',
        email: 'binh@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Thanh Nguyen',
        email: 'thanh@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
]

export default users;