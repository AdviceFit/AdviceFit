"use client";

import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

const DatePicker = ({
  selected,
  setSelected,
}: {
  selected: Date;
  setSelected: (date: Date) => void;
}) => {
  return (
    <div className="custom-datepicker">
      <DayPicker
        mode="single"
        selected={selected}
        required
        onSelect={setSelected}
        captionLayout="dropdown"
      />
    </div>
  );
};

export default DatePicker;
