const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Get information about a user.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('The user to get info about')
        .setRequired(false)),
  async execute(interaction) {
    const target = interaction.options.getUser('target') || interaction.user;
    const member = await interaction.guild.members.fetch(target.id);
    
    const embed = new EmbedBuilder()
      .setTitle(`User Info: ${target.tag}`)
      .setThumbnail(target.displayAvatarURL({ dynamic: true }))
      .setColor('#0099ff')
      .addFields(
        { name: 'Username', value: target.username, inline: true },
        { name: 'Discriminator', value: `#${target.discriminator}`, inline: true },
        { name: 'ID', value: target.id, inline: true },
        { name: 'Account Created', value: `<t:${Math.floor(target.createdAt.getTime() / 1000)}:F>`, inline: false },
        { name: 'Joined Server', value: `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:F>`, inline: false },
        { name: 'Roles', value: member.roles.cache.map(role => role.toString()).slice(0, -1).join(', ') || 'None', inline: false }
      )
      .setFooter({ text: `Requested by ${interaction.user.tag}` })
      .setTimestamp();
    
    await interaction.reply({ embeds: [embed] });
  },
};