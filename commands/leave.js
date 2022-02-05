const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data : new SlashCommandBuilder()
        .setName("leave")
        .setDescription("Leaves the voice channel"),
    async execute(interaction) {
        if (typeof connection !== "undefined" && connection.state.status != "destroyed"){
            interaction.reply("Leaving voice channel...");
            connection.destroy();
        }
        else {
            interaction.reply("ERROR: Connection needs to be established first...")
        }
    },
};