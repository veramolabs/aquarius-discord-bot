import { Message } from 'discord.js'
import { verificationAgent } from './verification-agent'

// Anyone who presents this type of credential:
const policy = {
  type: ['VerifiableCredential', 'DiscordRole'],
  issuer: {
    id: 'did:ethr:rinkeby:0x02a4d2531912c55104553a1ebecfdd8c1d8e32d1509dee3fc39a6b3fe010269cd4',
  },
  credentialSubject: {
    name: 'member',
    guild: {
      id: '938029822070886420',
    },
  },
}

// Will receive this role
const localRole = 'member'

// This function is called for every incoming Discord message in channels where this bot has access to
export async function verifyMembers(message: Message<boolean>) {
  // Ignore bot messages (own replies)
  if (message.author.bot) return

  // Process every attachment
  message.attachments.map(async (attachment) => {
    try {
      // Try to verify credentials in the attached file
      const { credentials } = await verificationAgent.handleMessage({
        raw: attachment.url,
      })

      // Check each credential if it matches predefined policy
      credentials?.map(async (vc) => {
        if (
          vc.credentialSubject.id === message.author.id &&
          vc.issuer.id === policy.issuer.id &&
          vc.credentialSubject?.guild?.id === policy.credentialSubject.guild.id &&
          vc.credentialSubject.name === policy.credentialSubject.name
        ) {
          // Match found! Let's add new role to the author of this message
          const role = message.guild?.roles.cache.find((r) => r.name === localRole)
          if (role) {
            await message.member?.roles.add(
              role,
              `For proving their membership with a VC issued by: ${vc.issuer.id}`,
            )
            message.reply(`User ${message.member?.displayName} received ${role.name} role`)
          }
        }
      })
    } catch (e: any) {
      console.log(e.message)
    }
  })
}
