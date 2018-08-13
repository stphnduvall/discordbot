/*!
 * Insert Copyright Statement Here
 * we dont have one
 */

import * as Discord from 'discord.js'

const clientToken = 'idiot'
const deleteTimeout = 15

// Create new discord bot client
const bot = new Discord.Client()

// Event listener for all new messages
bot.on('message', (message: Discord.Message) => {
  if (message.content.startsWith('!')) {
    message.delete()

    message.channel.sendMessage(`Command was: *${message.content}*`)
      .then((sent: Discord.Message) => { sent.delete(deleteTimeout * 1000) })
  }
})

bot.login(clientToken)
