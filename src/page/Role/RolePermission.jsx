/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, {useEffect, useState} from 'react';
import useInstance from '../../setup/instance';
import _ from 'lodash';
import {toast} from 'react-toastify';

const RolePermission = () => {
  const [userRoles, setuserRoles] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectRole, setselectRole] = useState('');

  const [assignPermissionsByRole, setAssignPermissionsByRole] = useState([]);
  const {instance, controller} = useInstance();

  const fetchRole = async () => {
    try {
      return await instance.get(`/roles/read`);
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const fetchAllPermissions = async () => {
    try {
      return await instance.get(`/admin/permissions/read`);
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const fetchPermissionByRole = async (roleId) => {
    try {
      return instance.get(`/admin/permissions/by-role/${roleId}`);
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const assignRolesToGroup = async (data) => {
    try {
      return await instance.post(`/admin/permissions/assign-to-role`, {data});
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const getRoles = async () => {
    let res = await fetchRole();

    if (res && res.data && +res.data.EC === 0) {
      setuserRoles(res.data.DT);
    } else {
      toast.error(res.data.EM);
    }
  };

  const getAllPermissions = async () => {
    let res = await fetchAllPermissions();
    if (res && res.data && res.data.EC === 0) {
      setListRoles(res.data.DT);
    }
  };


  const buildDataPermissionsByRole = async (rolesPermissions, allPermissions) => {
    let result = [];

    if (allPermissions && allPermissions.length > 0) {
      allPermissions.map((permission) => {
        let object = {};
        object.url = permission.url;
        object.id = permission.id;
        object.description = permission.description;
        object.isAssigned = false;
        if (rolesPermissions && rolesPermissions.length > 0) {
          object.isAssigned = rolesPermissions.some((item) => item.url === object.url);
        }

        result.push(object);
      });
    }
    return result;
  };

  const handleOnChangeGroup = async (value) => {
    setselectRole(value);
    if (value) {
      let res = await fetchPermissionByRole(value);
      console.log(res);
      if (res && res.data && res.data.EC === 0) {
        let result = await buildDataPermissionsByRole(res.data.DT.RolePermissions, listRoles);
        setAssignPermissionsByRole(result);
      }
    }
  };
  const handleSelectRole = async (value) => {
    console.log(value);
    const _assignPermissionsByRole = _.cloneDeep(assignPermissionsByRole);
    let foundIndex = _assignPermissionsByRole.findIndex((item) => +item.id == +value);
    if (foundIndex > -1) {
      _assignPermissionsByRole[foundIndex].isAssigned = !_assignPermissionsByRole[foundIndex].isAssigned;
    };
    setAssignPermissionsByRole(_assignPermissionsByRole);
  };

  const buildDataToSave = () => {
    let result = {};
    const _assignPermissionsByRole = _.cloneDeep(assignPermissionsByRole);
    result.roleId = selectRole;
    let rolePermissionsFilter = _assignPermissionsByRole.filter((item) => item.isAssigned === true);
    let finalRolePermissions = rolePermissionsFilter.map((item) => {
      let data = {roleId: +selectRole, RolePermissionId: +item.id};
      return data;
    });
    result.rolePermissions = finalRolePermissions;
    return result;
  };
  const handleSave = async () => {
    let data = buildDataToSave();
    // console.log(data);
    let res = await assignRolesToGroup(data);
    if (res && res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
    }
  };

  useEffect(() => {
    document.title = 'Roles';
    getRoles();
    getAllPermissions();
  }, []);
  return (
    <div className='role-permission-container'>
      <div className="container">
        <h4 className='text-[25px] font-poppins'>Roles permission:</h4>

      </div>
      <div className='assign-permission-role'>
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-600 font-poppins"
          >
                        Select Roles (<span className="text-red-500">*</span>):
          </label>
          <select
            id="role"
            name="role"
            className="p-[10px] pr-[50px] rounded-[10px] focus:outline-none focus:ring-2 focus:border-blue-300 block sm:text-sm font-poppins font-medium"
            onChange={(event) => handleOnChangeGroup(event.target.value)}
            // value={userGroups.group}
          >
            <option value="">
            Please select the role you want to edit
            </option>
            {userRoles.length > 0 &&
                                userRoles.map((item, index) => {
                                  return (
                                    // console.log(item)
                                    <option
                                      key={`group-${index}`}
                                      value={item.id}
                                    >
                                      {item.name}
                                    </option>
                                  );
                                })}
          </select>
        </div>
      </div>
      <hr className='mt-2 border-t-2 border-[#494848]'/>
      {selectRole &&
      <div className="roles">
        <h4 className='text-[20px] font-poppins'>Assign Roles:</h4>
        {assignPermissionsByRole && assignPermissionsByRole.length > 0 && assignPermissionsByRole.map((item, index) => {
          return (
            <div className='flex items-center' key={`list-role-${index}`}>
              <input id={`list-role-${index}`} type="checkbox" className="form-checkbox text-blue-500 h-4 w-4 rounded-[5px]" value={item.id} checked={item.isAssigned} onChange={(event) => handleSelectRole(event.target.value)}/>
              <label className="text-gray-700 ml-2 font-poppins" htmlFor={`list-role-${index}`}>{item.url}</label>
            </div>
          );
        })}
        <div className="mt-3">
          <button className='bg-secondary px-3 py-[6px] rounded-[7px]' onClick={() => handleSave()}>Save</button>
        </div>
      </div>
      }
    </div>
  );
};

export default RolePermission;
