import { v4 as uuid } from 'uuid';

export async function generateRandomCode() {
    const code = uuid();
    return code.replace(/-/g, '').slice(0, 10);
}

export async function generateRandomCodeV2(length: number) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomArray = new Uint8Array(length);
    let result = "";
    
    crypto.getRandomValues(randomArray);
    
    for (const number of randomArray) {
        result += chars[number % chars.length];
    };

    return result;
}