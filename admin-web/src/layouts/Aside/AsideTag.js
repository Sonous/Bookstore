import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AsideTag({ Icon, title, size = 17, route, activeTag = '' }) {
    const navigate = useNavigate();

    return (
        <div
            className={classNames('flex items-center cursor-pointer hover:text-blue-500 ml-2 px-2 py-1', {
                'text-blue-500 shadow rounded-lg': route === activeTag,
            })}
            onClick={() => navigate(route)}
        >
            <div className="flex-1 flex items-center gap-2">
                <Icon style={{ fontSize: size }} />
                <span>{title}</span>
            </div>
            <RightOutlined />
        </div>
    );
}
