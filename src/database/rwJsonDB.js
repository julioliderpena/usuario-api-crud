import fs from 'fs';
import path from 'path';


export const readData = (fileName) => {
  try {
    const dbPath = path.join(process.cwd(), 'src', 'database', fileName);
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error al leer ${fileName}:`, error);
    return null;
  }
};


export const writeData = (fileName, data) => {
  try {
    const dbPath = path.join(process.cwd(), 'src', 'database', fileName);
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error(`Error al escribir en ${fileName}:`, error);
  }
};
