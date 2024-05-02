import React from 'react';
import PasswordChange from './PasswordChange';
import ProfileSidebar from './ProfileSidebar';
import AccountSetting from './AccountSetting';

function Profile() {
  return (
    <main className="main">
      <div className="user-view">
        <ProfileSidebar />
        <div className="user-view__content">
          <AccountSetting />
          <div className="line">&nbsp;</div>
          <PasswordChange />
        </div>
      </div>
    </main>
  );
}

export default Profile;
