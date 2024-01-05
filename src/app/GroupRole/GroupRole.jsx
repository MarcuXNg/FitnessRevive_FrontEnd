/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, {useEffect, useState} from 'react';
import {fetchGroup} from '../../services/userService';
import {fetchAllRoles, fetchRolesByGroup, assignRolesToGroup} from '../../services/rolesService';
import _ from 'lodash';
import {toast} from 'react-toastify';

const GroupRole = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectGroup, setSelectGroup] = useState('');

  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);

  const getGroups = async () => {
    let res = await fetchGroup();
    // console.log(res);
    if (res && res.EC === 0) {
      setUserGroups(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const getAllRoles = async () => {
    let data = await fetchAllRoles();
    if (data && data.EC === 0) {
      setListRoles(data.DT);
    }
  };


  const buildDataRoleByGroup = async (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {};
        object.url = role.url;
        object.id = role.id;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRoles && groupRoles.length > 0) {
          object.isAssigned = groupRoles.some((item) => item.url === object.url);
        }

        result.push(object);
      });
    }
    return result;
  };

  const handleOnChangeGroup = async (value) => {
    setSelectGroup(value);
    if (value) {
      let data = await fetchRolesByGroup(value);
      if (data && data.EC === 0) {
        // console.log(data);
        let result = await buildDataRoleByGroup(data.DT.Roles, listRoles);
        // console.log(result);
        setAssignRolesByGroup(result);
        // setListRoles(data.DT);
      }
    }
  };
  const handleSelectRole = async (value) => {
    // console.log(value);
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    let foundIndex = _assignRolesByGroup.findIndex((item) => +item.id == +value);
    if (foundIndex > -1) {
      _assignRolesByGroup[foundIndex].isAssigned = !_assignRolesByGroup[foundIndex].isAssigned;
    };
    setAssignRolesByGroup(_assignRolesByGroup);
  };

  const buildDataToSave = () => {
    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = selectGroup;
    let groupRolesFilter = _assignRolesByGroup.filter((item) => item.isAssigned === true);
    let finalGroupRoles = groupRolesFilter.map((item) => {
      let data = {groupId: +selectGroup, roleId: +item.id};
      return data;
    });
    result.groupRoles = finalGroupRoles;
    return result;
  };
  const handleSave = async () => {
    let data = buildDataToSave();
    // console.log(data);
    let res = await assignRolesToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    }
  };

  useEffect(() => {
    document.title = 'GroupRole';
    getGroups();
    getAllRoles();
  }, []);
  return (
    <div className='group-role-container'>
      <div className="container">
        <h4 className='text-[25px] font-poppins'>Group Role:</h4>

      </div>
      <div className='assign-group-role'>
        <div>
          <label
            htmlFor="group"
            className="block text-sm font-medium text-gray-600 font-poppins"
          >
                             Select Group (<span className="text-red-500">*</span>):
          </label>
          <select
            id="group"
            name="group"
            className="p-[10px] pr-[50px] rounded-[10px] focus:outline-none focus:ring-2 focus:border-blue-300 block sm:text-sm font-poppins font-medium"
            onChange={(event) => handleOnChangeGroup(event.target.value)}
            // value={userGroups.group}
          >
            <option value="">
            Please select your group
            </option>
            {userGroups.length > 0 &&
                                userGroups.map((item, index) => {
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
      <hr/>
      {selectGroup &&
      <div className="roles">
        <h4 className='text-[20px] font-poppins'>Assign Roles:</h4>
        {assignRolesByGroup && assignRolesByGroup.length > 0 && assignRolesByGroup.map((item, index) => {
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

export default GroupRole;
