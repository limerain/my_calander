# 개요
이 프로젝트는 Create React App을 기반으로 구축되었습니다. 또한, yarn을 기반으로 최적화되었습니다.

앱을 동작시키기 위해서는 아래와 같이 입력합니다.
### `yarn start`

명령어 입력 시 [http://localhost:3000](http://localhost:3000)에서 앱을 확인할 수 있습니다.

# 설계 자료
본 프로젝트는 MVVM의 패턴으로 설계되었으며, Business Logic은 Domain Driven Design의 Event Storming을 기반으로 진행했습니다.

UI구조는 React의 Container-Presentational 패턴으로 설계했습니다.

설계 사항에 대한 자세한 내용은 docs 디렉토리에 있습니다.