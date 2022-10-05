'use strict';

function hamburger(x) {
    x.classList.toggle("change");
    let navVisibility = document.getElementById('primary-nav').style.display;
    if (navVisibility === 'flex') {
        document.getElementById('primary-nav').style.display = 'none';
    } else {
        document.getElementById('primary-nav').style.display = 'flex';
    }
}

const buttons = document.getElementsByClassName('navBtn');
for (let button of buttons) {
    button.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            document.getElementById('hamburger').classList.toggle("change");
            document.getElementById('primary-nav').style.display = 'none';
        }
    })
}

function searchText() {
    const searchVal = document.getElementById('search').value;
    const searchResults = document.getElementById('searchResults');
    searchResults.style.display = "none";
    searchResults.innerHTML = "";
    let searchResultIndex = 1;

    document.querySelectorAll(`[id^=\"found\"]`).forEach(elem => {
        elem.removeAttribute("id");
    });

    if (searchVal.length > 2 && document.body.innerHTML.includes(searchVal)) {
        walk(document.body);

        function walk(node) {
            let child;

            switch (node.nodeType) {
                case 1:
                    for (child = node.firstChild; child; child = child.nextSibling) {
                        walk(child);
                    }
                    break;
                case 3:
                    if (node.nodeValue.indexOf(searchVal) !== -1 && node.parentNode.classList.value !== "navBtn") {
                        searchResults.style.display = "block";
                        node.parentNode.setAttribute('id', 'found' + searchResultIndex);
                        const entry = document.createElement('li');
                        const link = document.createElement("A");
                        link.setAttribute("href", '#found' + searchResultIndex)
                        entry.appendChild(link);
                        link.appendChild(document.createTextNode(node.nodeValue.substring(node.nodeValue.indexOf(searchVal) - 10, node.nodeValue.indexOf(searchVal) + searchVal.length + 10)));
                        searchResults.appendChild(entry);
                        searchResultIndex++;
                    }
                    break;
            }
        }
    }
}

function hideResults() {
    setTimeout(() => {
        document.getElementById('searchResults').style.display = "none";
    }, 300);
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
        document.getElementById('primary-nav').style.display = 'flex';
    } else {
        document.getElementById('primary-nav').style.display = 'none';
        document.getElementById('hamburger').classList.remove("change");
    }
});

(function (document, history, location) {
    const HISTORY_SUPPORT = !!(history && history.pushState);

    const anchorScrolls = {
        ANCHOR_REGEX: /^#[^ ]+$/,
        OFFSET_HEIGHT_PX: 50,

        /**
         * Establish events, and fix initial scroll position if a hash is provided.
         */
        init: function () {
            this.scrollToCurrent();
            window.addEventListener('hashchange', this.scrollToCurrent.bind(this));
            document.body.addEventListener('click', this.delegateAnchors.bind(this));
        },

        /**
         * Return the offset amount to deduct from the normal scroll position.
         * Modify as appropriate to allow for dynamic calculations
         */
        getFixedOffset: function () {
            return this.OFFSET_HEIGHT_PX;
        },

        /**
         * If the provided href is an anchor which resolves to an element on the
         * page, scroll to it.
         * @param  {String} href
         * @param  {Boolean} pushToHistory
         * @return {Boolean} - Was the href an anchor.
         */
        scrollIfAnchor: function (href, pushToHistory) {
            let match, rect, anchorOffset;

            if (!this.ANCHOR_REGEX.test(href)) {
                return false;
            }

            match = document.getElementById(href.slice(1));

            if (match) {
                rect = match.getBoundingClientRect();
                anchorOffset = window.scrollY + rect.top - this.getFixedOffset();
                window.scrollTo(window.scrollX, anchorOffset);

                // Add the state to history as-per normal anchor links
                if (HISTORY_SUPPORT && pushToHistory) {
                    history.pushState({}, document.title, location.pathname + href);
                }
            }

            return !!match;
        },

        /**
         * Attempt to scroll to the current location's hash.
         */
        scrollToCurrent: function () {
            this.scrollIfAnchor(window.location.hash, false);
        },

        /**
         * If the click event's target was an anchor, fix the scroll position.
         */
        delegateAnchors: function (e) {
            const elem = e.target;

            if (
                elem.nodeName === 'A' &&
                this.scrollIfAnchor(elem.getAttribute('href'), true)
            ) {
                e.preventDefault();
            }
        }
    };

    window.addEventListener(
        'DOMContentLoaded', anchorScrolls.init.bind(anchorScrolls)
    );
})(window.document, window.history, window.location);