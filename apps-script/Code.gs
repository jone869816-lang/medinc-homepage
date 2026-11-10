/**
 * 메디앤씨 홈페이지 상담 신청 접수
 * - 홈페이지 문의 폼 → 이 구글 시트에 한 줄씩 기록
 * - 동시에 info@medinc.co.kr 로 알림 메일 발송
 *
 * 설치: 구글 시트 [확장 프로그램 → Apps Script]에 이 코드를 붙여넣고
 *       [배포 → 새 배포 → 웹 앱] (실행: 나 / 액세스: 모든 사용자)
 */

var NOTIFY_TO = 'info@medinc.co.kr';
var SHEET_NAME = '상담신청';
var HEADERS = ['접수일시', '병원명', '성함·직책', '연락처', '이메일', '병원 상황', '지역', '관심 서비스', '문의 내용', '언어', '페이지', '처리상태', '담당자', '메모'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  if (!p.clinic || !p.name || !p.phone) {
    return ContentService.createTextOutput('missing');
  }
  var sheet = getSheet_();
  var now = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm');
  sheet.appendRow([
    now, clean_(p.clinic), clean_(p.name), clean_(p.phone), clean_(p.email),
    clean_(p.stage), clean_(p.area), clean_(p.services), clean_(p.message),
    clean_(p.lang), clean_(p.page), '신규', '', ''
  ]);

  var subject = '[홈페이지 상담신청] ' + clean_(p.clinic) + ' · ' + clean_(p.name);
  var body =
    '홈페이지로 새 상담 신청이 들어왔습니다.\n\n' +
    '접수일시: ' + now + '\n' +
    '병원명: ' + clean_(p.clinic) + '\n' +
    '성함·직책: ' + clean_(p.name) + '\n' +
    '연락처: ' + clean_(p.phone) + '\n' +
    '이메일: ' + (clean_(p.email) || '-') + '\n' +
    '병원 상황: ' + clean_(p.stage) + '\n' +
    '지역: ' + (clean_(p.area) || '-') + '\n' +
    '관심 서비스: ' + clean_(p.services) + '\n\n' +
    '문의 내용:\n' + (clean_(p.message) || '-') + '\n\n' +
    '접수 시트: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl();
  var opts = { name: 'Medi&C 홈페이지' };
  if (p.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(p.email)) opts.replyTo = p.email;
  MailApp.sendEmail(NOTIFY_TO, subject, body, opts);

  return ContentService.createTextOutput('ok');
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function clean_(v) {
  v = String(v || '').slice(0, 2000);
  return /^[=+\-@]/.test(v) ? "'" + v : v; // 시트 수식 주입 방지
}

/** 배포 전 테스트: 편집기에서 이 함수를 한 번 실행하면 권한 승인 + 테스트 메일 발송 */
function testSubmit() {
  doPost({ parameter: { clinic: '테스트의원', name: '홍길동 원장', phone: '010-0000-0000', stage: '개원 예정', services: '홈페이지', message: '설치 테스트입니다.' } });
}
