import React from 'react';
import { pianoVals } from '../utils/buildPianoTemplate.js';

function Piano({ isStart, darkMode, currBtns, updateBtnsCallback, playNoteCallback, updateIsPianoClickOn }) {
    const { width, height, whiteWidth, blackWidth, blackHeight, labelHeight, pianoTemplate } = pianoVals;

    const currBtnsNames = currBtns.map(b => b[0]);

    function handlePianoClickOn(e) {
        const midiKey = e.target.id.split('-')[2];
        playNoteCallback(midiKey);

        updateBtnsCallback(e.target.id, null, 'down');
        updateIsPianoClickOn(true);
    }

    function handlePianoClickOff(e) {
        updateBtnsCallback(e.target.id, null, 'up');
        updateIsPianoClickOn(false);
    }

    function getLabelOffset(note) {
        let offset;
        switch (note) {
            case 'C':
                offset = 5;
                break;
            case 'D':
                offset = 15;
                break;
            case 'E':
                offset = 25;
                break;
            case 'F':
                offset = 5;
                break;
            case 'G':
                offset = 15;
                break;
            case 'A':
                offset = 16;
                break;
            case 'B':
                offset = 20;
                break;
            default:
                return 0;
        }
        return offset;
    }

    return (
        <div className={darkMode ? 'piano' : 'piano light'}>
            <div className="wrapper">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
                    <rect width={`${width}`} height={height} x="0" y={labelHeight} stroke="#000000" fill="none" />

                    <g>
                        {pianoTemplate.white.map((template, i) => {
                            const midiKey = template.midiKey;
                            const isActive = isStart && currBtnsNames.includes(midiKey);
                            const label = pianoTemplate.labels.white[i].label;
                            const labelOffset = getLabelOffset(label);
                            return (
                                <g key={`white-${midiKey}`}>
                                    <rect
                                        id={midiKey}
                                        className={isActive ? 'white active' : 'white'}
                                        x={template.pos}
                                        y={labelHeight}
                                        width={whiteWidth}
                                        height={height - labelHeight}
                                        onMouseDown={handlePianoClickOn}
                                        onMouseUp={handlePianoClickOff}
                                    />
                                    <text
                                        className={isActive ? 'label active' : 'label'}
                                        x={template.pos + labelOffset}
                                        y={labelHeight - 20}
                                    >
                                        {label}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                    <g>
                        {pianoTemplate.black.map((template, i) => {
                            const midiKey = template.midiKey;
                            const isActive = isStart && currBtnsNames.includes(midiKey);
                            const label = pianoTemplate.labels.black[i].label.replace('#', '');
                            return (
                                <g key={`black-${midiKey}`}>
                                    <rect
                                        id={midiKey}
                                        className={isActive ? 'black active' : 'black'}
                                        x={template.pos}
                                        y={labelHeight}
                                        width={blackWidth}
                                        height={blackHeight}
                                        onMouseDown={handlePianoClickOn}
                                        onMouseUp={handlePianoClickOff}
                                    />
                                    <text
                                        className={isActive ? 'label active' : 'label'}
                                        x={template.pos}
                                        y={labelHeight - 20}
                                    >
                                        {label}
                                        {<tspan>#</tspan>}
                                    </text>
                                </g>
                            );
                        })}
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default Piano;
