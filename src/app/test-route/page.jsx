
"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchFromApi } from "@/utils/api";

const TestRouteList = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRouteList = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchFromApi("get_routeList");
        if (response.data) {
          setRoutes(response.data);
        }
        console.log("Routes:", response.data);
      } catch (err) {
        setError("Failed to fetch routes. Please try again.");
        console.error("Error fetching routes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRouteList();
  }, []);

  if (loading) {
    return (
      <div className="py-32 px-4 max-w-7xl mx-auto">
        <Card className="bg-white/50 backdrop-blur-sm shadow-xl">
          <CardContent className="flex items-center justify-center min-h-[200px]">
            <div className="text-gray-500">Loading routes...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-32 px-4 max-w-7xl mx-auto">
      <Card className="bg-white/50 backdrop-blur-sm shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Bus Routes
          </CardTitle>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}

          {routes.length > 0 && (
            <div className="rounded-lg border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50 border-b">
                    <tr>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Origin</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Destination</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Distance</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Bus Type</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Duration</th>
                      <th className="h-12 px-4 text-right align-middle font-medium text-gray-500">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {routes.map((route, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50/50 transition-colors duration-200"
                      >
                        <td className="p-4 align-middle">{route.origin}</td>
                        <td className="p-4 align-middle">{route.destination}</td>
                        <td className="p-4 align-middle">{route.kilo_meters} km</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                            {route.bus_type}
                          </span>
                        </td>
                        <td className="p-4 align-middle">{route.duration}</td>
                        <td className="p-4 align-middle text-right font-medium">
                          ${route.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TestRouteList;
