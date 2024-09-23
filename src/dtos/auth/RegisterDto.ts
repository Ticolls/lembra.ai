import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator"

export class RegisterDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @IsString()
    appPlanId: string

    constructor(body: any) {
        this.name = body.name
        this.email = body.email
        this.password = body.password,
        this.appPlanId = body.appPlanId
    }
}