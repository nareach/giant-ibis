import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

export function addHoursToTime(timeString, timeToAddString) {
  const hoursToAdd = parseInt(timeToAddString, 10);

  const [time, period] = timeString?.split(" ");
  const [hour, minute] = time?.split(":");

  let hour24 = parseInt(hour, 10);
  if (period === "PM" && hour24 !== 12) {
    hour24 += 12;
  } else if (period === "AM" && hour24 === 12) {
    hour24 = 0;
  }

  const date = new Date(1970, 0, 1, hour24, minute);

  date.setHours(date.getHours() + hoursToAdd);

  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  const newTimeString = date.toLocaleTimeString('en-US', options);

  return newTimeString;
}


export function getCurrentTimeFormatted() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isToday);

export function hasBusLeft(selectedDate, departureTime, timezone = "Asia/Phnom_Penh") {
  if (!selectedDate || !departureTime) return false;

  try {
    // Normalize time string
    const normalizedTime = departureTime.trim()
      .replace(/\s+/g, ' ')
      .toUpperCase();
    
    const [timePart, modifier] = normalizedTime.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    // Convert 12-hour format to 24-hour format
    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    // Create departure datetime
    const departureDateTime = dayjs.tz(selectedDate, timezone)
      .hour(hours)
      .minute(minutes || 0)
      .second(0)
      .millisecond(0);

    const now = dayjs().tz(timezone);

    // Simplified comparison logic
    return now.isAfter(departureDateTime);

  } catch (error) {
    console.error("Error checking bus departure time:", error);
    return false;
  }
}



export function getCityName({ cities, id }) {
  const city = cities?.data?.find(city => city.city_id === id)
  return city.city_name;
}


// Extract hours from "6 hours" string
export const parseDurationHours = (durationStr) => {
  return parseInt(durationStr) || 0;
};

// Combine ISO date (YYYY-MM-DD) with 12-hour time (HH:MM AM/PM)
export const combineDateTime = (isoDate, time12hr) => {
  const [time, period] = time12hr.split(' ');
  let [hours, minutes] = time.split(':');

  // Convert to 24-hour format
  hours = parseInt(hours);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return dayjs(isoDate)
    .set('hour', hours)
    .set('minute', minutes)
    .set('second', 0);
};

export const calculateArrival = ({ departureTime, durationHours, metaTime }) => {
  const departure = combineDateTime(departureTime, metaTime);
  const duration = parseDurationHours(durationHours);

  const arrival = departure.add(duration, 'hour');

  return arrival.format('MMMM-DD-YYYY'); // example: 2025-06-01 08:30 PM
};

export const calculateArrivalTime = ({ departureTime, durationHours, metaTime }) => {
  const departure = combineDateTime(departureTime, metaTime);
  const duration = parseDurationHours(durationHours);

  const arrival = departure.add(duration, 'hour');

  return arrival.format('hh:mm A'); // example: 2025-06-01 08:30 PM
};