import React, {Component} from 'react';
import XYAxis from "../axis/xy-axis";
import Line from "../line/line";
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
class LineChart extends Component {

    render(){
        const data = this.props.data;
        //const data = [{"name":1,"value":30.222},{"name":2,"value":40.333},{"name":3,"value":50.24},{"name":4,"value":90.99},{"name":5,"value":20.56}]

        const parentWidth = 600;

        const margins = {
            top: 20,
            right: 20,
            bottom: 60,
            left: 60,
        };

        const width = parentWidth - margins.left - margins.right;
        const height = 200 - margins.top - margins.bottom;

        const ticks = 5;
        const t = transition().duration(1000);

        const xScale = scaleBand()
            .domain(data.map(d => d.name))
            .rangeRound([0, width]).padding(0.1);

        const yScale = scaleLinear()
            .domain(extent(data, d => d.value))
            .range([height, 0])
            .nice();

        const lineGenerator = line()
            .x(d => xScale(d.name))
            .y(d => yScale(d.value))
            .curve(curveMonotoneX);
        return (
            <div align="center" id={this.props.id}>
                <svg
                    className="lineChartSvg"
                    width={width + margins.left + margins.right}
                    height={height + margins.top + margins.bottom}
                >
                    <g transform={`translate(${margins.left}, ${margins.top})`}>
                        <XYAxis {...{ xScale, yScale, height, ticks, t }} />
                        <Line id={this.props.id} data={this.props.data} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
                    </g>
                </svg>
                <br></br>
            </div>
        );
    }
}
export default LineChart