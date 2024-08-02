'use client';

import { CSSProperties, Fragment, useState } from 'react';
import cn from 'classnames';
import { getHours, getMinutes, startOfToday, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import * as R from 'ramda';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Icon from '@/components/Icon';
import IconButton from '@/components/IconButton';
import Text from '@/components/Text';
import styles from './client.module.scss';

export interface ScheduleConfig<T> {
  startHour?: number;
  endHour?: number;
  events: {
    category: T;
    label: string;
    location?: string;
    description?: string;
    start: number | string | Date;
    end: number | string | Date;
    id: string;
  }[];
}

export interface CategoryConfig {
  name: string;
  color: string;
}

export interface ScheduleProps<T extends string> {
  categories: Record<T, CategoryConfig>;
  config: Record<string, ScheduleConfig<T>>;
  periodsPerHour?: number;
  initialDate?: string;
}

const getRow = (
  d: string | number | Date,
  periodsPerHour: number,
  end?: boolean,
) =>
  (getHours(toZonedTime(d, 'utc')) || (end ? 24 : 0)) * periodsPerHour +
  getMinutes(toZonedTime(d, 'utc')) / (60 / periodsPerHour);

export function getEventPlacement<T>(
  event: ScheduleConfig<T>['events'][number],
  periodsPerHour: number,
  offset: number,
) {
  const start = getRow(event.start, periodsPerHour);
  const end = getRow(event.end, periodsPerHour, true);
  const span = end - start;

  return {
    start: start + 1 - offset,
    end: end + 1 - offset,
    span,
  };
}

export function Schedule<T extends string>({
  periodsPerHour = 4,
  categories,
  config,
  initialDate,
}: ScheduleProps<T>) {
  const dates = R.sort(R.ascend(R.identity), R.keys(config));
  const [selected, setSelected] = useState(() => {
    if (initialDate && dates.includes(initialDate)) return initialDate;
    return dates[0];
  });
  const selectedConfig = config[selected];
  const hours = R.range(
    selectedConfig?.startHour ?? 0,
    selectedConfig?.endHour ?? 24,
  );
  const offset = hours[0] * periodsPerHour;
  const overlapMap = selectedConfig?.events.reduce(
    (acc, event) => {
      const { start, span } = getEventPlacement(event, periodsPerHour, offset);
      R.range(start, start + span).forEach((idx) => (acc[idx] = acc[idx] + 1));
      return acc;
    },
    new Array(25 * periodsPerHour).fill(0),
  );

  return (
    <Flex className={styles.container} direction="column" gap="2x-big">
      <Flex className={styles.tabs}>
        {dates.map((date) => {
          const isActive = date === selected;
          return (
            <Button
              className={cn(isActive && styles.active, styles.tab)}
              onClick={() => setSelected(date)}
              buttonColor={isActive ? 'warning' : 'secondary'}
              suppressHydrationWarning
              buttonType="tertiary"
              key={date}
            >
              {format(`${date} 12:01 AM`, 'EEE. MMM d')}
            </Button>
          );
        })}
      </Flex>
      <div
        style={
          {
            '--periods': periodsPerHour,
            '--rows': hours.length,
          } as CSSProperties
        }
        className={styles.grid}
      >
        {hours.map((hour, idx) => (
          <Text
            style={{ '--row': idx } as CSSProperties}
            suppressHydrationWarning
            textColor="secondary-700"
            className={styles.hour}
            textWeight="semi-bold"
            textType="label"
            key={hour}
          >
            {format(startOfToday().setHours(hour), 'h:mm aa')}
          </Text>
        ))}
        {selectedConfig?.events.map((event, idx) => {
          const category = categories[event.category];
          const { start, span } = getEventPlacement(
            event,
            periodsPerHour,
            offset,
          );
          const overlap = Math.max(...overlapMap.slice(start, start + span));
          const timeframe = `${format(toZonedTime(event.start, 'utc'), 'h:mm aa')} - ${format(toZonedTime(event.end, 'utc'), 'h:mm aa')}`;
          return (
            <Fragment key={idx}>
              <button
                style={
                  {
                    '--row': start,
                    '--overlap': overlap,
                    '--color': category['color'],
                    '--span': span,
                  } as CSSProperties
                }
                suppressHydrationWarning
                className={styles.event}
                popovertarget={event.id}
              >
                <Flex className={styles.content} direction="column" gap="2x-sm">
                  <Text textWeight="bold" textType="paragraph-sm" as="h2">
                    {event.label}
                  </Text>
                  <Flex gap="2x-sm" wrap>
                    <Text
                      textWeight="medium"
                      textType="paragraph-sm"
                      suppressHydrationWarning
                    >
                      {timeframe}
                    </Text>
                    <Text textWeight="medium" textType="paragraph-sm">
                      {event.location && '@ '}
                      {event.location}
                    </Text>
                  </Flex>
                </Flex>
              </button>
              <Flex
                style={
                  {
                    '--color': category['color'],
                  } as CSSProperties
                }
                className={styles.popup}
                gap="2x-big"
                direction="column"
                id={event.id}
                popover="auto"
              >
                <Flex justify="space-between">
                  <Text
                    textType="subtitle-sm"
                    textWeight="bold"
                    textColor="primary-800"
                    className={styles.heading}
                    as="h2"
                  >
                    {event.label}
                  </Text>
                  <IconButton
                    buttonType="tertiary"
                    icon="close"
                    popovertarget={event.id}
                    popovertargetaction="hide"
                  />
                </Flex>
                <Flex gap="m" direction="column">
                  {[
                    [
                      'schedule',
                      `${format(`${selected} 12:01 AM`, 'EEE. MMM d')} @ ${timeframe}`,
                    ],
                    event.location ? ['location_on', event.location] : [],
                    event.description ? ['description', event.description] : [],
                  ]
                    .filter((i) => !!i.length)
                    .map(([icon, content], idx) => (
                      <Flex className={styles.line} gap="x-sm" key={idx} as="p">
                        <Icon
                          className={styles.icon}
                          color="primary-800"
                          icon={icon}
                        />
                        <Text
                          className={styles.description}
                          textWeight="medium"
                          textColor="primary-800"
                        >
                          {content}
                        </Text>
                      </Flex>
                    ))}
                </Flex>
              </Flex>
            </Fragment>
          );
        })}
      </div>
    </Flex>
  );
}
