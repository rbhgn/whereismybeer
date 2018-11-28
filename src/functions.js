var postalCodes = require('./postalCodes')

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

export const getCoords = (postcodeDigits, postcodeChars, number) => {
  const result = postalCodes.postalCodes.filter(v => (
    v.PostcodeNummers === postcodeDigits 
    //&& 
    // v.PostcodeLetters === postcodeChars 
    //&& 
    // v.MinNummer <= number && 
    // v.MaxNummer >= number
    ) )
  console.log(result)
    return result
}