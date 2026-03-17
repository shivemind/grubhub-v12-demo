const SCRIPT_SECTIONS = [
  {
    id: 'opening',
    title: 'Opening',
    lines: [
      { type: 'line', text: 'Thanks everyone for taking the time today.' },
      { type: 'line', text: 'What I want to do is walk you through how Postman v12 changes the way enterprises manage APIs across their entire organization.' },
      { type: 'quote', text: 'Postman v12 evolves Postman from an API client into a full API platform.' },
      { type: 'line', text: 'For years, teams have used Postman primarily to test APIs. But as organizations scale, APIs become infrastructure. They power applications, integrations, data systems, and now increasingly AI agents.' },
      { type: 'line', text: 'So Postman v12 introduces a new architectural layer to support that scale.' },
      { type: 'quote', text: 'Postman v12 introduces a management plane and a distribution plane on top of the traditional API workflow.' },
      { type: 'line', text: 'The traditional workflow \u2014 designing, testing, and debugging APIs \u2014 still exists.' },
      { type: 'line', text: 'But now we add two additional layers.' },
      { type: 'line', text: 'The management plane, which gives platform teams visibility and governance across the entire API estate.' },
      { type: 'line', text: 'And the distribution plane, which allows APIs to be published, discovered, and reused across the organization.' }
    ]
  },
  {
    id: 'catalog',
    title: 'API Catalog',
    lines: [
      { type: 'line', text: "Let\u2019s start with the management plane, and specifically the API Catalog." },
      { type: 'quote', text: 'The API Catalog provides a single pane of glass across your entire API landscape.' },
      { type: 'line', text: 'Instead of APIs being scattered across repositories, internal portals, and developer laptops, the catalog aggregates them into one unified view.' },
      { type: 'line', text: 'It pulls together OpenAPI specifications, collections, test results, monitoring data, and ownership metadata.' },
      { type: 'line', text: 'This allows platform teams to answer questions that are normally very difficult to answer. For example:' },
      { type: 'line', text: '\u2022 Which APIs have complete specifications?' },
      { type: 'line', text: '\u2022 Which APIs are failing tests?' },
      { type: 'line', text: '\u2022 Which APIs are violating governance policies?' },
      { type: 'line', text: "That\u2019s why we often describe the catalog as providing cross ecosystem intelligence across the entire API platform." },
      { type: 'quote', text: 'Postman v12 lets platform teams see which APIs are healthy, failing, or violating governance rules.' }
    ]
  },
  {
    id: 'governance',
    title: 'API Governance',
    lines: [
      { type: 'line', text: 'Now visibility is only useful if you can also enforce standards. That brings us to API governance.' },
      { type: 'line', text: 'Modern organizations often have hundreds of engineers building APIs, and maintaining consistency across those teams can be extremely difficult.' },
      { type: 'quote', text: 'Postman v12 enables API governance by enforcing rules directly against OpenAPI specifications.' },
      { type: 'line', text: 'These rules can enforce standards like naming conventions, security requirements, versioning formats, and documentation completeness.' },
      { type: 'line', text: "And importantly, those rules don\u2019t just exist inside the platform. They can be automated as part of the development lifecycle." },
      { type: 'quote', text: 'Governance rules allow teams to automatically enforce API standards before code reaches production.' },
      { type: 'quote', text: 'Postman v12 can lint API specifications directly inside CI/CD pipelines.' },
      { type: 'line', text: 'That means developers get feedback early, and platform teams maintain consistency without slowing down development.' }
    ]
  },
  {
    id: 'distribution',
    title: 'Private API Network',
    lines: [
      { type: 'line', text: "Next, let\u2019s talk about the distribution plane, which is where APIs become reusable organizational assets." },
      { type: 'line', text: 'This is powered by the Private API Network.' },
      { type: 'quote', text: 'The Private API Network acts as an internal developer portal for discovering APIs.' },
      { type: 'line', text: 'When teams publish APIs to the network, other teams can easily discover them, understand how they work, and start integrating immediately.' },
      { type: 'quote', text: 'Postman v12 centralizes API collections and documentation so developers can discover APIs without asking other teams.' },
      { type: 'line', text: 'And this solves a very common enterprise problem.' },
      { type: 'quote', text: 'Instead of passing collections around manually, teams publish APIs to the Private API Network.' },
      { type: 'line', text: 'So APIs move from being hidden artifacts to becoming discoverable infrastructure.' }
    ]
  },
  {
    id: 'git',
    title: 'Git-Native Workflows',
    lines: [
      { type: 'line', text: "Now let\u2019s talk about one of the biggest changes under the hood in Postman v12, which is Git-native workflows." },
      { type: 'line', text: 'Historically, Postman collections were stored primarily as JSON inside the platform. That worked well for individual teams, but it didn\u2019t align well with enterprise development workflows.' },
      { type: 'quote', text: 'Postman v12 introduces native Git workflows so API assets can live alongside source code.' },
      { type: 'quote', text: 'Collections and API specifications can now be stored directly in Git and synchronized with Postman.' },
      { type: 'line', text: 'Another important change is the shift toward YAML-based representations for API artifacts.' },
      { type: 'line', text: 'YAML is far more readable, easier to diff in pull requests, and better suited for source control.' },
      { type: 'line', text: 'In practice, this means developers can branch, commit, review, and merge API changes using the same processes they already use for application code.' }
    ]
  },
  {
    id: 'cicd',
    title: 'CI/CD & Postman CLI',
    lines: [
      { type: 'line', text: 'Once APIs are integrated with Git, they can also be integrated with CI/CD pipelines.' },
      { type: 'quote', text: 'Postman CLI lets teams run API tests and governance checks directly inside CI/CD pipelines.' },
      { type: 'line', text: 'Teams can automatically validate APIs during builds, run integration tests, enforce governance policies, and publish updated API artifacts back into the Postman platform.' },
      { type: 'line', text: 'This makes APIs a first-class citizen of the software delivery pipeline.' }
    ]
  },
  {
    id: 'insights',
    title: 'Postman Insights',
    lines: [
      { type: 'line', text: 'Another capability enterprises are finding extremely valuable is Postman Insights.' },
      { type: 'quote', text: 'Postman Insights can automatically discover APIs and map service dependencies across environments.' },
      { type: 'line', text: 'This gives organizations visibility into how APIs interact with each other across staging, production, and internal environments.' },
      { type: 'line', text: 'It helps platform teams understand how services depend on each other and identify potential points of failure.' }
    ]
  },
  {
    id: 'ai',
    title: 'AI & Agent Mode',
    lines: [
      { type: 'line', text: "Finally, let\u2019s talk about AI and automation." },
      { type: 'line', text: 'Postman v12 introduces Agent Mode, which brings AI directly into the API lifecycle.' },
      { type: 'quote', text: 'Agent Mode brings AI directly into the API workflow to generate tests, documentation, and debugging suggestions.' },
      { type: 'line', text: 'Developers can ask the agent to generate test suites, explain API responses, or suggest improvements to documentation.' },
      { type: 'line', text: 'For platform teams, this dramatically reduces the effort required to maintain comprehensive API quality and documentation.' }
    ]
  },
  {
    id: 'close',
    title: 'Closing',
    lines: [
      { type: 'line', text: 'So when we step back and look at the full picture, the shift is pretty significant.' },
      { type: 'line', text: 'Postman v12 is no longer just a tool developers use to send requests.' },
      { type: 'line', text: "It\u2019s an enterprise API platform that provides visibility, governance, discovery, automation, and AI assistance across the entire API lifecycle." },
      { type: 'quote', text: 'Enable developers to build and test APIs faster. Enable teams to collaborate around shared API workflows. And enable organizations to manage APIs and services at scale with visibility, governance, and automation.' }
    ]
  }
];

function initTeleprompter() {
  const sidebar = document.getElementById('scriptSidebar');
  const body = document.getElementById('scriptBody');

  SCRIPT_SECTIONS.forEach(section => {
    const link = document.createElement('a');
    link.className = 'section-link';
    link.textContent = section.title;
    link.dataset.section = section.id;
    link.addEventListener('click', () => {
      const el = document.getElementById(`section-${section.id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    sidebar.appendChild(link);
  });

  SCRIPT_SECTIONS.forEach(section => {
    const div = document.createElement('div');
    div.className = 'script-section';
    div.id = `section-${section.id}`;

    const title = document.createElement('div');
    title.className = 'section-title';
    title.textContent = section.title;
    div.appendChild(title);

    section.lines.forEach(line => {
      const el = document.createElement('div');
      el.className = line.type === 'quote' ? 'script-quote' : 'script-line';
      el.textContent = line.text;
      div.appendChild(el);
    });

    body.appendChild(div);
  });

  let scrolling = false;
  let scrollInterval = null;
  const speedInput = document.getElementById('scrollSpeed');
  const autoScrollBtn = document.getElementById('autoScrollBtn');

  function startScroll() {
    scrolling = true;
    autoScrollBtn.textContent = 'Pause';
    autoScrollBtn.classList.add('active');
    scrollInterval = setInterval(() => {
      body.scrollTop += parseInt(speedInput.value);
    }, 40);
  }

  function stopScroll() {
    scrolling = false;
    autoScrollBtn.textContent = 'Auto-Scroll';
    autoScrollBtn.classList.remove('active');
    clearInterval(scrollInterval);
  }

  autoScrollBtn.addEventListener('click', () => {
    if (scrolling) stopScroll(); else startScroll();
  });

  document.addEventListener('keydown', (e) => {
    if (document.getElementById('tab-script').classList.contains('active')) {
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        if (scrolling) stopScroll(); else startScroll();
      }
    }
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id.replace('section-', '');
        document.querySelectorAll('.section-link').forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.section-link[data-section="${id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { root: body, threshold: 0.3 });

  document.querySelectorAll('.script-section').forEach(s => observer.observe(s));
}
