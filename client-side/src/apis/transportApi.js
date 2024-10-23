const { request } = require('~/config');

const id = 50001;

const transportApi = {
    async getTransportMethodById() {
        try {
            const method = await request.get(`/transport/${id}`);

            return {
                ...method,
                transport_cost: parseFloat(method.transport_cost),
            };
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default transportApi;
