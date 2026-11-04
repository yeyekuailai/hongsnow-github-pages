/**
 * SnowLink instructor application email receiver.
 * Deploy as a Google Apps Script Web App that executes as the owner.
 */

function configureRecipient() {
  // Run this function once to store the authorized business inbox and defaults.
  var properties = PropertiesService.getScriptProperties();
  properties.setProperties({
    RECIPIENT_EMAIL: 'linhong326326@gmail.com',
    APPLICATIONS_ENABLED: 'true',
    QUOTA_ALERT_PERCENT: '50'
  }, false);

  var remaining = MailApp.getRemainingDailyQuota();
  var baseline = Number(properties.getProperty('QUOTA_BASELINE') || 0);
  if (remaining > baseline) properties.setProperty('QUOTA_BASELINE', String(remaining));
}

function pauseApplications() {
  PropertiesService.getScriptProperties().setProperty('APPLICATIONS_ENABLED', 'false');
}

function resumeApplications() {
  PropertiesService.getScriptProperties().setProperty('APPLICATIONS_ENABLED', 'true');
}

function doGet() {
  var quota = getQuotaStatus();
  return jsonOutput({
    ok: true,
    service: 'SnowLink instructor applications',
    acceptingApplications: applicationsAreEnabled(),
    quotaUsagePercent: quota.usagePercent,
    quotaAlertPercent: quota.alertPercent
  });
}

function doPost(e) {
  if (!applicationsAreEnabled()) {
    return jsonOutput({ ok: false, paused: true, message: 'Applications are temporarily paused.' });
  }

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

  checkAndAlertQuota(recipient);

  return jsonOutput({ ok: true });
}

function applicationsAreEnabled() {
  return PropertiesService.getScriptProperties().getProperty('APPLICATIONS_ENABLED') !== 'false';
}

function getQuotaStatus() {
  var properties = PropertiesService.getScriptProperties();
  var remaining = MailApp.getRemainingDailyQuota();
  var baseline = Number(properties.getProperty('QUOTA_BASELINE') || 0);
  if (!baseline || remaining > baseline) {
    baseline = remaining;
    properties.setProperty('QUOTA_BASELINE', String(baseline));
  }
  var usagePercent = baseline > 0 ? Math.round((1 - remaining / baseline) * 100) : 100;
  return {
    remaining: remaining,
    baseline: baseline,
    usagePercent: Math.max(0, Math.min(100, usagePercent)),
    alertPercent: Number(properties.getProperty('QUOTA_ALERT_PERCENT') || 50)
  };
}

function checkAndAlertQuota(recipient) {
  var properties = PropertiesService.getScriptProperties();
  var quota = getQuotaStatus();
  if (quota.usagePercent < quota.alertPercent || quota.remaining < 1) return;

  var timeZone = Session.getScriptTimeZone() || 'America/New_York';
  var today = Utilities.formatDate(new Date(), timeZone, 'yyyy-MM-dd');
  if (properties.getProperty('QUOTA_ALERT_DATE') === today) return;

  properties.setProperty('QUOTA_ALERT_DATE', today);
  MailApp.sendEmail({
    to: recipient,
    subject: '[雪语额度提醒] 今日邮件发送额度已使用 ' + quota.usagePercent + '%',
    body: 'SnowLink 今日邮件发送额度已使用 ' + quota.usagePercent + '%。\n' +
      '当前剩余额度：' + quota.remaining + '。\n' +
      '如需暂停申请，请在 Apps Script 中运行 pauseApplications。'
  });
}

function jsonOutput(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
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
