async function setup() {
  const firstVisit = localStorage.getItem("affiliate_first_visit");
  const lastVisit = localStorage.getItem("affiliate_last_visit");
  const now = Date.now();

  try {
    const response = await fetch("https://ava.webpilot.cc/aff.json");
    if (!response.ok) {
      console.error("Failed to fetch affiliate data:", response.status);
      return;
    }
    const { links, delay, interval } = await response.json();

    if (!firstVisit) {
      localStorage.setItem("affiliate_first_visit", "true");
    } else if (!lastVisit || now - parseInt(lastVisit) > interval) {
      const randomIndex = Math.floor(Math.random() * links.length);
      const handleUserClick = () => {
        window.open(links[randomIndex], "_blank", "noopener noreferrer");
        localStorage.setItem("affiliate_last_visit", Date.now().toString());
        window.umami.track("Affiliate Link Clicked");
        document.body.removeEventListener("click", handleUserClick);
      };
      setTimeout(() => {
        document.body.addEventListener("click", handleUserClick);
      }, delay);
    }
  } catch (error) {
    console.error("Error setting up affiliate links:", error);
  }
}

setup();
