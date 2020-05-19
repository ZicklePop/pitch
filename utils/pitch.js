import './get-float-time-domain-data.polyfill'
import { PitchDetector } from 'pitchy'
import has from 'lodash/has'
import round from 'lodash/round'

const update = (node, detector, input, sampleRate, cb) => {
  node.getFloatTimeDomainData(input)
  const [p, c] = detector.findPitch(input, sampleRate)
  if (c > 0.96) {
    if (p > 40 && p < 600) {
      cb(round(p))
    }
  }
  window.requestAnimationFrame(() => update(node, detector, input, sampleRate, cb))
}

const pitch = (cb) => {
  if (typeof window !== 'undefined') {
    const hasStandardAudioContext = has(window, 'AudioContext')
    const hasWebkitAudioContext = has(window, 'webkitAudioContext')
    const isWebkitAudio = !hasStandardAudioContext && hasWebkitAudioContext
    const AudioContext = !isWebkitAudio ? window.AudioContext : window.webkitAudioContext
    const audioCtx = new AudioContext()
    const audioAnalyser = audioCtx.createAnalyser()

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const source = audioCtx.createMediaStreamSource(stream)
      source.connect(audioAnalyser)
      const detector = PitchDetector.forFloat32Array(audioAnalyser.fftSize)
      const input = new Float32Array(detector.inputLength)
      update(audioAnalyser, detector, input, audioCtx.sampleRate, cb)
    })
  }
}

export default pitch
