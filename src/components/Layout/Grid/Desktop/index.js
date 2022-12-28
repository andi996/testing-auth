import React, { useEffect } from "react";
import { Container, setConfiguration } from "react-grid-system";
import useMediaQuery from "../../../../utils/useMediaQuery";

export default function DesktopGrid({ children, style }) {
  const maxWidth = useMediaQuery("(max-width: 1008px)");
  const maxWidth2 = useMediaQuery("(max-width: 943px)");
  const maxWidth3 = useMediaQuery("(max-width: 735px)");
  const isMobile = useMediaQuery("(max-width: 640px)");
  useEffect(() => {
    if (!isMobile) {
      setConfiguration({
        gutterWidth: 24,
        gridColumns: 12,
        breakpoints: [641, 769, 1008, 1366, 1600, 1920],
        // containerWidths: [609, 736, 944, 1200, 1200, 1200],
      });
    } else {
      setConfiguration({ gutterWidth: 4, gridColumns: 6 });
    }
  }, [isMobile]);
  return (
    <Container
      style={{
        maxWidth: maxWidth3 ? 609 : maxWidth2 ? 736 : maxWidth ? 944 : 1200,
        paddingLeft: 0,
        paddingRight: 0,
        ...style,
      }}
    >
      {children}
    </Container>
  );
}
