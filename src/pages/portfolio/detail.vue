<template>
  <view class="page-container">
    <NavBar />
    
    <main class="content-wrapper">
      <section class="detail-header section" v-if="project">
        <div class="container">
          <button class="detail__back" @click="goBack">
            ← 返回
          </button>
          
          <div class="detail-header__content animate-fade-in-up">
            <div class="detail-header__tags">
              <span class="tag tag--primary">{{ project.category }}</span>
            </div>
            <h1 class="detail-header__title">{{ project.name }}</h1>
            <p class="detail-header__short-desc">{{ project.shortDesc }}</p>
          </div>
        </div>
      </section>
      
      <section class="detail-cover section" v-if="project">
        <div class="container">
          <img :src="project.cover" :alt="project.name" class="detail-cover__image animate-fade-in-up" />
        </div>
      </section>
      
      <section class="detail-content section section--dark" v-if="project">
        <div class="container">
          <div class="detail-content__grid">
            <div class="detail-content__main animate-fade-in-up">
              <h2 class="detail-content__heading">项目描述</h2>
              <p class="detail-content__description">{{ project.description }}</p>
              
              <h2 class="detail-content__heading">技术栈</h2>
              <div class="detail-content__tech-stack">
                <span 
                  v-for="tech in project.techStack" 
                  :key="tech" 
                  class="tag tag--secondary"
                >
                  {{ tech }}
                </span>
              </div>
              
              <h2 class="detail-content__heading">项目截图</h2>
              <div class="detail-content__screenshots">
                <div 
                  v-for="(screenshot, index) in project.screenshots" 
                  :key="index"
                  class="detail-content__screenshot-item"
                >
                  <img :src="screenshot" :alt="`截图${index + 1}`" class="detail-content__screenshot" />
                </div>
              </div>
            </div>
            
            <div class="detail-content__sidebar animate-fade-in-up delay-100">
              <div class="detail-content__links">
                <h3 class="detail-content__links-title">快速链接</h3>
                <a 
                  v-if="project.github" 
                  :href="project.github" 
                  target="_blank" 
                  class="detail-content__link"
                >
                  <span class="detail-content__link-icon">GitHub</span>
                  <span class="detail-content__link-text">查看源码</span>
                </a>
                <a 
                  v-if="project.demo" 
                  :href="project.demo" 
                  target="_blank" 
                  class="detail-content__link"
                >
                  <span class="detail-content__link-icon">Demo</span>
                  <span class="detail-content__link-text">在线演示</span>
                </a>
              </div>
              
              <div class="detail-content__info">
                <h3 class="detail-content__info-title">项目信息</h3>
                <div class="detail-content__info-item">
                  <span class="detail-content__info-label">分类</span>
                  <span class="detail-content__info-value">{{ project.category }}</span>
                </div>
                <div class="detail-content__info-item">
                  <span class="detail-content__info-label">技术数量</span>
                  <span class="detail-content__info-value">{{ project.techStack.length }} 项</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="related-projects section" v-if="project">
        <div class="container">
          <h2 class="section-title">相关项目</h2>
          <div class="related-projects__grid">
            <div 
              v-for="related in relatedProjects" 
              :key="related.id"
              class="card related-projects__card animate-fade-in-up"
              @click="goToDetail(related.id)"
            >
              <img :src="related.cover" :alt="related.name" class="card__image" />
              <div class="card__content">
                <span class="tag tag--primary">{{ related.category }}</span>
                <h3 class="card__title">{{ related.name }}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <p class="footer__text">&copy; {{ currentYear }} {{ personalInfo.name }}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import NavBar from '@/components/NavBar.vue'
import { projects, personalInfo } from '@/data/mockData'

const currentYear = new Date().getFullYear()
const projectId = ref('')

const project = computed(() => {
  return projects.find(p => p.id === projectId.value)
})

const relatedProjects = computed(() => {
  if (!project.value) return []
  return projects.filter(p => 
    p.id !== project.value?.id && 
    p.category === project.value?.category
  ).slice(0, 2)
})

const goBack = () => {
  uni.navigateBack()
}

const goToDetail = (id: string) => {
  projectId.value = id
}

onLoad((options: { id?: string }) => {
  if (options?.id) {
    projectId.value = options.id
  }
})
</script>

<style lang="scss" scoped>
.detail__back {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  color: $primary-color;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  margin-bottom: $spacing-lg;
  transition: color $transition-fast;
  
  &:hover {
    color: $primary-dark;
  }
}

.detail-header__content {
  max-width: 800px;
}

.detail-header__tags {
  margin-bottom: $spacing-md;
}

.detail-header__title {
  font-size: $font-3xl;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $spacing-md;
  
  @media (min-width: $breakpoint-lg) {
    font-size: $font-4xl;
  }
}

.detail-header__short-desc {
  font-size: $font-lg;
  color: $text-secondary;
  line-height: 1.6;
}

.detail-cover__image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: $radius-lg;
  box-shadow: $shadow-lg;
  
  @media (max-width: $breakpoint-md) {
    height: 250px;
  }
}

.detail-content__grid {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  
  @media (min-width: $breakpoint-lg) {
    flex-direction: row;
    gap: $spacing-2xl;
  }
}

.detail-content__main {
  flex: 1;
}

.detail-content__sidebar {
  width: 100%;
  
  @media (min-width: $breakpoint-lg) {
    width: 320px;
    flex-shrink: 0;
  }
}

.detail-content__heading {
  font-size: $font-xl;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-md;
}

.detail-content__description {
  font-size: $font-base;
  color: $text-secondary;
  line-height: 1.8;
  margin-bottom: $spacing-xl;
}

.detail-content__tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-md;
  margin-bottom: $spacing-xl;
}

.detail-content__screenshots {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;
  
  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.detail-content__screenshot-item {
  border-radius: $radius-md;
  overflow: hidden;
  box-shadow: $shadow-sm;
}

.detail-content__screenshot {
  width: 100%;
  height: 200px;
  object-fit: cover;
  
  @media (min-width: $breakpoint-md) {
    height: 250px;
  }
}

.detail-content__links,
.detail-content__info {
  background-color: $bg-primary;
  border-radius: $radius-lg;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  box-shadow: $shadow-sm;
}

.detail-content__links-title,
.detail-content__info-title {
  font-size: $font-lg;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-md;
}

.detail-content__link {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-md;
  border-radius: $radius-md;
  text-decoration: none;
  color: $text-primary;
  transition: all $transition-fast;
  
  &:hover {
    background-color: $bg-tertiary;
    color: $primary-color;
  }
}

.detail-content__link-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $bg-tertiary;
  border-radius: $radius-md;
  font-size: $font-xs;
  font-weight: 600;
  color: $primary-color;
}

.detail-content__link-text {
  font-weight: 500;
}

.detail-content__info-item {
  display: flex;
  justify-content: space-between;
  padding: $spacing-sm 0;
  border-bottom: 1px solid $border-light;
  
  &:last-child {
    border-bottom: none;
  }
}

.detail-content__info-label {
  color: $text-muted;
  font-size: $font-sm;
}

.detail-content__info-value {
  color: $text-primary;
  font-weight: 500;
}

.related-projects__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-xl;
  
  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.related-projects__card {
  cursor: pointer;
}

.footer {
  background-color: $text-primary;
  padding: $spacing-xl 0;
}

.footer__content {
  text-align: center;
}

.footer__text {
  color: $text-muted;
  font-size: $font-sm;
}
</style>