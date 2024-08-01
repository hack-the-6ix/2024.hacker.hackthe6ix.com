'use client';

import { CSSProperties, useState } from 'react';
import cn from 'classnames';
import { format, getHours, getMinutes, startOfToday } from 'date-fns';
import * as R from 'ramda';
import Button from '@/components/Button';
import Flex from '@/components/Flex';
import Text from '@/components/Text';
import styles from './client.module.scss';

export interface ScheduleConfig<T> {
  startHour?: number;
  endHour?: number;
  events: {
    category: T;
    label: string;
    location: string;
    start: number | string | Date;
    end: number | string | Date;
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
  (getHours(d) || (end ? 24 : 0)) * periodsPerHour +
  getMinutes(d) / (60 / periodsPerHour);

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
              {format(date, 'EEE. MMM d')}
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
          return (
            <div
              style={
                {
                  '--row': start,
                  '--overlap': overlap,
                  '--color': category['color'],
                  '--span': span,
                } as CSSProperties
              }
              className={styles.event}
              key={idx}
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
                    {format(event.start, 'h:mm aa')} -{' '}
                    {format(event.end, 'h:mm aa')}
                  </Text>
                  <Text textWeight="medium" textType="paragraph-sm">
                    @ {event.location}
                  </Text>
                </Flex>
              </Flex>
            </div>
          );
        })}
      </div>
    </Flex>
  );
}
