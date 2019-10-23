<?php
/**
 * HSOhio Survey Plugin
 *
 * For survey api functions
 */

/*
Plugin Name: HSOhio Survey
Description: Creates API Routes for submitting and pulling survey data
Author: Todd Productions Inc.
Version: 1.0.0
Author URI: https://toddproductions.com/
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if (!function_exists('write_log')) {

    function write_log($log) {
        if (true === WP_DEBUG) {
            if (is_array($log) || is_object($log)) {
                error_log(print_r($log, true));
            } else {
                error_log($log);
            }
        }
    }

}

// Register Routes
if(!class_exists("SurveyAPIClass")) {
    class SurveyAPIClass {
        public static $version = 1;
        public static $namespace = "api_survey";
        public static $base = "survey";
        public static $posttype = "survey";
        
        // Initial Setup
        // Register Routes
        public function init_actions() {
            add_action( 'rest_api_init', array(__CLASS__, "register_routes"));
        }


        // Register Routes
        public static function register_routes() {
            $namespace = self::$namespace . "/v" . self::$version;

            // GET: surveys
            register_rest_route( $namespace, "/" . self::$base . "s", array(
                array(
                  'methods' => \WP_REST_Server::READABLE,
                  'callback' => array( __CLASS__, 'get_submissions' ),
                ),
              ) 
            );

            // POST: survey
            register_rest_route( $namespace, "/" . self::$base, array(
                array(
                  'methods' => \WP_REST_Server::CREATABLE,
                  'callback' => array( __CLASS__, 'create_submission' ),
                  'args' => self::get_submission_args(), 
                  'permission_callback' => array(__CLASS__, "bypass_creation_permissions"),
                ),
              ) 
            );

            // GET: report
            register_rest_route( $namespace, "/report", array(
                array(
                    'methods' => \WP_REST_Server::READABLE,
                    'callback' => array( __CLASS__, 'generate_stats' ),
                )
              ) 
            );
        }

        // Bypass Permissions
        public static function bypass_creation_permissions()
        {
            return true;
        }

        // Arguments
        public static function get_submission_args()
        {
            $argArr = [];

            // Set Required Fields
            $fields = self::get_acf_array();
            foreach($fields as $field) {
                $name = $field['field'];
                $required = array_key_exists("required", $field) && $field["required"] ? true : false;
                $default = self::has_default($field) ? $field["default"] : null;
                $argArr[$name] = [
                    "required" => $required,
                    "default" => $default
                ];
            }

            return $argArr;
        }

        public static function has_default($field)
        {
            return array_key_exists("default", $field) ? true : false;
        }

        // Get ACF For Post Type
        public static function get_acf_array()
        {
            return [
                ["field" => "email", "label" => "Email", "required" => true],
                ["field" => "age_group", "label" => "Age Group", "required" => true],
                ["field" => "resident", "label" => "Resident Of"],
                ["field" => "archery", "label" => "Archery", "default" => 0],
                ["field" => "badminton", "label" => "Badminton", "default" => 0],
                ["field" => "barre", "label" => "Barre", "default" => 0],
                ["field" => "bowling", "label" => "Bowling", "default" => 0],
                ["field" => "cross-fit", "label" => "Cross-Fit", "default" => 0],
                ["field" => "cycling_road", "label" => "Cycling Road", "default" => 0],
                ["field" => "cycling_stationary", "label" => "Cycling Stationary", "default" => 0],
                ["field" => "cycling_mountain", "label" => "Cycling Mountain", "default" => 0],
                ["field" => "dance", "label" => "Dance", "default" => 0],
                ["field" => "fishing", "label" => "Fishing", "default" => 0],
                ["field" => "free_weights", "label" => "Free Weights", "default" => 0],
                ["field" => "golfing", "label" => "Golfing", "default" => 0],
                ["field" => "hiking", "label" => "Hiking", "default" => 0],
                ["field" => "horseback_riding", "label" => "Horseback Riding", "default" => 0],
                ["field" => "hunting", "label" => "Hunting", "default" => 0],
                ["field" => "kickboxing", "label" => "Kickboxing", "default" => 0],
                ["field" => "elliptical", "label" => "Elliptical", "default" => 0],
                ["field" => "rowing_erg", "label" => "Rowing Erg", "default" => 0],
                ["field" => "stair_climbing", "label" => "Stair Climbing", "default" => 0],
                ["field" => "treadmill", "label" => "Treadmill", "default" => 0],
                ["field" => "weight-resistance", "label" => "Weight-Resistance", "default" => 0],
                ["field" => "martial_arts", "label" => "Martial Arts", "default" => 0],
                ["field" => "mountain_climbing", "label" => "Mountain Climbing", "default" => 0],
                ["field" => "pilates", "label" => "Pilates", "default" => 0],
                ["field" => "racquetball", "label" => "Racquetball", "default" => 0],
                ["field" => "roller_skating", "label" => "Roller Skating", "default" => 0],
                ["field" => "running", "label" => "Running", "default" => 0],
                ["field" => "skateboarding", "label" => "Skateboarding", "default" => 0],
                ["field" => "swimming", "label" => "Swimming", "default" => 0],
                ["field" => "tai_chi", "label" => "Tai Chi", "default" => 0],
                ["field" => "walking", "label" => "Walking", "default" => 0],
                ["field" => "yoga", "label" => "Yoga", "default" => 0],
                ["field" => "canoeing", "label" => "Canoeing", "default" => 0],
                ["field" => "diving", "label" => "Diving", "default" => 0],
                ["field" => "kayaking", "label" => "Kayaking", "default" => 0],
                ["field" => "paddle_boarding", "label" => "Paddle Boarding", "default" => 0],
                ["field" => "rowing", "label" => "Rowing", "default" => 0],
                ["field" => "sailing", "label" => "Sailing", "default" => 0],
                ["field" => "scuba_diving", "label" => "Scuba Diving", "default" => 0],
                ["field" => "surfing", "label" => "Surfing", "default" => 0],
                ["field" => "water_skiing", "label" => "Water Skiing", "default" => 0],
                ["field" => "cross-country_skiing", "label" => "Cross-Country Skiing", "default" => 0],
                ["field" => "skiing", "label" => "Skiing", "default" => 0],
                ["field" => "snowboarding", "label" => "Snowboarding", "default" => 0],
                ["field" => "other_activity", "label" => "Other Activity", "default" => 0],
                ["field" => "baseball", "label" => "Baseball", "default" => 0],
                ["field" => "basketball", "label" => "Basketball", "default" => 0],
                ["field" => "cheerleading", "label" => "Cheerleading", "default" => 0],
                ["field" => "crew", "label" => "Crew", "default" => 0],
                ["field" => "field_hockey", "label" => "Field Hockey", "default" => 0],
                ["field" => "gymnastics", "label" => "Gymnastics", "default" => 0],
                ["field" => "hockey", "label" => "Hockey", "default" => 0],
                ["field" => "lacrosse", "label" => "Lacrosse", "default" => 0],
                ["field" => "rugby", "label" => "Rugby", "default" => 0],
            ];
        }

        // Create Submission
        // @param $request
        public static function create_submission( $request )
        {
            $postsetup = array(
                'post_title' => " ",
                'post_content' => " ",
                "post_status" => "publish",
                "post_author" => 1,
                "post_type" => self::$posttype
            ); 
            
            $pid = wp_insert_post($postsetup);

            // Loop Thru ACF
            $fields = self::get_acf_array();
            foreach($fields as $field) {
                $name = $field["field"];
                if($request->get_param($name)) {
                    update_field($name, $request->get_param($name), $pid);
                }
                if(!$request->get_param($name) && self::has_default($field)) {
                    update_field($name, $field["default"], $pid);
                }
            }

            // Gather Post Details
            $post = get_post($pid);
            $acf = get_fields($pid);
            $post->acf = $acf;

            return $post;
        }

        // Get Submissions
        public static function get_submissions( $request )
        {
            $posts = get_posts( array(
                'post_type' => self::$posttype,
            ) );

            if ( empty( $posts ) ) {
                return [];
            }

            // Add Custom Post Types
            foreach($posts as $index => $post) {
                $acf = get_fields($post->ID);
                $posts[$index]->acf = $acf;
            }

            return $posts;
        }

        // Generate Stats For Report
        public static function generate_stats( $request )
        {
            $percentArr = self::get_percentage_array();

            $posts = get_posts( array(
                'post_type' => self::$posttype,
            ));

            // Loop Thru Posts
            $totalCount = 0;
            foreach($posts as $index => $post) {
                $acf = get_fields($post->ID);
                foreach($acf as $field => $value) {
                    if(array_key_exists($field, $percentArr)) {
                        $doAddition = (bool)$value == true;
                        $percentArr[$field]["count"] = $doAddition ? (int)$percentArr[$field]["count"] + 1 : $percentArr[$field]["count"]; 
                        $totalCount = $doAddition ? $totalCount + 1 : $totalCount;
                    }
                }
            }

            // Do Percentage Counts
            foreach($percentArr as $index => $value) {
                $number = (int)$value["count"] !== 0 ? ((int)$value["count"] * 100) / $totalCount : 0;
                $value["percentage"] = $number;
                $percentArr[$index] = $value;
            }

            return $percentArr;
        }

        // Get Percentage Array
        public static function get_percentage_array()
        {
            $fields = self::get_acf_array();
            $nonActivities = ["email", "age_group", "resident"];

            $returnArr = [];

            // Loop Thru Fields
            foreach($fields as $field) {
                $name = $field["field"];
                $returnArr[$name] = [
                    "percentage" => 0,
                    "count" => 0
                ];
            }

            foreach($nonActivities as $non) {
                unset($returnArr[$non]);
            }

            return $returnArr;
        }

    }
}

function survey() {
	global $survey;

    // initialize
	if( !isset($survey) ) {
        $survey = new SurveyAPIClass();
        $survey->init_actions();
    }
	
	// return
	return $survey;	
}

survey();