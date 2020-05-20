import Pitchfinder from 'pitchfinder'
import round from 'lodash/round'

const detectPitch = new Pitchfinder.AMDF()
const isBrowser = typeof window !== 'undefined'

const pitch = (cb) => {
  if (isBrowser) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      const source = audioCtx.createMediaStreamSource(stream)
      const processor = audioCtx.createScriptProcessor(2048, 1, 1)
      source.connect(processor)
      processor.connect(audioCtx.destination)
      processor.onaudioprocess = (e) => {
        const p = round(detectPitch(e.inputBuffer.getChannelData(0)))
        if (p && p >= 0 && p <= 600) {
          cb(p)
        }
      }
    })
  }
}

export default pitch
