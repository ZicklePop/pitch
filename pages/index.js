import { useState, useCallback, useEffect } from 'react';
import Chart from '../components/chart'
import Layout from '../components/layout'
import pitch from '../utils/pitch'
import slice from 'lodash/slice'
import throttle from 'lodash/throttle'

const cx = {
  main: 'vh-75 dt w-100',
  container: 'dtc v-mid tc',
  article: 'center',
  label: 'f2 sans-serif fw2 ph2 animate'
}

const Index = () => {
  const [hz, setHz] = useState(0)
  const [hzHistory, setHzHistory] = useState([])
  const handleHz = useCallback(throttle(setHz, 200), [hz])
  useEffect(() => {
    pitch(handleHz)
  }, [])
  useEffect(() => {
    setHzHistory(slice(hzHistory.concat([{ hz, date: Date.now() }]), -80))
  }, [hz])

  return (
    <Layout className={cx.main}>
      <div className={cx.container}>
        <article className={cx.article}>
          <div id='pitch'>
            <Chart data={hzHistory} />
            <span className={`${cx.label} ${hz <= 150 && hz !== 0 ? 'dark-red' : ''}`}>{hz}{'hz'}</span>
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default Index
