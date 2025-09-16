const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll a dice.')
    .addIntegerOption(option =>
      option.setName('sides')
        .setDescription('Number of sides on the dice (default: 6)')
        .setRequired(false)
        .setMinValue(2)
        .setMaxValue(100))
    .addIntegerOption(option =>
      option.setName('count')
        .setDescription('Number of dice to roll (default: 1)')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(10)),
  async execute(interaction) {
    const sides = interaction.options.getInteger('sides') || 6;
    const count = interaction.options.getInteger('count') || 1;
    
    const results = [];
    for (let i = 0; i < count; i++) {
      results.push(Math.floor(Math.random() * sides) + 1);
    }
    
    const total = results.reduce((sum, roll) => sum + roll, 0);
    
    if (count === 1) {
      await interaction.reply(`🎲 You rolled a **${results[0]}** on a ${sides}-sided die!`);
    } else {
      await interaction.reply(`🎲 You rolled ${count} ${sides}-sided dice:\n**Rolls:** ${results.join(', ')}\n**Total:** ${total}`);
    }
  },
};