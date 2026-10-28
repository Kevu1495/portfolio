import './styles.css';

function enhanceNavigation() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const navigation = document.querySelector<HTMLElement>('[data-navigation]');
  if (!toggle || !navigation) return;
  const mobile = window.matchMedia('(max-width: 760px)');
  navigation.dataset.enhanced = '';
  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.hidden = mobile.matches && !open;
  };
  const update = () => {
    toggle.hidden = !mobile.matches;
    setOpen(false);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (
      mobile.matches &&
      event.target instanceof Node &&
      !navigation.contains(event.target) &&
      !toggle.contains(event.target)
    )
      setOpen(false);
  });
  mobile.addEventListener('change', update);
  update();
}

function enhanceProjects() {
  const browser = document.querySelector<HTMLElement>('[data-project-browser]');
  if (!browser) return;
  const tools = browser.querySelector<HTMLElement>('[data-project-tools]');
  const input = browser.querySelector<HTMLInputElement>('[data-project-search]');
  const count = browser.querySelector<HTMLElement>('[data-project-count]');
  const empty = browser.querySelector<HTMLElement>('[data-project-empty]');
  const cards = [...browser.querySelectorAll<HTMLElement>('[data-project-card]')];
  const filters = [...browser.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  if (!tools || !input || !count || !empty) return;
  tools.hidden = false;
  const allowed = filters.map((button) => button.dataset.filter);
  const readQuery = () => {
    const query = new URLSearchParams(window.location.search);
    const category = query.get('category') ?? 'All';
    return { category: allowed.includes(category) ? category : 'All', query: query.get('q') ?? '' };
  };
  let state = readQuery();
  input.value = state.query;
  const update = (writeHistory = true) => {
    const query = state.query.toLocaleLowerCase().trim();
    let visible = 0;
    cards.forEach((card) => {
      const matches =
        (state.category === 'All' || card.dataset.category === state.category) &&
        (card.dataset.search ?? '').toLocaleLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) visible++;
    });
    filters.forEach((button) =>
      button.setAttribute('aria-pressed', String(button.dataset.filter === state.category)),
    );
    count.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    empty.hidden = visible > 0;
    if (writeHistory) {
      const url = new URL(window.location.href);
      if (state.category === 'All') url.searchParams.delete('category');
      else url.searchParams.set('category', state.category);
      if (state.query) url.searchParams.set('q', state.query);
      else url.searchParams.delete('q');
      window.history.replaceState(null, '', url);
    }
  };
  filters.forEach((button) =>
    button.addEventListener('click', () => {
      state.category = button.dataset.filter ?? 'All';
      update();
    }),
  );
  input.addEventListener('input', () => {
    state.query = input.value;
    update();
  });
  window.addEventListener('popstate', () => {
    state = readQuery();
    input.value = state.query;
    update(false);
  });
  update(false);
}

function enhanceWorkMap() {
  document.querySelectorAll<HTMLElement>('[data-work-map]').forEach((map) => {
    const controls = map.querySelector<HTMLElement>('[data-map-controls]');
    if (controls) controls.hidden = false;
    const tabs = [...map.querySelectorAll<HTMLButtonElement>('[data-map-tab]')];
    const panels = [...map.querySelectorAll<HTMLElement>('[data-map-panel]')];
    const select = (selected: HTMLButtonElement) => {
      tabs.forEach((tab) => {
        const active = tab === selected;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.mapPanel !== selected.dataset.mapTab;
      });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (event) => {
        const next =
          event.key === 'ArrowRight'
            ? (index + 1) % tabs.length
            : event.key === 'ArrowLeft'
              ? (index - 1 + tabs.length) % tabs.length
              : event.key === 'Home'
                ? 0
                : event.key === 'End'
                  ? tabs.length - 1
                  : -1;
        if (next < 0) return;
        event.preventDefault();
        select(tabs[next]);
        tabs[next].focus();
      });
    });
    if (tabs[0]) select(tabs[0]);
  });
}

function enhanceCopyEmail() {
  const button = document.querySelector<HTMLButtonElement>('[data-copy-email]');
  const status = document.querySelector<HTMLElement>('[data-copy-status]');
  if (!button || !status || !navigator.clipboard) return;
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copyEmail ?? '');
      status.textContent = 'Email address copied.';
    } catch {
      status.textContent = 'Select the email address above to copy it.';
    }
  });
}

enhanceNavigation();
enhanceProjects();
enhanceWorkMap();
enhanceCopyEmail();
