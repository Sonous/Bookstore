// import Address from '../models/address.model.js'; // Correct import
// import UserAddress from '../models/userAddress.model.js'; // Correct import

const getAddressByUser = async (req, res) => {
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

//         if (userAddress.length === 0) {
//             return res.status(404).json({ message: 'No addresses found for this user.' });
//         }

        res.status(200).json(userAddress);
    } catch (error) {
        console.error('Error fetching user address:', error);
        res.status(500).json({ error: error.message });
    }
};

const updateAddress = async (req, res) => {
    const addressId = req.params.addressId; // Extract addressId from params
    const updatedAddressData = req.body; // Extract updated address data from request body

    try {
        // Find the UserAddress entry for the address
        const userAddress = await UserAddress.findOne({
            where: { address_id: addressId },
            include: [{
                model: Address,
                as: 'address',
            }],
        });

        if (!userAddress) {
            return res.status(404).json({ message: 'UserAddress not found.' });
        }

        // Update the Address details
        const [updated] = await Address.update(updatedAddressData, {
            where: { address_id: addressId },
        });

        if (updated) {
            // Fetch the updated address details
            const updatedAddress = await Address.findOne({
                where: { address_id: addressId },
            });

            return res.status(200).json({
                message: 'Address updated successfully.',
                updatedAddress,
            });
        } else {
            return res.status(404).json({ message: 'Address not found or not updated.' });
        }
    } catch (error) {
        console.error('Error updating address:', error);
        return res.status(500).json({
            message: 'An error occurred while updating the address.',
            error: error.message,
        });
    }
};
export { getAddressByUser, updateAddress };
