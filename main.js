const soundsArr = [
  "sounds/boom.wav",
  "sounds/clap.wav",
  "sounds/hihat.wav",
  "sounds/kick.wav",
  "sounds/openhat.wav",
  "sounds/ride.wav",
  "sounds/snare.wav",
  "sounds/tink.wav",
  "sounds/tom.wav",
]

let beatString = ""

let playing = false

let audio = new Audio()

const playAudio = key => {
  audio.src = soundsArr[key - 1]
  audio.currentTime = 0
  audio.play()
}

const playBeat = (beatString) => {
  if (beatString.length > 0 &&
    playing === true) {
    playAudio(beatString[0])
    setTimeout(() => playBeat(beatString.slice(1)), 500)
  } else {
    playing = false
  }
}

const addBeat = key => {
  beatString += key
  beatHolder.innerText = beatString
}

const resetBeatString = () => {
  beatString = ""
  beatHolder.innerText = beatString
  audio.currentTime = 0
  audio.pause()
  playing = false
}

const beatHolder = document.getElementById("beatHolderID")
const drumKeyArr = document.querySelectorAll(".drumKey")
const playButton = document.getElementById("playButtonID")
const resetButton = document.getElementById("resetButtonID")

const handleClick = e => {

  if (playing) return
  const key = parseInt(e.target.innerText)
  playAudio(key)
  addBeat(key)
}

const handleKeyPress = e => {

  if (playing) return
  let key
  switch (e.keyCode) {
    case 49:
      key = 1
      break
    case 50:
      key = 2
      break
    case 51:
      key = 3
      break
    case 52:
      key = 4
      break
    case 53:
      key = 5
      break
    case 54:
      key = 6
      break
    case 55:
      key = 7
      break
    case 56:
      key = 8
      break
    case 57:
      key = 9
      break
    default:
      console.log("e", e.keyCode)
      return
  }
  playAudio(key)
  addBeat(key)
}

drumKeyArr.forEach(drum => drum.addEventListener("click", handleClick))

playButton.addEventListener("click", () => {
  if (playing) return
  playing = true
  playBeat(beatString)
})

resetButton.addEventListener("click", resetBeatString)

document.addEventListener("keypress", handleKeyPress)

