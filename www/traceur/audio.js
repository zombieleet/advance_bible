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
          let parent = document.querySelector('.bible-read-text');
          audio.setAttribute('src', link)
          parent.appendChild(audio);
          Audio.CreateControls(parent, audio)
      }

  }
  static CreateControls(parent, audio) {
    let playbtn = document.createElement('button');
    playbtn.setAttribute('class', 'btn btn-success btn-xs  glyphicon glyphicon-play');

    let pausebtn = document.createElement('button');
    pausebtn.setAttribute('class', 'btn btn-success btn-xs  glyphicon glyphicon-pause');

    let stopbtn = document.createElement('button');
    stopbtn.setAttribute('class', 'btn btn-success btn-xs glyphicon glyphicon-stop');

    let bar = document.createElement('progress');

    bar.setAttribute('value', audio.currentTime)
    bar.setAttribute('max', 300)
    parent.appendChild(playbtn)
    parent.appendChild(pausebtn)
    parent.appendChild(stopbtn)
    parent.appendChild(bar);
    Audio.ControlsListener(audio, { playbtn, pausebtn, stopbtn, bar})
  }
  static IncrementAudioBar(bar,audio) {
    bar.setAttribute('value',audio.currentTime)
  }
  static ControlsListener(audio, btnlisteners) {
    let {playbtn, pausebtn, stopbtn, bar} = btnlisteners;

    playbtn.addEventListener('click', (evt) => {
      let target = evt.target;
      if ( target.disabled ) {
        return false;
      }
      if ( ! audio.ended ) {
        audio.play()
        audio.addEventListener('timeupdate', (evt) => {
          let target = evt.target;
          Audio.IncrementAudioBar(bar,target);
        })
        target.setAttribute('class', playbtn.getAttribute('class') + " disabled")
        pausebtn.setAttribute('class', pausebtn.getAttribute('class').replace('disabled',''))
        return ;
      }
      GetBible.StyleBible(book,` ${Number(chapter["chapter"]) + 1} `);
    });

    pausebtn.addEventListener('click', (evt) => {
      let target = evt.target
      if ( ! audio.ended ) {
        audio.pause();
        target.setAttribute('class', pausebtn.getAttribute('class') + " disabled")
        playbtn.setAttribute('class', playbtn.getAttribute('class').replace('disabled',''));
      }
    })

    stopbtn.addEventListener('click', (evt) => {
      let target = evt.target;
      if ( ! audio.ended ) {
        audio.currentTime = 0;
        audio.pause()
        playbtn.setAttribute('class', playbtn.getAttribute('class').replace('disabled',''));
        pausebtn.setAttribute('class', pausebtn.getAttribute('class').replace('disabled',''))
      }
    })

  }
}
//export { Audio }
