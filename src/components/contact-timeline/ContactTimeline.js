import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Timeline, Empty } from 'antd';

import RevisionTypes from '../../models/RevisionTypes';
import { api, utils } from '../../services';

import './ContactTimeline.css';

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

  useEffect(() => utils.pipe( api.getTimeline, setTimeline)(), [props.refresh]);

  if ( timeline.length > 0 ) {
    return (
      <Timeline mode={'left'}> 
        { timeline.map( ( timelineItem, index ) => {
            return (
              <Timeline.Item 
                key={`${index}+${timelineItem.contact}`}
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
  } else return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<div>No Timeline</div>}/>;
}

ContactTimeline.propTypes = {
  refresh: PropTypes.bool
}

ContactTimeline.defaultProps = {
  refresh: false
}

export default ContactTimeline;