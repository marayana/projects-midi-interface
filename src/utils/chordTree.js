const chordTree = {
    result: '',
    root: {
        result: '',
        3: {
            result: '',
            5: {
                result: 'major',
                6: {
                    result: '6',
                    9: {
                        result: '69'
                    }
                },
                b7: {
                    result: '7',
                    b9: {
                        result: '7b9'
                    },
                    b3: {
                        result: '7#9'
                    },
                    9: {
                        result: '9',
                        b5: {
                            result: '9#11'
                        },
                        6: {
                            result: '13'
                        }
                    }
                },
                7: {
                    result: 'maj7',
                    9: {
                        result: 'maj9',
                        6: {
                            result: 'maj13'
                        }
                    }
                },
                9: {
                    result: 'add9'
                }
            },
            b5: {
                result: '',
                7: {
                    result: 'maj7b5'
                },
                b7: {
                    result: '7b5',
                    9: {
                        result: '9b5'
                    }
                }
            },
            '#5': {
                result: 'aug',
                b7: {
                    result: 'aug7',
                    9: {
                        result: 'aug9'
                    }
                },
                7: {
                    result: 'maj7#5'
                }
            }
        },
        4: {
            result: '',
            5: {
                result: 'sus4',
                b7: {
                    result: '7sus4'
                }
            }
        },
        b3: {
            result: '',
            5: {
                result: 'min',
                6: {
                    result: 'm6',
                    9: {
                        result: 'm69'
                    }
                },
                b7: {
                    result: 'm7',
                    9: {
                        result: 'm9',
                        4: {
                            result: 'm11'
                        }
                    }
                },
                7: {
                    result: 'mmaj7',
                    9: {
                        result: 'mmaj9',
                        4: {
                            result: 'mmaj11'
                        }
                    }
                }
            },
            b5: {
                result: 'dim',
                6: {
                    result: 'dim7'
                },
                b7: {
                    result: 'm7b5'
                },
                7: {
                    result: 'mmaj7b5'
                }
            }
        },
        5: {
            result: '5',
            9: {
                result: 'sus2'
            },
            b7: {
                result: '',
                9: {
                    result: '',
                    4: {
                        result: '11'
                    }
                }
            },
            7: {
                result: '',
                9: {
                    result: '',
                    4: {
                        result: 'maj11'
                    }
                }
            }
        }
    }
};

export default chordTree;
