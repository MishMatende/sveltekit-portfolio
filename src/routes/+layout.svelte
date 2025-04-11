<script>
  let { children } = $props();
  import "../app.css";
  import Footer from "../components/Footer.svelte";
  import Header from "../components/Header.svelte";

  // svelte-ignore non_reactive_update
  let y;
  // svelte-ignore non_reactive_update
  let innerHeight = 0;
  // svelte-ignore non_reactive_update
  let innerWidth = 0;

  function goTop() {
    document.body.scrollIntoView();
  }
</script>

<div
  class="relative flex flex-col max-w-[1400px] mx-auto w-full text-sm sm:text-base min-h-screen"
>
  <div
    class={"fixed bottom-0 w-full duration-200 flex p-10 z-[10] " +
      (y > 0
        ? " opacity-full pointer-events-auto "
        : " pointer-events-none opacity-0")}
  >
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <button
      onclick={goTop}
      class="ml-auto rounded-full bg-slate-400 text-violet-400 px-3 sm:px-4 hover:bg-slate-800 cursor-pointer"
    >
      <!-- svelte-ignore element_invalid_self_closing_tag -->
      <i class="fa-solid fa-arrow-up grid place-items-center aspect-square" />
    </button>
  </div>
  <Header {y} />
  {@render children()}
  <Footer />
</div>

<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
