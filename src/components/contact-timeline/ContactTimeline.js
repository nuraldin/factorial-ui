import React from 'react';
import PropTypes from 'prop-types';

import './ContactTimeline.css';
import { Timeline } from 'antd';

import RevisionTypes from '../../models/RevisionTypes';

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
  return (
    <Timeline mode={'left'}> 
      { props.dataSource.map( timelineItem => {
          return (
            <Timeline.Item 
              key={`${timelineItem.date}+${timelineItem.contact}`}
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
  dataSource: PropTypes.array
}

ContactTimeline.defaultProps = {
  dataSource: []
}

export default ContactTimeline;