/**
 * @file formatMessage
 * @author Cuttle Cong
 * @date 2018/3/19
 * @description 
 */

module.exports = function formatMessage({ author, title, url }) {
  return [
    '【EUX Blog 提醒】',
    `${author} 发布了文章《${title}》`,
    `大家快来围观吧😀 >>> ${encodeURI(url)}`
  ].join('\n')
}