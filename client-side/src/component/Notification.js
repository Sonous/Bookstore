import React from 'react';
import { faCircleCheck, faCircleXmark, faBook,faInfo,faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notification = ({ type, title, message }) => {
    return (
        <div className='flex flex-row justify-center gap-7 items-center mb-5'>
            <div className={`p-3 px-4 rounded-full  ${type === 'Approval' ? ' bg-green-100' : ' bg-red-100'}`}>
            {type === 'Approval' ? (<FontAwesomeIcon icon={faBook} className="text-green-500 text-2xl"/>): (<FontAwesomeIcon icon={faXmark} className="text-red-500 text-2xl" />)}
            </div>

            <div>
            <h4 className='font-bold'>{title}</h4>
            <p className='text-gray-500'>{message}</p>
            
            </div>
        </div>
    );
};

export default Notification;
