/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, {useEffect, useState} from 'react';
import {fetchGroup} from '../../services/userService';
import {fetchAllRoles} from '../../services/rolesService';
import {toast} from 'react-toastify';

const GroupRole = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectGroup, setSelectGroup] = useState('');

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

  //   const handleOnChangeSelect = () => {

  //   }
  useEffect(() => {
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
            className="p-[10px] px-[50px] rounded-[10px] focus:outline-none focus:ring-2 focus:border-blue-300 block sm:text-sm font-poppins"
            // onChange={(event) => handleOnChangeInput(event.target.value, 'group')}
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
      <div className="roles">
        <h4 className='text-[20px] font-poppins'>Assign Roles:</h4>
        {listRoles && listRoles.length > 0 && listRoles.map((item, index) => {
          return (
            <div className='flex items-center' key={`list-role-${index}`}>
              <input id='flexCheckbox' type="checkbox" className="form-checkbox text-blue-500 h-4 w-4 rounded-sm" />
              <label className="text-gray-700 ml-2 font-poppins" htmlFor='flexCheckbox'>{item.url}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupRole;
