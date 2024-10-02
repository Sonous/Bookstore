import { request } from '~/config';

const getBanners = async () => {
    try {
        const banners = request.get('banners/');

        return banners;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default getBanners;
