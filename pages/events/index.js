import React from "react";
import { useRouter } from "next/router";

import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";
import { getAllEvents } from "@/dummy-data";

const AllEventPage = () => {
  const allEvents = getAllEvents();
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };
  return (
    <React.Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </React.Fragment>
  );
};

export default AllEventPage;
