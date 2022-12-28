import React from "react";
import { Container, setConfiguration } from "react-grid-system";

setConfiguration({ gutterWidth: 4, gridColumns: 6 });

export default function MobileGrid({ children }) {
  return <Container>{children}</Container>;
}
