import React, { useState, useEffect } from "react";
import SidebarProfile from "../../../../components/Molecul/Sidebar/Profile";
import Divider from "../../../../components/Atom/Divider";

export default {
  component: SidebarProfile,
  title: "Design System/Molecul/Sidebar",
  argTypes: {
    notification: { control: { type: "boolean" } },
  },
};

const Template = (args) => {
  const { notification } = args;
  const [selectedSidebar, setSelectedSidebar] = useState({ name: "" });
  const handleChangeSidebar = (key, val) => setSelectedSidebar({ [key]: val });

  useEffect(() => {
    setSelectedSidebar({ name: "" });
  }, [notification]);

  return (
    <SidebarProfile>
      <SidebarProfile.Content
        title="Biodata Diri*"
        name="personal"
        icon="/images/Principle/Logo/Profile.svg"
        notification={notification && true}
        isSelected={selectedSidebar?.name === "personal"}
        handleClick={(val) => handleChangeSidebar("name", val)}
      />
      <SidebarProfile.Content
        title="Pengalaman Kerja"
        name="experiences"
        icon="/images/Principle/Logo/Suitcase.svg"
        notification={notification && true}
        isSelected={selectedSidebar?.name === "experiences"}
        handleClick={(val) => handleChangeSidebar("name", val)}
      />
      <SidebarProfile.Content
        title="Pendidikan*"
        name="educations"
        icon="/images/Principle/Logo/Graduation.svg"
        notification={notification && true}
        isSelected={selectedSidebar?.name === "educations"}
        handleClick={(val) => handleChangeSidebar("name", val)}
      />

      <SidebarProfile.Content
        title="Skills*"
        name="skills"
        icon="/images/Principle/Logo/Atom.svg"
        notification={notification && true}
        isSelected={selectedSidebar?.name === "skills"}
        handleClick={(val) => handleChangeSidebar("name", val)}
      />

      <SidebarProfile.Content
        title="CV*"
        name="cvs"
        icon="/images/Principle/Logo/Note.svg"
        notification={notification && true}
        isSelected={selectedSidebar?.name === "cvs"}
        handleClick={(val) => handleChangeSidebar("name", val)}
      />

      <SidebarProfile.Content
        disable={notification && true}
        title="Bahasa*"
        name="languages"
        icon="/images/Principle/Logo/Brain.svg"
        isSelected={selectedSidebar?.name === "languages"}
        handleClick={(val) => handleChangeSidebar("name", val)}
      />

      <SidebarProfile.Content
        disable={notification && true}
        title="Sertifikasi"
        name="certificates"
        icon="/images/Principle/Logo/Certificate.svg"
        isSelected={selectedSidebar?.name === "certificates"}
        handleClick={(val) => handleChangeSidebar("name", val)}
      />

      <SidebarProfile.Content
        disable={notification && true}
        title="Pengalaman Organisasi"
        name="organizations"
        icon="/images/Principle/Logo/Paper.svg"
        isSelected={selectedSidebar?.name === "organizations"}
        handleClick={(val) => handleChangeSidebar("name", val)}
      />

      <SidebarProfile.Content
        disable={notification && true}
        title="Profil Tambahan"
        name="additional"
        icon="/images/Principle/Logo/Bulb.svg"
        isSelected={selectedSidebar?.name === "additional"}
        handleClick={(val) => handleChangeSidebar("name", val)}
      />

      <Divider />

      <SidebarProfile.Content
        title="Pengaturan"
        name="setting"
        icon="/images/Principle/Logo/Setting.svg"
        isSelected={selectedSidebar?.name === "setting"}
      />
    </SidebarProfile>
  );
};

export const Profile = Template.bind({});

Profile.args = {
  notification: false,
};
