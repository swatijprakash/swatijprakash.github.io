
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  // Dynamic footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Scroll reveal animations
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  // Copy email address
  const copyButton = document.getElementById("copyEmail");
  const copyStatus = document.getElementById("copyStatus");

  if (copyButton && copyStatus) {
    copyButton.addEventListener("click", async () => {
      const email = "swatijprakash@gmail.com";

      try {
        await navigator.clipboard.writeText(email);
        copyStatus.textContent = "Email address copied.";
      } catch (error) {
        const temporaryInput = document.createElement("textarea");
        temporaryInput.value = email;
        temporaryInput.setAttribute("readonly", "");
        temporaryInput.style.position = "absolute";
        temporaryInput.style.left = "-9999px";

        document.body.appendChild(temporaryInput);
        temporaryInput.select();

        const copied = document.execCommand("copy");
        temporaryInput.remove();

        copyStatus.textContent = copied
          ? "Email address copied."
          : "Please copy: " + email;
      }

      window.setTimeout(() => {
        copyStatus.textContent = "";
      }, 3500);
    });
  }

  // Force resume download with a custom filename
  const resumeLinks = document.querySelectorAll("a[download]");

  resumeLinks.forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();

      const fileUrl = link.href;
      const fileName =
        link.getAttribute("download") || "Swati-P-Full-Stack-Resume.pdf";

      try {
        const response = await fetch(fileUrl);

        if (!response.ok) {
          throw new Error("Resume download failed");
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const downloadLink = document.createElement("a");
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        downloadLink.remove();

        window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      } catch (error) {
        console.error("Resume download error:", error);

        // Fallback to normal download
        window.location.href = fileUrl;
      }
    });
  });
});
