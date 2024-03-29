/* eslint-disable prefer-const */
import React, {useState, useRef, useEffect} from 'react';
import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';
import {toast} from 'react-toastify';
import TablePermissions from '../../components/Table/TablePermissions';
import useInstance from '../../setup/instance';

const PermissionsManage = (props) => {
  const childRef = useRef();
  const {instance, controller} = useInstance();

  const createRoles = async (permissions) => {
    try {
      return await instance.post(`/admin/permissions/create`, [...permissions]);
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const dataChildDefault = {
    url: '',
    description: '',
    isValidUrl: true,
  };
  // listChild State
  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault,
  });

  // Get the typing in the input
  const handleOnChangeInput = (name, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][name] = value;

    if (value && name == 'url') {
      _listChilds[key]['isValidUrl'] = true;
    }
    setListChilds(_listChilds);
  };

  // add button function
  const handleAddNewInput = () => {
    let newChild = `child-${uuidv4()}`;
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[newChild] = dataChildDefault;
    setListChilds(_listChilds);
  };

  // delete button function
  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).find(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };

  const handleSave = async () => {
    const invalidOBj = Object.entries(listChilds).find(
        ([key, child], index) => {
          return child && !child.url;
        },
    );

    if (!invalidOBj) {
      // call api
      let data = buildDataToPersist();
      let res = await createRoles(data);
      if (res && res.data && res.data.EC === 0) {
        toast.success(res.data.EM);
        childRef.current.fetchlistPermissionsAgain();
      }
    } else {
      // error
      // console.log('invalid:', invalidOBj);
      toast.error('Input URL must not be empty');
      let _listChilds = _.cloneDeep(listChilds);
      const key = invalidOBj[0];
      _listChilds[key]['isValidUrl'] = false;
      setListChilds(_listChilds);
    }
  };

  useEffect(() => {
    document.title = 'Roles';
  }, []);

  return (
    <div>
      <div className='role-container'>
        <div className="roles-manage">
          <div className='add-roles'>
            <div className='font-semibold'>Add a new role</div>
            <div className='role-parent'>
              {Object.entries(listChilds).map(([key, value], index) => {
                return (
                  <div
                    className='grid grid-rows-1 grid-cols-[35rem,35rem,8rem] gap-4 role-child'
                    key={`child-${key}`}
                  >
                    <div className={`${key}`}>
                      <label className='block'>URL:</label>
                      <input
                        type='text'
                        className={
                        value.isValidUrl ?
                          'w-full rounded-[8px]' :
                          'w-full rounded-[8px] border-red-600'
                        }
                        value={value.url}
                        onChange={(event) =>
                          handleOnChangeInput('url', event.target.value, key)
                        }
                      />
                    </div>
                    <div>
                      <label className='block'>Description:</label>
                      <input
                        type='text'
                        className='w-full rounded-[8px]'
                        value={value.description}
                        onChange={(event) =>
                          handleOnChangeInput(
                              'description',
                              event.target.value,
                              key,
                          )
                        }
                      />
                    </div>
                    <div className='mt-6 w-[200px]'>
                      <button
                        className='bg-[#17b451] hover:bg-[#358b44] text-white text-[15px] font-medium py-2 px-4 rounded-[10px] mr-3'
                        onClick={handleAddNewInput}
                      >
                      Add
                      </button>
                      {index >= 1 && (
                        <button
                          className='bg-red-500 hover:bg-red-700 text-white text-[15px] font-medium py-2 px-4 rounded-[10px]'
                          onClick={() => handleDeleteInput(key)}
                        >
                        Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}

              <div className='mt-3'>
                <button
                  className='bg-yellow-500 hover:bg-yellow-700 text-white text-[15px] font-medium py-2 px-4 rounded-[10px]'
                  onClick={handleSave}
                >
                Save
                </button>
              </div>
            </div>
          </div>
          <hr className='mt-3'/>
          <div className="mt-3">
            <h4 className='font-semibold'>List Current Roles: </h4>
            <TablePermissions ref={childRef}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsManage;
