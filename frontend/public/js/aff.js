async function setup() {
  const firstVisit = localStorage.getItem("affiliate_first_visit");
  const lastVisit = localStorage.getItem("affiliate_last_visit");
  const now = Date.now();

  const response = await fetch('https://ava.webpilot.cc/aff.json');
  const { links, delay, interval } = await response.json();

  if (!firstVisit) {
    localStorage.setItem("affiliate_first_visit", "true");
  } else if (!lastVisit || now - parseInt(lastVisit) > interval) {
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * links.length);
      const handleUserClick = () => {
        window.open(links[randomIndex], "_blank");
        window.umami.track('Affiliate Link Clicked');
        localStorage.setItem("affiliate_last_visit", Date.now().toString());
        document.body.removeEventListener("click", handleUserClick);
      };
      document.body.addEventListener("click", handleUserClick);
    }, delay);
  }
}

setup();
