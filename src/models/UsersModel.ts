import { IUsersDB } from "../types";


export class User {    
    constructor(
        private id: string,
        private nickname: string,
        private email: string,
        private password: string,
        private createdAt: string
    ) {}

    public getId(): string {
        return this.id
    }
    
    public setId(value: string): void {
        this.id = value
    }

    public getnickname(): string {
        return this.nickname
    }

    public setnickname(value: string): void {
        this.nickname = value
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(value: string): void {
        this.password = value
    }


    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public toDBModel(): IUsersDB {
        return {
            id: this.id,
            nickname: this.nickname,
            email: this.email,
            password: this.password,
            created_at: this.createdAt
        }
    }

   
}