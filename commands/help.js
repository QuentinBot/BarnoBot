const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data : new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows a help message to explain what to do."),
    async execute(interaction) {
        await interaction.reply("Start by typing /, then look for a command that piques your interest")
    },
};