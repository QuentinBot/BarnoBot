const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data : new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the current audio"),
    async execute(interaction) {
        if (typeof connection !== "undefined" && connection.state.status != "destroyed"){
            interaction.reply("Resuming audio...");
            player.unpause();
        }
        else {
            interaction.reply("ERROR: Audio needs to be playing first...")
        }
    },
};