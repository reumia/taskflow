// 데모 데이터를 생성하기 위한 JS.
// 브라우저의 Console 에서 아래 코드를 복사하여 실행하세요
var data = {
    0 : [
        {"date":1455523409565,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":1458226800000,"origin":"GRAFOLIO-3000","originLink":"#","detail":["aaa", "bbb"]},
        {"date":1455523409566,"category":"NONE","categoryColor":"","title":"테스트 ㅎㅎ","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb", "ccccddd"]}
    ],
    1 : [
        {"date":1455523409567,"category":"LINEPLAY-DIARY","categoryColor":"red","title":"하트를 준 아바타 : 아바타 위치 수정","deploy":"미정","origin":"E-mail","originLink":"#","detail":[]}
    ],
    2 : [],
    3 : []
};
var myStorage = window.localStorage;
for( var key in data ){
    myStorage.setItem(key, JSON.stringify(data[key]));
}