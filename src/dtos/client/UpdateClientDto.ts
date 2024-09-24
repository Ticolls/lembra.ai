import { ClientStatus } from "@prisma/client"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateClientDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    planId: string

    constructor(body: any) {
        this.name = body.name
        this.email = body.email
        this.planId = body.planId
    }
}