import { BaseDatabase } from "../../src/database/BaseDatabase";
import { IUsersDB, USER_ROLES } from "../../src/interfaces";
export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users";


    public insertUser = async (newUserDB: IUsersDB) => {};
  
    public findUserByEmail = async (email: string) => {
      switch (email) {
        case "normal@email.com":
          return {
            id: "id-mock",
            name: "Normal Mock",
            email: "normal@email.com",
            password: "hash-bananinha",
            created_at: new Date().toISOString(),
            role: USER_ROLES.NORMAL,
          };
        case "admin@email.com":
          return {
            id: "id-mock",
            name: "Admin Mock",
            email: "admin@email.com",
            password: "hash-bananinha",
            created_at: new Date().toISOString(),
            role: USER_ROLES.ADMIN,
          };
        default:
          return undefined;
      }
    };
  
  
  }
  