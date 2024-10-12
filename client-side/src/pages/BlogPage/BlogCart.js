import { faCalendarDays, faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function BlogCart({ blog }) {
    return (
        <div className="px-3 py-3 shadow-lg border-[1px] rounded-md cursor-pointer">
            <div className="w-full h-[300px] overflow-hidden">
                <div
                    className="w-full h-full bg-center bg-cover bg-no-repeat hover:scale-[1.05] transition-all"
                    style={{
                        backgroundImage: `url(https://file.hstatic.net/200000343865/article/1-1100_a73b918912c442efa45293faba761192_large.jpg)`,
                    }}
                ></div>
            </div>
            <div className="flex text-sm mt-2 gap-4 items-center">
                <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <p className="mt-1">30/09/24</p>
                </div>
                <div className="flex items-center mt-[3px] gap-1">
                    <FontAwesomeIcon icon={faCommentDots} />
                    <p className="">0</p>
                </div>
                <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faUser} />
                    <p className="mt-1">Nhà xuất bản Kim Đồng</p>
                </div>
            </div>
            <header className="mt-1 uppercase text-[14px] font-bold line-clamp-2">{blog.blog_title}</header>
            <div className="h-[2px] w-[80%] bg-primary-color my-3"></div>
            <p className="line-clamp-4" dangerouslySetInnerHTML={{ __html: blog.blog_content }}></p>
        </div>
    );
}
