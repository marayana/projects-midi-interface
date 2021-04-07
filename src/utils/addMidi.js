export default function addMidi () {
    let data
    let cmd
    let channel
    let type
    let note
    let velocity
    let midi;

    // request MIDI access
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false
      }).then(onMIDISuccess, onMIDIFailure)
    } else {
      alert('No MIDI support in your browser.')
    }

    function onMIDIMessage (event) {
      data = event.data;
      cmd = data[0] >> 4;
      channel = data[0] & 0xf
      type = data[0] & 0xf0 // channel agnostic message type. Thanks, Phil Burk.
      note = data[1]
      velocity = data[2]
      // with pressure and tilt off
      // note off: 128, cmd: 8
      // note on: 144, cmd: 9
      // pressure / tilt on
      // pressure: 176, cmd 11:
      // bend: 224, cmd: 14


      // Display Midi Notes
     // keyData.innerHTML = keyData.innerHTML + data

      switch (type) {
        case 144: // noteOn message
          //noteOn(note, velocity)
          break
        case 128: // noteOff message
          //noteOff(note, velocity)
          break
      }


    }

    function onStateChange (event) {
      //showMIDIPorts(midi)
      const port = event.port
      const state = port.state
      const name = port.name
      const type = port.type

    }

    function onMIDISuccess (midiAccess) {
      midi = midiAccess
      const inputs = midi.inputs.values()
      // loop through all inputs
      for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        // listen for midi messages
        input.value.onmidimessage = onMIDIMessage
        //listInputs(input)
      }
      // listen for connect/disconnect message
      midi.onstatechange = onStateChange
      //showMIDIPorts(midi)
    }


    function onMIDIFailure (e) {
      console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e)
    }

    return midi
}
