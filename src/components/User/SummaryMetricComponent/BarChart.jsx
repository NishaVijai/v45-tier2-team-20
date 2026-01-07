import { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card } from "../../../components/UI/Card";
import PropTypes from "prop-types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Tabs for the chart
const tabs = [
  { code: "number", name: "Number of strikes" },
  { code: "mass", name: "Average mass" },
  { code: "year", name: "Strikes by year" },
  { code: "recclass", name: "Strikes by composition" },
];

export default function BarChart({ searchedMetheroite = [], metheroite = [] }) {
  const [tabContent, setTabContent] = useState("year");
  const [notNumberMass, setNotNumberMass] = useState(0);
  const [strikeByYear, setStrikeByYear] = useState({});
  const [strikeByClass, setStrikeByClass] = useState({});
  const [averageMetheroiteWeight, setAverageMetheroiteWeight] = useState(0);

  // Count items without numeric mass
  useEffect(() => {
    let count = 0;
    searchedMetheroite.forEach((item) => {
      if (!item?.mass || isNaN(Number(item.mass))) count++;
    });
    setNotNumberMass(count);
  }, [searchedMetheroite]);

  // Count strikes by year and class
  useEffect(() => {
    const byYear = {};
    const byClass = {};
    searchedMetheroite.forEach((item) => {
      if (item.year) {
        const year = new Date(item.year).getFullYear();
        byYear[year] = (byYear[year] || 0) + 1;
      }
      if (item.recclass) {
        byClass[item.recclass] = (byClass[item.recclass] || 0) + 1;
      }
    });
    setStrikeByYear(byYear);
    setStrikeByClass(byClass);
  }, [searchedMetheroite]);

  // Calculate average meteorite mass
  useEffect(() => {
    const totalMass = searchedMetheroite.reduce(
      (total, item) => total + (Number(item.mass) || 0),
      0
    );
    const countWithMass = searchedMetheroite.filter(
      (item) => item.mass && !isNaN(Number(item.mass))
    ).length;
    setAverageMetheroiteWeight(countWithMass ? totalMass / countWithMass : 0);
  }, [searchedMetheroite]);

  // Memoize chart data for performance
  const yearData = useMemo(() => {
    const labels = Object.keys(strikeByYear).sort();
    const data = labels.map((label) => strikeByYear[label]);
    return { labels, datasets: [{ data, backgroundColor: "rgba(53, 162, 235, 0.5)" }] };
  }, [strikeByYear]);

  const classData = useMemo(() => {
    const labels = Object.keys(strikeByClass);
    const data = labels.map((label) => strikeByClass[label]);
    return { labels, datasets: [{ data, backgroundColor: "rgba(53, 162, 235, 0.5)" }] };
  }, [strikeByClass]);

  const yearOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Number of strikes by year" },
    },
    scales: {
      y: { ticks: { precision: 0 } },
    },
  };

  const classOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: tabs.find((tab) => tab.code === tabContent)?.name || "" },
    },
    scales: {
      y: { ticks: { precision: 0 } },
    },
  };

  const changeTab = (code) => setTabContent(code);

  return (
    <div className="flex items-center">
      <div className="mx-auto w-full max-w-[1450px] self-start">
        <Card className="shadow-lg shadow-indigo-300 mx-auto px-5 py-6">
          {/* Tabs */}
          <div className="sm:flex justify-center gap-[12px]">
            {tabs.map((tab) => (
              <button
                key={tab.code}
                onClick={() => changeTab(tab.code)}
                className={`text-indigo-500 rounded-md px-[16px] w-full mb-4 sm:w-auto py-[4px] border-2 border-indigo-400 font-medium hover:bg-gray-100 hover:text-slate-800 hover:border-indigo-900 focus:ring-2 focus:outline-none focus:ring-indigo-900 focus:text-slate-800 focus:bg-indigo-200 ${tabContent === tab.code ? "bg-indigo-200 border-indigo-900 text-slate-800" : ""
                  }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Chart / Info */}
          <div className="flex justify-center max-h-[600px] mx-auto">
            {tabContent === "number" && (
              <p className="bg-[rgba(53,_162,_235,_0.5)] rounded-xl px-5 py-5 mt-5 text-white font-bold sm:text-4xl text-center">
                Total Number of Strikes:{" "}
                {searchedMetheroite.length || metheroite.length}
              </p>
            )}

            {tabContent === "mass" && (
              <p className="bg-[rgba(53,_162,_235,_0.5)] rounded-xl px-5 py-5 mt-5 text-white font-bold sm:text-4xl text-center">
                Average Meteorite Mass:{" "}
                {(averageMetheroiteWeight / (searchedMetheroite.length - notNumberMass)).toLocaleString("en-US")}g
              </p>
            )}

            {tabContent === "year" && <Bar options={yearOptions} data={yearData} />}
            {tabContent === "recclass" && <Bar options={classOptions} data={classData} />}
          </div>
        </Card>
      </div>
    </div>
  );
}

BarChart.propTypes = {
  searchedMetheroite: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      nametype: PropTypes.string,
      recclass: PropTypes.string,
      mass: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      fall: PropTypes.string,
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      reclat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      reclong: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      geolocation: PropTypes.shape({
        latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    })
  ),
  metheroite: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      nametype: PropTypes.string,
      recclass: PropTypes.string,
      mass: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      fall: PropTypes.string,
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      reclat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      reclong: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      geolocation: PropTypes.shape({
        latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    })
  ),
};

BarChart.defaultProps = {
  searchedMetheroite: [],
  metheroite: [],
};
