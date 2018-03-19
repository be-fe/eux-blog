/**
 * @file formatMessage
 * @author Cuttle Cong
 * @date 2018/3/19
 * @description 
 */

module.exports = {
  TITLE: '【EUX Blog 提醒】',
  detail({ author, title, url }) {
    return [
      `${author} 发布了文章《${title}》`,
      `大家快来围观吧😀 >>> ${encodeURI(url)}`
    ].join('\n')
  },
  simple({ author, title, url }) {
    return [
      `${author} 发布了文章《${title}》，围观地址：`,
      `${encodeURI(url)}`
    ].join('\n')
  }
}