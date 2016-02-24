# TaskFlow

#### Todo

* Task에 Draggable, Sortable UI Library 추가
    * ~[RubaXa](https://github.com/RubaXa/Sortable) 라이브러리 참고~
    * 직접 개발하거나 좀 더 Light한 프레임워크 찾을 필요가 있음.
* Data Update에 Object.observe 고려

#### React

* [map() 함수로 반복 호출된 자식 노드에 this 바인드하기](http://stackoverflow.com/questions/27707911/add-event-handler-to-react-dom-element-dynamically)
* [부모 컴퍼넌트에 접근하기](https://facebook.github.io/react/tips/communicate-between-components.html)

#### Done

* jQuery.addClass()를 대체할 React에서의 방법론
    * [Classnames](https://github.com/JedWatson/classnames) 라이브러리 참고
    * 적용하기 위해서는 gulp로 서버를 띄울 때에 React를 컴파일 하는 설정이 필요함
    * 위 내용 적용을 위해 [Great React + Browserify Gulpfile](https://gist.github.com/mtomcal/e2ea440852e90e6d0cc5) 참고