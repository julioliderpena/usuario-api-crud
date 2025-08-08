import sql from 'mssql'
import 'dotenv/config';


console.log((process.env.DB_ENCRIPTADO === 'true'));

const dbSettings = {
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PUERTO, 10),
    options: {
        encrypt: (process.env.DB_ENCRIPTADO === 'true'), 
        //encrypt: false, 
        trustServerCertificate: true 
    }
}


export const getConnectionSQL = async () => {
    try {
        const pool = await sql.connect(dbSettings);

        return pool;
    } catch(error) {
        console.log(error);
    }
}
