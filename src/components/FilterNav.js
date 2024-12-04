import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/taskSlice";

const FilterNav = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.tasks.filter);

  const filters = ["All", "Completed", "Pending", "Overdue"];

  return (
    <div className="filter-nav">
      {filters.map((f) => (
        <button
          key={f}
          className={filter === f ? "active" : ""}
          onClick={() => dispatch(setFilter(f))}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterNav;
