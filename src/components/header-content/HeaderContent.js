import React, {useState} from 'react';

import { Image, Button, Drawer, Tooltip } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import ContactForm from '../contact-fom/ContactForm';
import contactsLogo from '../../images/contactsLogo.svg';
import './HeaderContent.css';

function HeaderContent() {
  const [ visible, setVisible ] = useState(false);

  const showDrawer = () => setVisible(true);
  const onClose = () => { 
    console.log('Called on close...');
    setVisible(false);
  }

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
      <div className='header-button'>
        <Tooltip placement="bottom" title="Create a new contact">
          <Button 
            type="primary" 
            onClick={showDrawer} 
            icon={<UserAddOutlined />}
          >
            New contact
          </Button>
        </Tooltip>
      </div>
      <Drawer
        title="Create a new contact"
        onClose={onClose}
        visible={visible}
        width={"400px"}
      >
        <ContactForm 
          visible={visible}
          postAction={() => { 
            console.log('performing set refresh', refresh, !refresh);
            setRefresh(!refresh);
          }}
        />
      </Drawer>
    </div>
  );
}

export default HeaderContent;