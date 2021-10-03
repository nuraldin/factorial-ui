import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, Typography, Tooltip, Alert } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import { utils } from '../../../services';
import Contact from '../../../models/Contact';

import './ContactCard.css';

function ContactCard(props) {
  const [ editToggle, setEditToggle ] = useState(false);
  const [ edited, setEdited ] = useState(false);

  const [ currentData, setCurrentData ] = useState(props.data);
  const [ previousData, setPreviousData ] = useState({});

  const [ wrongName, setWrongName ] = useState(false); 
  const [ wrongEmail, setWrongEmail ] = useState(false); 
  const [ wrongPhone, setWrongPhone ] = useState(false);
  const [ successfulEdit, setSuccessfulEdit ] = useState(false); 

  const myAlert = ( text, type = "error" ) => <Alert message={text} type={type} showIcon />;
  
  const editableFields = { 
    name: {
      validator: utils.validators.NAME,
      onFail: utils.toggle(setWrongName),
      onSuccess:  ( value ) => { 
        let [firstName, lastName] = value.split(' ');
        currentData.firstName = firstName;
        currentData.lastName = lastName;
        setCurrentData(new Contact({...currentData}));
        setEdited(true);
      }
    }, 
    email: {
      validator: utils.validators.EMAIL,
      onFail: utils.toggle(setWrongEmail),
      onSuccess: ( value ) => { 
        currentData.email = value;
        setCurrentData(new Contact({...currentData}));
        setEdited(true);
      }
    },
    phone: {
      validator: utils.validators.PHONE,
      onFail: utils.toggle(setWrongPhone),
      onSuccess: (value) => {
        currentData.phoneNumber = value;
        setCurrentData(new Contact({...currentData}));
        setEdited(true);
      }
    }
  };

  const editOptions = ( field ) => ({
    onChange: (value) => utils.validateAndSave(value, editableFields[field])
  });

  const editOrConfirm = ( edit ) => {
    return <Tooltip 
        placement="bottom" 
        title={ edit ? "Confirm Edit" : "Edit Contact" }
      >
        { 
          edit ? <CheckOutlined
            key="confirm"
            onClick={() => {
              if ( edited ) { 
                props.onEdit(currentData);
                props.onConfirm();
                setEdited(false);
                utils.toggle(setSuccessfulEdit)();
              }
              setEditToggle(false);
            }}
            style={{color:'green'}}
          /> : <EditOutlined 
            key="edit" 
            onClick={() => { 
              setPreviousData(new Contact({...currentData}));
              setEditToggle(!editToggle); 
            }}
            style={{color:'green'}}
          />  
        }
      </Tooltip>;
  };

  const deleteOrCancel = ( edit ) => {
    return <Tooltip 
      placement="bottom" 
      title={ edit ? "Cancel Edit" : "Delete Contact" }
    >
      { 
        edit ? <CloseOutlined
          key="cancel"
          onClick={() => {
            setCurrentData(previousData);
            if ( edited ) setEdited(false);
          }}
          style={{color:'tomato'}}
        /> : <DeleteOutlined
          key="delete"
          onClick={() => { 
            props.onDelete(currentData.id);
            props.onConfirm();
          }}
          style={{color:'tomato'}}
        />
      }
    </Tooltip>; 
  };

  const cardActions = ( toggle ) => {
    return [
      editOrConfirm(toggle),
      deleteOrCancel(toggle)
    ];
  };

  return (
    <Card 
      title={
        <div className='contact-title'>
          <Typography.Text editable={ editToggle && editOptions('name') }>
            {`${currentData.firstName} ${currentData.lastName}`}
          </Typography.Text>
          { wrongName ? myAlert("Name not valid") : null }
        </div>
      }
      actions={cardActions(editToggle)}
    >
      <div className='card-content'>
        <div className='title card-text'>Email:</div>
        <div className='card-text'>
          <Typography.Text editable={ editToggle && editOptions('email') }>
            {currentData.email}
          </Typography.Text>
          { wrongEmail ? myAlert("Email not valid") : null }
        </div>
        <div className='title card-text'>Phone:</div>
        <div className='card-text'>
          <Typography.Text editable={ editToggle && editOptions('phone') }>
            {currentData.phoneNumber}
          </Typography.Text>
          { wrongPhone ? myAlert("Phone not valid") : null }
        </div>
        { successfulEdit ? myAlert("Changes saved successfully", "success") : null}
      </div>
    </Card>
  );
}

ContactCard.propTypes = {
  data: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onConfirm: PropTypes.func,
};

ContactCard.defaultProps = {
  data: {},
  onEdit: () => { console.log(`Edit - to be implemented...`) },
  onDelete: () => { console.log(`Delete - to be implemented...`) },
  onConfirm: () => { console.log(`Confirm - to be implemented...`) }
}

export default ContactCard;