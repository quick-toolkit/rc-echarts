/**
 * MIT License
 *
 *  Copyright (c) 2021 @quick-toolkit/rc-echarts ranyunlong<549510622@qq.com>
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { createRef, CSSProperties, PureComponent } from 'react';

import { EChartsCoreOption, init } from 'echarts/core';
import { EChartsInitOpts } from '../../types';
import { ECharts } from 'echarts';
import { Subscription } from '../../event';
import { ElementEventName } from 'zrender/src/core/types';
import { ECElementEvent } from 'echarts/types/src/util/types';

/**
 * Component RCEcharts
 */
export class RCEcharts extends PureComponent<RCEchartsProps, any> {
  public instance: ECharts;

  private ref = createRef<HTMLDivElement>();

  public addEvent(
    evtName: ElementEventName,
    handler: (ev: ECElementEvent) => void
  ): Subscription;

  public addEvent(
    evtName: ElementEventName,
    query: string | Object,
    handler: (ev: ECElementEvent) => void
  ): Subscription;

  public addEvent(...args: any[]): Subscription {
    if (this.instance) {
      this.instance.on(...(args as Parameters<ECharts['on']>));
    }

    return {
      remove: () => {
        const find = args.find((x) => typeof x === 'function');
        this.instance.off(args[0], find);
      },
    };
  }

  public componentDidMount() {
    const {
      theme,
      config,
      option,
      notMerge = true,
      lazyUpdate = true,
    } = this.props;
    window.addEventListener('resize', this.handleResize);
    if (this.ref.current) {
      this.instance = init(this.ref.current, theme, config) as any;
      if (option) {
        option.backgroundColor = 'transparent';
        this.instance.setOption(option, {
          notMerge,
          lazyUpdate,
        });
      }
    }
  }

  public componentDidUpdate(
    prevProps: Readonly<RCEchartsProps>,
    prevState: Readonly<any>,
    snapshot?: any
  ) {
    const {
      option,
      notMerge = true,
      lazyUpdate = true,
      theme,
      config,
    } = this.props;
    if (theme !== prevProps.theme && this.instance && this.ref.current) {
      this.instance.dispose();
      this.instance = init(this.ref.current, theme, config) as any;
    }
    if (
      this.instance &&
      option &&
      (option !== prevProps.option ||
        notMerge !== prevProps.notMerge ||
        lazyUpdate !== prevProps.lazyUpdate)
    ) {
      option.backgroundColor = 'transparent';
      this.instance.resize();
      this.instance.setOption(option, {
        notMerge,
        lazyUpdate,
      });
    }
  }

  public componentWillUnmount() {
    if (this.instance) {
      this.instance.dispose();
    }
    window.removeEventListener('resize', this.handleResize);
  }

  public render() {
    const { className, style } = this.props;
    return <div className={className} style={style} ref={this.ref} />;
  }

  private handleResize = () => {
    if (this.instance) {
      this.instance.resize();
    }
  };
}

export interface RCEchartsProps {
  className?: string;
  style?: CSSProperties;
  option?: EChartsCoreOption;
  theme?: string | object;
  config?: EChartsInitOpts;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  autoResize?: boolean;
}

export * from 'echarts/core';

export * from '../../event';
export * from '../../types';
