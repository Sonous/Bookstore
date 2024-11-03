import Notification from '../models/notification.model.js';

const getAllNotification = (req, res) => {
    Notification.findAll()
        .then((result) => res.json(result))
        .catch((err) => res.json({ message: err }));
};

const getNotificationsByUserId = (req, res) => {
    const userId = req.params.userId;

    Notification.findAll({
        where: { user_id: userId },
        order: [['created_at', 'DESC']], // Sắp xếp theo thời gian tạo
    })
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ message: err.message }));
};

export { getAllNotification, getNotificationsByUserId };