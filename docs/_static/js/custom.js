//Hotjar Tracking Code as follows
(function(h,o,t,j,a,r){
	h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2184213,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');


$(document).ready(function(){
	try{
		
	var settings = {
		title: '<u>Use of Cookies</u>',
        	class: '',
        	backdrop: 'static',
		message: 'We use cookies and similar technologies (also from third parties) to collect your device and browser information for a better understanding on how you use our online offerings. This enables us to optimize and personalize your experience with Infineon and to provide you with additional services and information based on your individual profile. Details are available in our privacy policy where you can also change your preferences on cookies at any time.',
		moreLinkLabel: '<u>Imprint</u>',
		moreLink: 'https://www.infineon.com/cms/en/about-infineon/imprint/',
                privacyLinkLabel: 'Privacy Policy',
                privacyLink: 'https://www.infineon.com/cms/en/about-infineon/privacy-policy/',
		moreLinkActive: true,
		moreLinkNewTab: true,
		delay: 500,
		expireDays: 2 * 365,
		acceptButtonLabel: 'Accept all cookies',
        	advancedButtonLabel: 'Save preferences',
		advancedCookiesToSelect: [
			{
				name: 'necessary',
				title: 'Technically required cookies - always selected by default',
				description: 'By technically required cookies we mean cookies without those the technical provision of the online service cannot be ensured. These include e.g. cookies supporting essential services like a smooth reproduction of video or audio footage. So-called ‘functional cookies’ are also assigned belonging to this category. Functional cookies store information in order to provide you comfortable use of our online services.',
				isFixed: true,
				moreLink: 'https://www.infineon.com/cms/en/about-infineon/privacy-policy/#cookies-and-co',
				moreLabel: 'More details'
			},
			{
				name: 'marketing',
				title: 'Performance and marketing cookies',
				description: 'By performance and marketing cookies we mean cookies which are technically not required. We use performance and marketing cookies only if you have given us your prior consent. With such cookies, we collect information about how users interact with our website and which pages have been visited. This helps us to understand user activity on our website on an aggregated as well as on a personal level to provide you relevant content and services.',
				isFixed: false,
				moreLink: 'https://www.infineon.com/cms/en/about-infineon/privacy-policy/#cookies-and-co',
				moreLabel: 'More details'
			}
		],
		OnUserAction : function() {
			console.log('Yay! User accepted your cookies.');
			console.log('User preferences');
			if($.fn.bsgdprcookies.PreferenceExists("marketing"))
			{
				executeMarketingCookiesLogic();
				//console.log('google tag logic will execute here after save preferences');
			}
		}
	}
	
	$('body').bsgdprcookies(settings);
		
	if($.fn.bsgdprcookies.PreferenceExists("marketing"))
	{
		executeMarketingCookiesLogic();
		//console.log('google tag logic will execute here');
	}

	$('a[href*="cypresssemiconductorco"]').each(function(){ 
		var oldUrl = $(this).attr("href"); 
		var sampleText = $(this).text().replace("cypresssemiconductorco", "Infineon");
		console.log(sampleText);
		$(this).text(sampleText);
		var newUrl = oldUrl.replace("cypresssemiconductorco", "Infineon"); 
		$(this).attr("href", newUrl); 
	});
	
		
	
	$('.rst-content').find(".wy-breadcrumbs").find("a").each(function(){
		if($(this).text()=='Docs')
		{
			$(this).addClass("icon icon-home");
			$(this).text("");
		}
	});	
	
	//display hr line after heading which is replaced in xml with conf.pf code block
    	var isToolguid=false;
	$( ".section > h1" ).each(function(){
		//console.log('li text :: '+$(this).text());
		//console.log('is contains Tool Guide :: '+($(this).text().indexOf('Tool Guide')));

		if($(this).text().indexOf('Tool Guide')>-1 || $(this).text().indexOf('ModusToolbox')>-1 || $(this).text().indexOf('Secure Boot SDK User Guide')>-1 || $(this).text().indexOf('Secure Policy Configurator Guide')>-1 || $(this).text().indexOf('CapSense Configurator Guide')>-1 || $(this).text().indexOf('CapSense Tuner Guide')>-1 || ($(this).text().indexOf('PSoC 6 MCU CapSense')>-1 && $(this).text().indexOf('Design Guide')>-1) || ($(this).text().indexOf('Feature Guides')>-1 && ($(this).text().indexOf('Bluetooth Low Energy')>-1 || $(this).text().indexOf('Low-Power')>-1 )))
			isToolguid = true;
	});
	
	//console.log('isToolguid :: '+isToolguid);
	if(!isToolguid)
	{
		$(".section p").each(function(){
			var paraText = $(this).text().trim();
			var isOnlyHeading=true;
			$(this).children().each(function(){
				var tagName = $(this).prop("tagName");
				var pclassname = $(this).parent().attr('class');
				if(pclassname == undefined)
					pclassname = '';

				if(tagName.toLowerCase()=='em' && $(this).text().trim() == paraText && $(this).text().trim()=="Values:" && pclassname.indexOf('nocss')== -1)
				{
					if($(this).parents("li").length==0)
					{
						$(this).after('<hr/>');
					    $(this).css("display", "none");
					}
				}
				else if (tagName.toLowerCase()=='em' && $(this).text().trim() == paraText && pclassname.indexOf('nocss')== -1)
				{
					if($(this).parents("li").length==0)
					{
						$(this).after('<hr/>');
						$(this).addClass("headingclass");
					}
				}
				else if (tagName.toLowerCase()=='img' )
					$(this).before("<br>")
			});
			
		});
		
		if($( ".section li > p > em" ).next().is( "hr" ))
		{
			$( ".section li > p > em" ).next().remove();
			$( ".section li > p > em" ).removeClass( "headingclass" );
		}

		if( $( ".section td > p > em" ).next().is( "hr" ) )
		{
			$( ".section td > p > em" ).next().remove();
			$( ".section td > p > em" ).removeClass( "headingclass" );
		}

	}
	
	$('.highlight-default .highlight pre').each(function (e) {
        var spans = Array.prototype.slice.call(this.getElementsByTagName('span'));
        var startCmts = [], endCmts = [], startMethod = [];
        $.each(spans, function (index, value) {
            if ($(value).html() === '/*') {
                startCmts.push(index);
            }
            if ($(value).html() === '*/') {
                endCmts.push(index + 1);
            }
            if ($(value).html() === '(') {
                startMethod.push(index - 1);
            }
        });
        $.each(startCmts, function (index, value) {
            var sliced = spans.slice(startCmts[index], endCmts[index]);
            $.each(sliced, function (i, v) {
                v.removeAttribute("class");
                v.classList.add("comment");
            });
        });
        $.each(startMethod, function (index, value) {
            spans[value].removeAttribute("class");
            spans[value].classList.add("variableclass");
        });
    });
	}catch(err){console.log('err :: '+err);}
	
	//This is used to auto enable the toctree after 4 depth menu elements
	setTimeout(toctreeSettingFunction, 50);

});

function toctreeSettingFunction()
{
	$("a.current").parents("li[class^='toctree-']").each(function(){
		if(!($(this).hasClass("current" )))
		{
			$(this).addClass("current");
		}
	});
}


function executeMarketingCookiesLogic()
{

	//Google tag manager Tracking Code as follows
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', 'UA-186719284-1');

}

