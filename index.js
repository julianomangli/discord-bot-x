require('dotenv').config();

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message]
});

// Enhanced logging function
function log(level, message, error = null) {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  
  if (level === 'error' && error) {
    console.error(`${prefix} ${message}`, error);
  } else {
    console.log(`${prefix} ${message}`);
  }
}

// command loader with enhanced error handling
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');

try {
  const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));
  log('info', `Loading ${commandFiles.length} command files...`);
  
  for (const file of commandFiles) {
    try {
      const cmd = require(path.join(commandsPath, file));
      if (cmd?.data?.name && typeof cmd.execute === 'function') {
        client.commands.set(cmd.data.name, cmd);
        log('info', `Loaded command: ${cmd.data.name}`);
      } else {
        log('warn', `Skipping invalid command file: ${file} - Missing data.name or execute function`);
      }
    } catch (error) {
      log('error', `Failed to load command file: ${file}`, error);
    }
  }
} catch (error) {
  log('error', 'Failed to read commands directory', error);
  process.exit(1);
}

// event loader with enhanced error handling
const eventsPath = path.join(__dirname, 'events');

try {
  const eventFiles = fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'));
  log('info', `Loading ${eventFiles.length} event files...`);
  
  for (const file of eventFiles) {
    try {
      const event = require(path.join(eventsPath, file));
      if (event?.name && typeof event.execute === 'function') {
        if (event.once) {
          client.once(event.name, (...args) => {
            try {
              event.execute(...args, client);
            } catch (error) {
              log('error', `Error in ${event.name} event`, error);
            }
          });
        } else {
          client.on(event.name, (...args) => {
            try {
              event.execute(...args, client);
            } catch (error) {
              log('error', `Error in ${event.name} event`, error);
            }
          });
        }
        log('info', `Loaded event: ${event.name}`);
      } else {
        log('warn', `Skipping invalid event file: ${file} - Missing name or execute function`);
      }
    } catch (error) {
      log('error', `Failed to load event file: ${file}`, error);
    }
  }
} catch (error) {
  log('error', 'Failed to read events directory', error);
  process.exit(1);
}

// Enhanced error handling for client login and global errors
client.on('error', error => {
  log('error', 'Discord client error', error);
});

client.on('warn', warning => {
  log('warn', `Discord client warning: ${warning}`);
});

process.on('unhandledRejection', (reason, promise) => {
  log('error', 'Unhandled promise rejection', reason);
});

process.on('uncaughtException', error => {
  log('error', 'Uncaught exception', error);
  process.exit(1);
});

// Login with enhanced error handling
async function startBot() {
  try {
    if (!process.env.DISCORD_TOKEN) {
      throw new Error('DISCORD_TOKEN is not set in environment variables');
    }
    
    log('info', 'Attempting to login to Discord...');
    await client.login(process.env.DISCORD_TOKEN);
  } catch (error) {
    log('error', 'Failed to login to Discord', error);
    process.exit(1);
  }
}

startBot();