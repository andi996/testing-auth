import React from "react";
import useMediaQuery from "../../../utils/useMediaQuery";
import Notification from "../../Atom/Badge/Notification";
import { container, content, active } from "./style";

const Sidebar = (props) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { children } = props;
  return (
    <>
      <style jsx>{container}</style>
      <div className="container" style={{ width: isMobile ? 200 : 282 }}>
        {children}
      </div>
    </>
  );
};

const Content = ({ children, count, notification, isSelected, onClick }) => (
  <>
    <style jsx>{content}</style>
    <style jsx>{active}</style>
    <div
      className={`${`d-flex-fullwidth content`} ${
        isSelected ? `active` : null
      }`}
      onClick={onClick}
    >
      <label>{children}</label>
      <div style={{ marginRight: 4 }}>
        {notification && <Notification value={count} state={`counter`} />}
      </div>
    </div>
  </>
);

Sidebar.Content = Content;

export default Sidebar;
