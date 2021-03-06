const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const ytdl = require("ytdl-core");
const yts = require("yt-search");

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

            if (typeof connection === "undefined" || connection.state.status === "destroyed"){
                connection = joinVoiceChannel({
                    channelId: interaction.member.voice.channelId,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.channel.guild.voiceAdapterCreator,
                });
                player = createAudioPlayer();
                player.addListener("stateChange", (oldOne, newOne) => {
                    if (newOne.status == "idle"){
                        interaction.channel.send("Song finished");
                        this.play(interaction);
                    }
                });
                connection.subscribe(player);
                interaction.channel.send("Joining voice channel...");
                queue = [];
            }
            queue.push(songname);
            interaction.channel.send(`Added ${songname} to the queue`);
            if (player.state.status === "idle") this.play(interaction);
        }
        else {
            interaction.reply("ERROR: You have to be in a voice channel to start the bot...");
        }
        
    },
    async play(interaction){
        if (queue.length == 0) return;
        songname = queue.shift();
        song_url = (await yts(songname)).videos[0].url;
        interaction.channel.send(`Now playing ${song_url}`);
        const song = await ytdl(song_url, { filter : "audioonly" });

        resource = createAudioResource(song);
        player.play(resource)
    }
};
