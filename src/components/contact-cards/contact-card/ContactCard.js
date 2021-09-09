import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, Typography, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import './ContactCard.css';

function ContactCard(props) {
  const [ editToggle, setEditToggle ] = useState(false);
  const [ data, setData ] = useState({
    firstName: props.data.firstName || '',
    lastName: props.data.lastName || '',
    phoneNumber: props.data.phoneNumber || '',
    email: props.data.email || '',
  });
 
  const editOptions = ( field ) => ({
    onCancel: () => {
      console.log('Canceled edit...');
    },
    onEnd: () => {
      console.log('Finished edit...');
      setEditToggle(false);
    }
  });

  return (
    <Card 
      className='contact-card'
      title={
        <>
          <Typography.Text
            editable={ editToggle && editOptions() }
          >
            {`${data.firstName} ${data.lastName}`}
          </Typography.Text>
        </>
      }
      actions={[
          !editToggle ? 
            <Tooltip placement="bottom" title="Edit Contact">
              <EditOutlined 
                key="edit" 
                onClick={() => { setEditToggle(!editToggle); }}
                style={{color:'green'}}
              />
            </Tooltip>
          :
            <Tooltip placement="bottom" title="Confirm Edit">
              <CheckOutlined
                key="confirm"
                onClick={() => { 
                  props.onEdit(data);
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
                  props.onDelete(data.id)
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
            editable={ editToggle && editOptions() }
          >
            {data.email}
          </Typography.Text>
        </div>
        <div className='title card-text'>Phone:</div>
        <div className='card-text'>
          <Typography.Text
            editable={ editToggle && editOptions() }
          >
            {data.phoneNumber}
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