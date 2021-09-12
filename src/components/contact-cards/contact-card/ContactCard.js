import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, Typography, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import './ContactCard.css';
import Contact from '../../../models/Contact';

function ContactCard(props) {
  const [ editToggle, setEditToggle ] = useState(false);
  const [ currentData, setCurrentData ] = useState(props.data);

  const [ previousData, setPreviousData ] = useState({});
 
  const editOptions = ( field ) => ({
    onChange: (value) => {
      switch(field) {
        case 'name':
          console.log('Name edited...');
          let [firstName, lastName] = value.split(' ');
          setCurrentData({
            ...currentData,
            firstName,
            lastName
          });
          break;
        case 'phone':
          console.log('Phone edited...');
          setCurrentData({
            ...currentData,
            phoneNumber: value
          }); 
          break;
        case 'email': 
          console.log('Email edited...');
          setCurrentData({
            ...currentData,
            email: value
          });  
          break;
        default:
          break;
      }
    }
  });

  return (
    <Card 
      className='contact-card'
      title={
        <>
          <Typography.Text
            editable={ editToggle && editOptions('name') }
          >
            {`${currentData.firstName} ${currentData.lastName}`}
          </Typography.Text>
        </>
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
                  props.onEdit(currentData);
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
        </div>
        <div className='title card-text'>Phone:</div>
        <div className='card-text'>
          <Typography.Text
            editable={ editToggle && editOptions('phone') }
          >
            {currentData.phoneNumber}
          </Typography.Text>
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