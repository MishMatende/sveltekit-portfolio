<script>
  import "../app.css";
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";
  import BackgroundScene from "../components/BackgroundScene.svelte";
  import { pageMotion } from "../lib/pageMotion.js";
  let y = 0;
  let paused = false;
</script>

<BackgroundScene {paused} />
<div class="site-shell" use:pageMotion={{ paused }}>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <Header {y} />
  <slot />
  <Footer />
</div>
<button class="motion-toggle" type="button" aria-pressed={paused} onclick={() => paused = !paused}>
  <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span>
  {paused ? "Resume animations" : "Pause animations"}
</button>
{#if y > 600}
  <a class="back-to-top" href="#introPage" aria-label="Back to top">
    <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
  </a>
{/if}
<svelte:window bind:scrollY={y} />
