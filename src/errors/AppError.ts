export class AppError extends Error {
    code: number

    constructor(msg: string, code: number) {
        super(msg)
        this.code = code
    }
}