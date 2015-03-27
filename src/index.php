<?php
get_header();

if (have_posts()) :
	echo '<div id="post-area">';
		while (have_posts()) : the_post();

			if( get_post_format() == 'link'){

				?><div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<?php if ( has_post_thumbnail() ) { ?>
						<div class="niss-image">
							<a class="tint-ext" href="<?php echo get_the_content(); ?>" target="_blank" title="<?php the_title(); ?>">
								<?php the_post_thumbnail( 'summary-image' );  ?>
							</a>
						</div>
						<div class="clear"></div>
					<?php } ?>
						<div class="niss-copy">
						<h2>
							<a href="<?php echo get_the_content(); ?>" target="_blank" title="<?php the_title(); ?>">
								<?php the_title(); ?><div class="external-link"></div>
							</a>
						</h2>
						<?php the_excerpt(); ?>
						</div>
				</div>

			<!-- standard layout -->
			<?php } else {

				echo '<div id="post-'.get_the_ID().'"';
				post_class();
				echo '>';
					if ( has_post_thumbnail() ) {

						//$var = the_post_thumbnail( 'summary-image' );
						$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'summary-image' );

						echo '<p>'.$image[0].'</p>';
						echo '<p>'.$image[1].'</p>';
						echo '<p>'.$image[2].'</p>';

						echo '<div class="niss-image" style="background-image: url('.$image[0].'); height:'.$image[2].'px; width:'.$image[1].'px;">';
							echo '<a class="tint-view" href="'.get_the_permalink().'">';
								echo '<div class="niss-category"><p>';
									the_category(', ');
								echo '</p></div>';
							echo '</a>';
						echo '</div>';
						//echo '<div class="clear"></div>';
					}
						echo '<div class="niss-copy"><h2><a href="'.get_the_permalink().'">'.get_the_title().'</a>'.get_post_format().'</h2>';
						the_excerpt();
						echo '</div>';
				echo '</div>';

			}

		endwhile;
	echo '</div>';
else :

endif;

next_posts_link('<p class="view-older">View More Portfolio Submissions</p>');

get_footer();
