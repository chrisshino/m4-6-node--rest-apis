const { v4: uuidv4 } = require("uuid");
const { clients } = require("../data/clients");

// write your handlers here...
const getAll = () => {
  return clients;
};

const getUnique = (id) => {
  return clients.find((el) => {
    return el.id === id;
  });
};

const createUser = ({ age, name, gender, company, email, address, phone }) => {
  const newId = uuidv4();
  const newObj = {
    id: newId,
    isActive: true,
    age,
    name,
    gender,
    company,
    email,
    phone,
    address,
  };
  clients.push(newObj);
};

const clientExists = (email) => {
  return clients.some((client) => {
    client.email === email;
  });
};

const clientIdExists = (id) => {
  return clients.findIndex((client) => {
    return client.id === id;
  });
};

console.log(clientIdExists("59761c23fcb6254b1a06dad5"));

const deleteUser = (id) => {
  const index = clients.indexOf((user) => {
    return user === id;
  });
  return clients.splice(index, 1);
};

module.exports = {
  getAll,
  getUnique,
  createUser,
  clientExists,
  deleteUser,
  clientIdExists,
};
