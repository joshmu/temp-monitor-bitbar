#!/usr/bin/env /usr/local/bin/node

/*
Bitbar plugin to monitor my CPU Temperature.
Relies on  'iStats'
https://github.com/Chris911/iStats
note: filename structure infers refresh rate: {name}.{time}.{ext}
*/

const bitbar = require('bitbar')
const { exec } = require('child_process')

// used PATH to access other modules
const terminalCmd =
  'PATH="/usr/local/bin:$PATH" && istats cpu temp --value-only'
const bash = async (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        // console.error(`exec error: ${error}`);
        reject(error)
      }
      // console.log(`stdout: ${stdout}`);
      // console.error(`stderr: ${stderr}`);
      resolve(stdout)
    })
  })
}

const display = async () => {
  const temp = +Math.round(await bash(terminalCmd))
  return temp < 80 ? `${temp}°C` : `🔥${temp}°C🔥`
}

;(async () => {
  const menuicon = await display()
  bitbar([
    {
      text: menuicon,
      color: bitbar.darkMode ? 'white' : 'black',
      dropdown: false,
    },
  ])
})()
