# Medi&C 홈페이지 — www.medinc.co.kr

정적 사이트(GitHub Pages). 페이지: 홈 · #services · #process · #global · #contact, KR/EN 전환.

## 폴더
- `index.html` — 사이트 본체
- `img/` — 사진 (파일명 그대로 교체하면 반영)
- `fonts/` — Pretendard(사이트에 쓰는 글자만 추린 버전)
- `apps-script/Code.gs` — 상담 신청 자동 접수용 구글 Apps Script
- `CNAME` — www.medinc.co.kr

## 가비아 DNS
| 타입 | 호스트 | 값 |
|---|---|---|
| CNAME | www | jone869816-lang.github.io. |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

구글 워크스페이스 MX·TXT 레코드와 in.medinc.co.kr 레코드는 그대로 둡니다.

## 상담 신청 자동 접수
연결 완료(2026-11-11): medinc@ 계정 시트 "메디앤씨 홈페이지 상담신청" + Apps Script "메디앤씨 상담접수" 웹앱. 코드를 고치면 [배포 → 배포 관리 → 수정 → 새 버전]으로 같은 주소에 재배포.

1. medinc@medinc.co.kr 계정으로 구글 시트 새로 만들기 (이름: 홈페이지 상담신청)
2. 확장 프로그램 → Apps Script → `apps-script/Code.gs` 내용 붙여넣기 → 저장
3. 함수 `testSubmit` 실행 → 권한 승인 → info@로 테스트 메일 오는지 확인
4. 배포 → 새 배포 → 유형: 웹 앱 / 실행: 나 / 액세스: 모든 사용자 → 웹 앱 URL 복사
5. `index.html`에서 `var FORM_ENDPOINT="";` 따옴표 안에 URL 붙여넣고 저장

## 빌드 (2026-11-12~)
원본은 저장소 밖 `v4.body.html` 한 파일이고, `python3 build.py`가 언어×페이지 25개 정적 페이지와 sitemap.xml을 만든다.
- 주소: / , /services/ , /process/ , /global/ , /contact/ (한국어) — /en/ /ja/ /zh-cn/ /zh-tw/ 아래 같은 구조
- 각 페이지는 해당 언어 텍스트만 담고, 제목·설명·canonical·hreflang이 따로 들어간다
- 예전 주소(/#services 등)는 자동으로 새 주소로 넘어간다
