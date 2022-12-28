import React from "react";
import { Col } from "react-grid-system";

function Column({ children, xs, sm, md, lg }) {
  return (
    <Col style={{ marginBottom: 8 }} xs={xs} sm={sm} md={md} lg={lg}>
      {children}
    </Col>
  );
}

export default Column;
