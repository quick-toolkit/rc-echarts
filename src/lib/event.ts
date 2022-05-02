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

/**
 * 变种添加事件监听函数方法
 * @param event
 * @param listener
 * @param options
 */
export function addEvent<K extends keyof WindowEventMap>(
  event: K,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): Subscription {
  window.addEventListener(event, listener, options);
  return {
    remove: (): void => {
      window.removeEventListener(event, listener);
    },
  };
}

export interface Subscription {
  remove: () => void;
}
