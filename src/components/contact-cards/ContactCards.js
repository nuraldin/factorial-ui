import React from 'react';
import PropTypes from 'prop-types';

import { Col } from 'antd';

import './ContactCards.css';
import ContactCard from './contact-card/ContactCard';

function ContactCards(props) {
  return (
    <>
      {props.dataSource.map(contact => {
        return <Col key={contact.email} span={props.cardSpan}>
          <ContactCard data={contact} onEdit={props.onEdit} onDelete={props.onDelete} postAction={props.postAction}/>
        </Col>;
      })}
    </>
  );
}

ContactCards.propTypes = {
  dataSource: PropTypes.array,
  cardSpan: PropTypes.number,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  postAction: PropTypes.func
};

ContactCards.defaultProps = {
  dataSource: [],
  cardSpan: 6,
  onEdit: () => { console.log(`Edit - to be implemented...`) },
  onDelete: () => { console.log(`Delete - to be implemented...`) },
  postAction: () => { console.log(`Post action to be implemented...`) }
}

export default ContactCards;