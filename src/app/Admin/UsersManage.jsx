/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, {useEffect, useState} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/20/solid';
import ReactPaginate from 'react-paginate'; // paginate
import {deleteUser, fetchAllUser} from '../../services/userService'; // fetchUser service
import {toast} from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';

const UsersManage = () => {
  // Data Modal
  const [dataModel, setDataModel] = useState({});

  // Modal Delete popup state
  const [userDeleteShow, setUSerDeleteShow] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3); // limit how many appear on one page
  const [totalPages, setTotalPages] = useState(0);

  // listUsers state
  const [listUsers, setListUsers] = useState([]);

  // fetchUsers function (fetch all users)
  const fetchUsers = async () => {
    try {
      let response = await fetchAllUser(currentPage, currentLimit);
      // console.log(response);
      if (response && response.EC === 0) {
        // console.log(response.DT);
        setTotalPages(response.DT.totalPages);
        setListUsers(response.DT.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    };
  };

  // PageClick func
  // Invoke when user click to request another page.
  const handlePageClick = async (event) => {
    setCurrentPage(+event.selected + 1); // set CurrentPage value state
    // await fetchUsers(+event.selected + 1);
    // alert(event.selected);
  };

  // show confirm pop up Func
  const handleDeleteUser = (user) => {
    // console.log(user);
    setDataModel(user);
    // console.log(dataModel);
    setUSerDeleteShow(true);
  };

  // user delete function
  const handleDelete = async () => {
    let response = await deleteUser(dataModel);
    // console.log(response);
    if (response && response.EC === 0) {
      toast.success(response.EM);
      await fetchUsers();
      // setUSerDeleteShow(false);
    } else {
      toast.error(response.EM);
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
    setShowUserCreate(true);
  };

  const handleCreateUser = () => {

  };

  // handleUserCreateClose Func
  const handleUserCreateClose = () => {
    setShowUserCreate(false);
  };

  useEffect(() => {
    fetchUsers(); // fetch user on every render
  }, [currentPage]);

  return (
    <>
      <div className='manage-user-container'>
        <div className="userManage-header">
          <div><h3 className='text-[3rem]'>Users</h3></div>
          <div className='userManage-actions mb-4'>
            <button className='bg-green-400 text-white px-4 py-2 rounded-[8px] mr-2'>Refresh</button>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-[8px]' onClick={handleCreateUserOpen}>Add new User</button>
          </div>
          <div className="userMange-body">
            <table className="min-w-full table-auto divide-y divide-gray-500 border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-[2px] hover:bg-gray-200 border-r">No</th>
                  <th className="py-2 px-[2px] hover:bg-gray-200 border-r">Id</th>
                  <th className="py-2 px-4 hover:bg-gray-200 border-r">Email</th>
                  <th className="py-2 px-[10px] hover:bg-gray-200 border-r">Username</th>
                  <th className="py-2 px-[2px] hover:bg-gray-200 border-r">Group</th>
                  <th className="py-2 px-[2px] hover:bg-gray-200 border-r">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ?
                  <>
                    {listUsers.map((item, index) => {
                      // console.log(item);
                      return (
                        <tr key={`row-${index}`} className="hover:bg-gray-200">
                          <td className="py-2 px-[2px] border-b border-r text-center">{index + 1}</td>
                          <td className="py-2 px-[2px] border-b border-r text-center">{item.User.id}</td>
                          <td className="py-2 px-4 border-b border-r">{item.User.email}</td>
                          <td className="py-2 px-[10px] border-b border-r">{item.first_name + ' ' + item.last_name }</td>
                          <td className="py-2 px-[2px] border-b border-r text-center">{item.Group.id}</td>
                          <td className="py-2 px-[2px] border-b text-center">
                            <button className='bg-yellow-400 text-white px-4 py-2 rounded-[8px] mr-2'>Edit</button>
                            <button className='bg-red-500 text-white px-4 py-2 rounded-[8px]'onClick={() => handleDeleteUser(item)}>Delete</button>
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
        handleCreateUser={handleCreateUser}
        handleUserCreateClose={handleUserCreateClose}/>
    </>
  );
};

export default UsersManage;
