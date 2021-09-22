import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, Typography, Tooltip, Alert } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import Contact from '../../../models/Contact';

import './ContactCard.css';

function ContactCard(props) {
  const [ editToggle, setEditToggle ] = useState(false);
  const [ currentData, setCurrentData ] = useState(props.data);
  const [ previousData, setPreviousData ] = useState({});

  const [ wrongName, setWrongName ] = useState(false); 
  const [ wrongEmail, setWrongEmail ] = useState(false); 
  const [ wrongPhone, setWrongPhone ] = useState(false); 

  const toggle = ( fn ) => () => {
    setTimeout(() => {
      fn(false);
    }, 2000);
    fn(true) 
  } 

  const validPhone = /^[0-9]{9}$/;
  const validEmail = /^\w+\.?\w+@\w+(.com){1}$/;
  const validName = /^\w+ \w+$/;

  const validateAndSave = (value = '', validator = /.*/, failFn = () => {}, saveFn = () => {}) => {
    if ( !(validator.test(value)) ) failFn();
    else saveFn(value);
  };
 
  const editOptions = ( field ) => ({
    onChange: (value) => {
      switch(field) {
        case 'name':
          validateAndSave(value, validName, toggle(setWrongName), ( validatedValue ) => { 
            let [firstName, lastName] = validatedValue.split(' ');
            currentData.firstName = firstName;
            currentData.lastName = lastName;
            setCurrentData(new Contact({...currentData}))
          });
          break;
        case 'phone':
          validateAndSave(value, validPhone, toggle(setWrongPhone), (validatedValue) => {
            currentData.phoneNumber = validatedValue;
            setCurrentData(new Contact({...currentData}))
          });
          break;
        case 'email': 
          validateAndSave(value, validEmail, toggle(setWrongEmail), ( validatedValue ) => { 
            currentData.email = validatedValue;
            setCurrentData(new Contact({...currentData}))
          });
          break;
        default:
          break;
      }
    }
  });

  return (
    <Card 
      title={
        <div className='contact-title'>
          <Typography.Text
            editable={ editToggle && editOptions('name') }
          >
            {`${currentData.firstName} ${currentData.lastName}`}
          </Typography.Text>
          { 
            wrongName ? 
              <Alert 
                style={{}} 
                message="Name not valid" 
                type="error" 
                showIcon 
              /> : null
          }
        </div>
      }
      actions={[
          !editToggle ? 
            <Tooltip placement="bottom" title="Edit Contact">
              <EditOutlined 
                key="edit" 
                onClick={() => { 
                  setPreviousData(new Contact({...currentData}));
                  setEditToggle(!editToggle); 
                }}
                style={{color:'green'}}
              />
            </Tooltip>
          :
            <Tooltip placement="bottom" title="Confirm Edit">
              <CheckOutlined
                key="confirm"
                onClick={() => { 
                  console.log(currentData);
                  //props.onEdit(currentData);
                  props.postAction();
                  setEditToggle(false);
                }}
                style={{color:'green'}}
              />
            </Tooltip>
        ,
          !editToggle ?  
            <Tooltip placement="bottom" title="Delete Contact">
              <DeleteOutlined
                key="delete"
                onClick={() => { 
                  props.onDelete(currentData.id)
                  props.postAction();
                }}
                style={{color:'tomato'}}
              />
            </Tooltip>
          : 
            <Tooltip placement="bottom" title="Cancel Edit">
              <CloseOutlined
                key="cancel"
                onClick={() => {
                  setCurrentData(previousData);
                  setEditToggle(false);
                }}
                style={{color:'tomato'}}
              />
            </Tooltip>
      ]}
    >
      <div className='card-content'>
        <div className='title card-text'>Email:</div>
        <div className='card-text'>
          <Typography.Text
            editable={ editToggle && editOptions('email') }
          >
            {currentData.email}
          </Typography.Text>
          { 
            wrongEmail ? 
              <Alert 
                style={{}} 
                message="Email not valid" 
                type="error" 
                showIcon 
              /> : null
          }
        </div>
        <div className='title card-text'>Phone:</div>
        <div className='card-text'>
          <Typography.Text
            editable={ editToggle && editOptions('phone') }
          >
            {currentData.phoneNumber}
          </Typography.Text>
          { 
            wrongPhone ? 
              <Alert 
                style={{}} 
                message="Phone not valid" 
                type="error" 
                showIcon 
              /> : null
          }
        </div>
      </div>
    </Card>
  );
}

ContactCard.propTypes = {
  data: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  postAction: PropTypes.func,
};

ContactCard.defaultProps = {
  data: {},
  onEdit: () => { console.log(`Edit - to be implemented...`) },
  onDelete: () => { console.log(`Delete - to be implemented...`) },
  postAction: () => { console.log(`Post action to be implemented...`) }
}

export default ContactCard;