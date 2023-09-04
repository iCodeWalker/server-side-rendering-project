import React from "react";
import { useRouter } from "next/router";
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../../helpers/api-utils";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";
import Button from "@/components/ui/button";

const EventDetailPage = (props) => {
  // const router = useRouter();

  // const eventId = router.query.eventId;

  // const event = getEventById(eventId);

  const event = props.selectedEvent;

  if (!event) {
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

  return (
    <React.Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </React.Fragment>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
      revalidate: 30, // re-generates on incoming request after 30 sec.
    },
  };
}

// For which parameter values or for which eventId's next.js should pre-render the page

// And for which id's it should cal  getStaticProps function and the component function

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  // const events = await getAllEvents();
  // now since we are using only featured events, for some events
  // page will not be pre-generated.

  // for fallback : false, For some events now we will get 404 error as they are now pre-generated,
  // as we have defined fallback to false so only events'id we have in paths will have data.

  // to overcome this :

  // we have to set fallback to true. telling next.js that there are more pages, than ones we have prepared

  // Then it will dynamically try to generate the page if it encounters a page that is not pre-generated

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    // fallback: false,
    fallback: true,
  };
}

export default EventDetailPage;
