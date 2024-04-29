import fs from 'fs/promises';

const initialPeople = async (value) => {
  fs.writeFile('./data/result.json', JSON.stringify(value), 'utf8');
};

const savePeople = async (value) => {
  try {
    const data = await fs.readFile('./data/result.json', 'utf8');
    const parsedData = JSON.parse(data);
    parsedData.push(value);
    await fs.writeFile(
      './data/result.json',
      JSON.stringify(parsedData),
      'utf8'
    );
    console.log('Data has been added successfully');
  } catch (error) {
    console.error(error);
  }
};

const getAllPeopleByKey = async (key) => {
  try {
    const data = await fs.readFile('./data/result.json', 'utf8');
    const parsedData = JSON.parse(data);
    const getKeys = parsedData.filter((item) => item.username === key);
    return getKeys;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const searchPeople = async (key) => {
  try {
    const data = await fs.readFile('./data/result.json', 'utf8');
    const parsedData = JSON.parse(data);
    const search = key.trim().toLowerCase();
    const filteredData = parsedData.filter((item) =>
      item.username.toLowerCase().includes(search)
    );
    return filteredData;
  } catch (error) {
    console.error(error);
    return [];
  }
};
const getAllPeople = async () => {
  try {
    const data = await fs.readFile('./data/result.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getPeopleById = async (id) => {
  try {
    const data = await getAllPeople();
    const people = data.find((item) => item.id === id);
    return people;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const deletePeopleById = async (id) => {
  try {
    const data = await getAllPeople();
    const newData = data.filter((item) => item.id !== id);
    await fs.writeFile('./data/result.json', JSON.stringify(newData), 'utf8');
    console.log('Data has been deleted successfully');
  } catch (error) {
    console.error(error);
  }
};

export {
  savePeople,
  getAllPeople,
  initialPeople,
  getPeopleById,
  deletePeopleById,
  getAllPeopleByKey,
  searchPeople,
};
