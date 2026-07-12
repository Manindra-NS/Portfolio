let isNavigating = false;

const pages = ["index.html", "about.html", "projects.html", "contact.html"];

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const currentIndex = pages.indexOf(currentPage);

// Start from top
window.onload = () => {
  window.scrollTo(0, 0);
};

// Disable scroll restore
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("wheel", (e) => {
  if (isNavigating) return;

  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const fullHeight = document.documentElement.scrollHeight;

  // Clear previous classes
  document.body.classList.remove("slide-up", "slide-down");

  // 🔽 Scroll DOWN → Next Page
  if (e.deltaY > 0 && scrollTop + windowHeight >= fullHeight - 5) {
    if (currentIndex < pages.length - 1) {
      isNavigating = true;

      document.body.classList.add("slide-up");

      setTimeout(() => {
        window.location.href = pages[currentIndex + 1];
      }, 400); // match your CSS timing
    }
  }

  // 🔼 Scroll UP → Previous Page
  else if (e.deltaY < 0 && scrollTop <= 5) {
    if (currentIndex > 0) {
      isNavigating = true;

      document.body.classList.add("slide-down");

      setTimeout(() => {
        window.location.href = pages[currentIndex - 1];
      }, 400);
    }
  }
});
let logo = document.querySelector("#Namelogo");
if (logo) {
  logo.addEventListener("click", () => {

  });
}
