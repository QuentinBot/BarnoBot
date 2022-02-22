const { SlashCommandBuilder } = require("@discordjs/builders");
const playing = require("./play.js");

module.exports = {
    data : new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song"),
    async execute(interaction) {
        if (typeof player === "undefined" || player.state.status != "playing"){
            interaction.reply("ERROR: Audio needs to be playing first...")
        }
        else {
            interaction.reply("Skipping song...");
            player.stop();
        }
    },
};