import { getHours, getMinutes } from 'date-fns';
import * as R from 'ramda';
import { fetchAirtableResults } from '@/api';
import { Airtable } from '@/api.d';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import { Schedule } from './client';
import styles from './page.module.scss';

async function SchedulePage() {
  const events = await fetchAirtableResults<Airtable.Records<Airtable.Event>>(
    'applWmO0jkQTXKExd',
    'tblvJHMV80nHkaHdV',
    new URLSearchParams({
      'sort[0][field]': 'Date',
      'sort[0][direction]': 'asc',
    }),
  );

  const eventsByDate = R.groupBy((event) => event.fields.Date, events.records);

  return (
    <Flex className={styles.container} direction="column" gap="lg">
      <Flex direction="column" gap="2x-sm">
        <Text
          textColor="secondary-700"
          textType="heading-sm"
          textWeight="bold"
          as="h1"
        >
          Event Schedule
        </Text>
        <Text
          textColor="secondary-500"
          textType="paragraph-sm"
          textWeight="medium"
        >
          Click on each block for more details about each workshop and event.
        </Text>
      </Flex>
      <Schedule
        categories={{
          Events: {
            name: 'Events',
            color: '#2A7892',
          },
          Food: {
            name: 'Food',
            color: '#08566B',
          },
          Activities: {
            name: 'Activities',
            color: '#EE7320',
          },
          Ceremonies: {
            name: 'Ceremonies',
            color: '#AAADC4',
          },
          Workshops: {
            name: 'Workshops',
            color: '#00AC6B',
          },
        }}
        config={R.map((day = []) => {
          const startHour = Math.min(
            ...day.map((i) => getHours(i.fields.Start)),
          );
          const endHour = Math.max(
            ...day.map(
              (i) =>
                (getHours(i.fields.End) || 24) +
                (getMinutes(i.fields.End) ? 1 : 0),
            ),
          );
          return {
            startHour: Math.max(0, startHour),
            endHour: Math.min(24, endHour),
            events: R.map(
              (event) => ({
                category: event.fields.Type,
                label: event.fields.Name,
                location: event.fields.Location,
                start: event.fields.Start,
                end: event.fields.End,
              }),
              day,
            ),
          };
        }, eventsByDate)}
      />
    </Flex>
  );
}

export default SchedulePage;
