export class AnimationLoop {
  private readonly active = new Set<Promise<any>>();

  enqueue(promise: Promise<any>) {
    this.active.add(promise);
    promise.finally(() => this.active.delete(promise));
  }

  drain() {
    return Promise.all(this.active);
  }

  hasPending() {
    return this.active.size > 0;
  }
}
