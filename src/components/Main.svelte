<script>
  import Step from "./Step.svelte";

  let steps = [
    {
      name: "MathsPro",
      icon: "fa-solid fa-graduation-cap",
      href: "https://mathspro.academy/",
      description:
        "Designed and developed a full-stack educational platform for tutors and students. Implemented user authentication, protected routes, role-based access and secure resource permissions.",
    },
    {
      name: "Balm Ortho Medical",
      icon: "fa-solid fa-kit-medical",
      href: "https://balmorthomedical.com/",
      description:
        "Developed a responsive e-commerce platform for a medical equipment business. Built product browsing and presentation interfaces designed around real business requirements.",
    },
    {
      name: "KT Café Restaurant",
      icon: "fa-solid fa-utensils",
      href: "https://ktcafe.restaurant/",
      description:
        "Designed and developed a production website for a restaurant business. Created responsive interfaces for presenting menus, food offerings, restaurant information and contact details.",
      note: "Mobile-only website",
    },
    {
      name: "APOD-React",
      icon: "fa-solid fa-shuttle-space",
      href: "https://apod-reactapp.vercel.app/",
      description: "NASA Astronomy Picture of the Day API application.",
    },
    {
      name: "ScribeNess",
      icon: "fa-solid fa-signature",
      href: "https://scribeness.netlify.app/",
      description: "Transcription and translation application.",
    },
    {
      name: "BolderMotiv",
      icon: "fa-solid fa-dumbbell",
      href: "https://boldermotiv.vercel.app/",
      description: "Fitness motivation web application.",
    },
    {
      name: "Moood",
      icon: "fa-solid fa-face-smile",
      href: "https://m000d.netlify.app/",
      description:
        "Mood tracking web application built with Next.js and Firebase.",
    },
    {
      name: "DynamicCodes",
      icon: "fa-solid fa-qrcode",
      href: "https://dynamiccodes.netlify.app/",
      description: "Dynamic QR code generator.",
    },
  ];


  const featuredDetails = [
    { category: "Education", image: "mathspro", theme: "", alt: "MathsPro homepage introducing personalized math learning", tags: ["React", "Supabase", "PostgreSQL", "Tiptap"] },
    { category: "E-commerce", image: "balm-ortho", theme: "medical", alt: "Balm Ortho Medical online shop displaying medical equipment", tags: ["React", "Tailwind CSS", "Supabase"] },
    { category: "Restaurant", image: "kt-cafe", theme: "restaurant", alt: "KT Café mobile homepage with restaurant information and menu", tags: ["React", "Vite", "Tailwind CSS"] },
  ];
  const featuredProjects = steps.slice(0, 3).map((project, index) => ({ ...project, ...featuredDetails[index] }));
  const technologies = ["React", "Next.js", "SvelteKit", "Node.js", "PostgreSQL"];
  const skills = ["JavaScript", "React", "Node.js", "C#", "SQL", "Supabase", "Firebase", "Tailwind CSS"];
  const experience = [
    {
      role: "Full Stack Developer",
      company: "Series Ltd",
      date: "July 2025 — Present",
      description: "Develop and maintain the Series ERP platform, build utility applications, and integrate external services including eTIMS, banks, and M-Pesa. Work directly with clients on implementation, support, and BI reporting.",
    },
    {
      role: "IT Support",
      company: "Kenya Broadcasting Corporation",
      date: "January — March 2024",
      description: "Provided hardware, software, and system support. Streamlined support ticketing and documented solutions to recurring technical issues.",
    },
    {
      role: "IT Support",
      company: "KCA University",
      date: "January — March 2021",
      description: "Provided first-line technical support, resolved hardware and software issues, and helped keep departmental operations running smoothly.",
    },
  ];
</script>

<main id="main-content" tabindex="-1" class="page-width">
  <section id="introPage" class="hero" aria-labelledby="intro-heading">
    <div>
      <p class="eyebrow">Mishael Matende · Full Stack Developer</p>
      <h1 id="intro-heading">Thoughtful interfaces.<br /><span class="accent">Practical solutions.</span></h1>
      <p class="hero-copy">Hi, I'm Mishael. I build web applications that help people learn, shop, and get things done — from the interface to the database.</p>
      <div class="hero-actions">
        <a class="button primary" href="#projects">View my work <span aria-hidden="true">↗</span></a>
        <a class="button" href="#contact">Get in touch <span aria-hidden="true">↗</span></a>
      </div>
      <div class="hero-footnote">
        <span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> Nairobi, Kenya</span>
        <a href="/Mishael-Matende-CV.pdf" download>Download CV <span aria-hidden="true">↓</span></a>
      </div>
    </div>
    <div class="portrait-wrap">
      <img src="/images/mishael-matende.jpg" alt="Mishael Matende" width="640" height="800" fetchpriority="high" />
      <div class="portrait-caption"><strong>From idea to implementation.</strong><span>Design · Development · Deployment</span></div>
    </div>
  </section>

  <div class="skill-strip" aria-label="Technologies I work with">
    <span class="eyebrow">My everyday toolkit</span>
    {#each technologies as technology}<span>{technology}</span>{/each}
  </div>

  <section id="projects" class="section" aria-labelledby="projects-heading">
    <div class="section-heading">
      <div><p class="eyebrow">Selected work</p><h2 id="projects-heading">Built for <span class="accent">real people.</span></h2></div>
      <p>Educational platforms, online shops, and a place to find your next favourite meal.</p>
    </div>
    <div class="featured-grid">
      {#each featuredProjects as project}
        <article class="featured-card">
          <a href={project.href} target="_blank" rel="noopener noreferrer" class={"project-preview " + project.theme} aria-label={"Visit " + project.name + " (opens in a new tab)"}>
            <div class="preview-browser">
              <div class="browser-bar" aria-hidden="true"><span></span><span></span><span></span></div>
              <img src={"/images/projects/" + project.image + ".jpg"} alt={project.alt} width={project.theme === "restaurant" ? 390 : 1440} height={project.theme === "restaurant" ? 844 : 960} loading="lazy" decoding="async" />
            </div>
          </a>
          <div class="featured-body">
            <span class="featured-label"><i class={project.icon} aria-hidden="true"></i>{project.category}</span>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <ul class="tags" aria-label={"Technologies used for " + project.name}>{#each project.tags as tag}<li>{tag}</li>{/each}</ul>
            {#if project.note}<p class="project-note"><i class="fa-solid fa-mobile-screen-button" aria-hidden="true"></i> {project.note}</p>{/if}
            <a class="project-link" href={project.href} target="_blank" rel="noopener noreferrer">Visit website <span class="sr-only">— {project.name} (opens in a new tab)</span><span aria-hidden="true">↗</span></a>
          </div>
        </article>
      {/each}
    </div>
    <div class="more-projects-title"><h3>More things I've built</h3><span>Small ideas, hands-on learning.</span></div>
    <div class="project-grid">
      {#each steps.slice(3) as step (step.name)}<Step {step} />{/each}
    </div>
  </section>

  <section id="about" class="section about-section" aria-labelledby="about-heading">
    <div class="about-intro">
      <p class="eyebrow">A little about me</p>
      <h2 id="about-heading">Curiosity meets<br /><span class="accent">real-world experience.</span></h2>
      <p>I enjoy turning practical problems into useful software. My background spans IT support, information security, and full stack development, so I care about what happens behind the interface as much as what people see.</p>
      <p>I've built educational platforms, e-commerce experiences, and business websites. At Series Ltd, I work on ERP applications, integrations, and tools that support everyday business operations.</p>
      <a class="button" href="/Mishael-Matende-CV.pdf" download>Download my CV <span aria-hidden="true">↓</span></a>
      <div class="skills-block">
        <h3>Tools I work with</h3>
        <ul class="tags">{#each skills as skill}<li>{skill}</li>{/each}</ul>
      </div>
    </div>
    <div>
      <h3 class="experience-heading">Experience</h3>
      <ol class="experience-list">
        {#each experience as job}
          <li><p class="date">{job.date}</p><h3>{job.role}</h3><p class="company">{job.company}</p><p class="details">{job.description}</p></li>
        {/each}
      </ol>
      <div class="education">
        <h3>Education & continued learning</h3>
        <p>Degree in Information Security and Forensics · KCA University · 2024</p>
        <p>Diploma in Information Technology · KCA University · 2020</p>
        <p>Full Stack Web Developer course · Udemy · 2024</p>
      </div>
    </div>
  </section>
</main>
