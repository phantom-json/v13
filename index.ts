import DiscordJS, { Intents, Interaction } from 'discord.js'
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

    commands?.create({
        name: 'add',
        description: ',dds two numbers',
        options: [
            {
                name: 'num1',
                description: 'the first number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            },
            {
                name: 'num2',
                description: 'the second number',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
            }
        ]
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
    } else if (commandName === 'add') {
        const num1 = options.getNumber('num1')!
        const num2 = options.getNumber('num2')!

        Interaction.reply({
            content: `The sum is ${ num1 + num2 }`,
            ephemeral: true
        })
    }
})

client.on('messageCreate', (message) => {
    if (message.content === 'ping') {
        message.reply({
            content: "pong",
        })
    }
})

client.login(process.env.TOKEN)