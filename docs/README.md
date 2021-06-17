# 앱 구조
- 앱의 전체적 구조는 MVVM 패턴을 바탕으로 설계하였습니다.
- 서버 구현체나 앱의 구현체가 여러 개로 분화되지 않기 때문에 Clean Architecture 등과 같이 Layer를 깊게 세분화 하지는 않았습니다.
- Model 레이어의 Business Logic을 설계하기 위해 DDD의 Event Storming 방식을 차용했습니다.
- ReactiveX 라이브러리인 RXJS를 통해 State Store를 관리하고, VM 레이어를 구현했습니다.
- View 레이어는 리액트의 Container-Presentational Pattern을 이용하여 설계했습니다.
  - Container-Presentational 패턴은 간단하게 View의 동작에 대한 정의는 Container에, UI 표현은 Presentational 컴포넌트에 맡기는 방법입니다.
