import React, { useState, useRef, useEffect, useCallback } from 'react';
import Header from './components/Header.js';
import Options from './components/Options.js';
import Linn from './components/Linn.js';
import Piano from './components/Piano.js';
import { linns, colours } from './utils/constants.js';

import MIDISounds from 'midi-sounds-react';
import Midi from './components/Midi.js';
import ChordFinder from './components/ChordFinder.js';

import './css/midi-interface.css';

function MidiInterface() {
    const midiSounds = useRef(null);

    // load/render midi only after user interaction
    const [isStart, setIsStart] = useState(false);

    const [showPopup, setShowPopup] = useState(true);
    const [showChannels, setShowChannels] = useState(false);

    const [isPianoClickOn, setIsPianoClickOn] = useState(false);

    const [currColours, setCurrColours] = useState([]);

    const [currBtns, setCurrBtns] = useState([
        ['C-1-24', 'C-1-144'],
        ['C-2-36', 'C-2-146'],
        ['C-3-48', 'C-3-145'],
        ['C-4-60', 'C-4-144'],
        ['C-5-72', 'C-5-145'],
        ['C-6-84', 'C-6-145']
    ]);

    const [currNotes, setCurrNotes] = useState([]);

    // checkboxes
    const [togglers, setTogglers] = useState({
        darkMode: true,
        highlightAll: true,
        showLabels: true,
        lock: false
    });

    // checkboxes (open/close settings modals)
    const [modals, setModals] = useState({
        volume: false,
        styles: false,
        menu: false
    });

    // radio btns
    //const grids = Object.keys(linns);
    const [settings, setSettings] = useState({
        linns: linns,
        currentGrid: '8x8',
        instruments: [
            ['piano', '3'],
            ['guitar', '259']
        ],
        currentInstrument: '3',
        currentVolume: 30
    });

    // initialise CSS variables for linn
    useEffect(() => {
        setCurrColours(colours);
        colours.forEach(([prop, val]) => {
            document.querySelector('.midi-interface').style.setProperty(`--${prop}`, val);
            if (prop === 'button-active-dark') {
                document.querySelector('.midi-interface').style.setProperty('--dark-active', val);
                let hex = val.replace('#', '');
                let hoverCol = `rgba(${parseInt(hex.slice(0, 2), 16)},${parseInt(hex.slice(2, 4), 16)},${parseInt(
                    hex.slice(4, 6),
                    16
                )},0.8)`;
                document.querySelector('.midi-interface').style.setProperty('--dark-hover', hoverCol);
            } else if (prop === 'button-active-light') {
                document.querySelector('.midi-interface').style.setProperty('--light-active', val);
                let hex = val.replace('#', '');
                let hoverCol = `rgba(${parseInt(hex.slice(0, 2), 16)},${parseInt(hex.slice(2, 4), 16)},${parseInt(
                    hex.slice(4, 6),
                    16
                )},0.8)`;
                document.querySelector('.midi-interface').style.setProperty('--light-hover', hoverCol);
            }
        });
    }, []);

    useEffect(() => {
        const notes = currBtns.map(arr => arr[0].split('-')[0]);
        setCurrNotes(notes);
    }, [currBtns]);

    function updateSettings(e) {
        if (e.target.name === 'currentVolume') {
            setVolume(e.target.value);
        } else if (e.target.name === 'currentInstrument') {
            setInstrument(e.target.value);
        }

        let newSettings = { ...settings };
        if (e.target.name === 'currentNote') {
            newSettings.linns[settings.currentGrid] = e.target.value;
        } else {
            newSettings[e.target.name] = e.target.value;
        }
        setSettings(newSettings);
    }

    function updateTogglers(e) {
        const newSettings = { ...togglers };

        // show popup on first click on highlightAll
        if (e.target.name === 'highlightAll' && showPopup !== null) {
            setShowPopup(true);
        }

        // programmatically disable highlightAll button when lock is on
        if (e.target.name === 'highlightAll' && newSettings.lock) {
            return;
        }

        // empty currBtns array when lock is released
        if (e.target.name === 'lock' && e.target.value === 'true') {
            updateBtnsCallback(null, null, 'unlock');
        }

        newSettings[e.target.name] = !newSettings[e.target.name];
        setTogglers(newSettings);
    }

    function updateModals(e) {
        const newModals = { volume: false, styles: false, menu: false };
        if (!modals[e.target.name]) {
            newModals[e.target.name] = true;
        }
        setModals(newModals);
    }

    function updateCurrColours(e) {
        const [newProp, newVal] = [e.target.name, e.target.value];
        const newColours = currColours.map(([prop, val]) => {
            return prop === newProp ? [prop, newVal] : [prop, val];
        });

        setCurrColours(newColours);

        // set CSS variables
        newColours.forEach(([prop, val]) => {
            document.querySelector('.midi-interface').style.setProperty(`--${prop}`, val);
            if (prop === 'button-active-dark') {
                document.querySelector('.midi-interface').style.setProperty('--dark-active', val);
                let hex = val.replace('#', '');
                let hoverCol = `rgba(${parseInt(hex.slice(0, 2), 16)},${parseInt(hex.slice(2, 4), 16)},${parseInt(
                    hex.slice(4, 6),
                    16
                )},0.8)`;
                document.querySelector('.midi-interface').style.setProperty('--dark-hover', hoverCol);
            } else if (prop === 'button-active-light') {
                document.querySelector('.midi-interface').style.setProperty('--light-active', val);
                let hex = val.replace('#', '');
                let hoverCol = `rgba(${parseInt(hex.slice(0, 2), 16)},${parseInt(hex.slice(2, 4), 16)},${parseInt(
                    hex.slice(4, 6),
                    16
                )},0.8)`;
                document.querySelector('.midi-interface').style.setProperty('--light-hover', hoverCol);
            }
        });
    }

    function updateIsStart() {
        setIsStart(true);
        updateBtnsCallback(null, null, 'unlock');
    }

    function setVolume(v) {
        if (midiSounds.current) midiSounds.current.setMasterVolume(+v / 100);
    }

    function setInstrument(v) {
        if (midiSounds) midiSounds.current = midiSounds.current.cacheInstrument([v]);
    }

    const updateIsPianoClickOn = bool => setIsPianoClickOn(bool);

    const updateShowPopup = () => setShowPopup(false);

    const updateShowChannels = () => setShowChannels(prev => !prev);

    function handleBodyClick(e) {
        // close modals on click on empty area
        if (!e.target.closest('.options-cat') && !e.target.closest('.linn') && !e.target.closest('.piano')) {
            setModals({ volume: false, styles: false, menu: false });
        }
    }

    const updateBtnsCallback = useCallback(
        (n, i, m) => {
            function updateCurrBtns(name, id, triggeredBy) {
                if (triggeredBy === 'down') {
                    // add clicked/pressed button
                    if (!togglers.lock) {
                        setCurrBtns(prev => [...prev, [name, id]]);
                    } else {
                        setCurrBtns(prev => {
                            // remove locked button on second click
                            if (prev.some(([btnName, btnId]) => btnName === name)) {
                                return prev.filter(([btnName, btnId]) => btnName !== name);
                            } else {
                                return [...prev, [name, id]];
                            }
                        });
                    }
                } else if (triggeredBy === 'up') {
                    // remove clicked button
                    if (!togglers.lock) setCurrBtns([]);
                } else if (triggeredBy === 'midiUp') {
                    // on midiUp, only remove the released button
                    if (!togglers.lock) setCurrBtns(prev => prev.filter(([btnName, btnId]) => btnId !== id));
                } else if (triggeredBy === 'unlock') {
                    // remove all locked buttons
                    setCurrBtns([]);
                }
                return true;
            }
            updateCurrBtns(n, i, m);
        },
        [togglers.lock]
    );

    const playNoteCallback = useCallback(
        mk => {
            function playNote(midiKey) {
                midiSounds.current.playChordNow(settings.currentInstrument, [midiKey], 2);
            }
            playNote(mk);
        },
        [settings.currentInstrument]
    );

    return (
        <div className={togglers.darkMode ? 'midi-interface' : 'midi-interface light'} onClick={handleBodyClick}>
            <div className="wrapper">
                <div className="header">
                    <Header isStart={isStart} updateIsStart={updateIsStart} />
                    <ChordFinder currNotes={currNotes} />
                    <Options
                        currColours={currColours}
                        updateCurrColours={updateCurrColours}
                        settings={settings}
                        updateSettings={updateSettings}
                        togglers={togglers}
                        updateTogglers={updateTogglers}
                        modals={modals}
                        updateModals={updateModals}
                        showPopup={showPopup}
                        updateShowPopup={updateShowPopup}
                    />
                </div>
            </div>

            {
                <Linn
                    grid={settings.currentGrid}
                    startNote={settings.linns[settings.currentGrid]}
                    togglers={togglers}
                    isPianoClickOn={isPianoClickOn}
                    currBtns={currBtns}
                    updateBtnsCallback={updateBtnsCallback}
                    playNoteCallback={playNoteCallback}
                    showChannels={showChannels}
                />
            }
            <Piano
                isStart={isStart}
                darkMode={togglers.darkMode}
                currBtns={currBtns}
                updateBtnsCallback={updateBtnsCallback}
                playNoteCallback={playNoteCallback}
                updateIsPianoClickOn={updateIsPianoClickOn}
            />
            {isStart && (
                <div className="wrapper">
                    <div className="status-info">
                        <button type="button" onClick={updateShowChannels}>
                            {showChannels ? 'hide channels' : 'show channels'}
                        </button>
                        <Midi
                            showChannels={showChannels}
                            playNoteCallback={playNoteCallback}
                            updateBtnsCallback={updateBtnsCallback}
                        />
                    </div>
                </div>
            )}

            {isStart && (
                <MIDISounds
                    ref={ref => {
                        midiSounds.current = ref;
                        setVolume(settings.currentVolume);
                    }}
                    appElementName="root-midi-interface"
                    instruments={[3]}
                />
            )}
        </div>
    );
}

export default MidiInterface;
