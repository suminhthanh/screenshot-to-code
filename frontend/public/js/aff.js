// aff.js
const AFFILIATE_LINK = "https://s.shopee.vn/6fRfoLJKQj"; // Replace with your affiliate link
const VISIT_KEY = "affiliate_last_visit";
const OPEN_DELAY = 15000; // 15 seconds
const REPEAT_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

function setupAffiliateLink() {
  const lastVisit = localStorage.getItem(VISIT_KEY);
  const now = Date.now();

  if (!lastVisit || now - lastVisit > REPEAT_INTERVAL) {
    setTimeout(() => {
      const handleUserClick = () => {
        // Open the affiliate link
        window.open(AFFILIATE_LINK, "_blank");

        // Track the click event
        window.umami.track('Affiliate Link Clicked');

        // Update the last visit timestamp
        localStorage.setItem(VISIT_KEY, Date.now().toString());

        // Remove the event listener after triggering
        document.body.removeEventListener("click", handleUserClick);
      };

      // Add a click event listener to the body
      document.body.addEventListener("click", handleUserClick);
    }, OPEN_DELAY);
  }
}

setupAffiliateLink()
