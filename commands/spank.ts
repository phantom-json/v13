import { ICommand } from "wokcommands";
import DiscordJS from "discord.js"

export default {
    category: 'fun & games',
    description: 'spanks a user',

    slash: 'both',
    testOnly: true,

    expectedArgs: '<name>',
    minArgs: 1,
    SyntaxError: 'Incorrect usage! please use "{PREFIX}add {ARGUMENTS}"',

    options: [
        {
          name: 'user',
          description: 'The user you wish to spank',
          required: true,
          type: DiscordJS.Constants.ApplicationCommandOptionTypes.USER,
        },
    ],

    callback: ({ interaction: msgInt, channel, args }) => {
        const reply = `<@${args[0]}> was spanked`
        return reply
    }
} as ICommand