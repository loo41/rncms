
function timeFormat(date) {
  let time = new Date(date)
  let Y = time.getFullYear()
  let M = time.getMonth() + 1
  let D = time.getDate()
  let H = time.getHours()
  let ME = time.getMinutes()
  let S = time.getMilliseconds()
  return `${Y}-${M}-${D} ${H}:${ME}:${S}`
}

module.exports = {
  timeFormat
}