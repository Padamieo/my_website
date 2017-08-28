  <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div id="niss-image"class="niss-image">
    	<?php gallery_attachment(); ?>
    </div>
    <div class="clear"></div>
    <div class="niss-copy">
      <h1><?php the_title(); ?></h1>
      <?php the_content(); echo get_post_meta($post->ID, 'custom_text', true);  ?>
      <p><?php the_tags(); ?></p>
      <p>Categories: <?php the_category(', ') ?></p>
      <div class="clear"></div>
      <?php comments_template(); ?>
    </div>
  </div>
