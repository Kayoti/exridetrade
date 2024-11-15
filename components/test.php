<!DOCTYPE html>
<html lang="en">
<head>
<?php
                    require_once 'const.php';
                    $offerID = isset( $_GET[ 'offerid' ] ) ? $_GET[ 'offerid' ] : '';
                    ?>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Here are three options that work best for your approval and budget! Select an option and set a time to go over the details of your new vehicle with your sales specialist!">
<meta name="keywords" content="">
<meta name="author" content="pixelstrap">
<?php
 echo '<link rel="icon" href='.FAVICON.'>'
?>
<link rel="shortcut icon" href="assets/images/favicon.webp" type="image/x-icon">
<?php
 echo '<title> '.TITLE.'- Vehicle Offers for You</title>'
 ?>
<!-- Google font-->
<link href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i&amp;display=swap"
        rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900&amp;display=swap"
        rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&amp;display=swap" rel="stylesheet">
<!-- Swiper css -->
<link rel="stylesheet" type="text/css" href="assets/css/vendors/swiper/swiper.min.css">
<link rel="stylesheet" type="text/css" href="assets/css/vendors/swiper/swiper-bundle.min.css">

<!-- Font awesome css -->
<link rel="stylesheet" type="text/css" href="assets/css/vendors/fontawesome/all.css">

<!-- Animate css -->
<link rel="stylesheet" type="text/css" href="assets/css/vendors/animate.css">

<!-- App css-->
<link rel="stylesheet" type="text/css" href="assets/css/style.css">
<style>
.swiper-nav-control {
    background-color: rgba(var(--primary), 1);
    color: #fff;
    border: none;
}
.swiper-nav-control::after {
    font-size: 20px !important;
    font-weight: 20px !important;
}
.swiper-container {
    width: 100%;
    max-width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    overflow: hidden;
}
.swiper-wrapper {
    display: flex;
    align-items: center;
}
/* Ensure slides take up proper width and height */
.swiper-slide {
    width: 30vw; /* Adjust width as needed */
    height: auto;
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
.swiper-slide {
    width: 90vw; /* Ensures slides fill more space on smaller screens */
    margin: 0 auto;
}
}

@media (min-width: 768px) {
.swiper-slide {
    width: 300px;
    margin: 10px;
}
}

@media (min-width: 1000px) {
.par {
    font-size: 0.8rem !important;
}
}
/* Align prev/next buttons */
/* .swiper-button-prev, .swiper-button-next {
    color: #fff;
    background-color: rgba(var(--primary), 1);
    padding: 10px;
    border-radius: 50%;
} */
</style>
</head>

<body class="layout-2">
<div class="loader-wrapper">
    <div class="loader-index"> <span></span></div>
    <svg>
        <defs></defs>
        <filter id="goo">
            <fegaussianblur in="SourceGraphic" stddeviation="11" result="blur"></fegaussianblur>
            <fecolormatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"> </fecolormatrix>
        </filter>
    </svg>
</div>
<div class="tap-top"><i class="fa-solid fa-angles-up"></i></div>
<main> 
    <!-- Header start -->
    <header class="header-absolute" style="background-color: #0F141E;">
        <nav class="navbar navbar-expand-lg">
            <div class="custom-container container"> 
            <?php 
            
           echo '<a class="navbar-brand m-0" href="https://carevo.ca/offers/?offerid=' . $offerID . '">
                 
                <img src='.REV_LOGO.' style="width: 150px; height: auto;" alt="logo"> 
                
                </a>'
                ?>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
                <!--
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav navigation">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    Home
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="index.html">sass</a></li>
                                    <li><a class="dropdown-item" href="index-2.html">app landing</a></li>
                                    <li><a class="dropdown-item" href="index-3.html">job</a></li>
                                    <li><a class="dropdown-item" href="index-4.html">nft</a></li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#about-us">About us</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#service">Services</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#features">Features</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#plan">Plan</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#review">Review</a>
                            </li>
                        </ul>
                    </div>
                    --> 
                <!-- <a href="#" class="btn btn-primary rounded-pill">Book Appointment</a> -->
             </div>
        </nav>
    </header>
       <!-- Home section start -->
    <section class="home-style-1 home-style-2">
        <div class="custom-container container pb-5">
            <div class="row align-items-center py-md-5">
                 <div class="col-lg-5">
                    <div class="home-content py-5 text-center text-md-start">
                        <h4 class="text-light">Congratulations <span class="text-primary"><?php echo $data[0]['firstname']." ".$data[0]['lastname'];?></span>,<br />Your Loan is Approved!</h4>
                        <h1 class="display-2 f-w-600 text-light">Let's Get You<br /><span class="text-primary">Driving</span></h1>
                        <p class="text-light mt-3 mb-5">Here are three options that work best for your approval and budget! Select an option and set a time to go over the details of your new vehicle with your sales specialist!</p>
                        <a href="#">
                        <!-- <button type="button" class="btn btn-primary btn-lg rounded-pill">Book Appointment</button> -->
                        </a> </div>
                </div>
                <div class="col-lg-7">
    <?php
    // Fetch the offer ID from the URL
    // API URL with token and offerID
    $apiUrl = BASE_URL . "?offerid={$offerID}&token=" . OFFER_TOKEN;

    // Fetch data from the API
    $response = file_get_contents($apiUrl);
    $data = json_decode($response, true);
        print_r($data);
    exit;

    // Initialize the Swiper structure
    echo '
        <div class="swiper-container coverflow-slider swiper-3d swiper-initialized swiper-horizontal swiper-watch-progress pt-0 mt-0">
            <div class="swiper-wrapper">';

    // Check if the data is available and is an array
    if ($data && is_array($data)) {
        // echo '<script>console.log( "' . JSON.parse($data) . '");</script>';
        echo '<script>localStorage.setItem("recordId", "' . $data[0]['recordid'] . '");</script>';
        foreach ($data as $index => $option) {
            // Set default or fetched image URL
            $imageUrl = isset($option['images']['1']) ? $option['images']['1'] . '/public' : './assets/images/placeholder.jpg';

            // Add a class for the first active item
            $activeClass = $index === 0 ? ' active' : '';

            // Generate the Swiper slide content
            $productJson = htmlspecialchars(json_encode($option), ENT_QUOTES, 'UTF-8');
            echo '
                <div class="swiper-slide card rounded-3 ' . $activeClass . '" role="group" aria-label="Vehicle Image">
                    <img class="img-fluid rounded-4 mt-3" src="' . $imageUrl . '" alt="Vehicle Image">
                    <div class="card-body text-center text-dark">
                        <p class="par fw-semibold text-uppercase text-dark fs-5">' . $option['product']['cf_1381'] . '</p>
                        <p class="par fw-semibold text-uppercase text-dark mb-2 fs-5">' . $option['product']['productname'] . ' ' . $option['product']['cf_1284'] . '</p>
                        <p class="par"><span class="fw-semibold text-dark">Mileage: </span>' . $option['product']['cf_1288'] . ' km</p>
                        <p class="par"><span class="fw-semibold text-dark">Key Features: </span>' . $option['product']['cf_1383'] . ', ' . $option['product']['cf_1335'] . '</p>
                        <p class="par fw-semibold mt-2"><span class="fw-semibold text-dark">Price: </span> <span class="text-secondary fw-semibold fs-6">$' . $option['price'] . '/'. $option['term'] .'</p>
                    </div>
                    <button class="btn btn-primary rounded-pill mb-3 view-offer-btn fw-semibold" data-product="' . $productJson . '">View Offer <i aria-hidden="true" class="far fa-arrow-alt-circle-right ps-3"></i></button>
                </div>';
        }
    } else {
        echo '<h3 class="fw-bold text-light text-center ml-5">No offers found.</h3>';
    }

    // Close the Swiper structure
    echo '
            </div>
            <!-- Left and Right Carousel Controls -->
            <button class="swiper-button-prev swiper-nav-control rounded-circle p-3" aria-label="Previous slide"></button>
            <button class="swiper-button-next swiper-nav-control rounded-circle p-3" aria-label="Next slide"></button>
        </div>';
    ?>
    
    <!-- Swiper Initialization Script -->
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            // Add event listeners for offer buttons
            document.querySelectorAll('.view-offer-btn').forEach(button => {
                button.addEventListener('click', function () {
                    // Get the product data from the data-product attribute
                    const productData = JSON.parse(this.getAttribute('data-product'));
                    
                    // Store the product data in localStorage
                    localStorage.setItem('selectedProduct', JSON.stringify(productData));
                    
                    localStorage.setItem('selectedProductId', productData['product']['productid']);

                    // Optionally store vehicle name or other details separately
                    const vehicleName = productData['product']['cf_1381'] + ' ' + productData['product']['productname'] + ' ' + productData['product']['cf_1284'];
                    localStorage.setItem('vehicleSel', vehicleName);
                    
                    // Redirect to Calendly page
                    window.location.href = 'offer-details.php';
                });
            });
        });
    </script>
</div>

            </div>
        </div>
    </section>
    <!-- Home section end --> 
    
    <!-- What's Next section start -->
    <section class="feature-style-2 px-3" id="features" style="padding: 0px;">
        <div class="container custom-container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-7">
                    <div class="card text-center p-4 shadow">
                        <div class="row justify-content-center">
                            <div class="col-12 mb-3">
                                <h1 class="display-4">What's <span class="text-primary">Next</span>?</h1>
                            </div>
                            <div class="col-md-8">
                                <p class="text-center text-md-start mb-2">Hi, I’m <span class="text-secondary"><?php echo $data[0]['first_name']?> </span>, your Sales Representative at Carevo Auto Solutions.</p>
                                <p class="text-center text-md-start mb-2">First off, congratulations on getting your loan approved!</p>
                                <p class="text-center text-md-start">This is the final step—now it’s time to pick the car you love and have it delivered directly to you!</p>
                            </div>
                            <div class="col-md-3 my-3 my-md-0">
                                <p class="text-center text-md-start"><img class="img-fluid rounded-4" src="https://carevo.ca/easypear-content/uploads/2023/11/John-Furey-President-1.jpg" alt="Vehicle Image"></p>
                                <p class="fs-6 mt-3 text-dark text-uppercase"><span class="text-secondary"><?php echo $data[0]['first_name']." ".$data[0]['last_name'];?></span><br />
                                <span class="text-secondary"><?php echo $data[0]['position']?></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- What's Next section end --> 
    
    
    <!-- why choose us section start -->
    <section class="choose-style-2 px-3" style="padding: 100px 0;">
        <div class="container custom-container">
            <div class="row justify-content-lg-between justify-content-center gy-4">
                <div class="col-lg-6 col-md-8">
                    <div class="choose-image"> <img class="img-fluid" src="assets/images/app-landing/choose-us/1.webp" alt="to do app"> <img class="img-fluid right-image" src="assets/images/app-landing/choose-us/2.webp" alt="chart card"> </div>
                </div>
                <div class="col-lg-6 col-xxl-5">
                    <div class="title-style-1">
                        <h2>I'm Here to Help</h2>
                    </div>
                    <div class="choose-content">
                        <ul>
                            <li>
                                <div class="choose-icon primary">
                                    <i aria-hidden="true" class="fas fa-thumbs-up text-secondary"></i>
                                </div>
                                <div class="choose-details">
                                    <p>With years of experience in auto financing, I’ve worked to get you the best options available. If you have any questions or need help with anything, I’m just a call or message away.</p>
                                </div>
                            </li>
                            <li>
                                <div class="choose-icon primary">
                                    <i aria-hidden="true" class="fas fa-phone text-secondary"></i>
                                </div>
                                <div class="choose-details">
                                    <h3>Phone</h3>
                                    <p><span class="text-secondary"><?php echo $data[0]['phone_mobile'];?></span></p>
                                </div>
                            </li>
                            <li>
                                <div class="choose-icon primary">
                                    <i aria-hidden="true" class="fas fa-envelope text-secondary"></i>
                                </div>
                                <div class="choose-details">
                                    <h3>Email</h3>
                                    <p><span class="text-secondary"><?php echo $data[0]['email1'];?></span></p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
    <section class="review-style-1 review-style-2 section-b-space review px-3">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="title-style-1 text-center">
                        <h2>Our Customers Love Us</h2>
                        <p>We Are Glad To Be A Reason For The Smiles We Put On Our Client's Faces.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="review-slider-wrapper">
                        <div class="swiper review-slider-2">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="review-box">
                                        <div class="review-user d-flex align-items-center">
                                            <div class="review-image"> <img src="assets/images/user/1.webp" alt="profile"> </div>
                                            <div>
                                                <h3>mary basque</h3>
                                                <span>2023-09-22</span> </div>
                                        </div>
                                        <div class="review-content">
                                            <p>Love this company very nice and understanding I will definitely recommend this company to my friends and family without a doubt.</p>
                                        </div>
                                        <ul class="ratings d-flex">
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="review-box">
                                        <div class="review-user d-flex align-items-center">
                                            <div class="review-image"> <img src="assets/images/user/1.webp" alt="profile"> </div>
                                            <div>
                                                <h3>Kelly Billard</h3>
                                                <span class="txt-success">2023-09-21</span> </div>
                                        </div>
                                        <div class="review-content">
                                            <p>Kevin P is the guy to see if your thinking of purchasing a new car. I was very Impressed with the service I received. Highly recommended.</p>
                                        </div>
                                        <ul class="ratings d-flex">
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div class="review-box">
                                        <div class="review-user d-flex align-items-center">
                                            <div class="review-image"> <img src="assets/images/user/1.webp" alt="profile"> </div>
                                            <div>
                                                <h3>Germaine Mckay</h3>
                                                <span class="txt-success">2023-09-14</span> </div>
                                        </div>
                                        <div class="review-content">
                                            <p>Getting a car through <?php echo TITLE?> was one of the easiest processes I've had. Super nice and helpful through out all the steps. Would recommend them to anyone.</p>
                                        </div>
                                        <ul class="ratings d-flex">
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                            <li><i class="fa-solid fa-star"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="bottom-nav">
                                <div class="slidePrev-btn"><i class="fa-solid fa-arrow-left"></i></div>
                                <div class="slideNext-btn"><i class="fa-solid fa-arrow-right"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Review section end -->
    

    <!-- Feature section start -->
    <section class="feature-style-2 px-3" id="features" style="padding: 100px 0 200px;">
        <div class="container custom-container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="title-style-1 text-center">
                        <h1 class="display-4"><span class="text-primary">Why
                            <?php
                        echo '</span>'.TITLE.'  Auto Solutions?</h1>'
                        ?>
                        <p>You don’t sign anything until you test drive the vehicle.</p>
                    </div>
                </div>
            </div>
            <div class="row gx-xxl-5 gy-4">
                <div class="col-xl-4 col-sm-6">
                    <div class="feature-wrapper text-center">
                        <div class="feature-icon-wrap">
                            <div class="feature-icon"> <i aria-hidden="true" class="fas fa-5x fa-shield text-secondary p-4 rounded-circle"></i> </div>
                        </div>
                        <div class="feature-content">
                            <h3 class="fw-bold">Protection with WALKAWAY Finance</h3>
                            <p>We’ve got you covered for life’s unexpected events. Enjoy 12 months of protection on us!</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-sm-6">
                    <div class="feature-wrapper text-center">
                        <div class="feature-icon-wrap">
                            <div class="feature-icon"> <i aria-hidden="true" class="fas fa-5x fa-thumbs-up p-4 text-warning rounded-circle"></i> </div>
                        </div>
                        <div class="feature-content">
                            <h3 class="fw-bold">Simple and Transparent</h3>
                            <p>No hidden fees, no surprises. Everything is clear and upfront from start to finish.</p>
                        </div>
                    </div>
                </div>
                <div class="col-xl-4 col-sm-6">
                    <div class="feature-wrapper text-center">
                        <div class="feature-icon-wrap">
                            <div class="feature-icon"> <i aria-hidden="true" class="fas fa-5x fa-headset text-primary p-4 rounded-circle"></i> </div>
                        </div>
                        <div class="feature-content">
                            <h3 class="fw-bold">Dedicated to You</h3>
                            <p>Our top priority is making sure you’re taken care of every step of the way.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- Feature section end --> 
            
    
    <!-- Footer section start -->
    <footer class="footer-style-1">
        <div class="main-footer">
            <div class="container">
                <div class="row gx-xl-5 gy-md-5 gy-4 gx-4">
                    <div class="col-xl-8">
                        <div class="footer-contact p-4"> 
                            <a href="index.html">  
                            <?php 
                            echo '<img src='.REV_LOGO.' style="width: 150px; height: auto;" alt="logo">'
                            ?>
                        </a>
                            <p>Award-winning, Maritimes dealership of new and pre-owned vehicles with several locations across the Maritimes. Best Deals & the best customer service guaranteed.</p>
                            <ul>
                                <li>
                                    <?php
                                    echo '<a href='.FB.' target="_blank"><i class="fa-brands fa-facebook-f"></i></a>'
                                    ?>
                                </li>
                                <li>
                                <?php
                                    echo '<a href='.LINK.' target="_blank"><i class="fa-brands fa-linkedin"></i></a>'
                                 ?>
                                 </li>
                                <li>
                                    <?php
                                    echo '<a href='.GRAM.' target="_blank"><i class="fa-brands fa-instagram"></i></a>'
                                    ?>
                                </li>
                                <li>
                                    <?php
                                    echo '<a href='.YT.' target="_blank"><i class="fa-brands fa-youtube"></i></a>'
                                    ?>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--
                    <div class="col-xl-2 col-md-4 col-6">
                        <div class="footer-content p-4">
                            <h3>Resources</h3>
                            <ul class="footer-links">
                                <li> <a href="<?php echo SEARCH?>"> <i class="fa-solid fa-chevron-right"></i> <span>Listings</span> </a> </li>
                                <li> <a href="<?php echo LOAN?>"> <i class="fa-solid fa-chevron-right"></i> <span>Loan Calculator</span> </a> </li>
                                <li> <a href="<?php echo BLOG?>"> <i class="fa-solid fa-chevron-right"></i> <span>News/Blog</span> </a> </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-2 col-md-4 col-6">
                        <div class="footer-content p-4">
                            <h3>About Us</h3>
                            <ul class="footer-links">
                                <li> <a href="<?php echo ABOUT?>"> <i class="fa-solid fa-chevron-right"></i> <span>About Us</span> </a> </li>
                                <li> <a href="<?php echo CAREER?>"> <i class="fa-solid fa-chevron-right"></i> <span>Careers</span> </a> </li>
                                <li> <a href="<?php echo CONTACT?>"> <i class="fa-solid fa-chevron-right"></i> <span>Contact</span> </a> </li>
                            </ul>
                        </div>
                    </div>
                    -->
                    <div class="col-xl-4 col-md-4">
                        <div class="footer-content p-4">
                            <h3>Contact Info</h3>
                            <ul class="footer-location">
                                <li>
                                    <div class="d-flex">
                                        <div class="footer-icon">
                                            <svg>
                                                <use href="assets/svg/icon_sprite.svg#map-pin"></use>
                                            </svg>
                                        </div>
                                        <div>
                                            <h6>Address :</h6>
                                            <p><?php echo ADDRESS?></p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="d-flex">
                                        <div class="footer-icon"> <i class="fa-solid fa-phone text-light"></i> </div>
                                        <div>
                                            <h6>phone :</h6>
                                            <p><?php echo PHONE?></p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="sub-footer">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <p>© Copyright 2024. All Rights Reserved by <?php echo TITLE?>.</p>
                    </div>
                    <div class="col-md-6">
                        <ul class="footer-links sub-footer-links">
                            <?php
                            echo  '<li> <a href='.TERM_USE.'>Terms</a> </li>
                            <li> <a href='.PRIVACY.'>Privacy</a> </li>'
                            ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <!-- Footer section end --> 
    
</main>

<!-- bootstrap js --> 
<script src="assets/js/vendors/bootstrap/dist/js/bootstrap.bundle.min.js"></script> 

<!-- swiper js --> 
<script src="assets/js/vendors/swiper/swiper-bundle.min.js"></script> 
<script src="assets/js/custom-swiper.js"></script> 

<!-- font awesome js --> 
<script src="assets/js/vendors/fontawesome/all.min.js"></script> 
<script src="assets/js/script.js"></script>
</body>
</html>