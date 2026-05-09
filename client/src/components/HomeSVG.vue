<!-- src/components/HomeSVG.vue -->
<template>
  <main class="svg-home">
    <img src="../assets/homeRBT.svg" class="full-screen-svg" alt="Homepage" />
    <!-- Example clickable areas layered over SVG -->
    <button class="hotspot start-btn" @click="startReflection">
      Start
    </button>

    <button class="hotspot login-btn" @click="goLogin">
      Login
    </button>
  </main>
</template>

<script>
export default {
  name: "HomeSVG",
};
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f8efe7;
  color: #3b2a24;
}

.hero-section {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  align-items: center;
  gap: 3rem;
  padding: 4rem 6vw;
  overflow: hidden;
}

.hero-content {
  max-width: 520px;
  z-index: 2;
}

.eyebrow {
  font-family: Georgia, serif;
  font-size: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8d4f45;
  margin-bottom: 1rem;
}

h1 {
  font-family: Georgia, serif;
  font-size: clamp(2.6rem, 6vw, 5.5rem);
  line-height: 0.95;
  margin-bottom: 1.5rem;
}

.hero-text {
  font-size: clamp(1rem, 2vw, 1.25rem);
  line-height: 1.7;
  color: #5e4a42;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-btn {
  background-color: #7f2241;
  color: white;
  text-transform: none;
}

.secondary-btn {
  color: #7f2241;
  text-transform: none;
}

.hero-image-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

.hero-image {
  width: min(100%, 620px);
  height: auto;
  display: block;
  object-fit: contain;
}

/* Tablet */
@media (max-width: 960px) {
  .hero-section {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 3rem 2rem;
  }

  .hero-content {
    margin: 0 auto;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-image {
    max-width: 520px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .hero-section {
    padding: 2rem 1.25rem;
    gap: 2rem;
  }

  .hero-image {
    max-width: 100%;
  }
}
</style>