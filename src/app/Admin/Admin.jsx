import React, {useEffect} from 'react';

const Admin = () => {
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  return (
    <div>
      <div className="new-users">
        <h2 className='font-poppins text-[20px] font-normal'>New Users</h2>
        <div className="user-list flex justify-around flex-wrap">
          <div className="user flex flex-col items-center justify-center">
            <img src={process.env.PUBLIC_URL + '/user/male.png'}/>
            <h2 className='font-poppins text-[20px] font-medium'>Jack</h2>
            <p className='font-poppins'>Joined at 11/11/2023</p>
          </div>
          <div className="user flex flex-col items-center justify-center">
            <img src={process.env.PUBLIC_URL + '/user/male.png'}/>
            <h2 className='font-poppins text-[20px] font-medium'>Jack</h2>
            <p className='font-poppins'>Joined at 11/11/2023</p>
          </div>
          <div className="user flex flex-col items-center justify-center">
            <img src={process.env.PUBLIC_URL + '/user/male.png'}/>
            <h2 className='font-poppins text-[20px] font-medium'>Jack</h2>
            <p className='font-poppins'>Joined at 11/11/2023</p>
          </div>
          <div className="user flex flex-col items-center justify-center">
            <a className="border-2 border-[#3a333399] flex items-center relative no-underline" href="/admin/users">
              <span className="material-symbols-outlined pl-[3px]">
                  person_add
              </span>
            </a>
            <h2 className='font-poppins text-[20px] font-medium'>More</h2>
            <p className='font-poppins'>New User</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
