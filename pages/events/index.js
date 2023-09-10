import React from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import EventList from "@/components/events/event-list";
import EventSearch from "@/components/events/event-search";
import { getAllEvents } from "@/helpers/api-utils";
// import { getAllEvents } from "@/dummy-data";

const AllEventPage = (props) => {
  // const allEvents = getAllEvents();
  const router = useRouter();

  const { events } = props;

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <React.Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of events that allow you to evolve"
        />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </React.Fragment>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventPage;
