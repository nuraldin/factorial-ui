import React, { useEffect, useState }  from 'react';

import { Layout, Row, Tabs } from 'antd';
import 'antd/dist/antd.css'; 

import { createContact, updateContact, deleteContact, getContacts, getTimeline } from '../requests';

import ContactCards from './contact-cards/ContactCards';
import ContactForm from './contact-fom/ContactForm';
import HeaderContent from './header-content/HeaderContent';
import ContactTimeline from './contact-timeline/ContactTimeline';

import './App.css';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function App() {
  const [ contacts, setContacts ] = useState([]);
  const [ timeline, setTimeline ] = useState([]);
  
  useEffect(() => {
    let mounted = true;
    
    const fetchContacts = async () => {
      let contacts = await getContacts();
      setContacts(contacts);
    };

    const fetchTimeline = async () => {
      let timeline = await getTimeline();
      setTimeline(timeline);
    };

    if(mounted) { 
      fetchContacts();
      fetchTimeline();
    }

    return () => mounted = false;
  }, []);

  return (
    <div className="App">
      <Layout>
        <Header style={{ backgroundColor: '#7AC5CD', fontSize: '18px'}}>
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
              <ContactTimeline dataSource={timeline}/>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
