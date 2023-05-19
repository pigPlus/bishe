import {
  formatTimestamp
} from "../../utils/index";

Component({
  properties: {},
  data: {
    currentDate: new Date().getTime(),
    maxDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    show: false,
    showDate: ""
  },
  methods: {
    onClose() {
      this.setData({
        show: false
      });
    },
    onCancelPicker() {
      this.setData({
        show: false
      })
    },

    onConfirmPicker(event) {
      this.setData({
        currentDate: event.detail,
        show: false,
        showDate: formatTimestamp(event.detail, 'yyyy/MM/dd')
      });
      this.triggerEvent('datePickerChange', {
        currentDate: event.detail
      })
    },
    showPopup() {
      this.setData({
        show: true
      });
    },
  }
})