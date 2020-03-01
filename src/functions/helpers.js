const Moment = require('moment')
module.exports = {
  unixToTime: unix => {
    Moment.locale('vi')
    return Moment(unix).format('Do MMMM YYYY, h:mm:ss')
  },

  isJson: _string => {
    try {
      JSON.parse(_string)
    } catch (e) {
      return false
    }
    return true
  }
}
