/*!
 * Insert Copyright Statement Here
 */

import { bot, deleteTimeout, serverID } from './Main'

import * as Discord from 'discord.js'

export function RandomTestFunction(message: Discord.Message, args: string[]) {
  message.channel.send(`The command sent: ${message.content}`)
    .then((sent: Discord.Message) => { sent.delete(deleteTimeout * 1000) })
}

export function rollTheDie(message: Discord.Message) {
  const dieLookup = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:']

  message.channel.send(`${message.author} rolled a ${dieLookup[Math.floor(Math.random() * 6)]}`)
    .then((sent: Discord.Message) => {sent.delete(deleteTimeout * 1000) })
}

export function kickTheScrub(message: Discord.Message, args: string[]) {
  const guild = bot.guilds.find('id', serverID)
  let players: string[] = []

  guild.channels.forEach((channel: Discord.GuildChannel, name: string) => {
    if (!(channel instanceof Discord.VoiceChannel)) { return }
    if (players.length > 0) { return }

    if (channel.members.has(message.author.id)) {
      channel.members.forEach((member: Discord.GuildMember, id: string) => {
        if (!member.user.bot) { players.push(id) }
      })
    }
  })

  const kickedPlayer = Math.floor(Math.random() * players.length)
  const kickedID = players[kickedPlayer]

  message.channel.send(`Sorry <@${kickedID}>, you gotta go`)
    .then((sent: Discord.Message) => { sent.delete((deleteTimeout * 2) * 1000) })
}
