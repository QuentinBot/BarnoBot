const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");


module.exports = {
    data : new SlashCommandBuilder()
        .setName("play")
        .setDescription("Joins the voice channel and plays the specified song")
        .addStringOption(option => 
            option.setName("songname")
                .setDescription("The name of the song you want to play")
                .setRequired(true)),
    async execute(interaction) {
        
        
        if (interaction.member.voice.channel){
            let songname = interaction.options.getString("songname");
            interaction.reply(`Finding song ${songname}...`)

            if (typeof connection === "undefined" || connection.state.status != "destroyed"){
                connection = joinVoiceChannel({
                    channelId: interaction.member.voice.channelId,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.channel.guild.voiceAdapterCreator,
                });
                // ignore for now, add queue later!!
                queue = []; 
                interaction.channel.send("Joining voice channel...");
            }

            const song = await ytdl(songname, { filter : "audioonly" })

            resource = createAudioResource(song);
            player = createAudioPlayer();
            connection.subscribe(player);
            player.play(resource);
            console.log("Playback has started!");
        }
        else {
            interaction.reply("ERROR: You have to be in a voice channel to start the bot...");
        }
        
    },
};