"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { Coffee, Utensils, Cookie, Moon } from "lucide-react";

const FoodCheckin = ({ teamDetails, foodDetails }) => {
  const [activeTab, setActiveTab] = useState("day1");

  const meals = [
    {
      icon: <Coffee className="h-4 w-4" />,
      label: "Breakfast",
      time: "8:00 AM",
      day1Field: "breakfast1",
      day2Field: "breakfast2",
    },
    {
      icon: <Utensils className="h-4 w-4" />,
      label: "Lunch",
      time: "12:30 PM",
      day1Field: "lunch1",
      day2Field: "lunch2",
    },
    {
      icon: <Cookie className="h-4 w-4" />,
      label: "Snack",
      time: "4:00 PM",
      day1Field: "snack1",
      day2Field: "snack2",
    },
    {
      icon: <Moon className="h-4 w-4" />,
      label: "Dinner",
      time: "7:30 PM",
      day1Field: "dinner1",
      day2Field: "dinner2",
    },
  ];

  const members = [
    { id: 1, name: teamDetails.member1 },
    { id: 2, name: teamDetails.member2 },
    { id: 3, name: teamDetails.member3 },
    { id: 4, name: teamDetails.member4 },
  ].filter((member) => member.name);

  const handleStatusToggle = (memberId, mealField) => {
    // Here you would implement the logic to update the food status
    console.log(`Toggling status for member ${memberId}, meal ${mealField}`);
  };

  return (
    <Card className="mx-auto w-full max-w-md bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">
          {teamDetails.name} - Food Check-in
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

          {["day1", "day2"].map((day) => (
            <TabsContent key={day} value={day}>
              <div className="space-y-6">
                {meals.map((meal) => (
                  <div key={meal.label} className="rounded-lg bg-gray-800 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      {meal.icon}
                      <span className="font-medium">{meal.label}</span>
                      <span className="ml-auto text-xs text-gray-400">
                        {meal.time}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {members.map((member) => (
                        <button
                          key={member.id}
                          onClick={() =>
                            handleStatusToggle(
                              member.id,
                              day === "day1" ? meal.day1Field : meal.day2Field,
                            )
                          }
                          className="flex w-full items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-700"
                        >
                          <span className="text-sm">{member.name}</span>
                          <div
                            className={`h-4 w-4 rounded-full ${
                              Math.random() > 0.5
                                ? "bg-green-500"
                                : "bg-gray-600"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FoodCheckin;
