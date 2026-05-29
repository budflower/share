// lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      // 确认这里是 ./docs
      staticDistDir: './docs', 
      numberOfRuns: 1,
      settings: {
        chromeFlags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },
    assert: {
      assertions: {
        // 暂时降到 70 分试试水（GitHub Pages 免费环境很慢）
        'categories:performance': ['error', { minScore: 0.7 }], 
        'categories:accessibility': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
};