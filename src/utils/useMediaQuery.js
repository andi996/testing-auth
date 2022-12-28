import { useState, useEffect } from "react";

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}

export const isMobile = () => {
  return useMediaQuery("(max-width: 640px)");
};

export const isTablet = () => {
  return useMediaQuery("(max-width: 768px) and (min-width: 641px)");
};

export const isSmallScreen = () => {
  return useMediaQuery("(max-width: 1007px) and (min-width: 769px)");
};

export const isMediumScreen = () => {
  return useMediaQuery("(max-width: 1365px) and (min-width: 1008px)");
};

export const isLargeScreen = () => {
  return useMediaQuery("(min-width: 1366px)");
};
