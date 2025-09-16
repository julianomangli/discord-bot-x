const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('joke')
    .setDescription('Get a random joke.'),
  async execute(interaction) {
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      
      if (!response.ok) {
        throw new Error('Joke API unavailable');
      }
      
      const joke = await response.json();
      await interaction.reply(`😄 **${joke.setup}**\n\n||${joke.punchline}||`);
    } catch (error) {
      console.error('Error fetching joke:', error);
      
      // Fallback jokes if API is down
      const fallbackJokes = [
        { setup: "Why don't scientists trust atoms?", punchline: "Because they make up everything!" },
        { setup: "What do you call a fake noodle?", punchline: "An impasta!" },
        { setup: "Why did the scarecrow win an award?", punchline: "He was outstanding in his field!" },
        { setup: "What's the best thing about Switzerland?", punchline: "I don't know, but the flag is a big plus!" },
        { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up!" }
      ];
      
      const joke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
      await interaction.reply(`😄 **${joke.setup}**\n\n||${joke.punchline}||`);
    }
  },
};