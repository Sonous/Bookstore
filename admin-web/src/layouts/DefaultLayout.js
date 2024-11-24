import { Col, Row } from 'antd';
import React from 'react';

export default function DefaultLayout({ AsideElement, children }) {
    return (
        <Row>
            <Col span={5} style={{ position: 'relative' }}>
                <div className="border-r-2 h-svh w-full sticky">{AsideElement}</div>
            </Col>
            <Col span={19}>
                <div className="border-r-2 h-svh w-full sticky overflow-y-auto">{children}</div>
            </Col>
        </Row>
    );
}
