module.exports = {
    name : "interactionCreate",
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        if (!interaction.guild.me.permissionsIn(interaction.channel).has("SEND_MESSAGES")) {
            if (interaction.guild.me.permissionsIn(interaction.channel).has("ADD_REACTIONS")) interaction.reply("♿ Please use the Botchannel... ♿");
            return; 
        };
    
        try {
            await command.execute(interaction);
        } catch (e) {
            console.error(e);
            await interaction.reply({ content : "There was an error while executing this command!", ephemeral : true });
        }
    },
};