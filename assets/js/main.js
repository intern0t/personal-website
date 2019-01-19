$(document).ready(() => {
    /* Hi
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    console.log(
        `%c         _nnnn_                      
            dGGGGMMb     ,"""""""""""""".
           @p~qp~~qMb    | Linux Rules! |
           M|@||@) M|   _;..............'
           @,----.JM| -'
          JS^\__/  qKL
         dZP        qKRb
        dZP          qKKb
       fZP            SMMb
       HZM            MMMM
       FqM            MMMM
     __| ".        |\dS"qML
     |    \`.       | \`' \Zq
    _)      \.___.,|     .'
    \____   )MMMMMM|   .'
         \`-'       \`--' \n- Art by hjm (https://www.asciiart.eu/computers/linux)\n- Prashant Says hello ;)`,
        "font-family:monospace"
    );

    /* Special thanks to..
            –––––––––––––––––––––––––––––––––––––––––––––––––– */
    const ThanksTo = [
        "Lightcase",
        "FontAwesome",
        "Github",
        "Netlify",
        "Google Web Fonts",
        "Updown"
    ];

    console.log(`♥ Special thanks to ${ThanksTo.join(", ")}. ♥`);

    /* Image Lightbox Initialization
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    $("a[data-rel^='lightcase']").lightcase({
        maxWidth: "100%"
    });

    /* External link handling.
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    $("a[href^='http://'], a[href^='https://']").click(function() {
        $(this)
            .attr("href")
            .indexOf("://prashant.me") == -1
            ? $(this).attr("target", "_blank")
            : $(this).attr("target", "");
    });

    $('a[href*="#"]:not([href="#"]), a[href^="#fn"]').click(function() {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $('[id="#' + this.hash.slice(1) + '"]');
            if (target.length) {
                $(".container").animate(
                    {
                        scrollTop: target.offset().top
                    },
                    900,
                    "swing",
                    function() {
                        window.location.hash = this.hash;
                    }
                );
                return false;
            }
        }
    });

    /* Toggle Blog Menu
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    $(".menu-toggle").on("click", e => {
        e.preventDefault();
        let blogMenuElement = $(".container-blog-menu");
        console.log(blogMenuElement.css("margin-right"));
        if (blogMenuElement.css("margin-right") !== "0px") {
            blogMenuElement.animate({ "margin-right": "0px" }, 350);
        } else {
            blogMenuElement.animate({ "margin-right": "-275px" }, 350);
        }

        console.log(blogMenuElement.css("margin-right"));
    });

    /* Lazy Load Images
        https://apoorv.pro/lozad.js/
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    const observer = lozad(".lazy", {
        loaded: el => {
            el.src = el.dataset.src;
            el.onload = () => {
                el.classList.add("fade");
            };
        }
    });
    observer.observe();

    $(".container").scroll(() => {
        if ($(".container").scrollTop()) {
            $("a.toTop").fadeIn();
        } else {
            $("a.toTop").fadeOut();
        }
    });
});