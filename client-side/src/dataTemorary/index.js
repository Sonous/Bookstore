const categories = [
    { title: 'Văn học', genres: ['Tiểu thuyết', 'Truyện ngắn', 'Light novle', 'Trinh thám'], isContinue: true },
    { title: 'Manga-Comic', genres: ['Trinh thám', 'Hành động', 'Fantasty', 'Slice of Life'], isContinue: true },
    { title: 'Văn học', genres: ['Tiểu thuyết', 'Truyện ngắn', 'Light novle', 'Trinh thám'], isContinue: true },
    { title: 'Manga-Comic', genres: ['Trinh thám', 'Hành động', 'Fantasty', 'Slice of Life'] },
    { title: 'Văn học', genres: ['Tiểu thuyết', 'Truyện ngắn', 'Light novle', 'Trinh thám'], isContinue: true },
    { title: 'Manga-Comic', genres: ['Trinh thám', 'Hành động', 'Fantasty', 'Slice of Life'] },
];


const searchResult = [
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: '',
        currentPrice: 36000,
        quantity: 3,
        rate: 4
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: '',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: '',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
        rate: 4
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
        rate: 3
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
        rate: 5
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 3,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 10',
        image: 'searchResult1',
        currentPrice: 36000,
        quantity: 2,
    },
    {
        title: 'Hồi Kí Vanitas - Tập 14 (Tái bản)',
        image: 'searchResult2',
        currentPrice: 36000,
        quantity: 1,
        rate: 5
    },
];

const bannersSlider = [
    {
        title: 'onePieceBanner',
    },
    {
        title: 'trinhThamCoTrangBanner',
    },
    {
        title: 'boxSetTokyoBabylonBanner',
    },
];

export { categories, searchResult, bannersSlider };
