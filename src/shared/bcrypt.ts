import * as bcrypt from 'bcrypt';

export const encodePassword = (password:string) => {
    return bcrypt.hash(password, 14)
}
export const decodePassword = (password:string, hash:string) => {
    return bcrypt.compare(password, hash)
}