import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
import { connection } from 'mongoose'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
})


client.on('ready', () => {
    const wok = new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        featureDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['763349277493559296'],
        mongoUri: process.env.MONGO_URI,
        botOwners: ['460466062593622016'],
        dbOptions: {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        },
        showWarns: true,
        debug: true,
   })

   wok.on('databaseConnected', async (connection, state) => {
       const model = connection.models['wokcommands-languages']

       const results = await model.countDocuments()
       console.log(results)
   })
    .setDefaultPrefix('?')
})
client.login(process.env.TOKEN);