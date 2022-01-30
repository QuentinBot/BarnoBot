const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, AudioPlayerStatus, getVoiceConnections } = require('@discordjs/voice');
const { token } = require("./config.json");

let text_channel_id = "936922604894289960";
let voice_channel_id = "936935106290004019";
let guild_id = "153847445153906688";
let connection;
let player;
let resource;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(client.guilds.cache.size +' server', { type: "WATCHING" });
    client.channels.cache.get(text_channel_id).send("The bot is online and ready to help!");
});

client.on('messageCreate', msg => {
    
    if (msg.content === 'ping') {
        msg.reply('pong!');
        console.log(msg.editable)
    }
    else if (msg.content === "join"){
        connection = joinVoiceChannel({
            channelId: voice_channel_id,
            guildId: msg.guildId,
            adapterCreator: msg.channel.guild.voiceAdapterCreator,
        });
        client.channels.cache.get(text_channel_id).send("Joining voice channel...");
        
        resource = createAudioResource('./rick.mp3');
        player = createAudioPlayer();
        connection.subscribe(player);
        player.play(resource);
        console.log("Playback has started!");
    }
    else if (msg.content === "leave"){
        connection.destroy();
        client.channels.cache.get(text_channel_id).send("Leaving voice channel...");
    }
});

client.login(token);

