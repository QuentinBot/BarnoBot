const fs = require("fs");
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const { token } = require("./config.json");

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('/help for help', { type: "WATCHING" });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    if (!interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")) {
        if (interaction.guild.me.permissionsIn(interaction.channel).has("ADD_REACTIONS")) interaction.reply("♿ Please use the Botchannel... ♿");
        return; 
    };

    try {
        await command.execute(interaction);
    } catch (e) {
        console.error(e);
        await interaction.reply({ content : "There was an error while executing this command!", ephemeral : true });
    }

});

client.login(token);

