import { request } from '~/config';

const search = async (title, type = 'less') => {
    try {
        const response = await request.get('search', {
            params: {
                title,
                type,
            },
        });

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default search;
