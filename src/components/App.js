import React, { useState } from 'react';

import { Layout, Row, Tabs } from 'antd';
import 'antd/dist/antd.css'; 

import { createContact, updateContact, deleteContact } from '../requests';

import ContactCards from './contact-cards/ContactCards';
import ContactForm from './contact-fom/ContactForm';
import HeaderContent from './header-content/HeaderContent';
import ContactTimeline from './contact-timeline/ContactTimeline';

import './App.css';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="App">
      <Layout>
        <Header className="App-header">
          <HeaderContent />
        </Header>
        <Content className="App-content">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Contacts" key="1">
              <Row gutter={16} align="top" justify="space-around">
                <ContactCards 
                  onEdit={updateContact} 
                  onDelete={deleteContact}
                  triggerRefresh={refresh}
                />
                <ContactForm 
                  onSubmit={createContact}
                  postAction={() => setRefresh(!refresh) }
                />
              </Row>
            </TabPane>
            <TabPane tab="History" key="2">
              <ContactTimeline triggerRefresh={refresh}/>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
