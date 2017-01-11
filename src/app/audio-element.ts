export interface AudioStream {
  // 2D Visualizations
  frequencyDataArray: Uint8Array;
  waveformDataArray: Uint8Array;
  audioSrcNode: MediaElementAudioSourceNode;
  waveformBufferLength: number;
  frequencyBufferLength: number;
  audioElement: any;
  audioCtx: any;

  // Equalizer - In Development
  highBand: any;
  midBand1: any;
  midBand2: any;
  midBand3: any;
  midBand4: any;
  midBand5: any;
  midBand6: any;
  midBand7: any;
  midBand8: any;
  midBand9: any;
  midBand10: any;
  lowBand: any;

};

export class AudioStream {
};

export const AUDIO_STREAM_PROVIDER = {
  provide: AudioStream,
  useFactory: () => {
    let audioElement,
        audioCtx,
        audioSrcNode,
        frequencyAnalyser,
        waveformAnalyser,
        frequencyBufferLength,
        waveformBufferLength,
        frequencyDataArray,
        waveformDataArray;

      audioCtx = new AudioContext();
      audioElement =  new Audio();
      audioSrcNode = audioCtx.createMediaElementSource(audioElement);
      // audioSrcNode.connect(audioCtx.destination);

      frequencyAnalyser = audioCtx.createAnalyser();
      waveformAnalyser = audioCtx.createAnalyser();
      frequencyAnalyser.smoothingTimeConstant = 0.5;
      audioSrcNode.connect(frequencyAnalyser);
      audioSrcNode.connect(waveformAnalyser);

      frequencyAnalyser.fftSize = 1024;
      waveformAnalyser.fftSize = 2048;
      frequencyBufferLength = frequencyAnalyser.frequencyBinCount;
      waveformBufferLength = waveformAnalyser.frequencyBinCount;

      frequencyDataArray = new Uint8Array(frequencyBufferLength);
      waveformDataArray = new Uint8Array(waveformBufferLength);

      // audioSrcNode.connect(audioCtx.destination);

      frequencyAnalyser.getByteFrequencyData(frequencyDataArray);
      waveformAnalyser.getByteTimeDomainData(waveformDataArray);

/////////////// In-Development Equalizer Component  ////////////////////
      let gainDb,
        bandSplit,

        highBand,
        midBand1,
        midBand2,
        midBand3,
        midBand4,
        midBand5,
        midBand6,
        midBand7,
        midBand8,
        midBand9,
        midBand10,
        lowBand,

        highGain,
        midGain,
        lowGain;

       //set the filter types (you could set all to 5, for a different result, feel free to experiment)
       //https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#BANDPASS
      //  lowshelf.type = 3;
      //  mid.type = 5;
      //  highshelf.type = 4;
      // filters with type 5 (peaking), which lets all frequencies through and only amplifies/reduce at the frequency at which you've set the respective filter.frequency.value.

      // default gain values:
      highGain = 0;
      midGain = 0;
      lowGain = 0;
      // bandSplit = [ 30, 1000, 12000 ];
      bandSplit = [ 30, 60, 110, 220, 350, 700, 1600, 3200, 4800, 7000, 10000, 12000 ];

      lowBand = audioCtx.createBiquadFilter();
      lowBand.type = "lowshelf";
      lowBand.frequency.value = bandSplit[0];
      lowBand.gain.value = lowGain;

      midBand1 = audioCtx.createBiquadFilter();
    	midBand1.type = "peaking";
    	midBand1.frequency.value = bandSplit[1];
    	midBand1.Q.value = 0.5;
      midBand1.gain.value = midGain;

      midBand2 = audioCtx.createBiquadFilter();
    	midBand2.type = "peaking";
    	midBand2.frequency.value = bandSplit[2];
    	midBand2.Q.value = 0.5;
    	midBand2.gain.value = midGain;

      midBand3 = audioCtx.createBiquadFilter();
    	midBand3.type = "peaking";
    	midBand3.frequency.value = bandSplit[3];
    	midBand3.Q.value = 0.5;
    	midBand3.gain.value = midGain;

      midBand4 = audioCtx.createBiquadFilter();
    	midBand4.type = "peaking";
    	midBand4.frequency.value = bandSplit[4];
    	midBand4.Q.value = 0.5;
    	midBand4.gain.value = midGain;

      midBand5 = audioCtx.createBiquadFilter();
    	midBand5.type = "peaking";
    	midBand5.frequency.value = bandSplit[5];
    	midBand5.Q.value = 0.5;
    	midBand5.gain.value = midGain;

      midBand6 = audioCtx.createBiquadFilter();
    	midBand6.type = "peaking";
    	midBand6.frequency.value = bandSplit[6];
    	midBand6.Q.value = 0.5;
    	midBand6.gain.value = midGain;

      midBand7 = audioCtx.createBiquadFilter();
    	midBand7.type = "peaking";
    	midBand7.frequency.value = bandSplit[7];
    	midBand7.Q.value = 0.5;
    	midBand7.gain.value = midGain;

      midBand8 = audioCtx.createBiquadFilter();
    	midBand8.type = "peaking";
    	midBand8.frequency.value = bandSplit[8];
    	midBand8.Q.value = 0.5;
    	midBand8.gain.value = midGain;

      midBand9 = audioCtx.createBiquadFilter();
    	midBand9.type = "peaking";
    	midBand9.frequency.value = bandSplit[9];
    	midBand9.Q.value = 0.5;
    	midBand9.gain.value = midGain;

      midBand10 = audioCtx.createBiquadFilter();
    	midBand10.type = "peaking";
    	midBand10.frequency.value = bandSplit[10];
    	midBand10.Q.value = 0.5;
    	midBand10.gain.value = midGain;

      highBand = audioCtx.createBiquadFilter();
      highBand.type = "highshelf";
      highBand.frequency.value = bandSplit[11];
      highBand.gain.value = highGain;

      // connect source to destination in series through Biquad Filters!
      audioSrcNode.connect( lowBand );
      lowBand.connect( midBand1 );
      midBand1.connect( midBand2 );
      midBand2.connect( midBand3 );
      midBand3.connect( midBand4 );
      midBand4.connect( midBand5 );
      midBand5.connect( midBand6 );
      midBand6.connect( midBand7 );
      midBand7.connect( midBand8 );
      midBand8.connect( midBand9 );
      midBand9.connect( midBand10 );
      midBand10.connect( highBand );
      highBand.connect( audioCtx.destination );

////////// End of In-Development Equalizer Component ////////////////

      setInterval(function() {
        frequencyAnalyser.getByteFrequencyData(frequencyDataArray);
        waveformAnalyser.getByteTimeDomainData(waveformDataArray);
      }, 50);

      return {
        audioSrcNode: audioSrcNode,
        audioElement: audioElement,
        audioCtx: audioCtx,
        frequencyDataArray: frequencyDataArray,
        waveformDataArray: waveformDataArray,
        waveformBufferLength: waveformBufferLength,
        frequencyBufferLength: frequencyBufferLength,

        // Temporary for Equalizer component:
        // lowGain: lowBand.gain.value,
        // midGain: midBand.gain.value,
        // highGain: highBand.gain.value
        toggleFrequencyOrWaveform: false,

        lowBand: lowBand,
        midBand1: midBand1,
        midBand2: midBand2,
        midBand3: midBand3,
        midBand4: midBand4,
        midBand5: midBand5,
        midBand6: midBand6,
        midBand7: midBand7,
        midBand8: midBand8,
        midBand9: midBand9,
        midBand10: midBand10,
        highBand: highBand
      };
  },
};
