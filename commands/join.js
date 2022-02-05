const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');


module.exports = {
    data : new SlashCommandBuilder()
        .setName("join")
        .setDescription("Joins the voice channel and plays a song."),
    async execute(interaction) {
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
    },
};