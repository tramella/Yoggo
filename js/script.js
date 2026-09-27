/**
 * YOGGO Yoga Studio - Main Script
 * Enhanced with GSAP animations, dynamic 2-week schedule, and smooth responsive interactions.
 */

$(document).ready(function () {
  // Register GSAP plugins if available
  if (typeof gsap !== "undefined") {
    if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
    if (typeof ScrollToPlugin !== "undefined") gsap.registerPlugin(ScrollToPlugin);
  }

  /* ==========================================================================
     1. HERO & INITIAL GSAP ENTRANCE ANIMATIONS
     ========================================================================== */
  function initEntranceAnimations() {
    if (typeof gsap === "undefined") return;

    // Header logo & nav items reveal
    gsap.from("header .logo", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power2.out",
    });

    gsap.from("header .header-menu > *", {
      opacity: 0,
      y: -15,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.2,
    });

    // Hero banner zoom-in reveal
    gsap.from(".SliderSection img", {
      opacity: 0,
      scale: 1.06,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });

    // ScrollTrigger Section Animations
    if (typeof ScrollTrigger !== "undefined") {
      // Why Us Section Headers
      gsap.utils.toArray(".WhyUs .EachWhy").forEach((item) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 25,
          duration: 0.7,
          ease: "power2.out",
        });
      });

      // Class Section Cards
      gsap.from(".ClassSection .AllClass > *", {
        scrollTrigger: {
          trigger: ".ClassSection .AllClass",
          start: "top 82%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 35,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      });

      // Studio Banner Reveals
      gsap.utils.toArray(".Studio").forEach((studio) => {
        gsap.from($(studio).find(".StudioContent > *"), {
          scrollTrigger: {
            trigger: studio,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // Instructors Grid
      gsap.from(".Instructors .AllInstructor > *", {
        scrollTrigger: {
          trigger: ".Instructors .AllInstructor",
          start: "top 82%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
      });

      // Schedule Section Reveal
      gsap.from(".ScheduleSection .Schedule", {
        scrollTrigger: {
          trigger: ".ScheduleSection .Schedule",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: "power2.out",
      });

      // CTA Section
      gsap.from(".SectionBook button", {
        scrollTrigger: {
          trigger: ".SectionBook",
          start: "top 90%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "back.out(1.5)",
      });
    }
  }

  initEntranceAnimations();

  /* ==========================================================================
     2. NAVIGATION & SMOOTH TAB SCROLLING
     ========================================================================== */
  function smoothScrollTo(target) {
    if (!target || target === "#") return;
    const $target = $(target);
    if ($target.length) {
      const topOffset = $target.offset().top - 30;
      if (typeof gsap !== "undefined" && gsap.plugins && gsap.plugins.scrollTo) {
        gsap.to(window, {
          duration: 0.8,
          scrollTo: { y: topOffset, autoKill: true },
          ease: "power2.inOut",
        });
      } else {
        $("html, body").animate({ scrollTop: topOffset }, 600);
      }
    }
  }

  // Handle nav-link clicks (header, side-menu, and footer links)
  $(document).on("click", ".nav-link, header .header-menu .tag, .side-menu .header-menu .tag", function (e) {
    const target = $(this).attr("data-target") || $(this).attr("href");
    if (target && target.startsWith("#") && target.length > 1) {
      e.preventDefault();
      // Close mobile menu if open
      if ($(".side-menu").hasClass("open-menu")) {
        closeSideMenu();
      }
      smoothScrollTo(target);
    }
  });

  // Online Consultation button opens book modal with smooth transition
  $(document).on("click", ".jOpenConsultation", function (e) {
    e.preventDefault();
    if ($(".side-menu").hasClass("open-menu")) {
      closeSideMenu();
    }
    openBookingModal("Online Consultation", "09:00 AM - 10:00 AM");
  });

  /* ==========================================================================
     3. MOBILE SIDE MENU WITH GSAP
     ========================================================================== */
  function openSideMenu() {
    $(".side-menu").addClass("open-menu");
    $("body").addClass("no-scroll");

    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        ".side-menu",
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.45, ease: "power3.out" }
      );
      gsap.fromTo(
        ".side-menu .header-menu > *",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.15, ease: "power2.out" }
      );
    }
  }

  function closeSideMenu() {
    if (typeof gsap !== "undefined") {
      gsap.to(".side-menu", {
        y: "-100%",
        opacity: 0,
        duration: 0.35,
        ease: "power3.in",
        onComplete: () => {
          $(".side-menu").removeClass("open-menu");
          $("body").removeClass("no-scroll");
        },
      });
    } else {
      $(".side-menu").removeClass("open-menu");
      $("body").removeClass("no-scroll");
    }
  }

  $(".hamburger").on("click", openSideMenu);
  $(".side-menu .close-side-menu, .side-menu .logo img:nth-child(2)").on("click", closeSideMenu);

  /* ==========================================================================
     4. ACCORDION (WHY US & YOGA STYLES) WITH SMOOTH GSAP EXPAND/COLLAPSE
     ========================================================================== */
  function toggleAccordion($clickedElement) {
    const $thisWhy = $clickedElement.closest(".EachWhy");
    const $section = $thisWhy.closest(".WhyUs");
    const $content = $thisWhy.find(".WhyUsContent, .WhyUsContent1");
    const $icon = $thisWhy.find(".icon-drop");
    const isOpen = $content.hasClass("open");

    // Close all other accordions within the same section
    $section.find(".EachWhy").each(function () {
      const $other = $(this);
      const $otherContent = $other.find(".WhyUsContent, .WhyUsContent1");
      const $otherIcon = $other.find(".icon-drop");

      if ($otherContent.hasClass("open") && !$other.is($thisWhy)) {
        $otherContent.removeClass("open");
        $otherIcon.attr("src", "./images/Add.png");
        if (typeof gsap !== "undefined") {
          gsap.to($otherContent, {
            height: 0,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          });
          gsap.to($otherIcon, { rotation: 0, duration: 0.3 });
        } else {
          $otherContent.css("height", "0");
        }
      }
    });

    if (isOpen) {
      $content.removeClass("open");
      $icon.attr("src", "./images/Add.png");
      if (typeof gsap !== "undefined") {
        gsap.to($content, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
        gsap.to($icon, { rotation: 0, duration: 0.3 });
      } else {
        $content.css("height", "0");
      }
    } else {
      $content.addClass("open");
      $icon.attr("src", "./images/Minus1.png");
      if (typeof gsap !== "undefined") {
        gsap.set($content, { height: "auto", opacity: 0 });
        gsap.from($content, {
          height: 0,
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
        });
        gsap.to($content, { opacity: 1, duration: 0.4 });
        gsap.fromTo($icon, { rotation: 0 }, { rotation: 180, duration: 0.35 });
      } else {
        $content.css("height", "auto");
      }
    }
  }

  $(document).on("click", ".toggleWhy, .icon-drop", function (e) {
    e.stopPropagation();
    toggleAccordion($(this));
  });

  // Open first item in each WhyUs section initially
  $(".WhyUs").each(function () {
    const $firstItem = $(this).find(".EachWhy").first();
    const $firstContent = $firstItem.find(".WhyUsContent, .WhyUsContent1");
    const $firstIcon = $firstItem.find(".icon-drop");

    $firstContent.addClass("open").css({ height: "auto", opacity: 1 });
    $firstIcon.attr("src", "./images/Minus1.png");
  });

  /* ==========================================================================
     5. LANGUAGE SWITCHER (EN / VN) WITH SMOOTH GSAP
     ========================================================================== */
  $(".language").on("mouseenter", function () {
    const $lang = $(this);
    const isSelected = $lang.hasClass("selected");
    const inHeader = $lang.closest("header").length > 0;

    if (typeof gsap !== "undefined") {
      if (isSelected) {
        gsap.to($lang.find(".lang-vn"), { top: "40px", duration: 0.25 });
        gsap.to($lang.find(".lang-en"), { top: "0px", duration: 0.25 });
      } else {
        gsap.to($lang.find(".lang-en"), { top: "40px", duration: 0.25 });
        gsap.to($lang.find(".lang-vn"), { top: "0px", duration: 0.25 });
      }
    }

    if (inHeader) {
      $lang.css({ "background-color": "black", color: "white" });
    } else {
      $lang.css({ "background-color": "white", color: "black" });
    }
  });

  $(".language").on("mouseleave", function () {
    const $lang = $(this);
    const isSelected = $lang.hasClass("selected");
    const inHeader = $lang.closest("header").length > 0;

    if (typeof gsap !== "undefined") {
      if (isSelected) {
        gsap.to($lang.find(".lang-en"), { top: "40px", duration: 0.25 });
        gsap.to($lang.find(".lang-vn"), { top: "0px", duration: 0.25 });
      } else {
        gsap.to($lang.find(".lang-en"), { top: "0px", duration: 0.25 });
        gsap.to($lang.find(".lang-vn"), { top: "-40px", duration: 0.25 });
      }
    }

    if (isSelected) {
      $lang.css({
        "background-color": inHeader ? "black" : "white",
        color: inHeader ? "white" : "black",
      });
    } else {
      $lang.css({
        "background-color": "transparent",
        color: inHeader ? "black" : "white",
      });
    }
  });

  $(".language").on("click", function () {
    const $lang = $(this);
    $lang.toggleClass("selected");
    const isSelected = $lang.hasClass("selected");
    const inHeader = $lang.closest("header").length > 0;

    if (typeof gsap !== "undefined") {
      if (isSelected) {
        gsap.to($lang.find(".lang-en"), { top: "40px", duration: 0.25 });
        gsap.to($lang.find(".lang-vn"), { top: "0px", duration: 0.25 });
      } else {
        gsap.to($lang.find(".lang-en"), { top: "0px", duration: 0.25 });
        gsap.to($lang.find(".lang-vn"), { top: "-40px", duration: 0.25 });
      }
    }

    $lang.css({
      "background-color": isSelected ? (inHeader ? "black" : "white") : "transparent",
      color: isSelected ? (inHeader ? "white" : "black") : inHeader ? "black" : "white",
    });
  });

  /* ==========================================================================
     6. DYNAMIC 2-WEEK SCHEDULE (CURRENT & NEXT WEEK)
     ========================================================================== */
  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "12:00 PM - 01:00 PM",
    "03:00 PM - 04:00 PM",
    "06:00 PM - 07:00 PM",
  ];

  let selectedStyle = localStorage.getItem("selectedStyle") || "HATHA";
  let selectedClassType = localStorage.getItem("selectedClassType") || "GROUP";
  let weekOffset = 0; // 0 = Current Week, 1 = Next Week

  /**
   * Calculate Monday of the current week based on given reference date.
   */
  function getMonday(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const monday = new Date(date.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  /**
   * Format date as YYYY-MM-DD in local time
   */
  function formatISODate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  /**
   * Generates dynamic rich schedule data for Current Week (offset 0) and Next Week (offset 1)
   */
  function generateTwoWeekScheduleData() {
    const schedule = [];
    const baseMonday = getMonday(new Date());

    // Schedule matrix: [dayIndex 0..5, slotIndex 0..3] -> [subject, classType]
    // Carefully planned so every subject & classType has comprehensive offerings each week
    const matrixPatterns = [
      // Week 0 pattern (Current week)
      [
        // Monday (day 0)
        [
          { subject: "VINYASA", type: "ONLINE" },
          { subject: "HATHA", type: "INDIVIDUAL" },
          { subject: "HATHA", type: "GROUP" },
          { subject: "YIN", type: "INDIVIDUAL" },
        ],
        // Tuesday (day 1)
        [
          { subject: "YIN", type: "GROUP" },
          { subject: "HATHA", type: "GROUP" },
          { subject: "VINYASA", type: "INDIVIDUAL" },
          { subject: "VINYASA", type: "ONLINE" },
        ],
        // Wednesday (day 2)
        [
          { subject: "VINYASA", type: "INDIVIDUAL" },
          { subject: "YIN", type: "ONLINE" },
          { subject: "HATHA", type: "ONLINE" },
          { subject: "HATHA", type: "GROUP" },
        ],
        // Thursday (day 3)
        [
          { subject: "YIN", type: "GROUP" },
          { subject: "HATHA", type: "INDIVIDUAL" },
          { subject: "VINYASA", type: "ONLINE" },
          { subject: "HATHA", type: "INDIVIDUAL" },
        ],
        // Friday (day 4)
        [
          { subject: "HATHA", type: "ONLINE" },
          { subject: "VINYASA", type: "GROUP" },
          { subject: "YIN", type: "GROUP" },
          { subject: "YIN", type: "INDIVIDUAL" },
        ],
        // Saturday (day 5)
        [
          { subject: "YIN", type: "GROUP" },
          { subject: "HATHA", type: "INDIVIDUAL" },
          { subject: "VINYASA", type: "ONLINE" },
          { subject: "HATHA", type: "GROUP" },
        ],
      ],
      // Week 1 pattern (Next week)
      [
        // Monday (day 0)
        [
          { subject: "HATHA", type: "GROUP" },
          { subject: "VINYASA", type: "INDIVIDUAL" },
          { subject: "YIN", type: "ONLINE" },
          { subject: "VINYASA", type: "GROUP" },
        ],
        // Tuesday (day 1)
        [
          { subject: "VINYASA", type: "ONLINE" },
          { subject: "YIN", type: "INDIVIDUAL" },
          { subject: "HATHA", type: "ONLINE" },
          { subject: "HATHA", type: "GROUP" },
        ],
        // Wednesday (day 2)
        [
          { subject: "YIN", type: "GROUP" },
          { subject: "HATHA", type: "INDIVIDUAL" },
          { subject: "VINYASA", type: "GROUP" },
          { subject: "VINYASA", type: "ONLINE" },
        ],
        // Thursday (day 3)
        [
          { subject: "HATHA", type: "ONLINE" },
          { subject: "VINYASA", type: "INDIVIDUAL" },
          { subject: "YIN", type: "GROUP" },
          { subject: "HATHA", type: "GROUP" },
        ],
        // Friday (day 4)
        [
          { subject: "VINYASA", type: "GROUP" },
          { subject: "HATHA", type: "ONLINE" },
          { subject: "YIN", type: "ONLINE" },
          { subject: "VINYASA", type: "INDIVIDUAL" },
        ],
        // Saturday (day 5)
        [
          { subject: "HATHA", type: "GROUP" },
          { subject: "VINYASA", type: "ONLINE" },
          { subject: "YIN", type: "INDIVIDUAL" },
          { subject: "YIN", type: "GROUP" },
        ],
      ],
    ];

    // Build for Week 0 and Week 1
    for (let w = 0; w < 2; w++) {
      const weekMon = new Date(baseMonday);
      weekMon.setDate(baseMonday.getDate() + w * 7);

      for (let d = 0; d < 6; d++) {
        const currentDay = new Date(weekMon);
        currentDay.setDate(weekMon.getDate() + d);
        const dateStr = formatISODate(currentDay);
        const dayPattern = matrixPatterns[w][d];

        for (let t = 0; t < timeSlots.length; t++) {
          const item = dayPattern[t];
          if (item) {
            schedule.push({
              date: dateStr,
              time: timeSlots[t],
              subject: item.subject,
              classType: item.type,
            });
          }
        }
      }
    }

    return schedule;
  }

  let classData = generateTwoWeekScheduleData();

  /**
   * Get days for the active week based on viewport and week offset
   */
  function getWeekDates(offset = 0) {
    const isMobile = window.innerWidth < 768;
    const baseMonday = getMonday(new Date());
    const weekStart = new Date(baseMonday);
    weekStart.setDate(baseMonday.getDate() + offset * 7);

    if (isMobile) {
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return days.map((name, i) => {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        return { name, date: d.getDate(), full: d };
      });
    } else {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days.map((name, i) => {
        const d = new Date(weekStart);
        d.setDate(weekStart.getDate() + i);
        return { name, date: d.getDate(), full: d };
      });
    }
  }

  /**
   * Update the Week Range Label & Prev/Next button states
   */
  function updateWeekRangeText(week) {
    const start = week[0].full.toLocaleDateString("en-US", { day: "numeric", month: "short" }).toUpperCase();
    const end = week[week.length - 1].full.toLocaleDateString("en-US", { day: "numeric", month: "short" }).toUpperCase();
    const weekLabel = weekOffset === 0 ? "CURRENT WEEK" : "NEXT WEEK";
    $("#week-range").html(`<span class="week-tag">${weekLabel}</span> <span class="week-dates">(${start} - ${end})</span>`);

    // Update navigation button active/disabled states
    $("#prev-week").toggleClass("disabled", weekOffset <= 0);
    $("#next-week").toggleClass("disabled", weekOffset >= 1);
  }

  /**
   * Render Schedule Grid
   */
  function renderSchedule(animate = true) {
    const week = getWeekDates(weekOffset);
    const $header = $(".HeaderSchedule").empty();
    const $body = $("#schedule-body").empty();

    // Render header days
    week.forEach((day) => {
      $header.append(`<div class="day-header">
        <div class="dayOfWeek">${day.name}</div>
        <div class="noDate">${day.date}</div>
      </div>`);
    });

    updateWeekRangeText(week);

    // Render body cells
    for (let t = 0; t < timeSlots.length; t++) {
      for (let i = 0; i < week.length; i++) {
        const dayObj = week[i];
        const dayStr = formatISODate(dayObj.full);

        const found = classData.find(
          (c) =>
            c.date === dayStr &&
            c.time === timeSlots[t] &&
            c.subject === selectedStyle &&
            c.classType === selectedClassType
        );

        if (found) {
          $body.append(`<div class="schedule-cell has-class" data-style="${found.subject}" data-time="${found.time}">
            <div class="schedule-time">${found.time}</div>
            <div class="schedule-subject">${found.subject}</div>
            <div class="schedule-type-badge">${found.classType}</div>
            <div class="btn-book">BOOK</div>
          </div>`);
        } else {
          $body.append(`<div class="schedule-cell empty-cell">
            <span class="cell-time-hint">${timeSlots[t]}</span>
          </div>`);
        }
      }
    }

    // GSAP Cell Stagger Animation when switching filters or weeks
    if (animate && typeof gsap !== "undefined") {
      gsap.fromTo(
        "#schedule-body .schedule-cell",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.015, ease: "power2.out" }
      );
    }
  }

  // Initialize schedule filter dropdown labels
  $(".selectedValueStyle").text(selectedStyle);
  $(".selectedValueClass").text(selectedClassType);

  // Dropdown style selection
  $(".style-types .option").on("click", function (e) {
    e.stopPropagation();
    selectedStyle = $(this).text().trim();
    $(".selectedValueStyle").text(selectedStyle);
    localStorage.setItem("selectedStyle", selectedStyle);
    $(this).closest(".DropList").hide();
    renderSchedule(true);
  });

  // Dropdown class type selection
  $(".class-types .option").on("click", function (e) {
    e.stopPropagation();
    selectedClassType = $(this).text().trim();
    $(".selectedValueClass").text(selectedClassType);
    localStorage.setItem("selectedClassType", selectedClassType);
    $(this).closest(".DropList").hide();
    renderSchedule(true);
  });

  // Previous week button (Current Week)
  $("#prev-week").on("click", function () {
    if (weekOffset > 0) {
      weekOffset = 0;
      renderSchedule(true);
    }
  });

  // Next week button (Next Week)
  $("#next-week").on("click", function () {
    if (weekOffset < 1) {
      weekOffset = 1;
      renderSchedule(true);
    }
  });

  // Initial schedule render
  renderSchedule(false);

  // Re-render on window resize with debounce
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderSchedule(false);
    }, 200);
  });

  /* ==========================================================================
     7. BOOKING MODAL & INTERACTION
     ========================================================================== */
  function openBookingModal(style = "Hatha Yoga", time = "09:00 AM - 10:00 AM") {
    // If style is without "Yoga", format it nicely
    let formattedStyle = style.includes("Yoga") ? style : `${style.charAt(0).toUpperCase() + style.slice(1).toLowerCase()} Yoga`;
    $(".form-select-style .selectedValue").text(formattedStyle);
    $(".form-select-time .selectedValue").text(time);

    $(".FromBookClass").addClass("openBook").css("display", "flex");
    $("body").addClass("no-scroll");

    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        ".FromBookClass",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        ".FromBookClass .Form",
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }
      );
    }
  }

  function closeBookingModal() {
    if (typeof gsap !== "undefined") {
      gsap.to(".FromBookClass .Form", {
        scale: 0.9,
        opacity: 0,
        y: 20,
        duration: 0.25,
        ease: "power2.in",
      });
      gsap.to(".FromBookClass", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          $(".FromBookClass").removeClass("openBook").css("display", "none");
          $("body").removeClass("no-scroll");
        },
      });
    } else {
      $(".FromBookClass").removeClass("openBook").css("display", "none");
      $("body").removeClass("no-scroll");
    }
  }

  // Open modal from CTA button
  $("#jBookClass, .SectionBook button").on("click", function (e) {
    e.preventDefault();
    openBookingModal(selectedStyle + " Yoga", "09:00 AM - 10:00 AM");
  });

  // Open modal from direct schedule cell click
  $(document).on("click", ".schedule-cell .btn-book, .schedule-cell.has-class", function (e) {
    e.stopPropagation();
    const $cell = $(this).closest(".schedule-cell");
    const style = $cell.attr("data-style") || selectedStyle;
    const time = $cell.attr("data-time") || "09:00 AM - 10:00 AM";
    openBookingModal(style + " Yoga", time);
  });

  // Close modal button
  $(".jCloseBtn").on("click", function () {
    closeBookingModal();
  });

  // Close modal on backdrop click
  $(".FromBookClass").on("click", function (e) {
    if ($(e.target).hasClass("FromBookClass")) {
      closeBookingModal();
    }
  });

  // Close modal on Escape key
  $(document).on("keydown", function (e) {
    if (e.key === "Escape" && $(".FromBookClass").hasClass("openBook")) {
      closeBookingModal();
    }
  });

  /* ==========================================================================
     8. FORM INPUT & CUSTOM DROPDOWN BEHAVIOR
     ========================================================================== */
  // Clear input icon
  $(".InputForm input").on("input", function () {
    const $closeBtn = $(this).siblings(".jcloseForm");
    $closeBtn.toggle($(this).val().trim() !== "");
  });

  $(".InputForm .jcloseForm").on("click", function () {
    const $input = $(this).siblings("input");
    $input.val("").trigger("input").focus();
  });

  // Toggle custom dropdowns
  $(document).on("click", ".EachSelect", function (e) {
    e.stopPropagation();
    const $dropList = $(this).find(".DropList, .DropList1");
    const isVisible = $dropList.is(":visible");

    $(".DropList, .DropList1").not($dropList).hide();

    if (!isVisible) {
      $dropList.show();
      if (typeof gsap !== "undefined") {
        gsap.fromTo(
          $dropList,
          { opacity: 0, y: -8, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power2.out" }
        );
      }
    } else {
      $dropList.hide();
    }
  });

  // Select dropdown option
  $(document).on("click", ".FromBookClass .DropList .option, .FromBookClass .DropList1 .option", function (e) {
    e.stopPropagation();
    const selected = $(this).text().trim();
    $(this).closest(".EachSelect").find(".selectedValue").text(selected);
    $(this).closest(".DropList, .DropList1").hide();
  });

  // Close dropdowns on outside click
  $(document).on("click", function () {
    $(".DropList, .DropList1").hide();
  });

  // Booking form submission feedback
  $(".BtnSubmit").on("click", function () {
    const name = $("#fullName").val().trim();
    const agree = $("#agreeData").is(":checked");

    if (!agree) {
      alert("Please agree to the processing of personal data to continue.");
      return;
    }

    if (!name) {
      alert("Please enter your name.");
      $("#fullName").focus();
      return;
    }

    const $btn = $(this);
    const originalText = $btn.text();
    $btn.text("BOOKED SUCCESSFULLY ✓").css({
      "background-color": "black",
      color: "white",
    });

    setTimeout(() => {
      $btn.text(originalText).removeAttr("style");
      closeBookingModal();
    }, 1500);
  });

  /* ==========================================================================
     9. HOVER MICRO-ANIMATIONS
     ========================================================================== */
  $(".SectionBook button").on("mouseenter", function () {
    $(this).find(".arrow-img").attr("src", "./images/Right_Arrow_Hover.png");
    if (typeof gsap !== "undefined") {
      gsap.to(this, { scale: 1.03, duration: 0.25, ease: "power2.out" });
    }
  });

  $(".SectionBook button").on("mouseleave", function () {
    $(this).find(".arrow-img").attr("src", "./images/Right_Arrow.png");
    if (typeof gsap !== "undefined") {
      gsap.to(this, { scale: 1, duration: 0.25, ease: "power2.out" });
    }
  });
});





