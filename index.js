const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { token } = require("./config.json");

let connection;
let player;
let resource;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('/help for help', { type: "WATCHING" });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (!interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")) {
        if (interaction.guild.me.permissionsIn(interaction.channel).has("ADD_REACTIONS")) interaction.reply("♿ Please use the Botchannel... ♿");
        return; 
    };

    if (commandName === 'ping') {
        await interaction.reply('pong!');
    }
    else if (commandName === "server"){
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    }
    else if (commandName === "user"){
        await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
    }
    else if (commandName === "join"){
        if (interaction.member.voice.channel){
            connection = joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.channel.guild.voiceAdapterCreator,
            });
            interaction.reply("Joining voice channel...");
        
            resource = createAudioResource('./rick.mp3');
            player = createAudioPlayer();
            connection.subscribe(player);
            player.play(resource);
            console.log("Playback has started!");
        }
        else {
            interaction.reply("ERROR: You have to be in a voice channel to start the bot...");
        }
        
    }
    else if (commandName === "leave"){
        if (connection && connection.state.status != "destroyed"){
            interaction.reply("Leaving voice channel...");
            connection.destroy();
        }
        else {
            interaction.reply("ERROR: Connection has to be established first...")
        }
        
    }
});

client.login(token);

