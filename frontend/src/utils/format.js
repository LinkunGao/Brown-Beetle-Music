export const formatDuration = (duration) => {
    // convert minutes
    let min = Math.ceil(duration / 1000 / 60)
    min = min < 10 ? '0' + min : min
    // convert seconds
    let sec = Math.ceil((duration / 1000) % 60)
    sec = sec < 10 ? '0' + sec : sec
    return min + ':' + sec
  }
  
  export const formatCount = (count) => {
    if (count / 10000 > 10) {
      return parseInt(count / 10000)*10 + 'K'
    } else {
      return count
    }
  }