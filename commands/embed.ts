import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'moderation',
    description: 'sends an embed',


    slash: true,
    guildOnly: true, 
    expectedArgs: '<title> <message>',
    SyntaxError: 'Incorrect usage! please use "{PREFIX}add {ARGUMENTS}',
    permissions: ['ADMINISTRATOR'],

    callback: ({ interaction, args }) => {
        const [ title, Message ] = args

        if (interaction) {
            const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(title)
            .setDescription(Message)
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())

            return embed
        }
    }
} as ICommand