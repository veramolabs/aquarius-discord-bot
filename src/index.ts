import { config } from 'dotenv'
config()
require('cross-fetch/polyfill')
import { Client, Intents } from 'discord.js'
import { verifyMembers } from './verify-members'
import { exportRoles } from './export-roles'

// https://stackoverflow.com/a/67799671/10571155
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
})

client.on('message', verifyMembers)
client.on('interactionCreate', exportRoles)

client.once('ready', () => {
  console.log('Ready!')
  console.log(
    `Invite bot: https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&scope=bot%20applications.commands&permissions=2415919104`,
  )
})

client.login(process.env.DISCORD_TOKEN)
