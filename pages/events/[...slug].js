import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
// import { getFilteredEvents } from "@/dummy-data";

import Head from "next/head";

import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";
import { getFilteredEvents } from "@/helpers/api-utils";

const FilteredEvent = (props) => {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  // ------- For client side data fetching -------
  const filterData = router.query.slug;

  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR(
    "https://next-events-project-7a2ba-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  console.log(data, "pageData");

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  let PageHeadData = (
    <Head>
      <title>Filtered Event </title>
      <meta name="description" content={`A List of filtered events.`} />
    </Head>
  );

  // -----------------End-----------------

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // ------- For client side data fetching -------
  if (!loadedEvents) {
    return (
      <React.Fragment>
        {PageHeadData}
        <p className="center">Loading...</p>
      </React.Fragment>
    );
  }

  const year = filterData[0];
  const month = filterData[1];

  const numYear = +year;
  const numMonth = +month;

  PageHeadData = (
    <Head>
      <title>Filtered Event </title>
      <meta
        name="description"
        content={`All Events for ${numMonth}/${numYear}.`}
      />
    </Head>
  );

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });
  // -----------------End-----------------

  // if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
  // if (props.hasError == true) {  ------> For getServerSideProps
  // isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12 ----> For client side fetching

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return (
      <React.Fragment>
        {PageHeadData}
        <ErrorAlert>Invalid Filter</ErrorAlert>
        <div
          className="center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button link="/events">Show All Events</Button>
        </div>
      </React.Fragment>
    );
  }

  // const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  // const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <React.Fragment>
        {PageHeadData}
        <ErrorAlert>No events found for choosen filter</ErrorAlert>
        <div
          className="center"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button link="/events">Show All Events</Button>
        </div>
      </React.Fragment>
    );
  }

  // const date = new Date(numYear, numMonth - 1); ----> For client side
  // const date = new Date(props.date.year, props.date.month - 1); ---> For server side
  const date = new Date(numYear, numMonth - 1);

  return (
    <div>
      {PageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
};

// -------- If using client side data fetching than we don't need to use serverSide generation
// -------- because getServerSideProps is re-executed for every request.

// If we need to look into request headers and req-res object than we can use getServerSideProps

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const year = filterData[0];
//   const month = filterData[1];

//   const numYear = +year;
//   const numMonth = +month;

//   if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
//     return {
//       // notFound: true,
//       // redirects to a error page if page is not found, and we have a page to show error
//       // redirect : {
//       //   destination : "/error-page"
//       // }

//       // ---we can also use other ways to show error page when page is not found
//       // return props object and handle hasError in component
//       props: {
//         hasError: true,
//       },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEvent;
