import { ItineraryItem } from '../types';

export interface DayActivityBlueprint {
  dayNumber: number;
  theme: string;
  activities: Array<{
    title: string;
    category: 'Beach' | 'Adventure' | 'Culture' | 'Food & Lifestyle' | 'Nature' | 'Shopping' | 'Wellness';
    timeSlot: 'morning' | 'afternoon' | 'evening';
    estimatedCost: number;
    location: string;
  }>;
}

export const DESTINATION_DAILY_ACTIVITIES: Record<string, DayActivityBlueprint[]> = {
  goa: [
    {
      dayNumber: 1,
      theme: 'Arrival, Coastal Check-in & Sunset Shacks',
      activities: [
        {
          title: 'Arrival, Hotel Check-in & Refreshing King Coconut',
          category: 'Food & Lifestyle',
          timeSlot: 'morning',
          estimatedCost: 150,
          location: 'Calangute / Candolim',
        },
        {
          title: 'Calangute & Baga Golden Sand Beach Stroll',
          category: 'Beach',
          timeSlot: 'afternoon',
          estimatedCost: 200,
          location: 'Baga Beach',
        },
        {
          title: 'Sunset Cocktails & Live Seafood Grill at Curlies',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 950,
          location: 'Anjuna Beach',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Portuguese Heritage & Latin Quarter Art Walk',
      activities: [
        {
          title: 'Historic Fort Aguada & 17th Century Lighthouse',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 50,
          location: 'Sinquerim',
        },
        {
          title: 'Fontainhas Heritage Walk & Traditional Pastel de Nata Bakery',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 400,
          location: 'Panaji Latin Quarter',
        },
        {
          title: 'Mandovi River Sunset Cruise with Goan Folk Dance',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 800,
          location: 'Panaji Jetty',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Island Snorkeling, Parasailing & High-Speed Water Thrills',
      activities: [
        {
          title: 'Grand Island Boat Trip & Guided Coral Reef Snorkeling',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 2200,
          location: 'Grand Island',
        },
        {
          title: 'Parasailing, Jet Ski & Bumper Ride Combo',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 1500,
          location: 'Candolim Watersports Hub',
        },
        {
          title: 'Night Flea Market & Live Acoustic Bohemian Music',
          category: 'Shopping',
          timeSlot: 'evening',
          estimatedCost: 400,
          location: 'Arpora Night Market',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Organic Spice Plantation & Dudhsagar Cascades',
      activities: [
        {
          title: 'Sahakari Spice Plantation Guided Tour with Buffet Lunch',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 650,
          location: 'Ponda',
        },
        {
          title: 'Dudhsagar Jungle Jeep Safari & Natural Spring Dip',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 1400,
          location: 'Bhagwan Mahaveer Sanctuary',
        },
        {
          title: 'Chapora Fort (Dil Chahta Hai) Sunset Panorama',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Vagator',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'South Goa Serenity & Butterfly Beach Hidden Cove',
      activities: [
        {
          title: 'Scenic South Goa Coastal Ride to Palolem Crescent Bay',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 350,
          location: 'Palolem Beach',
        },
        {
          title: 'Boat Ride to Hidden Butterfly Beach & Dolphin Spotting',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 800,
          location: 'Canacona',
        },
        {
          title: 'Candlelight Seafood Dinner under the Stars at Agonda',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 1100,
          location: 'Agonda Beach',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Old Goa Cathedrals & Mangrove Kayaking',
      activities: [
        {
          title: 'Basilica of Bom Jesus & Se Cathedral World Heritage Walk',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 100,
          location: 'Old Goa',
        },
        {
          title: 'Sal Backwaters Eco Kayaking through Dense Mangroves',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 1200,
          location: 'Sal River, Cavelossim',
        },
        {
          title: 'Rooftop Sundowner & Craft Beer Tasting at Susegado',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 750,
          location: 'Assagao',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Artisan Souvenirs, Ayurvedic Massage & Farewell',
      activities: [
        {
          title: 'Goan Cashew, Feni & Artisan Ceramic Souvenir Hunt',
          category: 'Shopping',
          timeSlot: 'morning',
          estimatedCost: 600,
          location: 'Mapusa Municipal Market',
        },
        {
          title: 'Relaxing Ayurvedic Coastal Oil Massage & Reflexology',
          category: 'Wellness',
          timeSlot: 'afternoon',
          estimatedCost: 1500,
          location: 'Morjim',
        },
        {
          title: 'Farewell Beachside Sunset Bonfire & Live Guitar Vibes',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 500,
          location: 'Ashwem Beach',
        },
      ],
    },
  ],

  manali: [
    {
      dayNumber: 1,
      theme: 'Arrival, Cedar Forest Walk & Old Manali Cafes',
      activities: [
        {
          title: 'Arrival, Riverside Cottage Check-in & Masala Chai',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 100,
          location: 'Old Manali',
        },
        {
          title: 'Hadimba Wooden Temple & Giant Cedar Forest Stroll',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 50,
          location: 'Dhungri Forest',
        },
        {
          title: 'Live Acoustic Music & Wood-Fired Trout at Cafe 1947',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 650,
          location: 'Manalsu River Stream',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Solang Valley Thrills & High-Altitude Paragliding',
      activities: [
        {
          title: 'Tandem Paragliding over Snow-Dusted Solang Slopes',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 2500,
          location: 'Solang Valley',
        },
        {
          title: 'Solang Ropeway Cable Car & Zorbing Down Meadows',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 800,
          location: 'Solang Meadow',
        },
        {
          title: 'Mall Road Steaming Momos, Siddu & Tibetan Butter Tea',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 300,
          location: 'Manali Mall Road',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Atal Tunnel Engineering Marvel & Sissu Waterfall Trail',
      activities: [
        {
          title: 'Scenic Drive through Atal Tunnel to Lahaul Valley',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 400,
          location: 'North Portal / Sissu',
        },
        {
          title: 'Sissu Glacier Lake & Cascading Waterfall Short Trek',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 200,
          location: 'Lahaul Valley',
        },
        {
          title: 'Cozy Riverside Bonfire & Stargazing Session',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 350,
          location: 'Palchan Village',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Jogini Waterfalls Pine Hike & Vashisht Hot Springs',
      activities: [
        {
          title: 'Jogini Falls Pine Forest Trail Hike & Apple Orchard Views',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Vashisht Village',
        },
        {
          title: 'Natural Sulphur Thermal Bath & Ancient Sage Temple',
          category: 'Wellness',
          timeSlot: 'afternoon',
          estimatedCost: 50,
          location: 'Vashisht Springs',
        },
        {
          title: 'Bohemian Shopping for Handwoven Kullu Shawls',
          category: 'Shopping',
          timeSlot: 'evening',
          estimatedCost: 800,
          location: 'Tibetan Monastery Market',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Naggar Castle Art Gallery & Trout Farm Cuisine',
      activities: [
        {
          title: 'Medieval Naggar Castle & Nicholas Roerich Art Estate',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 150,
          location: 'Naggar Heritage Village',
        },
        {
          title: 'Fresh Rainbow Trout Lunch & Himalayan Herb Tea',
          category: 'Food & Lifestyle',
          timeSlot: 'afternoon',
          estimatedCost: 600,
          location: 'Naggar Valley',
        },
        {
          title: 'Jana Waterfall Trail & Traditional Himachali Thali',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 400,
          location: 'Jana Village',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Beas White Water Rafting & Mountain Biking',
      activities: [
        {
          title: 'Grade III White Water Rafting on Roaring Beas River',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 1200,
          location: 'Pirdi, Kullu',
        },
        {
          title: 'Downhill Mountain Biking through Alpine Meadows',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 800,
          location: 'Old Manali Ridge',
        },
        {
          title: 'German Bakery Cinnamon Rolls & Herbal Tea Chillout',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 300,
          location: 'Club House Road',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Van Vihar Nature Walk, Souvenir Bazaars & Departure',
      activities: [
        {
          title: 'Van Vihar Riverside Deodar Forest Birdwatching',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 40,
          location: 'Lower Mall Road',
        },
        {
          title: 'Himalayan Apple Jam & Pure Honey Tasting at Artisan Emporium',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 500,
          location: 'Himachal Emporium',
        },
        {
          title: 'Farewell Mountain Sunset View & Departure Preparations',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Manali Viewpoint',
        },
      ],
    },
  ],

  jaipur: [
    {
      dayNumber: 1,
      theme: 'Arrival, Iconic Hawa Mahal & Pink City Bazaars',
      activities: [
        {
          title: 'Arrival & Welcome Cardamom Masala Chai at Laxmi Mishthan',
          category: 'Food & Lifestyle',
          timeSlot: 'morning',
          estimatedCost: 120,
          location: 'Johari Bazaar',
        },
        {
          title: 'Hawa Mahal Palace of Winds Architecture Tour & Photo Walk',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 100,
          location: 'Badi Chaupar',
        },
        {
          title: 'Sunset View of City Palace & Traditional Rawat Pyaz Kachori',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 250,
          location: 'Sindhi Camp / Old City',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Regal Amber Fort, Sheesh Mahal & Royal Observatory',
      activities: [
        {
          title: 'Majestic Amber Fort & Intricate Sheesh Mahal Mirror Palace',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 200,
          location: 'Amer',
        },
        {
          title: 'Jantar Mantar UNESCO Astronomical Sundial Guided Tour',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 150,
          location: 'City Palace Complex',
        },
        {
          title: 'Nahargarh Fort Sunset Viewpoint overlooking entire Pink City',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 100,
          location: 'Aravalli Hills',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Block Printing Masterclass & Stepwell Photography',
      activities: [
        {
          title: 'Panna Meena Ka Kund Ancient Stepwell Photo Stop',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Amer Stepwell',
        },
        {
          title: 'Hand Block-Printing Textile Workshop at Anokhi Museum',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 500,
          location: 'Kheri Gate',
        },
        {
          title: 'Chokhi Dhani Ethnic Rajasthani Village Fair & Dal Baati Feast',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 1100,
          location: 'Tonk Road',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Jaigarh Cannon Marvel & Blue Pottery Artisan Trail',
      activities: [
        {
          title: 'Jaigarh Fort & Jaivana (World’s Largest Wheeled Cannon)',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 150,
          location: 'Cheel ka Teela',
        },
        {
          title: 'Authentic Jaipur Blue Pottery Master Workshop',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 450,
          location: 'Kot Jeweler Lane',
        },
        {
          title: 'Jal Mahal Water Palace Promenade Twilight Walk',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Man Sagar Lake',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Albert Hall Museum, Silver Bazaars & Royal Spa',
      activities: [
        {
          title: 'Albert Hall Museum Indo-Saracenic Art & Mummy Gallery',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 150,
          location: 'Ram Niwas Garden',
        },
        {
          title: 'Bapu & Johari Bazaars Gemstone & Lac Bangle Shopping',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 600,
          location: 'Bapu Bazaar',
        },
        {
          title: 'Royal Heritage Haveli Dinner with Live Sarangi Recital',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 1200,
          location: 'Kishanpole Bazaar',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Galta Ji Monkey Temple & Leopard Safari',
      activities: [
        {
          title: 'Galta Ji Sacred Mountain Kunds & Sun Temple Hike',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 50,
          location: 'Galtaji Pass',
        },
        {
          title: 'Jhalana Forest Reserve Open-Jeep Leopard Safari',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 1800,
          location: 'Jhalana Dungri',
        },
        {
          title: 'Rooftop Baradari Fine Dining inside City Palace Courtyard',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 1500,
          location: 'City Palace',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Gatore Ki Chhatriyan & Departure',
      activities: [
        {
          title: 'Gatore Ki Chhatriyan Royal Marble Cenotaphs Quiet Walk',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 80,
          location: 'Shastri Nagar',
        },
        {
          title: 'Traditional Ghewar Sweet Box Packing at Sambhar Fini Shop',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 400,
          location: 'Tripolia Bazaar',
        },
        {
          title: 'Farewell Sunset over Aravalli Ridges & Departure',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Jaipur Gateway',
        },
      ],
    },
  ],

  kerala: [
    {
      dayNumber: 1,
      theme: 'Kochi Heritage, Chinese Fishing Nets & Fort Kochi Art',
      activities: [
        {
          title: 'Arrival in Kochi & Iconic Chinese Fishing Nets at Sunset',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 50,
          location: 'Fort Kochi Beach',
        },
        {
          title: 'Jew Town Antiques & Paradesi Synagogue Heritage Walk',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 100,
          location: 'Mattancherry',
        },
        {
          title: 'Authentic Kathakali Dance & Martial Arts Kalaripayattu Show',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 450,
          location: 'Kerala Kathakali Centre',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Munnar Mist-Covered Tea Estates & Anamudi Ridge',
      activities: [
        {
          title: 'Scenic Hill Climb to Munnar & Cheeyappara Waterfall Stop',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Munnar Highway',
        },
        {
          title: 'Tata Tea Museum & Tea Leaf Plucking Experience with Tasting',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 250,
          location: 'Nullatanni Estate',
        },
        {
          title: 'Eravikulam National Park Nilgiri Tahr Mountain Viewpoint',
          category: 'Adventure',
          timeSlot: 'evening',
          estimatedCost: 350,
          location: 'Rajamalai Hills',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Mattupetty Dam Boating & Top Station Cloudline',
      activities: [
        {
          title: 'Mattupetty Reservoir Speedboat Ride & Echo Point Call',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 500,
          location: 'Mattupetty',
        },
        {
          title: 'Top Station Panoramic Valley Lookouts into Tamil Nadu',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 100,
          location: 'Kannandevan Hills',
        },
        {
          title: 'Traditional Malabar Parotta & Kerala Banana Fry Treats',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 250,
          location: 'Munnar Town Bazaar',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Thekkady Periyar Wildlife Sanctuary & Bamboo Rafting',
      activities: [
        {
          title: 'Periyar Lake Wildlife Cruise with Wild Elephant Spotting',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 600,
          location: 'Thekkady',
        },
        {
          title: 'Spice Garden Walk with Green Cardamom & Black Pepper Harvest',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 300,
          location: 'Kumily',
        },
        {
          title: 'Ayurvedic Abhyanga Herbal Oil Massage Session',
          category: 'Wellness',
          timeSlot: 'evening',
          estimatedCost: 1600,
          location: 'Thekkady Wellness Centre',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Alleppey Backwaters Houseboat Cruise & Lagoon Sunsets',
      activities: [
        {
          title: 'Board Traditional Thatched Kettuvallam Houseboat',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 2800,
          location: 'Punnamada Jetty',
        },
        {
          title: 'Cruising through Lush Paddy Fields & Village Waterways with Fresh Karimeen Fish',
          category: 'Food & Lifestyle',
          timeSlot: 'afternoon',
          estimatedCost: 0,
          location: 'Vembanad Lake',
        },
        {
          title: 'Sunset Canoe Ride into Narrow Village Canals',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 400,
          location: 'Kuttanad Backwaters',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Marari Quiet Beach & Coir Making Village Trail',
      activities: [
        {
          title: 'Marari Fishermen Village Walk & Coir Weaving Demonstration',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 100,
          location: 'Mararikulam',
        },
        {
          title: 'Relaxing Under Swaying Coconut Palms at Marari Beach',
          category: 'Beach',
          timeSlot: 'afternoon',
          estimatedCost: 0,
          location: 'Marari Coast',
        },
        {
          title: 'Clay-Pot Fish Curry & Appam Feast with Toddy Shop Flavors',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 650,
          location: 'Alleppey Beach Road',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Banana Chips Shopping & Grand Departure',
      activities: [
        {
          title: 'Live Hot Coconut Oil Banana Chips & Spices Shopping',
          category: 'Shopping',
          timeSlot: 'morning',
          estimatedCost: 700,
          location: 'Broadway Market, Kochi',
        },
        {
          title: 'Marine Drive Waterfront Promenade Walk',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 0,
          location: 'Ernakulam Waterfront',
        },
        {
          title: 'Farewell Filter Coffee & Airport Transit',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 150,
          location: 'Cochin International Airport',
        },
      ],
    },
  ],

  bali: [
    {
      dayNumber: 1,
      theme: 'Arrival, Seminyak Beach Sunset & Welcome Smoothie Bowl',
      activities: [
        {
          title: 'Arrival, Private Pool Villa Check-in & Fresh Coconut Welcome',
          category: 'Food & Lifestyle',
          timeSlot: 'morning',
          estimatedCost: 200,
          location: 'Seminyak',
        },
        {
          title: 'Seminyak Beach Surf Stroll & Boutique Shopping',
          category: 'Beach',
          timeSlot: 'afternoon',
          estimatedCost: 350,
          location: 'Petitenget Beach',
        },
        {
          title: 'Iconic Sunset Beanbags & Cocktails at La Plancha Shack',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 900,
          location: 'Double Six Beach',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Ubud Sacred Monkey Forest & Royal Palace Dance',
      activities: [
        {
          title: 'Ubud Sacred Monkey Forest Sanctuary Canopy Walk',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 450,
          location: 'Padangtegal, Ubud',
        },
        {
          title: 'Ubud Art Market Handcrafted Rattan Bags & Sarongs Shopping',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 600,
          location: 'Jl. Raya Ubud',
        },
        {
          title: 'Ubud Royal Palace Traditional Legong Dance Performance',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 550,
          location: 'Puri Saren Agung',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Tegalalang Emerald Rice Terraces & Jungle Swing',
      activities: [
        {
          title: 'Tegalalang Rice Terraces Sunrise Trek & Bamboo Bridges',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 250,
          location: 'Tegalalang',
        },
        {
          title: 'High-Altitude Bali Jungle Swing & Kopi Luwak Plantation',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 1400,
          location: 'Alas Harum',
        },
        {
          title: 'Tirta Empul Holy Water Temple Purification Ritual',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 350,
          location: 'Tampaksiring',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Nusa Penida Island Tour & Kelingking Dinosaur Cliff',
      activities: [
        {
          title: 'Speedboat to Nusa Penida & Kelingking T-Rex Cliff Panorama',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 2600,
          location: 'Nusa Penida West Coast',
        },
        {
          title: 'Broken Beach Natural Arch & Angel’s Billabong Tidal Pool',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 200,
          location: 'Sakti Village',
        },
        {
          title: 'Crystal Bay Sunset Snorkeling with Giant Manta Rays',
          category: 'Beach',
          timeSlot: 'evening',
          estimatedCost: 750,
          location: 'Crystal Bay',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Uluwatu Sea Cliff Temple & Dramatic Kecak Fire Dance',
      activities: [
        {
          title: 'Padang Padang Hidden Beach Surf & Cave Exploration',
          category: 'Beach',
          timeSlot: 'morning',
          estimatedCost: 150,
          location: 'Pecatu Peninsula',
        },
        {
          title: 'Single Fin Cliffside Ocean Lounge Lunch & Wave Watching',
          category: 'Food & Lifestyle',
          timeSlot: 'afternoon',
          estimatedCost: 1100,
          location: 'Suluban Cliff',
        },
        {
          title: 'Uluwatu Sunset Sea Temple & Dramatic Kecak Fire Dance',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 850,
          location: 'Uluwatu Clifftop',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Mount Batur Sunrise Trek & Volcanic Hot Springs',
      activities: [
        {
          title: 'Early Dawn Mount Batur Volcano Summit Sunrise Hike',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 2200,
          location: 'Kintamani Crater',
        },
        {
          title: 'Batur Natural Volcanic Hot Springs Thermal Dip',
          category: 'Wellness',
          timeSlot: 'afternoon',
          estimatedCost: 900,
          location: 'Toya Bungkah',
        },
        {
          title: 'Canggu Echo Beach Sunset Shacks & Wood-Fired Pizza',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 750,
          location: 'Canggu',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Balinese Flower Bath Spa, Souvenirs & Departure',
      activities: [
        {
          title: 'Traditional Balinese 2-Hour Herbal Massage & Flower Petal Bath',
          category: 'Wellness',
          timeSlot: 'morning',
          estimatedCost: 1800,
          location: 'Seminyak Spa Sanctuary',
        },
        {
          title: 'Krisna Oleh-Oleh Mega Souvenir Market for Bali Coffee & Spices',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 700,
          location: 'Sunset Road',
        },
        {
          title: 'Jimbaran Bay Candlelit Seafood BBQ on the Sand & Airport Ride',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 1300,
          location: 'Jimbaran Bay',
        },
      ],
    },
  ],

  dubai: [
    {
      dayNumber: 1,
      theme: 'Arrival, Burj Khalifa Sky Deck & Dubai Fountain Spectacle',
      activities: [
        {
          title: 'Arrival & Downtown Hotel Check-in with Arabic Cardamom Coffee',
          category: 'Food & Lifestyle',
          timeSlot: 'morning',
          estimatedCost: 150,
          location: 'Downtown Dubai',
        },
        {
          title: 'Burj Khalifa Level 124/125 Observation Sky Deck',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 3800,
          location: 'Burj Khalifa',
        },
        {
          title: 'Dubai Mall Musical Fountain Show & Promenade Dinner',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 1200,
          location: 'Burj Lake Boardwalk',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Red Dune Desert Safari, Dune Bashing & Arabian Night Camp',
      activities: [
        {
          title: 'Museum of the Future Interactive Sci-Fi & Architecture Tour',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 3400,
          location: 'Sheikh Zayed Road',
        },
        {
          title: '4x4 Red Dune Bashing, Sandboarding & Quad Biking Thrills',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 2600,
          location: 'Lahbab Desert',
        },
        {
          title: 'Bedouin Desert Camp with Belly Dance, Tanoura Show & BBQ Buffet',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 1200,
          location: 'Al Marmoom Desert',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Palm Jumeirah Monorail & Atlantis Aquaventure Waterpark',
      activities: [
        {
          title: 'Palm Jumeirah Scenic Monorail Ride to The View at The Palm',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 1900,
          location: 'Nakheel Mall',
        },
        {
          title: 'Atlantis Aquaventure Waterpark Leap of Faith Slides',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 6500,
          location: 'Atlantis The Palm',
        },
        {
          title: 'The Pointe Waterfront Fountain Walk & Seaside Bistro',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 1400,
          location: 'Palm Bay',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Old Dubai Gold & Spice Souks, Abra Creek Crossing',
      activities: [
        {
          title: 'Al Fahidi Historic Bastakiya Quarter & Coffee Museum',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 200,
          location: 'Bur Dubai',
        },
        {
          title: 'Traditional 1-Dirham Wooden Abra Boat Ride across Dubai Creek',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 50,
          location: 'Deira Creek',
        },
        {
          title: 'Gold Souk & Saffron Spice Souk Bargaining & Arabian Shawarma',
          category: 'Shopping',
          timeSlot: 'evening',
          estimatedCost: 600,
          location: 'Deira Souks',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Dubai Marina Luxury Yacht Cruise & JBR Beach Walk',
      activities: [
        {
          title: 'JBR Walk & Beachside Standup Paddleboarding',
          category: 'Beach',
          timeSlot: 'morning',
          estimatedCost: 800,
          location: 'Jumeirah Beach Residence',
        },
        {
          title: 'Dubai Marina Luxury Shared Catamaran Yacht Cruise with Lunch',
          category: 'Food & Lifestyle',
          timeSlot: 'afternoon',
          estimatedCost: 3200,
          location: 'Dubai Marina Yacht Club',
        },
        {
          title: 'Bluewaters Island & Ain Dubai Ferris Wheel Night Promenade',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 400,
          location: 'Bluewaters',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Miracle Garden Floral Wonderland & Global Village',
      activities: [
        {
          title: 'Dubai Miracle Garden 150 Million Blooming Flower Sculptures',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 1800,
          location: 'Al Barsha South',
        },
        {
          title: 'Ski Dubai Real Snow Indoor Penguin Encounter & Slope Sledding',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 4500,
          location: 'Mall of the Emirates',
        },
        {
          title: 'Global Village 90+ Country Pavilions, Street Food & Carnival',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 800,
          location: 'Sheikh Mohammed Bin Zayed Rd',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Dubai Frame Panorama, Duty-Free Luxury & Departure',
      activities: [
        {
          title: 'The Dubai Frame Glass Walkway bridging Old and New Dubai',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 1200,
          location: 'Zabeel Park',
        },
        {
          title: 'Bateel Gourmet Stuffed Dates & Arabian Perfume Shopping',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 900,
          location: 'Dubai Mall Fashion Avenue',
        },
        {
          title: 'Farewell Skyline Sunset Tea & Airport Terminal Transit',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 450,
          location: 'DXB Airport Hub',
        },
      ],
    },
  ],

  rishikesh: [
    {
      dayNumber: 1,
      theme: 'Arrival, Sacred Ganga Aarti at Triveni Ghat',
      activities: [
        {
          title: 'Arrival, Riverfront Ashram Check-in & Herbal Ginger Chai',
          category: 'Wellness',
          timeSlot: 'morning',
          estimatedCost: 80,
          location: 'Tapovan',
        },
        {
          title: 'Ram Jhula & Laxman Jhula Suspension Bridges Exploration',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 0,
          location: 'Laxman Jhula',
        },
        {
          title: 'Triveni Ghat Grand Maha Aarti with Chanting & Floating Diyas',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 100,
          location: 'Triveni Ghat',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'White Water Rafting & Cliff Jumping at Shivpuri',
      activities: [
        {
          title: '16km Grade III-IV River Rafting through Roller Coaster Rapids',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 1200,
          location: 'Shivpuri to Nim Beach',
        },
        {
          title: '30-Foot Cliff Jumping & Body Surfing in Icy Ganga Waters',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 300,
          location: 'Magpie Beach',
        },
        {
          title: 'Beatles Cafe Wood-Fired Pizza & Ganga Sunset View',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 550,
          location: 'Paonta Sahib Road',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'The Beatles Ashram & Neer Garh Waterfall Hike',
      activities: [
        {
          title: 'Chaurasi Kutia (Beatles Ashram) Graffiti & Meditation Caves',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 150,
          location: 'Rajaji Tiger Reserve Edge',
        },
        {
          title: 'Neer Garh Forest Waterfall Trek & Natural Emerald Pool Dip',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 50,
          location: 'Neer Waterfall',
        },
        {
          title: 'Parmarth Niketan Ashram Sunset Bhajan Session & Kirtan',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Swarg Ashram',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Bungee Jumping & Giant Swing at Mohan Chatti',
      activities: [
        {
          title: 'India’s Highest 83m Fixed Platform Bungee Jump',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 3800,
          location: 'Mohan Chatti',
        },
        {
          title: 'Extreme Flying Fox Zipline across the Rocky Valley',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 1900,
          location: 'Jumpin Heights',
        },
        {
          title: 'Little Buddha Cafe Riverside Organic Thali & Lemon Mint Cooler',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 400,
          location: 'Laxman Jhula Ghat',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Kunjapuri Sunrise Himalayan Peak Panorama & Yoga',
      activities: [
        {
          title: 'Kunjapuri Devi Temple Sunrise View over Snow-Capped Chaukhamba',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 350,
          location: 'Narendra Nagar',
        },
        {
          title: 'Downhill Village Trek through Terraced Farms & Mango Groves',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 200,
          location: 'Barkot Trail',
        },
        {
          title: 'Riverside Hatha Yoga & Guided Sound Bath Singing Bowls',
          category: 'Wellness',
          timeSlot: 'evening',
          estimatedCost: 500,
          location: 'Tapovan Yoga Hall',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Vashistha Cave Silent Meditation & Beach Camping',
      activities: [
        {
          title: 'Vashistha Gufa Deep Rock Cave Meditation by the Ganga',
          category: 'Wellness',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Badrinath Highway',
        },
        {
          title: 'White Sand Beach Volleyball & River Pebble Stacking',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 150,
          location: 'Marine Drive Beach',
        },
        {
          title: 'Riverside Camp Bonfire, Barbecue & Live Acoustic Music',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 900,
          location: 'Kaudiyala Camp',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Ayurvedic Herb Shopping, Rudraksha Bazaars & Departure',
      activities: [
        {
          title: 'Swarg Ashram Hand-Carved Rudraksha & Himalayan Salt Shopping',
          category: 'Shopping',
          timeSlot: 'morning',
          estimatedCost: 450,
          location: 'Swarg Ashram Bazaars',
        },
        {
          title: 'Traditional Ayurvedic Panchakarma Foot Reflexology',
          category: 'Wellness',
          timeSlot: 'afternoon',
          estimatedCost: 1200,
          location: 'Tapovan Wellness Spa',
        },
        {
          title: 'Farewell Ganga Aarti Blessings & Transit to Haridwar',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 200,
          location: 'Rishikesh Terminal',
        },
      ],
    },
  ],

  ladakh: [
    {
      dayNumber: 1,
      theme: 'Arrival in Leh & Altitude Acclimatization',
      activities: [
        {
          title: 'Arrival at Kushok Bakula Rimpochee Airport & Quiet Hotel Rest',
          category: 'Wellness',
          timeSlot: 'morning',
          estimatedCost: 100,
          location: 'Leh City',
        },
        {
          title: 'Gentle Walk to Shanti Stupa for Sunset Valley Panorama',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 0,
          location: 'Changsipa Ridge',
        },
        {
          title: 'Traditional Ladakhi Thukpa & Steamed Tingmo Bread Dinner',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 350,
          location: 'Leh Main Bazaar',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Leh Heritage Palaces, Hall of Fame & Magnetic Hill',
      activities: [
        {
          title: '9-Story Leh Royal Palace & Tibetan Art Exhibition',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 100,
          location: 'Namgyal Hill',
        },
        {
          title: 'Gravity-Defying Magnetic Hill Phenomenon & Gurudwara Pathar Sahib',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 0,
          location: 'Srinagar-Leh Highway',
        },
        {
          title: 'Sangam: Confluence of Emerald Indus and Muddy Zanskar Rivers',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Nimmu',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Khardung La Pass (17,982 ft) & Nubra Valley Dunes',
      activities: [
        {
          title: 'Driving across Khardung La Pass (World’s Highest Motor Road)',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Khardung La Ridge',
        },
        {
          title: 'Diskit Monastery Giant 106-ft Maitreya Buddha Statue',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 50,
          location: 'Diskit, Nubra',
        },
        {
          title: 'Hunder White Sand Dunes Double-Humped Bactrian Camel Safari',
          category: 'Adventure',
          timeSlot: 'evening',
          estimatedCost: 500,
          location: 'Hunder Desert',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Turtuk Balti Heritage Village near LOC',
      activities: [
        {
          title: 'Scenic Drive along Shyok River to Historic Turtuk Village',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Turtuk Sector',
        },
        {
          title: 'Turtuk Apricot Orchards & Royal Balti Museum Walk',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 100,
          location: 'Youl Village',
        },
        {
          title: 'Authentic Balti Apricot Walnut Chicken / Vegetarian Feast',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 450,
          location: 'Turtuk Valley',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Pangong Tso High-Altitude Indigo Lake & Stargazing',
      activities: [
        {
          title: 'Drive via Shyok River route to Pangong Tso (14,270 ft)',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Durbuk / Tangste',
        },
        {
          title: 'Marvel at Pangong’s Shifting Shades of Blue & 3 Idiots Point',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 0,
          location: 'Spangmik',
        },
        {
          title: 'Glamping Camp Dining & Milky Way Galaxy Stargazing',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 750,
          location: 'Lukung Shore',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Chang La Pass, Thiksey Monastery & Shey Palace',
      activities: [
        {
          title: 'Sunrise over Frozen Waters & Crossing Chang La Pass (17,590 ft)',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Chang La',
        },
        {
          title: 'Thiksey Monastery (Mini Potala) Morning Chanting Session',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 50,
          location: 'Thiksey',
        },
        {
          title: 'Shey Palace & Giant Copper-Gold Shakyamuni Buddha',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 50,
          location: 'Shey',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Pashmina Wool & Tibetan Handicraft Shopping',
      activities: [
        {
          title: 'Tibetan Refugee Market Pure Pashmina & Prayer Wheel Hunt',
          category: 'Shopping',
          timeSlot: 'morning',
          estimatedCost: 1200,
          location: 'Leh Old Market',
        },
        {
          title: 'Choglamsar Donkey Sanctuary & Organic Sea Buckthorn Juice Cafe',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 150,
          location: 'Choglamsar',
        },
        {
          title: 'Farewell Ladakhi Butter Tea & Airport Departure Preparation',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 100,
          location: 'Leh Town',
        },
      ],
    },
  ],

  kashmir: [
    {
      dayNumber: 1,
      theme: 'Arrival in Srinagar, Dal Lake Shikara Ride & Houseboat',
      activities: [
        {
          title: 'Arrival in Srinagar & Traditional Carved Cedar Houseboat Check-in',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 200,
          location: 'Dal Lake Gate 1',
        },
        {
          title: 'Sunset Shikara Wooden Boat Ride through Floating Lotus Gardens',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 600,
          location: 'Char Chinar Island',
        },
        {
          title: 'Kashmiri Kahwa Saffron Tea & Authentic Rogan Josh / Yakhni Dinner',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 650,
          location: 'Boulevard Road',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Mughal Terraced Gardens & Shankaracharya Hilltop',
      activities: [
        {
          title: 'Nishat Bagh Garden of Bliss & Shalimar Bagh Fountains',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 100,
          location: 'Zabarwan Range',
        },
        {
          title: 'Chashme Shahi Natural Spring Garden & Royal Spring Water',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 50,
          location: 'Raj Bhavan Road',
        },
        {
          title: 'Shankaracharya Temple 240 Steps Climb for 360° Srinagar Panorama',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Takht-i-Sulaiman',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Gulmarg Meadow of Flowers & World’s 2nd Highest Gondola',
      activities: [
        {
          title: 'Gulmarg Gondola Phase 1 & Phase 2 to Apharwat Peak (13,780 ft)',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 2100,
          location: 'Apharwat Ridge',
        },
        {
          title: 'Snow Sledging, Skiing Slopes & Pine Meadow Horse Riding',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 1200,
          location: 'Gulmarg Golf Course',
        },
        {
          title: 'Highland Park Hot Chocolate & French Pastries beside Pine Trees',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 400,
          location: 'Gulmarg Meadows',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Pahalgam Valley of Shepherds & Betaab Valley',
      activities: [
        {
          title: 'Drive through Pampore Saffron Fields and Avantipur Ruins to Pahalgam',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 100,
          location: 'Lidder Valley',
        },
        {
          title: 'Betaab Valley Crystal River Stroll & Bollywood Movie Spots',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 150,
          location: 'Betaab Valley',
        },
        {
          title: 'Aru Valley Alpine Village Meadows & Trout Fish Farm',
          category: 'Adventure',
          timeSlot: 'evening',
          estimatedCost: 250,
          location: 'Aru Wildlife Sanctuary',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Sonamarg Meadow of Gold & Thajiwas Glacier Trek',
      activities: [
        {
          title: 'Scenic Drive along Sindh River to Sonamarg (8,950 ft)',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Sonamarg Valley',
        },
        {
          title: 'Pony Ride or Gentle Alpine Trek to Thajiwas Glacier Ice Falls',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 900,
          location: 'Thajiwas Range',
        },
        {
          title: 'Riverside Bonfire & Steaming Kashmiri Wazwan Feast',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 800,
          location: 'Sindh Riverbank',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Doodhpathri Milk Valley Meadows & Hidden Trails',
      activities: [
        {
          title: 'Day Trip to Pristine Unexplored Doodhpathri Meadows',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 200,
          location: 'Budgam District',
        },
        {
          title: 'Shaliganga River Stone Skipping & Green Pine Meadow Picnic',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 100,
          location: 'Doodhpathri',
        },
        {
          title: 'Srinagar Old City Jamia Masjid Wooden Architecture Tour',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Nowhatta',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Floating Vegetable Market, Saffron Souvenirs & Departure',
      activities: [
        {
          title: 'Dawn 5:30 AM Floating Vegetable & Flower Market Shikara Tour',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 500,
          location: 'Dal Lake Inner Channels',
        },
        {
          title: 'Pure Kashmiri Saffron, Walnut Wood & Pashmina Shopping at Lal Chowk',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 1500,
          location: 'Polo View Market',
        },
        {
          title: 'Farewell Saffron Kehwa & Srinagar Airport Departure',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 150,
          location: 'Sheikh ul-Alam Airport',
        },
      ],
    },
  ],

  udaipur: [
    {
      dayNumber: 1,
      theme: 'Arrival, City Palace Lake Panorama & Sunset Boat Cruise',
      activities: [
        {
          title: 'Arrival & Heritage Haveli Lake View Check-in with Kulhad Chai',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 100,
          location: 'Lal Ghat',
        },
        {
          title: 'Majestic City Palace Royal Balconies & Peacock Courtyard Tour',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 400,
          location: 'City Palace Complex',
        },
        {
          title: 'Lake Pichola Sunset Boat Cruise past Taj Lake Palace & Jagmandir',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 850,
          location: 'Rameshwar Ghat',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Jagdish Temple, Saheliyon Ki Bari & Bagore Ki Haveli Dance',
      activities: [
        {
          title: 'Carved Jagdish Temple Morning Aarti & Old City Walk',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Jagdish Chowk',
        },
        {
          title: 'Saheliyon-ki-Bari Royal Fountains & Lotus Pool Stroll',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 100,
          location: 'Panchwati',
        },
        {
          title: 'Dharohar Rajasthani Folk Dance & Puppet Show at Bagore Ki Haveli',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 200,
          location: 'Gangaur Ghat',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Monsoon Palace Clifftop Views & Fateh Sagar Lake Promenade',
      activities: [
        {
          title: 'Sajjangarh Monsoon Palace Clifftop Panorama over Aravalli Hills',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 300,
          location: 'Bansdara Peak',
        },
        {
          title: 'Fateh Sagar Lake Speedboat to Nehru Island Park',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 450,
          location: 'Fateh Sagar Paal',
        },
        {
          title: 'Cold Coffee at Sukhadia Circle & Street Food Kulhad Pav Bhaji',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 250,
          location: 'Sukhadia Circle',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Kumbhalgarh Great Wall Safari Day Excursion',
      activities: [
        {
          title: 'Drive to Kumbhalgarh Fort (World’s 2nd Longest Continuous Wall)',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 250,
          location: 'Rajsamand Ridge',
        },
        {
          title: 'Ranakpur 1,444 Non-Identical Marble Pillars Jain Temple Tour',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 200,
          location: 'Ranakpur Valley',
        },
        {
          title: 'Traditional Mewari Gatta Curry & Ker Sangri Haveli Dinner',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 800,
          location: 'Ambrai Ghat',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Miniature Art Painting Masterclass & Silver Jewelry Hunt',
      activities: [
        {
          title: 'Traditional Mewar Miniature Painting Workshop with Master Artist',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 600,
          location: 'Bhatiyani Chohatta',
        },
        {
          title: 'Moti Magri Maharana Pratap Memorial Hill Garden Walk',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 150,
          location: 'Fateh Sagar Hill',
        },
        {
          title: 'Hathi Pol Bazaars Mojari Footwear & Silver Jewelry Browsing',
          category: 'Shopping',
          timeSlot: 'evening',
          estimatedCost: 500,
          location: 'Hathi Pol Bazaar',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Badi Lake Silence, Bahubali Hill Hike & Spa',
      activities: [
        {
          title: 'Bahubali Hill Sunrise Trek overlooking Serene Badi Lake',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 50,
          location: 'Badi Lake',
        },
        {
          title: 'Ayurvedic Marma Royal Massage at Heritage Palace Wellness Retreat',
          category: 'Wellness',
          timeSlot: 'afternoon',
          estimatedCost: 1600,
          location: 'Shilpgram Road',
        },
        {
          title: 'Romantic Candlelight Rooftop Dining Overlooking Illuminated Lake Pichola',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 1400,
          location: 'Upre by 1559 AD',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Shilpgram Crafts Village & Grand Farewell',
      activities: [
        {
          title: 'Shilpgram Rural Arts and Crafts Complex Folk Discovery',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 150,
          location: 'Havala Village',
        },
        {
          title: 'Artisan Wooden Toys & Handcrafted Leather Diary Souvenirs',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 400,
          location: 'Bada Bazaar',
        },
        {
          title: 'Farewell Royal Mewar Sweets Box & Departure Transit',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 200,
          location: 'Maharana Pratap Airport',
        },
      ],
    },
  ],

  singapore: [
    {
      dayNumber: 1,
      theme: 'Arrival, Marina Bay Sands SkyPark & Gardens by the Bay',
      activities: [
        {
          title: 'Arrival, Changi Jewel Rain Vortex Waterfall Walk & MRT Transit',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 200,
          location: 'Changi Airport',
        },
        {
          title: 'Marina Bay Sands 57th-Floor SkyPark Observation Deck',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 2200,
          location: 'Marina Bay',
        },
        {
          title: 'Gardens by the Bay Supertree Grove Garden Rhapsody Light Show',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Supertree Grove',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Flower Dome, Cloud Forest & Lau Pa Sat Satay Street',
      activities: [
        {
          title: 'Cloud Forest 35m Indoor Mountain Waterfall & Mist Walk',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 2400,
          location: 'Gardens by the Bay',
        },
        {
          title: 'Merlion Park Iconic Statue Photo & Singapore River Promenade',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 0,
          location: 'Fullerton Road',
        },
        {
          title: 'Lau Pa Sat Open-Air Satay Street Grilled Chicken Skewers & Beer',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 900,
          location: 'Raffles Place',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Sentosa Island Cable Car, Universal Studios & Siloso Beach',
      activities: [
        {
          title: 'Mount Faber Scenic Cable Car Crossing to Sentosa Island',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 2100,
          location: 'HarbourFront',
        },
        {
          title: 'Universal Studios Singapore Battlestar Galactica Rollercoasters',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 5800,
          location: 'Resorts World Sentosa',
        },
        {
          title: 'Wings of Time Fireworks, Laser & Water Extravaganza on Beach',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 1200,
          location: 'Siloso Beach',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Chinatown Michelin Hawker Heritage & Little India Spice Trail',
      activities: [
        {
          title: 'Buddha Tooth Relic Temple & Chinatown Heritage Shophouses',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'South Bridge Road',
        },
        {
          title: 'Chinatown Complex Hawker Center Famous Tian Tian Hainanese Chicken Rice',
          category: 'Food & Lifestyle',
          timeSlot: 'afternoon',
          estimatedCost: 450,
          location: 'Smith Street',
        },
        {
          title: 'Little India Sri Veeramakaliamman Temple & Mustafa 24-hr Mega Shopping',
          category: 'Shopping',
          timeSlot: 'evening',
          estimatedCost: 800,
          location: 'Serangoon Road',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Mandai Singapore Zoo & Night Safari Tram Adventure',
      activities: [
        {
          title: 'World-Class Open-Concept Singapore Zoo & Jungle Breakfast',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 3200,
          location: 'Mandai Lake Road',
        },
        {
          title: 'River Wonders Amazon Flooded Forest Giant Panda Exhibit',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 2800,
          location: 'Mandai Wildlife Reserve',
        },
        {
          title: 'World’s First Night Safari Guided Tram into Nocturnal Animal Kingdom',
          category: 'Adventure',
          timeSlot: 'evening',
          estimatedCost: 3500,
          location: 'Night Safari Park',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Kampong Glam Haji Lane Murals & Orchard Road Retail Therapy',
      activities: [
        {
          title: 'Sultan Mosque & Vibrant Haji Lane Graffiti Murals & Indie Boutiques',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 200,
          location: 'Kampong Glam',
        },
        {
          title: 'Orchard Road Iconic Department Stores & ION Orchard Sky View',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 1500,
          location: 'Orchard Road',
        },
        {
          title: 'Clarke Quay Historic Quayside Bumboats & Riverside Dinner',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 1600,
          location: 'Clarke Quay',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Botanic Gardens UNESCO Orchid Sanctuary & Changi Jewel Departure',
      activities: [
        {
          title: 'Singapore Botanic Gardens UNESCO National Orchid Garden Stroll',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 300,
          location: 'Cluny Road',
        },
        {
          title: 'Pandan Chiffon Cake & Kaya Jam Tasting at Bengawan Solo',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 500,
          location: 'Bugis Junction',
        },
        {
          title: 'Jewel Changi Canopy Park Walk & Departure Flight Check-in',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 400,
          location: 'Changi Airport Jewel',
        },
      ],
    },
  ],

  paris: [
    {
      dayNumber: 1,
      theme: 'Arrival, Eiffel Tower Summit & Seine River Dinner Cruise',
      activities: [
        {
          title: 'Arrival in Paris, Boutique Hotel Check-in & Fresh Croissant Breakfast',
          category: 'Food & Lifestyle',
          timeSlot: 'morning',
          estimatedCost: 350,
          location: '7th Arrondissement',
        },
        {
          title: 'Eiffel Tower 2nd Floor & Summit Elevator for Panoramic Paris Skyline',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 3200,
          location: 'Champ de Mars',
        },
        {
          title: 'Bateaux Mouches Romantic Seine River Cruise passing Illuminated Notre-Dame',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 1800,
          location: 'Pont de l’Alma',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Louvre Museum Mona Lisa Masterpieces & Tuileries Garden',
      activities: [
        {
          title: 'Louvre Museum Mona Lisa, Venus de Milo & Winged Victory Guided Tour',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 2200,
          location: 'Pyramide du Louvre',
        },
        {
          title: 'Tuileries Gardens Promenade & Famous Angelina Parisian Hot Chocolate',
          category: 'Food & Lifestyle',
          timeSlot: 'afternoon',
          estimatedCost: 900,
          location: 'Rue de Rivoli',
        },
        {
          title: 'Champs-Élysées Avenue Stroll & Arc de Triomphe Sunset Rooftop View',
          category: 'Shopping',
          timeSlot: 'evening',
          estimatedCost: 1400,
          location: 'Place Charles de Gaulle',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Palace of Versailles Hall of Mirrors & Royal Fountains',
      activities: [
        {
          title: 'RER Train to Versailles & Royal State Apartments Grand Tour',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 2600,
          location: 'Château de Versailles',
        },
        {
          title: 'Versailles Hall of Mirrors & Grand Musical Fountains Gardens Stroll',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 900,
          location: 'Versailles Grounds',
        },
        {
          title: 'Saint-Germain-des-Prés Historic Brasserie Dinner with Escargots & Wine',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 2800,
          location: 'Boulevard Saint-Germain',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Montmartre Bohemian Artists, Sacré-Cœur & Moulin Rouge',
      activities: [
        {
          title: 'Sacré-Cœur Hilltop Basilica & Place du Tertre Portrait Artists',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 300,
          location: 'Montmartre',
        },
        {
          title: 'Hidden Vineyards of Montmartre & Historic Windmills Walk',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 100,
          location: 'Rue Lepic',
        },
        {
          title: 'Famous Moulin Rouge Cabaret Exterior Photos & Pigalle Jazz Bistro',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 1900,
          location: 'Boulevard de Clichy',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Musée d’Orsay Impressionism & Latin Quarter Bookshops',
      activities: [
        {
          title: 'Musée d’Orsay Monet, Van Gogh & Renoir Masterpiece Gallery',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 1800,
          location: 'Esplanade Valéry Giscard d’Estaing',
        },
        {
          title: 'Shakespeare & Company Historic Bookshop & Latin Quarter Cobblestone Walk',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 400,
          location: 'Rue de la Bûcherie',
        },
        {
          title: 'French Macaron Tasting at Pierre Hermé & Luxembourg Gardens Relaxation',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 750,
          location: 'Jardin du Luxembourg',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Le Marais Fashion Boutiques, Centre Pompidou & Galeries Lafayette',
      activities: [
        {
          title: 'Le Marais Historic Mansions, Place des Vosges & Falafel on Rue des Rosiers',
          category: 'Food & Lifestyle',
          timeSlot: 'morning',
          estimatedCost: 650,
          location: '4th Arrondissement',
        },
        {
          title: 'Centre Pompidou Modern Art & Rooftop Parisian Chimney Views',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 1600,
          location: 'Place Georges-Pompidou',
        },
        {
          title: 'Galeries Lafayette Haussmann Art Nouveau Stained Glass Dome & Rooftop View',
          category: 'Shopping',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Boulevard Haussmann',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Île de la Cité, Notre-Dame Forecourt & Grand Farewell',
      activities: [
        {
          title: 'Sainte-Chapelle 13th-Century Dazzling Stained Glass Windows',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 1400,
          location: 'Île de la Cité',
        },
        {
          title: 'Artisan Perfume & French Cheese Tasting at Local Fromagerie',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 900,
          location: 'Rue Cler',
        },
        {
          title: 'Farewell Twilight Wine Toast beside River Seine & Airport Express',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 800,
          location: 'Charles de Gaulle CDG Airport',
        },
      ],
    },
  ],

  andaman: [
    {
      dayNumber: 1,
      theme: 'Arrival in Port Blair, Cellular Jail & Light and Sound Show',
      activities: [
        {
          title: 'Arrival at Veer Savarkar Airport & Hotel Check-in with Fresh Coconut Water',
          category: 'Food & Lifestyle',
          timeSlot: 'morning',
          estimatedCost: 100,
          location: 'Port Blair',
        },
        {
          title: 'Historic Cellular Jail National Memorial Guided Freedom Struggle Tour',
          category: 'Culture',
          timeSlot: 'afternoon',
          estimatedCost: 150,
          location: 'Atlanta Point',
        },
        {
          title: 'Cellular Jail Gripping Light & Sound Saga Narrated in Banyan Voice',
          category: 'Culture',
          timeSlot: 'evening',
          estimatedCost: 300,
          location: 'Cellular Jail Courtyard',
        },
      ],
    },
    {
      dayNumber: 2,
      theme: 'Makruzz Ferry to Havelock & Radhanagar Beach Sunset (Asia’s Best Beach)',
      activities: [
        {
          title: 'High-Speed Luxury Catamaran Makruzz Cruise to Havelock (Swaraj Dweep)',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 1800,
          location: 'Haddo Wharf to Havelock Jetty',
        },
        {
          title: 'Scooter Rental & Island Jungle Ride to Beach No. 7',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 500,
          location: 'Havelock Island',
        },
        {
          title: 'Radhanagar Beach Sunset Stroll on Powder-White Sands & Azure Surf',
          category: 'Beach',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Radhanagar Beach',
        },
      ],
    },
    {
      dayNumber: 3,
      theme: 'Elephant Beach Scuba Diving, Sea Walk & Living Corals',
      activities: [
        {
          title: 'Speedboat Ride through Mangroves to Elephant Beach',
          category: 'Adventure',
          timeSlot: 'morning',
          estimatedCost: 1000,
          location: 'Elephant Beach',
        },
        {
          title: 'PADI Certified Introductory Scuba Dive with Underwater Coral Photos',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 3500,
          location: 'Nemo Reef',
        },
        {
          title: 'Beachside Bamboo Shack Grilled Red Snapper & Tropical Fruit Juices',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 850,
          location: 'Govind Nagar Beach',
        },
      ],
    },
    {
      dayNumber: 4,
      theme: 'Neil Island (Shaheed Dweep) Natural Bridge & Bharatpur Water Sports',
      activities: [
        {
          title: 'Morning Ferry to Neil Island & Check-in at Eco Beach Resort',
          category: 'Nature',
          timeSlot: 'morning',
          estimatedCost: 1200,
          location: 'Neil Jetty',
        },
        {
          title: 'Bharatpur Beach Glass-Bottom Boat Ride over Brilliant Brain Corals',
          category: 'Adventure',
          timeSlot: 'afternoon',
          estimatedCost: 750,
          location: 'Bharatpur Beach',
        },
        {
          title: 'Howrah Bridge Live Rock Formation & Laxmanpur Beach Sunset',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 0,
          location: 'Laxmanpur Beach',
        },
      ],
    },
    {
      dayNumber: 5,
      theme: 'Kalapathar Turquoise Lagoon & Bioluminescence Night Kayaking',
      activities: [
        {
          title: 'Kalapathar Beach Contrasting Black Boulders & Emerald Waters Walk',
          category: 'Beach',
          timeSlot: 'morning',
          estimatedCost: 0,
          location: 'Kalapathar Beach',
        },
        {
          title: 'Coconut Grove Hammock Relaxation & Fresh Pineapple Smoothie',
          category: 'Food & Lifestyle',
          timeSlot: 'afternoon',
          estimatedCost: 200,
          location: 'Beach No. 5',
        },
        {
          title: 'Magical Bioluminescent Night Mangrove Kayaking Glowing Waters',
          category: 'Adventure',
          timeSlot: 'evening',
          estimatedCost: 2500,
          location: 'Havelock Mangrove Estuary',
        },
      ],
    },
    {
      dayNumber: 6,
      theme: 'Ross Island (Netaji Dweep) Deer Reserve & Chidiya Tapu Sunset',
      activities: [
        {
          title: 'Return Ferry to Port Blair & Boat to Historic Ross Island Ruins',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 600,
          location: 'Ross Island',
        },
        {
          title: 'Spotted Wild Deer Feeding & Peacocks under British Era Fig Trees',
          category: 'Nature',
          timeSlot: 'afternoon',
          estimatedCost: 100,
          location: 'Ross Island Forest',
        },
        {
          title: 'Chidiya Tapu Bird Island Clifftop Spectacular Sunset View',
          category: 'Nature',
          timeSlot: 'evening',
          estimatedCost: 400,
          location: 'Chidiya Tapu Biological Park',
        },
      ],
    },
    {
      dayNumber: 7,
      theme: 'Sagarika Govt Emporium Pearl Shopping & Farewell',
      activities: [
        {
          title: 'Samudrika Marine Naval Museum Aquarium & Coral Specimens',
          category: 'Culture',
          timeSlot: 'morning',
          estimatedCost: 100,
          location: 'Delanipur',
        },
        {
          title: 'Sagarika Govt Emporium Genuine Sea Shell & Mother of Pearl Crafts',
          category: 'Shopping',
          timeSlot: 'afternoon',
          estimatedCost: 750,
          location: 'Aberdeen Bazaar',
        },
        {
          title: 'Farewell Coastal Seafood Thali & Airport Boarding',
          category: 'Food & Lifestyle',
          timeSlot: 'evening',
          estimatedCost: 500,
          location: 'Veer Savarkar Terminal',
        },
      ],
    },
  ],
};

/**
 * Universal fallback dynamic activity generator for other destinations or days beyond 7.
 * Produces realistic, non-repeating day activities with smart theme progression.
 */
export function getDailyActivitiesForDestination(
  destId: string,
  destName: string,
  totalDays: number
): DayActivityBlueprint[] {
  // If we have explicit curated days for this destination:
  const curated = DESTINATION_DAILY_ACTIVITIES[destId];
  if (curated && curated.length > 0) {
    if (totalDays <= curated.length) {
      return curated.slice(0, totalDays);
    }
    // If totalDays > curated.length, keep curated and extend the rest dynamically:
    const result = [...curated];
    for (let d = curated.length + 1; d <= totalDays; d++) {
      result.push(generateDynamicDayActivities(destName, d));
    }
    return result;
  }

  // Otherwise, dynamically generate rich, unique activities for each day:
  const generated: DayActivityBlueprint[] = [];
  for (let day = 1; day <= totalDays; day++) {
    generated.push(generateDynamicDayActivities(destName, day));
  }
  return generated;
}

function generateDynamicDayActivities(destName: string, day: number): DayActivityBlueprint {
  const dayPatterns = [
    {
      theme: 'Arrival, Neighborhood Walk & Welcome Dinner',
      morning: {
        title: `Arrival, Check-in & Scenic Orientation Walk in ${destName}`,
        category: 'Food & Lifestyle' as const,
        cost: 150,
        slot: 'morning' as const,
        loc: 'Central District',
      },
      afternoon: {
        title: `City Center Promenade & Iconic Landmark Photography`,
        category: 'Culture' as const,
        cost: 250,
        slot: 'afternoon' as const,
        loc: 'Downtown Square',
      },
      evening: {
        title: `Sunset Viewpoint & Authentic Local Welcome Cuisine`,
        category: 'Food & Lifestyle' as const,
        cost: 650,
        slot: 'evening' as const,
        loc: 'Skyline Terrace',
      },
    },
    {
      theme: 'Historic Heritage, Royal Architecture & Cultural Marvels',
      morning: {
        title: `Guided UNESCO Heritage Monument & Ancient Fort Tour`,
        category: 'Culture' as const,
        cost: 400,
        slot: 'morning' as const,
        loc: 'Old City Quarters',
      },
      afternoon: {
        title: `National Art Museum & Royal Palace Courtyard Walk`,
        category: 'Culture' as const,
        cost: 350,
        slot: 'afternoon' as const,
        loc: 'Heritage Enclave',
      },
      evening: {
        title: `Traditional Folk Music, Classical Dance & Cultural Show`,
        category: 'Culture' as const,
        cost: 550,
        slot: 'evening' as const,
        loc: 'Amphitheatre',
      },
    },
    {
      theme: 'Outdoor Thrills, High-Altitude Trails & Watersports',
      morning: {
        title: `Morning Adventure Expedition & Guided Nature Trek`,
        category: 'Adventure' as const,
        cost: 1200,
        slot: 'morning' as const,
        loc: 'Valley Lookout',
      },
      afternoon: {
        title: `Thrilling Zipline / Water Thrills & Scenic Suspension Bridge`,
        category: 'Adventure' as const,
        cost: 1500,
        slot: 'afternoon' as const,
        loc: 'Adventure Park',
      },
      evening: {
        title: `Riverside / Beachside Acoustic Cafe & Local Street Food Crawl`,
        category: 'Food & Lifestyle' as const,
        cost: 450,
        slot: 'evening' as const,
        loc: 'River Promenade',
      },
    },
    {
      theme: 'Local Flavors, Cooking Workshop & Hidden Artisan Markets',
      morning: {
        title: `Organic Farm or Spice Plantation Walk with Herbal Tea Tasting`,
        category: 'Nature' as const,
        cost: 500,
        slot: 'morning' as const,
        loc: 'Countryside Estate',
      },
      afternoon: {
        title: `Master Culinary Cooking Class & Regional Delicacies Tasting`,
        category: 'Food & Lifestyle' as const,
        cost: 950,
        slot: 'afternoon' as const,
        loc: 'Culinary Studio',
      },
      evening: {
        title: `Vibrant Night Flea Market Stroll & Artisan Handicraft Browsing`,
        category: 'Shopping' as const,
        cost: 300,
        slot: 'evening' as const,
        loc: 'Bazaar Street',
      },
    },
    {
      theme: 'Nature Sanctuaries, Lake Boat Cruises & Scenic Reserves',
      morning: {
        title: `Wildlife Sanctuary Safari & Rare Birdwatching Walk`,
        category: 'Nature' as const,
        cost: 850,
        slot: 'morning' as const,
        loc: 'Bio Reserve',
      },
      afternoon: {
        title: `Tranquil Lake Boat Cruise & Secret Island Discovery`,
        category: 'Nature' as const,
        cost: 600,
        slot: 'afternoon' as const,
        loc: 'Mirror Lake',
      },
      evening: {
        title: `Clifftop Sunset Cocktail Lounge & Live Jazz Performance`,
        category: 'Food & Lifestyle' as const,
        cost: 750,
        slot: 'evening' as const,
        loc: 'Harbor Ridge',
      },
    },
    {
      theme: 'Holistic Wellness, Sacred Shrines & Panoramic Heights',
      morning: {
        title: `Sunrise Mountain Yoga & Mindful Meditation Session`,
        category: 'Wellness' as const,
        cost: 400,
        slot: 'morning' as const,
        loc: 'Hilltop Pavilion',
      },
      afternoon: {
        title: `Rejuvenating Herbal Spa & Traditional Thermal Spring Soak`,
        category: 'Wellness' as const,
        cost: 1600,
        slot: 'afternoon' as const,
        loc: 'Thermal Wellness Retreat',
      },
      evening: {
        title: `Panoramic Cable Car Ride & Twilight Stargazing Session`,
        category: 'Nature' as const,
        cost: 650,
        slot: 'evening' as const,
        loc: 'Summit Station',
      },
    },
    {
      theme: 'Artisan Souvenirs, Botanical Gardens & Grand Farewell',
      morning: {
        title: `Old Town Artisan Guilds & Ceramic Souvenir Workshop Hunt`,
        category: 'Shopping' as const,
        cost: 650,
        slot: 'morning' as const,
        loc: 'Artisans Alley',
      },
      afternoon: {
        title: `Royal Botanical Garden Glasshouse & Tropical Canopy Stroll`,
        category: 'Nature' as const,
        cost: 200,
        slot: 'afternoon' as const,
        loc: 'Botanical Gardens',
      },
      evening: {
        title: `Grand Farewell Feast & Celebration Skyline Photo Walk`,
        category: 'Food & Lifestyle' as const,
        cost: 1100,
        slot: 'evening' as const,
        loc: 'Signature Rooftop',
      },
    },
  ];

  const idx = (day - 1) % dayPatterns.length;
  const p = dayPatterns[idx];

  return {
    dayNumber: day,
    theme: p.theme,
    activities: [
      {
        title: p.morning.title,
        category: p.morning.category,
        timeSlot: p.morning.slot,
        estimatedCost: p.morning.cost,
        location: p.morning.loc,
      },
      {
        title: p.afternoon.title,
        category: p.afternoon.category,
        timeSlot: p.afternoon.slot,
        estimatedCost: p.afternoon.cost,
        location: p.afternoon.loc,
      },
      {
        title: p.evening.title,
        category: p.evening.category,
        timeSlot: p.evening.slot,
        estimatedCost: p.evening.cost,
        location: p.evening.loc,
      },
    ],
  };
}
