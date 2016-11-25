
class Audio {
  // constructor() {
  //   let audio = document.createElement('audio');
  //   this.audio = () => audio;
  // }
  static SetAudio(link = undefined, audio) {
      if ( link === undefined ) {
        throw new Error("Link is Undefined");
      }

      if ( HTMLAudioElement[Symbol.hasInstance](audio) ) {
          Audio.CreaetControls(audio)
          audio.play()
      }

  }
  static CreateControls(audio) {
    let parent = document.querySelector('.bible-read-text');
    let playbtn = document.createElement('button');
    playbtn.setAttribute('class', 'btn btn-default btn-lg');

    let pausebtn = document.createElement('button');
    pausebtn.setAttribute('class', 'btn btn-default btn-lg');

    let stopbtn = document.createElement('button');
    stopbtn.setAttribute('class', 'btn btn-default btn-lg');

    let bar = document.createElement('progress');
    bar.setAttribute('value', audio.currentTime)
    bar.setAttribute('max', audio.duration)
    parent.appendChild(playbtn)
    parent.appendChild(pausebtn)
    parent.appendChild(stopbtn)
    parent.appendChild(bar);

    Audio.ControlsListener({ playbtn, pausebtn, stopbtn })
  }
  static IncrementAudioBar(bar) {
    console.log(bar);
  }
  static ControlsListener(btnlisteners) {
    let {playbtn, pausebtn, stopbtn} = btnlisteners;
    playbtn.addEventListener('click', (evt) => {
      let target = evt.target;
      if ( target.disabled ) {
        return false;
      }
      if ( audio.ended ) {
        audio.play().then(() => {
          let bar = document.querySelector('progress');
          Audio.IncrementAudioBar(bar);
        })
      }
    });

  }
}
export { Audio }
