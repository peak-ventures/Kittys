window.kittys = {};

window.fbAsyncInit = function() {
    $.ajax({
        url: '/v1/facebook/config',
        method: 'GET'
    }).done(data => {
        FB.init({
            appId: data.appId,
            cookie: true,
            xfbml: true,
            version: data.apiVersion
        });
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(document).ready(function() {
    $('form').on('submit', function(event) {
        event.preventDefault();

        window.kittys.email = $(this).find('input').val();
        const error = $(this).find('.error');

        if (!window.kittys.email) {
            error.text('You require an email').css({ display: 'block' })
        } else {
            FB.login(function(response) {
                if (response.authResponse && response.status === 'connected') {
                    window.kittys.userId = response.authResponse.userID;
                    const shortLivedToken = response.authResponse.accessToken;
                    FB.api('/me', function(response) {
                        window.kittys.name = response.name;
                        $.ajax({
                            url: '/v1/facebook/exchangeForNonExpiryToken?token=' + shortLivedToken,
                            method: 'GET',
                        })
                        .done(token => {
                            window.kittys.token = token;
                            getAdAccounts(window.kittys.email, token, window.kittys.userId, error);
                        })
                    });
                } else {
                    const er = 'Please finish logging into Facebook to continue';
                    error.text(er).css({ display: 'block' });
                }
            }, { scope: 'pages_show_list,ads_read' });
        }
    });
});

function populateModal (data, title) {
    const modalTitle = $('.modal-title');
    const modal = $('.modal-body ul');

    modalTitle.text(title); // Set modal title

    modal.html(''); // Clear the modal

    function triggerFunction(item) {
        if (title === 'Ad Accounts') {
            saveAdAccount(item)
        } else {
            savePage(item)
        }
    }

    // Populate the modal
    data.map(function(item) {
        modal.append(`
            <li>
                <h5>${item.name}</h5>
                <button onclick="triggerFunction(item)">Select</button>
            </li>
        `)
    });

    $('#exampleModalCenter').modal({ show: true });
}

function getAdAccounts (email, token, userId, error) {
    $.ajax({
        url: '/v1/facebook/adaccounts?email=' + email + '&token=' + token,
        method: 'GET'
    }).done(data => {
        populateModal(data, 'Ad Accounts');

        error.text('').css({ display: 'none' })
    }).fail(err => {
        error.text('There was an unexpected error.  Please try again shortly').css({ display: 'block' })
    });
}

function saveAdAccount (item) {
    window.kittys.adAccount = item;
    const error = $(this).find('.error');
    const { email, token, userId } = window.kittys;
    getPages(email, token, userId, error);
}

function getPages (email, token, userId, error) {
    $.ajax({
        url: '/v1/facebook/pages?email=' + email + '&token=' + token,
        method: 'GET'
    }).done(data => {
        populateModal(data, 'Pages');

        error.text('').css({ display: 'none' });
    }).fail(err => {
        error.text('There was an unexpected error.  Please try again shortly').css({ display: 'block' })
    });
}

function savePage (item) {
    $.ajax({
        url: '/v1/zapier/save',
        method: 'POST',
        data: {
            ...window.kittys,
            page: item
        }
    }).done(data => {
        console.warn('Success WOWOWOWOWO');
    }).fail(error => {
        console.error('The final step in the Facebook process has sdhut down oH NOO')
    }).always(() => {
        $('#exampleModalCenter').modal({ show: false });
    })
}