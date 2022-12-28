import { Search } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import React from "react";
import { Colors, Radius } from "../../../themes";
import { Body3, Heading4, Label as LabelText } from "../Typography";

export default function Label(props) {
  const {
    size = `small`,
    variant = `dark blue`,
    children,
    skeleton,
    customStyle,
  } = props;
  return skeleton ? (
    <Skeleton
      variant="rectangular"
      animation="wave"
      height={(size === `small` && `20px`) || (size === `large` && `24px`)}
      width={(size === `small` && `46px`) || (size === `large` && `57px`)}
      sx={{ margin: "4px", borderRadius: Radius.small }}
    />
  ) : (
    <>
      <style jsx>{`
        .container {
          margin: 4px;
          display: flex;
          padding: 1px 8px;
          width: fit-content;
          height: ${(size === `small` && `20px`) ||
          (size === `large` && `24px`)};
          background: ${(variant === `dark blue` &&
            Colors.primary.very_light_blue) ||
          (variant === `grey` && Colors.neutral.very_light_grey) ||
          (variant === `green` && Colors.secondary.green_light) ||
          (variant === `red` && Colors.secondary.red_light) ||
          (variant === `orange` && Colors.secondary.orange_light) ||
          (variant === `light blue` && Colors.secondary.clear_blue_light) ||
          (variant === `purple` && Colors.secondary.purple_light) ||
          (variant === `prioritas` && Colors.secondary.orange_yellow)};
          border-radius: ${Radius.small};
          ${customStyle}
        }
      `}</style>
      <div className="container">
        {(size === `small` && (
          <div className="d-flex">
            {variant === `prioritas` && (
              <img
                src="/images/Principle/Logo/Search.svg"
                style={{ marginRight: 2 }}
              />
              // <Search fontSize="9px" style={{ color: `white` }} />
            )}
            {variant === `prioritas` ? (
              <LabelText size="micro" value={children} color="white" />
            ) : (
              <Body3
                style={{
                  color:
                    (variant === `dark blue` && Colors.primary.mid_blue) ||
                    (variant === `grey` && Colors.neutral.brown_light_grey) ||
                    (variant === `green` && Colors.secondary.highlight_green) ||
                    (variant === `red` && Colors.secondary.red) ||
                    (variant === `orange` && Colors.secondary.orange) ||
                    (variant === `light blue` && Colors.secondary.clear_blue) ||
                    (variant === `purple` && Colors.secondary.purple),
                }}
              >
                {children}
              </Body3>
            )}
          </div>
        )) ||
          (size === `large` && (
            <Heading4
              style={{
                color:
                  (variant === `dark blue` && Colors.primary.mid_blue) ||
                  (variant === `grey` && Colors.neutral.brown_light_grey) ||
                  (variant === `green` && Colors.secondary.highlight_green) ||
                  (variant === `red` && Colors.secondary.red) ||
                  (variant === `orange` && Colors.secondary.orange) ||
                  (variant === `light blue` && Colors.secondary.clear_blue) ||
                  (variant === `purple` && Colors.secondary.purple),
              }}
            >
              {children}
            </Heading4>
          ))}
      </div>
    </>
  );
}
