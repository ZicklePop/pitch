import React, { useState, useCallback, useEffect } from 'react'
import Layout from '../components/layout'
import pitch from '../utils/pitch'
import throttle from 'lodash/throttle'
import slice from 'lodash/slice'
import Chart from '../components/chart'

const cx = {
  main: 'vh-100 dt w-100',
  container: 'dtc v-mid tc',
  article: 'center sans-serif f3 fw2 ph2'
}

const Index = () => {
  const [hz, setHz] = useState(0)
  const [hzHistory, setHzHistory] = useState([])
  const handleHz = useCallback(throttle(setHz, 100), [hz])
  pitch(handleHz)
  useEffect(() => {
    setHzHistory(slice(hzHistory.concat([{ hz, date: Date.now() }]), -100))
  }, [hz])

  return (
    <Layout className={cx.main}>
      <div className={cx.container}>
        <article className={cx.article}>
          <div id='pitch'>
            <Chart data={hzHistory} />
            {hz}{'hz'}
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default Index
