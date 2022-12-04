import React from 'react';

function LinnBtn({
    id,
    name,
    togglers,
    isPianoClickOn,
    currBtns,
    updateBtnsCallback,
    playNoteCallback,
    showChannels,
    currChordSearch
}) {
    const { showLabels, highlightAll, lock } = togglers;
    const [note, octave] = name.split('-');

    const btnKeyClass =
        note === 'C' ? (+octave === 4 ? 'btn-middle-c' : 'btn-c') : note.length > 1 ? 'btn-black' : 'btn-white';
    const btnLabelsClass = showLabels ? ' btn-labels' : '';
    const btnActiveClass = isBtnActive([name, id]) ? ' btn-active' : '';
    const btnChordSearchClass = currChordSearch ? getBtnChordSearchClass(note) : '';
    const btnChannelClass = showChannels ? ` show-channels channel-${id.split('-')[2]}` : '';

    function handleMouseDown(e) {
        const btn = e.target.closest('.linn-btn');
        updateBtnsCallback(btn.name, btn.id, 'down');

        const midiKey = btn.name.split('-')[2];
        playNoteCallback(midiKey);
    }
    function handleMouseUp(e) {
        const btn = e.target.closest('.linn-btn');
        updateBtnsCallback(btn.name, btn.id, 'up');
    }

    function isBtnActive([btnName, btnId]) {
        const noteName = btnName.split('-')[0];
        return currChordSearch && currChordSearch.includes(noteName)
            ? true
            : isPianoClickOn || highlightAll || lock
            ? currBtns.some(([name, id]) => name === btnName)
            : currBtns.some(([name, id]) => id === btnId);
    }

    function getBtnChordSearchClass(note) {
        const index = currChordSearch.indexOf(note);
        return index !== -1 ? ` btn-chord-${index}` : '';
    }

    return (
        <button
            id={id}
            className={`linn-btn ${btnKeyClass}${btnLabelsClass}${btnActiveClass}${btnChannelClass}${btnChordSearchClass}`}
            name={name}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            {showLabels && (
                <span className="btn-label">
                    {note.replace('sharp', '#')}
                    {note === 'C' ? +octave - 1 : ''}
                </span>
            )}
            {showChannels && (
                <span className="btn-channel">
                    {id.split('-')[2]}
                    <br />
                    {name.split('-')[2]}
                </span>
            )}
        </button>
    );
}

export default LinnBtn;
