// import axios from "axios";
import axios from '../setup/axios.js';

// create Roles
const createRoles = async (roles) => {
  try {
    return await axios.post(`/admin/roles/create`, [...roles]);
  } catch (error) {
    console.log(error);
  }
};

// fetch authenticated
const fetchAllRoles = async () => {
  try {
    return await axios.get(`/admin/roles/read`);
  } catch (error) {
    console.log(error);
  }
};

// delete User
const deleteRoles = async (role) => {
  try {
    const roleId = role.id;
    // console.log(userId);
    return await axios.delete(`/admin/roles/delete`, {data: {id: roleId}});
  } catch (error) {
    console.log(error);
  }
};

const fetchRolesByGroup = async (groupId) => {
  try {
    return axios.get(`/admin/roles/by-group/${groupId}`);
  } catch (error) {
    console.log(error);
  }
};

const assignRolesToGroup = async (data) => {
  try {
    return await axios.post(`/admin/roles/assign-to-group`, {data});
  } catch (error) {
    console.log(error);
  }
};

export {
  createRoles,
  fetchAllRoles,
  deleteRoles,
  fetchRolesByGroup,
  assignRolesToGroup,
};
