const { startOfToday, endOfToday, startOfYesterday, endOfYesterday, startOfWeek, endOfWeek, startOfLastWeek, endOfLastWeek, startOfMonth, endOfMonth, startOfLastMonth, endOfLastMonth } = require("date-fns");

exports.getDateRangeFromFilter = (filter, startDate, endDate) => {
  const today = new Date();
  switch (filter) {
    case "today":
      return { start: startOfToday(), end: endOfToday() };
    case "yesterday":
      return { start: startOfYesterday(), end: endOfYesterday() };
    case "this_week":
      return { start: startOfWeek(today), end: endOfWeek(today) };
    case "last_week":
      return { start: startOfLastWeek(today), end: endOfLastWeek(today) };
    case "this_month":
      return { start: startOfMonth(today), end: endOfMonth(today) };
    case "last_month":
      return { start: startOfLastMonth(today), end: endOfLastMonth(today) };
    default:
      return { start: new Date(startDate), end: new Date(endDate) };
  }
};
