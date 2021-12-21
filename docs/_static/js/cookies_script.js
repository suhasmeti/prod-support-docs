
(function($) {

    $.fn.bsgdprcookies = function(options, event) {
        
        var $element = $(this);
        var cookiePreferences = ReadCookie('cookie_consent');

        // Set default settings
        var settings = $.extend({
            id: 'bs-gdpr-cookies-modal',
            title: 'Your cookie title here...',
            class: '',
            backdrop: 'static',
            message: 'Your cookie message...',
            delay: 500,
            expireDays: 365,
            moreLinkActive: true,
            moreLinkLabel: '',
            privacyLinkLabel: '',
            moreLinkNewTab: true,
            moreLink: '',
            privacyLink: '',
            acceptButtonLabel: 'Accept all',
            customizeButtonLabel: 'View and change cookie settings',
            advancedButtonLabel: 'Confirm Selection',
            advancedCookiesToSelect: [
                {
                    name: 'necessary',
                    title: 'Required cookies - always selected by default',
                    description: 'Required cookies description.',
                    isFixed: true,
                    moreLink: '',
                    moreLabel: ''
                    
                },
                {
                    name: 'marketing',
                    title: 'Optional cookies',
                    description: 'Optional cookies description.',
                    isFixed: false,
                    moreLink: '',
                    moreLabel: ''
                }
            ],
            OnUserAction: function() {}
        }, options);

        if( !cookiePreferences || event=='editcookie' ) {

            // Make sure that other instances are gone
            DisposeModal(settings.id);

            var modalBody = '';
            var modalButtons = '';
            var moreLink = '';
            var extralink = '';

            // Generate more link
            if(settings.moreLinkActive == true) {
                var target = '';
                if(settings.moreLinkNewTab == true) {
                    target = ' target="_blank"';
                    
                }
                moreLink = '<a href="' + settings.moreLink + '"'+target+' rel="noopener noreferrer" id="' + settings.id + '-more-link">' + settings.moreLinkLabel + '</a>';
                                
                extralink = '<a href="' + settings.privacyLink + '"'+target+' rel="noopener noreferrer" id="' + settings.id + '-privacy-link">' + settings.privacyLinkLabel + '</a>';
                    
                moreLink = '<h5 style="margin-top:0.5rem !important"><span>' + extralink + "&nbsp;and&nbsp;" + moreLink + '</span></h5>';
                    
                //moreLink = '<h5 style="margin-top:0.5rem !important"><span>' + moreLink + '</span></h5>';
            }

            modalButtons = '<button id="' + settings.id + '-advanced-btn" type="button" class="btn btn-dark mr-auto">' + settings.customizeButtonLabel + '</button><button id="' + settings.id + '-save-preference-btn" type="button" class="btn btn-info mr-auto" data-dismiss="modal" style="display:none;">' + settings.advancedButtonLabel + '</button><button id="' + settings.id + '-accept-all-btn" type="button" style="float:right;" class="btn btn-primary" data-dismiss="modal">' + settings.acceptButtonLabel + '</button>';

            // Generate list of available advanced settings
            var advancedCookiesToSelectList = '';

            var preferences = [];
            if(cookiePreferences!=null)
                preferences = JSON.parse(cookiePreferences);
            $.each(settings.advancedCookiesToSelect, function(index, field) {
                if (field.name !== '' && field.title !== '') {

                    var cookieDisabledText = '';
                    if(field.isFixed == true) {
                        cookieDisabledText = ' checked="checked"';
                    }       

                    var fieldID = settings.id + '-option-' + field.name;

                    advancedCookiesToSelectList += '<div><input type="checkbox" id="' + fieldID + '" name="bsgdpr[]" value="' + field.name + '" data-auto="on" ' + cookieDisabledText + '> <label name="bsgdpr[]"><b>' + field.title + '</b></label></div>';
                    advancedCookiesToSelectList += '<div>' + field.description + '</div>';
                    var moreDetailsLink = '';
                    if(field.moreLabel!=undefined && (field.moreLabel).length>0)
                    {
                        moreDetailsLink = '<a href="' + field.moreLink + '" target="_blank" rel="noopener noreferrer" id="' + fieldID + '-more-link">' + field.moreLabel + '</a>';
                        advancedCookiesToSelectList += '<div>' + moreDetailsLink + '</div>';
                    }        
                }
            });

            modalBody = '<div id="' + settings.id + '-message"><span>' + settings.message + '</span></div>' +'<div id="' + settings.id + '-moreLink">' + moreLink + '</div>'+ '<div style="display:none;" id="' + settings.id + '-advanced-types"><h5 style="margin-top: 0." class="modal-title" id="' + settings.id + '-advanced-types-title"><u>Manage cookie preferences:</u></h5>' + advancedCookiesToSelectList + '</div>';

            var modal = '<div class="modal fade ' + settings.class + '" id="' + settings.id + '" tabindex="-1" role="dialog" aria-labelledby="' + settings.id + '-title" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="' + settings.id + '-title"><b>' + settings.title + '</b></h5></div><div id="' + settings.id + '-body" class="modal-body">' + modalBody + '</div><div class="modal-footer">' + modalButtons + '</div></div></div></div>';

            // Show Modal
            setTimeout(function() {
                $($element).append(modal);

                $('#' + settings.id).modal({keyboard: false, backdrop: settings.backdrop});
                                
                $('input:checkbox[name="bsgdpr[]"]:checked').each(function(){
                    $(this).click(function(e){
                        $(this).prop('checked', true);
                    });
                });
                
            }, settings.delay);
            
            // Show advanced options
            $('body').on('click', '#' + settings.id + '-advanced-btn', function(){
                // Uncheck all checkboxes except for the checked ones
                $('input[name="bsgdpr[]"]:not(:checked)').attr('data-auto', 'off').prop('checked', false);
                
                $('label[name="bsgdpr[]"]').tooltip({offset: '0, 10'});

                // Show advanced checkboxes and hide settings button and display save preference button.
                $('#' + settings.id + '-advanced-types').slideDown('fast', function(){
                    $('#' + settings.id + '-advanced-btn').css('display', 'none');
                    $('#' + settings.id + '-save-preference-btn').css('display', 'inline-block');
                });
                
                $.each(preferences, function(index, field) {
                    $('#' + settings.id + '-option-' + field).prop('checked', true);
                });
            });
            
             // When user clicks Save preference and close modal
             $('body').on('click','#' + settings.id + '-save-preference-btn', function(){
                 DisposeModal(settings.id);
                 
                // Set user preferences cookie
                var preferences = [];
                $('input:checkbox[name="bsgdpr[]"]:checked').each(function(){
                    preferences.push($(this).val());
                });
                console.log("after selection :: "+preferences);
                CreateCookie('cookie_consent', JSON.stringify(preferences), settings.expireDays);
                settings.OnUserAction.call(this);
                
             });

            // When user clicks accept all cookies and close modal
            $('body').on('click','#' + settings.id + '-accept-all-btn', function(){

                DisposeModal(settings.id);

                // If 'data-auto' is set to ON, tick all checkboxes because the user has not chosen any option
                $('input[name="bsgdpr[]"][data-auto="on"]').prop('checked', true);

                // Set user preferences cookie
                var preferences = [];
                $('input[name="bsgdpr[]"]').each(function(){
                    preferences.push($(this).val());
                });
                
                CreateCookie('cookie_consent', JSON.stringify(preferences), settings.expireDays);
                
                // Run callback function
                settings.OnUserAction.call(this);
            });
            
        }
        else {
            DisposeModal(settings.id);
        }
    }

    /**
     * Returns user preferences saved in cookie
     */
    $.fn.bsgdprcookies.GetUserPreferences = function() {
        var preferences = ReadCookie('cookie_consent');
        if(preferences!=null)
            return JSON.parse(preferences);
        else
            return preferences;
    };

    /**
     * Check if user preference exists in cookie
     * 
     * @param {string} pref Preference to check
     */
    $.fn.bsgdprcookies.PreferenceExists = function(pref) {
        var preferences = $.fn.bsgdprcookies.GetUserPreferences();

        if (preferences === null || preferences.indexOf(pref) === -1) {
            return false;
        }

        return true;
    };


    /**
     * Hide then delete bs modal
     * 
     * @param {string} id Modal ID without '#'
     */
    function DisposeModal(id) {
        id = '#' + id;
        $(id).modal('hide');
        $(id).on('hidden.bs.modal', function (e) {
            $(this).modal('dispose');
            $(id).remove();
        });
    }

    /**
     * Sets Cookie
     * 
     * @param {string} name Name of the cookie which you want to create
     * @param {boolean} value Value for the created cookie
     * @param {number} days Expire days
     */
    function CreateCookie(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + ";domain="+window.location.hostname+";path=/";
    }
    

    /**
     * Gets Cookie called 'name'
     * 
     * @param {string} name Name of the cookie to read
     */
    function ReadCookie(name) {
        var nameEQ = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i=0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') 
                c = c.substring(1);
                
            if (c.indexOf(nameEQ) == 0) 
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    /**
     * Deletes Cookie called 'name;
     * 
     * @param {string} name Name of the cookie which you want to delete
     */
    function DeleteCookie(name) {
        CreateCookie(name, "", -1);
    }    

}(jQuery));