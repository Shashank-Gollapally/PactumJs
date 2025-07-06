# 🚀 PactumJS API Tests with Jest

This repository contains automated API tests built with:
- ✅ **[PactumJS](https://pactumjs.github.io/)**
- ✅ **Jest** for structuring and assertions
- ✅ Runs on **GitHub Actions CI** on every push & pull request to `main`

---

## 🔥 CI Status

[![PactumJS API Tests](https://github.com/Shashank-Gollapally/pactumjs-api-tests/actions/workflows/ci.yml/badge.svg)](https://github.com/Shashank-Gollapally/pactumjs-api-tests/actions)

- Runs on every **PR & push to `main`**
- Uploads coverage reports and HTML reports as artifacts
- Annotates PRs with inline test failures

---

## 🚀 Usage

### 🧪 Run tests locally
```bash
npm install
npm run test

```

🚀 Check coverage
bash
Copy
Edit
open coverage/lcov-report/index.html
✅ GitHub Actions
Automatically triggers on:

pull_request to main

push to main

Publishes JUnit & HTML reports

Displays inline test results on PRs with dorny/test-reporter

📂 Artifacts
📝 HTML Test Reports: reports/test-report.html

📊 Coverage Reports: coverage/lcov-report/index.html

📣 Contribution
PRs welcome! All changes should have passing tests before merging.


