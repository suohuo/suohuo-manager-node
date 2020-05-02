/*
 * @Description:
 * @Author: ygy
 * @LastEditors: nemo
 * @Date: 2019-02-26 13:24:23
 * @LastEditTime: 2019-03-14 17:35:23
 */
/* eslint-disable */
import moment from 'moment';

const Util = (function () {
  /**
   * @description: 浏览器设置cookie
   * @param {String} cname 要设置cookie名
   * @param {String} cvalue 要设置cookie值
   * @param {Number} exdays 要设置cookie名
   */
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
  }

  return {
    renderBlockWithIf(bool, child) {
      if (bool) {
        return child;
      }
      return null;
    },
    deepCopyArray(arr) {
      return JSON.parse(JSON.stringify(arr));
    },
    getCurrentQuarter(type) {
      const year = moment().format('YYYY');
      let month = null;
      if (type === 'last') {
        month = moment()
          .subtract(3, 'month')
          .format('MM');
      } else {
        month = moment().format('MM');
      }
      let quarter = null;
      const json = {
        Q1: ['01', '02', '03'],
        Q2: ['04', '05', '06'],
        Q3: ['07', '08', '09'],
        Q4: ['10', '11', '12']
      };
      for (var k in json) {
        json[k].map(el => {
          if (el === month) {
            quarter = year + '-' + k;
          }
        });
      }
      return quarter;
    },
    getLastQuarter() {
      const type = 'last';
      return this.getCurrentQuarter(type);
    },
    isLtQuarter(time1, time2) {
      if (!time1) return;
      const time1Arr = time1.split('-');
      const time2Arr = time2.split('-');
      const year1 = time1Arr[0];
      const year2 = time2Arr[0];
      const quarter1 = time1Arr[1];
      const quarter2 = time2Arr[1];
      if (Number(year1) < Number(year2)) {
        return true;
      } else if (Number(year1) == Number(year2)) {
        const q1 = quarter1.slice(1);
        const q2 = quarter2.slice(1);
        return Number(q1) < Number(q2);
      } else {
        return false;
      }
    },
    deepClone(source) {
      if (!source || typeof source !== 'object') {
        throw new Error('error arguments');
      }
      var targetObj = source.constructor === Array ? [] : {};
      for (var keys in source) {
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = this.deepClone(source[keys]);
          } else {
            targetObj[keys] = source[keys];
          }
        }
      }
      return targetObj;
    },
    hasSame(arr) {
      return arr.length !== new Set(arr).size;
    },
    serialize(obj) {
      const str = [];
      for (let p in obj) {
        if (obj.hasOwnProperty(p)) {
          str.push(
            encodeURIComponent(p) +
            '=' +
            encodeURIComponent(this.isNothing(obj[p]) ? '' : obj[p])
          );
        }
      }
      return str.join('&');
    },
    getCookie(name) {
      const regexp = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
      const matches = regexp.exec(document.cookie);
      return matches ? matches[2] : null;
    },
    getURLParameter(name) {
      const result =
        decodeURIComponent(
          (new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(
            window.location.href
          ) || [undefined, ''])[1].replace(/\+/g, '%20')
        ) || null;
      return result;
    },
    updateParameter(uri, key, value) {
      var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
      var separator = uri.indexOf('?') !== -1 ? '&' : '?';
      if (uri.match(re)) {
        return uri.replace(re, '$1' + key + '=' + value + '$2');
      } else {
        return uri + separator + key + '=' + value;
      }
    },
    isRMB(value) {
      let regexp = new RegExp(/(^[1-9]{1}\d*$)|(^\d+\.\d{1,2}$)/);
      return regexp.test(value);
    },
    isNothing(value) {
      return (
        value === '' ||
        value === '-' ||
        value === undefined ||
        value === null ||
        value === 'NaN' ||
        (typeof value === 'number' && (isNaN(value) || !isFinite(value)))
      );
    },
    isUrl(value) {
      let regexp = new RegExp(
        '(http|https)://[w-]+(.[w-]+)+([w.,@?^=%&amp;:/~+#-]*[w@?^=%&amp;/~+#-])?'
      );
      return regexp.test(value);
    },
    isCount(value) {
      let regexp = new RegExp(/^[1-9]+\d*$/);
      return regexp.test(value);
    },
    toCent(value) {
      if (this.isNothing(value)) {
        return;
      }
      value = parseFloat(value);
      // 解决浮点数计算bug
      return parseInt((value * 100).toFixed(2), 10);
    },
    toCentThree(value) {
      if (this.isNothing(value)) {
        return;
      }
      value = parseFloat(value);
      // 解决浮点数计算bug
      return parseInt((value * 1000).toFixed(2), 10);
    },
    toYuan(value, precision = 2) {
      if (this.isNothing(value)) {
        return '-';
      }
      value = parseFloat(value);
      return parseFloat((value / 100).toFixed(precision));
    },
    calCharLength(value) {
      if (!value) {
        return 0;
      }
      let len = 0;
      for (let i = 0; i < value.length; i++) {
        const c = value.charCodeAt(i);
        if (c > 127) {
          len += 2;
        } else {
          len++;
        }
      }
      return len;
    },
    convertDateToString(date) {
      if (!date) {
        return;
      }
      if (typeof date === 'string') {
        return date;
      } else {
        return moment(date).format('YYYY-MM-DD');
      }
    },
    checkEmpty(data) {
      if (this.isNothing(data)) {
        return '-';
      }
      return data;
    },
    addKey(data) {
      if (data !== null) {
        let dataList = {};
        data.map((val, index) => {
          dataList = val;
          dataList['key'] = Date.now() + index;
        });
        return dataList;
      }
    },
    changeDate(num) {
      if (num > 0) {
        return moment()
          .add(num, 'days')
          .format('YYYY-MM-DD');
      } else {
        return moment()
          .subtract(Math.abs(num), 'days')
          .format('YYYY-MM-DD');
      }
    },
    // 老的
    formatNum(num) {
      if (this.isNothing(num)) {
        return '-';
      }
      num /= 100;
      num = num.toFixed(2);
      num = num.replace(/\B(?=(?:\d{3})+\b)/g, ',');
      return num;
    },
      // 老的
      formatNumlimt(num) {
        if (this.isNothing(num)) {
          return '不限';
        }
        num /= 100;
        num = num.toFixed(2);
        num = num.replace(/\B(?=(?:\d{3})+\b)/g, ',');
        return num;
      },
    formtNumThree(num) {
      if (this.isNothing(num)) {
        return '-';
      }
      num = num.toString();
      num = num.replace(/\B(?=(?:\d{3})+\b)/g, ',');
      return num;
    },
    // 百分比
    formatPercent(num) {
      if (this.isNothing(num)) {
        return '-';
      }
      num = parseFloat(num).toFixed(2);
      return num + '%';
    },
    // 清除cookie
    clearCookie(name) {
      setCookie(name, '', -1);
    },
    // 表格总计
    reckonCols(params) {
      if (!params.data || params.data.length == 0) {
        return null;
      }
      let footer = {};
      params.cols.map(col => {
        let allCols = params.data.map(el => {
          return el[col];
        });
        let countCols;
        allCols.map(num => {
          if (!this.isNothing(num)) {
            countCols = countCols ? countCols : 0;
            countCols += num;
          }
        });
        footer[col] = countCols === undefined ? '-' : countCols;
      });
      return footer;
    },
    // 计算比例
    gcd(m, n) {
      let r = 0;
      do {
        r = m % n;
        m = n;
        n = r;
      } while (r !== 0);
      return m;
    },
    checkStringLength(str) {
      // 检测字符长度，区分中英文
      let len = 0;
      for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
          len += 2;
        } else {
          len++;
        }
      }
      return len;
    },

    formatBankNum(num) {
      if (this.isNothing(num)) {
        return '-';
      }
      return num.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    },
    trim(str) {
      // 去掉前后空格
      return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
    },
    searchPushState(params) {
      let url = window.location.href;
      let _k = Util.getURLParameter('_k');
      url = Util.updateParameter(url, '_k', '');
      url = url.replace(/\?_k=|&_k=/, '');
      for (let key in params) {
        url = Util.updateParameter(url, key, params[key] || '');
      }

      url = Util.updateParameter(url, '_k', _k);
      window.history.replaceState({}, null, url);
    },
    division(a, b, digits = 2) {
      // 除法格式化
      if (!this.isNothing(a) && !this.isNothing(b) && b !== 0) {
        return (a / b).toFixed(digits);
      } else {
        return '-';
      }
    },
    toString(value) {
      if (value === null || value === undefined) {
        return '';
      }
      return value + '';
    },
    isNumber(value) {
      return typeof value === 'number';
    },
    calRows(pagination) {
      let displayRows = 0;
      if (pagination.pageSize > pagination.total) {
        displayRows = pagination.total;
      } else {
        if (pagination.current * pagination.pageSize > pagination.total) {
          displayRows = pagination.total;
        } else {
          displayRows = pagination.current * pagination.pageSize;
        }
      }
      return displayRows;
    },

    deleteCol(columns, name) {
      columns.map((el, index) => {
        if (el.dataIndex === name) {
          columns.splice(index, 1);
        }
      });
      return columns;
    },

    insertionSort(a, func, from, to) {
      // 排序
      for (var i = from + 1; i < to; i++) {
        var element = a[i];
        for (var j = i - 1; j >= from; j--) {
          var tmp = a[j];
          if (func(tmp, element) > 0) {
            a[j + 1] = tmp;
          } else {
            break;
          }
        }
        a[j + 1] = element;
      }
    },
    // 数字转化为大写金额
    digitUppercase(n) {
      if (this.isNothing(n)) {
        return null;
      }
      var fraction = ['角', '分'];
      var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
      var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
      var head = n < 0 ? '欠' : '';
      n = Math.abs(n);
      var s = '';
      for (var i = 0; i < fraction.length; i++) {
        s += (
          digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
        ).replace(/零./, '');
      }
      s = s || '整';
      n = Math.floor(n);
      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
      }
      return (
        head +
        s
          .replace(/(零.)*零元/, '元')
          .replace(/(零.)+/g, '零')
          .replace(/^整$/, '零元整')
      );
    },

    quickSort(array) {
      // 快速排序
      var i = 0;
      var j = array.length - 1;
      var sort = function (i, j) {

        // 结束条件
        if (i == j) {
          return
        }

        var key = array[i];
        var stepi = i;
        var stepj = j;
        while (j > i) {
          if (array[j] >= key) {
            j--;
          } else {
            array[i] = array[j]
            while (j > ++i) {
              if (array[i] > key) {
                array[j] = array[i];
                break;
              }
            }
          }
        }

        // 如果第一个取出的 key 是最小的数
        if (stepi == i) {
          sort(++i, stepj);
          return;
        }

        // 最后一个空位留给 key
        array[i] = key;

        // 递归
        sort(stepi, i);
        sort(j, stepj);
      }

      sort(i, j);

      return array;
    },

    /**
     * 保留n位小数，不四舍五入
     * @param {number} num
     * @param {number} decimal
     * @returns {number}
     */
    formatDecimal(num, decimal) {
      num = num.toString()
      let index = num.indexOf('.')
      if (index !== -1) {
        num = num.substring(0, decimal + index + 1)
      } else {
        num = num.substring(0)
      }
      return parseFloat(num).toFixed(decimal)
    },

    /**
     *按系数转换数据单位，保留不同精度
     *
     * @param {*} num
     * @param {number} [precision=2] 精度，小数后几位
     * @param {number} [coefficient=0.01] 单位转换的系数
     * @returns {number}
     */
    convertUnitToFixed(num, precision = 2, coefficient = 0.001) {
      if (this.isNothing(num)) {
        return '-';
      }
      num *= coefficient;
      num = num.toFixed(precision);
      num = num.replace(/\B(?=(?:\d{3})+\b)/g, ',');
      return num;
    },
    /**
     * 获取视频的第一秒那一帧作为缩略图进行展示
     * @param {string} file
     */
    getVideoSnapshot(file) {
      if (file.match(/.mp4/) && !file.includes('?x-oss-process=video/snapshot,t_1000,m_fast,w_200')) {
        return file + '?x-oss-process=video/snapshot,t_1000,m_fast,w_200'
      } else {
        return file
      }
    },
    snapshotRollback(file) {
      if (file.includes('?x-oss-process=video/snapshot,t_1000,m_fast,w_200')) {
        return file.split('?x-oss-process=video/snapshot,t_1000,m_fast,w_200')[0]
      } else {
        return file
      }
    },
    getEnv() {
      const url = window.location.href;
      let env = 'dev';
      if (url.includes('tuiatest')) {
        env = 'test';
      } else if (url.includes('tuiapre')) {
        env = 'pre';
      } else {
        env = '';
      }
      return env;
    },
    isEqual(a, b) {
      return String(a) === String(b)
    }
  };
})();

export default Util;
