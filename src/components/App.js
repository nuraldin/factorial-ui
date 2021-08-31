import React, { useEffect, useState }  from 'react';

import { Image, Layout, Row, Col, Card, Tabs } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

import contactsLogo from '../images/contactsLogo.svg';
import Contact from '../models/Contact';

import 'antd/dist/antd.css'; 
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

  return (
    <div className="App">
      <Layout>
        <Header style={{ backgroundColor: '#7AC5CD'}}>
          <div className="logo">
            <Image 
              src={contactsLogo} 
              alt="contacts app logo"
              preview={false}
            />
          </div>
          <div style={{float: "left", textAlign: 'center', height: '100%', marginRight: '50px'}}>My Contacts App</div>
          <UserAddOutlined style={{fontSize:'100%'}}/>
        </Header>
        <Content className="App-content">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Contacts" key="1">
              <Row gutter={16} align={'middle'}>
                {contacts.map(contact => {
                  return <Col span={6}>
                    <Card 
                      title={`${contact.firstName} ${contact.lastName}`}
                    >
                      {`Email: ${contact.email} Phone: ${contact.phoneNumber}`}
                    </Card>
                  </Col>;
                })}
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
