import { notes, linnLookup } from './constants.js';

function buildTemplate(rows, cols, startNote, startOctave, startCommand) {
    const startNoteIndex = notes.indexOf(startNote);
    const rowsArr = [];

    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const curr = startNoteIndex + i * 5 + j;

            const note = notes[curr % 12];
            const octave = startOctave + Math.floor(curr / 12);
            const midiKey = (octave + 1) * 12 + (curr % 12);
            const command = Math.floor((j + startCommand) / 5) + 144;

            row.push([note, octave, midiKey, command]);
        }
        rowsArr.push(row);
    }
    return rowsArr.reverse().flat();
}

function buildGridTemplates() {
    const templates = {};
    for (let grid in linnLookup) {
        const lookup = linnLookup[grid];
        templates[grid] = {};
        for (let startNote in lookup) {
            const [cols, rows] = grid.split('x');
            const [startOctave, startCommand] = lookup[startNote];
            const template = buildTemplate(+rows, +cols, startNote, startOctave, startCommand);
            templates[grid][startNote] = template;
        }
    }
    return templates;
}

const gridTemplates = buildGridTemplates();

export default gridTemplates;
