import { Client, Intents } from "discord.js";
import fetch from "cross-fetch";
const token = "OTM4MDMwMDQ5MDQxNDYxMjY5.YfkWjw.szMfYuJsdKMlvKCosjKkjrVKKmY";

// https://stackoverflow.com/a/67799671/10571155

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", async (message) => {
  if (message.author.bot) return;

	message.attachments.map( async attachment => {
    // const contents = await (await fetch(attachment.url)).text();
    // console.log(contents);
    // verify
		const role = message.guild?.roles.cache.find(r => r.name === "member");
		if (role) {
			await message.member?.roles.add(
				role,
				"For proving their membership with a VC issued by: Collab.land"
			);
			message.reply(
				`User ${message.member?.displayName} received ${role.name} role`
			);
		}

	})

});
client.login(token);
