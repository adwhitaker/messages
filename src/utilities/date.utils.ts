import * as moment from 'moment-timezone';

export const constants = {
  afternoonStartTime: 12,
  eveningStartTime: 17,
  formatHour: 'HH',
  formatLongWithTime: 'LLL'
};

const greetings = {
  morningGreeting: 'Good morning',
  afternoonGreeting: 'Good afternoon',
  eveningGreeting: 'Good evening'
}

export const methods = {
  generateGreetingFromTimezone,
  formatLong
};

function generateGreetingFromTimezone(timezone: string): string {
  console.assert(timezone != null, 'Assertion Fail @ dateUtils#generateGreetingFromTimezone: No Timezone');

  const currentTimezoneTime = moment().tz(timezone);
  const currentHour = Number(currentTimezoneTime.format(constants.formatHour));
  let greeting: string;

  if (currentHour >= constants.afternoonStartTime && currentHour <= constants.eveningStartTime) {
    greeting = greetings.afternoonGreeting;
  } else if (currentHour >= constants.eveningStartTime) {
    greeting = greetings.eveningGreeting;
  } else {
    greeting = greetings.morningGreeting;
  }

  return greeting;
}

function formatLong(date): string {
  console.assert(date != null, 'Assertion Fail @ dateUtils#generateGreetingFromTimezone: No date');
  console.assert(constants != null, 'Assertion Fail @ dateUtils#generateGreetingFromTimezone: No constants');

  return moment(date).format(constants.formatLongWithTime);
}
