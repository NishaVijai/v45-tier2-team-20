import { useApiContext } from "../../../contexts/APIcontext";
import BarChart from "./BarChart";
import Skeleton from "react-loading-skeleton";

export const SummaryMetricComponent = () => {
  const { meteoriteData, filteredSearchInput, loading } = useApiContext();

  return (
    <>
      {loading && (
        <div className="mx-20 px-10">
          <Skeleton width="100%" height={60} />
        </div>
      )}

      {!loading && (
        <div className="px-5 sm:px-20">
          <BarChart
            meteorite={meteoriteData} // full dataset
            searchedMeteorite={filteredSearchInput} // filtered dataset
          />
        </div>
      )}
    </>
  );
};
