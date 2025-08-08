import { readData, writeData } from '../database/rwJsonDB.js';


const DB_FILE = 'dbJuser.json';


export const getJusers = (req, res) => {
  console.log('entró a get de jusers!'); 

  const data = readData(DB_FILE);
  res.json(data.jusers);
};


export const getJuserById = (req, res) => {
  console.log("entró al get by id de jusers");

  const data = readData(DB_FILE);
  const id = parseInt(req.params.id);
  const juser = data.jusers.find((u) => u.id === id);
  res.json(juser);
};





export const createJuser = (req, res) => {
  console.log('entró a post de jusers!');
  const data = readData(DB_FILE);

  const maxId = data.jusers.reduce((max, user) => Math.max(max, user.id), 0);
  const newId = maxId + 1;

  const newJuser = {
    ...req.body,
    id: newId, 
  };

  data.jusers.push(newJuser);
  writeData(DB_FILE, data);
  res.json(newJuser);
};


export const updateJuser = (req, res) => {
  console.log('entró a put de jusers!'); 

  const data = readData(DB_FILE);
  const id = parseInt(req.params.id);
  const index = data.jusers.findIndex((u) => u.id === id);
  data.jusers[index] = { ...data.jusers[index], ...req.body };
  writeData(DB_FILE, data);
  res.json({ message: 'User updated successfully!' });
};


export const deleteJuser = (req, res) => {
  console.log('entró a delete de jusers!'); 

  const data = readData(DB_FILE);
  const id = parseInt(req.params.id);
  const index = data.jusers.findIndex((u) => u.id === id);
  data.jusers.splice(index, 1);
  writeData(DB_FILE, data);
  res.json({ message: 'User deleted successfully!' });
};
