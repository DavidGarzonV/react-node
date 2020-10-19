import { PG_FOREIGN_KEY_VIOLATION, PG_UNIQUE_VIOLATION } from './postgres-errors';

const catchFunction = (error: any, res: any) : void => {
    // If user already exists
    if (error.code === PG_FOREIGN_KEY_VIOLATION) {
        res.json({ error: "El registro ya se encuentra asociado a otros." });
    } else if(error.code == PG_UNIQUE_VIOLATION) {
        res.json({ error: "Error de llave unica." });
    }else{
        res.json({ error: error.code });
    }
}
export default catchFunction;