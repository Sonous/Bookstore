import React from 'react';
import BlogCart from './BlogCart';
import { Pagination } from 'antd';
export default function BlogPage({ blogs }) {
    return (
        <div>
            <header className="uppercase text-2xl font-bold">Sự kiện</header>
            <div className="mt-8 grid grid-cols-2 gap-8">
                {blogs?.map((blog, idx) => {
                    return <BlogCart key={idx} blog={blog} />;
                })}
            </div>
            <div className="flex justify-center my-12">
                <Pagination defaultCurrent={1} total={100} />
            </div>
        </div>
    );
}
