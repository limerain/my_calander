// import { monthStore, MonthState } from '../store/global_store';
// import { from, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

class CalanderViewModel {
  //   public enumerateDevices(): Observable<any> {
  //     return from(
  //       (window as any).desktopCapturer.getSources({
  //         types: ['window', 'screen'],
  //       }),
  //     );
  //   }
  //   public getCaptureStream(constraints: MediaStreamConstraints): Observable<MediaStream> {
  //     return from(navigator.mediaDevices.getUserMedia(constraints)).pipe(
  //       tap((stream: MediaStream) => {
  //         captureStore.setCaptureStream(stream);
  //       }),
  //     );
  //   }
}

const CalanderVM = new CalanderViewModel();
export default CalanderVM;
