import React from "react";
import { styled, Typography } from "@mui/material";

export const Heading1 = styled(Typography)({
  fontFamily: "MuseoSans",
  fontWeight: 700,
  fontSize: 38,
  letterSpacing: -0.5,
  lineHeight: `42px`,
});

export const Heading2 = styled(Typography)({
  fontFamily: "MuseoSans",
  fontWeight: 700,
  fontSize: 24,
  letterSpacing: -0.2,
  lineHeight: `28px`,
});

export const Heading3 = styled(Typography)({
  fontFamily: "MuseoSans",
  fontWeight: 700,
  fontSize: 20,
  letterSpacing: -0.1,
  lineHeight: `26px`,
});

export const Heading4 = styled(Typography)({
  fontFamily: "MuseoSans",
  fontWeight: 700,
  fontSize: 16,
  letterSpacing: 0,
  lineHeight: `20px`,
  textTransform: `none`,
});

export const Heading5 = styled(Typography)({
  fontFamily: "MuseoSans",
  fontWeight: 700,
  fontSize: 14,
  letterSpacing: 0,
  lineHeight: `18px`,
});

export const Heading6 = styled(Typography)({
  fontFamily: "MuseoSans",
  fontWeight: 700,
  fontSize: 12,
  letterSpacing: 0,
  lineHeight: `16px`,
});

export const Body1 = styled(Typography)({
  fontFamily: "MuseoSans",
  fontWeight: 500,
  fontSize: 16,
  letterSpacing: 0,
  lineHeight: `22px`,
});

export const Body2 = styled(Typography)({
  fontFamily: "MuseoSans",
  fontWeight: 500,
  fontSize: 14,
  letterSpacing: 0,
  lineHeight: `20px`,
});

export const Body3 = styled(Typography)({
  fontFamily: "MuseoSans",
  fontWeight: 500,
  fontSize: 12,
  letterSpacing: 0,
  lineHeight: `18px`,
});

export const Small = styled(Typography)({
  fontFamily: "MuseoSans",
  fontWeight: 500,
  fontSize: 10,
  letterSpacing: 0,
  lineHeight: `14px`,
});

export function Label(props) {
  const { size, value, color } = props;
  const Label = styled(Typography)({
    color: color,
    fontFamily: "MuseoSans",
    fontWeight: 900,
    fontSize:
      ((size === "large" || size === "xtra large") && `16px`) ||
      (size === "medium" && `14px`) ||
      (size === "micro" && `10px`) ||
      `12px`,
    letterSpacing: 0,
    lineHeight:
      ((size === "large" || size === "xtra large") && `22px`) ||
      (size === "medium" && `18px`) ||
      (size === "micro" && `14px`) ||
      `16px`,
    textTransform: "none",
    zIndex: 3,
  });

  return <Label variant="button">{value}</Label>;
}

export const Font = (props) => {
  const { type = "Body1", children } = props;
  return (
    <>
      {type === "Label" && <Label {...props} value={children} />}
      {type === "Small" && <Small {...props}>{children}</Small>}
      {type === "Body1" && <Body1 {...props}>{children}</Body1>}
      {type === "Body2" && <Body2 {...props}>{children}</Body2>}
      {type === "Body3" && <Body3 {...props}>{children}</Body3>}
      {type === "Heading1" && <Heading1 {...props}>{children}</Heading1>}
      {type === "Heading2" && <Heading2 {...props}>{children}</Heading2>}
      {type === "Heading3" && <Heading3 {...props}>{children}</Heading3>}
      {type === "Heading4" && <Heading4 {...props}>{children}</Heading4>}
      {type === "Heading5" && <Heading5 {...props}>{children}</Heading5>}
      {type === "Heading6" && <Heading6 {...props}>{children}</Heading6>}
    </>
  );
};
