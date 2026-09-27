$(document).ready(function () {

    function getFavorites() {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        return favorites.map(String);
    }

    let favorites = getFavorites();
    let showingFavorites = false;
    let currentCategory = "all";


    $(".favorite-btn").each(function () {
        let productId = String($(this).data("id"));

        if (favorites.includes(productId)) {
            $(this).addClass("favorite");
        }
    });


    $("#gridButton").click(function () {
        $("#products-container").removeClass("list-view");

        $(this).addClass("active");
        $("#listButton").removeClass("active");
    });


    $("#listButton").click(function () {
        $("#products-container").addClass("list-view");

        $(this).addClass("active");
        $("#gridButton").removeClass("active");
    });


    $(".favorite-btn").click(function () {
        $(this).toggleClass("favorite");

        let favorites = getFavorites();
        let productId = String($(this).data("id"));

        if ($(this).hasClass("favorite")) {

            if (!favorites.includes(productId)) {
                favorites.push(productId);
            }

        } else {

            favorites = favorites.filter(function (id) {
                return id !== productId;
            });
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));

        if (showingFavorites) {
            applyFilters();
        }
    });


    function applyFilters() {
        let favorites = getFavorites();
        let visibleCount = 0;

        $(".product-item").each(function () {

            let productId = String($(this).data("id"));

            let matchesCategory =
                currentCategory === "all" ||
                $(this).data("category") === currentCategory;

            let matchesFavorites =
                !showingFavorites ||
                favorites.includes(productId);

            let isVisible = matchesCategory && matchesFavorites;

            $(this).toggle(isVisible);

            if (isVisible) {
                visibleCount++;
            }
        });

        let noFavorites = showingFavorites && favorites.length === 0;

        $("#no-favorites").toggle(noFavorites);
        $("#no-results").toggle(!noFavorites && visibleCount === 0);
    }


    $(".category-link").click(function (e) {
        e.preventDefault();

        currentCategory = $(this).data("category");

        $(".category-link").removeClass("active");
        $(this).addClass("active");

        applyFilters();
    });


    $("#fav-btn").click(function () {
        showingFavorites = true;

        applyFilters();

        $(this).removeClass("btn-outline-dark").addClass("btn-dark active");
        $("#all-products").removeClass("btn-dark active").addClass("btn-outline-dark");
    });


    $("#all-products").click(function () {
        showingFavorites = false;

        applyFilters();

        $(this).removeClass("btn-outline-dark").addClass("btn-dark active");
        $("#fav-btn").removeClass("btn-dark active").addClass("btn-outline-dark");
    });

});