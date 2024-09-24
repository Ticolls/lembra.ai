import { PlanStatus } from "@prisma/client"
import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional, IsBoolean } from "class-validator"

export class CreateUserDto {

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

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    status: PlanStatus

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    isEmailVerified: boolean

    @IsNotEmpty()
    @IsBoolean()
    @IsOptional()
    blocked: boolean

    constructor(body: any) {
        this.name = body.name
        this.email = body.email
        this.password = body.password,
        this.appPlanId = body.appPlanId,
        this.status = body.status,
        this.isEmailVerified = body.isEmailVerified,
        this.blocked = body.blocked
    }
}