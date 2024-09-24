import { ClientStatus } from "@prisma/client"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsString()
    @IsNotEmpty()
    planId: string

    constructor(body: any) {
        this.name = body.name
        this.email = body.email
        this.planId = body.planId
    }
}