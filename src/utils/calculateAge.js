const DAY_MS = 24 * 60 * 60 * 1000;

const daysInMonth = (year, monthIndex) => new Date(year, monthIndex + 1, 0).getDate();

/** Parse "yyyy-mm-dd" (value of <input type="date">) as a LOCAL date at 00:00 */
export const parseDob = (value) => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
};

/**
 * Calculates exact age between dob and "now" (system date + time).
 */
export const calculateAge = (dob, now) => {
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    // borrow days from the month before the current one
    const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const prevYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    days += daysInMonth(prevYear, prevMonth);
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // time part comes from the system clock
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // next birthday
  let next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (next < todayStart) next = new Date(now.getFullYear() + 1, dob.getMonth(), dob.getDate());
  const daysToBirthday = Math.round((next - todayStart) / DAY_MS);

  return {
    years,
    months,
    days,
    hours,
    minutes,
    seconds,
    totalDays: Math.floor((todayStart - dob) / DAY_MS),
    birthWeekday: dob.toLocaleDateString("en-US", { weekday: "long" }),
    birthDateText: dob.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    nextBirthdayWeekday: next.toLocaleDateString("en-US", { weekday: "long" }),
    daysToBirthday,
  };
};
