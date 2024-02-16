enum Gender {
    FEMALE = 'female',
    MALE = 'male',
}

export type CreateUserTypes = {
    username: string,
    password: string,
    address: string,
    email: string,
    phoneNo: string,
    gender: Gender
}