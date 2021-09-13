import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input, Button } from 'antd';

import './ContactForm.css';

function ContactForm(props) {
  return (
    <Form
      name="addContact"
      onFinish={(values) => {
        props.onSubmit(values);
        props.postAction();
      }}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input/>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  postAction: PropTypes.func
};

ContactForm.defaultProps = {
  onSubmit: () => { console.log(`Submit - to be implemented...`) },
  postAction: () => { console.log(`Callback for parent component to be implemented...`) }
}

export default ContactForm;