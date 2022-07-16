// import divide from 'lodash/divide'
import truncate from 'lodash/truncate'
// import now from 'lodash/now'
// import isString from 'lodash/isString'
// import isNull from 'lodash/isNull'
import isUndefined from 'lodash/isUndefined'

export default {
  data() {
    return {
      toasts: [],
    }
  },
  methods: {
    consoleLog(data) {
      console.log(data)
    },
    getFileType(file) {
      let type
      switch (file.type.split('/')[0]) {
        case 'image':
          type = 'image'
          break

        default:
          type = 'file'
          break
      }
      return type
    },
    openNotification(title, color, text) {
      this.toasts.push({
        title: title,
        content: text,
        color: color,
      })
    },
    truncateText(text, length) {
      const data = truncate(text, {
        length: length,
      })
      return data
    },
    resetObjectValue(o) {
      for (var key in o) {
        // eslint-disable-next-line no-prototype-builtins
        if (!o.hasOwnProperty(key)) continue
        var val = o[key]
        switch (typeof val) {
          case 'string':
            o[key] = ''
            break
          case 'number':
            o[key] = 0
            break
          case 'boolean':
            o[key] = false
            break
          case 'object':
            if (val === null) break
            if (val instanceof Array) {
              o[key] = []
              break
            }
            val = {}
            //Or recursively clear the sub-object
            //resetObject(val);
            break
        }
      }
    },
    acronymText(text) {
      try {
        if (text) {
          var matches = text.match(/\b(\w)/g) // ['J','S','O','N']
          var acronym = matches.join('').toUpperCase()
          return acronym
        } else {
          return '#'
        }
      } catch (error) {
        console.log('error', error)
        console.log('acronym', text)
        return truncate(text, {
          length: 2,
        })
      }
    },
    // formatDate(date, format) {
    //   if (isNull(date)) {
    //     // return "sending";
    //     return formatter.formatDate(now(), format)
    //   }
    //   return formatter.formatDate(date, format)
    // },
    // parseDate(date) {
    //   return formatter.parseDate(date)
    // },
    formatCurrency(value) {
      const val = toString(value)
      if (isUndefined(val)) {
        return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ',')
      }
      return val
    },
  },
}
