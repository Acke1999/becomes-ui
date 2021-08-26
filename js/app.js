import { MenuItems } from "./constants/MenuItems.js";

// STATE
const globalState = {
  expanded: false,
  path_id: null,
};

// ELEMENTS
const navbarItemsEl = document.querySelector(".be-navbar-items");
const navbarMobileWrapper = document.querySelector(".be-navbar-mobile-wrapper");
const navbarHamburgerEl = document.querySelector(".be-navbar-hamburger");
const navbarCloseEl = document.querySelector(".be-navbar-mobile-action");
const navbarTitleEl = document.querySelector(".be-navbar-mobile-title");
const navbarMobileContent = document.querySelector(
  ".be-navbar-mobile-body-inner"
);

// TRACK CLICK
window.addEventListener("click", (e) => {
  const ariaExpandedEls = document.querySelectorAll("[aria-expanded]");
  ariaExpandedEls.forEach((x) => {
    if (
      x !== e.target &&
      !x.contains(e.target) &&
      x.getAttribute("aria-expanded") === "true"
    ) {
      x.setAttribute("aria-expanded", "false");
    }
  });
});

const renderMobileNavbar = () => {
  if (globalState.path_id === null) {
    // GLOBAL RENDER
    if (navbarTitleEl.children.length) navbarTitleEl.replaceChildren();

    if (navbarMobileContent.children.length)
      navbarMobileContent.replaceChildren();

    MenuItems.filter((x) => x.type === "dropdown").forEach((x) => {
      const dropdownItem = document.createElement("div");
      dropdownItem.setAttribute(
        "class",
        "be-navbar-mobile-content-dropdown-group"
      );
      const dropdownTitle = document.createElement("div");
      dropdownTitle.setAttribute(
        "class",
        "be-navbar-mobile-content-dropdown-title"
      );
      dropdownTitle.textContent = x.title;
      dropdownItem.appendChild(dropdownTitle);

      const dropdownOptions = document.createElement("div");
      dropdownOptions.setAttribute(
        "class",
        "be-navbar-mobile-content-dropdown-options"
      );

      x.items.forEach((y) => {
        const dropdownOption = document.createElement("div");
        dropdownOption.setAttribute(
          "class",
          "be-navbar-mobile-content-dropdown-option"
        );

        const dropdownOptionIcon = document.createElement("img");
        dropdownOptionIcon.setAttribute("src", y.image);
        dropdownOptionIcon.setAttribute(
          "class",
          "be-navbar-mobile-content-dropdown-option-image"
        );
        dropdownOption.appendChild(dropdownOptionIcon);

        const dropdownOptionTitle = document.createElement("div");
        dropdownOptionTitle.textContent = y.titleResponsive;
        dropdownOptionTitle.setAttribute(
          "class",
          "be-navbar-mobile-content-dropdown-option-title"
        );
        dropdownOption.appendChild(dropdownOptionTitle);
        dropdownOption.addEventListener("click", () => {
          globalState.path_id = y.id;
          renderMobileNavbar();
        });

        dropdownOptions.appendChild(dropdownOption);
      });

      dropdownItem.appendChild(dropdownOptions);

      navbarMobileContent.appendChild(dropdownItem);
    });

    const navbarMobileOtherOptions = document.createElement("div");
    navbarMobileOtherOptions.setAttribute(
      "class",
      "be-navbar-mobile-content-other"
    );

    MenuItems.filter((x) => x.type === "link").forEach((x) => {
      const otherItemEl = document.createElement("a");
      otherItemEl.setAttribute(
        "class",
        "be-navbar-mobile-content-other-option"
      );
      otherItemEl.setAttribute("href", x.location);
      otherItemEl.textContent = x.title;
      navbarMobileOtherOptions.appendChild(otherItemEl);
    });

    navbarMobileContent.appendChild(navbarMobileOtherOptions);
  } else {
    // SECTION RENDER
    if (navbarMobileContent.children.length)
      navbarMobileContent.replaceChildren();
    const specificSection = MenuItems.find(
      (x) => x.type === "dropdown"
    ).items.find((x) => x.id === globalState.path_id);
    const backButtonEl = document.createElement("div");
    backButtonEl.setAttribute("class", "be-navbar-mobile-title-back");
    backButtonEl.addEventListener("click", () => {
      globalState.path_id = null;
      renderMobileNavbar();
    });

    const navTitleEl = document.createElement("div");
    navTitleEl.setAttribute("class", "be-navbar-mobile-title-text");
    navTitleEl.style.setProperty("color", specificSection.color);
    navTitleEl.textContent = specificSection.titleResponsive;

    specificSection.items.forEach((x) => {
      const sectionItem = document.createElement("a");
      sectionItem.setAttribute("href", x.location);
      sectionItem.setAttribute("class", "be-navbar-mobile-section-item");

      const sectionItemIcon = document.createElement("img");
      sectionItemIcon.setAttribute("src", x.image);
      sectionItemIcon.setAttribute(
        "class",
        "be-navbar-mobile-section-item-icon"
      );
      sectionItem.appendChild(sectionItemIcon);

      const sectionItemText = document.createElement("div");
      sectionItemText.setAttribute(
        "class",
        "be-navbar-mobile-section-item-text"
      );

      const sectionItemTitle = document.createElement("div");
      sectionItemTitle.setAttribute(
        "class",
        "be-navbar-mobile-section-item-text-title"
      );
      sectionItemTitle.textContent = x.titleResponsive;

      sectionItemText.appendChild(sectionItemTitle);

      const sectionItemDescription = document.createElement("div");
      sectionItemDescription.setAttribute(
        "class",
        "be-navbar-mobile-section-item-text-description"
      );
      sectionItemDescription.innerHTML = x.description;
      sectionItemDescription
        .querySelector("span")
        ?.style.setProperty("color", specificSection.color);

      sectionItemText.appendChild(sectionItemDescription);

      sectionItem.appendChild(sectionItemText);

      navbarMobileContent.appendChild(sectionItem);
    });

    navbarTitleEl.replaceChildren(backButtonEl, navTitleEl);
  }
};

const renderDesktopNavbar = () => {
  navbarItemsEl.replaceChildren();
  MenuItems.forEach((x) => {
    // CREATING TYPE
    const navbarLinkEl = document.createElement(
      x.type === "link" ? "a" : "div"
    );

    // ADDING TEXT CONTENT
    navbarLinkEl.textContent = x.title;

    // SETTING CLASS
    navbarLinkEl.setAttribute("class", "be-navbar-item");

    // IF LINK
    if (x.type === "link") {
      navbarLinkEl.setAttribute("href", x.location);
    } else {
      navbarLinkEl.setAttribute("aria-expanded", "false");
      navbarLinkEl.addEventListener("click", (e) => {
        if (e.target !== navbarLinkEl) return;
        navbarLinkEl.setAttribute(
          "aria-expanded",
          navbarLinkEl.getAttribute("aria-expanded") === "true"
            ? "false"
            : "true"
        );
      });

      // CREATE DROPDOWN
      const navbarLinkDropdownEl = document.createElement("div");
      navbarLinkDropdownEl.setAttribute(
        "class",
        "be-navbar-item-dropdown be-container"
      );

      // CREATE DROPDOWN INNER
      const navbarLinkDropdownInnerEl = document.createElement("div");
      navbarLinkDropdownInnerEl.setAttribute(
        "class",
        "be-navbar-item-dropdown-inner"
      );

      x.items.forEach((y) => {
        const navbarDropdownColumn = document.createElement("div");
        navbarDropdownColumn.setAttribute(
          "class",
          "be-navbar-item-dropdown-column"
        );

        // TITLE
        const navbarDropdownColumnTitle = document.createElement("div");
        navbarDropdownColumnTitle.setAttribute(
          "class",
          "be-navbar-item-dropdown-column-title"
        );
        navbarDropdownColumnTitle.style.setProperty("color", y.color);

        // TITLE ICON
        const navbarDropdownColumnTitleIcon = document.createElement("img");
        navbarDropdownColumnTitleIcon.setAttribute("src", y.image);
        navbarDropdownColumnTitleIcon.setAttribute(
          "class",
          "be-navbar-item-dropdown-column-title-icon"
        );
        navbarDropdownColumnTitle.appendChild(navbarDropdownColumnTitleIcon);

        // TITLE TEXT
        const navbarDropdownColumnTitleText = document.createElement("span");
        navbarDropdownColumnTitleText.textContent = y.title;
        navbarDropdownColumnTitle.appendChild(navbarDropdownColumnTitleText);

        navbarDropdownColumn.appendChild(navbarDropdownColumnTitle);

        // LIST
        const columnItemsEl = document.createElement("div");
        columnItemsEl.setAttribute(
          "class",
          "be-navbar-item-dropdown-column-items"
        );

        // ITEMS
        y.items.forEach((z) => {
          const columnItemEl = document.createElement("a");
          columnItemEl.setAttribute(
            "class",
            "be-navbar-item-dropdown-column-item"
          );
          columnItemEl.setAttribute("href", z.location);

          const columnItemImageEl = document.createElement("img");
          columnItemImageEl.setAttribute("src", z.image);
          columnItemImageEl.setAttribute(
            "class",
            "be-navbar-item-dropdown-column-item-image"
          );
          columnItemEl.appendChild(columnItemImageEl);

          const columnItemDescriptionEl = document.createElement("div");
          columnItemDescriptionEl.setAttribute(
            "class",
            "be-navbar-item-dropdown-column-item-description"
          );
          const columnItemDescriptionTitleEl = document.createElement("div");
          columnItemDescriptionTitleEl.setAttribute(
            "class",
            "be-navbar-item-dropdown-column-item-description-title"
          );
          columnItemDescriptionTitleEl.textContent = z.title;
          columnItemDescriptionEl.appendChild(columnItemDescriptionTitleEl);

          const columnItemDescriptionspanEl = document.createElement("div");
          columnItemDescriptionspanEl.setAttribute(
            "class",
            "be-navbar-item-dropdown-column-item-description-span"
          );
          columnItemDescriptionspanEl.innerHTML = z.description;
          const innerSpan = columnItemDescriptionspanEl.querySelector("span");
          if (innerSpan) {
            innerSpan.style.setProperty("color", y.color);
          }

          columnItemDescriptionEl.appendChild(columnItemDescriptionspanEl);

          columnItemEl.appendChild(columnItemDescriptionEl);
          columnItemsEl.appendChild(columnItemEl);
        });

        navbarDropdownColumn.appendChild(columnItemsEl);

        navbarLinkDropdownInnerEl.appendChild(navbarDropdownColumn);
      });

      navbarLinkDropdownEl.appendChild(navbarLinkDropdownInnerEl);

      navbarLinkEl.appendChild(navbarLinkDropdownEl);
    }

    navbarItemsEl.appendChild(navbarLinkEl);
  });
};

// INIT
renderDesktopNavbar();

navbarHamburgerEl.addEventListener("click", () => {
  globalState.expanded = true;
  navbarMobileWrapper.classList.add("be-navbar-mobile-wrapper-active");
  renderMobileNavbar();
});

navbarCloseEl.addEventListener("click", () => {
  globalState.expanded = false;
  navbarMobileWrapper.classList.remove("be-navbar-mobile-wrapper-active");
});
