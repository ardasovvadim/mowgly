var apiPath = 'https://localhost:44363/';
var settings = null;

$.get(apiPath + 'settings', data => {
    settings = data;

    // phone-numbers
    settings.phoneNumbers.forEach(phoneNumber => {
        $('#phone-menu').append(`<a href="tel:${phoneNumber.number}">${phoneNumber.number}</a>`);
    })

    // user-name
    $('#user-name').text(settings.userName);

    // contacts
    let contactBlock = $('#contacts');
    let emailBlocks = `<div class="contact-block">`;
    settings.emailAddresses.forEach(emailAddress => {
        emailBlocks +=
            `<div class="contact-line">
                <div class="icon"><img src="src/img/icons/mail.svg"></div>
                <div class="name">${emailAddress.name}</div>
                <div class="value">${emailAddress.email}</div>
            </div>`;
    });
    emailBlocks += '</div>';
    contactBlock.append(emailBlocks);
    emailBlocks = `<div class="contact-block">`;
    settings.phoneNumbers.forEach(phoneNumber => {
        emailBlocks +=
            `<div class="contact-line">
                <div class="icon"><img src="src/img/icons/mail.svg"></div>
                <div class="name">${phoneNumber.name}</div>
                <div class="value">${phoneNumber.number}</div>
            </div>`;
    });
    emailBlocks += '</div>';
    contactBlock.append(emailBlocks);
});

