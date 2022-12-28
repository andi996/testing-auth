import React, { useState, useEffect } from "react";
import { container, content, active } from "./style";
import Notification from "../../Atom/Badge/Notification";

const Profile = ({ children }) => {
  return (
    <>
      <style jsx>{container}</style>
      <div className="container">{children}</div>
    </>
  );
};

const Content = ({
  disable,
  title,
  name,
  icon,
  isSelected,
  notification,
  handleClick,
}) => {
  const handleClickDisable = () => {
    const elements = document.querySelectorAll(".inactive");

    for (const element of elements) {
      element.classList.add("flash");
      setTimeout(() => {
        element.classList.remove("flash");
      }, 400);
    }
  };

  return (
    <>
      <style jsx>{content}</style>
      <style jsx>{active}</style>
      <style jsx>{`
        .content-wrapper {
          padding: 4px 16px;
        }
      `}</style>
      <div
        className={`d-flex content content-wrapper ${isSelected && "active"}  ${
          notification && "inactive"
        }`}
        style={{ opacity: disable && 0.5 }}
        onClick={() => {
          disable ? handleClickDisable() : handleClick();
        }}
      >
        <div className="d-flex">
          <img src={icon} alt="icon.svg" />
          <label>{title}</label>
        </div>

        {notification && <Notification state="dot" width="8px" height="8px" />}
      </div>
    </>
  );
};

Profile.Content = Content;

export default Profile;
