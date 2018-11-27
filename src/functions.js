export const getWeekdays = () => {
  const today = new Date().getDay()
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
  return weekDays.slice(today).concat(weekDays.slice(0, today))
}