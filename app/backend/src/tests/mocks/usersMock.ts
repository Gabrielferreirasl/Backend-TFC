import * as bcrypt from 'bcryptjs';

export default {
    realUser: {
        id: 1,
        username: 'xablau',
        password: bcrypt.hashSync('xablau_password'),
        email: 'xablau@hotmail.com',
        role: 'user'
    },
    invalidUserBody: {
        undefinedUserBlank: { email: '', password: '' },
        invalidUserEmail: { email: 'xablau@hotm', password: 'xablau_password'},
        invalidUserPass: { email: 'xablau@hotmail.com', password: 'xabla'},
        invalidUserWrongPass: { email: 'xablau@hotmail.com', password: 'xablau_pass'},
    },
    validUserBody: { email: 'xablau@hotmail.com', password: 'xablau_password'},
};