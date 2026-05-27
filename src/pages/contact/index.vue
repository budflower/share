<template>
  <view class="page-container">
    <NavBar />
    
    <main class="content-wrapper">
      <section class="contact-hero section">
        <div class="container">
          <h1 class="contact-hero__title animate-fade-in-up">联系我</h1>
          <p class="contact-hero__description animate-fade-in-up delay-100">
            有任何问题或合作意向？欢迎联系我
          </p>
        </div>
      </section>
      
      <section class="contact-section section section--dark">
        <div class="container">
          <div class="contact__grid">
            <div class="contact__info animate-fade-in-up">
              <h2 class="contact__heading">联系方式</h2>
              
              <div class="contact__items">
                <div class="contact__item">
                  <div class="contact__icon-wrapper">
                    <span class="contact__icon">✉️</span>
                  </div>
                  <div class="contact__item-content">
                    <p class="contact__item-label">邮箱</p>
                    <a :href="`mailto:${contactInfo.email}`" class="contact__item-value">
                      {{ contactInfo.email }}
                    </a>
                  </div>
                </div>
                
                <div class="contact__item">
                  <div class="contact__icon-wrapper">
                    <span class="contact__icon">📱</span>
                  </div>
                  <div class="contact__item-content">
                    <p class="contact__item-label">电话</p>
                    <a :href="`tel:${contactInfo.phone}`" class="contact__item-value">
                      {{ contactInfo.phone }}
                    </a>
                  </div>
                </div>
                
                <div class="contact__item">
                  <div class="contact__icon-wrapper">
                    <span class="contact__icon">📍</span>
                  </div>
                  <div class="contact__item-content">
                    <p class="contact__item-label">地址</p>
                    <span class="contact__item-value">{{ contactInfo.location }}</span>
                  </div>
                </div>
              </div>
              
              <div class="contact__social">
                <h3 class="contact__social-title">社交媒体</h3>
                <div class="contact__social-links">
                  <a 
                    v-for="link in contactInfo.socialLinks" 
                    :key="link.name"
                    :href="link.url"
                    target="_blank"
                    class="contact__social-link"
                    :title="link.name"
                  >
                    <span class="contact__social-icon">{{ getSocialIcon(link.icon) }}</span>
                    <span class="contact__social-name">{{ link.name }}</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div class="contact__form animate-fade-in-up delay-100">
              <h2 class="contact__heading">发送消息</h2>
              <form class="form" @submit.prevent="handleSubmit">
                <div class="form__group">
                  <label class="form__label">姓名</label>
                  <input 
                    v-model="formData.name"
                    type="text" 
                    class="form__input" 
                    placeholder="请输入您的姓名"
                  />
                </div>
                
                <div class="form__group">
                  <label class="form__label">邮箱</label>
                  <input 
                    v-model="formData.email"
                    type="email" 
                    class="form__input" 
                    placeholder="请输入您的邮箱"
                  />
                </div>
                
                <div class="form__group">
                  <label class="form__label">主题</label>
                  <input 
                    v-model="formData.subject"
                    type="text" 
                    class="form__input" 
                    placeholder="请输入消息主题"
                  />
                </div>
                
                <div class="form__group">
                  <label class="form__label">消息内容</label>
                  <textarea 
                    v-model="formData.message"
                    class="form__textarea" 
                    placeholder="请输入您想要说的内容..."
                    rows="5"
                  ></textarea>
                </div>
                
                <button type="submit" class="btn btn--primary btn--lg btn--block">
                  {{ isSubmitting ? '发送中...' : '发送消息' }}
                </button>
                
                <p v-if="submitSuccess" class="form__success">消息发送成功！我会尽快回复您。</p>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <section class="cta-section section">
        <div class="container">
          <div class="cta__content">
            <h2 class="cta__title animate-fade-in-up">准备好开始合作了吗？</h2>
            <p class="cta__description animate-fade-in-up delay-100">
              无论您有什么想法或需求，我都很乐意与您讨论。让我们一起创造些美好的东西！
            </p>
            <button class="btn btn--primary btn--lg animate-fade-in-up delay-200" @click="scrollToForm">
              立即联系
            </button>
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
import { ref, reactive } from 'vue'
import NavBar from '@/components/NavBar.vue'
import { contactInfo, personalInfo } from '@/data/mockData'

const currentYear = new Date().getFullYear()

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const getSocialIcon = (icon: string): string => {
  const icons: Record<string, string> = {
    github: '🐙',
    linkedin: '💼',
    juejin: '📖',
    csdn: '💻'
  }
  return icons[icon] || '🔗'
}

const handleSubmit = async () => {
  isSubmitting.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSubmitting.value = false
  submitSuccess.value = true
  
  formData.name = ''
  formData.email = ''
  formData.subject = ''
  formData.message = ''
  
  setTimeout(() => {
    submitSuccess.value = false
  }, 3000)
}

const scrollToForm = () => {
  const formElement = document.querySelector('.contact__form')
  formElement?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
.contact-hero {
  text-align: center;
}

.contact-hero__title {
  font-size: $font-4xl;
  font-weight: 700;
  color: $text-primary;
  margin-bottom: $spacing-md;
  
  @media (min-width: $breakpoint-lg) {
    font-size: $font-5xl;
  }
}

.contact-hero__description {
  font-size: $font-lg;
  color: $text-secondary;
}

.contact__grid {
  display: flex;
  flex-direction: column;
  gap: $spacing-xl;
  
  @media (min-width: $breakpoint-lg) {
    flex-direction: row;
    gap: $spacing-2xl;
  }
}

.contact__info {
  flex: 1;
}

.contact__heading {
  font-size: $font-2xl;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-xl;
}

.contact__items {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
  margin-bottom: $spacing-xl;
}

.contact__item {
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
}

.contact__icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba($primary-color, 0.1), rgba($secondary-color, 0.1));
  border-radius: $radius-md;
}

.contact__icon {
  font-size: 24px;
}

.contact__item-content {
  flex: 1;
}

.contact__item-label {
  font-size: $font-sm;
  color: $text-muted;
  margin-bottom: $spacing-xs;
}

.contact__item-value {
  font-size: $font-base;
  color: $text-primary;
  font-weight: 500;
  text-decoration: none;
  
  &:hover {
    color: $primary-color;
  }
}

.contact__social-title {
  font-size: $font-lg;
  font-weight: 600;
  color: $text-primary;
  margin-bottom: $spacing-md;
}

.contact__social-links {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-md;
}

.contact__social-link {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-sm $spacing-md;
  background-color: $bg-primary;
  color: $text-secondary;
  border-radius: $radius-full;
  text-decoration: none;
  transition: all $transition-fast;
  
  &:hover {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
    transform: translateY(-2px);
  }
}

.contact__social-icon {
  font-size: 18px;
}

.contact__social-name {
  font-size: $font-sm;
  font-weight: 500;
}

.contact__form {
  flex: 1;
  background-color: $bg-primary;
  padding: $spacing-xl;
  border-radius: $radius-xl;
  box-shadow: $shadow-lg;
}

.form__group {
  margin-bottom: $spacing-lg;
}

.form__label {
  display: block;
  font-size: $font-sm;
  font-weight: 500;
  color: $text-primary;
  margin-bottom: $spacing-sm;
}

.form__input {
  width: 100%;
  padding: $spacing-md;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  font-size: $font-base;
  color: $text-primary;
  transition: border-color $transition-fast;
  
  &:focus {
    outline: none;
    border-color: $primary-color;
  }
  
  &::placeholder {
    color: $text-muted;
  }
}

.form__textarea {
  width: 100%;
  padding: $spacing-md;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  font-size: $font-base;
  color: $text-primary;
  resize: vertical;
  transition: border-color $transition-fast;
  
  &:focus {
    outline: none;
    border-color: $primary-color;
  }
  
  &::placeholder {
    color: $text-muted;
  }
}

.form__success {
  text-align: center;
  color: #10b981;
  font-weight: 500;
  margin-top: $spacing-md;
  animation: fadeIn 0.3s ease-out;
}

.cta-section {
  background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
  padding: $spacing-2xl 0;
}

.cta__content {
  text-align: center;
  color: white;
}

.cta__title {
  font-size: $font-3xl;
  font-weight: 700;
  margin-bottom: $spacing-md;
  
  @media (min-width: $breakpoint-lg) {
    font-size: $font-4xl;
  }
}

.cta__description {
  font-size: $font-lg;
  opacity: 0.9;
  margin-bottom: $spacing-xl;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-section .btn--primary {
  background-color: white;
  color: $primary-color;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
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