import React from 'react';
import ModalDarkBackground from '../../../../components/Layout/BackgroundOverlay/Modal-Dark';

export default {
  component: ModalDarkBackground,
  title: 'Design System/Atom/BackgroundOverlay',
  argTypes: {
  }
};

const Template = (args) => {
  return (
    <div style={{ height: '640px', width: '360px' }}>
        <ModalDarkBackground {...args}>
            <div style={{ height: '567px', width: '360px' }}>
            </div>
        </ModalDarkBackground>
    </div>
  )
};

export const ModalDark = Template.bind({});

ModalDark.args = {
};
