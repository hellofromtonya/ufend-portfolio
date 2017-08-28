/*!
 * Detail Panel JavaScript handling.
 *
 * @since       1.0.0
 * @author      hellofromTonya
 * @link        https://hellofromtonya.com
 * @license     GPL-2.0+
 */
;(function ( $, window, document, undefined ) {
    'use strict';

    var $window,
        $featuredWork,
        $featuredWorkCards,
        $featuredWorkDetails,
        $closeButtons;

    /**
     * Initialize the featured work elements.
     *
     * @function
     */
    var init = function() {
        $window = $( window );
        $featuredWork = $('.featured-work');
        $featuredWorkCards = $('.featured-work-card');
        $featuredWorkDetails = $('.featured-work-details');
        $closeButtons = $('.details-close--button');

        initOverlay();
        initDetails();
        initRevealHandler();

        $(window)
            .resize(initOverlay)
            .resize(initDetails);
    };

    /**
     * @description Initialize the thumbnail overlay.
     *
     * @function
     */
    function initOverlay() {
        var $thumbnail = $('.featured-work img'),
            $overlay = $thumbnail.next(),
            $thumbnailHeight = $thumbnail.outerHeight();

        $overlay.css({
            lineHeight : $thumbnailHeight + 'px',
            height : $thumbnailHeight
        });

    }

    /**
     * @description Initialize the details panels.
     *
     * @function
     */
    function initDetails() {

        $featuredWorkDetails.each(function( index ){

            var $parent = $featuredWorkDetails.closest( '.featured-work-grid' ),
                $panel = $( this ),
                $block = $( $featuredWork[index] );

            var width = $parent.length > 0 ? $parent.width() : 0,
                pos   = $block.length > 0 ? $parent.position().left - $block.position().left : 0;

            $panel.css( {
                flexDirection: "column",
                left: pos + "px",
                width: width,
                maxWidth: width
            } )
        });
    }

    /**
     * @description Initialize the reveal handler.
     *
     * @function
     */
    function initRevealHandler() {
        $featuredWorkCards.on('click', function(){
            revealHandler( $(this), $featuredWorkCards.index(this) );
        });

        $closeButtons.on('click', function(){
            var index = $closeButtons.index(this);

            revealHandler( $( $featuredWorkCards[index]  ), index );
        });
    }

    //==========================
    // Profile Revealer
    //==========================

    /**
     * @description Run the reveal handler
     *
     * @function
     *
     * @param {Object} $card Card to be worked on
     * @param {Number} index Index of the card object
     */
    var revealHandler = function( $card, index ) {
        var $parent = $( $featuredWork[index] ),
            $panel = $( $featuredWorkDetails[index] ),
            panelState = $parent.attr( 'data-details' );

        if ( typeof $panel === 'undefined' || $panel === null ) {
            return;
        }

        closeAll( panelState, $parent, $panel );
    };

    /**
     * @description Close all the detail panels.
     *
     * @function
     *
     * @param {String} panelState State of the details panel
     * @param {Object} $parent Parent
     * @param {Object} $parent Details panel
     */
    function closeAll( panelState, $parent, $panel ) {
        $featuredWork.each(function(index){
            var $block = $(this);

            if ( $block.attr('data-details') != 'active' ) {
                return true;
            }

            $block.attr('data-details', 'inactive');
            var $panel = $( $featuredWorkDetails[ index ] );

            $panel.hide();

        }).promise().done(function(){
            doReveal( panelState, $parent, $panel );
        });
    }

    /**
     * @description Do the reveal. Toggles between 'active' and 'inactive'.
     *
     * @function
     *
     * @param {String} panelState State of the details panel
     * @param {Object} $parent Parent
     * @param {Object} $parent Details panel
     */
    function doReveal( panelState, $parent, $panel ) {

        var $grid = $parent.parent(),
            gridState = $grid.attr( 'data-details' );

        if ( panelState == 'active' ) {
            panelState = 'inactive';
            gridState = 'closed';
            $panel.slideUp( "fast" );

        } else {
            $panel.slideDown( "slow" );
            panelState = 'active';
            gridState = 'open';
        }

        $parent.attr('data-details', panelState);
        $grid.attr('data-details', gridState);
    }

    init();

}( jQuery, window, document ));