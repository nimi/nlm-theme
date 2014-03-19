<?php

// define how pages will display
$sections = array(
	'sort_order' => 'ASC',
	'sort_column' => 'menu_order', //post_title
	'hierarchical' => 1,
	'child_of' => 0,
	'parent' => 0,
	'depth' => 1,
	'exclude_tree' => '',
	'number' => '',
	'offset' => 0,
	'post_type' => 'page',
	'post_status' => 'publish'
);

$pages = get_pages($sections);
//start loop
foreach ($pages as $page_data) {
    $content = apply_filters('the_content', $page_data->post_content);
    $title = $page_data->post_title;
    $slug = $page_data->post_name;
?>

<section class='<?php echo "$slug" ?>'>
	<div class="inner-content" id='<?php echo "$slug" ?>'>
			<?php echo "$content" ?>
	</div>
</section>

<?php 
} 
?>

<!-- Portfolio Modal Content -->
<div id="portfolio-detail">

<?php

// define how pages will display
$portfolioItems = array(
	'sort_order' => 'ASC',
	'sort_column' => 'menu_order', //post_title
	'hierarchical' => 1,
	'child_of' => 416,
	'exclude_tree' => '',
	'number' => '',
	'offset' => 0,
	'post_type' => 'page',
	'post_status' => 'publish'
);

$pages = get_pages($portfolioItems);
//start loop
foreach ($pages as $page_data) {
    $content = apply_filters('the_content', $page_data->post_content);
    $title = $page_data->post_title;
    $slug = $page_data->post_name;
?>

<section class='<?php echo "$slug" ?>'>
	<div class="inner-content tab-pane" id='<?php echo "$slug" ?>'>
			<?php echo "$content" ?>
	</div>
</section>

<?php 
} 
?>

</div>

<!-- Resume Modal Content -->
<div id="resume-detail">

<?php

// define how pages will display
$aboutItems = array(
	'sort_order' => 'ASC',
	'sort_column' => 'menu_order', //post_title
	'hierarchical' => 1,
	'child_of' => 19,
	'exclude_tree' => '',
	'number' => '',
	'offset' => 0,
	'post_type' => 'page',
	'post_status' => 'publish'
);

$pages = get_pages($aboutItems);
//start loop
foreach ($pages as $page_data) {
    $content = apply_filters('the_content', $page_data->post_content);
    $title = $page_data->post_title;
    $slug = $page_data->post_name;
?>

<section class='<?php echo "$slug" ?>'>
	<div class="inner-content" id='<?php echo "$slug" ?>-modal'>
			<?php echo "$content" ?>
	</div>
</section>

<?php 
} 
?>

</div>
