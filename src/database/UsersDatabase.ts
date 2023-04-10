import { UserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
export class UsersDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"


    public async insertUser(newUserDB: UserDB) {
        await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .insert(newUserDB)
    }

    public findByEmail = async (email: string): Promise< UserDB | undefined>  => {
        const result: UserDB[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .select()
            .where({ email })
        
        return result[0]
    }
}