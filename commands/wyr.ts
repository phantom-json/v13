import { ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category:'testing',
    description:'would you rather',
    aliases:['WYR', 'wouldyourather', 'WouldYouRather'],
    slash:'both',
    cooldown: '50s',
    maxArgs: 0,
    SyntaxError:'Incorrect usage! please use "{PREFIX}"',
    testOnly: true,


    callback: async ({ interaction: msgInt, channel }) => {
        // get api call here

        const DBReply = `place holder... ` // database response
        var answer = 'Pending Reply'

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('Button_this')
            .setEmoji('')
            .setLabel('This')
            .setStyle('PRIMARY')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('Button_that')
            .setEmoji('')
            .setLabel('That')
            .setStyle('PRIMARY')
        )

        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Would you rather')
        .setDescription(`${DBReply} \n answer: ${answer}`)


        await msgInt.reply({ // interaction reply
            embeds: [embed],
            components: [row],
        });

        const filter = (BtnInt: ButtonInteraction) => { // interaction filter
            return msgInt.user.id === BtnInt.user.id
        }

        const collector = channel.createMessageComponentCollector({ // interaction collector
            filter, 
            max: 1,
            time: 1000 * 50 // 50s same as cooldown
        })

        collector.on('end', async (collection) => {
            if (collection.first()?.customId === 'Button_this') {
                var answer = 'testing answer This'
                await msgInt.editReply({
                    embeds: [embed]
                }) 
            }
            else if (collection.first()?.customId === 'Button_that') {
                var answer = 'testing answer That'
                await msgInt.editReply({
                    embeds: [embed]
                })
            }
        })
    }

} as ICommand