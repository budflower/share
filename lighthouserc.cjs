// lighthouserc.cjs
module.exports = {
  ci: {
    collect: {
      // 删除 staticDistDir，因为我们现在直接测线上地址
      // staticDistDir: './docs', 
      
      // ✅ 替换为你的 GitHub Pages 地址
      url: ['https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/'],
      
      numberOfRuns: 1,
      settings: {
        chromeFlags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
      }
    },
    assert: {
      assertions: {
        // 保持 0.7，等跑通了再慢慢往上加
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