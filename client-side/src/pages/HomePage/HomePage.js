import classNames from 'classnames/bind';

import styles from './HomePage.module.css';
import BannerSlider from '~/layouts/BannerSlider/BannerSlider';
import Footer from '~/layouts/Footer/Footer';
import Header from '~/layouts/Header/Header';
import BookCollection from '~/component/BookCollection/BookCollection';

const cx = classNames.bind(styles);

const topics = ['Sách mới', 'Sách bán chạy', 'Manga - Comic', 'Doraemon', 'Wingsbooks'];

function HomePage() {
    return (
        <>
            <Header />
            <main>
                <BannerSlider />
                <article>
                    {topics.map((topic, index) => {
                        return <BookCollection key={index} topic={topic} />;
                    })}
                </article>
            </main>
            <Footer />
        </>
    );
}

export default HomePage;
