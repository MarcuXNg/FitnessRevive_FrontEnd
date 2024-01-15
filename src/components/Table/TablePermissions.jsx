/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect, forwardRef, useImperativeHandle} from 'react';
import {toast} from 'react-toastify';
import useInstance from '../../setup/instance';

const TablePermissions = (props, ref) => {
  const {instance, controller} = useInstance();
  const [listPermissions, setlistPermissions] = useState([]);

  // fetch authenticated
  const fetchAllPermissions = async () => {
    try {
      return await instance.get(`/admin/permissions/read`);
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const deletePermissions = async (permission) => {
    try {
      const permissionId = permission.id;
      // console.log(userId);
      return await instance.delete(`/admin/permissions/delete`, {data: {id: permissionId}});
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPermissions = async () => {
    let res = await fetchAllPermissions();
    if (res && res.data && res.data.EC === 0) {
      setlistPermissions(res.data.DT);
    }
  };

  const handledeletePermission = async (role) => {
    let res = await deletePermissions(role);
    if (res && res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
      await getAllPermissions();
    }
  };

  useEffect(() => {
    getAllPermissions();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchlistPermissionsAgain() {
      getAllPermissions();
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
          {listPermissions && listPermissions.length > 0 ?
                  <>
                    {listPermissions.map((item, index) => {
                      // console.log(item);
                      return (
                        <tr key={`row-${index}`} className="hover:bg-gray-200">
                          {/* <td className="py-2 px-[2px] border-b border-r text-center">{(currentPage - 1) * currentLimit + index + 1}</td> */}
                          <td className="py-2 px-[2px] border-b border-r text-center">{item.id}</td>
                          <td className="py-2 px-4 border-b border-r">{item.url}</td>
                          <td className="py-2 px-[10px] border-b border-r">{item.description}</td>
                          <td className="py-2 px-[2px] border-b text-center w-[250px]">
                            <button className='bg-yellow-400 text-white px-4 py-2 rounded-[8px] mr-2' onClick={() => handleEditRole(item)}><i className="fa-solid fa-pen-to-square mr-2"/>Edit</button>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-[8px]'onClick={() => handledeletePermission(item)}><i className="fa-solid fa-delete-left mr-2"/>Delete</button>
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

TablePermissions.displayName = 'TablePermissions';

export default forwardRef(TablePermissions);
