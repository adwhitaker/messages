import * as moment from 'moment-timezone';

export const constants = {
  afternoonStartTime: 12,
  eveningStartTime: 17,
  formatHour: 'HH'
};

const greetings = {
  morningGreeting: 'Good morning',
  afternoonGreeting: 'Good afternoon',
  eveningGreeting: 'Good evening'
}

export const methods = {
  generateGreetingFromTimezone
};

function generateGreetingFromTimezone(timezone: string): string {
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
