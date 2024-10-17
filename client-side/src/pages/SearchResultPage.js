import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import images from '~/assets/images';
import Result from '~/component/Result';
import { request } from '~/config';
import Footer from '~/layouts/Footer/Footer';
import Header from '~/layouts/Header/Header';

function SearchResultPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [searchResult, setSearchResult] = useState([]);

    let q = queryParams.get('q');

    useEffect(() => {
        const fetchApi = async () => {
            const res = await request.get('/book', {
                params: {
                    q,
                    type: 'search',
                },
            });
            setSearchResult(res);
        };

        fetchApi();
    }, [q]);

    return (
        <div>
            <Header />
            {searchResult.length > 0 ? (
                <div className="w-full flex justify-center bg-main-bg-color py-5">
                    <div className="w-main-width">
                        <Result searchPage data={searchResult} />
                    </div>
                </div>
            ) : (
                <div className="w-full bg-main-bg-color flex justify-center items-center h-96">
                    <div className="flex flex-col items-center">
                        <span>
                            <img src={images.nothingIcon} alt="" className="w-36 h-w-36" />
                        </span>
                        <span className="text-2xl font-bold">Không tìm thấy kết quả....</span>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

export default SearchResultPage;
