const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('See all available commands.'),
  async execute(interaction, client) {
    const list = client.commands.map(c => `• \`/${c.data.name}\` — ${c.data.description}`).join('\n');
    const embed = new EmbedBuilder()
      .setTitle('Discord Bot X — Commands')
      .setDescription(list || 'No commands loaded.')
      .setFooter({ text: 'Built with discord.js v14' })
      .setTimestamp();
    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};