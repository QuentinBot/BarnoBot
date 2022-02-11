const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data : new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current audio"),
    async execute(interaction) {
        if (typeof connection !== "undefined" && connection.state.status != "destroyed"){
            interaction.reply("Pausing audio...");
            player.pause();
        }
        else {
            interaction.reply("ERROR: Audio needs to be playing first...")
        }
    },
};