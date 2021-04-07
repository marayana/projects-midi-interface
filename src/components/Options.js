import React from 'react';
import Popup from './Popup.js';

import IconLabelsOn from '../icons/IconLabelsOn.js';
import IconLabelsOff from '../icons/IconLabelsOff.js';
import IconDarkMode from '../icons/IconDarkMode.js';
import IconLightMode from '../icons/IconLightMode.js';
import IconLightsAll from '../icons/IconLightsAll.js';
import IconLightsSingle from '../icons/IconLightsSingle.js';
import IconLockOff from '../icons/IconLockOff.js';
import IconLockOn from '../icons/IconLockOn.js';
import IconMenuOpen from '../icons/IconMenuOpen.js';
import IconMenuClose from '../icons/IconMenuClose.js';
import IconSpeaker from '../icons/IconSpeaker.js';
import IconStyles from '../icons/IconStyles.js';

import { notes } from '../utils/constants.js';

function Options({
    currColours,
    updateCurrColours,
    settings,
    updateSettings,
    togglers,
    updateTogglers,
    modals,
    updateModals,
    showPopup,
    updateShowPopup
}) {
    const colours = togglers.darkMode
        ? [...currColours].filter(c => c[0].includes('dark'))
        : [...currColours].filter(c => c[0].includes('light'));

    return (
        <div className="options">
            <div className="options-cat">
                <label
                    id="trigger-popup"
                    title={togglers.lock ? 'release lock to use single lights mode' : ''}
                    className={togglers.lock ? 'disabled' : ''}
                >
                    <input
                        type="checkbox"
                        name="highlightAll"
                        value={togglers.highlightAll}
                        onChange={updateTogglers}
                    />
                    {togglers.highlightAll ? <IconLightsAll /> : <IconLightsSingle />}
                </label>
                {showPopup && <Popup updateShowPopup={updateShowPopup} />}
            </div>
            <div className="options-cat">
                <label>
                    <input type="checkbox" name="darkMode" value={togglers.darkMode} onChange={updateTogglers} />
                    {togglers.darkMode ? <IconLightMode /> : <IconDarkMode />}
                </label>
            </div>
            <div className="options-cat">
                <label>
                    <input type="checkbox" name="showLabels" value={togglers.showLabels} onChange={updateTogglers} />
                    {togglers.showLabels ? <IconLabelsOn /> : <IconLabelsOff />}
                </label>
            </div>
            <div className="options-cat">
                <label>
                    <input type="checkbox" name="lock" value={togglers.lock} onChange={updateTogglers} />
                    {togglers.lock ? <IconLockOn /> : <IconLockOff />}
                </label>
            </div>
            <div className="options-cat options-modal">
                <label className={modals.volume ? 'active' : ''}>
                    <input type="checkbox" name="volume" value={modals.volume} onChange={updateModals} />
                    <IconSpeaker />
                </label>
                {modals.volume && (
                    <div className="modal modal-volume">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="5"
                            name="currentVolume"
                            value={settings.currentVolume}
                            onChange={updateSettings}
                        />
                    </div>
                )}
            </div>
            <div className="options-cat options-modal">
                <label className={modals.styles ? 'active' : ''}>
                    <input type="checkbox" name="styles" value={modals.styles} onChange={updateModals} />
                    <IconStyles />
                </label>
                {modals.styles && (
                    <div className="modal modal-styles">
                        <p className="modal-title">
                            <b>Button</b> Colours
                        </p>
                        <div>
                            {colours.map(([name, value]) => {
                                return (
                                    <div key={`${name}`} className="modal-row colour-inputs">
                                        <label htmlFor={`col-${name}`}>
                                            {name
                                                .replace('button-', '')
                                                .replace('-dark', '')
                                                .replace('-light', '')
                                                .replace('-', ' ')}
                                        </label>
                                        <input
                                            id={`col-${name}`}
                                            type="color"
                                            name={name}
                                            value={value}
                                            onChange={updateCurrColours}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            <div className="options-cat options-modal">
                <label className={modals.menu ? 'active' : ''}>
                    <input type="checkbox" name="menu" value={modals.menu} onChange={updateModals} />
                    {modals.menu ? <IconMenuClose /> : <IconMenuOpen />}
                </label>
                {modals.menu && (
                    <div className="modal modal-menu">
                        <p className="modal-title">
                            <b>Gridboard</b> Size
                        </p>
                        <div className="modal-row">
                            {Object.keys(settings.linns).map(g => {
                                const isChecked = settings.currentGrid === g;
                                return (
                                    <label key={g} className={isChecked ? 'active' : ''}>
                                        <input
                                            type="radio"
                                            name="currentGrid"
                                            value={g}
                                            checked={isChecked}
                                            onChange={updateSettings}
                                        />
                                        {g}
                                    </label>
                                );
                            })}
                        </div>
                        <p className="modal-title">
                            First <b>Note</b>
                        </p>
                        <div className="modal-row modal-row-notes">
                            {notes.map(note => {
                                const isChecked = settings.linns[settings.currentGrid] === note;
                                return (
                                    <label key={note} className={isChecked ? 'active' : ''}>
                                        <input
                                            type="radio"
                                            name="currentNote"
                                            value={note}
                                            checked={isChecked}
                                            onChange={updateSettings}
                                        />
                                        {note.replace('sharp', '#')}
                                    </label>
                                );
                            })}
                        </div>
                        <p className="modal-title">
                            <b>Sounds</b>
                        </p>
                        <div className="modal-row">
                            {settings.instruments.map(([ins, webMidiIndex]) => {
                                const isChecked = settings.currentInstrument === webMidiIndex;
                                return (
                                    <label key={ins} className={isChecked ? 'active' : ''}>
                                        <input
                                            type="radio"
                                            name="currentInstrument"
                                            value={webMidiIndex}
                                            checked={isChecked}
                                            onChange={updateSettings}
                                        />
                                        {ins}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Options;
