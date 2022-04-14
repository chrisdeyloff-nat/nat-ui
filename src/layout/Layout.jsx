import React from "react";
import Toast from 'features/notifications/Notification';

const Layout = (props) => {
  const { children } = props;

  return <>
    <Toast />
    {children}
  </>
}

export default Layout;
