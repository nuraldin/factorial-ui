import React, {useState} from 'react';

import { Image, Button, Drawer, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
      <Button 
        className='header-button'
        type="primary" 
        onClick={showDrawer} 
        icon={<PlusOutlined />}
      >
        New contact
      </Button>
      <Drawer
        title="Create a new account"
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <ContactForm 
          /* onSubmit={createContact}
          postAction={() => { 
            console.log('performing set refresh', refresh, !refresh);
            setRefresh(!refresh);
          }}
          */
        />
      </Drawer>
    </div>
  );
}

export default HeaderContent;