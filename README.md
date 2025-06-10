# 🏭 smartlogistics


### 개발환경
- OS : Window, Mac
- IDE : Visual Studio Code, IntelliJ

### 기술스택
- FE : `React`
- BE : `SpringBoot 2.7.8` / `Java 17`
- DB : `MariaDB`
- Build Tool: `Maven`


<br />
<br />
<br />
<br />
<br />

---
#### 🔄 실행
- FE
  - 코드 수정
  ``` JSON
  /* package.json */
  "node-sass": "^8.0.0",   //  "sass": "^1.75.0" 으로 수정
  "sass-loader": "^13.2.2"
  ```
  - `npm install`
  - `26 vulnerabilities (4 low, 10 moderate ...`와 같은 경고와 보안 리포트 출력 시 `npm audit fix`
  - 다시 `npm install`
 
- BE
  - `Application.java` 실행
    - Build 오류 시 [캐시 삭제](https://es2sun.tistory.com/246), [JAVA 버전 확인](https://dev-emmababy.tistory.com/139) 하나씩 해보기
    - <details>
        <summary>Maven Runner 확인</summary>
      
        ![Image](https://github.com/user-attachments/assets/0272d6c9-b218-471d-be2c-077fcfc78c45)
      
      </details>
    - cannot resolve symbol.. 오류 시 [설정값 초기화](https://star992411.tistory.com/45)
  - [lombok 사용하기 in intelliJ ](https://inpa.tistory.com/entry/IntelliJ-%F0%9F%92%BD-Lombok-%EC%84%A4%EC%B9%98-%EB%B0%A9%EB%B2%95-%EC%98%A4%EB%A5%98-%ED%95%B4%EA%B2%B0)
    
