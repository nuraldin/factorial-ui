import React, { useEffect, useState }  from 'react';

import { Layout, Row, Tabs } from 'antd';
import 'antd/dist/antd.css'; 

import { createContact, updateContact, deleteContact, getContacts } from '../requests';

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
    
    const fetchContacts = async () => {
      let contacts = await getContacts();
      setContacts(contacts);
    }

    if(mounted) fetchContacts();

    return () => mounted = false;
  }, []);

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
