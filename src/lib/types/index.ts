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

export type RendererType = 'canvas' | 'svg';

export type _default = {
  time: {
    month: string[];
    monthAbbr: string[];
    dayOfWeek: string[];
    dayOfWeekAbbr: string[];
  };
  legend: {
    selector: {
      all: string;
      inverse: string;
    };
  };
  toolbox: {
    brush: {
      title: {
        rect: string;
        polygon: string;
        lineX: string;
        lineY: string;
        keep: string;
        clear: string;
      };
    };
    dataView: {
      title: string;
      lang: string[];
    };
    dataZoom: {
      title: {
        zoom: string;
        back: string;
      };
    };
    magicType: {
      title: {
        line: string;
        bar: string;
        stack: string;
        tiled: string;
      };
    };
    restore: {
      title: string;
    };
    saveAsImage: {
      title: string;
      lang: string[];
    };
  };
  series: {
    typeNames: {
      pie: string;
      bar: string;
      line: string;
      scatter: string;
      effectScatter: string;
      radar: string;
      tree: string;
      treemap: string;
      boxplot: string;
      candlestick: string;
      k: string;
      heatmap: string;
      map: string;
      parallel: string;
      lines: string;
      graph: string;
      sankey: string;
      funnel: string;
      gauge: string;
      pictorialBar: string;
      themeRiver: string;
      sunburst: string;
    };
  };
  aria: {
    general: {
      withTitle: string;
      withoutTitle: string;
    };
    series: {
      single: {
        prefix: string;
        withName: string;
        withoutName: string;
      };
      multiple: {
        prefix: string;
        withName: string;
        withoutName: string;
        separator: {
          middle: string;
          end: string;
        };
      };
    };
    data: {
      allData: string;
      partialData: string;
      withName: string;
      withoutName: string;
      separator: {
        middle: string;
        end: string;
      };
    };
  };
};

export type EChartsInitOpts = {
  locale?: string | _default;
  renderer?: RendererType;
  devicePixelRatio?: number;
  useDirtyRect?: boolean;
  width?: number;
  height?: number;
};
