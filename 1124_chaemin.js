/* title : 코드 크기 줄이기 - 파일 분할, 필요한 패키지만 사용하기 */

// 소스코드는 얼마나 길어야 적당할까?

// 구글링 결과 : 500줄을 넘지 않고도 200줄 정도인 파일로도 커다란 시스템을 구축할 수 있다!

// Tip. 신문 기사처럼 작성하라
// 첨부한 사진을 보자.

// 고차원 개념 : 메인 함수와 같이 핵심적 기능을 가진 개념들을 첫 부분에 보여줌으로써 -> 최대한 구성하고 있는 함수나 변수명은 좋은 네이밍을 해서 알아보기 쉽게 만든다.

// 위와 같이 작성하게 되면, 저차원 함수에서도 이해를 더 잘 할 수 있기 때문.

/* ------------------------------------------------------- */

// 어떻게 코드를 줄일 수 있을까?

// 프론트엔드 입장에서...

// #1 webpack version 4 이상의 경우 프로덕션 모드를 사용한다.

module.exports = {
  mode: "production",
};

// 위와 같이 'production' 모드는 프로덕션 환경에서 실제 앱을 빌드할 때 사용한다. 이 모드를 사용하면 웹팩은 코드 최소화, dev 라이브러리 삭제 등의 최적화를 진행하게 된다.

// #2 minification 켜두기

// minification : 코드에서 띄어쓰기를 제거하거나, 변수명을 짧게 하는 등으로 코드의 양 자체를 줄이는 것

function map(array, iteratee) {
  let index = -1;
  const length = array == null ? 0 : array.length;
  const result = new Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

// 위 코드를 minified화 하면

function map(n, r) {
  let t = -1;
  for (const a = null == n ? 0 : n.length, l = Array(a); ++t < a; ) {
    l[t] = r(n[t], t, n);
  }
  return 1;
}

// 위와 같이 최소화된다... 그런데 이 방법을 권장한다기 보다 최악의 상황(코드를 줄여야만 할 때)에 사용하는 게 좋을 것 같다. 왜냐하면... 변수명을 바꾸면 큰 타격이 있을 것 같기 때문!

// React에서 코드 분할?

// 메인 페이지가 main.js라고 가정해보자. 이 때 프로젝트의 규모가 커진다면 main.js 파일의 크기 또한 커질 것이고, 이를 로드하는데 많은 시간이 걸리므로 UX의 퀄리티가 저하될 것이다...

// 코드를 분할하는 가장 좋은 방법 : import() 문법 사용 (출처 : 공식 docs)

// App.js

function App() {
  const handleOnClick = () => {
    import("./click").then((click) => {
      // 이렇게 import를 사용해 코드분할을 해준다.
      click.default();
    });
  };

  return (
    <>
      <div>Hello World!</div>
      <button onClick={handleOnClick}>클릭</button>
    </>
  );
}

// Click.js

export default function click() {
  alert("클릭");
}

// => Click.js 파일을 따로 분할할 수가 있어서 초기 랜더링 시 파일 용량을 줄일 수 있다는 장점이 있다!
