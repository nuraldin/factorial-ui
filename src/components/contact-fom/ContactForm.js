import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Button, Alert } from 'antd';

import { createContact } from '../../services/contact-api/index.js';
import { EmailExistsError } from '../../models/index.js';
import { toggle, validators } from '../../utils.js';

function ContactForm(props) {
  const [form] = Form.useForm();
  const [emailExists, setEmailExists] = useState(false);
  
  const defaultRule = (field) => ({
    required: true,
    message: `Please input your ${field}`
  }); 
  
  const wordRule = (name) => ({
    pattern: validators.WORD,
    ...defaultRule(`${name} name without spaces`)
  });

  const items = [
    { 
      label: "First Name",
      name: "firstName",
      rules: [wordRule('first')],
      placeholder: "e.g., Raton"
    },
    { 
      label: "Last Name",
      name: "lastName",
      rules: [wordRule('last')],
      placeholder: "e.g., Perez"
    },
    { 
      label: "Email",
      name: "email",
      rules: [defaultRule('email'), { 
        type: 'email', 
        message: 'Should be a valid email'
      }],
      placeholder: "e.g., raton@perez.com"
    },
    { 
      label: "Phone Number",
      name: "phoneNumber",
      rules: [defaultRule('phone number'), { 
        pattern: validators.PHONE, 
        message: 'The phone number should conform to spanish standard'
      }],
      placeholder: "e.g., 111222333"
    }
  ];

  const postContact = async (values) => {
    try {
      await createContact(values);
    } catch(e) {
      if ( e instanceof EmailExistsError ) toggle(setEmailExists);
      else console.log('there was another error while creating the user');
      return;
    }

    form.resetFields();
    props.onSubmit();
  };
  
  useEffect(() => {
    if ( !props.visible ) {
      form.resetFields();
      setEmailExists(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  return (
    <Form
      form={form}
      name="addContact"
      onFinish={ postContact }
    >
      {items.map( (item, index) => 
        <Form.Item key={index} label={item.label} name={item.name} rules={item.rules} hasFeedback>
          <Input placeholder={item.placeholder}/>
        </Form.Item>)}
      { emailExists ? <Alert style={{marginBottom: '10px' }} message="Email already exists" type="error" showIcon/>: null}
      <Form.Item style={{ float: 'right'}}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

ContactForm.propTypes = {
  visible: PropTypes.bool,
  onSubmit: PropTypes.func,
};

ContactForm.defaultProps = {
  visible: false,
  onSubmit: () => { console.log(`Submit - to be implemented...`) },
}

export default ContactForm;