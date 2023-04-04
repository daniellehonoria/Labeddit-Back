import { v4 } from 'uuid'

//função que gera id
export class IdGenerator {
    public generate = (): string => {
        return v4()
    }
}