export default function AgeResult({ result }) {
  const units = [
    { label: "Years", value: result.years },
    { label: "Months", value: result.months },
    { label: "Days", value: result.days },
  ];

  return (
    <section className="result" aria-live="polite">
      <p className="result__born">
        Born on a <strong>{result.birthWeekday}</strong>, {result.birthDateText}
      </p>

      <div className="result__grid">
        {units.map((u) => (
          <div className="unit" key={u.label}>
            <span className="unit__value">{u.value}</span>
            <span className="unit__label">{u.label}</span>
          </div>
        ))}
      </div>

      <p className="result__time">
        plus {result.hours}h {result.minutes}m {result.seconds}s since midnight today
      </p>

      <ul className="result__facts">
        <li>
          <b>{result.totalDays.toLocaleString("en-IN")}</b> days lived
        </li>
        <li>
          {result.daysToBirthday === 0 ? (
            <b>Happy birthday today!</b>
          ) : (
            <>
              Next birthday in <b>{result.daysToBirthday}</b> days, on a{" "}
              <b>{result.nextBirthdayWeekday}</b>
            </>
          )}
        </li>
      </ul>
    </section>
  );
}
