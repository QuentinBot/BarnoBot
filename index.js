const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, AudioPlayerStatus, getVoiceConnections } = require('@discordjs/voice');
const { token } = require("./config.json");

let text_channel_id = "936922604894289960";
let connection;
let player;
let resource;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(client.guilds.cache.size +' server', { type: "WATCHING" });
    client.channels.cache.get(text_channel_id).send("The bot is online and ready to help!");
});

client.on('messageCreate', msg => {
    
    if (msg.channelId != text_channel_id) return;

    if (msg.content === 'ping') {
        msg.reply('pong!');
    }
    else if (msg.content === "join"){
        if (msg.member.voice.channel){
            connection = joinVoiceChannel({
                channelId: msg.member.voice.channelId,
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
        else {
            client.channels.cache.get(text_channel_id).send("You have to be in a voice channel to start the bot...");
        }
        
    }
    else if (msg.content === "leave"){
        connection.destroy();
        client.channels.cache.get(text_channel_id).send("Leaving voice channel...");
    }
});

client.login(token);

