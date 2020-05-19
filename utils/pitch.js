import Pitchfinder from 'pitchfinder'
import has from 'lodash/has'
import round from 'lodash/round'

const zero = 0

const pitch = (cb) => {
  if (typeof window !== 'undefined') {
    const detectPitch = new Pitchfinder.YIN()
    const hasStandardAudioContext = has(window, 'AudioContext')
    const hasWebkitAudioContext = has(window, 'webkitAudioContext')
    const isWebkitAudio = !hasStandardAudioContext && hasWebkitAudioContext

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const AudioContext = !isWebkitAudio ? window.AudioContext : window.webkitAudioContext
      const audioCtx = new AudioContext()
      const source = audioCtx.createMediaStreamSource(stream)
      const processor = audioCtx.createScriptProcessor(1024, 1, 1)
      source.connect(processor)
      processor.connect(audioCtx.destination)
      processor.onaudioprocess = function (e) {
        const float32Array = e.inputBuffer.getChannelData(0)
        const p = detectPitch(float32Array)
        if (p <= 1000) {
          cb(round(p))
        } else if (p > 1000) {
          cb(zero)
        }
      }
    })
  }
}

export default pitch
