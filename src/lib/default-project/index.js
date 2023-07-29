import projectData from './project-data';
import backdrop1 from '!raw-loader!./074be65a18b953e95627577cffb7383d.svg';

const defaultProject = translator => {
let _TextEncoder;
if (typeof TextEncoder === 'undefined') {
    _TextEncoder = require('text-encoding').TextEncoder;
} else {
    _TextEncoder = TextEncoder;
}
const encoder = new _TextEncoder();

const projectJson = projectData(translator);

    return [{
        id: 0,
        assetType: 'Project',
        dataFormat: 'JSON',
        data: JSON.stringify(projectJson)
    },
    {
        id: '074be65a18b953e95627577cffb7383d',
        assetType: 'ImageVector',
        dataFormat: 'SVG',
        data: encoder.encode(backdrop1)
    },
];
};

export default defaultProject;
