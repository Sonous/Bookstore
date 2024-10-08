import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '~/config'

function UserHeading() {
  return (
    <section className="userPage">
            <div className="relative bg-center justify-between w-full bg-cover h-[500px] bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20230526/pngtree-an-old-bookcase-in-a-library-image_2642908.jpg')] rounded-xl flex lg:pl-24 md:pl-8 sm:pl-0">
                <div className="w-fit flex flex-col items-center py-40 sm:mx-5">
                    {/* Top Info */}
                    <div className="userInfo flex flex-col md:flex-row px-8 items-center bg-white rounded-xl">
                    <div className="profilePic bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png')] lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] bg-cover rounded-full"></div>
                    <div className="information px-8 text-center md:text-left">
                        <h1 className="text-orange-600 font-semibold">Khoa Phan</h1>
                        <h2>Tran Phu, Ho Chi Minh City</h2>
                    </div>
                    <div className="jobs text-center md:text-left px-8">
                        <h1>Ui/Ux Designer</h1>
                        <h2>hello@gmail.com</h2>
                        <h2>email</h2>
                    </div>
                    </div>
                    {/* Navigation back */}
                    <div className="flex space-x-2 mt-4">
                    <h1 className='text-white font-bold hover:scale-105 hover:underline'> 
                        <Link to={routes.home}>Home</Link>
                    </h1>
                    <span className='text-white'>/</span>
                    <h1 className='text-white'>User</h1>
                    </div>
                    <div className="control flex  px-1 py-1 items-center justify-between gap-2 " >
                        <div className="flex justify-between items-center w-[175px] py-2 border-b border-b-orange-200 px-5 hover:scale-105 cursor-pointer transition-all duration-200 bg-white  rounded-xl">
                            <h1 className="text-base sm:text-lg font-semibold text-gray-700">
                            <Link to={routes.user}>User</Link>
                            </h1>
                        </div>
                        <div className="flex justify-between items-center w-[175px] py-2 border-b border-b-orange-200 px-5 hover:scale-105 cursor-pointer transition-all duration-200 bg-white  rounded-xl">
                            <h1 className="text-base sm:text-lg font-semibold text-gray-700">
                            <Link to={routes.order}>Order Details</Link>
                            </h1>
                        </div>
                    </div>
                </div>
                
                
            </div>
        </section>
  )
}

export default UserHeading