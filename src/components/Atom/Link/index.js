import React from "react";
import { Colors } from "../../../themes";

export default function Link(props) {
  const {
    type = `mid blue`,
    variant,
    to,
    children,
    size = `medium`,
    active,
  } = props;
  return (
    <>
      <style jsx>
        {`
          a {
            cursor: pointer;
            font-style: normal;
            font-weight: normal;
            font-size: ${(size === `small` && `12px`) ||
            (size === `medium` && `14px`) ||
            (size === `large` && `16px`)};
            line-height: ${(size === `small` && `18px`) ||
            (size === `medium` && `20px`) ||
            (size === `large` && `22px`)};
            color: ${(active &&
              ((type === `mid blue` && Colors.primary.mid_blue) ||
                (type === `clear blue` && Colors.secondary.clear_blue) ||
                (type === `red` && Colors.secondary.red))) ||
            Colors.neutral.greyish_brown};
            text-decoration-line: none;
            :hover {
              color: ${(type === `mid blue` && Colors.primary.mid_blue) ||
              (type === `clear blue` && Colors.secondary.clear_blue) ||
              (type === `red` && Colors.secondary.red)} !important;
            }
            :active {
              color: ${(type === `mid blue` && Colors.primary.mid_blue) ||
              (type === `clear blue` && Colors.secondary.clear_blue) ||
              (type === `red` && Colors.secondary.red)} !important;
            }
            cursor: pointer;
          }
          span {
            :hover {
              text-decoration-line: underline;
            }
          }
        `}
      </style>
      <a href={to}>
        {variant === `icon left` && `< `}
        <span>{children}</span>
        {variant === `icon right` && ` >`}
      </a>
    </>
  );
}
