import { Col, Row } from 'antd';
import React from 'react';

export default function DefaultLayout({ AsideElement, children }) {
    return (
        <Row>
            <Col span={4}>
                <div className="border-r-2 h-svh w-full">{AsideElement}</div>
            </Col>
            <Col span={20}>{children}</Col>
        </Row>
    );
}
