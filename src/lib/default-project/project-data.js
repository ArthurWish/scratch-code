import {defineMessages} from 'react-intl';
import sharedMessages from '../shared-messages';

let messages = defineMessages({
    meow: {
        defaultMessage: 'Meow',
        description: 'Name for the meow sound',
        id: 'gui.defaultProject.meow'
    },
    variable: {
        defaultMessage: 'my variable',
        description: 'Name for the default variable',
        id: 'gui.defaultProject.variable'
    }
});

messages = {...messages, ...sharedMessages};

const defaultTranslator = msgObj => msgObj.defaultMessage;

/**
 * Generates the project data.
 * @param {function} translateFunction - A function to translate the text in the project.
 * @return {object} The project data with multiple targets each with its own properties.
 */
const projectData = translateFunction => {
    const translator = translateFunction || defaultTranslator;
    return ({
        targets: [
            {
                isStage: true,
                name: 'Stage',
                variables: {
                    '`jEk@4|i[#Fk?(8x)AV.-my variable': [
                        translator(messages.variable),
                        0
                    ]
                },
                lists: {},
                broadcasts: {},
                blocks: {},
                currentCostume: 0,
                costumes: [
                    {
                        assetId: '074be65a18b953e95627577cffb7383d',
                        name: translator(messages.backdrop, {index: 1}),
                        md5ext: '074be65a18b953e95627577cffb7383d.svg',
                        dataFormat: 'svg',
                        rotationCenterX: 563,
                        rotationCenterY: 315
                    },
                ],
                sounds: [],
                volume: 100
            },
        ],
        meta: {
            semver: '3.0.0',
            vm: '0.1.0',
            agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
        }
    });
};

export default projectData;
