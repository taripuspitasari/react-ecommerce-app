import React from "react";
import {useDispatch} from "react-redux";
import {loadProducts} from "../app/slices/productSlice";

export default function Pagination({pages}) {
  const dispatch = useDispatch();

  const current = pages?.current_page;
  const last = pages?.last_page;

  const goToPage = page => {
    dispatch(loadProducts({page}));
  };

  return (
    <div className="join py-3 flex justify-center">
      {current !== 1 && (
        <button
          className="join-item btn bg-white hover:bg-primary"
          disabled={current === 1}
          onClick={() => goToPage(current - 1)}
        >
          <i class="fa-solid fa-angle-left"></i>
        </button>
      )}

      <button className="join-item btn bg-white hover:bg-primary">
        Page {current}
      </button>

      {current !== last && (
        <button
          className="join-item btn bg-white hover:bg-primary"
          disabled={current === last}
          onClick={() => goToPage(current + 1)}
        >
          <i class="fa-solid fa-angle-right"></i>
        </button>
      )}
    </div>
  );
}
