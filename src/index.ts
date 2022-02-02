require("cross-fetch/polyfill");
import { Client, Intents } from "discord.js";
import { verifyMembers } from "./verify-members";

const token = "OTM4MDMwMDQ5MDQxNDYxMjY5.YfkWjw.szMfYuJsdKMlvKCosjKkjrVKKmY";

// https://stackoverflow.com/a/67799671/10571155

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on("message", verifyMembers);

client.once("ready", () => {
  console.log("Ready!");
});

client.login(token);
