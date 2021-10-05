# Discord.js v13 Docs

This is a full in depth guide to djs v13, this guide includes. this tutorial assumes you know how to and have installed vscode.

1. [Basic setup of a bot, windows & linux](https://github.com/phantom-json/v13/blob/master/Docs.md#1-basic-bot-setup-for-windows-and-linux)
2. [Adding basic guild specific slash commands](https://github.com/phantom-json/v13/blob/master/Docs.md#2-adding-basic-guild-specific-slash-commands)
3. [adding advanced commands and global slash commands](https://github.com/phantom-json/v13/blob/master/Docs.md#3-adding-advanced-commands-and-global-slash-commands)
4. [working with buttons](https://github.com/phantom-json/v13/blob/master/Docs.md#4-working-with-buttons)
5. [connecting to databases]()

---
## 1) Basic bot setup for windows and linux
### <u>Windows</u>

The first thing you need to do is install node from this link [here](https://nodejs.org/en/).
After installing open a new file in vscode, make a new file named [index.ts](https://github.com/phantom-json/v13/blob/master/index.ts). open a new terminal and start a new package using `npm init`

Now we have our project set up we can install our dependencies. opening the terminal we run.
> npm install discord.js dotenv<br/>
> npm install nodemon --save-dev<br/>
> npm install -g typescript ts-node

We then need to initialize a tsconfig, we do this with `tsc -init`.

### <u>Linux</u>

To start we must install node we can do this with the node version manager or nvm for short. run `sudo apt install nvm` after that is installed we must run `nvm install node` to install the latest version of node.
After installing open a new file in vscode, make a new file named [index.ts](https://github.com/phantom-json/v13/blob/master/index.ts). open a new terminal and start a new package using `npm init`

Now we have our project set up we can install our dependencies. opening the terminal we run.
> npm install discord.js dotenv<br/>
> npm install nodemon --save-dev<br/>
> npm install -g typescript ts-node

We then need to initialize a tsconfig, we do this with `tsc -init`.

---
## Writing the code
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
These few lines import our dependencies from our [package.json](https://github.com/phantom-json/v13/blob/master/package.json) file. 
```typescript
import DiscordJS, { Intents } from 'discord.js'<br/>
import dotenv from 'dotenv'<br/>
dotenv.config()<br/>
```


The first line of this code creates a new Discord.js client that we can interact with. 
Intents state what your bot intends to use, all guilds use `Intents.FLAGS.GUILDS` but you will also need `Intents.FLAGS.GUILDS_MESSAGES` as this allows our bot to read messages and listen for commands. 
you can read more about intents [here](https://discord.js.org/#/docs/main/stable/class/Intents) and find an intents calculator [here](https://ziad87.net/intents/)
```typescript
const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILDS_MESSAGES
    ]
})
```

`client.on` is your standard event listener, in our case it is listening for the ready event. this checks if the bot is online and if it has logged in correctly, if that is true then it logs 'the bot is ready' to the console. 
```typescript
client.on('ready', () => {
    console.log('the bot is ready') 
})
```

Here again we see the `client.on` event listener. here it is listening for a new message (`messageCreate`) if the new message is equal to ping the bot replies with pong. this is the base of our commands.
```typescript
client.on('messageCreate', (message) => {
    if (message.content === 'ping') {

            message.reply({
                content: "pong",
            })
        }
  })
```
---
## 2) Adding basic guild specific slash commands.

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

---
## 3) adding advanced commands and global slash commands

To create our working command handler in djs v13 we use a package called WOKCommands, this package was created by worn off keys. To install this package we use `npm install wokcommands`, we also need to create a commands directory and require another package called path which comes with our djs package. below is a basic setup of the package.

```typescript
import WOKCommands from 'wokcommands'
import path from 'path'

client.on('ready', () => {
    console.log(`the bot is ready`)

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['763349277493559296'],
    })
})
```
setting up commands is also made easy with this however there are some config options which are explained below. 

```typescript
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Replies with pong',

    slash: 'both',
    testOnly: true,

    callback: ({}) => {
        return 'pong'
    },
} as ICommand
```

---
In our package setup we list three properties of the WOKCommands object. `commandDir`, `typeScript` and `testServers`. commandsDir lists what our command Directory is this is important as without it nothing will work, typeScript defines if we are intending to only read typescript for our commands and finally testServers lists the Id`s of all our testing servers, this is important for our commands. 

```typescript
new WOKCommands(client, {
    commandDir: path.join(__dirname, 'commands'),
    typeScript: true,
    testServers: [''],
})
```
For all our commands we follow the same basic outline.

```typescript
import { ICommand } from "wokcommands";

export default {
    category: '',
    description: '',

    callback: ({}) => {
    }
}
```

however we can add more features using properties of the WOKcommands package, one being `slash` and `testOnly`. slash defines if it will be a slash command, a normal command or both. where as testOnly works to define if it is guild specific or global, true means it is guild specific and vice versa.

when testing we found that although adding the relevant parameters to `callback: ({})` did work it was not necessary as long as we used `return` when sending our reply to the user.

an in practice example of this format in use can be found [here](https://github.com/phantom-json/v13/blob/master/commands/spank.ts)

---

## 4) working with buttons 

buttons are a fancy way of giving a user set options. discord veterans will have seen things like reaction roles and other emoji reaction related things, Buttons are similar. As the name suggests buttons create a new message object that when clicked by a user can be collected and turned into an output of some sort. 

buttons follow the new `MessageActionRow` feature in discord.js v13, we can create buttons using the following format.
```typescript
    callback: async ({}) => {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('')
            .setEmoji('')
            .setLabel('')
            .setStyle('')
        )
    }
```

in v13 Discord changed how you attach embeds and other things to a message. we now have factors such as: `content`, `components`, `embeds`and `ephemeral`.

these 4 make up the main factors of sending a message in v13. content is self explanatory, it accepts a string for the main text of the message. embeds the same it accepts `MessageEmbeds`. components and ephemeral are new. components are used to hold buttons and other new `MessageActionRow` components, where as ephemeral like we used before tells discord if everyone or only the message author can read the reply. 

```typescript
async interaction.reply({
    content: '',
    components: [],
    embeds: [],
    ephemeral: true/false,
})
```
in our example we are using buttons to confirm a ban. so we need a filter. 
```typescript
const filter = (BtsInt: ButtonInteraction) => {
    return msgInt.user.id === BtnInt.user.id
}
```

we can now collect them using a collector event. 
```typescript
    const collector = channel.createMessageComponentCollector({
        filter,
        max: int,
        time: 1000 * int,
    })

    collector.on('end', async (collection) => {
        // do stuff
    })
```

in the code above we define the collector and its perimeters here we pass in our filter as well as `max` and `time` these two components define how many times our button can be clicked and the time our button is active for. 