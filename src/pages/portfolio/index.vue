<template>
  <view class="page-container">
    <NavBar />
    
    <main class="content-wrapper">
      <section class="portfolio-hero section">
        <div class="container">
          <h1 class="portfolio-hero__title animate-fade-in-up">作品集</h1>
          <p class="portfolio-hero__description animate-fade-in-up delay-100">
            这里展示了我参与开发的一些项目，涵盖前端、后端和全栈开发
          </p>
        </div>
      </section>
      
      <section class="filter-section section">
        <div class="container">
          <div class="filter__tags">
            <button 
              v-for="category in categories" 
              :key="category.name"
              class="filter__tag"
              :class="{ 'filter__tag--active': activeCategory === category.name }"
              @click="filterProjects(category.name)"
            >
              <span class="filter__tag-icon">
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path :d="getIconPath(category.icon)" fill="currentColor"/>
                </svg>
              </span>
              <span class="filter__tag-text">{{ category.name }}</span>
            </button>
          </div>
        </div>
      </section>
      
      <section class="projects-section section section--dark">
        <div class="container">
          <div class="projects__grid">
            <div 
              v-for="(project, index) in filteredProjects" 
              :key="project.id"
              class="card projects__card animate-fade-in-up"
              :class="`delay-${(index % 3) * 100 + 100}`"
              @click="goToDetail(project.id)"
            >
              <div class="projects__image-wrapper">
                <img :src="project.cover" :alt="project.name" class="card__image" />
                <div class="projects__overlay">
                  <span class="projects__view">查看详情</span>
                </div>
              </div>
              <div class="card__content">
                <div class="card__tags">
                  <span class="tag tag--primary">{{ project.category }}</span>
                </div>
                <h3 class="card__title">{{ project.name }}</h3>
                <p class="card__description">{{ project.shortDesc }}</p>
                <div class="card__tech">
                  <span 
                    v-for="tech in project.techStack.slice(0, 3)" 
                    :key="tech" 
                    class="tag"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="filteredProjects.length === 0" class="projects__empty">
            <p>暂无该分类下的项目</p>
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
import { ref, computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { projects, categories, categoryIcons, personalInfo } from '@/data/mockData'

const currentYear = new Date().getFullYear()
const activeCategory = ref('全部')

const filteredProjects = computed(() => {
  if (activeCategory.value === '全部') {
    return projects
  }
  return projects.filter(project => project.category === activeCategory.value)
})

const filterProjects = (category: string) => {
  activeCategory.value = category
}

const goToDetail = (id: string) => {
  uni.navigateTo({ url: `/pages/portfolio/detail?id=${id}` })
}

const getIconPath = (iconName: string) => {
  return categoryIcons[iconName] || categoryIcons.circle
}
</script>

<style lang="scss" scoped>
.portfolio-hero {
  text-align: center;
}

.portfolio-hero__title {
  font-size: $font-4xl;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $spacing-md;
  
  @media (min-width: $breakpoint-lg) {
    font-size: $font-5xl;
  }
}

.portfolio-hero__description {
  font-size: $font-lg;
  color: $text-secondary;
  max-width: 600px;
  margin: 0 auto;
}

.filter__tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-lg;
  justify-content: center;
}

.filter__tag {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #ffffff, #f5f5f5);
  color: $text-secondary;
  border: 1px solid $border-color;
  border-radius: $radius-full;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all $transition-normal;
  height: 40px;
  
  &:hover {
    background: rgba($primary-color, 0.05);
    color: $primary-color;
    border-color: $primary-color;
  }
  
  &--active {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border-color: transparent;
    box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(99, 102, 241, 0.5);
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
}

.filter__tag-icon {
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.filter__tag-icon svg {
  width: 100%;
  height: 100%;
  display: block;
  overflow: visible;
}

.filter__tag-text {
  flex-shrink: 0;
  line-height: 1;
}

.projects__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-xl;
  
  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: $breakpoint-lg) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.projects__card {
  cursor: pointer;
}

.projects__image-wrapper {
  position: relative;
  overflow: hidden;
}

.card__image {
  transition: transform $transition-slow;
}

.projects__card:hover .card__image {
  transform: scale(1.05);
}

.projects__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  align-items: flex-end;
  padding: $spacing-lg;
  opacity: 0;
  transition: opacity $transition-normal;
}

.projects__card:hover .projects__overlay {
  opacity: 1;
}

.projects__view {
  color: white;
  font-weight: 500;
  font-size: $font-sm;
}

.card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;
  margin-top: $spacing-md;
}

.projects__empty {
  text-align: center;
  padding: $spacing-2xl;
  color: $text-secondary;
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