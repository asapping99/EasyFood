# 🖼️ 배경 이미지 설정 완료 가이드

## ✅ 현재 설정

배경 이미지 파일명: **`home_bg.png`**

---

## 📁 이미지 위치

```
H:\dev_project\EasyFood\client\public\home_bg.png
```

### 파일 구조
```
client/
└── public/
    ├── index.html
    ├── favicon.ico
    └── home_bg.png  ← 여기에 있어야 합니다!
```

---

## 🎯 현재 적용된 코드

```javascript
// HomePage.jsx
<div 
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url('/home_bg.png')`,
    backgroundPosition: 'center center',
  }}
>
```

---

## 🚀 실행 방법

### 1. 파일 확인
```
H:\dev_project\EasyFood\client\public\home_bg.png
```
파일이 위 경로에 있는지 확인하세요!

### 2. 개발 서버 실행
```bash
cd H:\dev_project\EasyFood\client
npm start
```

### 3. 브라우저에서 확인
자동으로 **http://localhost:3000** 열림

### 4. 캐시 삭제 후 새로고침
- **Windows**: Ctrl + Shift + R
- **Mac**: Cmd + Shift + R

---

## ✨ 적용된 효과

### 메인 페이지 (Hero Section)
- ✅ 전체 화면 배경 이미지 (`home_bg.png`)
- ✅ 그라데이션 오버레이 (텍스트 가독성)
- ✅ 흰색 텍스트 + 그림자
- ✅ 떠다니는 나뭇잎 애니메이션
- ✅ 반응형 디자인

---

## 🔍 트러블슈팅

### 이미지가 안 보일 때

#### 1. 파일 위치 확인
```
✅ 올바른 위치: client/public/home_bg.png
❌ 틀린 위치: client/src/home_bg.png
❌ 틀린 위치: client/public/images/home_bg.png
```

#### 2. 파일명 확인
```
✅ 올바른 이름: home_bg.png
❌ 틀린 이름: home-bg.png
❌ 틀린 이름: homeBg.png
❌ 틀린 이름: HOME_BG.png
```

#### 3. 해결 방법
1. 파일 경로 재확인
2. 브라우저 캐시 삭제 (Ctrl + Shift + R)
3. 개발 서버 재시작
   ```bash
   Ctrl + C (종료)
   npm start (재시작)
   ```

---

## 🎨 이미지 최적화

### PNG 파일 최적화
- **TinyPNG**: https://tinypng.com
- **압축 목표**: 500KB ~ 1MB

### 권장 사양
- **해상도**: 1920x1080 이상
- **파일 크기**: 1MB 이하
- **포맷**: .png (투명도 지원)

---

## 🔧 커스터마이징

### 오버레이 밝기 조절

#### 더 밝게 (이미지 더 보이게)
```javascript
// HomePage.jsx에서 수정
<div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
```

#### 더 어둡게 (텍스트 더 선명하게)
```javascript
<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
```

### 배경 위치 조절
```javascript
style={{
  backgroundImage: `url('/home_bg.png')`,
  backgroundPosition: 'center top',    // 상단 중앙
  // backgroundPosition: 'center bottom', // 하단 중앙
  // backgroundPosition: 'left center',   // 좌측 중앙
}}
```

---

## 📱 반응형 확인

### 테스트 화면 크기
- 📱 모바일: 375px ~ 767px
- 📱 태블릿: 768px ~ 1023px
- 💻 데스크톱: 1024px ~ 1439px
- 🖥️ 대형: 1440px 이상

### Chrome DevTools 사용법
1. F12 키 누르기
2. 좌측 상단 모바일 아이콘 클릭
3. 다양한 기기 선택해서 테스트

---

## 💡 대안: 다른 이미지 사용

### 이미지 교체 방법

#### 옵션 1: 파일명 유지
```
새 이미지를 home_bg.png로 저장 → 덮어쓰기
```

#### 옵션 2: 코드 수정
```javascript
// HomePage.jsx에서 수정
backgroundImage: `url('/새이미지명.png')`
```

### 외부 URL 사용
```javascript
backgroundImage: `url('https://your-cdn.com/image.png')`
```

---

## ✅ 최종 체크리스트

설정 완료 확인:

- [x] 이미지를 `client/public/home_bg.png`에 저장
- [x] 파일명 정확: `home_bg.png`
- [x] 코드 수정 완료: `HomePage.jsx`
- [ ] 개발 서버 실행 (`npm start`)
- [ ] 브라우저에서 확인
- [ ] 캐시 삭제 후 새로고침
- [ ] 모바일/태블릿 테스트

---

## 🌟 완료!

이제 **`home_bg.png`** 파일이 메인 페이지 배경으로 적용됩니다!

개발 서버를 실행하고 확인해보세요! 🚀

```bash
npm start
```

---

## 📞 추가 도움

문제가 발생하거나 추가 수정이 필요하시면 말씀해주세요! 😊

---

*Updated: 2025-10-03*
*Image File: home_bg.png*
