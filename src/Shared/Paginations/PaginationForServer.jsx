"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const PaginationForServer = ({ total }) => {
  console.log({ total });
  const [filters, setFilters] = useState({ page: 1, perPage: 2 });
  const totalPage = Math.ceil(total / filters?.perPage);
  const array = Array.from(Array(totalPage ? totalPage : "").keys());
  const router = useRouter();

  const handleRight = () => {
    if (filters?.page < totalPage) {
      router.push(`?page=${filters?.page + 1}&perPage=${filters?.perPage}`);
    } else {
      router.push(`?page=1&perPage=${filters?.perPage}`);
    }
  };
  const handleLeft = () => {
    if (filters?.page === 1) {
      router.push(`?page=${totalPage}&perPage=${filters?.perPage}`);
    } else if (filters?.page <= totalPage) {
      router.push(`?page=${filters?.page - 1}&perPage=${filters?.perPage}`);
    }
  };

  if (filters?.perPage >= total) {
    return;
  }
  return (
    <div className={`flex justify-center items-center gap-2`}>
      <div
        onClick={handleLeft}
        data-tip="Previous Page"
        className={`tooltip tooltip-custom-primary tooltip-top flex justify-center items-center h-8 w-8 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 bg-btn-secondary text-heading-main`}
      >
        <FaArrowLeft />
      </div>
      {array?.map((a, i) => (
        <div
          key={a}
          onClick={router.push(`?page=${a + 1}&perPage=${filters?.perPage}`)}
          className={`flex justify-center items-center h-8 w-8 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 ${
            filters?.page === a + 1
              ? "bg-btn-primary text-heading-secondary"
              : "bg-btn-secondary text-heading-main"
          }`}
        >
          <button>{a + 1}</button>
        </div>
      ))}
      <div
        onClick={handleRight}
        data-tip="Next Page"
        className={`tooltip tooltip-custom-primary tooltip-top flex justify-center items-center h-8 w-8 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95 bg-btn-secondary text-heading-main`}
      >
        <FaArrowRight />
      </div>
    </div>
  );
};
