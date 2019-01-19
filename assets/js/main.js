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
                    "swing"
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

    /* Search handling
        –––––––––––––––––––––––––––––––––––––––––––––––––– */
    /* Handle keydown */
    $(".search-input").keydown(e => {
        let keyPressed = e.which || e.keyCode || e.key;
        let searchKey = $(".search-input").val();

        if (
            (keyPressed === "Enter" || keyPressed === 13) &&
            searchKey.length > 0
        ) {
            $(".search-button").trigger("click");
        }
    });

    /* Handle search button click */
    $(".search-button").on("click", e => {
        e.preventDefault();
        let searchKey = $(".search-input").val();

        if (
            searchKey !== null &&
            searchKey !== undefined &&
            searchKey !== "" &&
            searchKey.length > 3
        ) {
            $.getJSON("../posts.json", {}, function(data) {
                const filteredData = data.posts.filter(
                    post =>
                        post.title
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) ||
                        post.tags
                            .join()
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) ||
                        post.category
                            .toLowerCase()
                            .includes(searchKey.toLowerCase()) ||
                        post.excerpt.indexOf(searchKey) > 0
                );
                console.log(
                    "[Search] - Searching for " +
                        searchKey +
                        " returned " +
                        filteredData.length +
                        " results."
                );

                $(".container-search-result-wrapper").empty();
                $(".search-result").empty()
                .append(
                    "Found " +
                    filteredData.length +
                    " results for <code>" +
                    searchKey +
                    "</code>."
                );

                $.each(filteredData, (key, value) => {
                    var initialFormatting =
                        '<div class="container-search-result-wrapper-entry">' +
                        '<h5><i class="fas fa-file-alt"></i>&nbsp;<a target="_blank" href="{0}">{1}</a></h5>' +
                        '<div class="tags">{2}</div>' +
                        "<p>{5}</p>" +
                        '<p class="post-misc"><span><i class="fas fa-sitemap"></i>&nbsp;&nbsp;{3}</span>' +
                        '<span><i class="far fa-calendar-alt"></i>&nbsp;&nbsp;{4}</span></p>' +
                        "</div>";
                    $(".container-search-result-wrapper").append(
                        initialFormatting
                            .replace("{0}", value.link)
                            .replace(
                                "{1}",
                                value.title.replace(
                                    searchKey,
                                    "<span style='background: yellow; color: black;'>" +
                                        searchKey +
                                        "</span>"
                                )
                            )
                            .replace(
                                "{2}",
                                value.tags
                                    .map(tag => {
                                        return (
                                            "<div class='tag'><i class='fas fa-tag'></i>" +
                                            tag.replace(",", "").toUpperCase() +
                                            "</div>".replace(",", "")
                                        );
                                    })
                                    .join("")
                            )
                            .replace(
                                "{3}",
                                value.category
                                    .toUpperCase()
                                    .replace(
                                        searchKey.toUpperCase(),
                                        "<span style='background: yellow; color: black;'>" +
                                            searchKey.toUpperCase() +
                                            "</span>"
                                    )
                            )
                            .replace("{4}", value.date.toUpperCase())
                            .replace(
                                "{5}",
                                value.excerpt.replace(
                                    searchKey,
                                    "<span style='background: yellow; color: black;'>" +
                                        searchKey +
                                        "</span>"
                                )
                            )
                    );
                });
            });
        } else {
            console.log("[Search] - Empty search instruction received.");
        }
    });
});
