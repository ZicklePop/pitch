import React from 'react'
import PropTypes from 'prop-types'
import { ParentSize } from '@vx/responsive'
import { LinePath } from '@vx/shape'
import { scaleLinear, scaleTime } from '@vx/scale'

const cx = {
  main: 'fixed absolute--fill'
}

const date = (o, i) => {
  return o.date
}
const hz = o => o.hz

const Chart = ({ color, data }) => {
  const xScale = scaleTime({
    domain: [Math.min(...data.map(date)), Math.max(...data.map(date))]
  })
  const yScale = scaleLinear({
    domain: [80, 380]
  })
  const x = o => xScale(date(o))
  const y = o => yScale(hz(o))

  return (
    <ParentSize className={cx.main}>
      {({ width, height }) => {
        xScale.range([0, width])
        yScale.range([height, 0])
        return (
          <svg width={width} height={height}>
            <LinePath
              data={data}
              x={x}
              y={y}
              stroke={color}
              strokeWidth={2}
              width={width}
              height={height}
              margin={{
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
            />
          </svg>
        )
      }}
    </ParentSize>
  )
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    hz: PropTypes.number,
    date: PropTypes.number
  })),
  color: PropTypes.string
}

Chart.defaultProps = {
  data: [],
  color: '#FF52A3'
}

export default Chart
