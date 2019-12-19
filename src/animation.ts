import { Complete } from 'popmotion/lib/observer/types';
import { easing, TweenProps } from 'popmotion';

export class AnimationQueue {
  private readonly active = new Set<Promise<any>>();

  enqueue(executor: (complete: Complete) => void) {
    const promise = new Promise(executor);
    this.active.add(promise);
    promise.finally(() => this.active.delete(promise));
  }

  drain() {
    return Promise.all(this.active);
  }

  isEmpty() {
    return this.active.size == 0;
  }
}

export function fallAnimation(y: number): TweenProps {
  return {
    from: y,
    to: y - 30,
    ease: easing.createExpoIn(2),
    duration: 1000,
  };
}
