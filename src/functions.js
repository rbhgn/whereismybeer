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

export const getDistance = (coords1, coords2) => {
  if (!coords1 || !coords2) return 0
  var p = 0.017453292519943295
  var c = Math.cos;
  var a = 0.5 - c((coords2.lat - coords1.lat) * p)/2 + 
          c(coords1.lat * p) * c(coords2.lat * p) * 
          (1 - c((coords2.lng - coords1.lng) * p))/2
  return 12742 * Math.asin(Math.sqrt(a))
}