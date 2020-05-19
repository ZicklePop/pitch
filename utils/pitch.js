import Pitchfinder from 'pitchfinder'
import has from 'lodash/has'
import round from 'lodash/round'

const pitch = (cb) => {
  if (typeof window !== 'undefined') {
    const detectPitch = new Pitchfinder.AMDF()
    const hasStandardAudioContext = has(window, 'AudioContext')
    const hasWebkitAudioContext = has(window, 'webkitAudioContext')
    const isWebkitAudio = !hasStandardAudioContext && hasWebkitAudioContext

    const update = (e) => {
      const float32Array = e.inputBuffer.getChannelData(0)
      const p = detectPitch(float32Array)
      if (p > 40 && p < 600) {
        cb(round(p))
      }
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const AudioContext = !isWebkitAudio ? window.AudioContext : window.webkitAudioContext
      const audioCtx = new AudioContext()
      const source = audioCtx.createMediaStreamSource(stream)
      const processor = audioCtx.createScriptProcessor(256, 1, 1)
      source.connect(processor)
      processor.connect(audioCtx.destination)
      processor.onaudioprocess = update
    })
  }
}

export default pitch
