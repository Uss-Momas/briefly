import bcrypt from 'bcrypt';

export default function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPwd = bcrypt.hashSync(password, salt);
    return hashedPwd;
}