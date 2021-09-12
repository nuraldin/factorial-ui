import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './ContactTimeline.css';
import { Timeline } from 'antd';

import RevisionTypes from '../../models/RevisionTypes';
import { getTimeline } from '../../requests';

function itemColor(type) {
  switch(type) {
    case RevisionTypes.CREATED:
      return 'green';
    case RevisionTypes.UPDATED:
      return 'blue';
    case RevisionTypes.DELETED:
      return 'red';
    default:
      return 'grey';
  }
}

function ContactTimeline(props) {
  const [ timeline, setTimeline ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log('reading timeline...');
      let data = await getTimeline();
      console.log('setting timeline...');
      setTimeline(data);
    }

    fetchData();
  }, [props.triggerRefresh]);

  return (
    <Timeline mode={'left'}> 
      { timeline.map( timelineItem => {
          return (
            <Timeline.Item 
              key={`${timelineItem.date}+${timelineItem.contact}`}
              className="timeline-item"
              label={timelineItem.date.split('T').join(' ').slice(0, -5)}
              color={itemColor(timelineItem.event)}
            >
              {timelineItem.toString()}
            </Timeline.Item>
          );
      })}
    </Timeline>
  );
}

ContactTimeline.propTypes = {
  triggerRefresh: PropTypes.bool
}

ContactTimeline.defaultProps = {
  triggerRefresh: false
}

export default ContactTimeline;