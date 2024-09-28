import images from '~/assets/images';

const categories = [
    { title: 'Văn học', genres: ['Tiểu thuyết', 'Truyện ngắn', 'Light novle', 'Trinh thám'], isContinue: true },
    { title: 'Manga-Comic', genres: ['Trinh thám', 'Hành động', 'Fantasty', 'Slice of Life'], isContinue: true },
    { title: 'Văn học', genres: ['Tiểu thuyết', 'Truyện ngắn', 'Light novle', 'Trinh thám'], isContinue: true },
    { title: 'Manga-Comic', genres: ['Trinh thám', 'Hành động', 'Fantasty', 'Slice of Life'] },
    { title: 'Văn học', genres: ['Tiểu thuyết', 'Truyện ngắn', 'Light novle', 'Trinh thám'], isContinue: true },
    { title: 'Manga-Comic', genres: ['Trinh thám', 'Hành động', 'Fantasty', 'Slice of Life'] },
];

const news = ['Hoạt động', 'Tin sách', 'Sự kiện'];

const searchResult = [
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: images.searchResult1,
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản) Hồi Kí Vanitas - Tập 14 (Tái bản) Hồi Kí Vanitas - Tập 14 (Tái bản)Hồi Kí Vanitas - Tập 14 (Tái bản) Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: images.searchResult2,
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: images.searchResult1,
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: images.searchResult2,
        currentPrice: 36000,
        quantity: 1,
    },
];

export { categories, news, searchResult };
