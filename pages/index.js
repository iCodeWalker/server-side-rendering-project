import React from "react";

import Head from "next/head";
import Link from "next/link";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "@/components/events/event-list";

// Meta data is used to enhance user experience to some extent i.e.  can show title in the tab.

// and also for crucial for serach engines because search engine crawlers like google crawlers,
// will have a look at the title and the description set in the metadata tag.

// We can use this Head component by next.js to add head meta data.
// Now we can add typical head section html elements between those Head tags
// and next.js will inject them into the head section of the page

export default function HomePage(props) {
  return (
    <>
      <Head>
        <title>NextJs Events</title>
        <meta
          name="description"
          content="Find a lot of events that allow you to evolve"
        />
      </Head>
      <EventList items={props.events} />
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
      revalidate: 1800, // for every half and hour we regenerate this page for a new upcoming request
    },
  };
}
