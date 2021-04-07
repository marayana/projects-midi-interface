import React, { useState, useEffect, useCallback } from 'react';
import { notes } from '../utils/constants.js';

function Midi({ showChannels, playNoteCallback, updateBtnsCallback }) {
    const [msg, setMsg] = useState(null);

    const midiCallback = useCallback(() => {
        function addMidi() {
            let midi;

            if (navigator.requestMIDIAccess) {
                navigator
                    .requestMIDIAccess({
                        sysex: true
                    })
                    .then(onMIDISuccess, onMIDIFailure);
            } else {
                alert('No MIDI support in your browser.');
            }

            function onMIDISuccess(midiAccess) {
                midi = midiAccess;
                const inputs = midi.inputs.values();
                for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
                    input.value.onmidimessage = onMIDIMessage;
                }
            }

            function onMIDIFailure(e) {
                console.log("No access to MIDI devices or your browser doesn't support WebMIDI API");
            }
        }
        addMidi();
    }, []);

    function onMIDIMessage(event) {
        const msg = event.data;
        //const cmd = +msg[0] >> 4;
        //const channel = +msg[0] & 0xf;
        const command = +msg[0];
        const midiKey = +msg[1];
        const vel = +msg[2];

        if (vel !== undefined) {
            setMsg({ command, midiKey, vel });
        }
    }

    useEffect(() => midiCallback(), [midiCallback]);

    useEffect(() => {
        if (msg && msg.command >= 144 && msg.command < 160 && msg.vel > 0) {
            playNoteCallback(msg.midiKey);
        }
    }, [msg, playNoteCallback]);

    useEffect(() => {
        if (msg) {
            const note = notes[msg.midiKey % 12];
            const octave = Math.floor(msg.midiKey / 12) - 1;
            const name = `${note}-${octave}-${msg.midiKey}`;
            const id = `${note}-${octave}-${msg.command}`;
            if (msg.vel !== 0 && msg.command >= 144 && msg.command < 160) {
                updateBtnsCallback(name, id, 'down');
            } else if (msg.command === 128 || msg.vel === 0) {
                updateBtnsCallback(name, id, 'midiUp');
            }
        }
    }, [msg, updateBtnsCallback]);

    return (
        <div className={showChannels ? 'midi visible' : 'midi'}>
            <h4>MIDI</h4>
            <div>
                <p>command: {msg && msg.command}</p>
                <p>midiKey: {msg && msg.midiKey}</p>
            </div>
        </div>
    );
}

export default Midi;
