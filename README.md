# EasyFood

Spring Boot와 React를 활용한 레시피 관리 애플리케이션 예제 프로젝트입니다.

## 서버 실행

```bash
cd server
gradle bootRun
```

MariaDB에서 `easyfood` 데이터베이스와 사용자(`easyfood`/`pass123`)를 미리 생성해야 합니다.
애플리케이션 시작 시 기본 계정 `admin`/`pass` 가 생성됩니다.

## 클라이언트 실행

```bash
cd client
npm install
npm start
```

서버와 클라이언트는 각각 8080, 3000 포트를 사용합니다.
