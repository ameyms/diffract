import React, {PropTypes} from 'react';
import Chart from './Chart';
import Pie from './Pie';

const Donut = ({
    radius, innerRadius, segmentColor, subtitle, title, data
}) => {
    innerRadius = innerRadius || radius * 0.75;
    title = title || '';
    subtitle = subtitle || '';
    console.log(radius, innerRadius);


    return (
        <Chart width={radius * 2} height={radius * 2} data={data}>
            <Pie innerRadius={innerRadius} outerRadius={radius}
                style={(d, i) => ({fill: segmentColor(i)})}>
                <text className="donut-title" textAnchor="middle"
                    x={0} y={0} fontSize={18}>
                    {title}
                </text>
                <text className="donut-subtitle" textAnchor="middle"
                    x={0} y={18} fontSize={10}>
                    {subtitle}
                </text>
            </Pie>
        </Chart>
    );
};

Donut.displayName = 'Donut';

Donut.propTypes = {
    radius: PropTypes.number,
    innerRadius: PropTypes.number,
    segmentColor: PropTypes.func,
    subtitle: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.number),
    width: PropTypes.number
};

export default Donut;
