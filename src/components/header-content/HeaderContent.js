import React from 'react';

import { Image } from 'antd';

import contactsLogo from '../../images/contactsLogo.svg';
import './HeaderContent.css';

function HeaderContent() {
  return (
    <div>
      <div className="header-logo">
        <Image 
          src={contactsLogo} 
          alt="contacts app logo"
          preview={false}
        />
      </div>
      <div className="header-text">
        My Contacts App
      </div>
    </div>
  );
}

export default HeaderContent;