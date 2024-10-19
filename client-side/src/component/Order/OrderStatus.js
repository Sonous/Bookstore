import classNames from 'classnames';

export default function OrderStatus({ status, currentStatus, setCurrentStatus, orderQuantity }) {
    return (
        <div
            className={classNames('flex flex-col items-center cursor-pointer hover:text-primary-color font-semibold', {
                'border-b-2 border-b-primary-color text-primary-color ': currentStatus,
            })}
            onClick={() => setCurrentStatus(status)}
        >
            <span>{orderQuantity}</span>
            <span>{status}</span>
        </div>
    );
}
