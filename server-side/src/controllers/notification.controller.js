import Notification from '../models/notification.model.js';

const getAllNotification = (req, res) => {
    Notification.findAll()
        .then((result) => res.json(result))
        .catch((err) => res.json({ message: err }));
};

export { getAllNotification };
