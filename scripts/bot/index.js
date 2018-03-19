/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/3/19
 * @description 
 */
const minimatch = require('minimatch')
const { promisify } = require('util')
const { join } = require('path')
const { resolve } = require('url')
const { loadFront } = require('picidae/lib/lib/utils/loadFront')
const cp = require('child_process')

const {
  publicPath = '/',
  host = 'http://eux.baidu.com/'
} = require('../../picidae.config')

const getStagedFiles = require('./staged-git-files')
const formatMessage = require('./formatMessage')

getStagedFiles.includeContent = true
getStagedFiles.cwd = join(__dirname, '../..')


function adaptorToMessage({ content, filename }) {
  const { __content, ...meta } = loadFront(content)

  const url = resolve(host,
    resolve(
      publicPath,
      filename.replace(/^doc(?=\/)/, 'blog').replace(/\.(md|markdown)/i, '')
    )
  )
  // doc/fe/name -> blog/fe/name
  return {
    title: meta.title,
    url: url,
    author: meta.author
  }
}

async function sendMessage(message) {
  try {
    const data = await promisify(cp.exec)(
      'curl -s "http://qy.im.baidu.com/msgt/api/sendMsgToGroup?access_token=$ROBOT_TOKEN"' +
      ` -d ${JSON.stringify(
          JSON.stringify({
            'to': 1605096,
            'access_token': process.env.ROBOT_TOKEN,
            'msg_type': 'text',
            'content': message
          })
        )}`
    )
    console.log(data)
  } catch (ex) {
    console.error(ex)
  }
}

;(async () => {
  const p = promisify(getStagedFiles)
  const statusList = await p(
    // diff-filter
    'ACDMRTUX',
    // commit_a...commit_b
    process.env.TRAVIS_COMMIT_RANGE || 'HEAD'
  )
  const mdStatusList = statusList
    .filter(status => minimatch(status.filename, 'doc/**/*.{md,MD,markdown}', { matchBase: true }))

  if (!mdStatusList.length) {
    console.log('未发现改动的markdown文件')
    return
  }
  process.env.CI && console.log(mdStatusList)

  const messageList = []
  mdStatusList
    .forEach(change => {
      switch (change.status) {
        case 'Added':
          messageList.push(formatMessage(
            adaptorToMessage(change)
          ))
          break
        // case 'Copied':
        // case 'Deleted':
        case 'Modified':
          messageList.push(formatMessage(
            adaptorToMessage(change)
          ))
          break
        // case 'Renamed':
        // case 'Type-Change':
        // // Type-Change (T) [i.e. regular file, symlink, submodule, etc.]
        // case 'Unmerged':
        // case 'Unknown':
        //   break
      }
    })

  messageList.forEach(async message => {
    await sendMessage(message)
  })
})()