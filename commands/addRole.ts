import DiscordJS, { Guild, Message, MessageComponentInteraction } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'admin',
    description: 'create a new role',

    slash: true,
    minArgs: 3,
    maxArgs: 4,
    expectedArgs: '<name> <colour> <permissions> <reason>',
    testOnly: true,
    SyntaxError: 'Incorrect usage! please use "{PREFIX}add {ARGUMENTS}',
    permissions: ['ADMINISTRATOR'],
    
    options: [
        {
            name: 'name',
            description: 'a name for the role',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
        },
        {
            name: 'colour',
            description: 'the colour of the role',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
            choices: [
                {name: 'default', value: 'DEFAULT'},
                {name: 'white',value: "WHITE"},
                {name: 'aqua', value: 'AQUA'},
                {name: 'green', value: 'GREEN'},
                {name: 'blue', value: 'BLUE'},
                {name: 'yellow', value: 'YELLOW'},
                {name: 'purple', value: 'PURPLE'},
                {name: 'pink', value: 'LUMINOUS_VIVID_PINK'},
                {name: 'orange', value: 'ORANGE'},
                {name: 'red', value: 'RED'},
                {name: 'grey', value: 'GREY'},
                {name: 'navy', value: 'NAVY'},
                {name: 'dark aqua', value: 'DARK_AQUA'},
                {name: 'dark green', value: 'DARK_GREEN'},
                {name: 'dark purple', value: 'DARK_PURPLE'},
                {name: 'dark pink', value: 'DARK_PINK'},
                {name: 'dark orange', value: 'DARK_ORANGE'},
                {name: 'dark red', value: 'DARK_RED'},
                {name: 'dark grey', value: 'DARK_GREY'},
                {name: 'dark navy', value: 'DARK_NAVY'},
                {name: 'dark but not black', value: 'DARK_BUT_NOT_BLACK'},
                {name: 'not quite black', value: 'NOT_QUITE_BLACK'},
                {name: 'random', value: 'RANDOM'}
            ] // all colour choices
        },
        {
            name: 'permissions',
            description: 'set permissions for this role',
            required: true,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
            choices: [
                {name: 'user default', value: 'user_default'},
                {name: 'staff default', value: 'staff_default'},
                {name: 'custom', value: 'custom'}
            ]
        },
        {
            name: 'reason', 
            description: 'give a reason for this action',
            required: false,
            type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],

    callback: ({interaction: msgInt, channel, args, }) => {
        const SyntaxError = 'Incorrect usage! please use "!addRole <name> <color> <permissions> <reason>"'

        var name = String(args[0].split(' ').join('-'))
        var Colour = String(args[1])
        var perms = String(args[2].split(' '))
        var reason = String(args[3])

        if (reason === undefined) {
            return `you ran the command "!addRole" it returned this role \n name: ${name} \n colour: ${Colour} \n perms: ${perms}`    
        }

        return `you ran the command "!addRole" it returned this role \n name: ${name} \n colour: ${Colour} \n perms:${perms} \n reason: ${reason}`

        // check if perms is a valid preset or if set to custom

        
    }
    
} as ICommand