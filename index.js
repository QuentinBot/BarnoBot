const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const { token } = require("./config.json");

//temporary(?) for bot startup message
let text_channel_id = "936922604894289960";

let connection;
let player;
let resource;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(client.guilds.cache.size +' server', { type: "WATCHING" });
    
    // temporary, making sure the bot starts up
    client.channels.cache.get(text_channel_id).send("The bot is online and ready to help!");
});

client.on('messageCreate', msg => {
    
    if (!msg.guild.me.permissionsIn(msg.channel).has("SEND_MESSAGES")) {
        if (msg.guild.me.permissionsIn(msg.channel).has("ADD_REACTIONS")) msg.react("♿");
        return; 
    };

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
            msg.channel.send("Joining voice channel...");
        
            resource = createAudioResource('./rick.mp3');
            player = createAudioPlayer();
            connection.subscribe(player);
            player.play(resource);
            console.log("Playback has started!");
        }
        else {
            msg.channel.send("You have to be in a voice channel to start the bot...");
        }
        
    }
    else if (msg.content === "leave" && connection && connection.state.status != "destroyed"){
        connection.destroy();
        msg.channel.send("Leaving voice channel...");
    }
});

client.login(token);

