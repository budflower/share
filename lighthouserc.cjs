// lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      // ✅ 你的真实产物目录
      staticDistDir: './docs',

      // ✅ GitHub Actions 建议只跑 1 次
      numberOfRuns: 1,

      settings: {
        chromeFlags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage'
        ]
      }
    },

    assert: {
      // ✅ 不用 preset，避免规则冲突
      assertions: {
        // ✅ 性能分 ≥ 80（先通，再收紧）
        'categories:performance': ['error', { minScore: 0.8 }],

        // ✅ 无障碍 ≥ 85（警告，不阻断）
        'categories:accessibility': ['warn', { minScore: 0.85 }],

        // ✅ 最佳实践 ≥ 80
        'categories:best-practices': ['warn', { minScore: 0.8 }],

        // ✅ SEO ≥ 90
        'categories:seo': ['warn', { minScore: 0.9 }]
      }
    },

    upload: {
      // ✅ 临时存储，14 天有效
      target: 'temporary-public-storage'
    }
  }
}