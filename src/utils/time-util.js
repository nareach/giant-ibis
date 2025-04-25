import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";



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

export function hasBusLeft(selectedDate, departureTime, timezone = "UTC") {
  if (!selectedDate || !departureTime) return false;

  try {
    // Parse time (e.g., "10:00 PM" -> 22:00)
    const [timePart, modifier] = departureTime.trim().split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    else if (modifier === "AM" && hours === 12) hours = 0;

    // Combine Ant Design date + API time
    const departureDateTime = selectedDate
      .hour(hours)
      .minute(minutes)
      .tz(timezone);

    const now = dayjs().tz(timezone);
    return now.isAfter(departureDateTime);
  } catch (error) {
    console.error("Validation error:", error);
    return false;
  }
}


export function getCityName({ cities, id }) {
  const city = cities?.data?.find(city => city.city_id === id)
  return city.city_name;
}



export const calculateArrivalDateTime = ({ departureTime, durationHours, metaTime }) => {
  console.log({ departureTime, durationHours, metaTime });
  return '';
  const [time, period] = departureTime.split(' ');
  const [hours, minutes] = time.split(':');

  let hour24 = parseInt(hours, 10);
  if (period === 'PM' && hour24 !== 12) hour24 += 12;
  if (period === 'AM' && hour24 === 12) hour24 = 0;

  const departureDate = dayjs()
    .set('hour', hour24)
    .set('minute', minutes)
    .set('second', 0);

  return departureDate.add(durationHours, 'hour');
};


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
  console.log({ departureTime, durationHours, metaTime });
  const departure = combineDateTime(departureTime, metaTime);
  const duration = parseDurationHours(durationHours);
  return departure.add(duration, 'hour').format('MMMM-DD');
};