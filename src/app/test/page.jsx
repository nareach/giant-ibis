"use client";
import React from "react";
import { fetchFromApi } from "@/utils/api";

const TestRouteList = () => {
  const fetchRouteList = () => {
    fetchFromApi("get_cityList");
  };

  return (
    <div className="py-[100px]">
      <h1>Test Route List</h1>
      <button
        onClick={fetchRouteList}
        type="button"
        className="p-4 bg-blue-500 text-white rounded-md"
      >
        Fetch Routes
      </button>
    </div>
  );
};

export default TestRouteList;
