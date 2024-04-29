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
    const getKeys = JSON.parse(data).map((item) => item[key]);
    return getKeys;
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

export { savePeople, getAllPeopleByKey, getAllPeople, initialPeople, getPeopleById };
