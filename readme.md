# TaskFlow

#### Todo

* Task에 Draggable, Sortable UI Library 추가
    * ~~[RubaXa](https://github.com/RubaXa/Sortable) : 적용하기 복잡하고 예제가 어려움~~
    * [React Sortable](http://webcloud.se/react-sortable/) : 간단하고 데이터구조 변경도 쉬워보이나 여러 리스트간의 데이터 이동을 어떨지..?
    * [React Sortable List](https://github.com/StevenIseki/react-sortable-list) : Mixin이 아니라서 바로 사용가능할 듯. 최소한의 툴.
    * 그냥 개발해 볼까?
        * [HTML5 Drag & Drop API](http://www.w3schools.com/html/html5_draganddrop.asp)
        * [Drag & Drop for React](http://gaearon.github.io/react-dnd/)
    * 그냥 하지 말까?
        * Sorting 은 어떻게 처리할 것이냐 : 날짜별로 정의하면 문제될 거 없을 듯
* Data Update에 [Object.observe](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/observe) 고려
* 추가/취소 버튼 상단으로 옮기기
* 키보드 단축키 만들기
* Index Key 값 생성 : UUID
* 배포일자 입력 이슈
    * ~~숫자로만 입력 가능하도록 Validate~~
    * 연도 숫자 4개, 월 숫자 2개 다음에 '-' 구분자 자동으로 붙도록?
    * 숫자 8개까지만 입력가능하도록
* React Mixin 으로 레이어 Mixin 생성하여 반복 사용하도록 해보자.
* Input Group 내 버튼 위치
    * 추가 버튼 우측 처리
    * 삭제 버튼도 우측에 추가 (input 내 margin 값 있는 상태로)
* DetailItem : 체크정보만 Task에 바로 반영됨
* ValidateDate : 중간에 입력될 경우도 확인
* getObjectSize : Mixin 화

#### React

* [React와 Browserify 사용을 위한 Gulp 예제 : Great React + Browserify Gulpfile](https://gist.github.com/mtomcal/e2ea440852e90e6d0cc5)
* [map() 함수로 반복 호출된 자식 노드에 this 바인드하기](http://stackoverflow.com/questions/27707911/add-event-handler-to-react-dom-element-dynamically)
* [부모 컴퍼넌트에 접근하기](https://facebook.github.io/react/tips/communicate-between-components.html)
* [컴퍼넌트간의 이벤트 참조와 상속](http://stackoverflow.com/questions/21054955/react-js-reference-function-in-another-component)
* [jQuery.addClass()를 React에서 구현하는 방법 : Classnames 유틸리티의 활용](https://github.com/JedWatson/classnames)
* [React 간단 매뉴얼](http://ricostacruz.com/cheatsheets/react.html)
* [Input에 value 값을 설정할 경우 타이핑이 안되는 문제](http://facebook.github.io/react/docs/forms.html#controlled-components)
* [React의 State와 Props](https://github.com/reumia/react-guide/blob/master/props-vs-state.md)
    * 최대한 State는 사용하지 않아야 한다. 데이터에 대한 직접적인 관여를 하는 컴퍼넌트에만 State를 생성해라
    * [State가 Props를 참조하는 것은 안티패턴이다](https://facebook.github.io/react/tips/props-in-getInitialState-as-anti-pattern.html)
    * [Best Practices for Component State](http://brewhouse.io/blog/2015/03/24/best-practices-for-component-state-in-reactjs.html)

#### 복기해볼 문제

* [\[d609d9f\]](https://github.com/reumia/taskflow/commit/d609d9fade3d3fa5507ba6b597f0077c86434ecd) Detail Item 추가 시에 데이터가 초기화되던 이슈