import { ButtonInteraction, DiscordAPIError, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import DiscordJS from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'admin',
    description: 'ban a user from a guild',
    slash: "both",
    testOnly: true,
    expectedArgs: '<user> <reason>',

    options: [
        {
            name: 'user',
            description: 'the user you wish to ban',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER,
        },
        {
            name: 'reason',
            description: 'reason for ban',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        },
    ],

    callback: async ({ interaction: msgInt, channel, args}) => {
        const bannedUser = `<@${args[0]}>`
        const reason = args[1]

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('ban_yes')
            .setEmoji('')
            .setLabel('Confirm')
            .setStyle('SUCCESS')
        )
        .addComponents(
            new MessageButton()
            .setCustomId('ban_no')
            .setEmoji('')
            .setLabel('Cancel')
            .setStyle('DANGER')
        )

        const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Banned User')
        .setDescription(`**${bannedUser} was banned from the server \n Reason: ${reason}** \n If this was a mistake you can use "!unban <user>"`)

        await msgInt.reply({
            content: `Are you sure you want to ban ${bannedUser}`,
            components: [row],
            ephemeral: true,
        })

        const filter = (BtnInt: ButtonInteraction) => {
            return msgInt.user.id === BtnInt.user.id
        }

        const collector = channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 15
        })

        collector.on('end', async (collection) => {
            if (collection.first()?.customId === 'ban_yes') {
                // ban target
                await msgInt.editReply({
                    content: ' ',
                    components: [],
                    embeds: [embed]
                })
            }
        })
    }
} as ICommand