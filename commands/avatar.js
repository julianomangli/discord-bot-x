const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get a user\'s avatar.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user whose avatar to display')
        .setRequired(false)),
  async execute(interaction) {
    const target = interaction.options.getUser('target') || interaction.user;
    
    const embed = new EmbedBuilder()
      .setTitle(`${target.tag}'s Avatar`)
      .setImage(target.displayAvatarURL({ dynamic: true, size: 512 }))
      .setColor('#ff69b4')
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  },
};