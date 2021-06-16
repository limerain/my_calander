import StoreTemplate from '@store/store_util';

export type MonthState = {
  error: string;
};

class MonthStore extends StoreTemplate {
  constructor() {
    super({
      capture_stream: null,
      error: '',
    });
  }

  public setMonthState(state: MonthState) {
    this.nextState(state);
  }

  //   public setCaptureStream(capture_stream: MediaStream | null) {
  //     this.nextState({
  //       ...this.state_,
  //       capture_stream,
  //     });
  //   }

  public setMonthStateError(error: any): void {
    this.nextState({
      ...this.state_,
      error,
    });
  }
}

const monthStore = new MonthStore();
export default monthStore;
