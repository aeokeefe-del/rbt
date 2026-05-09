<script setup>
import RosePatternBand from './RosePatternBand.vue'
</script>

<template>
  <RosePatternBand variant="footer" :height="300" />
  <footer class="footer">
    <div class="links">
      <a href="#">About</a>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <a href="#">Contact</a>
    </div>
    <img src="/assets/rbt-logo.png" alt="rbt." class="footer-logo-img" />
    <div class="copyright">© 2026 Rose Bud Thorn</div>
  </footer>
</template>
