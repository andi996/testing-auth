import css from "styled-jsx/css";
import { Colors } from "../../../../themes";

export const selectSingleChild = css`
  p {
    cursor: pointer;
    padding: 8px;
    margin: 0;
    font-weight: 500;
    font-size: 16;
    letter-spacing: 0;
    line-height: 22px;
    color: ${Colors.neutral.brown_grey};
    :hover {
      background-color: ${Colors.primary.mid_blue};
      color: white;
    }
  }
`;

export const scrollBar = css`
  /* width */
  ::-webkit-scrollbar {
    width: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #d2d2d2;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #1d62ae;
    border-radius: 2px;
  }
`;
