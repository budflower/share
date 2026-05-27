<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled, 'navbar--mobile-open': isMobileMenuOpen }">
    <div class="navbar__container">
      <div class="navbar__logo" @click="navigateTo('/')">
        <span class="navbar__logo-text">{{ personalInfo.name }}</span>
      </div>
      
      <ul class="navbar__menu">
        <li class="navbar__item" v-for="item in navItems" :key="item.path">
          <a 
            class="navbar__link" 
            :class="{ 'navbar__link--active': isActive(item.path) }"
            @click="navigateTo(item.path)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
      
      <button class="navbar__mobile-toggle" @click="toggleMobileMenu">
        <span class="navbar__hamburger" :class="{ 'navbar__hamburger--open': isMobileMenuOpen }"></span>
      </button>
    </div>
    
    <div class="navbar__mobile-menu" v-if="isMobileMenuOpen">
      <ul class="navbar__mobile-list">
        <li class="navbar__mobile-item" v-for="item in navItems" :key="item.path">
          <a 
            class="navbar__mobile-link"
            :class="{ 'navbar__link--active': isActive(item.path) }"
            @click="handleMobileNav(item.path)"
          >
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { personalInfo } from '@/data/mockData'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const currentPagePath = ref('/')

const navItems = [
  { label: '首页', path: '/' },
  { label: '作品集', path: '/pages/portfolio/index' },
  { label: '关于', path: '/pages/about/index' },
  { label: '联系', path: '/pages/contact/index' }
]

const isActive = (path: string) => {
  if (path === '/') {
    return currentPagePath.value === '/' || currentPagePath.value === '/pages/index/index'
  }
  return currentPagePath.value === path || currentPagePath.value.startsWith(path)
}

const getCurrentPagePath = () => {
  const pages = getCurrentPages()
  if (pages.length > 0) {
    const currentPage = pages[pages.length - 1]
    const route = currentPage.route || '/'
    currentPagePath.value = '/' + route.replace(/^\//, '')
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navigateTo = (path: string) => {
  isMobileMenuOpen.value = false
  uni.navigateTo({ 
    url: path,
    success: () => {
      setTimeout(() => {
        getCurrentPagePath()
      }, 100)
    }
  })
}

const handleMobileNav = (path: string) => {
  navigateTo(path)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  getCurrentPagePath()
  
  const observer = new MutationObserver(() => {
    getCurrentPagePath()
  })
  
  observer.observe(document.body, { childList: true, subtree: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all $transition-normal;
  border-bottom: 1px solid transparent;
  
  &--scrolled {
    box-shadow: $shadow-md;
    border-bottom-color: $border-color;
  }
  
  &--mobile-open {
    background-color: $bg-primary;
  }
}

.navbar__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $spacing-md;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

.navbar__logo {
  cursor: pointer;
  
  &-text {
    font-size: $font-xl;
    font-weight: 700;
    background: linear-gradient(135deg, $primary-color, $secondary-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

.navbar__menu {
  display: flex;
  list-style: none;
  gap: $spacing-xl;
  
  @media (max-width: $breakpoint-md) {
    display: none;
  }
}

.navbar__item {
  position: relative;
}

.navbar__link {
  text-decoration: none;
  color: $text-secondary;
  font-weight: 500;
  transition: all $transition-fast;
  padding: $spacing-sm 0;
  
  &:hover {
    color: $primary-color;
  }
  
  &--active {
    color: $primary-color;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(90deg, $primary-color, $secondary-color);
      border-radius: $radius-full;
    }
  }
}

.navbar__mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: $spacing-sm;
  
  @media (max-width: $breakpoint-md) {
    display: block;
  }
}

.navbar__hamburger {
  display: block;
  width: 24px;
  height: 3px;
  background-color: $text-primary;
  position: relative;
  transition: all $transition-normal;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    background-color: $text-primary;
    transition: all $transition-normal;
  }
  
  &::before {
    top: -8px;
  }
  
  &::after {
    bottom: -8px;
  }
  
  &--open {
    background-color: transparent;
    
    &::before {
      transform: rotate(45deg) translateY(8px);
    }
    
    &::after {
      transform: rotate(-45deg) translateY(-8px);
    }
  }
}

.navbar__mobile-menu {
  position: absolute;
  top: 72px;
  left: 0;
  right: 0;
  background-color: $bg-primary;
  box-shadow: $shadow-lg;
  animation: slideDown 0.3s ease-out;
  
  @media (min-width: $breakpoint-md) {
    display: none;
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navbar__mobile-list {
  list-style: none;
  padding: $spacing-md;
}

.navbar__mobile-item {
  padding: $spacing-sm 0;
}

.navbar__mobile-link {
  display: block;
  padding: $spacing-md;
  text-decoration: none;
  color: $text-primary;
  font-weight: 500;
  border-radius: $radius-md;
  transition: all $transition-fast;
  
  &:hover {
    background-color: $bg-tertiary;
    color: $primary-color;
  }
  
  &.navbar__link--active {
    background-color: rgba($primary-color, 0.1);
    color: $primary-color;
  }
}
</style>