gsap.registerPlugin(ScrollTrigger, Flip);
let lenis;
let showAnim;
let mm = gsap.matchMedia();
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
var isMobile;
function checkScreenSize() {
  var screenWidth = window.innerWidth;
  isMobile = screenWidth <= 767;
}
// Initial check
checkScreenSize();
window.addEventListener('resize', checkScreenSize);


var lenisActive = false;
$(document).ready(function () {
  if (Webflow.env('editor') != undefined) {
    console.log('Editor is loaded: do not load custom js');
  } else
  // if (!isSafari()) 
  {
    lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    lenisActive = true;
  }
  // runScrolltriggers();
  //   setTimeout(function(){
  //   ScrollTrigger.refresh();
  // }, 1000);
})


let typeSplit;
// Split the text up
function runSplit() {
  console.log('runSplit')
  typeSplit = new SplitType("[split=lines]", {
    types: "lines"
  });
  let lines = $('[split=lines] .line');
  lines.each(function (index) {
    $(this).wrap('<div class="line-wrapper">');
  });
}
runSplit();


if (localStorage.getItem('visited')) {

} else {


  let tlLoad = gsap.timeline();
  let logo1 = Flip.getState(".is-hero .workshop-logo-wrap");
  let logo2 = Flip.getState(".is-loader .workshop-logo-wrap");
  $('.loader-wrap').css('cursor', 'auto')
  tlLoad.fromTo(
    '.loader-wrap',
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100vh, 0% 100vh)",
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",

      ease: "power4.inOut",
      duration: 2,
      onComplete: () => {
      }
    }, '<3')
    .from('.nav .container-large', { yPercent: -100, duration: 1.2, ease: 'expo.out', delay: 1.25 }, '<')
    .from('.section.is-home-hero', { minHeight: '100vh', duration: 1.8, ease: 'expo.out' }, '<-0.25')

  Flip.to(logo1, {
    targets: ".is-loader .workshop-logo-wrap",
    duration: 2,
    // fade: true,
    // absolute: true,
    ease: "power4.inOut",
    delay: 2
  })

  Flip.from(logo2, {
    targets: ".is-hero .workshop-logo-wrap",
    duration: 2,
    // fade: true,
    // absolute: true,
    ease: "power4.inOut",
    delay: 2
  })


}




// Global hook running before any transition
barba.hooks.before((data) => {
  // window.fsAttributes.destroy();
});
// Global hook running before any transition
barba.hooks.leave((data) => {
  let triggers = gsap.utils.toArray(ScrollTrigger.getAll());
  triggers.forEach(trigger => {
    trigger.kill();
  });
});

// Global hook running after any transition
barba.hooks.after((data) => {
  if (lenisActive) {
    lenis.scrollTo(0, { offset: 0, immediate: true, duration: 0 })
  } else {
    window.scrollTo(0, 0);
  }

  setTimeout(() => {
    if (Webflow) {
      Webflow.destroy();
      Webflow.ready();
      Webflow.require('ix2').init();
    }
  }, 0);

  // window.fsAttributes.cmsfilter.init();
  // window.fsAttributes.cmsload.init();
  allpages();
  setTimeout(() => {
    initializeScrollTriggers();
  }, 50);
});

barba.init({
  preventRunning: true,
  timeout: 5000,
  transitions: [{
    name: 'transition',
    before() {

    },
    leave(data) {
      $('html').css('cursor', 'wait');

      // let trColor = $(data.next.container).find('.section').eq(0).css('background-color');
      // $('.page-transition').css('background-color',trColor);
      // gsap.set('.page-transition',{display: 'block'})
      // gsap.from('.page-transition',{height: '0%', duration: 1.2, ease: 'power4.inOut'})

      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 0.5,
        ease: 'power3.out',
      });
    },
    enter(data) {
      // gsap.to('.page-transition',{height: '0%', duration: 1.2, ease: 'expo.out'})
      $('html').css('cursor', 'auto');
      gsap.fromTo(
        data.next.container,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100vh, 0% 100vh)",

          ease: "power4.inOut",
          duration: 1.2,
          onComplete: () => {
            gsap.set(
              data.next.container,
              {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              })
          }
        }
      );
      typeSplit = new SplitType("[split-ethos], [load-p]", {
        types: "words"
      });
      typeSplit = new SplitType("[load-p]", {
        types: "lines"
      });
      let tltr = gsap.timeline({});
      tltr.from('.hero-img-bk', { scale: 1.25, ease: "power3.out", duration: 1.75, }, '<')
        .from('.nav .container-large', { yPercent: -100, duration: 1.2, ease: 'expo.out', delay: 0.45 }, '<')
        .from('.ethos-logo-wrap', { y: '-4rem', duration: 2.2, ease: 'expo.out', opacity: 0 }, '<')
        .set('.ethos-heading-fs3', { textIndent: '0rem' }, '<')
        .set('.ethos-heading-fs3 .word:first-child', { marginLeft: '25.5rem' }, '<')
        .set('.ethos-possible .word', { marginLeft: '0rem' }, '<')
        .from('[split-ethos] .word', {
          y: '-2rem', duration: 1.2, ease: 'expo.out', opacity: 0,
          stagger: {
            each: 0.01,
            // ease: "power1.out",
          }
          ,
        }, '<0.2')
        .from('[load-p] .line', {
          y: '-5rem', duration: 2.2, ease: 'expo.out', opacity: 0,
          stagger: {
            each: 0.025,
            // ease: "power1.out",
          }
          ,
        }, '<0.5')
        .from('.section-padding-pv4.is-hero', {
          height: '100vh',
          duration: 2.2,
          ease: 'expo.out',
          onComplete: () => {
            ScrollTrigger.refresh();
          }
        }, '<')

    },
    after() {
    }
  }
  ],
  views: [
    {
      namespace: "home",
      afterEnter(data) {
      },
    },
    {
      namespace: "about",
      afterEnter(data) {
      },
    },
  ]
});

// Dont refresh page on current link
let pagetitle;
function allpages() {
  // $("a").on("click", function (e) {
  //   pagetitle = $(this).find(".page-title").text();
  //   let url = $(this).attr("href");
  //   let windowurl = window.location.pathname;
  //   console.log(pagetitle);
  //   if (url === windowurl) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //   }
  // });
  $("a").each(function (index) {
    $(this).removeClass('w--current')
    let url = $(this).attr("href");
    let windowurl = window.location.pathname;
    if (url === windowurl) {
      $(this).addClass('w--current')
    }
  });


  let newsClick = true;
  let newsClickTl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.8,
      ease: "power4.inOut"
    }
  })


  newsClickTl
    .set('.news-popup', { display: 'flex' }, '<')
    .from('.close-news', { yPercent: -100, opacity: 0 }, '<')
    .from('.close-news-icon', { rotate: '-180deg', ease: "power4.out", duration: 0.8 }, '<')
    .fromTo(
      '.news-popup',
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

        ease: "power3.inOut",
        duration: 0.8,
      }, '<')
    .from('.news-popup .swiper-slide', { y: '-15rem', duration: 1.2, ease: 'expo.out', opacity: 0, stagger: { each: 0.025, }, }, '<0.25')




  $('[open-news], [close-news]').on('click', function () {
    if (newsClick) {
      newsClickTl.timeScale(1)
      newsClickTl.play();
      newsClick = false;
    } else {
      newsClickTl.timeScale(1.5)
      newsClickTl.reverse();
      newsClick = true;
    }
  });


  //ANIMATION OF THE HAMB MENU
  let menuClick = true;
  let menuMobiletl = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.8,
      ease: "power4.inOut"
    }
  })
  menuMobiletl.to('.burger-line.middle', {
    marginTop: 'calc(0rem - 1px)',
    marginBottom: 'calc(0rem - 1px)'
  })
    .set('.burger-line.middle', { opacity: 0, duration: 0.2 }, '<0.2')
    .to('.burger-wrap', { y: '2rem', rotate: '180deg', duration: 0.8, }, '<')
    .to('.burger-line.top', { rotate: '45deg' }, '<')
    .to('.burger-line.bottom', { rotate: '-45deg' }, '<')
    .set('.menu-mobile-wrap', { display: 'flex' }, '<')
    .fromTo(
      '.menu-mobile-wrap',
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

        ease: "power3.inOut",
        duration: 0.8,
      }, '<')
    .from('.menu-mobile-wrap .footer-link-wrap, .menu-mobile-wrap .dash-wrap, .menu-mobile-wrap .section-grid > *', { y: '-5rem', duration: 1.2, ease: 'expo.out', opacity: 0, stagger: { each: 0.025, }, }, '<0.25')



  // .from('.menu-mobile-wrap',{opacity:0, duration: 0.2},'<0.1')
  $('.burger-wrap').on('click', function () {
    if (menuClick) {
      menuMobiletl.timeScale(1)
      menuMobiletl.play();
      menuClick = false;
    } else {
      menuMobiletl.timeScale(1.5)
      menuMobiletl.reverse();
      menuClick = true;
    }
  });
  // $('.menu-link, .nav-logo-wrap').on('click', function() {
  //     if (menuClick) {
  //     } else {
  //         menuMobiletl.reverse();
  //         menuClick = true;
  //     }
  // });

  // Logo Marquee
  let link = $('[append-link]').attr("href");
  $.ajax({
    url: link,
    success: function (response) {
      let element = $(response).find("[append-element]");
      $('[append-parent]').append(element);
    },
  });




  $('[class*="drawer-top"]').on('click', function () {
    var $element = $(this).closest('.drawer-item');
    var clickCount = $element.data('clickCount') || 0; // Get the current click count or set it to 0

    if (clickCount === 1) {
      $element.removeClass('open');
      setTimeout(function () {
        ScrollTrigger.refresh();
      }, 600);
    } else {
      $element.siblings().removeClass('open').data('clickCount', 0);
      $element.addClass('open');
      setTimeout(function () {
        ScrollTrigger.refresh();
      }, 600);
    }

    clickCount++;
    if (clickCount > 1) clickCount = 0; // Reset the click count after the second click

    $element.data('clickCount', clickCount); // Store the updated click count
  });



  $('.button.is-filter').on('click', function () {
    setTimeout(function () {
      if ($(".filters-collection .button").hasClass("is-active")) {
        $('.filters-wrap .button.is-clear').removeClass('is-active');
      } else {
        $('.filters-wrap .button.is-clear').addClass('is-active');
      }
    }, 50);
  });



  $(".swiper").each(function (index, element) {
    let prev = $(this).find('.is-prev')[0]
    let next = $(this).find('.is-next')[0]
    let nav = $(this).find('.swiper-pagination')[0]
    // Check if there's no div with class w-dyn-empty inside the current .swiper-blog-featured element
    if ($(this).find("div.w-dyn-empty").length === 0) {
      new Swiper($(this).find(".swiper-container")[0], {
        grabCursor: true,
        // speed: 1000,
        // loop: true,
        // autoplay: {
        //   delay: 3000,
        // },
        // effect: 'coverflow',
        slidesPerView: "auto",
        slidesPerGroup: 1,
        navigation: {
          nextEl: next,
          prevEl: prev
        },
        mousewheel: {
          forceToAxis: true,
          invert: false,
          sensitivity: 1.5
        },
        pagination: {
          el: nav,
          clickable: true,
        },
      });
    }
  });

  $(".section.is-home-hero").each(function () {
    // Create a GSAP timeline for the section
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        // toggleActions: "play none reverse none",
      }
    });
    tl
      .to($(".hero-img-bk"), {
        yPercent: 30,
        scale: 1.05,
        ease: 'none'
        // ease: 'power2.inOut',
        // duration: 0.25,
      })
  });


  $(".project-list-item").each(function () {
    // Create a GSAP timeline for the section
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top 80%",
        end: "top 80%",
        // scrub: 1,
        toggleActions: "play none none none",
      }
    });
    tl
      .to($(this).find('.project-img-top'), {
        height: '0%',
        ease: 'power3.inOut',
        duration: 1.5,
      })
      .from($(this).find('.project-image'), {
        scale: 1.5,
        ease: 'power3.inOut',
        duration: 2,
      }, '<-0.5')
  });
  $(".project-list-item").each(function () {
    // Create a GSAP timeline for the section
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        // toggleActions: "play none none none",
      }
    });
    tl
      .from($(this).find('.project-image'), {
        yPercent: -15,
        ease: 'none',
        // duration: 2,
      }, '<')
  });

  $(".parenthesis-txtiimg-wrap").each(function () {
    // Create a GSAP timeline for the section
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: "top center",
        end: "top center",
        // scrub: 1,
        toggleActions: "play none reverse none",
      }
    });
    tl
      .from($(this).find('.second-parenthesis'), {
        marginLeft: '0rem',
        ease: 'power3.inOut',
        duration: 1,
      })
      .from($(this).find('.parenthesis-img-width'), {
        scale: 0,
        ease: 'power3.inOut',
        transformOrigin: 'center left',
        duration: 1,
      }, '<')
      .from($(this).find('.parenthesis-img-width img'), {
        scale: 6,
        ease: 'power3.out',
        duration: 1,
      }, '<')
  });



}
allpages();



function initializeScrollTriggers() {
  $(".section").each(function () {
    let fontColor = $(this).css('color');
    // mm.add("(min-width: 992px)", () => {
    ScrollTrigger.create({
      id: "navScrolltrigger",
      trigger: $(this),
      start: "top 5%",
      end: "bottom 5%",
      // markers: true,
      onEnter: () => {
        $(".nav:not([nav='in-menu'])").css("color", fontColor);
        // console.log('onEnter')
      },
      onEnterBack: () => {
        $(".nav:not([nav='in-menu']").css("color", fontColor);
        // console.log('onEnterBack')
      },
      onLeave: () => {
        // console.log('onLeave')
      },
      onLeaveBack: () => {
        // console.log('onLeaveBack')
      },
    });
    // });
  });
}


initializeScrollTriggers();
