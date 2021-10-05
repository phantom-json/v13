import { ICommand } from "wokcommands";

export default {
    category: 'testing',
    description: 'testing mongo db',

    slash: 'both',
    expectedArgs: '<string>',
    testOnly: true,
    SyntaxError: 'Incorrect usage! please use "{PREFIX}add {ARGUMENTS}',
    permissions: ['ADMINISTRATOR'],

    callback: ({ interaction: msgInt }) => {
        
    }
} as ICommand