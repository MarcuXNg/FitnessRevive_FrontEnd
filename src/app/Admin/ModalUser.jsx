/* eslint-disable no-unused-vars */

import React, {Fragment} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {UserPlusIcon} from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';


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

const ModalUser = ({showUserCreate, handleUserCreateClose, handleCreateUser}) => {
  // Generate options for days, months, and years
  const days = Array.from({length: 31}, (_, i) => i + 1);
  const months = Array.from({length: 12}, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const yearSpawn = 500; // how many years you want
  const years = Array.from({length: yearSpawn}, (_, i) => currentYear - i);
  return (
    <div>
      <Transition.Root show={showUserCreate} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleUserCreateClose}>
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
                        <UserPlusIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 font-poppins">
                        Create a new User
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 font-poppins">
                          You are creating users as an admin.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-6 w-full">
                          <div>
                            <label htmlFor="emailCreateUser" className="text-sm font-medium text-gray-600 block font-poppins">Email:</label>
                            <input type="email" id='emailCreateUser' placeholder='Email' className='rounded-[10px] w-full font-poppins'/>
                          </div>
                          <div>
                            <label htmlFor="passwordCreateUser" className="text-sm font-medium text-gray-600 block font-poppins">Password:</label>
                            <input type="password" id='passwordCreateUser' placeholder='Password' className='rounded-[10px] w-full font-poppins'/>
                          </div>

                          <div>
                            <label htmlFor="firstNameCreateUser" className="text-sm font-medium text-gray-600 block font-poppins">First Name:</label>
                            <input type="text" id='firstNameCreateUser' placeholder='First Name' className='rounded-[10px] w-full font-poppins'/>
                          </div>
                          <div>
                            <label htmlFor="lastNameCreateUser" className="text-sm font-medium text-gray-600 block font-poppins">Last-Name:</label>
                            <input type="text" id='lastNameCreateUser' placeholder='Last Name' className='rounded-[10px] w-full font-poppins'/>
                          </div>

                          <div>
                            <label htmlFor="contactNumberCreateUser" className="text-sm font-medium text-gray-600 block font-poppins">Contact Number:</label>
                            <input type="number" id='contactNumberCreateUser' placeholder='Contact Number' className='rounded-[10px] w-full font-poppins'/>
                          </div>
                          <div>
                            <label htmlFor="stateCreateUser" className="text-sm font-medium text-gray-600 block font-poppins">State:</label>
                            <input type="text" id='stateCreateUser' placeholder='State' className='rounded-[10px] w-full font-poppins'/>
                          </div>
                          <div>
                            <label htmlFor="cityCreateUser" className="text-sm font-medium text-gray-600 block font-poppins">City:</label>
                            <input type="text" id='cityCreateUser' placeholder='City' className='rounded-[10px] w-full font-poppins'/>
                          </div>
                          <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-600 font-poppins">
                              Gender:
                            </label>
                            <select
                              id="gender"
                              name="gender"
                              className="p-[10px] px-[50px] rounded-[10px] focus:outline-none focus:ring-2 focus:border-blue-300 block sm:text-sm font-poppins"
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-600 font-poppins">
                              Country:
                            </label>
                            <select
                              id="country"
                              name="country"
                              className="p-[10px] rounded-[10px] focus:outline-none focus:ring-2 focus:border-blue-300 block w-full sm:text-sm font-poppins"
                            >
                              {countries.map((country) => (
                                <option key={country} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="group" className="block text-sm font-medium text-gray-600 font-poppins">
                              Group:
                            </label>
                            <select
                              id="group"
                              name="group"
                              className="p-[10px] px-[50px] rounded-[10px] focus:outline-none focus:ring-2 focus:border-blue-300 block sm:text-sm font-poppins"
                            >
                              <option value="Dev">Developer</option>
                              <option value="Guess">Guess</option>
                              <option value="User" selected>User</option>
                              <option value="Admin">Admin</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="dob" className="block text-sm font-medium text-gray-600 font-poppins">
                              Date of Birth:
                            </label>
                            <div className="flex gap-2">
                              {/* Day Select */}
                              <select id="day" name="day" className="p-2 pr-[30px] rounded-[10px] font-poppins">
                                <option value="">Day</option>
                                {days.map((day) => (
                                  <option key={day} value={day}>
                                    {day}
                                  </option> // map days
                                ))}
                              </select>

                              {/* Month Select */}
                              <select id="month" name="month" className="p-2 pr-[30px] rounded-[10px] font-poppins">
                                <option value="">Month</option>
                                {months.map((month) => (
                                  <option key={month} value={month}>
                                    {month}
                                  </option> // map months
                                ))}
                              </select>

                              {/* Year Select */}
                              <select id="year" name="year" className="p-2 pr-[30px] rounded-[10px] font-poppins">
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
                      onClick={handleCreateUser}
                    >
                    Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto font-poppins"
                      onClick={handleUserCreateClose}
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
  );
};

ModalUser.propTypes = {
  showUserCreate: PropTypes.bool.isRequired,
  handleUserCreateClose: PropTypes.func.isRequired,
  handleCreateUser: PropTypes.func.isRequired,
};

export default ModalUser;
