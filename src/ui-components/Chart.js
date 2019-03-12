import React, { memo } from 'react'
import PropTypes from 'prop-types'
import css from '../ui-styles/c-chart.module.scss';
import { ResponsiveBar } from 'nivo/lib/components/charts/bar';

const Chart = memo(function Chart(props) {

  return (
    <div className={css.container} style={{height: '120px'}}>
      <ResponsiveBar
        data={props.dataSource ? props.dataSource : []}
        keys={["amount",]}
        indexBy="country"
        margin={{ "top": 10, "bottom": 20,}}
        padding={0.5}
        colors={['hsl(24, 100%, 50%)']}
        colorBy="id"
        borderRadius={2}
        borderColor="inherit:darker(1.6)"
        axisRight={null}
        axisBottom={{
          "tickSize": 0,
          "tickPadding": 4
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        animate={false}
        motionStiffness={300}
        motionDamping={40}
        enableGridY={true}
        enableLabel={false}
        tooltip={() => <div>test</div>}
      />
    </div>
  )
})

Chart.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object)
}

export default Chart


