import pkg from 'pg';
const {Pool} = pkg;

export const pool = new Pool({
    user: 'alejandrocarrillo',
    host: 'localhost',
    password:'',
    database: 'e_commerce',
    port: 5432
});

