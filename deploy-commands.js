require('dotenv').config();

const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))) {
  const cmd = require(path.join(commandsPath, file));
  if (cmd?.data) commands.push(cmd.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    // Fast per-guild registration for development
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log(`✅ Registered ${commands.length} guild commands.`);
    // When ready to go global (slow propagation), uncomment below:
    // await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    // console.log('🌍 Registered global commands.');
  } catch (err) {
    console.error('Failed to register commands:', err);
  }
})();