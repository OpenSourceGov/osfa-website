<!-- Start the Loop. -->
<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
              <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <h1 class="post_title"><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>
                <ul class="post_meta">
                  <li class="posted_by"><span><?php _e('Posted by','squirrel'); ?></span>&nbsp;<?php the_author_posts_link(); ?></li>
                  <li class="post_date"><span><?php _e('on','squirrel'); ?></span>&nbsp;<?php echo get_the_time('M, d, Y') ?></li>
                  <li class="post_category"><span><?php _e('in','squirrel'); ?></span>&nbsp;<?php the_category(', '); ?></li>
                  <li class="postc_comment"><span><?php _e('Blog','squirrel'); ?></span>&nbsp;<?php comments_popup_link('No Comments.', '1 Comment.', '% Comments.'); ?></li>
                </ul>
                <div class="post_content"> <?php if ((function_exists('has_post_thumbnail')) && (has_post_thumbnail())) { ?>
                        <a href="<?php the_permalink(); ?>">
                            <?php the_post_thumbnail('post_thumbnail', array('class' => 'postimg')); ?>
                        </a>
                    <?php } else { ?>
                        <a href="<?php the_permalink() ?>"><?php echo squirrel_main_image(250, 170); ?></a>
                        <?php
                    }
                    ?>	
                  <?php the_excerpt(); ?>
				  <div class="clear"></div>
                    <?php if (has_tag()) { ?>
                        <div class="tag">
                            <?php the_tags('Post Tagged with ', ', ', ''); ?>
                        </div>
                    <?php } ?>
                  <a class="read_more" href="<?php the_permalink() ?>">Read More</a> </div>
              </div>
              <!--End post-->
			  <?php endwhile;
else: ?>
   <div class="post">
        <p>
            <?php _e('Sorry, no posts matched your criteria.', 'squirrel'); ?>
        </p>
    </div>
<?php endif; ?>
<!--End Loop-->