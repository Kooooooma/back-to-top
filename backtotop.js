;(function($) {
    function getBtn()
    {
        var html = '<div class="backtotop-btn-by-koma backtotop-btn-mouseout">Top</div>';
        return $(html);
    }

    function getContainer()
    {
        var oContainer = $('div[role="main"] .container');
        if ( $(oContainer).length > 0 ) return oContainer;

        oContainer = $('div[role="main"] .container-lg');
        if ( $(oContainer).length > 0 ) return oContainer;

        return null;
    }

    function setBtnPosition(_oBtn)
    {
        var iGap  = 15;
        var iLeft = 0;
        var oContainer = getContainer();
        var iWindowHeight = $(window).height();

        if ( oContainer != null ) {
            var iWindowWidth = $(window).width();
            var iContainerWidth = $(oContainer).width();

            if ( iWindowWidth > iContainerWidth ) {
                iLeft = (iWindowWidth-iContainerWidth)/2+iContainerWidth;
            } else {
                iLeft = iContainerWidth;
            }

            if ( iLeft > 0 ) {
                $(_oBtn).css({'left': iLeft+iGap});
            } else {
                $(_oBtn).css({'right': iGap});
            }   
        } else {
            $(_oBtn).css({'right': iGap});
        }

        $(_oBtn).css({'top': iWindowHeight/2});
    }

    var oBtn = getBtn();
    $(oBtn).unbind('mouseover').bind('mouseover', function() {
        $(this).removeClass('backtotop-btn-mouseout');
        $(this).addClass('backtotop-btn-mouseover');
    });

    $(oBtn).unbind('mouseout').bind('mouseout', function() {
        $(this).removeClass('backtotop-btn-mouseover');
        $(this).addClass('backtotop-btn-mouseout');
    });

    $(oBtn).unbind('click').bind('click', function() {
        $('html,body').animate({
            scrollTop: 0            
        }, 'normal');
    });

    $(document.body).append(oBtn);
    setBtnPosition(oBtn);

    $(window).resize(function() {
        setBtnPosition(oBtn);
    });

    $(window).scroll(function() {
        var iTop = $(this).scrollTop();

        if ( iTop > 100 ) {
            if ( $(oBtn).css('display') == 'none' ) $(oBtn).fadeIn();
        } else {
            $(oBtn).fadeOut();
        }
    });
})(jQuery);