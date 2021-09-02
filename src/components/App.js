import React, { useEffect, useState }  from 'react';

import { Layout, Row, Tabs } from 'antd';
import 'antd/dist/antd.css'; 

import Contact from '../models/Contact';

import ContactCards from './contact-cards/ContactCards';
import ContactForm from './contact-fom/ContactForm';
import HeaderContent from './header-content/HeaderContent';

import './App.css';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function App() {
  const [ contacts, setContacts ] = useState([]);
  
  useEffect(() => {
    let mounted = true;
    
    fetch('http://localhost:8000/contacts')
      .then(data => data.json())
      .then(contacts => {
        if(mounted) {
          console.log(contacts);
          let parsedContacts = contacts.map( contact => {
            return new Contact(contact);
          })
          console.log(parsedContacts);
          setContacts(parsedContacts);
        }
      });
    return () => mounted = false;
  }, []);

  const createContact = (values) => {
    fetch('https://localhost:8000/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  const deleteContact = (contactId) => {
    fetch(`https://localhost:8000/contacts/${contactId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    console.log(`Deleting contact.. ${contactId}`);
  };

  const updateContact = (contact = {}) => {
    console.log(`Updating contact.. ${contact.firstName}`);
  };

  return (
    <div className="App">
      <Layout>
        <Header style={{ backgroundColor: '#7AC5CD'}}>
          <HeaderContent />
        </Header>
        <Content className="App-content">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Contacts" key="1">
              <Row gutter={16} align="top" justify="space-around">
                <ContactCards 
                  dataSource={contacts} 
                  onEdit={updateContact} 
                  onDelete={deleteContact}
                />
                <ContactForm 
                  onSubmit={createContact}
                />
              </Row>
            </TabPane>
            <TabPane tab="History" key="2">
              Here goes the history
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
