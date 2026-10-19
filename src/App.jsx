import { useEffect, useState } from "react";
import AgeResult from "./components/AgeResult.jsx";
import { calculateAge, parseDob } from "./utils/calculateAge.js";

const formatSystemDate = (d) =>
  d.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });

export default function App() {
  const [dob, setDob] = useState("");
  const [now, setNow] = useState(new Date());
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // live system clock
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  // keep result live (seconds tick) after first calculation
  useEffect(() => {
    if (result && dob) setResult(calculateAge(parseDob(dob), now));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now]);

  const todayISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dob) {
      setResult(null);
      setError("Pick your date of birth to continue.");
      return;
    }
    const birth = parseDob(dob);
    if (birth > now) {
      setResult(null);
      setError("Date of birth can't be in the future. Choose an earlier date.");
      return;
    }
    setError("");
    setResult(calculateAge(birth, now));
  };

  return (
    <main className="page">
      <form className="card" onSubmit={handleSubmit} noValidate>
        <h1 className="card__title">Present Age Calculator</h1>

        <label className="field" htmlFor="dob">
          <span className="field__label">Enter your date of birth</span>
          <input
            id="dob"
            type="date"
            value={dob}
            max={todayISO}
            onChange={(e) => setDob(e.target.value)}
            aria-invalid={!!error}
          />
        </label>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}

        <div className="sysdate">
          <span className="field__label">System date</span>
          <time dateTime={now.toISOString()}>{formatSystemDate(now)}</time>
        </div>

        <button type="submit" className="btn">
          Find present age
        </button>

        {result && <AgeResult result={result} />}
      </form>
    </main>
  );
}
