import * as md5 from 'md5'

export function encryptPw(password: string) : string{
return md5(password)
}