const Discord = require("discord.js"); // The last version that can be used in this script is 12.5.3
const client = new Discord.Client();

client.once("ready", () => {
    console.log("Ready!");
});

client.on("message", async message => {
    if (message.content == "?createGuild") {
        if (client.guilds.cache.size > 10 || client.guilds.cache.size == 10) {
            message.reply("I cannot create a new guild. Because I'm on **" + client.guilds.cache.size + "** servers.");
        } else {
            const Guild = await client.guilds.create("Test Guild", {
                channels: [
                    { "name": "invite-channel" },
                ]
            });
            const GuildChannel = Guild.channels.cache.find(channel => channel.name == "invite-channel");
            const Invite = await GuildChannel.createInvite({ maxAge: 0, unique: true, reason: "Testing." });
            message.channel.send(`Created guild. Here's the invite code: ${Invite.url}`);
            message.reply("I'm on **" + client.guilds.cache.size + "** server now.")
        }
    };
});

client.login("bot_token");
