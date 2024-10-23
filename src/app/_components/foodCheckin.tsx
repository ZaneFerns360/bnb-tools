"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Coffee, Utensils, Cookie, Moon, CheckCircle } from "lucide-react";
import { changeDay1 } from "../api/changeFirstDay";
import { changeDay2 } from "../api/changeSecondDay";

const FoodCheckin = ({ teamDetails }) => {
  const day1Meals = {
    dinner: { icon: <Utensils className="h-4 w-4" />, time: "7:30 PM" },
    snacks: { icon: <Cookie className="h-4 w-4" />, time: "4:00 PM" },
    midnight: { icon: <Moon className="h-4 w-4" />, time: "11:00 PM" },
  };

  const day2Meals = {
    breakfast: { icon: <Coffee className="h-4 w-4" />, time: "8:00 AM" },
    lunch: { icon: <Utensils className="h-4 w-4" />, time: "12:30 PM" },
    snack: { icon: <Cookie className="h-4 w-4" />, time: "4:00 PM" },
  };

  const handleStatusUpdate = (mealInfo, status, memberName, dayNumber) => {
    if (dayNumber === "day1") {
      teamDetails.day1[mealInfo][memberName] = !status;
      changeDay1(teamDetails.id, teamDetails.day1);
    } else if (dayNumber === "day2") {
      teamDetails.day2[mealInfo][memberName] = !status;
      changeDay2(teamDetails.id, teamDetails.day2);
    }
  };

  const handleCheckAllForMeal = (mealKey, dayNumber) => {
    const dayData = dayNumber === "day1" ? teamDetails.day1 : teamDetails.day2;
    const mealData = dayData[mealKey];

    if (mealData) {
      Object.keys(mealData).forEach((memberName) => {
        // Only update if the meal is not already taken (status is true)
        if (mealData[memberName]) {
          handleStatusUpdate(mealKey, true, memberName, dayNumber);
        }
      });
    }
  };

  const hasData = (obj) =>
    obj && typeof obj === "object" && Object.keys(obj).length > 0;

  const renderMealSection = (dayData, mealsConfig, dayNumber) => {
    if (!hasData(dayData)) {
      return (
        <div className="py-4 text-center text-gray-400">
          No data available for this day
        </div>
      );
    }

    return Object.entries(mealsConfig).map(([mealKey, mealInfo]) => {
      const mealData = dayData[mealKey] || {};

      return (
        <div key={mealKey} className="rounded-lg bg-gray-800 p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {mealInfo.icon}
              <span className="font-medium capitalize">{mealKey}</span>
              <span className="text-xs text-gray-400">{mealInfo.time}</span>
            </div>

            {hasData(mealData) && (
              <button
                onClick={() => handleCheckAllForMeal(mealKey, dayNumber)}
                className="flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <CheckCircle className="h-3 w-3" />
                Check All
              </button>
            )}
          </div>

          <div className="space-y-2">
            {hasData(mealData) ? (
              Object.entries(mealData).map(([memberName, status]) => (
                <button
                  key={memberName}
                  onClick={() =>
                    handleStatusUpdate(mealKey, status, memberName, dayNumber)
                  }
                  className="flex w-full items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-sm">{memberName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {status ? "Meal not taken" : "Meal taken"}
                    </span>
                    <div
                      className={`h-4 w-4 rounded-full transition-colors ${
                        !status ? "bg-green-500" : "bg-gray-600"
                      }`}
                    />
                  </div>
                </button>
              ))
            ) : (
              <div className="py-2 text-center text-gray-400">
                No check-ins for {mealKey}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="mx-auto w-full max-w-3xl border-gray-700 bg-gray-900 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          {teamDetails?.name || "Team"} - Food Check-in
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="day1" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2">
            <TabsTrigger value="day1" className="text-sm">
              Day 1
            </TabsTrigger>
            <TabsTrigger value="day2" className="text-sm">
              Day 2
            </TabsTrigger>
          </TabsList>

          <TabsContent value="day1">
            <div className="space-y-6">
              {renderMealSection(teamDetails?.day1 || {}, day1Meals, "day1")}
            </div>
          </TabsContent>

          <TabsContent value="day2">
            <div className="space-y-6">
              {renderMealSection(teamDetails?.day2 || {}, day2Meals, "day2")}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FoodCheckin;
