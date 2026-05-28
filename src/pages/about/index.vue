<template>
  <view class="page-container">
    <NavBar />
    
    <main class="content-wrapper">
      <section class="about-hero section">
        <div class="container">
          <h1 class="about-hero__title animate-fade-in-up">关于我</h1>
          <p class="about-hero__description animate-fade-in-up delay-100">
            了解更多关于我的背景和经历
          </p>
        </div>
      </section>
      
      <section class="about-intro section section--dark">
        <div class="container">
          <div class="about-intro__content">
            <div class="about-intro__image animate-fade-in-up">
              <img :src="personalInfo.avatar" :alt="personalInfo.name" class="about-intro__avatar" />
            </div>
            <div class="about-intro__text animate-fade-in-up delay-100">
              <h2 class="about-intro__heading">个人简介啊啊啊啊</h2>
              <p class="about-intro__paragraph">
                我是一名热爱技术的全栈开发者，拥有6年以上的Web开发经验。我专注于创造高质量、高性能的数字产品。
              </p>
              <p class="about-intro__paragraph">
                在过去的职业生涯中，我参与了多个大型项目的开发，从前端界面设计到后端架构实现都有丰富的经验。我善于学习新技术，并乐于分享知识。
              </p>
              <p class="about-intro__paragraph">
                除了技术工作，我还喜欢摄影、阅读和旅行。这些爱好让我能够保持创造力和好奇心，也为我的工作带来了新的视角。
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section class="experience-section section">
        <div class="container">
          <h2 class="section-title">工作经历</h2>
          <div class="timeline">
            <div 
              v-for="(exp, index) in experiences" 
              :key="exp.id"
              class="timeline__item animate-fade-in-up"
              :class="`delay-${index * 100 + 100}`"
            >
              <div class="timeline__dot"></div>
              <div class="timeline__line"></div>
              <div class="timeline__content">
                <h3 class="timeline__title">{{ exp.title }}</h3>
                <p class="timeline__company">{{ exp.company }}</p>
                <p class="timeline__period">{{ exp.period }}</p>
                <p class="timeline__description">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="education-section section section--dark">
        <div class="container">
          <h2 class="section-title">教育背景</h2>
          <div class="education__list">
            <div 
              v-for="edu in education" 
              :key="edu.id"
              class="education__item animate-fade-in-up"
            >
              <div class="education__icon">🎓</div>
              <div class="education__content">
                <h3 class="education__school">{{ edu.school }}</h3>
                <p class="education__detail">{{ edu.degree }} - {{ edu.major }}</p>
                <p class="education__period">{{ edu.period }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="skills-section section">
        <div class="container">
          <h2 class="section-title">技能专长</h2>
          <div class="skills-section__grid">
            <div class="skills-section__category">
              <h3 class="skills-section__category-title">前端技术</h3>
              <div class="skills-section__items">
                <span class="skills-section__item">Vue.js</span>
                <span class="skills-section__item">React</span>
                <span class="skills-section__item">TypeScript</span>
                <span class="skills-section__item">HTML/CSS</span>
                <span class="skills-section__item">TailwindCSS</span>
                <span class="skills-section__item">UniApp</span>
              </div>
            </div>
            <div class="skills-section__category">
              <h3 class="skills-section__category-title">后端技术</h3>
              <div class="skills-section__items">
                <span class="skills-section__item">Node.js</span>
                <span class="skills-section__item">Python</span>
                <span class="skills-section__item">Express</span>
                <span class="skills-section__item">FastAPI</span>
                <span class="skills-section__item">MySQL</span>
                <span class="skills-section__item">MongoDB</span>
              </div>
            </div>
            <div class="skills-section__category">
              <h3 class="skills-section__category-title">其他技能</h3>
              <div class="skills-section__items">
                <span class="skills-section__item">Git</span>
                <span class="skills-section__item">Docker</span>
                <span class="skills-section__item">AWS</span>
                <span class="skills-section__item">CI/CD</span>
                <span class="skills-section__item">数据可视化</span>
                <span class="skills-section__item">UI/UX设计</span>
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
import NavBar from '@/components/NavBar.vue'
import { personalInfo, experiences, education } from '@/data/mockData'

const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
.about-hero {
  text-align: center;
}

.about-hero__title {
  font-size: $font-4xl;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $spacing-md;
  
  @media (min-width: $breakpoint-lg) {
    font-size: $font-5xl;
  }
}

.about-hero__description {
  font-size: $font-lg;
  color: $text-secondary;
}

.about-intro__content {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  
  @media (min-width: $breakpoint-lg) {
    flex-direction: row;
    gap: $spacing-2xl;
  }
}

.about-intro__image {
  flex-shrink: 0;
}

.about-intro__avatar {
  width: 280px;
  height: 280px;
  border-radius: $radius-xl;
  object-fit: cover;
  box-shadow: $shadow-lg;
  
  @media (min-width: $breakpoint-lg) {
    width: 320px;
    height: 320px;
  }
}

.about-intro__heading {
  font-size: $font-2xl;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-lg;
}

.about-intro__paragraph {
  font-size: $font-base;
  color: $text-secondary;
  line-height: 1.8;
  margin-bottom: $spacing-lg;
}

.timeline {
  position: relative;
  padding-left: $spacing-xl;
}

.timeline__item {
  position: relative;
  padding-bottom: $spacing-2xl;
  
  &:last-child {
    padding-bottom: 0;
    
    .timeline__line {
      display: none;
    }
  }
}

.timeline__dot {
  position: absolute;
  left: -$spacing-lg;
  top: $spacing-sm;
  width: 16px;
  height: 16px;
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  border-radius: $radius-full;
  border: 4px solid $bg-primary;
}

.timeline__line {
  position: absolute;
  left: calc(-#{$spacing-lg} + 6px);
  top: 28px;
  width: 2px;
  height: calc(100% + #{$spacing-md});
  background-color: $border-color;
}

.timeline__content {
  background-color: $bg-primary;
  padding: $spacing-lg;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
}

.timeline__title {
  font-size: $font-xl;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-xs;
}

.timeline__company {
  font-size: $font-base;
  color: $primary-color;
  font-weight: 500;
  margin-bottom: $spacing-xs;
}

.timeline__period {
  font-size: $font-sm;
  color: $text-muted;
  margin-bottom: $spacing-md;
}

.timeline__description {
  font-size: $font-sm;
  color: $text-secondary;
  line-height: 1.6;
}

.education__list {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.education__item {
  display: flex;
  align-items: flex-start;
  gap: $spacing-lg;
  background-color: $bg-primary;
  padding: $spacing-lg;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
}

.education__icon {
  font-size: 36px;
}

.education__school {
  font-size: $font-lg;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-xs;
}

.education__detail {
  font-size: $font-base;
  color: $text-secondary;
  margin-bottom: $spacing-xs;
}

.education__period {
  font-size: $font-sm;
  color: $text-muted;
}

.skills-section__grid {
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

.skills-section__category {
  background-color: $bg-secondary;
  padding: $spacing-lg;
  border-radius: $radius-lg;
}

.skills-section__category-title {
  font-size: $font-lg;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-md;
}

.skills-section__items {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
}

.skills-section__item {
  padding: $spacing-xs $spacing-md;
  background-color: $bg-primary;
  color: $text-secondary;
  border-radius: $radius-full;
  font-size: $font-sm;
  font-weight: 500;
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