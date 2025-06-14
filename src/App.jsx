import { useEffect, useState } from "react";
import "./App.css";
import Prayer from "./Component/prayer";

function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("Cairo");

  const cities = [
    { name: "القاهره", value: "Cairo" },
    { name: "الاسكندريه", value: "Alexandria" },
    { name: "المنصوره", value: "Mansoura" },
    { name: "الجيزه", value: "Giza" },
    { name: "اسوان", value: "Aswan" },
    { name: "الأقصر", value: "Luxor" },
    { name: "طنطا", value: "Tanta" },
    { name: "دمياط", value: "Damietta" },
    { name: "الزقازيق", value: "Zagazig" },
    { name: "بني سويف", value: "Beni Suef" },
    { name: "سوهاج", value: "Sohag" },
    { name: "قنا", value: "Qena" },
    { name: "الفيوم", value: "Fayoum" },
    { name: "كفر الشيخ", value: "Kafr El Sheikh" },
    { name: "المحلة الكبرى", value: "Mahalla" },
    { name: "المنوفية", value: "Menoufia" },
    { name: "العريش", value: "Arish" },
    { name: "مرسى مطروح", value: "Marsa Matrouh" },
  ];

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt`);
        const data_prayer = await response.json();
        console.log(data_prayer.data.date.gregorian.date);
        setPrayerTimes(data_prayer.data.timings);
        setDateTime(data_prayer.data.date.gregorian.date);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, [city]);

  const formatTimes = (time) => {
    if (!time) return "00:00";
    let [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "Pm" : "Am";
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="top_sec">
            <div className="city">
              <h3>المدينه</h3>
              <select onChange={(e) => setCity(e.target.value)}>
                {cities.map((city_opj) => (
                  <option key={city_opj.value} value={city_opj.value}>
                    {city_opj.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="date">
              <h3>التاريخ</h3>
              <h4>{dateTime}</h4>
            </div>
          </div>

          <Prayer name="الفجر" time={formatTimes(prayerTimes.Fajr)} />
          <Prayer name="الضهر" time={formatTimes(prayerTimes.Dhuhr)} />
          <Prayer name="العصر" time={formatTimes(prayerTimes.Asr)} />
          <Prayer name="المغرب" time={formatTimes(prayerTimes.Maghrib)} />
          <Prayer name="العشاء" time={formatTimes(prayerTimes.Isha)} />
        </div>
      </section>
    </>
  );
}

export default App;
