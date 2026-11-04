/**
 * SnowLink instructor application email receiver.
 * Deploy as a Google Apps Script Web App that executes as the owner.
 */

function configureRecipient() {
  // Replace this placeholder locally, run once, then restore it before committing.
  PropertiesService.getScriptProperties().setProperty('RECIPIENT_EMAIL', 'YOUR_EMAIL@example.com');
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'SnowLink instructor applications' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var recipient = PropertiesService.getScriptProperties().getProperty('RECIPIENT_EMAIL');
  if (!recipient) throw new Error('RECIPIENT_EMAIL is not configured.');

  var data = JSON.parse(e.postData.contents || '{}');
  // Honeypot: bots commonly fill this field, while real users never see it.
  if (data.website) {
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  }
  var attachments = [];
  var proof = data.employment_proof || {};
  if (proof.base64) {
    var proofBytes = Utilities.base64Decode(proof.base64);
    if (proofBytes.length > 10 * 1024 * 1024) throw new Error('Employment proof exceeds 10MB.');
    var safeFileName = String(proof.name || 'employment-proof')
      .replace(/[^a-zA-Z0-9._\-\u4e00-\u9fff]/g, '_')
      .slice(0, 120);
    attachments.push(Utilities.newBlob(proofBytes, proof.type || 'application/octet-stream', safeFileName));
  }
  var subject = '[雪语教练申请] ' + (data.display_name || data.legal_name || '未填写姓名') + ' · ' + (data.resort_name || '未选择雪场');
  var rows = [
    ['提交时间', data.submitted_at],
    ['法律姓名', data.legal_name],
    ['主页姓名', data.display_name],
    ['邮箱', data.email],
    ['电话', data.phone],
    ['通票', data.pass],
    ['州', data.resort_state || data.state],
    ['雪场', data.resort_name],
    ['官方雪校', data.ski_school],
    ['在职证明附件', proof.name || '未上传'],
    ['项目', data.discipline],
    ['教学对象', data.students],
    ['学员水平', data.levels],
    ['PSIA', data.psia],
    ['AASI', data.aasi],
    ['其他认证', data.other_certifications],
    ['官方预约链接', data.official_booking_url],
    ['指定教练方式', data.request_method],
    ['一句话介绍', data.tagline],
    ['个人介绍', data.bio],
    ['照片链接', data.photo_url],
    ['视频链接', data.video_url],
    ['Instagram', data.instagram_url],
    ['小红书', data.xiaohongshu_url]
  ];

  var htmlRows = rows.map(function(row) {
    return '<tr><td style="padding:8px;border-bottom:1px solid #ddd;color:#667;font-size:12px;vertical-align:top">' + escapeHtml(row[0]) + '</td>' +
      '<td style="padding:8px;border-bottom:1px solid #ddd;font-size:13px;line-height:1.5">' + linkify(row[1]) + '</td></tr>';
  }).join('');

  var plainBody = rows.map(function(row) { return row[0] + ': ' + (row[1] || '—'); }).join('\n');
  var htmlBody = '<div style="font-family:Arial,sans-serif;max-width:720px">' +
    '<h2 style="color:#10283c">新的雪语教练主页申请</h2>' +
    '<table style="width:100%;border-collapse:collapse">' + htmlRows + '</table>' +
    '<p style="margin-top:20px;color:#778;font-size:11px">请先核验官方雪校在职状态，再联系申请人。</p></div>';

  MailApp.sendEmail({
    to: recipient,
    replyTo: data.email || recipient,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody,
    attachments: attachments
  });

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(value) {
  return String(value || '—')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function linkify(value) {
  var safe = escapeHtml(value);
  if (/^https?:\/\//i.test(String(value || ''))) {
    return '<a href="' + safe + '" target="_blank">' + safe + '</a>';
  }
  return safe.replace(/\n/g, '<br>');
}
