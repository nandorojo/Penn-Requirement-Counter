$(document).ready(function () {

    var $header = $('header.header'),
        $body = $('body'),
        $menuTrigger = $('.menuTrigger'),
        notyf = new Notyf({
            delay: 3000
        }),
        sector = '',
        sectorName = '',
        foundational = '',
        foundationalName = '',
        saved;

    // check if there's local storage
    if (localStorage.getItem("saved") !== null) {
        var saved = JSON.parse(localStorage.getItem('saved'));
    } else {
        saved = []
    };

    function addRow(name, id, sec, found, secData, foundData) {
        $('.courseTable').append('<tr class="course active" data-sector="' + secData + '" data-foundational="' + foundData + '"><td>' + name + '</td><td>' + id + '</td><td>' + sec + '</td><td>' + found + '</td></tr>')
    };

    function mobileHeader() {
        $body.toggleClass('menuOpen');
        $header.toggleClass('hideUp');
        $body.toggleClass('overflowHidden');
        window.scrollTo(0, 0);
        if ($body.hasClass('menuOpen')) {
            $('.menu').find('li').addClass('fadeInRight animated');
        } else {
            $('.menu').find('li').removeClass('fadeInRight animated');
        }
    };

    function notify() {
        // this notifies how many came up after a search result
        var courseCount = $('.course.active').length;
        if (courseCount == 0) {
            notyf.alert('Looks like no classes match this search.')
        } else if (courseCount == 1) {
            notyf.confirm("Ideal – one class fit this search.");
        } else {
            notyf.confirm(courseCount + " classes fit this search.");
        }
    };

    // save a search
    function save(s, f, sN, fN) {
        saved.push({
            savedSector: s,
            savedSectorName: sN,
            savedFoundational: f,
            savedFoundationalName: fN
        }); // add the currently selected option to the array
        if (typeof (Storage) !== "undefined") { // push the string into local storage
            // Store
            localStorage.setItem("saved", JSON.stringify(saved));
            console.log(saved)
        } else {
            notyf.alert("Your browser unfortunately doesn't allow for saving.")
        }
    };

    function filterCourses(s, f) {
        if (s == '' && f == '') {
            $('.course').addClass('active');
        } else {
            $('.course').removeClass('active');
            $('[data-sector="' + s + '"][data-foundational="' + f + '"]').addClass('active');
        }
    };

    function showSaved() {
        $.each(saved, function (i, savedSearch) {
            var theSector = savedSearch.savedSector,
                theSectorName = savedSearch.savedSectorName,
                theFoundational = savedSearch.savedFoundational,
                theFoundationalName = savedSearch.savedFoundationalName;
            $('.savedSearches').append('<div class="savedSector">' + theSectorName + '</div><div class="savedFoundational">' + theFoundationalName + '</div>');
        });
    };

    // generate the course list from the "api"
    $.each(courseList, function (index, course) {
        var theName = course.courseName,
            theId = course.courseID,
            theSector = course.sector,
            theFoundational = course.foundational,
            theSectorData = course.dataSector,
            theFoundationalData = course.dataFoundational;
        addRow(theName, theId, theSector, theFoundational, theSectorData, theFoundationalData);
    });

    // make clicking the notifier show the course list
    $('.notyf').wrap('<a href="#courseViewer"></a>');

    $('.requirement').on('click', function () {
        var theRequirementType = $(this).closest('.requirementList').attr('data-requirement-list'),
            theRequirement = $(this).attr('data-requirement'),
            theName = $(this).text().trim();
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).siblings().removeClass('active');
            if (theRequirementType == 'sector') {
                sector = theRequirement;
                sectorName = theName
            } else if (theRequirementType == 'foundational') {
                foundational = theRequirement;
                foundationalName = theName;
            }
        };
        // check if the sector and foundationals are selected
        var foundationalSelected = $('[data-requirement-list="foundational"]').find('.active').length,
            sectorSelected = $('[data-requirement-list="sector"]').find('.active').length;
        if (foundationalSelected == 0) {
            foundational = '';
            foundationalName = ''
        };
        if (sectorSelected == 0) {
            sector = '';
            sectorName = ''
        };
        if (sectorSelected > 0 || foundationalSelected > 0) {
            $('.save').addClass('active');
        } else {
            $('.save').removeClass('active');
        }
        filterCourses(sector, foundational); // filter the courses
        notify();
    });

    // save a search
    $('.save').on('click', function () {
        save(sector, foundational, sectorName, foundationalName);
        showSaved();
    });

    if (window.location.hash) {
        var hash = window.location.hash.substring(1), //Puts hash in variable, and removes the # character
            splitHash = hash.replace('#', '').replace('.html', ''),
            $newPage = $("#" + splitHash);
        if ($newPage.length != 0) {
            $('page').removeClass('active');
            $newPage.addClass('active');
        };
    };

    // mobile menu icon
    $menuTrigger.click(function () {
        mobileHeader();
    });

});
