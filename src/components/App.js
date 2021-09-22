import React, { useState } from 'react';

import { Layout, Tabs } from 'antd';
import 'antd/dist/antd.css'; 

import { updateContact, deleteContact } from '../requests';
import ContactCards from './contact-cards/ContactCards';
import HeaderContent from './header-content/HeaderContent';
import ContactTimeline from './contact-timeline/ContactTimeline';

import './App.css';

const { Header, Content } = Layout;
const { TabPane } = Tabs;

function App() {
  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="App">
      <Layout>
        <Header className="App-header">
          <HeaderContent onSubmit={toggleRefresh}/>
        </Header>
        <Content className="App-content">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Contact Ledger" key="1">
              <ContactCards 
                onEdit={updateContact} 
                onDelete={deleteContact}
                postAction={toggleRefresh}
                triggerRefresh={refresh}
              />
            </TabPane>
            <TabPane tab="Edit History" key="2">
              <ContactTimeline triggerRefresh={refresh}/>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
