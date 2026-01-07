import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MeteoriteLineLoading = () => {
  return (
    <div className="w-full border-[1px] border-gray-300 flex p-5 rounded-md cursor-pointer hover:shadow-lg duration-100">
      <div className="w-full">
        <div className="flex items-center space-x-6 mb-4 justify-between">
          <Skeleton
            className="bg-[#E7E7F0] rounded-md"
            width={96}
            height={96}
          />
          <Skeleton width={104} height={36} />
          <Skeleton width={58} height={35} />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-x-6 gap-y-12">
          <Skeleton width={64} height={24} />
          <Skeleton width={64} height={24} />
          <Skeleton width={64} height={24} />
          <Skeleton width={64} height={24} />
          <Skeleton width={64} height={24} />
          <Skeleton width={64} height={24} />
          <Skeleton width={64} height={24} />
          <Skeleton width={64} height={24} />
        </div>
      </div>
    </div>
  );
};
