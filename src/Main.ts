/*!
 * Insert Copyright Statement Here
 * we dont have one
 */

import { RandomTestFunction, rollTheDie, kickTheScrub } from './Functions'

import * as Discord from 'discord.js'

const clientToken = 'idiot'

export const serverID = '126066448635396096'
export const deleteTimeout = 15

// Create new discord bot client
export const bot = new Discord.Client()

interface Commands {
  [index: string]: (message: Discord.Message, args?: string[]) => any
}

const commandList: Commands = {
  ping: (message: Discord.Message) => {
    message.channel.send('Pong!')
      .then((sent: Discord.Message) => { sent.delete(deleteTimeout * 1000) })
  },
  test: RandomTestFunction,
  roll: rollTheDie,
  kickplayer: kickTheScrub,
}

// Event listener for all new messages
bot.on('message', (message: Discord.Message) => {
  if (message.content.startsWith('!')) {
    message.delete()

    const command: string[] = message.content.split(" ")
    command[0] = command[0].substring(1).toLowerCase()

    console.log(`${message.author.username}: ${message.content}`)
    console.log(` > ${command[0]} ${typeof commandList[command[0]]}`)

    if (commandList[command[0]] !== undefined) {
      commandList[command[0]](message, command)
    } else {
      message.channel.send(`Sorry, ${message.content} is not a command`)
        .then((sent: Discord.Message) => { sent.delete(deleteTimeout * 1000) })
    }
  }
})

bot.login(clientToken)
