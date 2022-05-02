# rc-echarts
The `rc-echarts` uses `echarts@5` developed a react component.

## Installing

```shell
npm i echarts @quick-toolkit/rc-echarts
#or
yarn add echarts @quick-toolkit/rc-echarts
```

## Example Usage

```tsx
// 引入柱状图图表，图表后缀都为 Chart
import {BarChart} from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    DatasetComponentOption,
    TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import {LabelLayout, UniversalTransition} from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import {CanvasRenderer} from 'echarts/renderers';
import {RCEcharts, use, EChartsCoreOption, ECharts} from "@quick-toolkit/rc-echarts";
import {createRef, useMemo} from "react";

use([
    BarChart,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    DatasetComponentOption,
    TransformComponent,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer
])

const config: EChartsInitOpts = {
    renderer: 'canvas'
}

export const Component = () => {
    const option = useMemo<EChartsCoreOption>(() => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [
                {
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        }
    }, []);

    const ref = createRef<ECharts>();

    return (
        <RCEcharts
            ref={ref}
            option={option}
            config={config}
        />
    )
}
 ```

## Documentation
- [echarts](https://echarts.apache.org/examples/zh/index.html)
- [ApiDocs](https://quick-toolkit.github.io/rc-echarts/)
- [GitRepository](https://github.com/quick-toolkit/rc-echarts)


## Issues
Create [issues](https://github.com/quick-toolkit/rc-echarts/issues) in this repository for anything related to the rc-echarts. When creating issues please search for existing issues to avoid duplicates.


## License
Licensed under the [MIT](https://github.com/quick-toolkit/rc-echarts/blob/master/LICENSE) License.
