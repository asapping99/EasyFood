# 🌲 배경 이미지 적용 - 빠른 시작 가이드

## ✅ 설정 완료!

배경 이미지 파일: **`home_bg.png`**

---

## 🚀 3단계로 완료!

### 1️⃣ 이미지 위치 확인

파일이 다음 경로에 있는지 확인하세요:

```
H:\dev_project\EasyFood\client\public\home_bg.png
```

✅ **현재 이 위치에 있어야 합니다!**

---

### 2️⃣ 개발 서버 실행

터미널에서 실행:

```bash
cd H:\dev_project\EasyFood\client
npm start
```

자동으로 브라우저가 열립니다!

---

### 3️⃣ 브라우저에서 확인

1. **http://localhost:3000** 자동 오픈
2. 배경 이미지 확인
3. 안 보이면 **캐시 삭제**: `Ctrl + Shift + R`

---

## 🎨 완성 화면

```
┌─────────────────────────────────────┐
│                                     │
│   [home_bg.png 전체 화면 배경]      │
│                                     │
│         🌲                           │
│      레시피 숲                        │
│    Recipe Forest                    │
│                                     │
│  자연의 신선함을 담은 레시피         │
│                                     │
│  [시작하기] [둘러보기]               │
│                                     │
│         ↓                           │
└─────────────────────────────────────┘
```

---

## 🔍 안 보일 때 체크리스트

- [ ] 파일 위치: `client/public/home_bg.png` ✅
- [ ] 파일명: `home_bg.png` (정확히) ✅
- [ ] 서버 실행: `npm start` ✅
- [ ] 캐시 삭제: `Ctrl + Shift + R` ✅

---

## 💡 빠른 해결 방법

### 이미지가 안 보이면?

```bash
# 1. 서버 종료
Ctrl + C

# 2. 파일 위치 재확인
dir H:\dev_project\EasyFood\client\public

# 3. 서버 재시작
npm start

# 4. 브라우저 캐시 삭제
Ctrl + Shift + R
```

---

## 🎯 현재 적용 코드

```javascript
// HomePage.jsx (이미 수정 완료!)
backgroundImage: `url('/home_bg.png')`
```

---

## ✨ 적용된 효과

- ✅ 전체 화면 배경 (`home_bg.png`)
- ✅ 그라데이션 오버레이
- ✅ 흰색 텍스트 + 그림자
- ✅ 떠다니는 나뭇잎
- ✅ 반응형 디자인
- ✅ 스크롤 인디케이터

---

## 📱 모바일에서도 확인

Chrome DevTools (F12) → 모바일 아이콘 클릭

---

## 🌟 완료!

이제 **레시피 숲**의 메인 페이지에 
아름다운 배경 이미지가 적용되었습니다! 🎉

### 지금 실행:
```bash
npm start
```

---

## 📞 문제 발생 시

이미지가 보이지 않거나 문제가 있으면 말씀해주세요! 😊

---

**🌲 레시피 숲을 즐기세요!**

*Image: home_bg.png*
*Updated: 2025-10-03*
