import { getConnectionSQL } from '../database/connectionSQL.js';
import sql from 'mssql';
import bcrypt from 'bcrypt';


export const getUsuarios = async (req, res) => {
  console.log('entró a get de usuarios!'); 

  try {
    // Por buenas prácticas de visualización y mantenimiento me gusta separar el query 
    const querySel1 = `SELECT id, correo, clave, nombre, tipo, estado `;
    const querySel2 = `FROM   DBO.USUARIO`;
    // 🔄 Concatenar los queries en uno sólo
    const query = `${querySel1} ${querySel2}`;

    const pool = await getConnectionSQL();
    const result = await pool.request().query(query);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const getUsuarioById = async (req, res) => {
  console.log('entró a getById de usuarios!');
    
  try {
    const id = req.params.id;
    console.log(`usuario Id = ${id}`);
    // Por buenas prácticas de visualización y mantenimiento me gusta separar el query
    const querySel1 = `SELECT id, correo, clave, nombre, tipo, estado `;
    const querySel2 = `FROM   DBO.USUARIO `;
    const querySel3 = `WHERE  id = ${id} `;
    // 🔄 Concatenar los queries en uno sólo
    const query = `${querySel1} ${querySel2} ${querySel3}`;

    const pool = await getConnectionSQL();
    const result = await pool.request().query(query);
    if (result.recordset.length === 0) 
      return res.status(404).json({ message: 'Usuario no encontrado'});

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const createUsuario = async (req, res) => {
  console.log('entró a post de usuarios!');

  const correo = req.body.correo;
  //const clave = await bcrypt.hash(req.body.clave, 10);
  const clave = req.body.clave;
  const nombre = req.body.nombre;
  const tipo = req.body.tipo;
  const estado = req.body.estado;

  // Por buenas prácticas de visualización y mantenimiento me gusta separar el query
  const queryIns1 = "INSERT INTO DBO.USUARIO ";
  const queryIns2 = "       (correo, clave, nombre, tipo, estado) ";
  const queryIns3 = "VALUES (@correo, @clave, @nombre, @tipo, @estado); ";
  const querySel1 = "SELECT SCOPE_IDENTITY() AS id;";
  // 🔄 Concatenar los queries en uno sólo
  const query = `${queryIns1} ${queryIns2} ${queryIns3}; ${querySel1}`;
  
  try {
    const pool = await getConnectionSQL();
    const result = await pool
      .request()
      .input('correo', sql.VarChar, correo)
      .input('clave', sql.VarChar, clave)
      .input('nombre', sql.VarChar, nombre)
      .input('tipo', sql.Char, tipo)
      .input('estado', sql.Char, estado)
      .query(query);

    console.log(result);    
    res.json( {
      id: result.recordset[0].id,
      clave: clave,
      nombre: nombre,
      estado: estado,
    })
    
    // res.status(201).send('Usuario creado');
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const updateUsuario = async (req, res) => {
  console.log('entró a put de usuarios!');
  const correo = req.body.correo;
  //const clave = await bcrypt.hash(req.body.clave, 10)
  const clave = req.body.clave;
  const nombre = req.body.nombre;
  const tipo = req.body.tipo;
  const estado = req.body.estado;

  try {
    const id = req.params.id;
    console.log(`usuario Id = ${id}`);
    // Por buenas prácticas de visualización y mantenimiento me gusta separar el query
    const queryUpd1 = `UPDATE DBO.USUARIO `;
    const queryUpd2 = `SET    correo = @correo, clave = @clave, `;
    const queryUpd3 = "       nombre = @nombre, tipo = @tipo, estado = @estado ";
    const queryUpd4 = `WHERE  id = ${id} `;
    // 🔄 Concatenar los queries en uno sólo
    const query = `${queryUpd1} ${queryUpd2} ${queryUpd3} ${queryUpd4}`;

    const pool = await getConnectionSQL();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("correo", sql.VarChar, correo)
      .input("clave", sql.VarChar, clave)
      .input("nombre", sql.VarChar, nombre)
      .input('tipo', sql.Char, tipo)
      .input("estado", sql.VarChar, estado)
      .query(query)
    
    console.log(result);
    if (result.rowsAffected[0] === 0) 
      return res.status(404).json({ message: 'Usuario no encontrado'});

    //return res.status(200).json({ message: 'Usuario actualizado correctamente!'});
    res.json({
      id: id,
      correo: correo,
      clave: clave,
      nombre: nombre,
      estado: estado 
    })
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const deleteUsuario = async (req, res) => {
  console.log('entró a delete de usuarios!');
    
  try {
    const id = req.params.id;
    console.log(`usuario Id = ${id}`);
    // Por buenas prácticas de visualización y mantenimiento me gusta separar el query
    const queryDel1 = `DELETE FROM DBO.USUARIO `;
    const queryDel2 = `WHERE  id = ${id} `;
    // 🔄 Concatenar los queries en uno sólo
    const query = `${queryDel1} ${queryDel2}`;

    const pool = await getConnectionSQL();
    const result = await pool.request()
      .input('id', sql.VarChar, id)
      .query(query);

    console.log(result);
    if (result.rowsAffected[0] === 0) 
      return res.status(404).json({ message: 'Usuario no encontrado'});

    return res.status(200).json({ message: 'Usuario eliminado correctamente!'});
  } catch (err) {
    res.status(500).send(err.message);
  }
};
