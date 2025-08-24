import React, { useEffect } from 'react';

function Maintenance() {
  useEffect(() => {
    const head = document.getElementsByTagName('head')[0];
    head.innerHTML = `<title>The House - Site under construction</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	  <meta
      name="description"
      content="The house restaurant, Food, House and Entertainment"
    />
		<meta content="Webflow" name="generator">
    <meta property='og:title' content='The House NG' />
    <meta property='og:image' content='/favicon.png' />
    <meta property='og:description'
      content='The house restaurant, Food, House and Entertainment' />
    <meta property='og:url' content='https://thehouseng.com/' />
    <meta property="og:image" content="/favicon.png" />
    <meta property="og:site_name" content="The House NG" />
    <meta name="twitter:image:alt" content="The House NG" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/x-icon" href="light.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png">
    <link rel="canonical" href="https://thehouseng.com/" />
		<link rel="stylesheet" type="text/css" href="/fonts/font-awesome.min.css"/>
<!-- favicon -->	
	<link rel="icon" type="image/png" href="https://res.cloudinary.com/dgkltr/image/upload/v1647301798/THE%20HOUSE/coming-soon-util/images/favicon_czfvxp.png"/>
<!-- bootstrap -->
	<link rel="stylesheet" type="text/css" href="https://res.cloudinary.com/dgkltr/raw/upload/v1647301013/THE%20HOUSE/coming-soon-util/vendor/bootstrap/css/bootstrap.min.css_fkzgyb.map">
<!--font-awesome -->
	<link rel="stylesheet" type="text/css" href="https://res.cloudinary.com/dgkltr/raw/upload/v1647301021/THE%20HOUSE/coming-soon-util/fonts/font-awesome-4.7.0/css/font-awesome.min_ufckcc.css">
<!-- material-design-iconic-font -->
	<link rel="stylesheet" type="text/css" href="https://res.cloudinary.com/dgkltr/raw/upload/v1647301019/THE%20HOUSE/coming-soon-util/fonts/iconic/css/material-design-iconic-font.min_hy5han.css">
<!-- css animate -->
	<link rel="stylesheet" type="text/css" href="https://res.cloudinary.com/dgkltr/raw/upload/v1647301011/THE%20HOUSE/coming-soon-util/vendor/animate/animate_fofs0p.css">
<!-- css select -->
	<link rel="stylesheet" type="text/css" href="https://res.cloudinary.com/dgkltr/raw/upload/v1647301014/THE%20HOUSE/coming-soon-util/vendor/select2/select2.min_auhisf.css">
<!-- custome css -->
	<link rel="stylesheet" type="text/css" href="https://res.cloudinary.com/dgkltr/raw/upload/v1647301024/THE%20HOUSE/coming-soon-util/css/util_iuwpbo.css">
	<link rel="stylesheet" type="text/css" href="https://res.cloudinary.com/dgkltr/raw/upload/v1647301024/THE%20HOUSE/coming-soon-util/css/main_nbpcmk.css">

</head>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
</style>`;
  }, []);

  useEffect(() => {
    const root = document.querySelector('#root');
    if (!root) return;
    root.insertAdjacentHTML('afterend', `<!--jquery -->	
	<script src="https://res.cloudinary.com/dgkltr/raw/upload/v1647301013/THE%20HOUSE/coming-soon-util/vendor/jquery/jquery-3.2.1.min_nvl5lo.js"></script>
<!--bootstrap js-->
	<script src="https://res.cloudinary.com/dgkltr/raw/upload/v1647301013/THE%20HOUSE/coming-soon-util/vendor/bootstrap/js/popper_ph2l88.js"></script>
	<script src="https://res.cloudinary.com/dgkltr/raw/upload/v1647301012/THE%20HOUSE/coming-soon-util/vendor/bootstrap/js/bootstrap.min_rkdrsp.js"></script>
<!--= select js -->
	<script src="https://res.cloudinary.com/dgkltr/raw/upload/v1647301014/THE%20HOUSE/coming-soon-util/vendor/select2/select2.min_fk69ge.js"></script>
<!-- tilt jquery -->
	<script src="https://res.cloudinary.com/dgkltr/raw/upload/v1647301014/THE%20HOUSE/coming-soon-util/vendor/tilt/tilt.jquery.min_jwjjfw.js"></script>
	<script >
		$('.js-tilt').tilt({
			scale: 1.1
		})
	</script>
<!-- main js -->
	<script src="https://res.cloudinary.com/dgkltr/raw/upload/v1647301024/THE%20HOUSE/coming-soon-util/js/main_eo0dnf.js"></script>`);
  }, []);

  return (
    <div dangerouslySetInnerHTML={{
      __html: `<!-- background media -->
	<div class="simpleslide100">
		<div class="simpleslide100-item bg-img1" style="background-image: url('https://res.cloudinary.com/dgkltr/image/upload/v1639002445/THE%20HOUSE/Spaces/booth/booth-1_qzkeqm.jpg');"></div>
		<div class="simpleslide100-item bg-img1" style="background-image: url('https://res.cloudinary.com/dgkltr/image/upload/v1638467507/THE%20HOUSE/Restaurant/food%20menu/main/peppered-turkey-n-smokey-jollof_vfix32.jpg');"></div>
		<div class="simpleslide100-item bg-img1" style="background-image: url('https://res.cloudinary.com/dgkltr/image/upload/v1638467518/THE%20HOUSE/Restaurant/food%20menu/main/homemade-pizza_wewbzi.jpg');"></div>
		<div class="simpleslide100-item bg-img1" style="background-image: url('https://res.cloudinary.com/dgkltr/image/upload/v1639002469/THE%20HOUSE/Spaces/courtyard/courtyard-1_yv8am0.jpg');"></div>
	</div>

	<div class="flex-col-c-sb size1 overlay1 p-l-75 p-r-75 p-t-20 p-b-40 p-lr-15-sm">
		<!-- header nav -->
		<div class="w-full flex-w flex-sb-m">
			<div class="wrappic1 m-r-30 m-t-10 m-b-10">
				<a href="#"><img src="https://res.cloudinary.com/dgkltr/image/upload/v1638926557/THE%20HOUSE/logo/light_tvhvnj.png" alt="The House Logo" width="200"></a>
			</div>


			<div class="m-t-10 m-b-10">
				<a href="#" class="size2 s1-txt1 flex-c-m how-btn1 trans-04"  style="text-decoration: none;">
					Launching Soon!
				</a>
			</div>
		</div>

		<!-- center content -->
		<div class="flex-col-c-m p-l-15 p-r-15 p-t-80 p-b-90 content">
			<h3 class="l1-txt2 txt-center p-b-30 respon1" style="font-weight: 500;">
				Our site is getting a little tune up and some love.
			</h3>
			<p class="l1-txt1 txt-center" style="margin-bottom: 24px; line-height: 1.5;">
				We can't wait for you to see what's new!
			</p>
      <p style="color: #fff; font-family: space grotesk; font-size: 18px; text-align: center; line-height: 1.5">
        <span style="color: #DFC09A; letter-spacing: 0.125em; font-size: 16px;">FOR RESERVATIONS</span>
        <br>
        Contact  <b><a style="color: #fff; text-decoration: none;" href="mailto:bookings@thehouseng.com">bookings@thehouseng.com</b></a> or call <b><a style="color: #fff; text-decoration: none;" href="tel:+2349082919773">0908-291-9773</a></b>
      </p>
      <p class="m-t-20" style="color: #fff; font-family: space grotesk; font-size: 16px; text-align: center; line-height: 1.5">
        <span style="color: #DFC09A; letter-spacing: 0.125em; font-size: 16px;">FOR TAKEOUTS</span>
        <br>
        Contact <b><a style="color: #fff; text-decoration: none;" href="mailto:takeout@thehouseng.com">takeout@thehouseng.com</b></a> or call <b><a style="color: #fff; text-decoration: none;" href="tel:+23407067891693">0708-678-9169</a></b>
      </p>
		</div>
		
		<div class="flex-sb-m flex-w w-full">
			<!-- social links -->
			<div class="flex-w flex-c-m m-t-10 m-b-10" style="margin: auto;">
				<a href="https://www.instagram.com/thehouselagos" class="size3 flex-c-m how-social trans-04 m-r-16 m-l-4 m-b-8 m-t-4" style="text-decoration: none;">
					<i class="fa fa-instagram"></i>
				</a>

				<a href="https://www.twitter.com/thehouselagos" class="size3 flex-c-m how-social trans-04 m-r-16 m-l-4 m-b-8 m-t-4" style="text-decoration: none;">
					<i class="fa fa-twitter"></i>
				</a>

				<a href="https://www.linkedin.com/company/the-house-lagos" class="size3 flex-c-m how-social trans-04 m-r-16 m-l-4 m-b-8 m-t-4" style="text-decoration: none;">
					<i class="fa fa-linkedin"></i>
				</a>
			</div>

		</div>
	</div>`,
    }}
    />
  );
}

export default Maintenance;
