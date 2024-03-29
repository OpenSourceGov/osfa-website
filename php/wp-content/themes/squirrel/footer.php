<div class="clear"></div>
<!--End Index-->
<!--Start Footer-->
<div class="footer">
    <?php
    /* A sidebar in the footer? Yep. You can can customize
     * your footer with four columns of widgets.
     */
    get_sidebar('footer');
    ?>
</div>
<div class="footer-strip"></div>
<!--Start footer bottom inner-->
<div class="bottom-footer">
    <div class="grid_12 alpha">
        <div class="footer_bottom_inner"> 
            <?php if (squirrel_get_option('squirrel_cright') != '') { ?>
                <span class="copyright"><?php echo squirrel_get_option('squirrel_cright'); ?></span> 
            <?php } else { ?>
                <span class="copyright"><a href="<?php echo esc_url( __( 'http://www.inkthemes.com/', 'squirrel' ) ); ?>"><?php _e( 'Squirrel Designed &amp; Coded by InkThemes.com', 'squirrel' ); ?></a></span>
            <?php } ?>
        </div>
    </div>
    <div class="grid_12 omega">        
    </div>
</div>
<!--End Footer bottom inner-->
<!--End Footer bottom-->
</div>
</div>
</div>
<?php wp_footer(); ?>
</body>
</html>
