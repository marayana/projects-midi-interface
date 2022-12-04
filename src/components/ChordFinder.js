import React from 'react';
import { notes } from '../utils/constants.js';
import chordTree from '../utils/chordTree.js';

function ChordFinder({ currNotes }) {
    const getChromScale = r => notes.slice(notes.indexOf(r)).concat(notes.slice(0, notes.indexOf(r)));

    function getIntervals(root, scale, arr) {
        return arr.map(n => {
            const index = scale.indexOf(n);
            switch (index) {
                case 1:
                    return 'b9';
                case 2:
                    return '9';
                case 3:
                    return 'b3';
                case 4:
                    return '3';
                case 5:
                    return '4';
                case 6:
                    return 'b5';
                case 7:
                    return '5';
                case 8:
                    return '#5';
                case 9:
                    return '6';
                case 10:
                    return 'b7';
                case 11:
                    return '7';
                default:
                    return 'root';
            }
        });
    }

    function findResult(arr) {
        let results = [];
        let uniqueNotes = [...new Set(arr)];

        for (let i = 0; i < uniqueNotes.length; i++) {
            const root = uniqueNotes[i];
            const chrom = getChromScale(root);
            let intervals = getIntervals(root, chrom, uniqueNotes);

            search(chordTree, intervals);

            function search(currTree, currArr) {
                const keys = Object.keys(currTree);
                const matches = currArr.filter(e => keys.includes(e));

                if (currArr.length === 0 && currTree.result !== '') {
                    results.push(`${root}${currTree.result}`);
                }

                for (let j = 0; j < matches.length; j++) {
                    const currProp = matches[j];
                    const newTree = currTree[currProp];
                    const newArr = currArr.filter(e => e !== currProp);

                    search(newTree, newArr);
                }
            }
        }
        return results;
    }

    const getResult = currNotes => (currNotes.length > 2 ? findResult(currNotes) : []);
    const result = getResult(currNotes);

    return (
        <div className="chordfinder">
            <p>
                {result.length > 0 &&
                    result.map(c => {
                        c = c.replace('sharp', '#');
                        const [root, suffix] = c[1] === '#' ? [c.slice(0, 2), c.slice(2)] : [c.slice(0, 1), c.slice(1)];
                        return (
                            <span key={c}>
                                {root}
                                <sup>{suffix}</sup>
                            </span>
                        );
                    })}
            </p>
        </div>
    );
}

export default ChordFinder;
