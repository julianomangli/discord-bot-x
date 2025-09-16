const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Create a poll with up to 10 options.')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('The poll question')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('option1')
        .setDescription('First poll option')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('option2')
        .setDescription('Second poll option')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('option3')
        .setDescription('Third poll option')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('option4')
        .setDescription('Fourth poll option')
        .setRequired(false))
    .addStringOption(option =>
      option.setName('option5')
        .setDescription('Fifth poll option')
        .setRequired(false)),
  async execute(interaction) {
    const question = interaction.options.getString('question');
    const options = [];
    
    for (let i = 1; i <= 5; i++) {
      const option = interaction.options.getString(`option${i}`);
      if (option) options.push(option);
    }
    
    const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'];
    const pollOptions = options.map((option, index) => `${emojis[index]} ${option}`).join('\n');
    
    const embed = new EmbedBuilder()
      .setTitle('📊 Poll')
      .setDescription(`**${question}**\n\n${pollOptions}`)
      .setColor('#ffcc00')
      .setFooter({ text: `Poll created by ${interaction.user.tag}` })
      .setTimestamp();
    
    const message = await interaction.reply({ embeds: [embed], fetchReply: true });
    
    // Add reactions for voting
    try {
      for (let i = 0; i < options.length; i++) {
        await message.react(emojis[i]);
      }
    } catch (error) {
      console.error('Error adding poll reactions:', error);
      // Poll still works without reactions, so don't fail the command
    }
  },
};