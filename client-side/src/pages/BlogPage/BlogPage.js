import React from 'react';
import BlogCart from './BlogCart';
import { Pagination } from 'antd';
import BlogLayout from './BlogLayout';
export default function BlogPage() {
    return (
        <BlogLayout>
            <header className="uppercase text-2xl font-bold">Sự kiện</header>
            <div className="mt-8 grid grid-cols-2 gap-8">
                {[1, 2, 3, 4, 5, 6].map((el, idx) => {
                    return (
                        <BlogCart
                            key={idx}
                            imageUrl="https://file.hstatic.net/200000343865/article/1-1100_a73b918912c442efa45293faba761192_large.jpg"
                        />
                    );
                })}
            </div>
            <div className="flex justify-center my-12">
                <Pagination defaultCurrent={1} total={100} />
            </div>
        </BlogLayout>
    );
}
