// lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      // 本地静态目录，LHCI 会自动起一个简易 HTTP Server
      staticDistDir: './dist',
      numberOfRuns: 3,
      settings: {
        chromeFlags: ['--no-sandbox', '--disable-gpu']
      }
    },
    assert: {
      // 使用 Lighthouse 推荐预设，并叠加自定义阈值
      preset: 'lighthouse:recommended',
      assertions: {
        // 性能分 ≥ 90 才允许通过
        'categories:performance': ['error', { minScore: 0.9 }],
        // 无障碍分 ≥ 90
        'categories:accessibility': ['warn', { minScore: 0.9 }]
      }
    },
    upload: {
      // 临时公开存储（报告链接 14 天有效，无需自建服务）
      target: 'temporary-public-storage'
    }
  }
}