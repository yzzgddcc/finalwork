/* 格式化时间对象 */
module.exports.dateFormat = (params) => {
    const dt = new Date(params)//创建时间对象
    const yy = dt.getFullYear()//年
    const qt = Math.floor((dt.getMonth() + 3) / 3); //季度
    const mm = (dt.getMonth() + 1 + '').padStart(2, '0')//月(padStart:字符串不满2位数,开头补全'0')
    const dd = (dt.getDate() + '').padStart(2, '0')//日
    const wk = "星期" + "日一二三四五六".charAt(dt.getDay()); //星期
    const hh = (dt.getHours() + '').padStart(2, '0')//时
    const mi = (dt.getMinutes() + '').padStart(2, '0')//分
    const ss = (dt.getSeconds() + '').padStart(2, '0')//秒
    const ms = dt.getMilliseconds(); //毫秒
    return `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`
    // return `${yy}${mm}${dd}${hh}${mi}${ss}`
};
