import { useEffect, useState } from "react";
import EventService from "../services/EventService";
import {
  NewDefaultPages,
  Pages,
  ResponsePageData,
} from "../models/ResponsePageData";
import EventModel from "../models/EventModel";
import { Button } from "antd";
import EventTable from "../components/EventTable";

const Event = () => {
  const [events, setEvents] = useState(Array<EventModel>);
  const [pages, setPages] = useState<Pages>({} as Pages);
  const getList = (reload: boolean) => {
    EventService.GetList()
      .then((res: ResponsePageData<EventModel>) => {
        // console.log(res);
        if (reload) {
          setEvents(res.data);
        } else {
          setEvents(events.concat(res.data));
        }
        setPages(res.pages);
      })
      .catch((e: any) => e);
  };
  useEffect(() => {
    getList(false);
  }, []);
  return (
    <>
      <div>Events</div>
      <div>
        <EventTable
          key="eventTable"
          data={events}
          pages={pages}
          reload={() => {
            getList(true);
          }}
        ></EventTable>
      </div>
    </>
  );
};
export default Event;
