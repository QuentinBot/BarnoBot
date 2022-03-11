const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data : new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Displays the current queue"),
    async execute(interaction) {
        if (typeof queue === "undefined" || queue.length === 0){
            interaction.reply("Queue is empty")
        }
        else {
            interaction.reply("Queue:");
            for (i in queue){
                interaction.channel.send((parseInt(i)+1).toString() + ": " + queue[i]);
            }
        }
    },
};