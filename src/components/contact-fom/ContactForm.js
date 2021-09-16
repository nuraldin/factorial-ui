import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Button } from 'antd';

import { createContact } from '../../requests';

import './ContactForm.css';
import { EmailExistsError } from '../../errors';

function ContactForm(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    if ( !props.visible) {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  return (
    <Form
      form={form}
      name="addContact"
      onFinish={async (values) => {
        try {
          await createContact(values);
        } catch(e) {
          if ( e instanceof EmailExistsError ) {
            console.log('the email is already in use');
            return;
          } else {
            console.log('there was another error while creating the user');
            return;
          }
        }

        form.resetFields();
        props.onSubmit();
      }}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        hasFeedback
        rules={[{ pattern: /^(\w|ñ|é|ó|á|í|ú|ü)+$/, required: true, message: 'Please input your first name without spaces' }]}
      >
        <Input placeholder="e.g., Raton" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        hasFeedback
        rules={[{ pattern: /^(\w|ñ|é|ó|á|í|ú|ü)+$/, required: true, message: 'Please input your last name without spaces' }]}
      >
        <Input placeholder="e.g., Perez" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        hasFeedback
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Should be a valid email'}
        ]}
      >
        <Input placeholder="e.g., this@that.com"/>
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        hasFeedback
        rules={[
          { required: true, message: 'Please input your phone number.' },
          { pattern: /^[0-9]{9}$/, message: 'The phone number should conform to spanish standard'},
        ]}
      >
        <Input placeholder="e.g., 333444555"/>
      </Form.Item>
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