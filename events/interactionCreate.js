const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) {
      return interaction.reply({ content: 'Command not found.', ephemeral: true });
    }

    try {
      await command.execute(interaction, client);
    } catch (err) {
      console.error(err);
      if (interaction.deferred || interaction.replied) {
        await interaction.followUp({ content: '⚠️ There was an error executing this command.', ephemeral: true });
      } else {
        await interaction.reply({ content: '⚠️ There was an error executing this command.', ephemeral: true });
      }
    }
  }
};