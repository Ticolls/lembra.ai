import { PlanStatus } from "@prisma/client"
import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional } from "class-validator"

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @IsOptional()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @IsOptional()
    password: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    appPlanId: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    status: PlanStatus

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    isEmailVerified: boolean

    @IsNotEmpty()
    @IsString()
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