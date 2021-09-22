import { ICommand } from "wokcommands";
import DiscordJS, { ButtonInteraction, Client, MessageActionRow, MessageButton, MessageEmbed, Guild } from 'discord.js';

export default {
    category:'general',
    description: 'create a suggestion',

    slash: 'both',
    testOnly: true,
    
    expectedArgs: '<suggestion>',
    minArgs: 1,
    maxArgs: 1,
    SyntaxError: 'Incorrect usage! please use "{PREFIX}add {ARGUMENTS}"',

    callback: async ({ interaction: msgInt, channel, args, message }) => {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('suggestion_accept')
            .setEmoji('')
            .setLabel('Accept')
            .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('suggestion_deny')
            .setEmoji('')
            .setLabel('Deny')
            .setStyle('DANGER')
        )
        const errorBtn = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('create_log_channel')
            .setEmoji('')
            .setLabel('Make Channel')
            .setStyle('PRIMARY')
        )
    const SendChan = args[1]
    await msgInt.reply({
        content: `${args[0]} \n Status: Pending`,
        components: [row],
    })

    const filter = (BtnInt: ButtonInteraction) => {
        return msgInt.id === BtnInt.user.id
    } 

    const collector = channel.createMessageComponentCollector({
        // filter,
        max: 1,
    })

    collector.on('end', async (collection) => {
        if (collection.first()?.customId === 'suggestion_accept') {
            // const logs = message.client.channels.cache.find(channel => channel.name === 'bot-logs')
            // await logs ({
            //     if (!logs) {
            //         msgInt.reply({
            //             content: 'wumpus, There was an error. \n I cant find my action log channel please define one before running this again or ill make one for you',
            //             components: []
            //         })
            //     }
            // }

            msgInt.editReply({
                content: `${args[0]} \n Status: Accepted`,
                components: []

            })
            // const embed = new MessageEmbed()
            // .setTitle(`Suggestion accepted in ${message.guildId}`)
            // .setDescription('')
            
            // await msgInt.user.send({
            //     content: `your suggestion was accepted \n below is a embed of your suggestion`,
            //     embeds: [embed]
            // })

        }
        
        else if (collection.first()?.customId === 'suggestion_deny') {
            msgInt.editReply({
                content: `${args[0]} \n Status: Denied`,
                components: []
            })
        }

        else if (collection.first()?.customId === 'create_log_channel') {
            // create log channel with name bot-logs
            console.log('create_log_channel')
        }
    })
    }
} as ICommand