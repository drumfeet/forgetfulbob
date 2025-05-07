// Update current year in footer
const yearEl = document.getElementById("current-year")
if (yearEl) {
  yearEl.textContent = new Date().getFullYear()
}

// Accordion functionality
document.querySelectorAll(".accordion-section").forEach((section) => {
  const header = section.querySelector(".accordion-header")
  const content = section.querySelector(".accordion-content")
  const contentInner = section.querySelector(".accordion-content-inner")

  header.addEventListener("click", () => {
    const isOpen = section.classList.contains("active")

    if (isOpen) {
      // Close accordion
      const contentHeight = content.scrollHeight
      content.style.height = `${contentHeight}px`
      // Force repaint
      window.getComputedStyle(content).height
      content.style.height = "0"

      section.classList.remove("active")
      header.setAttribute("aria-expanded", "false")
    } else {
      // Open accordion
      const contentHeight = contentInner.offsetHeight
      content.style.height = "0"
      // Force repaint
      window.getComputedStyle(content).height
      content.style.height = `${contentHeight}px`

      section.classList.add("active")
      header.setAttribute("aria-expanded", "true")

      // Handle transition end
      const handleTransitionEnd = () => {
        if (section.classList.contains("active")) {
          content.style.height = "auto"
        }
        content.removeEventListener("transitionend", handleTransitionEnd)
      }

      content.addEventListener("transitionend", handleTransitionEnd)
    }
  })

  // Keyboard accessibility
  header.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      header.click()
    }
  })
})

// Track list functionality
document.querySelectorAll(".track-item").forEach((trackItem) => {
  const trackId = trackItem.parentElement.dataset.track
  const lyricsEl = document.getElementById(`${trackId}-lyrics`)

  trackItem.addEventListener("click", () => {
    const isActive = trackItem.classList.contains("active")

    // Close all other tracks
    document.querySelectorAll(".track-item.active").forEach((activeTrack) => {
      if (activeTrack !== trackItem) {
        const activeTrackId = activeTrack.parentElement.dataset.track
        const activeLyricsEl = document.getElementById(
          `${activeTrackId}-lyrics`
        )

        activeTrack.classList.remove("active")
        activeTrack.setAttribute("aria-expanded", "false")

        if (activeLyricsEl) {
          const lyricsHeight = activeLyricsEl.scrollHeight
          activeLyricsEl.style.height = `${lyricsHeight}px`
          // Force repaint
          window.getComputedStyle(activeLyricsEl).height
          activeLyricsEl.style.height = "0"
          activeLyricsEl.classList.remove("active")
        }
      }
    })

    if (isActive) {
      // Close lyrics
      trackItem.classList.remove("active")
      trackItem.setAttribute("aria-expanded", "false")

      if (lyricsEl) {
        const lyricsHeight = lyricsEl.scrollHeight
        lyricsEl.style.height = `${lyricsHeight}px`
        // Force repaint
        window.getComputedStyle(lyricsEl).height
        lyricsEl.style.height = "0"
        lyricsEl.classList.remove("active")
      }
    } else {
      // Open lyrics
      trackItem.classList.add("active")
      trackItem.setAttribute("aria-expanded", "true")

      if (lyricsEl) {
        const lyricsInnerEl = lyricsEl.querySelector(".track-lyrics-inner")
        const lyricsHeight = lyricsInnerEl.offsetHeight + 20 // Add padding

        lyricsEl.style.height = "0"
        // Force repaint
        window.getComputedStyle(lyricsEl).height
        lyricsEl.style.height = `${lyricsHeight}px`
        lyricsEl.classList.add("active")

        // Handle transition end
        const handleTransitionEnd = () => {
          if (lyricsEl.classList.contains("active")) {
            lyricsEl.style.height = "auto"
          }
          lyricsEl.removeEventListener("transitionend", handleTransitionEnd)
        }

        lyricsEl.addEventListener("transitionend", handleTransitionEnd)
      }
    }
  })

  // Keyboard accessibility
  trackItem.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      trackItem.click()
    }
  })
})

// QR Code Tabs functionality
document.querySelectorAll(".qr-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabId = tab.id
    const panelId = tabId.replace("-tab", "-panel")

    // Hide all panels
    document.querySelectorAll(".qr-panel").forEach((panel) => {
      panel.classList.remove("active")
    })

    // Deactivate all tabs
    document.querySelectorAll(".qr-tab").forEach((t) => {
      t.classList.remove("active")
      t.setAttribute("aria-selected", "false")
    })

    // Activate selected tab and panel
    tab.classList.add("active")
    tab.setAttribute("aria-selected", "true")
    document.getElementById(panelId).classList.add("active")
  })

  // Keyboard navigation
  tab.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault()

      const tabs = Array.from(document.querySelectorAll(".qr-tab"))
      const currentIndex = tabs.indexOf(tab)
      let nextIndex

      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabs.length
      } else {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length
      }

      tabs[nextIndex].click()
      tabs[nextIndex].focus()
    }
  })
})

// Copy to clipboard functionality
document.querySelectorAll('[id^="copy-"]').forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.id.replace("copy-", "")
    let text = ""

    if (type === "bpi") {
      text = "1199250767"
    } else if (type === "gcash") {
      text = "09772403061"
    } else if (type === "unionbank") {
      text = "109422628907"
    }

    navigator.clipboard.writeText(text).then(() => {
      // Show copied state
      const originalIcon = button.innerHTML
      button.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-accent"><polyline points="20 6 9 17 4 12"></polyline></svg>'

      setTimeout(() => {
        button.innerHTML = originalIcon
      }, 2000)
    })
  })
})
