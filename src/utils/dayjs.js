import Vue from 'vue';
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

// https://day.js.org/docs/zh-CN/display/to
Vue.filter('relativeTime', function(value) {
  return dayjs().to(dayjs(value));
});
