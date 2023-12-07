/* eslint-disable react/no-unescaped-entities */
import React, {useEffect, useState} from 'react';
import {HelmetProvider, Helmet} from 'react-helmet-async';
import ReportPopUp from './ReportPopUp';
import '../../styles/index/index.scss';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const ErrorPage = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openReportPopup = () => {
    setPopupOpen(true);
  };
  const closePopup = () => {
    setPopupOpen(false);
  };
  useEffect(() => {
    document.title = 'Error Page';
  }, []); // Empty dependency array ensures the effect runs only once after the initial render

  return (
    <HelmetProvider>
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
      </Helmet>
      <div
        id="error-page"
        className="absolute top-[10%] left-[17%] right-[17%] flex items-center justify-center"
      >
        <div className="flex flex-col w-[953.78px] items-center gap-[45px] relative text-center justify-center">
          <h1 className='heading404 text-[18vw] font-poppins'>404</h1>
          <div className="flex flex-col w-[448px] items-center gap-[21px] relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-25.00px] font-poppins font-semibold text-[#1c2129] text-[30px] text-center tracking-[0] leading-[44.0px] whitespace-nowrap">
              Opps! Page not found!
            </div>
            <p className="relative w-fit font-poppins font-medium text-[#6a6a6a] text-[20px] text-center tracking-[0] leading-[22.0px] whitespace-nowrap">
              Sorry, an unexpected error has occurred. The page you are looking for doesn't exist. If you think something is broken, report the problem.
            </p>
            <div className="flex flex-row items-center gap-[21px] justify-center">
              <a href='/' className="inline-flex items-center justify-center gap-[10px] py-[19px] px-[57px] relative flex-[0_0_auto] bg-[#a1f65e] all-[unset] box-border rounded-[15px]">
                <div className="w-[150px] mt-[-1.00px] font-poppins font-semibold text-[#2e2e2e] text-[17px] text-center tracking-[0] leading-[normal">
                  Back to Home
                </div>
              </a>
              <button onClick={openReportPopup} className="inline-flex items-center justify-center gap-[10px] py-[19px] px-[57px] relative flex-[0_0_auto] bg-[#a1f65e] all-[unset] box-border rounded-[15px]">
                <div className="w-[150px] mt-[-1.00px] font-poppins font-semibold text-[#2e2e2e] text-[17px] text-center tracking-[0] leading-[normal]">
                  Report problem
                </div>
              </button>
            </div>
          </div>
          <ReportPopUp isOpen={isPopupOpen} onClose={closePopup}/>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default ErrorPage;
