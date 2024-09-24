import { Frequency } from "@prisma/client"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePlanDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsString()
    @IsNotEmpty()
    frequency: Frequency

    constructor(body: any) {
        this.name = body.name
        this.price = body.price
        this.frequency = body.frequency
    }
}