import { Subject, Subscription } from 'rxjs';

class StoreTemplate {
  protected state_: any;

  protected subject_ = new Subject();

  readonly initialState: any;

  constructor(initialState: any) {
    this.initialState = initialState;
    this.state_ = this.initialState;
  }

  public init(setState: any): Subscription {
    const subs = this.subject_.subscribe(setState);
    this.state_ = {
      ...this.state_,
      error: '',
    };
    this.subject_.next(this.state_);
    return subs;
  }

  public getData(): any {
    return this.state_;
    /* let data;
    const subs = this.subject_.pipe(first(), take(1)).subscribe((event) => {
      data = event;
    });
    this.subject_.next(this.state_);
    subs.unsubscribe();
    return data; */
  }

  public clear(): void {
    this.state_ = this.initialState;
    this.subject_.next(this.state_);
  }

  protected subscribe(onNext: any): Subscription {
    return this.subject_.subscribe(onNext);
  }

  protected nextState(state: any): void {
    this.state_ = state;
    this.subject_.next(state);
  }
}

export default StoreTemplate;
