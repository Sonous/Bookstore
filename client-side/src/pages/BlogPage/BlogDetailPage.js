import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faChevronLeft, faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '~/utils/functions/formatDate';

export default function BlogDetailPage({ blog, setBlogSlt }) {
    return (
        <div>
            <div
                onClick={() => {
                    if (setBlogSlt) {
                        setBlogSlt(null);
                    }
                }}
                className="h-[40px] w-[40px] rounded-full hover:bg-gray-200 flex items-center justify-center bg-gray-100  cursor-pointer transition-all"
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            <header className="mt-4 uppercase font-bold text-lg">{blog.blog_title}</header>
            <div className="flex text-sm mt-2 gap-4 items-center">
                <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <p className="mt-1">{formatDate(blog.created_at)}</p>
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
            <div className="flex justify-center mt-8">
                <div className="w-[60%] h-[400px]" style={{ backgroundImage: `url(${blog.blog_thumbnail})` }}></div>
            </div>
            <div className="mt-8" dangerouslySetInnerHTML={{ __html: blog.blog_content }}></div>
        </div>
    );
}
