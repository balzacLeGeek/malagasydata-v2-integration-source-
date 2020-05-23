import moment from 'moment'

export function dateTime(data) {
  return data.map((time) => {
    time.startTime = moment(`${time.hourStart}:${time.minuteStart}`, 'HH:mm')
    time.endTime = moment(`${time.hourEnd}:${time.minuteEnd}`, 'HH:mm')
    return time
  })
}

export function dateTimeParams(timeData) {
  return timeData.map((time) => {
    const startTime = moment(time.startTime)
    const endTime = moment(time.endTime)
    const hourStart = startTime.format('HH')
    const minuteStart = startTime.format('mm')
    const hourEnd = endTime.format('HH')
    const minuteEnd = endTime.format('mm')
    return {
      hourStart,
      minuteStart,
      hourEnd,
      minuteEnd,
    }
  })
}
