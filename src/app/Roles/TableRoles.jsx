/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {fetchAllRoles, deleteRoles} from '../../services/rolesService';
import {toast} from 'react-toastify';

const TableRoles = (props, ref) => {
  const [listRoles, setListRoles] = useState([]);

  const getAllRoles = async () => {
    let data = await fetchAllRoles();
    if (data && data.EC === 0) {
      setListRoles(data.DT);
    }
  };

  const handleDeleteRole = async (role) => {
    let data = await deleteRoles(role);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      await getAllRoles();
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchListRolesAgain() {
      getAllRoles();
    },
  }));

  return (
    <div>
      <table className="min-w-full table-auto divide-y divide-gray-500 border border-gray-300">
        <thead>
          <tr>
            {/* <th className="py-2 px-[2px] hover:bg-gray-200 border-r">No</th> */}
            <th className="py-2 px-[2px] hover:bg-gray-200 border-r w-[100px]">Id</th>
            <th className="py-2 px-4 hover:bg-gray-200 border-r">URL</th>
            <th className="py-2 px-[10px] hover:bg-gray-200 border-r">Description</th>
            <th className="py-2 px-[2px] hover:bg-gray-200 border-r">Action</th>
          </tr>
        </thead>
        <tbody>
          {listRoles && listRoles.length > 0 ?
                  <>
                    {listRoles.map((item, index) => {
                      // console.log(item);
                      return (
                        <tr key={`row-${index}`} className="hover:bg-gray-200">
                          {/* <td className="py-2 px-[2px] border-b border-r text-center">{(currentPage - 1) * currentLimit + index + 1}</td> */}
                          <td className="py-2 px-[2px] border-b border-r text-center">{item.id}</td>
                          <td className="py-2 px-4 border-b border-r">{item.url}</td>
                          <td className="py-2 px-[10px] border-b border-r">{item.description}</td>
                          <td className="py-2 px-[2px] border-b text-center w-[250px]">
                            <button className='bg-yellow-400 text-white px-4 py-2 rounded-[8px] mr-2' onClick={() => handleEditRole(item)}><i className="fa-solid fa-pen-to-square mr-2"/>Edit</button>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-[8px]'onClick={() => handleDeleteRole(item)}><i className="fa-solid fa-delete-left mr-2"/>Delete</button>
                          </td>
                        </tr>
                      );
                    })}

                  </> :
                  <><tr className='items-center'>
                    <td>
                      No users found
                    </td>

                  </tr></>
          }
        </tbody>
      </table>
    </div>
  );
};

TableRoles.displayName = 'TableRoles';

export default forwardRef(TableRoles);
