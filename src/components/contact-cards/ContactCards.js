import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import ContactCard from './contact-card/ContactCard';
import { getContacts } from '../../requests';

import './ContactCards.css';

const ANTD_SECTIONS = 24;

function ContactCards(props) {
  const [ contacts, setContacts ] = useState([]);
  const [ contactView, setContactView ] = useState([]);
  const contactsPerRow = 4;  
  const cardSpan = Math.floor(ANTD_SECTIONS / contactsPerRow);

  useEffect(() => {
    console.log("Refreshing contacts...");
    const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms))
    async function fetchData() {
      await asyncWait(100);
      console.log('Fetching contacts..');
      let data = await getContacts();
      setContacts(data);
    }

    fetchData();
  }, [props.triggerRefresh]);

  useEffect(() => {
    if ( contacts.length > 0 ) {
      console.log("Refreshing contact view...");
      const contactRows = [];
      let currentRow = [];
      let contactsCopy = [...contacts];
      do {
        let currentRow = contactsCopy.splice(0, contactsPerRow);
        contactRows.push(currentRow);
      } while ( currentRow.length > 0 );
      setContactView(contactRows);
    }
  }, [contacts]);
  
  return (
    <> 
      {contactView.map( (contactRow, index) => { 
        return <Row key={index} gutter={16} align="top" justify="space-around">
          {contactRow.map((contact, index) => {
            return <Col key={index} span={cardSpan}>
              <ContactCard 
                data={contact} 
                onEdit={props.onEdit} 
                onDelete={props.onDelete} 
                postAction={props.postAction} 
              />
            </Col>;
          })}
        </Row>;
      })}
    </>
  );
}

ContactCards.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  triggerRefresh: PropTypes.bool
};

ContactCards.defaultProps = {
  onEdit: () => { console.log(`Edit - to be implemented...`) },
  onDelete: () => { console.log(`Delete - to be implemented...`) },
  triggerRefresh: false
}

export default ContactCards;