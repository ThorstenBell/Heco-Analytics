'use strict';
const testimonials = [
    {
        name: "CEO – company developing novel point of care technology",
        testimonial: "We worked with HecoAnalytics to develop budget impact and cost-effectiveness models using their proprietary web-based tool.  This allowed considerable flexibility in terms of inputs and scenarios and allowed us to better understand the consequences of the performance of our product and the data we needed to justify its adoption.\n"
    },
    {
        name: "CEO – Medical AI digital company working in early cancer diagnosis",
        testimonial: "As a start-up with a computing background we were new to the concept of Health Economics and its relationship to our value proposition.  HecoAnalytics supported us on this journey and help to understand contextualise the requirements and provide an evidence generation plan, which was subsequently grant funded."
    },
    {
        name: "Project Manager – new digital pathway for neurodegenerative diseases",
        testimonial: "We worked with HecoAnalytics to develop an early economic model and subsequently a real time data collection from our app using HecoNect.  We hope to use the HecoNect functionality as a sales tool beyond our current use in clinical evaluation.  The company was responsive and understanding of our needs as well as flexible understanding that we were breaking new ground.\n"
    },
    {
        name: "Founder – digital health company focussed on mental health",
        testimonial: "HecoAnalytics  immediately understood our requirements and guided us through the NICE META Tool process as an introduction to help develop our evidence generation plan as we seek to move our solution from our trust to users nationally.\n"
    },
    {
        name: "CTO  – digital health company working in diabetes",
        testimonial: "HecoAnalytics has an understanding of all aspects relevant to medtech start-ups developing new products not just health economics but the impact of regulations, funding requirements and software development making the whole interaction more valuable than a traditional health economic provider.\n"
    },
]

// Navbar
function hamburger(x) {
    x.classList.toggle("change");
    let navVisibility = document.getElementById('primary-nav').style.display;
    if (navVisibility === 'flex') {
        document.getElementById('primary-nav').style.display = 'none';
    } else {
        document.getElementById('primary-nav').style.display = 'flex';
    }
}

const navButtons = document.getElementsByClassName('btn-nav');
for (let button of navButtons) {
    button.addEventListener('click', () => {
        if (window.innerWidth <= 1000) {
            document.getElementById('hamburger').classList.toggle("change");
            document.getElementById('primary-nav').style.display = 'none';
        }
    })
}

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".btn-nav");
window.onscroll = () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 141) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach((li) => {
        li.classList.remove("active");
        if (current && current.length > 0 && li.href && li.href.includes(current)) {
            li.classList.add("active");
        }
    });
};

window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
        document.getElementById('primary-nav').style.display = 'flex';
    } else {
        document.getElementById('primary-nav').style.display = 'none';
        document.getElementById('hamburger').classList.remove("change");
    }
});

// Search
const searchBtn = document.getElementById('btnSearch');
const searchContainer = document.getElementById('searchContainer');

searchBtn.addEventListener('click', () => {
    if (searchContainer.style.display === 'none') {
        searchContainer.style.display = 'flex'
    } else {
        searchContainer.style.display = 'none'
    }
    clearSpans();

})

const clearSpans = () => {
    let spanElements = document.getElementsByTagName("span");

    for (let i = spanElements.length - 1; i >= 0; i--) {
        let span = spanElements[i];
        span.outerHTML = span.innerHTML;
    }
}

function searchText() {
    const searchVal = document.getElementById('search').value;
    const searchResults = document.getElementById('searchResults');
    searchResults.style.display = "none";
    searchResults.innerHTML = "";
    let searchResultIndex = 1;

    clearSpans();

    if (searchVal.length > 1 && document.body.innerHTML.includes(searchVal)) {
        sections.forEach(section => {
            walk(section);
        })

        function walk(node) {
            let child;

            switch (node.nodeType) {
                case 1:
                    for (child = node.firstChild; child; child = child.nextSibling) {
                        walk(child);
                    }
                    break;
                case 3:
                    if (node.nodeValue.indexOf(searchVal) !== -1) {
                        searchResults.style.display = "block";
                        const index = node.nodeValue.indexOf(searchVal);

                        // Highlight found text
                        const foundElem = `<span class="found" id="found${searchResultIndex}">${searchVal}</span>`;
                        node.parentNode.innerHTML = node.nodeValue.slice(0, index) + foundElem + node.nodeValue.slice(index + searchVal.length);

                        // Found elements list
                        const newElem = document.getElementById(`found${searchResultIndex}`);
                        searchResults.innerHTML += `<li onclick="window.scrollTo({top: ${newElem.offsetTop - 120}, behavior: 'smooth'})"><a>${node.nodeValue.substring(node.nodeValue.indexOf(searchVal) - 10, node.nodeValue.indexOf(searchVal) + searchVal.length + 10)}</a></li>`;

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

// Scroll Offset
(function (document, history, location) {
    const HISTORY_SUPPORT = !!(history && history.pushState);

    const anchorScrolls = {
        ANCHOR_REGEX: /^#[^ ]+$/,
        OFFSET_HEIGHT_PX: 50,

        init: function () {
            this.scrollToCurrent();
            window.addEventListener('hashchange', this.scrollToCurrent.bind(this));
            document.body.addEventListener('click', this.delegateAnchors.bind(this));
        },

        getFixedOffset: function () {
            return this.OFFSET_HEIGHT_PX;
        },

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

        scrollToCurrent: function () {
            this.scrollIfAnchor(window.location.hash, false);
        },

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

// Login Dialog
const loginBtn = document.getElementById('btn-login');
const loginDialog = document.getElementById('login-dialog');
const loginForm = document.getElementById('login-form');
const email = loginDialog.querySelector('#email');
const password = loginDialog.querySelector('#password');
const confirmBtn = loginDialog.querySelector('#confirmBtn');
const cancelBtn = loginDialog.querySelector('#cancelBtn');
const errorMessages = loginDialog.querySelectorAll('.form-error');

function closeDialog() {
    loginDialog.style.display = 'none';
    clearErrors();
}

function clearErrors() {
    errorMessages.forEach(elem => {
        elem.innerHTML = "";
    });
}

loginBtn.addEventListener('click', () => {
    loginDialog.style.display = 'flex';
    loginForm.reset();
});

cancelBtn.addEventListener('click', closeDialog);

confirmBtn.addEventListener('click', () => {
    clearErrors();
    if (!loginForm.checkValidity()) {
        if (!email.checkValidity()) {
            if (email.value.length === 0) {
                document.getElementById('email-error').innerHTML = "Enter your email address";
            } else {
                document.getElementById('email-error').innerHTML = "Enter a valid email address";
            }
        }
        if (password.value.length === 0) {
            document.getElementById('password-error').innerHTML = "Enter your password";
        }
    } else {
        alert(`Hello ${email.value}, nice to see you!`);
        closeDialog();
    }

})

function formStyling(x) {
    x.addEventListener('change', () => {
        if (x.value.length > 0) {
            x.parentElement.className = 'filled';
        } else {
            x.parentElement.className = ''
        }
    });
}

formStyling(email);
formStyling(password);

// Header Image
const header = document.getElementById('banner');
let headerIndex = 1;

const headerImage = () => {
    header.style.backgroundImage = `url(images/banner/header${headerIndex}.jpg)`;
    if (headerIndex < 4) {
        headerIndex++;
    } else {
        headerIndex = 1;
    }
    setTimeout(headerImage, 5000);
}

headerImage()

// Testimonials
const testimonialName = document.getElementById('testimonial-name');
const testimonialText = document.getElementById('testimonial-text');
const previousTestimonial = document.getElementById('previous-testimonial');
const nextTestimonial = document.getElementById('next-testimonial');
const testimonialIndicators = document.getElementById('testimonial-indicators');
let testimonialIndex = 0;

testimonialName.innerText = testimonials[0].name;
testimonialText.innerText = testimonials[0].testimonial;
setTestimonialIndicators();

function setTestimonialIndicators() {
    testimonialIndicators.innerHTML = "";
    testimonials.forEach((testimonial, index) => {
        let buttonId = "indicator-" + index;
        if (index === testimonialIndex) {
            testimonialIndicators.insertAdjacentHTML('beforeend', `<button type='button' class="active" title="${buttonId}" id='${buttonId}'><i class='zmdi zmdi-circle'></i>\n</button>`);
        } else {
            testimonialIndicators.insertAdjacentHTML('beforeend', `<button type='button' title="${buttonId}" id='${buttonId}'><i class='zmdi zmdi-circle'></i>\n</button>`);
        }
        document.getElementById(buttonId).addEventListener('click', () => {
            testimonialIndex = index;
            testimonialName.innerText = testimonials[testimonialIndex].name;
            testimonialText.innerText = testimonials[testimonialIndex].testimonial;
            setTestimonialIndicators();
        })
    });
}

nextTestimonial.addEventListener('click', () => {
    if (testimonialIndex < (testimonials.length - 1)) {
        testimonialIndex++;
    } else {
        testimonialIndex = 0;
    }
    testimonialName.innerText = testimonials[testimonialIndex].name;
    testimonialText.innerText = testimonials[testimonialIndex].testimonial;
    setTestimonialIndicators();
});

previousTestimonial.addEventListener('click', () => {
    if (testimonialIndex > 0) {
        testimonialIndex--;
    } else {
        testimonialIndex = testimonials.length - 1;
    }
    testimonialName.innerText = testimonials[testimonialIndex].name;
    testimonialText.innerText = testimonials[testimonialIndex].testimonial;
    setTestimonialIndicators();
});

