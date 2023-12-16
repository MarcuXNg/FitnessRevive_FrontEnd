// import axios from "axios";
import axios from '../setup/axios.js';

// fetch authenticated
const createRoles = async (roles) => {
  try {
    return await axios.post(`/api/v1/admin/roles/create`, [...roles]);
  } catch (error) {
    console.log(error);
  }
};

export {
  createRoles,
};
