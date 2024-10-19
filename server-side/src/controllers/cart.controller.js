const getCartItemFromUser = async (req, res) => {
    const { user_id } = req.body;

    try {
        const cartItems = await Cart.findAll({
            where: {
                user_id,
            },
        });

        if (cartItems.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No cart items found for this user',
            });
        }
        return res.status(200).json({
            status: 'success',
            data: cartItems,
        });
    } catch (error) {
        // Handle any errors
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while fetching cart items',
            error: error.message,
        });
    }
};
export { getCartItemFromUser };
