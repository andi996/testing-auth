import React from "react";
import { Container, setConfiguration } from "react-grid-system";

export default function MobileGrid({ children }) {
  setConfiguration({ gutterWidth: 4, gridColumns: 6 });
  return <Container style={{ maxWidth: 834 }}>{children}</Container>;
}
