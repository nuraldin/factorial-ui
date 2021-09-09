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
  const [ data, setData ] = useState({});
  const [ update, setUpdate ] = useState(false);

  useEffect(() => {
    const syncWait = ms => {
      const end = Date.now() + ms
      while (Date.now() < end) continue
    }

    async function fetchData() {
      syncWait(1);
      let contacts = await getContacts();
      console.log(contacts);
      let timeline = await getTimeline();
      console.log(timeline);
      setData({
        contacts,
        timeline
      });
    }

    fetchData();
  }, [update]);

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
                  dataSource={data.contacts} 
                  onEdit={updateContact} 
                  onDelete={deleteContact}
                  postAction={() => setUpdate(!update) }
                />
                <ContactForm 
                  onSubmit={createContact}
                  postAction={() => setUpdate(!update) }
                />
              </Row>
            </TabPane>
            <TabPane tab="History" key="2">
              <ContactTimeline dataSource={data.timeline}/>
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
}

export default App;
