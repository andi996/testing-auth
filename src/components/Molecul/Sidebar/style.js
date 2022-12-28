import css from "styled-jsx/css";
import { Colors, Elevation } from "../../../themes";

export const content = css`
  .content {
    background: #ffffff;
    border-radius: 8px;
    height: 40px;
    flex: none;
    align-self: stretch;
    flex-grow: 0;
    cursor: pointer;
    cursor: pointer;
    label {
      margin: 8px 8px 8px 16px;
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 20px;
      cursor: pointer;
      color: ${Colors.neutral.greyish_brown};
    }
    :not(:last-child) {
      margin-bottom: 8px;
    }
    :hover {
      label {
        font-weight: 600 !important;
        color: ${Colors.primary.mid_blue} !important;
      }
      background: ${Colors.primary.very_light_blue} !important;
    }

    transition: all 400ms ease-out;
  }

  .flash {
    transition: all 200ms ease-in;
    background: rgba(31, 150, 255, 0.25);
    border: 1px solid ${Colors.secondary.clear_blue};
  }
`;

export const container = css`
  .container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px;
    width: 100%;
    max-width: 282px;

    position: relative;
    height: fit-content;

    background: #ffffff;
    /* Elevation 02 Navigation Menu */

    box-shadow: ${Elevation.navigationMenu};
    border-radius: 8px;
  }
`;

export const active = css`
  .active {
    background: ${Colors.primary.very_light_blue} !important;
    color: ${Colors.primary.mid_blue} !important;

    label {
      font-weight: 600 !important;
      color: ${Colors.primary.mid_blue} !important;
    }
  }
`;
