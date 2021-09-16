import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'antd';

import ContactCard from './contact-card/ContactCard';
import { getContacts } from '../../requests';

import './ContactCards.css';

const ANTD_SECTIONS = 24;

function ContactCards(props) {
  const [ contactView, setContactView ] = useState([]);
  const contactsPerRow = 4;  
  const cardSpan = Math.floor( ANTD_SECTIONS  / contactsPerRow );

  useEffect(() => {
    const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms))
    async function fetchData() {
      await asyncWait(100);
      let contacts = await getContacts();
      
      if ( contacts.length > 0 ) {
        let contactRows = [];
        do {
          let currentRow = contacts.splice(0, contactsPerRow);
          contactRows.push(currentRow);
        } while ( contacts.length > 0 );
        setContactView(contactRows);
      }
    }

    fetchData();
  }, [props.triggerRefresh]);
  
  return (
    <> 
      {contactView.map( (contactRow, index) => { 
        console.log(contactRow);
        return <Row key={index} gutter={6} justify="space-around" style={{marginTop: '16px' }}>
          {contactRow.map((contact) => {
            return <Col key={contact.email} span={cardSpan}>
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