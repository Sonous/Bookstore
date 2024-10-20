import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '~/layouts/Footer/Footer';
import Header from '~/layouts/Header/Header';
import BlogPage from './BlogPage';
import BlogDetailPage from './BlogDetailPage';
import blogApi from '~/apis/blogService';
const blogTypes = ['Hoạt động', 'Sự kiện', 'Tin sách', 'Sách giả - Sách lậu', 'Lịch phát hành sách định kỳ'];
export default function BlogLayout() {
    const navigate = useNavigate();
    const { title } = useParams();
    const [typeSlt, setTypeSlt] = useState('Hoạt động');
    const [blogs, setBlogs] = useState([]);
    const [blogSlt, setBlogSlt] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const getBlog = async () => {
        const data = await blogApi.getAllBlog(page, 4, typeSlt);
        setBlogs(data.blogs);
        setTotalPage(data.total);
    };
    useEffect(() => {
        if (title && blogTypes.includes(title)) {
            setTypeSlt(title);
        }
        getBlog();
    }, [page, typeSlt, title]);

    return (
        <div>
            <Header />
            <div className="parallax h-[350px] relative">
                <div className="absolute w-full h-full bg-black/50">
                    <div className="absolute px-[15%] mt-28">
                        <p className="text-white uppercase text-3xl font-bold">Sự kiện</p>
                        <p className="text-white">
                            <span
                                onClick={() => {
                                    navigate('/');
                                }}
                                className="hover:text-primary-color cursor-pointer transition-all"
                            >
                                Trang chủ
                            </span>{' '}
                            / Sự kiện
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-12 px-24 gap-12 flex">
                <div className="basis-[20%]">
                    <div className="rounded-md border-[1px] overflow-hidden">
                        <header className="px-6 py-3 bg-primary-color text-center text-white uppercase font-bold ">
                            Danh mục tin tức
                        </header>
                        <div className="px-4 py-4">
                            {blogTypes.map((type, idx) => {
                                return (
                                    <div
                                        onClick={() => {
                                            navigate(`/blogs/${type}`);
                                        }}
                                        className={`${
                                            typeSlt === type && 'text-primary-color'
                                        } text-[14px] font-semibold hover:text-primary-color cursor-pointer`}
                                        key={idx}
                                    >
                                        {type}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="basis-[80%]">
                    {!blogSlt && (
                        <BlogPage setBlogSlt={setBlogSlt} blogs={blogs} totalPage={totalPage} setPage={setPage} />
                    )}
                    {blogSlt && <BlogDetailPage blog={blogSlt} setBlogSlt={setBlogSlt} />}
                </div>
            </div>
            <div className="my-12"></div>
            <Footer />
        </div>
    );
}
