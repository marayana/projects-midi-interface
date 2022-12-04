export const notes = ['C', 'Csharp', 'D', 'Dsharp', 'E', 'F', 'Fsharp', 'G', 'Gsharp', 'A', 'Asharp', 'B'];

export const allSuffixes = [
    'major',
    'min',
    'dim',
    'dim7',
    'sus2',
    'sus4',
    '7sus4',
    'aug',
    'aug7',
    'aug9',
    'maj7',
    'maj7b5',
    'maj7#5',
    'maj9',
    'maj11',
    'maj13',
    'm6',
    'm69',
    'm7',
    'm7b5',
    'm9',
    'm11',
    'mmaj7',
    'mmaj7b5',
    'mmaj9',
    'mmaj11',
    'add9',
    'madd9',
    '5',
    '6',
    '69',
    '7',
    '7b5',
    '9',
    '9b5',
    '7b9',
    '7#9',
    '11',
    '9#11',
    '13'
];

export const linnLookup = {
    '8x8': {
        C: [2, 1],
        Csharp: [2, 1],
        D: [2, 1],
        Dsharp: [2, 1],
        E: [1, 1],
        F: [1, 1],
        Fsharp: [1, 1],
        G: [1, 1],
        Gsharp: [1, 1],
        A: [1, 1],
        Asharp: [1, 1],
        B: [1, 1]
    },
    '14x12': {
        C: [1, 0],
        Csharp: [1, 0],
        D: [1, 0],
        Dsharp: [1, 0],
        E: [1, 0],
        F: [1, 0],
        Fsharp: [1, 0],
        G: [1, 0],
        Gsharp: [1, 0],
        A: [1, 0],
        Asharp: [1, 0],
        B: [1, 0]
    },
    '16x8': {
        C: [1, 1],
        Csharp: [1, 1],
        D: [1, 1],
        Dsharp: [1, 1],
        E: [1, 1],
        F: [1, 1],
        Fsharp: [1, 1],
        G: [1, 1],
        Gsharp: [1, 1],
        A: [1, 1],
        Asharp: [1, 1],
        B: [1, 1]
    },
    '25x8': {
        C: [1, 1],
        Csharp: [1, 1],
        D: [1, 1],
        Dsharp: [1, 1],
        E: [1, 1],
        F: [1, 1],
        Fsharp: [1, 1],
        G: [1, 1],
        Gsharp: [1, 1],
        A: [1, 1],
        Asharp: [1, 1],
        B: [1, 1]
    }
};

export const linns = {
    '8x8': 'B',
    '14x12': 'C',
    '16x8': 'Fsharp',
    '25x8': 'Fsharp'
};

export const instruments = ['piano', 'organ', 'guitar'];

export const colours = [
    ['button-c-dark', '#373636'],
    ['button-middle-c-dark', '#373636'],
    ['button-white-dark', '#222121'],
    ['button-black-dark', '#131313'],
    ['button-active-dark', '#00c7ff'],
    ['button-c-light', '#d0d0d0'],
    ['button-middle-c-light', '#d0d0d0'],
    ['button-white-light', '#f6f6f6'],
    ['button-black-light', '#e9e9e9'],
    ['button-active-light', '#00c7ff']
];

const exportConsts = { notes, allSuffixes, linns, linnLookup, instruments, colours };

export default exportConsts;
