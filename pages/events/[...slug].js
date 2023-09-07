import React from "react";
import { useRouter } from "next/router";
// import { getFilteredEvents } from "@/dummy-data";

import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";
import { getFilteredEvents } from "@/helpers/api-utils";

const FilteredEvent = (props) => {
  const router = useRouter();

  // const filterData = router.query.slug;

  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const year = filterData[0];
  // const month = filterData[1];

  // const numYear = +year;
  // const numMonth = +month;

  // if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
  if (props.hasError == true) {
    return (
      <React.Fragment>
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
  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <React.Fragment>
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

  // const date = new Date(numYear, numMonth - 1);
  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const year = filterData[0];
  const month = filterData[1];

  const numYear = +year;
  const numMonth = +month;

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return {
      // notFound: true,
      // redirects to a error page if page is not found, and we have a page to show error
      // redirect : {
      //   destination : "/error-page"
      // }

      // ---we can also use other ways to show error page when page is not found
      // return props object and handle hasError in component
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
export default FilteredEvent;
