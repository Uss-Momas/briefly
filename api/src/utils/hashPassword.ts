import bcrypt from 'bcrypt';

export default function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPwd = bcrypt.hashSync(password, salt);
    return hashedPwd;
}

export function comparePassword(password: string, hashedPwd: string) {
    return bcrypt.compareSync(password, hashedPwd);
}