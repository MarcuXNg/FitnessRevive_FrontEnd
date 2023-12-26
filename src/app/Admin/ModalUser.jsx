/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

import React, {Fragment, useState, useEffect} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {UserPlusIcon} from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import _ from 'lodash';
import {createNewUser, fetchGroup, updateCurrentUser} from '../../services/userService';

import {Helmet, HelmetProvider} from 'react-helmet-async';

const countries = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia and Herzegovina',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Central African Republic',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Cote d\'Ivoire',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea, North',
  'Korea, South',
  'Kosovo',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Syria',
  'Taiwan',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
  'Zimbabwe',
];

const ModalUser = ({
  showUserCreate,
  handleUserCreateClose,
  action,
  dataModalUser,
}) => {
  const defaultUserData = {
    email: '',
    contact_number: '',
    first_name: '',
    last_name: '',
    password: '',
    state: '',
    city: '',
    gender: '',
    group: '',
    day: '',
    month: '',
    year: '',
    country: '',
    date_of_birth: '',
  };


  const validInputsDefault = {
    email: true,
    contact_number: true,
    first_name: true,
    last_name: true,
    password: true,
    // state: true,
    // city: true,
    // gender: true,
    group: true,
    // day: true,
    // month: true,
    // year: true,
  };

  const [userData, setUserData] = useState(defaultUserData);

  const [validInputs, setValidInputs] = useState(validInputsDefault);

  // Generate options for days, months, and years
  const days = Array.from({length: 31}, (_, i) => i + 1);
  const months = Array.from({length: 12}, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const yearSpawn = 500; // how many years you want
  const years = Array.from({length: yearSpawn}, (_, i) => currentYear - i);

  // Group state
  const [userGroups, setUserGroups] = useState([]);

  const getGroups = async () => {
    let res = await fetchGroup();
    // console.log(res);
    if (res && res.EC === 0) {
      setUserGroups(res.DT);
      if (res.DT && res.DT.length > 0) {
        let groups = res.DT;
        setUserData({...userData, group: groups[0].id});
      }
    } else {
      toast.error(res.EM);
    }
  };

  const calculateDateOfBirth = () => {
    const selectedDay = userData.day || 1; // Default to 1 if day is not selected
    const selectedMonth = (userData.month || 1) - 1; // Default to 1 if month is not selected
    const selectedYear = userData.year || new Date().getFullYear(); // Default to the current year if year is not selected

    // Create a new Date object with the time set to 00:00:00 (midnight) for the selected day, month, and year
    const dateOfBirth = new Date(Date.UTC(selectedYear, selectedMonth, selectedDay, 0, 0, 0));

    // Format the date to a string in the "YYYY-MM-DD" format
    const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0];
    // console.log(formattedDateOfBirth);
    // Update the userData state with the calculated date_of_birth
    setUserData((userData) => ({
      ...userData,
      date_of_birth: formattedDateOfBirth,
    }));
    // console.log('test', userData);
  };

  const handleOnChangeInput = (value, name) => {
    let _userData = _.cloneDeep(userData);
    _userData[name] = value;
    setUserData(_userData);
  };
  const checkValidateInputs = () => {
    if (action === 'UPDATE') return true;
    // create user
    setValidInputs(validInputsDefault);

    // Define an array of field names to check for validation
    let arr = ['email', 'password', 'first_name', 'last_name', 'group'];

    // Initialize the check variable to true
    let check = true;

    // Loop through the array of field names
    for (let i = 0; i < arr.length; i++) {
      // Check if the corresponding field in userData is falsy (empty or undefined)
      if (!userData[arr[i]]) {
        // If the field is not valid, update the validInputs state for that field to false
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[arr[i]] = false;
        setValidInputs(_validInputs);

        // Display an error toast indicating the empty input
        toast.error(`Empty input ${arr[i]}`);

        // Set the check variable to false
        check = false;

        // Break out of the loop since one invalid input is sufficient
        break;
      }
    }

    // Return the check variable, which is true if all fields are valid, false otherwise
    return check;
  };


  const handleConfirmUser = async () => {
    let check = checkValidateInputs();

    // If inputs are valid, proceed with further logic
    if (check === true) {
      // console.log(userData);
      // Add your logic here for creating the user or any other action
      let res = action === 'CREATE' ? await createNewUser({...userData, groupId: userData['group']}) : await updateCurrentUser({...userData, groupId: userData['group']});
      if (res && res.EC === 0) {
        handleUserCreateClose();
        setUserData({...defaultUserData, group: userGroups && userGroups.length > 0 ? userGroups[0].id : ''});
      }
      if (res && res.EC !== 0) {
        toast.error(res.EM);
        let _validInputs = _.cloneDeep(validInputsDefault);
        _validInputs[res.DT] = false;
        setValidInputs(_validInputs);
      }
    }
  };
  const handleCancelUserCreate = async () => {
    setUserData((defaultUserData) => ({...defaultUserData, group: userGroups[0].id}));
    // setUserData({...defaultUserData, group: userGroups[0].id});
    handleUserCreateClose();
  };

  const handleCloseModalUser = async () => {
    handleCancelUserCreate();
    setUserData(defaultUserData);
    setValidInputs(validInputsDefault);
  };

  useEffect(() => {
    calculateDateOfBirth();
  }, [userData.day, userData.month, userData.year]);

  useEffect(() => {
    getGroups();
  }, []);

  useEffect(() => {
    // console.log(dataModalUser);
    if (action === 'UPDATE') {
      const dob = new Date(dataModalUser.date_of_birth);
      let dobDay = dob.getDate().toString();
      let dobMonth = (dob.getMonth() + 1).toString(); // Months are zero-indexed
      let dobYear = dob.getFullYear().toString();
      setUserData({...dataModalUser, group: dataModalUser ? dataModalUser.groupId : '', day: dataModalUser ? dobDay : '', month: dataModalUser ? dobMonth : '', year: dataModalUser ? dobYear : ''});
      // console.log(userData);
    }
  }, [dataModalUser, action]); // mỗi lần thay đổi giá trị này sẽ chạy vào hàm setUserData

  useEffect(() => {
    if (action === 'CREATE') {
      if (userGroups && userGroups.length > 0) {
        setUserData({...userData, group: userGroups[0].id, gender: 'Male', country: 'Afghanistan'});
      }
    }
  }, [action]);

  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        </Helmet>
        <Transition.Root show={showUserCreate} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={handleCloseModalUser}
          >
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
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                          <UserPlusIcon
                            className="h-6 w-6 text-primary"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900 font-poppins"
                          >
                            {action === 'CREATE' ? 'Create a new User' : 'Edit a user'}
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 font-poppins">
                            You are {action === 'CREATE' ? 'creating': 'editting'} users as an admin.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-6 w-full">
                            {/* Email */}
                            <div>
                              <label
                                htmlFor={validInputs.email ? `emailCreateUser` : `invalidEmailCreateUser`}
                                className="text-sm font-medium text-gray-600 block font-poppins"
                              >
                              Email (<span className="text-red-500">*</span>):
                              </label>
                              <div className="relative rounded-[10px] w-full">
                                <input
                                  type="email"
                                  id={validInputs.email ? `emailCreateUser` : `invalidEmailCreateUser`}
                                  placeholder="Email"
                                  className={`rounded-[10px] w-full font-poppins border focus:outline-none focus:ring-2 ${
                                    validInputs.email ?
                                      'focus:border-blue-300' :
                                      'focus:border-red-500 bg-red-50 border-red-500'
                                  } ${action === 'CREATE' ? '': 'bg-slate-200'}`}
                                  value={userData.email}
                                  onChange={(event) => handleOnChangeInput(event.target.value, 'email')}
                                  disabled={action === 'CREATE' ? false : true}
                                />
                                {validInputs.email ? null : (
                                  <span className="material-symbols-outlined absolute inset-y-0 right-0 pr-2 pt-2 flex items-center pointer-events-none text-red-600">
                                    error
                                  </span>
                                )}
                              </div>
                            </div>
                            {/* Password */}
                            <div>
                              {action === 'CREATE' &&
                              <>
                                <label
                                  htmlFor={validInputs.password ? `passwordCreateUser` : `invalidPasswordCreateUser`}
                                  className="text-sm font-medium text-gray-600 block font-poppins"
                                >Password (<span className="text-red-500">*</span>):
                                </label>
                                <input
                                  type="password"
                                  id={validInputs.password ? `passwordCreateUser` : `invalidPasswordCreateUser`}
                                  placeholder="Password"
                                  className={`rounded-[10px] w-full font-poppins border focus:outline-none focus:ring-2 ${
                                validInputs.password ?
                                  'focus:border-blue-300' :
                                  'focus:border-red-500 bg-red-50 border-red-500'
                                  }`}
                                  value={userData.password}
                                  onChange={(event) => handleOnChangeInput(event.target.value, 'password')}
                                />
                                {validInputs.password ? null : (
                                <span className="material-symbols-outlined absolute top-[112px] right-0 pr-[2rem] flex items-center pointer-events-none text-red-600">
                                  error
                                </span>
                              )}
                              </>}
                            </div>
                            {/* FirstName */}
                            <div>
                              <label
                                htmlFor={validInputs.first_name ? `firstNameCreateUser` : `invalidFirstNameCreateUser`}
                                className="text-sm font-medium text-gray-600 block font-poppins"
                              >
                              First Name (
                                <span className="text-red-500">*</span>):
                              </label>
                              <input
                                type="text"
                                id={validInputs.first_name ? `firstNameCreateUser` : `invalidFirstNameCreateUser`}
                                placeholder="First Name"
                                className={`rounded-[10px] w-full font-poppins border focus:outline-none focus:ring-2 ${
                                  validInputs.first_name ?
                                    'focus:border-blue-300' :
                                    'focus:border-red-500 bg-red-50 border-red-500'
                                }`}
                                value={userData.first_name}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'first_name')}
                              />
                              {validInputs.first_name ? null : (
                                  <span className="material-symbols-outlined absolute top-[191px] right-[395px] pr-2 pt-2 flex items-center pointer-events-none text-red-600">
                                    error
                                  </span>
                                )}
                            </div>
                            {/* Last Name */}
                            <div>
                              <label
                                htmlFor={validInputs.last_name ? `lastNameCreateUser` : `invalidLastNameCreateUser`}
                                className="text-sm font-medium text-gray-600 block font-poppins"
                              >
                              Last Name (<span className="text-red-500">*</span>
                              ):
                              </label>
                              <input
                                type="text"
                                id={validInputs.last_name ? `lastNameCreateUser` : `invalidLastNameCreateUser`}
                                placeholder="Last Name"
                                className={`rounded-[10px] w-full font-poppins border focus:outline-none focus:ring-2 ${
                                  validInputs.last_name ?
                                    'focus:border-blue-300' :
                                    'focus:border-red-500 bg-red-50 border-red-500'
                                }`}
                                value={userData.last_name}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'last_name')}
                              />
                              {validInputs.last_name ? null : (
                                  <span className="material-symbols-outlined absolute top-[199px] right-0 pr-[2rem] flex items-center pointer-events-none text-red-600">
                                    error
                                  </span>
                                )}
                            </div>
                            {/* contact_number */}
                            <div>
                              <label
                                htmlFor="contactNumberCreateUser"
                                className="text-sm font-medium text-gray-600 block font-poppins"
                              >
                              Contact Number:
                              </label>
                              <input
                                type="number"
                                id="contactNumberCreateUser"
                                placeholder="Contact Number"
                                className="rounded-[10px] w-full font-poppins"
                                value={userData.contact_number}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'contact_number')}
                              />
                            </div>
                            {/* State */}
                            <div>
                              <label
                                htmlFor="stateCreateUser"
                                className="text-sm font-medium text-gray-600 block font-poppins"
                              >
                              State:
                              </label>
                              <input
                                type="text"
                                id="stateCreateUser"
                                placeholder="State"
                                className="rounded-[10px] w-full font-poppins"
                                value={userData.state}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'state')}
                              />
                            </div>
                            {/* City */}
                            <div>
                              <label
                                htmlFor="cityCreateUser"
                                className="text-sm font-medium text-gray-600 block font-poppins"
                              >
                              City:
                              </label>
                              <input
                                type="text"
                                id="cityCreateUser"
                                placeholder="City"
                                className="rounded-[10px] w-full font-poppins"
                                value={userData.city}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'city')}
                              />
                            </div>
                            {/* Gender */}
                            <div>
                              <label
                                htmlFor="gender"
                                className="block text-sm font-medium text-gray-600 font-poppins"
                              >
                              Gender:
                              </label>
                              <select
                                id="gender"
                                name="gender"
                                className="p-[10px] px-[50px] rounded-[10px] focus:outline-none focus:ring-2 focus:border-blue-300 block sm:text-sm font-poppins"
                                onChange={(event) => handleOnChangeInput(event.target.value, 'gender')}
                                value={userData.gender}
                              >
                                <option defaultValue="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                              </select>
                            </div>
                            {/* Country */}
                            <div>
                              <label
                                htmlFor="country"
                                className="block text-sm font-medium text-gray-600 font-poppins"
                              >
                              Country:
                              </label>
                              <select
                                id="country"
                                name="country"
                                className="p-[10px] rounded-[10px] focus:outline-none focus:ring-2 focus:border-blue-300 block w-full sm:text-sm font-poppins"
                                onChange={(event) => handleOnChangeInput(event.target.value, 'country')}
                                value={userData.country}
                              >
                                {countries.map((country) => (
                                  <option key={country} value={country}>
                                    {country}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {/* Group */}
                            <div>
                              <label
                                htmlFor="group"
                                className="block text-sm font-medium text-gray-600 font-poppins"
                              >
                              Group (<span className="text-red-500">*</span>):
                              </label>
                              <select
                                id="group"
                                name="group"
                                className="p-[10px] px-[50px] rounded-[10px] focus:outline-none focus:ring-2 focus:border-blue-300 block sm:text-sm font-poppins"
                                onChange={(event) => handleOnChangeInput(event.target.value, 'group')}
                                value={userData.group}
                              >
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
                                {/* <option value="Dev">Developer</option>
                              <option value="Guess">Guess</option>
                              <option value="User" selected>User</option>
                              <option value="Admin">Admin</option> */}
                              </select>
                            </div>
                            {/* Date of birth */}
                            <div>
                              <label
                                htmlFor="dob"
                                className="block text-sm font-medium text-gray-600 font-poppins"
                              >
                              Date of Birth:
                              </label>
                              <div className="flex gap-2">
                                {/* Day Select */}
                                <select
                                  id="day"
                                  name="day"
                                  className="p-2 pr-[30px] rounded-[10px] font-poppins"
                                  onChange={(event) => handleOnChangeInput(event.target.value, 'day')}
                                  value={userData.day}
                                >
                                  <option value="">Day</option>
                                  {days.map((day) => (
                                    <option key={day} value={day}>
                                      {day}
                                    </option> // map days
                                  ))}
                                </select>

                                {/* Month Select */}
                                <select
                                  id="month"
                                  name="month"
                                  className="p-2 pr-[30px] rounded-[10px] font-poppins"
                                  onChange={(event) => handleOnChangeInput(event.target.value, 'month')}
                                  value={userData.month}
                                >
                                  <option value="">Month</option>
                                  {months.map((month) => (
                                    <option key={month} value={month}>
                                      {month}
                                    </option> // map months
                                  ))}
                                </select>

                                {/* Year Select */}
                                <select
                                  id="year"
                                  name="year"
                                  className="p-2 pr-[30px] rounded-[10px] font-poppins"
                                  onChange={(event) => handleOnChangeInput(event.target.value, 'year')}
                                  value={userData.year}
                                >
                                  <option value="">Year</option>
                                  {years.map((year) => (
                                    <option key={year} value={year}>
                                      {year}
                                    </option> // map years
                                  ))}
                                </select>
                              </div>
                            </div>
                            {/* End of Create User */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto font-poppins"
                        onClick={() => handleConfirmUser()}
                      >
                        {action === 'CREATE' ? 'Create' : 'Save'}
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto font-poppins"
                        onClick={handleCloseModalUser}
                      >
                      Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </HelmetProvider>
  );
};

ModalUser.propTypes = {
  showUserCreate: PropTypes.bool.isRequired,
  handleUserCreateClose: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  dataModalUser: PropTypes.object.isRequired,
};

export default ModalUser;
