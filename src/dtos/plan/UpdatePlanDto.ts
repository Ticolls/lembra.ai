import { Frequency } from "@prisma/client"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdatePlanDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    price: number

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    frequency: Frequency

    constructor(body: any) {
        this.name = body.name
        this.price = body.price
        this.frequency = body.frequency
    }
}