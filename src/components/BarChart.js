import * as React from 'react';
import {Renderer} from '@chart-parts/react-svg-renderer';
import {scene, rect, axis} from '@chart-parts/builder';
import {Dimension, AxisOrientation} from '@chart-parts/interfaces';
import {linear, band} from '@chart-parts/scales';
import {Orchestrator} from '@chart-parts/orchestrator';

const renderer = new Renderer();
const pipeline = new Orchestrator(renderer);

const data = [
  {category: 'A', amount: 28},
  {category: 'B', amount: 55},
  {category: 'C', amount: 43},
  {category: 'D', amount: 91},
  {category: 'E', amount: 81},
  {category: 'F', amount: 53},
  {category: 'G', amount: 19},
  {category: 'H', amount: 87},
];

export default class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hoverRowIndex: undefined};
    const isHovered = index => this.state.hoverRowIndex === index;
    console.log({
      AxisOrientation,
      Dimension,
      scene: scene.toString(),
      data,
    });
    this.chart = scene(
      n => {
        console.log({n});
        try {
          return n
            .scale(
              linear('y')
                .domain('data.amount')
                .range(Dimension.Height)
                .nice(),
              band('x', 'xband')
                .domain('data.category')
                .range(Dimension.Width)
                .padding(0.05)
            )
            .axes(
              axis('x', AxisOrientation.Bottom),
              axis('y', AxisOrientation.Left),
              axis('x', AxisOrientation.Top),
              axis('y', AxisOrientation.Right)
            )
            .mark(
              rect()
                .singleton(false)
                .table('data')
                .encode({
                  x: ({d, x}) => x(d.category),
                  y: ({d, y}) => y(d.amount),
                  y2: ({y}) => y(0),
                  width: ({xband}) => xband(),
                  fill: ({index}) => (isHovered(index) ? 'firebrick' : 'steelblue'),
                })
                .handle({
                  onMouseEnter: ({index}) => {
                    if (this.state.hoverRowIndex !== index) {
                      this.setState({hoverRowIndex: index});
                    }
                  },
                  onMouseLeave: ({index}) => {
                    if (this.state.hoverRowIndex === index) {
                      this.setState({hoverRowIndex: undefined});
                    }
                  },
                })
            );
        } catch (error) {
          console.error(error);
        }
      },
      {width: 400, height: 200}
    ).build();
  }

  render() {
    return pipeline.renderScene(this.chart, {width: 400, height: 200, padding: 30}, {data});
  }
}
