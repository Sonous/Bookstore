import Address from '../models/address.model.js'; // Correct import
import UserAddress from '../models/userAddress.model.js'; // Correct import

export const getAddressByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const userAddress = await UserAddress.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Address,
                    attributes: ['address_id', 'address_house_number', 'address_ward', 'address_district', 'address_province', 'address_description'],
                    as: 'address',
                },
            ],
        });

        if (userAddress.length === 0) {
            return res.status(404).json({ message: 'No addresses found for this user.' });
        }

        res.status(200).json(userAddress);
    } catch (error) {
        console.error('Error fetching user address:', error);
        res.status(500).json({ error: error.message });
    }
};
