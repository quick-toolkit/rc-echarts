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

import React, {
  createRef,
  HTMLProps,
  PureComponent,
  ReactElement,
} from 'react';

import { ElementEventName } from 'zrender/src/core/types';
import { ECharts, EChartsCoreOption, init } from 'echarts/core';
import { EChartsInitOpts } from '../../types';
import { Subscription } from '../../event';
import { ECElementEvent } from 'echarts/types/src/util/types';

/**
 * 图表组件
 */
export class RCEcharts extends PureComponent<RCEchartsProps, any> {
  public instance: ECharts;

  private ref = createRef<HTMLDivElement>();

  /**
   * 添加事件监听
   * @param evtName
   * @param handler
   */
  public addEvent(
    evtName: ElementEventName,
    handler: (ev: ECElementEvent) => void
  ): Subscription;

  /**
   * 添加事件监听
   * @param evtName
   * @param query
   * @param handler
   */
  public addEvent(
    evtName: ElementEventName,
    query: string | Object,
    handler: (ev: ECElementEvent) => void
  ): Subscription;

  /**
   * 实现
   * @param args
   */
  public addEvent(...args: any[]): Subscription {
    if (this.instance) {
      this.instance.on(...(args as Parameters<ECharts['on']>));
    }

    return {
      remove: (): void => {
        const find = args.find((x) => typeof x === 'function');
        this.instance.off(args[0], find);
      },
    };
  }

  /**
   * componentDidMount
   */
  public componentDidMount(): void {
    const { theme, config, option, notMerge, lazyUpdate } = this.props;
    window.addEventListener('resize', this.handleResize);
    if (this.ref.current) {
      this.instance = init(this.ref.current, theme, config) as any;
      if (option) {
        option.backgroundColor = 'transparent';
        this.instance.setOption(option, notMerge, lazyUpdate);
      }
    }
  }

  /***
   * componentDidUpdate
   * @param prevProps
   * @param prevState
   * @param snapshot
   */
  public componentDidUpdate(
    prevProps: Readonly<RCEchartsProps>,
    prevState: Readonly<any>,
    snapshot?: any
  ): void {
    const { option, notMerge, lazyUpdate, theme, config } = this.props;
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
      this.instance.setOption(option, notMerge, lazyUpdate);
    }
  }

  /**
   * componentWillUnmount
   */
  public componentWillUnmount(): void {
    if (this.instance) {
      this.instance.dispose();
    }
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * 渲染
   */
  public render(): ReactElement {
    const { className, style } = this.props;
    return <div className={className} style={style} ref={this.ref} />;
  }

  /**
   * 监听重置
   */
  private handleResize = (): void => {
    if (this.instance) {
      this.instance.resize();
    }
  };
}

export * from 'echarts/core';

export interface RCEchartsProps extends HTMLProps<HTMLDivElement> {
  option?: EChartsCoreOption;
  theme?: string | object;
  config?: EChartsInitOpts;
  notMerge?: boolean;
  lazyUpdate?: boolean;
  autoResize?: boolean;
}
