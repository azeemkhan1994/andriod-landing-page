$(function () {
    "use strict";

    /*-----------------------------------
     * FIXED  MENU - HEADER
     *-----------------------------------*/
    function menuscroll() {
        var $navmenu = $('.nav-menu');
        var $navlogo = $('.navbar-brand img');
        if ($(window).scrollTop() > 50) {
            $navmenu.addClass('is-scrolling');
            $navlogo.attr({ src: 'images/logo-black.svg' });
        } else {
            $navmenu.removeClass("is-scrolling");
            $navlogo.attr({ src: 'images/logo-full-white.svg' })
        }
    }
    menuscroll();
    $(window).on('scroll', function () {
        menuscroll();
    });
    /*-----------------------------------
     * NAVBAR CLOSE ON CLICK
     *-----------------------------------*/

    $('.navbar-nav > li:not(.dropdown) > a').on('click', function () {
        $('.navbar-collapse').collapse('hide');
    });
    /* 
     * NAVBAR TOGGLE BG
     *-----------------*/
    var siteNav = $('#navbar');
    siteNav.on('show.bs.collapse', function (e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
        if ($('.nav-menu').hasClass("is-scrolling") === false) {
            $('.navbar-brand img').attr({ src: 'images/logo-black.svg' });
        }
    })
    siteNav.on('hide.bs.collapse', function (e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
        if ($('.nav-menu').hasClass("is-scrolling") === false) {
            $('.navbar-brand img').attr({ src: 'images/logo-full-white.svg' })
        }
    })

    /*-----------------------------------
     * ONE PAGE SCROLLING
     *-----------------------------------*/
    // Select all links with hashes
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').on('click', function (event) {
        // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Checking if the target was focused
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
    /*-----------------------------------
     * OWL CAROUSEL
     *-----------------------------------*/
    var $testimonialsDiv = $('.testimonials');
    if ($testimonialsDiv.length && $.fn.owlCarousel) {
        $testimonialsDiv.owlCarousel({
            items: 1,
            nav: true,
            dots: false,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
        });
    }

    var $galleryDiv = $('.img-gallery');
    if ($galleryDiv.length && $.fn.owlCarousel) {
        $galleryDiv.owlCarousel({
            nav: false,
            center: true,
            loop: true,
            autoplay: true,
            dots: true,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });
    }

    var $headerDiv = $('.header-img-gallery');
    if ($headerDiv.length && $.fn.owlCarousel) {
        $headerDiv.owlCarousel({
            nav: false,
            center: true,
            loop: true,
            autoplay: true,
            dots: true,
            navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 3
                }
            }
        });
    }

    const validateNumber = (event) => {
        if (/[0-9()+-]/i.test(event.data) === false) {
            event.target.value = event.target.value.replace(event.data, "");
        }
    };

    const inputElements = document.querySelectorAll("[name='Phone']");
    for (let i = 0; i < inputElements.length; i++) {
        inputElements[i].addEventListener('input', validateNumber);
    }

    // Fetch all the forms 
    const forms = document.querySelectorAll("form");
    console.log(forms)

    // Loop over them 
    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                if (form.checkValidity() === true) {
                    var formData = $(form).serialize();
                    $.ajax({
                        type: "POST",
                        url: "https://pebtechsolutions.com/demowebsite/best-andriod-mobile-app-development-company-usa/send-email.php",
                        dataType: "json",
                        data: formData,
                        success: function (response) {
                            if (response.success) {
                                form.reset();
                                location.replace("https://pebtechsolutions.com/thankyou.html");
                            } else { }
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr);
                        },
                    });
                }

                return false;
            },
            false
        );
    });

}); /* End Fn */