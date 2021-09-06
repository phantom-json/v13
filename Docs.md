# Discord.js v13 Docs

This is a full in depth guide to djs v13, this guide includes. this tutorial assumes you know how to and have installed vscode.

1. basic setup of a bot, windows & linux
2. adding basic guild specific slash commands
3. adding global slash commands
4. organizing slash commands
5. adding regular commands 
---
## 1) Basic bot setup for windows and linux
### Windows

The first thing you need to do is install node from this link [here](https://nodejs.org/en/).
After installing open a new file in vscode, make a new file named [index.ts](https://github.com/phantom-json/v13/blob/master/index.ts). open a new terminal and start a new package using `npm init`

Now we have our project set up we can install our dependencies. opening the terminal we run.
> npm install discord.js dotenv<br/>
> npm install nodemon --save-dev<br/>
> npm install -g typescript ts-node

We then need to initialize a tsconfig, we do this with `tsc -init`.

### Linux

To start we must install node we can do this with the node version manager or nvm for short. run `sudo apt install nvm` after that is installed we must run `nvm install node` to install the latest version of node.
After installing open a new file in vscode, make a new file named [index.ts](https://github.com/phantom-json/v13/blob/master/index.ts). open a new terminal and start a new package using `npm init`

Now we have our project set up we can install our dependencies. opening the terminal we run.
> npm install discord.js dotenv<br/>
> npm install nodemon --save-dev<br/>
> npm install -g typescript ts-node

We then need to initialize a tsconfig, we do this with `tsc -init`.
### Writing the code
We can now start writing our code, below is an example. 

```typescript
    import DiscordJS, { Intents } from 'discord.js'
    import dotenv from 'dotenv'
    dotenv.config()

    const client = new DiscordJS.Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES
        ]
    })

    client.on('ready', () => {
        console.log(`the bot is ready`)
    })

    client.on('messageCreate', (message) => {
        if (message.content === 'ping') {
            message.reply({
                content: "pong",
            })
        }
    })

    client.login(process.env.TOKEN)
```

---
```typescript
import DiscordJS, { Intents } from 'discord.js'<br/>
import dotenv from 'dotenv'<br/>
dotenv.config()<br/>
```
these few lines import our dependencies from our [package.json](https://github.com/phantom-json/v13/blob/master/package.json) file. 

---
```typescript
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILDS_MESSAGES
    ]
})
```
The first line of this code creates a new Discord.js client that we can interact with. 
Intents state what your bot intends to use, all guilds use `Intents.FLAGS.GUILDS` but you will also need `Intents.FLAGS.GUILDS_MESSAGES` as this allows our bot to read messages and listen for commands. 
you can read more about intents [here](https://discord.js.org/#/docs/main/stable/class/Intents) and find an intents calculator [here](https://ziad87.net/intents/)

---
```typescript
client.on('ready', () => {
    console.log('the bot is ready') 
})
```
`client.on` is your standard event listener, in our case it is listening for the ready event. this checks if the bot is online and if it has logged in correctly, if that is true then it logs 'the bot is ready' to the console. 

---
```typescript
client.on('messageCreate', (message) => {
    if (message.content === 'ping') {

            message.reply({
                content: "pong",
            })
        }
  })
```
Here again we see the `client.on` event listener. here it is listening for a new message (`messageCreate`) if the new message is equal to ping the bot replies with pong. this is the base of our commands.

---
### 2) Adding basic guild specific slash commands.

slash commands are a new feature added in discord version v13. slash commands give easy access to bot commands. 

```typescript
client.on('ready', () => {
    console.log(`the bot is ready`)
    
    const guildId = "763349277493559296"
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'replies with pong'
    })
})

client.on('interactionCreate', async (Interaction) => {
    if (!Interaction.isCommand()) {
        return
    }

    const { commandName, options} = Interaction

    if (commandName === 'ping') {
        Interaction.reply({
            content: 'pong',
            ephemeral: true,
        })
    }
})
```

---
The first step of creating a guild specific slash command is specifying a guild Id, and then finding the guild using the Id specified. we do this with
```typescript
const guildId = "763349277493559296"
const guild = client.guilds.cache.get(guildId)
let commands

if (guild) {
    commands = guild.commands
} else {
    commands = client.application?.commands
}
```

Next is to create the command name & description this can be done using a new function called `commands.create({})`. There are 5 options for this which can be found [here](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandData).

```typescript
commands?.create({
    name: 'ping',
    description: 'replies with pong'
})
```

Now that we have created our commands we must listen for them, we use our client listener `client.on()` as slash commands are a property of the client. we also check if the interaction is in fact a valid command. 

we then destructure the commandName and options from our interaction, now checking if the interaction is our command we assign a reaction using `interaction.reply({})` adding the content and ephemeral properties, content is what will be sent and ephemeral is if the reply will be shown privately or publicly.

```typescript
client.on('interactionCreate', async (Interaction) => {
    if (!Interaction.isCommand()) {
        return
    }

    const { commandName, options} = Interaction

    if (commandName === 'ping') {
        Interaction.reply({
            content: 'pong',
            ephemeral: true,
        })
    }
})
```

