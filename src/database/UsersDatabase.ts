import { IUsersDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
export class UsersDatabase extends BaseDatabase{
    public static TABLE_USERS = "users"

    public findUserByEmail = async (email: string): Promise< IUsersDB | undefined>  => {
        const result: IUsersDB[] = await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .select()
            .where({ email })
        
        return result[0]
    }
    public async insertUser(newUserDB: IUsersDB) {
        await BaseDatabase
            .connection(UsersDatabase.TABLE_USERS)
            .insert(newUserDB)
    }

}