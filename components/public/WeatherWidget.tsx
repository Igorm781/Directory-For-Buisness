"use client";

import { useState, useEffect } from "react";
import { 
  Sun, 
  CloudSun, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  Snowflake, 
  CloudRainWind, 
  CloudLightning, 
  Cloud,
  Loader2,
  Moon,
  CloudMoon
} from "lucide-react";

interface HourlyForecast {
  time: string;
  temp: number;
  code: number;
}

interface WeatherData {
  currentTemp: number;
  currentCode: number;
  hourly: HourlyForecast[];
}

export function WeatherWidget() {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // WMO Weather interpretation codes (WW)
  function getWeatherCondition(code: number, hourNum: number): { label: string; icon: any } {
    const isNight = hourNum >= 20 || hourNum < 6;

    if (code === 0) {
      return { 
        label: isNight ? "Clear" : "Sunny", 
        icon: isNight ? Moon : Sun 
      };
    }
    if (code >= 1 && code <= 3) {
      return { 
        label: "Partly Cloudy", 
        icon: isNight ? CloudMoon : CloudSun 
      };
    }
    if (code === 45 || code === 48) return { label: "Foggy", icon: CloudFog };
    if (code >= 51 && code <= 55) return { label: "Drizzle", icon: CloudDrizzle };
    if (code >= 61 && code <= 65) return { label: "Rainy", icon: CloudRain };
    if (code >= 71 && code <= 75) return { label: "Snowy", icon: Snowflake };
    if (code >= 80 && code <= 82) return { label: "Showers", icon: CloudRainWind };
    if (code >= 95 && code <= 99) return { label: "Thunderstorm", icon: CloudLightning };
    return { label: "Cloudy", icon: Cloud };
  }

  function formatHour(timeStr: string) {
    // Expected format from open-meteo: "2026-05-30T21:00"
    try {
      const parts = timeStr.split("T");
      if (parts.length === 2) {
        const timePart = parts[1]; // "21:00"
        const hourNum = parseInt(timePart.split(":")[0], 10);
        const ampm = hourNum >= 12 ? 'pm' : 'am';
        let displayHour = hourNum % 12;
        displayHour = displayHour ? displayHour : 12;
        return `${displayHour}${ampm}`;
      }
    } catch (e) {
      // Fallback
    }
    return timeStr;
  }

  function getHourNum(timeStr: string): number {
    try {
      const parts = timeStr.split("T");
      if (parts.length === 2) {
        return parseInt(parts[1].split(":")[0], 10);
      }
    } catch (e) {
      // Fallback
    }
    return new Date().getHours();
  }

  async function fetchWeather() {
    try {
      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=42.4295&longitude=-71.0667&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=America%2FNew_York"
      );
      if (!response.ok) throw new Error("API response error");
      const res = await response.json();

      // Find current hour ISO string e.g. "2026-05-30T21:00"
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const date = String(now.getDate()).padStart(2, '0');
      const hour = String(now.getHours()).padStart(2, '0');
      const currentHourISO = `${year}-${month}-${date}T${hour}:00`;

      let startIndex = res.hourly.time.findIndex((t: string) => t.startsWith(currentHourISO.substring(0, 13)));
      if (startIndex === -1) {
        startIndex = 0; // fallback
      }

      const hourlyList: HourlyForecast[] = [];
      for (let i = 0; i < 6; i++) {
        const idx = startIndex + i;
        if (idx < res.hourly.time.length) {
          hourlyList.push({
            time: res.hourly.time[idx],
            temp: Math.round(res.hourly.temperature_2m[idx]),
            code: res.hourly.weather_code[idx]
          });
        }
      }

      setData({
        currentTemp: Math.round(res.current.temperature_2m),
        currentCode: res.current.weather_code,
        hourly: hourlyList
      });
    } catch (error) {
      console.error("Failed to fetch live weather, using fallback:", error);
      const fallbackList: HourlyForecast[] = [];
      const baseHour = new Date().getHours();
      for (let i = 0; i < 6; i++) {
        const targetHour = (baseHour + i) % 24;
        fallbackList.push({
          time: `T${String(targetHour).padStart(2, '0')}:00`,
          temp: 72 + (i % 2 === 0 ? 1 : -1) * i,
          code: 1 // Partly Cloudy
        });
      }
      setData({
        currentTemp: 72,
        currentCode: 1,
        hourly: fallbackList
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center h-full min-h-[380px] bg-gradient-to-b from-[#111219]/90 to-[#0e101e]/90 border border-[#1d1f2e] rounded-2xl p-6 shadow-xl">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        <span className="text-sm text-slate-400 mt-2">Loading live weather...</span>
      </div>
    );
  }

  const currentHourNum = new Date().getHours();
  const currentCondition = getWeatherCondition(data.currentCode, currentHourNum);
  const CurrentIcon = currentCondition.icon;

  return (
    <div className="flex-1 bg-gradient-to-b from-blue-600/10 to-[#111219]/80 border border-[#1d1f2e] hover:border-blue-500/20 transition-all duration-300 rounded-2xl p-6 md:p-8 shadow-[0_0_20px_rgba(37,99,235,0.05)] flex flex-col justify-between h-full">
      
      {/* Current Weather (Top) */}
      <div className="flex flex-col items-center text-center border-b border-[#1d1f2e]/60 pb-6">
        <span className="text-slate-500 text-xs tracking-widest font-bold uppercase mb-2">Local Weather</span>
        <div className="flex items-center gap-4 justify-center">
          <CurrentIcon className="w-14 h-14 text-blue-400 shrink-0 drop-shadow-[0_0_10px_rgba(96,165,250,0.25)]" />
          <span className="text-6xl font-extrabold text-white tracking-tighter leading-none select-none">
            {data.currentTemp}°
          </span>
        </div>
        <span className="text-slate-200 font-semibold mt-3 text-base">
          {currentCondition.label}
        </span>
        <span className="text-[#2563eb] text-[10px] tracking-wider font-bold uppercase mt-1">
          Malden, MA
        </span>
      </div>

      {/* Hourly Forecast (Bottom) */}
      <div className="flex-1 flex flex-col justify-between mt-6 space-y-2">
        {data.hourly.map((hourForecast, i) => {
          const forecastHourNum = getHourNum(hourForecast.time);
          const condition = getWeatherCondition(hourForecast.code, forecastHourNum);
          const HourIcon = condition.icon;
          return (
            <div 
              key={i} 
              className="flex items-center justify-between border-b border-[#1d1f2e]/30 pb-2 last:border-0 last:pb-0"
            >
              {/* Hour */}
              <span className="text-xs font-semibold text-slate-400 w-10">
                {formatHour(hourForecast.time)}
              </span>
              
              {/* Icon */}
              <HourIcon className="w-4.5 h-4.5 text-blue-400 shrink-0" />
              
              {/* Temp */}
              <span className="text-xs font-bold text-slate-200 w-8 text-right">
                {hourForecast.temp}°
              </span>
              
              {/* Label */}
              <span className="text-[10px] text-slate-500 font-medium truncate pl-2 flex-1 text-right">
                {condition.label}
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
