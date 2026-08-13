<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'id' => 1, // original ID 0 mapped to DB ID 1 or kept as 1
                'reraid' => 'P52100000555',
                'type' => 'completed',
                'title' => 'Dhruva',
                'image' => '/images/Completed Projects/KVDL-Dhruv Project/1.webp',
                'location' => 'Punawale, Pune',
                'pincode' => 'NA',
                'rating' => '4.2',
                'amneties' => [
                    'Power Backup',
                    'Lift',
                    'Security',
                    'Intercom Facility',
                    'Rain Water Harvesting',
                    'Fire Fighting Equipment'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '120 Total'],
                    ['label' => 'Project Size', 'value' => '2 acre'],
                    ['label' => 'Launch Date', 'value' => 'Aug 2017'],
                    ['label' => 'Total Towers', 'value' => '3 Towers']
                ],
                'images' => [
                    '/images/Completed Projects/KVDL-Dhruv Project/1.webp',
                    '/images/Completed Projects/KVDL-Dhruv Project/2.webp',
                    '/images/Completed Projects/KVDL-Dhruv Project/3.webp',
                    '/images/Completed Projects/KVDL-Dhruv Project/4.webp',
                    '/images/Completed Projects/KVDL-Dhruv Project/5.webp',
                    '/images/Completed Projects/KVDL-Dhruv Project/6.webp',
                    '/images/Completed Projects/KVDL-Dhruv Project/7.webp',
                    '/images/Completed Projects/KVDL-Dhruv Project/8.webp'
                ],
                'description' => "At Dhruva, we have tried to blend location and comfort at perfection as the location is just like the name suggests, truly iconic! Right on the western Mumbai-Banglore Highway giving all opportunity flourish any business and connectivity to every work place around making it deal for residence So come, be a part fo 'Dhruva' and enjoy the iconic position."
            ],
            [
                'id' => 2,
                'reraid' => 'P52100002460',
                'type' => 'completed',
                'title' => 'Whitefield',
                'image' => '/images/Completed Projects/KVDL-WhiteField/1.webp',
                'location' => 'Pashan - Sus Road, Pune',
                'pincode' => '411021',
                'rating' => '3.9',
                'amneties' => [
                    'Club House',
                    'Jogging Track',
                    'Cycling Track',
                    'Parking',
                    'Indoor Games Room',
                    'Meditation Area',
                    'Internet/Wifi Connectivity',
                    'Waste Disposal',
                    'Multipurpose Courts',
                    'Indoor Squash & Badminton Courts',
                    'Solar Energy',
                    'Early Learning Centre',
                    'Library And Business Centre',
                    'Flower Gardens',
                    'Maintenance Staff',
                    'Water Storage',
                    'Power Backup',
                    'Lift',
                    'Security',
                    'Gymnasium',
                    'Intercom Facility',
                    'Rain Water Harvesting',
                    'Fire Fighting Equipment'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '190 Total'],
                    ['label' => 'Project Size', 'value' => '2 acre'],
                    ['label' => 'Launch Date', 'value' => 'Aug 2017'],
                    ['label' => 'Total Towers', 'value' => '3 Towers']
                ],
                'images' => [
                    '/images/Completed Projects/KVDL-WhiteField/1.webp',
                    '/images/Completed Projects/KVDL-WhiteField/2.webp',
                    '/images/Completed Projects/KVDL-WhiteField/3.webp',
                    '/images/Completed Projects/KVDL-WhiteField/4.webp',
                    '/images/Completed Projects/KVDL-WhiteField/5.webp',
                    '/images/Completed Projects/KVDL-WhiteField/6.webp',
                    '/images/Completed Projects/KVDL-WhiteField/7.webp',
                    '/images/Completed Projects/KVDL-WhiteField/8.webp',
                    '/images/Completed Projects/KVDL-WhiteField/9.webp',
                    '/images/Completed Projects/KVDL-WhiteField/10.webp',
                    '/images/Completed Projects/KVDL-WhiteField/11.webp',
                    '/images/Completed Projects/KVDL-WhiteField/12.webp',
                    '/images/Completed Projects/KVDL-WhiteField/13.webp',
                    '/images/Completed Projects/KVDL-WhiteField/14.webp',
                    '/images/Completed Projects/KVDL-WhiteField/15.webp',
                    '/images/Completed Projects/KVDL-WhiteField/3718 Salehittal Sus_BIRDS-R.jpg.webp',
                    '/images/Completed Projects/KVDL-WhiteField/Club House.jpg.webp'
                ],
                'description' => "Whitefield priced at the range Rs 57.0 Lac onwards, these living spaces are designed keeping in mind all the basic as well as advanced facilities as well as necessities."
            ],
            [
                'id' => 3,
                'reraid' => 'P52100001856',
                'type' => 'completed',
                'title' => 'The Prestige Avenue',
                'image' => '/images/Completed Projects/KVDL-The Prestige Avenue/1.webp',
                'location' => 'Baner-Pashan Link Road, Pune',
                'pincode' => '411021',
                'rating' => '4',
                'amneties' => [
                    'Parking',
                    'Vaastu Complaint',
                    'Premium branded fittings',
                    'DTH Television Facility',
                    'Earth quake resistant',
                    'Maintenance Staff',
                    'Intercom Facility',
                    'Water Storage',
                    'Power Backup',
                    'Service/Goods Lift',
                    'Security',
                    'Rain Water Harvesting',
                    'Fire Fighting Equipment'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '82 Total'],
                    ['label' => 'Project Size', 'value' => '1 acre'],
                    ['label' => 'Launch Date', 'value' => 'July 2017'],
                    ['label' => 'Total Towers', 'value' => '1 Tower']
                ],
                'images' => [
                    '/images/Completed Projects/KVDL-The Prestige Avenue/1.webp',
                    '/images/Completed Projects/KVDL-The Prestige Avenue/2.webp',
                    '/images/Completed Projects/KVDL-The Prestige Avenue/3.webp',
                    '/images/Completed Projects/KVDL-The Prestige Avenue/4.webp',
                    '/images/Completed Projects/KVDL-The Prestige Avenue/5.webp',
                    '/images/Completed Projects/KVDL-The Prestige Avenue/6.webp',
                    '/images/Completed Projects/KVDL-The Prestige Avenue/7.webp',
                    '/images/Completed Projects/KVDL-The Prestige Avenue/8.webp',
                    '/images/Completed Projects/KVDL-The Prestige Avenue/9.webp'
                ],
                'description' => "The Prestige Avenue is a beautiful living space, which is beautifully completed by Kedar Vanjape Developers Pvt Ltd in Pashan Link Road, Pune. The project is designed beautifully where a huge number of buyers are looking to buy their house. The Prestige Avenue is nominally priced and conveniently located therefore you can choose your living space in this project and enjoy a lavish lifestyle with comfortable facilities. The also the beautiful surroundings."
            ],
            [
                'id' => 4,
                'reraid' => 'NA',
                'type' => 'completed',
                'title' => 'Anantshilp',
                'image' => '/images/Completed Projects/KVDL-Anantshilp/4.webp',
                'location' => 'Bavdhan, Pune',
                'pincode' => '411021',
                'rating' => '3.9',
                'amneties' => [
                    'Parking',
                    'Internet/Wifi Connectivity',
                    'Library And Business Centre',
                    'Park',
                    'Swimming Pool',
                    'Club House',
                    'Indoor Games Room',
                    'Gymnasium',
                    'Intercom Facility',
                    'Power Backup',
                    'Flower Garden',
                    'Lift',
                    'Security',
                    'Rain Water Harvesting',
                    'Outdoor Tennis Courts',
                    'Indoor Squash & Badminton Courts'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '135 Total'],
                    ['label' => 'Project Size', 'value' => '3 acre'],
                    ['label' => 'Launch Date', 'value' => 'March 2011'],
                    ['label' => 'Total Towers', 'value' => '3 Tower']
                ],
                'images' => [
                    '/images/Completed Projects/KVDL-Anantshilp/1.webp',
                    '/images/Completed Projects/KVDL-Anantshilp/2.webp',
                    '/images/Completed Projects/KVDL-Anantshilp/3.webp',
                    '/images/Completed Projects/KVDL-Anantshilp/4.webp',
                    '/images/Completed Projects/KVDL-Anantshilp/5.webp',
                    '/images/Completed Projects/KVDL-Anantshilp/6.webp',
                    '/images/Completed Projects/KVDL-Anantshilp/7.webp'
                ],
                'description' => "Anant Shilp Apartment is strategically located at Bavdhan with a seamless connectivity to the prominent areas of Pune. The property spreads over an area of 3 Acre."
            ],
            [
                'id' => 5,
                'reraid' => 'NA',
                'type' => 'completed',
                'title' => 'Anantvaibhav',
                'image' => '/images/Completed Projects/KVDL-Anantvaibhav/1.webp',
                'location' => 'Bavdhan, Pune',
                'pincode' => '411021',
                'rating' => '3.5',
                'amneties' => [
                    'Club House',
                    'Swimming Pool',
                    'Parking',
                    'Indoor Games Room',
                    'DTH Television Facility',
                    'Indoor Squash & Badminton Courts',
                    'Park',
                    'Water Storage',
                    'Power Backup',
                    'Security',
                    'Gymnasium',
                    'Flower Garden'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '50 Total'],
                    ['label' => 'Project Size', 'value' => '1 acre'],
                    ['label' => 'Launch Date', 'value' => 'May 2012'],
                    ['label' => 'Total Towers', 'value' => '1 Tower']
                ],
                'images' => [
                    '/images/Completed Projects/KVDL-Anantvaibhav/1.webp',
                    '/images/Completed Projects/KVDL-Anantvaibhav/2.webp',
                    '/images/Completed Projects/KVDL-Anantvaibhav/3.webp',
                    '/images/Completed Projects/KVDL-Anantvaibhav/4.webp',
                    '/images/Completed Projects/KVDL-Anantvaibhav/5.webp',
                    '/images/Completed Projects/KVDL-Anantvaibhav/6.webp',
                    '/images/Completed Projects/KVDL-Anantvaibhav/7.webp'
                ],
                'description' => "Anant Vaibhav is strategically located in Bavdhan in the city of Pune and is a well-planned project. The project is spread over a wide area of 1 Acre."
            ],
            [
                'id' => 6,
                'reraid' => 'P52100015968',
                'type' => 'completed',
                'title' => 'Anantsrishti',
                'image' => '/images/Completed Projects/KVDL-Anantsrishti/6.webp',
                'location' => 'Kanhe, Pune',
                'pincode' => '412106',
                'rating' => '3.9',
                'amneties' => [
                    'Club House',
                    'Swimming Pool',
                    'Jogging Track',
                    'Cycling Track',
                    'Reserved Parking',
                    'Event Space & Amphitheatre',
                    'RO Water System',
                    'Power Backup',
                    'Lift',
                    'Security',
                    'Gymnasium',
                    'Intercom Facility',
                    'Rain Water Harvesting'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '890 Total'],
                    ['label' => 'Project Size', 'value' => '15 acre'],
                    ['label' => 'Launch Date', 'value' => 'Apr 2011'],
                    ['label' => 'Total Towers', 'value' => '8 Towers']
                ],
                'images' => [
                    '/images/Completed Projects/KVDL-Anantsrishti/1.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/2.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/3.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/4.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/5.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/6.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/7.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/8.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/9.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/10.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/11.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/12.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/13.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/14.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/15.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/16.webp',
                    '/images/Completed Projects/KVDL-Anantsrishti/17.webp'
                ],
                'description' => "Even beyond the charm of green and good living, amid rustic hillsides and the splashing waters of river Indrayani, lies Anant Srishti, a 35-acre township in Kanhe Phata that is not just a lifetime investment but a lifetime of peace, happiness and contentment. Its proximity to the Kanhe Phata railway station and national highway cuts your traveling time to half."
            ],
            [
                'id' => 7,
                'reraid' => 'P52700006321',
                'type' => 'completed',
                'title' => 'Nisargsrishti',
                'image' => '/images/Completed Projects/KVDL-Nisarg-srushti/1.jpg',
                'location' => 'Shirwal, Pune',
                'pincode' => '412801',
                'rating' => '4.2',
                'amneties' => [
                    'Power Backup',
                    'Lift'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '110 Total'],
                    ['label' => 'Project Size', 'value' => '1 acre'],
                    ['label' => 'Launch Date', 'value' => 'Mar 2015'],
                    ['label' => 'Total Towers', 'value' => '2 Towers']
                ],
                'images' => [
                    '/images/Completed Projects/KVDL-Nisarg-srushti/1.jpg',
                    '/images/Completed Projects/KVDL-Nisarg-srushti/3.jpg',
                    '/images/Completed Projects/KVDL-Nisarg-srushti/5.jpg',
                    '/images/Completed Projects/KVDL-Nisarg-srushti/6.jpg',
                    '/images/Completed Projects/KVDL-Nisarg-srushti/7.jpg',
                    '/images/Completed Projects/KVDL-Nisarg-srushti/8.jpg',
                    '/images/Completed Projects/KVDL-Nisarg-srushti/9.jpg',
                    '/images/Completed Projects/KVDL-Nisarg-srushti/lo_largez.jpg',
                    '/images/Completed Projects/KVDL-Nisarg-srushti/si_large.jpg'
                ],
                'description' => "Located in Shirwal, Pune, the Nisargsrishti is a thoughtfully planned one, equipped with all amenities for a comfortable living. This project has a total of 110 units. Nisargsrishti has been built by reputed real estate developer Kedar Vanjape Developers Pvt. Ltd. . Its pincode is 412801. At Nisargsrishti, a quality living is guaranteed by modern amenities and healthy surroundings."
            ],
            [
                'id' => 8,
                'reraid' => 'P52100080676',
                'type' => 'ongoing',
                'title' => 'Divine Valley',
                'image' => '/images/Ongoing projects/KVDL-DivineVally/4.webp',
                'location' => 'Karanjgaon, Pune',
                'pincode' => '410405',
                'rating' => 'NA',
                'amneties' => [
                    'Waste Disposal',
                    'Power Backup',
                    'Security',
                    'CCTV Camera',
                    'Rain Water Harvesting',
                    'Fire Safety'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => 'NA'],
                    ['label' => 'Project Area', 'value' => 'NA'],
                    ['label' => 'Launch Date', 'value' => 'NA'],
                    ['label' => 'Total Towers', 'value' => '1 Tower']
                ],
                'images' => [
                    '/images/Ongoing projects/KVDL-DivineVally/1.webp',
                    '/images/Ongoing projects/KVDL-DivineVally/2.webp',
                    '/images/Ongoing projects/KVDL-DivineVally/3.webp',
                    '/images/Ongoing projects/KVDL-DivineVally/4.webp',
                    '/images/Ongoing projects/KVDL-DivineVally/5.webp'
                ],
                'description' => "Pune Construction Karanjgaon is famous for their well-planned societies like Divine Valley in Pune. If you have always wanted to be part of a vibrant and well managed society, this is the best option for you. You get ample & dedicated bike parking facility with this home. Working from home is convenient as this society has reliable generator for back up."
            ],
            [
                'id' => 9,
                'reraid' => 'P52100078804',
                'type' => 'ongoing',
                'title' => 'Godavari',
                'image' => '/images/Ongoing projects/KVDL-Godavari/1.webp',
                'location' => 'Bhosale Nagar, Pune',
                'pincode' => 'NA',
                'rating' => 'NA',
                'amneties' => [
                    'Indoor Games Room',
                    'Meditation Area',
                    'Park',
                    'Water Storage',
                    'Power Backup',
                    'Lift',
                    'Security',
                    "Kids' Play Ground"
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '19'],
                    ['label' => 'Project Area', 'value' => '0.3 acres'],
                    ['label' => 'Launch Date', 'value' => 'NA'],
                    ['label' => 'Total Towers', 'value' => '1 Tower']
                ],
                'images' => [
                    '/images/Ongoing projects/KVDL-Godavari/1.webp',
                    '/images/Ongoing projects/KVDL-Godavari/2.webp',
                    '/images/Ongoing projects/KVDL-Godavari/3.webp',
                    '/images/Ongoing projects/KVDL-Godavari/4.webp'
                ],
                'description' => "Experience the joys of living at Godavari Shree CHS, a premier residential project located in the heart of Bhosale Nagar, Pune. With its prime location, youre only a stone throw away from important connecting roads like Ganeshkhind Road and Baner Road. The project offers a range of amenities that cater to your needs, from kids play areas and power backup to ensuring a comfortable living experience. Whether youre a young professional or a growing family, Godavari Shree CHS is the perfect choice to call home."
            ],
            [
                'id' => 10,
                'reraid' => 'P52100050198',
                'type' => 'ongoing',
                'title' => 'Harshada',
                'image' => '/images/Ongoing projects/KVDL-Harshada/2.webp',
                'location' => 'Kothrud, Pune',
                'pincode' => '411038',
                'rating' => 'NA',
                'amneties' => [
                    'Parking',
                    'Flower Gardens',
                    'Maintenance Staff',
                    'Water Storage',
                    'Power Backup',
                    'Security',
                    'Rain Water Harvesting',
                    'Fire Fighting Equipment'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '30 Total'],
                    ['label' => 'Project Size', 'value' => '0.32 Acres'],
                    ['label' => 'Launch Date', 'value' => 'Apr 2023'],
                    ['label' => 'Total Towers', 'value' => '1 Tower']
                ],
                'images' => [
                    '/images/Ongoing projects/KVDL-Harshada/1.webp',
                    '/images/Ongoing projects/KVDL-Harshada/2.webp',
                    '/images/Ongoing projects/KVDL-Harshada/3.webp',
                    '/images/Ongoing projects/KVDL-Harshada/4.webp',
                    '/images/Ongoing projects/KVDL-Harshada/5.webp',
                    '/images/Ongoing projects/KVDL-Harshada/6.webp',
                    '/images/Ongoing projects/KVDL-Harshada/7.webp'
                ],
                'description' => "Possession date of Badhekar Harshada CHSL is Sep, 2025. The property offers 1 BHK, 2 BHK, 3 BHK units. As per the area plan, units are in the size range of 360.0 - 1073.0 sq.ft."
            ],
            [
                'id' => 11,
                'reraid' => 'P52100034495',
                'type' => 'ongoing',
                'title' => 'Sneh',
                'image' => '/images/Ongoing projects/KVDL-SNEH/2.webp',
                'location' => 'Plot No. 69, Kothrud, Pune',
                'pincode' => '411038',
                'rating' => 'NA',
                'amneties' => [
                    'Parking',
                    'Flower Gardens',
                    'Maintenance Staff',
                    'Water Storage',
                    'Power Backup',
                    'Security',
                    "Kids' Play Ground",
                    'Rain Water Harvesting',
                    'Fire Fighting Equipment'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '23 Total'],
                    ['label' => 'Project Size', 'value' => '0.29 Acres'],
                    ['label' => 'Launch Date', 'value' => 'Apr, 2022'],
                    ['label' => 'Total Towers', 'value' => '1 Tower']
                ],
                'images' => [
                    '/images/Ongoing projects/KVDL-SNEH/1.webp',
                    '/images/Ongoing projects/KVDL-SNEH/2.webp',
                    '/images/Ongoing projects/KVDL-SNEH/3.webp',
                    '/images/Ongoing projects/KVDL-SNEH/4.webp',
                    '/images/Ongoing projects/KVDL-SNEH/5.webp'
                ],
                'description' => "Badhekar Sneh offers some of the most conveniently designed Apartment. Located in Kothrud, it is a residential project. The project is spread over 0.29 Acres . It has 23 units. There is 1 building in this project. Badhekar Sneh offers some of the most exclusive 2 BHK, 3 BHK. As per the area plan, units are in the size range of 740.0 - 1050.0 sq.ft."
            ],
            [
                'id' => 12,
                'reraid' => 'P52200055199',
                'type' => 'ongoing',
                'title' => 'Varad Paradise',
                'image' => '/images/Ongoing projects/KVDL-VaradParadise/1.webp',
                'location' => 'Kopargaon, Ahmednagar',
                'pincode' => '423601',
                'rating' => 'NA',
                'amneties' => [
                    'Parking',
                    'Flower Gardens',
                    'Maintenance Staff',
                    'Water Storage',
                    'Power Backup',
                    'Security',
                    "Kids' Play Ground",
                    'Rain Water Harvesting',
                    'Fire Fighting Equipment'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => '23 Total'],
                    ['label' => 'Project Size', 'value' => '713.25 Sqm'],
                    ['label' => 'Completion Date', 'value' => '31st Dec 2025'],
                    ['label' => 'Total Towers', 'value' => 'NA']
                ],
                'images' => [
                    '/images/Ongoing projects/KVDL-VaradParadise/1.webp'
                ],
                'description' => "Nestled in Kopargaon (R), this project is strategically situated near 6 MTR ROAD, providing easy access to major transportation hubs. With a total plot area of 713.25 sqmts, VARAD PARADISE boasts of 28 apartments, with 0% already booked."
            ],
            [
                'id' => 13,
                'reraid' => 'NA',
                'type' => 'ongoing',
                'title' => 'Westend',
                'image' => '/images/Ongoing projects/KVDL-westend/1.jpeg',
                'location' => 'Rambaug Colony, Pune',
                'pincode' => '411038',
                'rating' => 'NA',
                'amneties' => [
                    'Parking',
                    'Flower Gardens',
                    'Maintenance Staff',
                    'Water Storage',
                    'Power Backup',
                    'Security',
                    'Rain Water Harvesting',
                    'Fire Fighting Equipment'
                ],
                'highlights' => [
                    ['label' => 'Units', 'value' => 'NA'],
                    ['label' => 'Project Size', 'value' => 'NA'],
                    ['label' => 'Launch Date', 'value' => 'NA'],
                    ['label' => 'Total Towers', 'value' => '1 Tower']
                ],
                'images' => [
                    '/images/Ongoing projects/KVDL-westend/1.jpeg',
                    '/images/Ongoing projects/KVDL-westend/2.jpeg',
                    '/images/Ongoing projects/KVDL-westend/3.jpeg'
                ],
                'description' => "KVDL Westend is a premium residential project located at Rambaug Colony, Pune. Designed with modern amenities and high-quality construction, it offers the perfect combination of comfort and convenience."
            ]
        ];

        foreach ($projects as $proj) {
            Project::updateOrCreate(['id' => $proj['id']], $proj);
        }
    }
}
