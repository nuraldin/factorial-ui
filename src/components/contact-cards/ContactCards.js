import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Col } from 'antd';

import './ContactCards.css';
import ContactCard from './contact-card/ContactCard';
import { getContacts } from '../../requests';

function ContactCards(props) {
  const [ contacts, setContacts ] = useState([]);

  useEffect(() => {
    const asyncWait = ms => new Promise(resolve => setTimeout(resolve, ms))
    async function fetchData() {
      await asyncWait(100);
      let data = await getContacts();
      console.log(data);
      setContacts(data);
    }

    fetchData();
  }, [props.triggerRefresh]);

  return (
    <>
      {contacts.map(contact => {
        return <Col key={contact.email} span={props.cardSpan}>
          <ContactCard 
            data={contact} 
            onEdit={props.onEdit} 
            onDelete={props.onDelete} 
            postAction={props.postAction} 
          />
        </Col>;
      })}
    </>
  );
}

ContactCards.propTypes = {
  cardSpan: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  triggerRefresh: PropTypes.bool
};

ContactCards.defaultProps = {
  cardSpan: 6,
  onEdit: () => { console.log(`Edit - to be implemented...`) },
  onDelete: () => { console.log(`Delete - to be implemented...`) },
  triggerRefresh: false
}

export default ContactCards;