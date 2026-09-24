<script>
  import { page } from "$app/stores";
  import Main from "../components/Main.svelte";
  const title = "Mishael Matende | Full Stack Developer";
  const description = "Full stack developer based in Nairobi, Kenya. Explore my work in educational platforms, e-commerce, business systems, and interactive web applications.";
  $: socialImage = new URL("/images/social-preview.png", $page.url.origin).href;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content="Mishael Matende" />
  <meta name="theme-color" content="#080c1b" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Mishael Matende" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={socialImage} />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Mishael Matende — Full Stack Developer. Thoughtful interfaces. Practical solutions." />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={socialImage} />
</svelte:head>

<Main />
