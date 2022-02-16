const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data : new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current audio"),
    async execute(interaction) {
        if (typeof player === "undefined" || player.state.status != "playing"){
            interaction.reply("ERROR: Audio needs to be playing first...")
        }
        else {
            interaction.reply("Pausing audio...");
            player.pause();
        }
    },
};