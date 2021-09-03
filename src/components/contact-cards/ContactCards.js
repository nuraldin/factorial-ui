import React from 'react';
import PropTypes from 'prop-types';

import { Col, Card } from 'antd';
import { UserOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import './ContactCards.css';

function ContactCards(props) {
  return (
    <>
      {props.dataSource.map(contact => {
        return <Col key={contact.email} span={props.cardSpan}>
          <Card 
            className='contact-card'
            title={
              <>
                <UserOutlined style={{marginRight: '10px'}} />
                {`${contact.firstName} ${contact.lastName}`}
              </>
            }
            actions={[
              <EditOutlined 
                key="edit" 
                onClick={props.onEdit}
                style={{color:'green'}}
              />,
              <DeleteOutlined
                key="delete"
                onClick={props.onDelete}
                style={{color:'tomato'}}
              />
            ]}
          >
            <div className='card-content'>
              <div className='title card-text'>Email:</div>
              <div className='card-text'>{contact.email}</div>
              <div className='title card-text'>Phone:</div>
              <div className='card-text'>{contact.phoneNumber}</div>
            </div>
          </Card>
        </Col>;
      })}
    </>
  );
}

ContactCards.propTypes = {
  dataSource: PropTypes.array,
  cardSpan: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

ContactCards.defaultProps = {
  dataSource: [],
  cardSpan: 6,
  onEdit: () => { console.log(`Edit - to be implemented...`) },
  onDelete: () => { console.log(`Delete - to be implemented...`) }
}

export default ContactCards;