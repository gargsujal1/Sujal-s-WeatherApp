import "./App.css";
import DemoCities from "./components/DemoCities";
import Search from "./components/Search";
import TimeAndLocation from "./components/TimeAndLocation";
import DetailsAndTemp from "./components/DetailsAndTemp";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900";

    return "bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500";
  };
  

  return (
    <div
      className={` justify-evenly flex flex-row  max-w-screen-2xl py-5 px-4 bg-gradient-to-br min-h-screen shadow-xl ${formatBackground()}`}
    >
      <div className="w-7/12">
        <DemoCities setQuery={setQuery} />
        <Search setQuery={setQuery} units={units} setUnits={setUnits} />

        {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <DetailsAndTemp weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}
      </div>
    </div>
  );
}

export default App;

