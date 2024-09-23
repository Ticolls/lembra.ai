import { IsNotEmpty, IsString } from "class-validator"

export class LoginDto {

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    constructor(body: any) {
        this.email = body.email
        this.password = body.password
    }
}