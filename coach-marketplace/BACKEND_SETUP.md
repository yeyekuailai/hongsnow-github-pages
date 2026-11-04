# Gmail 收件配置

申请页已经可以把表单内容发送到 Gmail，但需要先部署一次免费的 Google Apps Script Web App。

## 1. 创建 Apps Script

1. 登录负责接收申请的 Google 账号。
2. 打开 [script.google.com](https://script.google.com) 并创建新项目。
3. 将 `google-apps-script/Code.gs` 的内容复制到编辑器。
4. `configureRecipient()` 已配置为 `linhong326326@gmail.com`。
5. 在 Apps Script 顶部选择 `configureRecipient`，点击“运行”，完成一次授权。

## 2. 部署 Web App

1. 点击“部署” → “新建部署”。
2. 类型选择“Web 应用”。
3. 执行身份选择“我”。
4. 访问权限选择“任何人”。
5. 部署并复制以 `/exec` 结尾的 Web App URL。

## 3. 连接网页

打开 `config.js`，把 URL 填入：

```js
window.SNOWLINK_CONFIG = {
  formEndpoint: "https://script.google.com/macros/s/你的部署ID/exec",
};
```

## 4. 测试

从 `apply.html` 提交一份测试申请，并上传一份不超过 10MB 的图片或 PDF 在职证明。Gmail 应收到表单内容及证明附件，主题格式如下：

```text
[雪语教练申请] 教练姓名 · 雪场名称
```

确认正文和附件均收取成功后，再将申请入口公开。不要把 Gmail 密码或 Google App Password 写入项目文件。部署并运行 `configureRecipient()` 后，收件地址会保存在 Apps Script 的 Script Properties 中。

## 暂停与恢复申请

- 在 Apps Script 顶部选择 `pauseApplications` 并运行，可立即停止接收新申请。
- 选择 `resumeApplications` 并运行，可恢复接收申请。
- 达到每日邮件发送额度的 50% 后，系统每天最多向收件邮箱发送一次额度提醒。
