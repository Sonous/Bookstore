import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faCommentDots, faUser } from '@fortawesome/free-solid-svg-icons';

export default function BlogDetailPage() {
    return (
        <div>
            <header className="uppercase font-bold text-lg">Bản quyền truyện tranh nhìn từ huyền thoại Doraemon</header>
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
        </div>
    );
}
