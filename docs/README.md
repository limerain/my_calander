- 달력 및 시간표를 구현하는 문제로 보고, 이 부분에 한해서는 라이브러리를 사용하지 않았습니다.
- 그 외 버튼이나 날짜 선택창, 팝업 템플릿 부분은 라이브러리를 사용했습니다.
- 설계 문서는 구현 전에 작성된 후에, 약간의 수정을 거쳤습니다. 이에 따라 다소 어색한 부분이 있습니다.

# 앱 구조
- 앱의 전체적 구조는 MVVM 패턴을 바탕으로 설계하였습니다.
- 서버 구현체나 앱의 구현체가 복잡하지 않기 때문에 Clean Architecture 등과 같이 Layer를 깊게 세분화 하지는 않았습니다.
- Model 레이어의 Business Logic을 설계하기 위해 DDD의 Event Storming 방식을 차용했습니다.
- ReactiveX 라이브러리인 RXJS를 통해 State Store를 관리하고, VM 레이어를 구현했습니다.
- View 레이어는 리액트의 Container-Presentational Pattern을 이용하여 설계했습니다.
  - Container-Presentational 패턴은 간단하게 View의 동작에 대한 정의는 Container에, UI 표현은 Presentational 컴포넌트에 맡기는 방법입니다.
