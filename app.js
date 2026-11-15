const data = window.PORTFOLIO;
const root = document.querySelector("#projects");

function el(tag, text, cls) {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (cls) node.className = cls;
  return node;
}

function render(filter = "All") {
  root.replaceChildren();

  data.projects
    .filter(project => filter === "All" || project.category === filter)
    .forEach(project => {
      const featured = Boolean(project.featured || project.actual);
      const hasActualScreenshot = Boolean(project.actualScreenshot || project.actual);
      const card = el("article", null, "project" + (featured ? " featured" : ""));
      const figure = el("figure");
      const img = el("img");

      img.src = project.image;
      img.alt = project.title + " application screenshot";
      img.loading = "lazy";
      figure.append(img);

      if (hasActualScreenshot) {
        figure.append(el("figcaption", "ACTUAL PROJECT SCREENSHOT"));
      }

      const copy = el("div", null, "project-copy");
      copy.append(
        el("span", project.label, "project-label"),
        el("h3", project.title),
        el("p", project.description)
      );

      const tags = el("div", null, "tags");
      project.tags.forEach(tag => tags.append(el("span", tag)));
      copy.append(tags);

      const projectLinks = [
        [project.githubUrl, "View source on GitHub ↗", true],
        [project.documentUrl, "View project brief ↗", true],
        [project.architectureUrl, "View system overview ↗", true]
      ].filter(([url]) => Boolean(url));

      if (projectLinks.length) {
        const actions = el("div", null, "project-actions");
        projectLinks.forEach(([url, label, newTab]) => {
          const link = el("a", label, "project-link");
          link.href = url;
          if (newTab) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
          }
          actions.append(link);
        });
        copy.append(actions);
      }

      card.append(figure, copy);
      root.append(card);
    });
}

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(item => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    render(button.dataset.filter);
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#email").textContent = data.email + " ↗";
document.querySelector("#email").href = "mailto:" + data.email;
render();
