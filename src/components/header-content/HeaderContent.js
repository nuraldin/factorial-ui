import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Image, Button, Drawer, Tooltip } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import ContactForm from '../contact-fom/ContactForm';
import contactsLogo from '../../images/contactsLogo.svg';

import './HeaderContent.css';

function HeaderContent(props) {
  const [ visible, setVisible ] = useState(false);

  const showDrawer = () => setVisible(true);
  const onClose = () => { 
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
          onSubmit={() => {
            setVisible(false);
            props.onSubmit();
          }}
        />
      </Drawer>
    </div>
  );
}


ContactForm.propTypes = {
  onSubmit: PropTypes.func 
}

ContactForm.defaultProps = {
  onSubmit: () => console.log(`On submit to be implemented...`)
}

export default HeaderContent;