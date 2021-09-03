class TimelineItem {
  constructor(obj) {
    this.date = obj.date;
    this.event = obj.event;
    this.contact = obj.contact;
  }

  toString() {
    return `${this.contact} was ${this.event}`;
  }
}

export default TimelineItem;