/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';
import ReactPaginate from 'react-paginate'; // paginate
import {toast} from 'react-toastify';
import ModalDelete from '../../components/Popup/ModalDelete';
import ModalUser from '../../components/Popup/ModalUser';
import useInstance from '../../setup/instance';

const UsersManage = () => {
  const {instance, controller} = useInstance();

  // delete User
  const deleteUser = async (user) => {
    try {
      const userId = user.id;
      // console.log(userId);
      return await instance.delete(`/users/delete`, {data: {id: userId}});
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  // action Modal
  const [actionModalUser, setActionModalUser] = useState('');
  // Data Modal
  const [dataModel, setDataModel] = useState({}); // modal delete
  const [dataModalUser, setDataModelUser] = useState({}); // modal update/create users

  // Modal Delete popup state
  const [userDeleteShow, setUSerDeleteShow] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10); // limit how many appear on one page
  const [totalPages, setTotalPages] = useState(0);

  // listUsers state
  const [listUsers, setListUsers] = useState([]);

  // fetchUsers function (fetch all users)
  const fetchUsers = async () => {
    try {
      let response = await instance.get(`/users/read?page=${currentPage}&limit=${currentLimit}`);

      if (response && response.data && response.data.EC === 0) {
        setTotalPages(response.data.DT.totalPages);
        setListUsers(response.data.DT.users);
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    } finally {
      controller.abort();
    };
  };

  // PageClick func
  // Invoke when user click to request another page.
  const handlePageClick = async (event) => {
    const selectedPage = +event.selected + 1;
    setCurrentPage(selectedPage); // set CurrentPage value state
    await fetchUsers(selectedPage);
  };

  // show confirm pop up Func
  const handleDeleteUser = (user) => {
    setDataModel(user);
    setUSerDeleteShow(true);
  };

  // user delete function
  const handleDelete = async () => {
    let response = await deleteUser(dataModel);
    if (response && response.data && response.data.EC === 0) {
      toast.success(response.data.EM);
      await fetchUsers();
      setUSerDeleteShow(false);
    } else {
      toast.error(response.data.EM);
    };
  };

  // user delete confirm popup close function
  const handleClose = () => {
    setUSerDeleteShow(false);
    setDataModel({});
  };

  // userModalOpen state
  const [showUserCreate, setShowUserCreate] = useState(false);

  // CreateUser Func
  const handleCreateUserOpen = () => {
    setActionModalUser('CREATE');
    setShowUserCreate(true);
  };

  // handleUserCreateClose Func
  const handleUserCreateClose = async () => {
    setShowUserCreate(false);
    setDataModelUser({});
    await fetchUsers();
  };

  const handleEditUser = (user) => {
    setActionModalUser('UPDATE');
    setDataModelUser(user);
    setShowUserCreate(true);
  };

  const handleRefresh = async () => {
    await fetchUsers();
  };

  useEffect(() => {
    document.title = 'Users';

    fetchUsers(); // fetch user on every render
  }, [currentPage, currentLimit]);

  return (
    <>
      <div className='manage-user-container'>
        <div className="userManage-header">
          <div><h3 className='text-[3rem]'>Users</h3></div>
          <div className='userManage-actions mb-4'>
            <button className='bg-green-400 text-white px-4 py-2 rounded-[8px] mr-2 hover:bg-green-500' onClick={handleRefresh}><i className="fa-solid fa-arrows-rotate mr-2"></i>Refresh</button>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-[8px] hover:bg-blue-600' onClick={handleCreateUserOpen}><i className="fa-solid fa-plus mr-2"/>Add new User</button>
          </div>
          <div className="userMange-body">
            <table className="min-w-full table-auto divide-y divide-gray-500 border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-[2px] hover:bg-gray-200 border-r">No</th>
                  <th className="py-2 px-[2px] hover:bg-gray-200 border-r">Id</th>
                  <th className="py-2 px-4 hover:bg-gray-200 border-r">Email</th>
                  <th className="py-2 px-[10px] hover:bg-gray-200 border-r">Username</th>
                  <th className="py-2 px-[2px] hover:bg-gray-200 border-r">Role</th>
                  <th className="py-2 px-[2px] hover:bg-gray-200 border-r">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ?
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={`row-${index}`} className="hover:bg-gray-200">
                          <td className="py-2 px-[2px] border-b border-r text-center">{(currentPage - 1) * currentLimit + index + 1}</td>
                          <td className="py-2 px-[2px] border-b border-r text-center">{item.id}</td>
                          <td className="py-2 px-4 border-b border-r">{item.email}</td>
                          <td className="py-2 px-[10px] border-b border-r">{item.first_name + ' ' + item.last_name }</td>
                          <td className="py-2 px-[2px] border-b border-r text-center w-[100px]">{item ? item.roleName : ''}</td>
                          <td className="py-2 px-[2px] border-b text-center w-[250px]">
                            <button className='bg-yellow-400 text-white px-4 py-2 rounded-[8px] mr-2' onClick={() => handleEditUser(item)}><i className="fa-solid fa-pen-to-square mr-2"/>Edit</button>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-[8px]'onClick={() => handleDeleteUser(item)}><i className="fa-solid fa-delete-left mr-2"/>Delete</button>
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
          {totalPages > 0 &&
        <div className='user-footer'>
          <ReactPaginate
            nextLabel={(
              <>
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </>
            )} // Label for the next button.
            onPageChange={handlePageClick} // The method to call when a page is changed. Exposes the current page object as an argument.
            pageRangeDisplayed={3} // The range of pages displayed.
            marginPagesDisplayed={4} // The number of pages to display for margins.
            pageCount={totalPages} // The total number of pages.
            previousLabel={(
              <>
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </>
            )} // Label for the previous button.
            pageClassName="page-item isolate inline-flex -space-x-px shadow-sm" // The classname on tag li of each page element.
            pageLinkClassName="page-link relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200" // The classname on tag a of each page element.
            previousClassName="page-item isolate inline-flex -space-x-px rounded-md shadow-sm" // The classname on tag li of the previous button
            previousLinkClassName="page-link relative inline-flex items-center rounded-l-md px-4 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 font-poppins" // The classname on tag a of the previous button.
            nextClassName="page-item isolate inline-flex -space-x-px rounded-md shadow-sm" // The classname on tag li of the next button.
            nextLinkClassName="page-link inline-flex items-center rounded-r-md px-4 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-200 font-poppins" // The classname on tag a of the next button.
            breakLabel="..." // Label for ellipsis.
            breakClassName="page-item isolate inline-flex -space-x-px rounded-md shadow-sm" // The classname on tag li of the ellipsis element.
            breakLinkClassName="page-link relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-200" // The classname on tag a of the ellipsis element.
            containerClassName="pagination flex justify-center mt-4" // The classname of the pagination container.
            activeClassName="active bg-indigo-600 rounded-[0px]" // The classname for the active page. It is concatenated to base class pageClassName.
            activeLinkClassName="text-white ring-0 hover:bg-indigo-600" // The classname on the active tag a. It is concatenated to base class pageLinkClassName.
            renderOnZeroPageCount={null} // A render function called when pageCount is zero. Let the Previous / Next buttons be displayed by default (undefined). Display nothing when null is provided.
          />
        </div>
          }
        </div>
      </div>
      <ModalDelete
        show={userDeleteShow}
        handleClose={handleClose}
        handleDelete={handleDelete}
        dataModel={dataModel}/>
      <ModalUser
        showUserCreate={showUserCreate}
        handleUserCreateClose={handleUserCreateClose}
        action={actionModalUser}
        dataModalUser={dataModalUser}/>
    </>
  );
};

export default UsersManage;
