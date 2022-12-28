export const Colors = {
  primary: {
    mid_blue: `#1D62AE`,
    dark_blue: `#0F4A89`,
    pale_gray: `#F4FAFF`,
    very_light_blue: `#E5EDF6`,
  },
  secondary: {
    clear_blue: `#1F96FF`,
    clear_blue_light: `#E9F4FF`,
    highlight_green: `#64B40C`,
    green_light: `#EFF7E7`,
    red: `#CB0000`,
    red_light: `#FAE5E5`,
    orange_yellow: `#FFA800`,
    orange_yellow_light: `#FFF6E5`,
    orange: `#FF8C02`,
    orange_light: `#FFE4E6`,
    purple: `#7529A7`,
    purple_light: `#F1EAF6`,
  },
  neutral: {
    greyish_brown: `#4C4C4C`,
    brown_grey: `#797979`,
    brown_light_grey: `#888888`,
    very_light_grey: `#EEEEEE`,
    light_grey: `#D2D2D2`,
  },
  overlay: {
    dark: `rgba(30, 30, 30, 0.5)`,
    blue_light: `linear-gradient( 83.1deg, rgba(222, 239, 255, 0.75142) 5.39%, rgba(186, 218, 253, 0.53) 95.91% )`,
    blue_dark: `linear-gradient( 180deg, rgba(62, 155, 215, 0.17671) 0%, rgba(29, 98, 174, 0.782015) 100% )`,
  },
};

export const Radius = {
  small: `4px`,
  medium: `8px`,
  large: `24px`,
  circle: `100px`,
};

export const Elevation = {
  card: `0px 0px 1px rgba(40, 41, 61, 0.08), 0px 1px 6px rgba(29, 98, 174, 0.12)`,
  navigationMenu: `0px 0px 1px rgba(40, 41, 61, 0.08), 0px 2px 4px rgba(29, 98, 174, 0.12)`,
  modal: `0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(29, 98, 174, 0.16)`,
};

export const Variants = {
  filled: {
    backgroundColor: Colors.primary.mid_blue,
    color: "white",
    active: {
      backgroundColor: Colors.secondary.clear_blue,
    },
    hover: {
      backgroundColor: Colors.primary.dark_blue,
    },
    error: {
      backgroundColor: Colors.secondary.red,
      color: "white",
    },
    alternate: {
      color: Colors.primary.mid_blue,
      backgroundColor: "white",
      border: `1px solid ${Colors.primary.mid_blue}`,
    },
  },
  ghost: {
    color: Colors.primary.mid_blue,
    border: `1px solid ${Colors.primary.mid_blue}`,
    error: {
      color: Colors.secondary.red,
      border: `1px solid ${Colors.secondary.red}`,
    },
    alternate: {
      color: "white",
      border: `1px solid white`,
    },
  },
  text: {
    alternate: {
      color: "white",
    },
    color: Colors.primary.mid_blue,
    position: "relative",
    afterHover: {
      width: "100%",
      left: 0,
      background: Colors.primary.mid_blue,
    },
    afterActive: {
      width: "20%",
      left: `40%`,
      background: Colors.primary.mid_blue,
    },
    after: {
      background: `none repeat scroll 0 0 transparent`,
      bottom: 0,
      content: '""',
      display: `block`,
      height: 2,
      padding: 0,
      left: `50%`,
      position: `absolute`,
      transition: `width 0.2s ease 0s, left 0.2s ease 0s`,
      width: 0,
      minWidth: 0,
    },
    error: {
      color: Colors.secondary.red,
    },
    // alternate: {
    //   color: Colors.primary.mid_blue,
    //   backgroundColor: "white",
    // },
  },
};
