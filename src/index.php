<?php get_header(); ?>

<?php if (have_posts()) : ?>
	<div id="post-area">
		<?php while (have_posts()) : the_post(); ?>

			<!-- check if link else standard layout THIS NEEDS IMPROVING-->
			<?php if( get_post_format() == 'link'){ ?>
				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
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
			<?php } else { ?>
				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<?php if ( has_post_thumbnail() ) { ?>
						<div class="niss-image">
							<a class="tint-view" href="<?php the_permalink() ?>"><?php the_post_thumbnail( 'summary-image' );  ?></a>
							<div class="niss-category"><p><?php the_category(', ') ?></p></div>
						</div>
						<div class="clear"></div>

					<?php } ?>
						<div class="niss-copy"><h2><a href="<?php the_permalink() ?>"><?php the_title(); ?></a><?php //echo " - ".get_post_format();?></h2>
						<?php /*
						<p class="niss-date"><?php the_time(get_option('date_format')); ?>  </p>
						<?php the_excerpt(); ?>
						<p class="niss-link"><a href="<?php the_permalink() ?>">View more &rarr;</a></p>
						*/ ?>
						<?php the_excerpt(); ?>
						</div>
				</div>

			<?php } ?>
		<?php endwhile; ?>
	</div>
<?php else : ?>

<?php endif; ?>

<?php next_posts_link('<p class="view-older">View More Portfolio Submissions</p>') ?>

<?php get_footer(); ?>
