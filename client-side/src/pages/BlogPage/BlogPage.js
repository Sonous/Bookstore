import React from 'react';
import BlogCart from './BlogCart';
import { Pagination } from 'antd';

export default function BlogPage({ blogs, setBlogSlt, totalPage, setPage }) {
    const handlePageChange = (page) => {
        setPage(page);
    };
    return (
        <div>
            <header className="uppercase text-2xl font-bold">Sự kiện</header>
            <div className="mt-8 grid grid-cols-2 gap-8">
                {Array.isArray(blogs) && blogs.length > 0 ? (
                    blogs.map((blog, idx) => {
                        return (
                            <div
                                key={idx}
                                onClick={() => {
                                    setBlogSlt(blog);
                                }}
                            >
                                <BlogCart blog={blog} />
                            </div>
                        );
                    })
                ) : (
                    <p>No blogs available</p>
                )}
            </div>
            <div className="flex justify-center my-12">
                <Pagination defaultCurrent={1} total={totalPage} pageSize={4} onChange={handlePageChange} />
            </div>
        </div>
    );
}
