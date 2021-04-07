import { notes } from './constants.js';
const whiteNotes = notes.filter(n => n.length === 1);

export const width = 2100;
export const height = 300;
export const whiteWidth = 50;
export const blackWidth = 32;
export const blackHeight = 160;
export const labelHeight = 60;

function buildPianoTemplate(){
    const template = {white:[], black:[], labels:{white:[],black:[]}};
    let labelCount = 0;
    for (let octave=1; octave<7; octave++){
        for (let key=0; key<12; key++){
            labelCount++;
            const noteName = notes[key];
            let isWhite = noteName.length === 1;
            if (isWhite){
                const index = whiteNotes.indexOf(noteName);
                template.white.push({
                    pos:((octave-1)*7 + index) * whiteWidth,
                    midiKey:`${noteName}-${octave}-${(octave+1)*12+key}`
                });
                template.labels.white.push({
                    pos:labelCount*width/72,
                    label:`${noteName}`,
                    midiKey:`${noteName}-${octave}-${(octave+1)*12+key}`
                })
            } else {
                const index = whiteNotes.indexOf(noteName.replace('sharp',''));
                template.black.push({
                    pos:((octave-1)*7 + index+1) * whiteWidth - (blackWidth/2),
                    midiKey:`${notes[key]}-${octave}-${(octave+1)*12+key}`
                });
                template.labels.black.push({
                    pos:labelCount*width/72,
                    label:`${notes[key].replace('sharp','#')}`,
                    midiKey:`${notes[key]}-${octave}-${(octave+1)*12+key}`
                })
            }
        }
    }
    return template
}
export const pianoTemplate = buildPianoTemplate();

export const pianoVals = { width, height, whiteWidth, blackWidth, blackHeight, labelHeight, pianoTemplate }

export default pianoVals
