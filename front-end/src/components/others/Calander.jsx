import * as React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useDate } from "../../context/DateContext";
export default function ResponsiveDatePickers({ onAction }) {
  const { setSelectedDate } = useDate();
  return (
    <DemoContainer components={["StaticDatePicker"]}>
      <DemoItem label=" " className="text-black ">
        <div>
          <StaticDatePicker
            onChange={(d) => (setSelectedDate(d), onAction(d))}
            slotProps={{
              actionBar: {
                actions: () => null,
              },
              // removes OK/Cancel buttons
            }}
            sx={{
              ".MuiPickerStaticWrapper-content": {
                backgroundColor: "", // Main calendar background
              },
              ".MuiDayCalendar-root": {
                backgroundColor: "",
              },
              ".MuiPickersCalendarHeader-root": {
                backgroundColor: "", // Month/year header
              },
              ".MuiPickersDay-root": {
                backgroundColor: "", // Each date cell
                "&:hover": {
                  backgroundColor: "", // Optional hover effect
                },
              },
              ".MuiPickersToolbar-root": {
                backgroundColor: "#e0f2fe", // Top toolbar
                color: "#000",
              },
            }}
          />
        </div>
      </DemoItem>
    </DemoContainer>
  );
}
