"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Users,
  Heart,
  Baby,
  Crown,
  Mountain,
  ChefHat,
  Building,
  Waves,
  TreePine,
  Music,
  ShoppingBag,
  User,
  Mail,
  Phone,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Camera,
  Palette,
  Gamepad2,
  Plane,
  Coffee,
  Wine,
  Dumbbell,
  BookOpen,
  Plus,
  Shield,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface TripData {
  destination: string
  travelStyle: string
  activities: string[]
  duration: number
  firstName: string
  lastName: string
  email: string
  phone: string
}

const destinations = [
  { name: "Paris", icon: "🗼", emoji: "🗼" },
  { name: "London", icon: "🎡", emoji: "🎡" },
  { name: "New York", icon: "🗽", emoji: "🗽" },
  { name: "Tokyo", icon: "🏮", emoji: "🏮" },
  { name: "Bali", icon: "🌴", emoji: "🌴" },
  { name: "Rome", icon: "🏛️", emoji: "🏛️" },
  { name: "Barcelona", icon: "🏖️", emoji: "🏖️" },
  { name: "Dubai", icon: "🏙️", emoji: "🏙️" },
]

const travelStyles = [
  { name: "Solo", icon: Users, description: "Independent exploration", color: "from-purple-500 to-pink-500" },
  { name: "Couple", icon: Heart, description: "Romantic getaway", color: "from-red-500 to-rose-500" },
  { name: "Family", icon: Baby, description: "Fun for all ages", color: "from-green-500 to-emerald-500" },
  { name: "Luxury", icon: Crown, description: "Premium experiences", color: "from-yellow-500 to-orange-500" },
  { name: "Adventure", icon: Mountain, description: "Thrilling activities", color: "from-blue-500 to-cyan-500" },
]

const activities = [
  { name: "Adventure", icon: Mountain, emoji: "🧗", color: "from-orange-400 to-red-500" },
  { name: "Food", icon: ChefHat, emoji: "🍜", color: "from-yellow-400 to-orange-500" },
  { name: "Museums", icon: Building, emoji: "🏛️", color: "from-purple-400 to-indigo-500" },
  { name: "Beaches", icon: Waves, emoji: "🏖️", color: "from-cyan-400 to-blue-500" },
  { name: "Hiking", icon: TreePine, emoji: "🌄", color: "from-green-400 to-emerald-500" },
  { name: "Nightlife", icon: Music, emoji: "🎶", color: "from-pink-400 to-purple-500" },
  { name: "Shopping", icon: ShoppingBag, emoji: "🛍️", color: "from-rose-400 to-pink-500" },
  { name: "Photography", icon: Camera, emoji: "📸", color: "from-indigo-400 to-purple-500" },
  { name: "Art & Culture", icon: Palette, emoji: "🎨", color: "from-violet-400 to-purple-500" },
  { name: "Sports", icon: Dumbbell, emoji: "⚽", color: "from-blue-400 to-indigo-500" },
  { name: "Gaming", icon: Gamepad2, emoji: "🎮", color: "from-cyan-400 to-teal-500" },
  { name: "Transportation", icon: Plane, emoji: "✈️", color: "from-sky-400 to-blue-500" },
  { name: "Coffee Culture", icon: Coffee, emoji: "☕", color: "from-amber-400 to-orange-500" },
  { name: "Wine Tasting", icon: Wine, emoji: "🍷", color: "from-red-400 to-rose-500" },
  { name: "Reading", icon: BookOpen, emoji: "📚", color: "from-emerald-400 to-green-500" },
]

// Comprehensive country-specific activities database
const countryActivities = {
  // Europe
  France: {
    Adventure: [
      "Climb the French Alps in Chamonix",
      "Kayak through the Ardèche Gorges",
      "Paraglide over the Loire Valley",
      "Cycle through Provence lavender fields",
    ],
    Food: [
      "Take a croissant-making class in a Parisian boulangerie",
      "Join a wine and cheese tasting in Bordeaux",
      "Learn to cook bouillabaisse in Marseille",
      "Visit truffle farms in Périgord",
    ],
    Museums: [
      "Explore the Louvre's hidden masterpieces with a curator",
      "Visit Musée d'Orsay for Impressionist art",
      "Discover the Palace of Versailles",
      "Tour the Musée Rodin sculpture gardens",
    ],
    Beaches: [
      "Relax on the glamorous beaches of Cannes",
      "Surf the Atlantic waves in Biarritz",
      "Explore the dramatic cliffs of Étretat",
      "Sunbathe in Saint-Tropez",
    ],
    Hiking: [
      "Trek the GR20 trail in Corsica",
      "Hike Mont Blanc circuit",
      "Walk the Camino de Santiago French route",
      "Explore Calanques National Park",
    ],
    Nightlife: [
      "Experience Parisian cabaret at Moulin Rouge",
      "Dance at underground clubs in Marseille",
      "Enjoy jazz bars in Saint-Germain",
      "Party on the French Riviera",
    ],
    Shopping: [
      "Browse vintage markets at Marché aux Puces",
      "Shop haute couture on Champs-Élysées",
      "Visit local artisan markets in Provence",
      "Explore antique shops in Lyon",
    ],
    "Art & Culture": [
      "Attend opera at Palais Garnier",
      "Visit Monet's gardens in Giverny",
      "Explore medieval villages in Dordogne",
      "Experience French theater festivals",
    ],
    Photography: [
      "Capture sunrise at Eiffel Tower",
      "Photograph lavender fields in Provence",
      "Document street art in Belleville",
      "Shoot château architecture in Loire Valley",
    ],
  },

  Italy: {
    Adventure: [
      "Climb the Dolomites via ferrata routes",
      "Explore Sicilian volcanoes",
      "Raft down the Noce River",
      "Rock climb in Cinque Terre",
    ],
    Food: [
      "Learn pasta making in Bologna",
      "Take a pizza class in Naples",
      "Join a gelato workshop in Florence",
      "Go truffle hunting in Umbria",
    ],
    Museums: [
      "Skip the lines at Vatican Museums",
      "Explore Uffizi Gallery masterpieces",
      "Visit Pompeii archaeological site",
      "Tour La Scala opera house",
    ],
    Beaches: [
      "Island hop in the Amalfi Coast",
      "Relax on Sardinian white sand beaches",
      "Explore hidden coves in Cinque Terre",
      "Sunbathe on Sicilian beaches",
    ],
    Hiking: [
      "Trek the Path of the Gods on Amalfi Coast",
      "Hike through Tuscan vineyards",
      "Walk the Via Francigena pilgrimage",
      "Explore Gran Paradiso National Park",
    ],
    Nightlife: [
      "Experience aperitivo culture in Milan",
      "Party in Trastevere, Rome",
      "Enjoy beach clubs on the Italian Riviera",
      "Dance at rooftop bars in Florence",
    ],
    Shopping: [
      "Browse leather markets in Florence",
      "Shop designer fashion in Milan",
      "Visit artisan workshops in Venice",
      "Explore vintage markets in Rome",
    ],
    "Art & Culture": [
      "Attend La Scala opera performance",
      "Visit Sistine Chapel",
      "Explore Renaissance art in Florence",
      "Experience traditional festivals in Siena",
    ],
    Photography: [
      "Capture golden hour at Colosseum",
      "Photograph Venetian canals",
      "Document Tuscan countryside",
      "Shoot architectural details in Rome",
    ],
  },

  Spain: {
    Adventure: [
      "Surf the Basque Country waves",
      "Climb in Picos de Europa",
      "Explore Andalusian caves",
      "Cycle the Camino de Santiago",
    ],
    Food: [
      "Learn flamenco and tapas in Seville",
      "Take a paella cooking class in Valencia",
      "Join a jamón ibérico tasting",
      "Visit pintxos bars in San Sebastián",
    ],
    Museums: [
      "Explore Prado Museum masterpieces",
      "Visit Guggenheim Bilbao",
      "Tour Picasso Museum Barcelona",
      "Discover Dalí Theatre-Museum",
    ],
    Beaches: [
      "Relax on Costa del Sol beaches",
      "Explore Balearic Islands",
      "Surf in Cantabria",
      "Visit secluded Galician coves",
    ],
    Hiking: [
      "Trek the Camino de Santiago",
      "Hike Picos de Europa peaks",
      "Walk through Andalusian white villages",
      "Explore Pyrenees mountains",
    ],
    Nightlife: [
      "Experience flamenco shows in Seville",
      "Party in Ibiza's world-famous clubs",
      "Enjoy late-night tapas culture",
      "Dance salsa in Barcelona",
    ],
    Shopping: [
      "Browse El Rastro flea market Madrid",
      "Shop for ceramics in Seville",
      "Visit local markets in Barcelona",
      "Find leather goods in Córdoba",
    ],
    "Art & Culture": [
      "Watch authentic flamenco performances",
      "Visit Alhambra palace",
      "Explore Gaudí's architecture",
      "Experience Holy Week processions",
    ],
    Photography: [
      "Capture Alhambra's intricate details",
      "Photograph Gaudí's Sagrada Familia",
      "Document flamenco dancers",
      "Shoot Spanish village architecture",
    ],
  },

  Germany: {
    Adventure: [
      "Hike the Black Forest trails",
      "Explore Bavarian Alps",
      "Cycle along the Rhine River",
      "Rock climb in Saxon Switzerland",
    ],
    Food: [
      "Join a beer brewing workshop",
      "Learn to make authentic pretzels",
      "Take a sausage-making class",
      "Visit Christmas markets for traditional treats",
    ],
    Museums: [
      "Explore Museum Island in Berlin",
      "Visit BMW and Mercedes museums",
      "Tour Neuschwanstein Castle",
      "Discover Pergamon Museum",
    ],
    Beaches: [
      "Relax on Baltic Sea islands",
      "Visit North Sea beaches",
      "Explore lake beaches in Bavaria",
      "Enjoy beach resorts on Rügen Island",
    ],
    Hiking: [
      "Trek the Romantic Road",
      "Hike Zugspitze, Germany's highest peak",
      "Walk the Berlin Wall trail",
      "Explore Rhine Valley vineyards",
    ],
    Nightlife: [
      "Experience Berlin's legendary club scene",
      "Enjoy beer gardens in Munich",
      "Party at Oktoberfest",
      "Explore Hamburg's Reeperbahn",
    ],
    Shopping: [
      "Browse Christmas markets",
      "Shop at KaDeWe department store",
      "Visit flea markets in Berlin",
      "Explore traditional craft shops",
    ],
    "Art & Culture": [
      "Attend Berlin Philharmonic concerts",
      "Visit Bauhaus museums",
      "Experience Wagner operas in Bayreuth",
      "Explore medieval towns",
    ],
    Photography: [
      "Capture Brandenburg Gate",
      "Photograph Neuschwanstein Castle",
      "Document Berlin street art",
      "Shoot Rhine Valley landscapes",
    ],
  },

  "United Kingdom": {
    Adventure: [
      "Hike the Scottish Highlands",
      "Surf in Cornwall",
      "Explore Welsh mountains",
      "Rock climb in Lake District",
    ],
    Food: [
      "Learn traditional fish and chips making",
      "Take afternoon tea etiquette class",
      "Join a whisky tasting in Scotland",
      "Visit local pubs for authentic cuisine",
    ],
    Museums: [
      "Explore British Museum treasures",
      "Visit Tate Modern art",
      "Tour Tower of London",
      "Discover Natural History Museum",
    ],
    Beaches: [
      "Surf the waves in Cornwall",
      "Explore Scottish island beaches",
      "Visit Brighton's pebble beaches",
      "Discover hidden Welsh coves",
    ],
    Hiking: ["Walk Hadrian's Wall", "Trek Ben Nevis", "Hike the Cotswolds", "Explore Peak District trails"],
    Nightlife: [
      "Experience London's pub culture",
      "Enjoy Edinburgh's festival scene",
      "Party in Manchester's music venues",
      "Explore Cardiff's nightlife",
    ],
    Shopping: [
      "Browse Camden Market",
      "Shop on Oxford Street",
      "Visit Portobello Road antiques",
      "Explore Edinburgh's Royal Mile",
    ],
    "Art & Culture": [
      "Watch West End theater shows",
      "Visit Shakespeare's Globe",
      "Explore Edinburgh Castle",
      "Experience traditional Highland games",
    ],
    Photography: [
      "Capture Big Ben and Parliament",
      "Photograph Scottish castles",
      "Document London street scenes",
      "Shoot dramatic coastlines",
    ],
  },

  // Asia
  Japan: {
    Adventure: [
      "Climb Mount Fuji",
      "Ski in Hokkaido powder snow",
      "Explore Japanese Alps",
      "Cycle through rural countryside",
    ],
    Food: [
      "Learn sushi making with a master chef",
      "Take a ramen cooking class",
      "Join a sake brewery tour",
      "Experience kaiseki dining",
    ],
    Museums: [
      "Visit Tokyo National Museum",
      "Explore Hiroshima Peace Memorial",
      "Tour traditional temples",
      "Discover manga and anime museums",
    ],
    Beaches: [
      "Relax on Okinawa's tropical beaches",
      "Visit hot spring beach resorts",
      "Explore coastal onsen towns",
      "Enjoy beach festivals",
    ],
    Hiking: [
      "Trek the Kumano Kodo pilgrimage trails",
      "Hike through bamboo forests",
      "Explore volcanic landscapes",
      "Walk ancient mountain paths",
    ],
    Nightlife: [
      "Experience Tokyo's neon-lit districts",
      "Enjoy karaoke culture",
      "Visit traditional izakayas",
      "Explore Osaka's entertainment districts",
    ],
    Shopping: [
      "Browse Tokyo's electronics districts",
      "Shop for traditional crafts",
      "Visit anime and manga stores",
      "Explore vintage kimono markets",
    ],
    "Art & Culture": [
      "Attend traditional tea ceremonies",
      "Watch kabuki theater",
      "Experience cherry blossom festivals",
      "Visit ancient temples and shrines",
    ],
    Photography: [
      "Capture Mount Fuji's beauty",
      "Photograph cherry blossoms",
      "Document traditional architecture",
      "Shoot neon-lit cityscapes",
    ],
  },

  China: {
    Adventure: [
      "Hike the Great Wall of China",
      "Explore Zhangjiajie's floating mountains",
      "Raft down Li River",
      "Trek Tiger Leaping Gorge",
    ],
    Food: [
      "Learn Peking duck preparation",
      "Take dim sum cooking classes",
      "Join hot pot experiences",
      "Visit traditional tea ceremonies",
    ],
    Museums: ["Explore Forbidden City", "Visit Terracotta Army", "Tour Shanghai Museum", "Discover Palace Museum"],
    Beaches: [
      "Relax on Hainan Island beaches",
      "Explore coastal cities",
      "Visit tropical resort areas",
      "Enjoy beach activities in Sanya",
    ],
    Hiking: [
      "Trek sections of the Great Wall",
      "Hike Yellow Mountains",
      "Explore Jiuzhaigou Valley",
      "Walk through rice terraces",
    ],
    Nightlife: [
      "Experience Shanghai's Bund nightlife",
      "Enjoy Beijing's hutong bars",
      "Party in Hong Kong",
      "Explore Guangzhou's entertainment",
    ],
    Shopping: [
      "Browse Beijing's silk markets",
      "Shop in Shanghai's fashion districts",
      "Visit traditional craft markets",
      "Explore electronics markets",
    ],
    "Art & Culture": [
      "Watch Peking opera performances",
      "Visit ancient temples",
      "Experience traditional festivals",
      "Learn calligraphy and painting",
    ],
    Photography: [
      "Capture the Great Wall",
      "Photograph traditional architecture",
      "Document rural landscapes",
      "Shoot modern cityscapes",
    ],
  },

  India: {
    Adventure: [
      "Trek in the Himalayas",
      "Explore Rajasthan deserts",
      "White water raft in Rishikesh",
      "Rock climb in Hampi",
    ],
    Food: [
      "Learn curry cooking in Kerala",
      "Take street food tours",
      "Join spice market visits",
      "Experience traditional thali meals",
    ],
    Museums: [
      "Explore Red Fort Delhi",
      "Visit Ajanta and Ellora caves",
      "Tour City Palace Udaipur",
      "Discover National Museum",
    ],
    Beaches: [
      "Relax on Goa's golden beaches",
      "Explore Kerala backwaters",
      "Visit Andaman Islands",
      "Enjoy beach yoga retreats",
    ],
    Hiking: [
      "Trek to Everest Base Camp",
      "Hike in Western Ghats",
      "Explore hill stations",
      "Walk through tea plantations",
    ],
    Nightlife: [
      "Experience Goa's beach parties",
      "Enjoy Mumbai's club scene",
      "Party in Delhi's nightlife districts",
      "Explore Bangalore's pub culture",
    ],
    Shopping: [
      "Browse Delhi's Chandni Chowk",
      "Shop for textiles in Jaipur",
      "Visit spice markets",
      "Explore handicraft bazaars",
    ],
    "Art & Culture": [
      "Watch classical dance performances",
      "Visit the Taj Mahal",
      "Experience Holi festival",
      "Learn yoga and meditation",
    ],
    Photography: [
      "Capture the Taj Mahal",
      "Photograph colorful festivals",
      "Document street life",
      "Shoot palace architecture",
    ],
  },

  Thailand: {
    Adventure: [
      "Rock climb in Krabi",
      "Jungle trek in Chiang Mai",
      "Scuba dive in Koh Tao",
      "Explore caves in Phang Nga",
    ],
    Food: [
      "Learn Thai cooking in Bangkok",
      "Take street food tours",
      "Join fruit carving classes",
      "Experience floating market cuisine",
    ],
    Museums: [
      "Visit Grand Palace Bangkok",
      "Explore National Museum",
      "Tour ancient temples",
      "Discover Jim Thompson House",
    ],
    Beaches: ["Island hop in Phi Phi", "Relax on Phuket beaches", "Explore Koh Samui", "Visit secluded Koh Lipe"],
    Hiking: [
      "Trek to hill tribe villages",
      "Hike in national parks",
      "Explore jungle waterfalls",
      "Walk through rice terraces",
    ],
    Nightlife: [
      "Experience Bangkok's rooftop bars",
      "Party on Full Moon beaches",
      "Enjoy Phuket's nightlife",
      "Explore night markets",
    ],
    Shopping: [
      "Browse Chatuchak Weekend Market",
      "Shop for silk in Chiang Mai",
      "Visit floating markets",
      "Explore night bazaars",
    ],
    "Art & Culture": [
      "Watch traditional Thai dance",
      "Visit Buddhist temples",
      "Experience Songkran festival",
      "Learn traditional crafts",
    ],
    Photography: [
      "Capture temple architecture",
      "Photograph floating markets",
      "Document island landscapes",
      "Shoot cultural festivals",
    ],
  },

  // Americas
  "United States": {
    Adventure: ["Hike the Grand Canyon", "Surf in Hawaii", "Rock climb in Yosemite", "Explore Yellowstone wilderness"],
    Food: [
      "Learn BBQ techniques in Texas",
      "Take food tours in New York",
      "Experience farm-to-table in California",
      "Join bourbon tastings in Kentucky",
    ],
    Museums: ["Explore Smithsonian museums", "Visit MoMA in New York", "Tour Getty Center", "Discover Field Museum"],
    Beaches: [
      "Surf California's coast",
      "Relax on Florida beaches",
      "Explore Hawaiian islands",
      "Visit Maine's rocky shores",
    ],
    Hiking: [
      "Trek Appalachian Trail sections",
      "Hike Pacific Coast Trail",
      "Explore Rocky Mountain peaks",
      "Walk through redwood forests",
    ],
    Nightlife: [
      "Experience Las Vegas shows",
      "Enjoy New York's club scene",
      "Party in Miami's South Beach",
      "Explore Nashville's music venues",
    ],
    Shopping: [
      "Browse New York's Fifth Avenue",
      "Shop in California's outlets",
      "Visit local farmers markets",
      "Explore vintage stores",
    ],
    "Art & Culture": [
      "Watch Broadway shows",
      "Visit Hollywood studios",
      "Experience jazz in New Orleans",
      "Explore Native American culture",
    ],
    Photography: [
      "Capture iconic landmarks",
      "Photograph national parks",
      "Document city skylines",
      "Shoot diverse landscapes",
    ],
  },

  Brazil: {
    Adventure: [
      "Explore Amazon rainforest",
      "Climb Sugarloaf Mountain",
      "Surf in Florianópolis",
      "Trek in Chapada Diamantina",
    ],
    Food: [
      "Learn to make feijoada",
      "Take caipirinha mixing classes",
      "Join churrasco experiences",
      "Explore street food markets",
    ],
    Museums: [
      "Visit São Paulo Art Museum",
      "Explore National Museum Rio",
      "Tour Oscar Niemeyer Museum",
      "Discover Oscar Niemeyer Museum",
    ],
    Beaches: [
      "Party on Copacabana beach",
      "Relax in Fernando de Noronha",
      "Surf in Florianópolis",
      "Explore Bahian coastline",
    ],
    Hiking: [
      "Trek in Atlantic Forest",
      "Hike Pedra da Gávea",
      "Explore Iguazu Falls trails",
      "Walk through Pantanal wetlands",
    ],
    Nightlife: [
      "Experience Rio's samba clubs",
      "Party in São Paulo",
      "Enjoy beach parties",
      "Dance forró in Northeast",
    ],
    Shopping: [
      "Browse São Paulo's fashion districts",
      "Shop at local markets",
      "Visit artisan craft fairs",
      "Explore vintage stores",
    ],
    "Art & Culture": [
      "Experience Carnival celebrations",
      "Watch samba performances",
      "Visit colonial towns",
      "Learn capoeira",
    ],
    Photography: [
      "Capture Christ the Redeemer",
      "Photograph Carnival parades",
      "Document Amazon wildlife",
      "Shoot beach culture",
    ],
  },

  Mexico: {
    Adventure: [
      "Explore cenotes in Yucatan",
      "Climb Mayan pyramids",
      "Surf Pacific coast waves",
      "Cave dive in underwater rivers",
    ],
    Food: [
      "Learn authentic taco making",
      "Take mole cooking classes",
      "Join tequila and mezcal tastings",
      "Experience street food tours",
    ],
    Museums: [
      "Visit National Museum of Anthropology",
      "Explore Frida Kahlo Museum",
      "Tour Templo Mayor",
      "Discover Palacio de Bellas Artes",
    ],
    Beaches: [
      "Relax in Cancun and Riviera Maya",
      "Surf in Puerto Escondido",
      "Explore Baja California coast",
      "Visit Pacific coast beaches",
    ],
    Hiking: [
      "Trek ancient Mayan ruins",
      "Hike volcanic peaks",
      "Explore desert landscapes",
      "Walk through cloud forests",
    ],
    Nightlife: [
      "Experience Mexico City's cantinas",
      "Party in Playa del Carmen",
      "Enjoy mariachi music",
      "Dance at beach clubs",
    ],
    Shopping: [
      "Browse local markets",
      "Shop for handicrafts",
      "Visit artisan villages",
      "Explore silver jewelry shops",
    ],
    "Art & Culture": [
      "Experience Day of the Dead celebrations",
      "Watch folkloric dance",
      "Visit ancient ruins",
      "Learn traditional crafts",
    ],
    Photography: [
      "Capture colorful colonial architecture",
      "Photograph ancient ruins",
      "Document cultural festivals",
      "Shoot desert landscapes",
    ],
  },

  // Africa
  Egypt: {
    Adventure: ["Explore the Sahara Desert", "Dive in the Red Sea", "Climb Mount Sinai", "Sail the Nile River"],
    Food: [
      "Learn to make traditional ful medames",
      "Take Egyptian bread baking classes",
      "Join spice market tours",
      "Experience Nubian cuisine",
    ],
    Museums: [
      "Explore Egyptian Museum Cairo",
      "Visit Luxor Museum",
      "Tour Coptic Museum",
      "Discover Alexandria museums",
    ],
    Beaches: ["Relax on Red Sea resorts", "Dive in coral reefs", "Explore Mediterranean coast", "Visit Sinai beaches"],
    Hiking: [
      "Trek in Sinai Peninsula",
      "Explore desert oases",
      "Hike around ancient sites",
      "Walk through Nubian villages",
    ],
    Nightlife: [
      "Experience Cairo's cultural shows",
      "Enjoy Nile dinner cruises",
      "Party in Red Sea resorts",
      "Explore traditional cafes",
    ],
    Shopping: [
      "Browse Khan el-Khalili bazaar",
      "Shop for papyrus art",
      "Visit spice markets",
      "Explore handicraft shops",
    ],
    "Art & Culture": [
      "Visit the Pyramids of Giza",
      "Explore Valley of the Kings",
      "Experience traditional music",
      "Learn hieroglyphics",
    ],
    Photography: [
      "Capture the Great Pyramids",
      "Photograph ancient temples",
      "Document Nile landscapes",
      "Shoot desert scenes",
    ],
  },

  "South Africa": {
    Adventure: [
      "Safari in Kruger National Park",
      "Cage dive with great whites",
      "Bungee jump from Bloukrans Bridge",
      "Hike Table Mountain",
    ],
    Food: ["Learn to make bobotie", "Join wine tasting tours", "Experience braai culture", "Take cooking classes"],
    Museums: ["Visit Apartheid Museum", "Explore Zeitz Museum", "Tour Robben Island", "Discover cultural villages"],
    Beaches: [
      "Surf in Jeffrey's Bay",
      "Relax on Cape Town beaches",
      "Explore Garden Route coast",
      "Visit penguin colonies",
    ],
    Hiking: [
      "Trek Drakensberg Mountains",
      "Hike Cape Peninsula",
      "Explore Blyde River Canyon",
      "Walk wine estate trails",
    ],
    Nightlife: [
      "Experience Cape Town's nightlife",
      "Enjoy jazz clubs in Johannesburg",
      "Party at beach bars",
      "Explore local shebeens",
    ],
    Shopping: ["Browse V&A Waterfront", "Shop for African crafts", "Visit local markets", "Explore diamond districts"],
    "Art & Culture": [
      "Experience traditional dance",
      "Visit cultural townships",
      "Learn about apartheid history",
      "Explore San rock art",
    ],
    Photography: [
      "Capture Big Five wildlife",
      "Photograph dramatic landscapes",
      "Document cultural diversity",
      "Shoot wine country",
    ],
  },

  // Oceania
  Australia: {
    Adventure: ["Surf at Bondi Beach", "Explore the Outback", "Dive the Great Barrier Reef", "Hike in Blue Mountains"],
    Food: [
      "Learn bush tucker cooking",
      "Take wine tours in Barossa",
      "Experience meat pie making",
      "Join seafood cooking classes",
    ],
    Museums: [
      "Visit Australian Museum",
      "Explore National Gallery",
      "Tour Melbourne Museum",
      "Discover Aboriginal cultural centers",
    ],
    Beaches: [
      "Surf Gold Coast waves",
      "Relax on Whitehaven Beach",
      "Explore Tasmania's beaches",
      "Visit secluded Western Australia coves",
    ],
    Hiking: ["Trek Overland Track Tasmania", "Hike Uluru base walk", "Explore Grampians peaks", "Walk coastal trails"],
    Nightlife: [
      "Experience Melbourne's lane culture",
      "Party in Sydney's bars",
      "Enjoy Perth's rooftop venues",
      "Explore Brisbane's nightlife",
    ],
    Shopping: [
      "Browse Queen Victoria Market",
      "Shop in Sydney's districts",
      "Visit local craft markets",
      "Explore vintage stores",
    ],
    "Art & Culture": [
      "Learn about Aboriginal culture",
      "Experience didgeridoo music",
      "Visit art galleries",
      "Explore colonial history",
    ],
    Photography: [
      "Capture Sydney Opera House",
      "Photograph Uluru",
      "Document unique wildlife",
      "Shoot coastal landscapes",
    ],
  },

  "New Zealand": {
    Adventure: ["Bungee jump in Queenstown", "Explore glowworm caves", "Hike Milford Track", "Ski Southern Alps"],
    Food: [
      "Learn Maori hangi cooking",
      "Take wine tours in Marlborough",
      "Experience farm-to-table dining",
      "Join seafood experiences",
    ],
    Museums: [
      "Visit Te Papa Museum",
      "Explore Auckland Museum",
      "Tour Waitangi Treaty Grounds",
      "Discover local history",
    ],
    Beaches: ["Surf at Raglan", "Relax on Bay of Islands", "Explore Abel Tasman coast", "Visit black sand beaches"],
    Hiking: ["Trek Great Walks", "Hike Franz Josef Glacier", "Explore Tongariro crossing", "Walk coastal tracks"],
    Nightlife: [
      "Experience Wellington's craft beer scene",
      "Party in Auckland",
      "Enjoy Queenstown's bars",
      "Explore local pubs",
    ],
    Shopping: ["Browse local craft markets", "Shop for Maori art", "Visit farmers markets", "Explore vintage stores"],
    "Art & Culture": [
      "Experience Maori culture",
      "Watch haka performances",
      "Visit art galleries",
      "Learn traditional crafts",
    ],
    Photography: [
      "Capture dramatic landscapes",
      "Photograph Milford Sound",
      "Document Maori culture",
      "Shoot adventure sports",
    ],
  },

  // Add more countries as needed...
  Default: {
    Adventure: [
      "Explore local hiking trails and natural wonders",
      "Try regional adventure sports",
      "Discover hidden outdoor gems",
      "Experience unique local adventures",
    ],
    Food: [
      "Learn traditional cooking techniques",
      "Join local food tours and tastings",
      "Visit authentic restaurants and markets",
      "Experience regional culinary specialties",
    ],
    Museums: [
      "Visit major cultural institutions",
      "Explore local history museums",
      "Discover art galleries",
      "Tour significant historical sites",
    ],
    Beaches: [
      "Relax on beautiful coastlines",
      "Try water sports and activities",
      "Explore coastal towns",
      "Enjoy beachside dining",
    ],
    Hiking: [
      "Trek through scenic landscapes",
      "Explore national parks",
      "Walk historic trails",
      "Discover mountain paths",
    ],
    Nightlife: [
      "Experience local entertainment venues",
      "Enjoy traditional music and dance",
      "Visit popular bars and clubs",
      "Explore night markets",
    ],
    Shopping: [
      "Browse local markets and bazaars",
      "Shop for traditional crafts",
      "Visit artisan workshops",
      "Explore unique boutiques",
    ],
    "Art & Culture": [
      "Attend cultural performances",
      "Visit historical landmarks",
      "Experience local festivals",
      "Learn traditional arts",
    ],
    Photography: [
      "Capture iconic landmarks",
      "Photograph local culture",
      "Document natural beauty",
      "Shoot architectural details",
    ],
  },
}

export default function DreamTripGenerator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [tripData, setTripData] = useState<TripData>({
    destination: "",
    travelStyle: "",
    activities: [],
    duration: 7,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [customDestination, setCustomDestination] = useState("")
  const [customActivity, setCustomActivity] = useState("")
  const [generatedItinerary, setGeneratedItinerary] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitLeadData = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: tripData.firstName,
          lastName: tripData.lastName,
          email: tripData.email,
          phone: tripData.phone,
          destination: tripData.destination || customDestination,
          travelStyle: tripData.travelStyle,
          activities: tripData.activities,
          duration: tripData.duration,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Information saved successfully! 🎉",
          description: "We'll contact you soon with your personalized travel plan.",
        })
        return true
      } else {
        throw new Error(result.error || "Failed to save information")
      }
    } catch (error) {
      console.error("Error submitting lead:", error)
      toast({
        title: "Error saving information",
        description: "Please try again or contact support.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateItinerary = () => {
    const destination = tripData.destination || customDestination
    const itinerary = []

    // Get country-specific activities or use default
    const countryKey =
      Object.keys(countryActivities).find(
        (country) =>
          destination.toLowerCase().includes(country.toLowerCase()) ||
          country.toLowerCase().includes(destination.toLowerCase()),
      ) || "Default"

    const countrySpecificActivities =
      countryActivities[countryKey as keyof typeof countryActivities] || countryActivities.Default

    // Add custom activities to templates if provided
    const allActivities = [...tripData.activities]
    if (customActivity && !allActivities.includes(customActivity)) {
      allActivities.push(customActivity)
    }

    for (let day = 1; day <= tripData.duration; day++) {
      const dayActivities = []
      const numActivities = day <= 3 ? 3 : Math.floor(Math.random() * 2) + 2 // 2-3 activities per day, more for first few days

      for (let i = 0; i < numActivities; i++) {
        const randomActivity = allActivities[Math.floor(Math.random() * allActivities.length)]

        // Get country-specific activities for this activity type
        const activityTemplates = countrySpecificActivities[randomActivity as keyof typeof countrySpecificActivities] ||
          countrySpecificActivities.Adventure || ["Explore amazing local attractions and experiences"]

        const activity = activityTemplates[Math.floor(Math.random() * activityTemplates.length)]
        const emoji = activities.find((a) => a.name === randomActivity)?.emoji || "✨"

        dayActivities.push({
          activity: activity,
          emoji,
          time: i === 0 ? "Morning" : i === 1 ? "Afternoon" : "Evening",
        })
      }

      itinerary.push({
        day,
        activities: dayActivities,
        location: destination,
        country: countryKey !== "Default" ? countryKey : destination,
      })
    }

    setGeneratedItinerary(itinerary)
  }

  const nextStep = async () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit lead data before generating itinerary
      const success = await submitLeadData()
      if (success) {
        generateItinerary()
        setCurrentStep(6)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const selectDestination = (destination: string) => {
    setTripData({ ...tripData, destination })
    setCustomDestination("")
  }

  const selectTravelStyle = (style: string) => {
    setTripData({ ...tripData, travelStyle: style })
  }

  const toggleActivity = (activity: string) => {
    const newActivities = tripData.activities.includes(activity)
      ? tripData.activities.filter((a) => a !== activity)
      : [...tripData.activities, activity]
    setTripData({ ...tripData, activities: newActivities })
  }

  const addCustomActivity = () => {
    if (customActivity && !tripData.activities.includes(customActivity)) {
      setTripData({ ...tripData, activities: [...tripData.activities, customActivity] })
      setCustomActivity("")
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return tripData.destination || customDestination
      case 2:
        return tripData.travelStyle
      case 3:
        return tripData.activities.length > 0 || customActivity
      case 4:
        return tripData.duration > 0
      case 5:
        return (
          tripData.firstName.trim() && tripData.lastName.trim() && tripData.email.trim() && tripData.email.includes("@")
        )
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Welcome Screen */}
        {currentStep === 0 && (
          <div className="text-center space-y-8 animate-in fade-in duration-500">
            <div className="space-y-6">
              <div className="text-8xl mb-6 animate-bounce">✈️</div>
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                Build Your Dream Trip
              </h1>
              <p className="text-2xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Get a customized, day-by-day travel plan with authentic local experiences — delivered personally to you
              </p>
            </div>
            <Button
              onClick={nextStep}
              size="lg"
              className="text-xl px-12 py-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="mr-3 h-6 w-6" />
              Start Planning Your Adventure
            </Button>
          </div>
        )}

        {/* Destination Selection */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Where do you want to go?
              </h2>
              <p className="text-xl text-gray-600">Choose a destination or enter your own</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {destinations.map((dest) => (
                <Button
                  key={dest.name}
                  variant={tripData.destination === dest.name ? "default" : "outline"}
                  className={`h-32 flex-col space-y-3 text-lg border-2 transition-all duration-300 hover:scale-105 ${
                    tripData.destination === dest.name
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-xl"
                      : "hover:border-purple-300 hover:shadow-lg"
                  }`}
                  onClick={() => selectDestination(dest.name)}
                >
                  <span className="text-4xl">{dest.emoji}</span>
                  <span className="font-semibold">{dest.name}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-3">
              <label className="text-lg font-medium text-gray-700">Or enter a custom destination:</label>
              <Input
                placeholder="e.g., Iceland, Morocco, Peru, Vietnam..."
                value={customDestination}
                onChange={(e) => setCustomDestination(e.target.value)}
                className="text-lg py-8 border-2 border-purple-200 focus:border-purple-500 rounded-xl"
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} className="px-8 py-4 text-lg bg-transparent">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Travel Style */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                How do you want to travel?
              </h2>
              <p className="text-xl text-gray-600">Choose your travel style</p>
            </div>

            <div className="space-y-6">
              {travelStyles.map((style) => {
                const IconComponent = style.icon
                return (
                  <Button
                    key={style.name}
                    variant="outline"
                    className={`w-full h-20 justify-start text-lg border-2 transition-all duration-300 hover:scale-102 ${
                      tripData.travelStyle === style.name
                        ? `bg-gradient-to-r ${style.color} text-white shadow-xl border-transparent`
                        : "hover:border-purple-300 hover:shadow-lg"
                    }`}
                    onClick={() => selectTravelStyle(style.name)}
                  >
                    <IconComponent className="mr-6 h-8 w-8" />
                    <div className="text-left">
                      <div className="font-bold text-xl">{style.name}</div>
                      <div className="text-base opacity-80">{style.description}</div>
                    </div>
                  </Button>
                )
              })}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} className="px-8 py-4 text-lg bg-transparent">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="px-8 py-4 text-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Activities */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                What do you love to do when you travel?
              </h2>
              <p className="text-xl text-gray-600">Select all that apply or add your own</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {activities.map((activity) => {
                const IconComponent = activity.icon
                const isSelected = tripData.activities.includes(activity.name)
                return (
                  <Button
                    key={activity.name}
                    variant="outline"
                    className={`h-28 flex-col space-y-2 text-base relative border-2 transition-all duration-300 hover:scale-105 ${
                      isSelected
                        ? `bg-gradient-to-br ${activity.color} text-white shadow-xl border-transparent`
                        : "hover:border-pink-300 hover:shadow-lg"
                    }`}
                    onClick={() => toggleActivity(activity.name)}
                  >
                    {isSelected && <Check className="absolute top-2 right-2 h-5 w-5" />}
                    <span className="text-3xl">{activity.emoji}</span>
                    <span className="font-semibold text-center leading-tight">{activity.name}</span>
                  </Button>
                )
              })}
            </div>

            <div className="space-y-4 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-pink-200">
              <label className="text-lg font-medium text-gray-700">Add your own activity:</label>
              <div className="flex gap-3">
                <Input
                  placeholder="e.g., Yoga retreats, Cooking classes, Volunteering..."
                  value={customActivity}
                  onChange={(e) => setCustomActivity(e.target.value)}
                  className="text-lg py-6 border-2 border-pink-200 focus:border-pink-500 rounded-xl flex-1"
                />
                <Button
                  onClick={addCustomActivity}
                  disabled={!customActivity}
                  className="px-6 py-6 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
              {tripData.activities.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tripData.activities.map((activity) => (
                    <Badge key={activity} variant="secondary" className="text-sm py-1 px-3">
                      {activities.find((a) => a.name === activity)?.emoji || "✨"} {activity}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} className="px-8 py-4 text-lg bg-transparent">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="px-8 py-4 text-lg bg-gradient-to-r from-pink-500 to-orange-600 hover:from-pink-600 hover:to-orange-700"
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Duration with Slider */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                How many days do you want to travel?
              </h2>
              <p className="text-xl text-gray-600">Slide to choose your perfect trip duration</p>
            </div>

            <div className="space-y-8 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-200">
              <div className="text-center">
                <div className="text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  {tripData.duration}
                </div>
                <div className="text-2xl text-gray-700 font-semibold">{tripData.duration === 1 ? "day" : "days"}</div>
              </div>

              <div className="px-4">
                <Slider
                  value={[tripData.duration]}
                  onValueChange={(value) => setTripData({ ...tripData, duration: value[0] })}
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>1 day</span>
                  <span>30 days</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 mt-6">
                {[3, 7, 14, 21].map((days) => (
                  <Button
                    key={days}
                    variant="outline"
                    size="sm"
                    onClick={() => setTripData({ ...tripData, duration: days })}
                    className="py-3 hover:bg-cyan-50 hover:border-cyan-300"
                  >
                    {days} days
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} className="px-8 py-4 text-lg bg-transparent">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="px-8 py-4 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
              >
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Lead Capture Form */}
        {currentStep === 5 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Get Your Personalized Travel Plan
              </h2>
              <p className="text-xl text-gray-600">We'll create your custom itinerary and contact you personally</p>
            </div>

            <div className="space-y-6 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="mr-2 h-4 w-4 text-emerald-500" />
                    First Name *
                  </label>
                  <Input
                    placeholder="John"
                    value={tripData.firstName}
                    onChange={(e) => setTripData({ ...tripData, firstName: e.target.value })}
                    className="text-lg py-6 border-2 border-emerald-200 focus:border-emerald-500 rounded-xl"
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <User className="mr-2 h-4 w-4 text-emerald-500" />
                    Last Name *
                  </label>
                  <Input
                    placeholder="Doe"
                    value={tripData.lastName}
                    onChange={(e) => setTripData({ ...tripData, lastName: e.target.value })}
                    className="text-lg py-6 border-2 border-emerald-200 focus:border-emerald-500 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-emerald-500" />
                  Email Address *
                </label>
                <Input
                  type="email"
                  placeholder="john.doe@example.com"
                  value={tripData.email}
                  onChange={(e) => setTripData({ ...tripData, email: e.target.value })}
                  className="text-lg py-6 border-2 border-emerald-200 focus:border-emerald-500 rounded-xl"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-emerald-500" />
                  Phone Number (Optional)
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={tripData.phone}
                  onChange={(e) => setTripData({ ...tripData, phone: e.target.value })}
                  className="text-lg py-6 border-2 border-emerald-200 focus:border-emerald-500 rounded-xl"
                />
              </div>

              {/* Privacy Notice */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-emerald-800">
                    <p className="font-semibold mb-1">Your information is secure</p>
                    <p>
                      We'll use your details to create your personalized travel plan and contact you with exclusive
                      travel opportunities. Your information is never shared with third parties.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center">
                * Required fields. We'll contact you within 24 hours with your custom itinerary.
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} className="px-8 py-4 text-lg bg-transparent">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                disabled={!canProceed() || isSubmitting}
                className="px-8 py-4 text-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Your Plan...
                  </>
                ) : (
                  <>
                    Generate My Trip
                    <Sparkles className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Generated Itinerary */}
        {currentStep === 6 && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🗺️</div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Here's Your Authentic Dream Trip
              </h2>
              <p className="text-xl text-gray-600">
                {tripData.duration} amazing days in {tripData.destination || customDestination}
              </p>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                <p className="text-green-800 font-semibold">
                  👋 Hi {tripData.firstName}! We're preparing your detailed travel plan and will contact you within 24
                  hours.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {tripData.activities.map((activity) => (
                  <Badge
                    key={activity}
                    variant="secondary"
                    className="text-base py-2 px-4 bg-gradient-to-r from-purple-100 to-pink-100"
                  >
                    {activities.find((a) => a.name === activity)?.emoji || "✨"} {activity}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-6 max-h-96 overflow-y-auto">
              {generatedItinerary.map((day) => (
                <Card
                  key={day.day}
                  className="hover:shadow-xl transition-all duration-300 border-2 border-purple-100 bg-gradient-to-r from-white to-purple-50/30"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                          {day.day}
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <h3 className="font-bold text-2xl text-gray-900 mb-4">
                          Day {day.day} in {day.location}
                        </h3>
                        <div className="space-y-4">
                          {day.activities.map((activity: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-start space-x-4 p-4 bg-white/60 rounded-xl border border-purple-100"
                            >
                              <span className="text-2xl">{activity.emoji}</span>
                              <div>
                                <div className="font-semibold text-purple-600 text-sm uppercase tracking-wide">
                                  {activity.time}
                                </div>
                                <p className="text-gray-800 text-lg leading-relaxed">{activity.activity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200">
                <p className="text-blue-800 font-semibold text-lg">
                  📞 We'll contact you at {tripData.email} {tripData.phone && `and ${tripData.phone}`}
                </p>
                <p className="text-blue-700 text-sm mt-2">
                  Our travel experts will reach out with your complete personalized itinerary, local recommendations,
                  and booking assistance!
                </p>
              </div>
              <Button
                onClick={() => {
                  setCurrentStep(0)
                  setTripData({
                    destination: "",
                    travelStyle: "",
                    activities: [],
                    duration: 7,
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                  })
                  setCustomDestination("")
                  setCustomActivity("")
                  setGeneratedItinerary([])
                }}
                variant="outline"
                className="px-8 py-4 text-lg border-2 border-purple-300 hover:bg-purple-50"
              >
                Plan Another Trip
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
