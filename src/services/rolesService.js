// import axios from "axios";
import axios from '../setup/axios.js';

// fetch authenticated
const createRoles = async (roles) => {
  return await axios.post(`/api/v1/admin/roles/create`, [...roles]);
};

export {
  createRoles,
};
