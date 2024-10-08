import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useParams } from 'react-router-dom';
import Header from '~/layouts/Header/Header';

import Footer from '~/layouts/Footer/Footer';
import Result from '~/component/Result';
import { searchResult } from '~/dataTemorary';

function CollectionsPage() {
    const { collection } = useParams();

    return (
        <>
            <Header />
            <div className="w-full flex justify-center bg-main-bg-color py-5">
                <div className="w-main-width">
                    <div className="nav text-base font-semibold flex items-center gap-2">
                        <Link to="/">
                            <span className="hover:text-primary-color cursor-pointer transition-all">TRANG CHỦ</span>
                        </Link>
                        <FontAwesomeIcon icon={faChevronRight} className="text-xs font-medium" />
                        <span>{collection.toUpperCase()}</span>
                    </div>

                    <Result collection={collection} data={searchResult} />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CollectionsPage;
