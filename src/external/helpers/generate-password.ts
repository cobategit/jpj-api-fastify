export const generatePassword = () => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789@#$';

    for (let index = 0; index <= 8; index++) {
        let chr = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(chr)
    }
    return new Promise<string>((resolve) => resolve(pass))
}