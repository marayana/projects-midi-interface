const chordTree = {
    result: '',
    root: {
        result: '',
        majorThird: {
            result: '',
            perfectFifth: {
                result: 'major',
                majorSixth: {
                    result: 'maj6',
                    majorSecond: {
                        result: 'maj6/9'
                    }
                },
                minorSeventh: {
                    result: 'dom7',
                    minorSecond: {
                        result: 'dom7b9'
                    },
                    minorThird: {
                        result: 'dom7#9'
                    },
                    majorSecond: {
                        result: 'dom9',
                        perfectFourth: {
                            result: 'dom11',
                            majorSixth: {
                                result: 'dom13'
                            }
                        }
                    }
                },
                majorSeventh: {
                    result: 'maj7',
                    majorSecond: {
                        result: 'maj9',
                        perfectFourth: {
                            result: 'maj11',
                            majorSixth: {
                                result: 'maj13'
                            }
                        }
                    }
                }
            },
            augFourth: {
                result: 'dim',
                majorSeventh: {
                    result: 'maj7b5'
                },
                minorSeventh: {
                    result: 'dom7b5',
                    minorSecond: {
                        result: 'dom7b5b9'
                    },
                    minorThird: {
                        result: 'dom7b5#9'
                    },
                    majorSecond: {
                        result: 'dom9b5',
                        perfectFourth: {
                            result: 'dom11b5',
                            majorSixth: {
                                result: 'dom13b5'
                            }
                        }
                    }
                }
            },
            augFifth: {
                result: 'aug',
                minorSeventh: {
                    result: 'aug7 / dom7#5',
                    minorSecond: {
                        result: 'dom7#5b9'
                    },
                    minorThird: {
                        result: 'dom7#5#9'
                    },
                    majorSecond: {
                        result: 'dom9#5',
                        perfectFourth: {
                            result: 'dom11#5',
                            majorSixth: {
                                result: 'dom13#5'
                            }
                        }
                    }
                },
                majorSixth: {
                    result: 'maj7#5'
                }
            }
        },
        perfectFourth: {
            result: '',
            perfectFifth: {
                result: 'sus',
                minorSeventh: {
                    result: 'dom7sus'
                }
            }
        },
        minorThird: {
            result: '',
            perfectFifth: {
                result: 'min',
                majorSeventh: {
                    result: 'min(maj7)'
                },
                majorSixth: {
                    result: 'min6',
                    majorSecond: {
                        result: 'min6/9'
                    }
                },
                minorSeventh: {
                    result: 'min7',
                    majorSecond: {
                        result: 'min9',
                        perfectFourth: {
                            result: 'min11'
                        }
                    }
                }
            },
            augFourth: {
                result: 'dim',
                majorSixth: {
                    result: 'dim7'
                },
                minorSeventh: {
                    result: 'dim7b5'
                }
            }
        }
    }
};

export default chordTree;
