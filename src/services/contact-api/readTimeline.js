import { TimelineItem } from "../../models";
import fetchWrapper from "../fetch";

const getTimeline = async () => {
  let [data, _] = await fetchWrapper('/history');
  return data.payload.map( timeline => new TimelineItem(timeline));
};

export default getTimeline;