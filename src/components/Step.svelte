<script>
  export let step;
</script>

<a class="project-card" href={step.href} target="_blank" rel="noopener noreferrer">
  <div class="project-card-top">
    <span class="project-icon"><i class={step.icon} aria-hidden="true"></i></span>
    <span class="project-arrow" aria-hidden="true">↗</span>
  </div>
  <h3>{step.name}</h3>
  <p>{step.description}</p>
  <span class="project-link">Explore project <span class="sr-only">(opens in a new tab)</span><span aria-hidden="true">↗</span></span>
</a>
