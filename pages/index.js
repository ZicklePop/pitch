import React, { useState } from 'react'
import Layout from '../components/layout'
import Pitchfinder from 'pitchfinder'
import has from 'lodash/has'
import throttle from 'lodash/throttle'
import round from 'lodash/round'

// const colors = {
//   pwink: '#FF52A3'
// }

const cx = {
  main: 'vh-100 dt w-100',
  container: 'dtc v-mid tc',
  article: 'center sans-serif f3 fw2 ph2'
}

const Index = () => {
  const detectPitch = new Pitchfinder.YIN()
  const [hz, setHz] = useState(0)

  if (typeof window !== 'undefined') {
    const hasStandardAudioContext = has(window, 'AudioContext')
    const hasWebkitAudioContext = has(window, 'webkitAudioContext')
    const isWebkitAudio = !hasStandardAudioContext && hasWebkitAudioContext
    const updateHz = throttle((e) => setHz(e), 300)

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
        if (p && p <= 600) {
          updateHz(round(p))
        }
      }
    })
  }

  return (
    <Layout className={cx.main}>
      <div className={cx.container}>
        <article className={cx.article}>
          <div id='pitch'>
            {hz}{'hz'}
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default Index
