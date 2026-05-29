<template>
  <view class="page-container">
    <NavBar />
    
    <main class="content-wrapper">
      <section class="hero">
        <div class="hero__container">
          <div class="hero__content">
            <div class="hero__text animate-fade-in-up">
              <p class="hero__greeting">你好，我是</p>
              <h1 class="hero__name">{{ personalInfo.name }}</h1>
              <h2 class="hero__title">{{ personalInfo.title }}</h2>
              <p class="hero__bio">{{ personalInfo.bio }}</p>
              
              <div class="hero__actions">
                <button class="btn btn--primary btn--lg" @click="navigateTo('/pages/portfolio/index')">
                  查看作品集
                </button>
                <button class="btn btn--secondary btn--lg" @click="navigateTo('/pages/contact/index')">
                  联系我00
                </button>
              </div>
            </div>
            
            <div class="hero__image animate-fade-in-up delay-200">
              <div class="hero__avatar-wrapper">
                <img :src="personalInfo.avatar" :alt="personalInfo.name" class="hero__avatar" />
                <div class="hero__avatar-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="skills section">
        <div class="container">
          <h2 class="section-title">核心技能</h2>
          <div class="skills__grid">
            <span 
              v-for="(skill, index) in personalInfo.skills" 
              :key="skill" 
              class="skills__tag animate-fade-in-up"
              :class="{ 'delay-100': index % 2 === 1, 'delay-200': index % 3 === 2 }"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </section>
      
      <section class="featured section section--dark">
        <div class="container">
          <h2 class="section-title">精选作品</h2>
          <div class="featured__grid">
            <div 
              v-for="project in featuredProjects" 
              :key="project.id" 
              class="card featured__card animate-fade-in-up"
              @click="goToProjectDetail(project.id)"
            >
              <img :src="project.cover" :alt="project.name" class="card__image" />
              <div class="card__content">
                <div class="card__tags">
                  <span class="tag tag--primary">{{ project.category }}</span>
                </div>
                <h3 class="card__title">{{ project.name }}</h3>
                <p class="card__description">{{ project.shortDesc }}</p>
                <div class="card__actions">
                  <span class="card__link">查看详情</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="featured__more">
            <button class="btn btn--outline btn--lg" @click="navigateTo('/pages/portfolio/index')">
              查看全部作品
            </button>
          </div>
        </div>
      </section>
      
      <section class="stats section">
        <div class="container">
          <div class="stats__grid">
            <div class="stats__item animate-fade-in-up">
              <div class="stats__number">6+</div>
              <div class="stats__label">年开发经验</div>
            </div>
            <div class="stats__item animate-fade-in-up delay-100">
              <div class="stats__number">50+</div>
              <div class="stats__label">完成项目</div>
            </div>
            <div class="stats__item animate-fade-in-up delay-200">
              <div class="stats__number">10+</div>
              <div class="stats__label">技术栈</div>
            </div>
            <div class="stats__item animate-fade-in-up delay-300">
              <div class="stats__number">100%</div>
              <div class="stats__label">客户满意度</div>
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
import { computed } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { personalInfo, projects } from '@/data/mockData'

const currentYear = new Date().getFullYear()

const featuredProjects = computed(() => projects.slice(0, 3))

const navigateTo = (url: string) => {
  uni.navigateTo({ url })
}

const goToProjectDetail = (id: string) => {
  uni.navigateTo({ url: `/pages/portfolio/detail?id=${id}` })
}
</script>

<style lang="scss" scoped>
.hero {
  padding: $spacing-2xl 0;
  background: linear-gradient(135deg, $bg-primary 0%, $bg-secondary 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -25%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba($primary-color, 0.1) 0%, transparent 70%);
    border-radius: $radius-full;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -15%;
    width: 60%;
    height: 60%;
    background: radial-gradient(circle, rgba($secondary-color, 0.08) 0%, transparent 70%);
    border-radius: $radius-full;
  }
}

.hero__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-md;
  position: relative;
  z-index: 1;
}

.hero__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-2xl;
  
  @media (min-width: $breakpoint-lg) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.hero__text {
  text-align: center;
  max-width: 600px;
  
  @media (min-width: $breakpoint-lg) {
    text-align: left;
  }
}

.hero__greeting {
  font-size: $font-lg;
  color: $primary-color;
  font-weight: 600;
  margin-bottom: $spacing-sm;
}

.hero__name {
  font-size: $font-4xl;
  font-weight: 800;
  color: $text-primary;
  margin-bottom: $spacing-sm;
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (min-width: $breakpoint-lg) {
    font-size: $font-5xl;
  }
}

.hero__title {
  font-size: $font-xl;
  color: $text-secondary;
  font-weight: 500;
  margin-bottom: $spacing-lg;
}

.hero__bio {
  font-size: $font-base;
  color: $text-secondary;
  line-height: 1.8;
  margin-bottom: $spacing-xl;
}

.hero__actions {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
  
  @media (min-width: $breakpoint-md) {
    flex-direction: row;
  }
}

.hero__image {
  flex-shrink: 0;
}

.hero__avatar-wrapper {
  position: relative;
  width: 280px;
  height: 280px;
  
  @media (min-width: $breakpoint-lg) {
    width: 320px;
    height: 320px;
  }
}

.hero__avatar {
  width: 100%;
  height: 100%;
  border-radius: $radius-xl;
  object-fit: cover;
  box-shadow: $shadow-xl;
  border: 4px solid $bg-primary;
}

.hero__avatar-glow {
  position: absolute;
  top: -8px;
  right: -8px;
  bottom: -8px;
  left: -8px;
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  border-radius: $radius-xl;
  z-index: -1;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.02);
  }
}

.skills__grid {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-md;
  justify-content: center;
}

.skills__tag {
  padding: $spacing-sm $spacing-lg;
  background: linear-gradient(135deg, rgba($primary-color, 0.1), rgba($secondary-color, 0.1));
  color: $primary-color;
  border-radius: $radius-full;
  font-weight: 500;
  font-size: $font-sm;
  transition: all $transition-normal;
  
  &:hover {
    background: linear-gradient(135deg, $primary-color, $secondary-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }
}

.featured__grid {
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

.featured__card {
  cursor: pointer;
}

.card__tags {
  margin-bottom: $spacing-sm;
}

.card__actions {
  margin-top: $spacing-md;
}

.card__link {
  color: $primary-color;
  font-weight: 500;
  font-size: $font-sm;
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  transition: all $transition-fast;
  
  &::after {
    content: '→';
    transition: transform $transition-fast;
  }
  
  &:hover::after {
    transform: translateX(4px);
  }
}

.featured__more {
  text-align: center;
  margin-top: $spacing-2xl;
}

.stats {
  background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
  color: white;
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: $spacing-xl;
  
  @media (min-width: $breakpoint-md) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stats__item {
  text-align: center;
  padding: $spacing-lg;
}

.stats__number {
  font-size: $font-3xl;
  font-weight: 700;
  margin-bottom: $spacing-xs;
  
  @media (min-width: $breakpoint-md) {
    font-size: $font-4xl;
  }
}

.stats__label {
  font-size: $font-sm;
  opacity: 0.9;
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