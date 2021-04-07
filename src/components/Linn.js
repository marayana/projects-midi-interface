import LinnBtn from './LinnBtn.js';
import gridTemplates from '../utils/buildGridTemplates.js';

function Linn({
    showChannels,
    grid,
    startNote,
    togglers,
    isPianoClickOn,
    currBtns,
    updateBtnsCallback,
    playNoteCallback
}) {
    const gridTemplate = gridTemplates[grid][startNote];
    const classname = togglers.darkMode ? `linn linn-${grid}` : `linn linn-${grid} light`;

    return (
        <div className="linn-container">
            <div className="wrapper">
                <div className={classname}>
                    {gridTemplate.map(([note, octave, midiKey, command]) => {
                        const btnName = `${note}-${octave}-${midiKey}`;
                        const btnId = `${note}-${octave}-${command}`;
                        return (
                            <LinnBtn
                                key={btnId}
                                id={btnId}
                                name={btnName}
                                togglers={togglers}
                                isPianoClickOn={isPianoClickOn}
                                currBtns={currBtns}
                                updateBtnsCallback={updateBtnsCallback}
                                playNoteCallback={playNoteCallback}
                                showChannels={showChannels}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Linn;
