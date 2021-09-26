import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Empty } from 'antd';

import ContactCard from './contact-card/ContactCard';
import { getContacts } from '../../services/contact-api/index.js';
import { delay, pipe } from '../../utils';

import './ContactCards.css';

function ContactCards(props) {
  const [ contactView, setContactView ] = useState([]);
  
  const ANTD_SECTIONS = 24;
  const contactsPerRow = 4;  
  const cardSpan = Math.floor( ANTD_SECTIONS  / contactsPerRow );

  const makeContactView = (contacts) => {  
    let contactRows = [];

    while( contacts.length > 0 ) { 
      contactRows.push(contacts.splice(0, contactsPerRow));
    }

    return contactRows ;
  }; 

  useEffect(() => pipe(delay, getContacts, makeContactView, setContactView)(200), [props.refresh]);

  if ( contactView.length > 0 ) { 
    return (
      <> 
        {contactView.map( (contactRow, index) => { 
          return <Row key={index} gutter={6} justify="space-around" style={{marginTop: '16px' }}>
            {contactRow.map((contact) => {
              return <Col key={contact.email} span={cardSpan}>
                <ContactCard 
                  data={contact} 
                  onEdit={props.onEdit} 
                  onDelete={props.onDelete} 
                  onConfirm={props.onConfirm} 
                />
              </Col>;
            })}
          </Row>;
        })}
      </>
    );
  } else return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<div>No Contacts</div>}/>;
}

ContactCards.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onConfirm: PropTypes.func,
  refresh: PropTypes.bool
};

ContactCards.defaultProps = {
  onEdit: () => { console.log(`Edit - to be implemented...`) },
  onDelete: () => { console.log(`Delete - to be implemented...`) },
  onConfirm: () => { console.log(`onConfirm - to be implemented...`) },
  refresh: false
}

export default ContactCards;