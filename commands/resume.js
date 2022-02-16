const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data : new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the current audio"),
    async execute(interaction) {
        if (typeof player === "undefined" || player.state.status != "paused"){
            interaction.reply("ERROR: Audio needs to be playing first...")
        }
        else {
            interaction.reply("Resuming audio...");
            player.unpause();
        }
    },
};