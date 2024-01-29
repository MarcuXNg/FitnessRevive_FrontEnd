import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {ExclamationTriangleIcon} from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';


const CaloriesPopUp = ({show, handleClose, data, adjustCalories, weight}) => {
  const [type, setType] = useState('gain');
  const [weightGoal, setWeightGoal] = useState(0);
  const handleSaveGoal = async () => {
    if (type === 'gain') {
      adjustCalories(data, 1.1, weightGoal);
    } else if (type === 'mantain') {
      adjustCalories(data, 1, weight);
    } else {
      adjustCalories(data, 0.9, weightGoal);
    }
  };
  return (
    <div>
      <Transition.Root show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Adjust Goals
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 font-poppins">
                            Choose an option to set your calories goal:
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6">
                    <select className='w-[200px] h-[50px] rounded-md border-[2px]' type='select' tabIndex="0" onChange={(e) => setType(e.target.value)} value={type}>
                      <option value="gain">Gain Weight</option>
                      <option value="mantain">Maintain Weight</option>
                      <option value="lose">Lose Weight</option>
                    </select>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6">
                    {type === 'gain' && <input className='w-[70px] h-[50px] rounded-md border-[2px]' type='number' tabIndex="0" onChange={(e) => setWeightGoal(e.target.value)} value={weightGoal}></input>}
                    {type === 'lose' && <input className='w-[70px] h-[50px] rounded-md border-[2px]' type='number' tabIndex="0" onChange={(e) => setWeightGoal(e.target.value)} value={weightGoal}></input>}
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-center sm:px-6">
                    <button
                      type="button"
                      className="mr-2 inline-flex w-full justify-center rounded-lg bg-green-600 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        handleSaveGoal();
                        handleClose();
                      }}
                    >
                      Set Goal
                    </button>
                    {/* <button
                      type="button"
                      className="mr-2 inline-flex w-full justify-center rounded-lg bg-green-600 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                      onClick={() => {
                        adjustCalories(data, 1.1, weightGoal);
                        handleClose();
                      }}
                    >
                      Gain Weight
                    </button>
                    <button
                      type="button"
                      className="mr-2 mt-3 inline-flex w-full justify-center rounded-lg bg-yellow-400 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-yellow-300 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        adjustCalories(data, 1);
                        handleClose();
                      }}
                    >
                      Maintain Weight
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-lg bg-red-600 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:mt-0 sm:w-auto"
                      onClick={() => {
                        adjustCalories(data, 0.9);
                        handleClose();
                      }}
                    >
                      Lose Weight
                    </button> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};


CaloriesPopUp.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  data: PropTypes.number.isRequired,
  adjustCalories: PropTypes.func.isRequired,
  weight: PropTypes.number.isRequired,
};

export default CaloriesPopUp;
