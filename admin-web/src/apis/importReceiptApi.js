import { request } from '~/configs';

const importReceiptApi = {
    async createReceipt(data) {
        try {
            const token = localStorage.getItem('token');

            await request.post(
                '/importReceipt',
                {
                    data,
                },
                {
                    headers: {
                        'x-access-token': token,
                    },
                },
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async getReceiptsByStatus(status) {
        try {
            const data = await request.get('/importReceipt', {
                params: {
                    status,
                },
            });

            const newData = data.map((item) => ({
                ...item,
                item_list: JSON.parse(item.item_list),
            }));

            return newData;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    async updateReceipt(data, receiptId) {
        try {
            await request.patch(`/importReceipt/${receiptId}`, {
                data,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default importReceiptApi;
