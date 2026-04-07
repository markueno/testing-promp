import React, { useState, useEffect } from 'react';
import { BlogProvider } from './contexts/BlogContext';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import NotFound from './components/NotFound';
import { useBlog } from './contexts/BlogContext';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: number;
}

const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Perfect Seafood Pasta',
    excerpt: 'Master the delicate balance of fresh seafood and al dente pasta in this culinary masterpiece.',
    content: 'Creating the perfect seafood pasta is an art form that combines fresh ingredients with precise timing. In this article, we explore the secrets behind our signature dish that has become a customer favorite.\n\nThe key to an exceptional seafood pasta lies in three essential components: the freshness of the seafood, the quality of the pasta, and the delicate balance of flavors in the sauce. We source our seafood daily from local fishermen who use sustainable practices to ensure the ocean remains bountiful for future generations.\n\nWhen selecting seafood for pasta, look for firm, opaque shrimp; sweet, fragrant scallops; and clams that close tightly when tapped. The pasta should be cooked al dente, allowing it to absorb the sauce while maintaining its satisfying texture.\n\nOur signature sauce combines fresh tomatoes, garlic, white wine, and a hint of red pepper flakes, creating a base that complements rather than overpowers the delicate seafood flavors. Garnished with fresh basil and a drizzle of extra virgin olive oil, this dish captures the essence of coastal Italian cuisine.',
    image: 'https://images.unsplash.com/photo-1563379091-4b72a7c58904?auto=format&fit=crop&w=800&q=80',
    author: 'Chef Marco Rossi',
    date: '2024-01-15',
    category: 'Recipes',
    readTime: 5
  },
  {
    id: '2',
    title: 'Sustainable Dining: Our Commitment to Local Farms',
    excerpt: 'Discover how we partner with local farmers to create seasonal menus that support our community.',
    content: 'At Palate, our commitment to sustainability goes beyond our kitchen. We believe that great food starts with respect for the land and the people who cultivate it.\n\nOur journey toward sustainable dining began five years ago when we established partnerships with local farms within a 50-mile radius of our restaurant. Today, over 85% of our produce comes from these trusted partners, ensuring peak freshness while reducing our carbon footprint.\n\nEach month, we host a "Farm to Table" dinner series featuring dishes made exclusively with ingredients sourced from our partner farms. These events celebrate the changing seasons and highlight the unique flavors that our local terroir produces.\n\nSome of our closest farming partners include Green Valley Organics, which provides our heirloom tomatoes and delicate herbs; Mountain Ridge Creamery, whose artisan cheeses grace our menu year-round; and Blue Sky Produce, whose seasonal vegetables inspire our rotating sampler plates.\n\nBy choosing Palate, you\'re not just enjoying exceptional cuisine—you\'re supporting a network of farmers who prioritize ethical practices, biodiversity, and soil health.',
    image: 'https://images.unsplash.com/photo-1516339234761-855d96884845?auto=format&fit=crop&w=800&q=80',
    author: 'Elena Thompson',
    date: '2024-01-10',
    category: 'Sustainability',
    readTime: 4
  },
  {
    id: '3',
    title: 'Wine Pairing Essentials for Home Enthusiasts',
    excerpt: 'Elevate your dinner parties with these expert wine pairing tips and classic combinations.',
    content: 'Wine pairing is one of the most elegant aspects of culinary experience, transforming a good meal into an extraordinary one. While professional sommeliers spend years mastering this art, anyone can create impressive pairings at home with some basic knowledge and confidence.\n\nThe foundation of wine pairing lies in balancing three key elements: the wine\'s acidity, tannins, and sweetness against the dish\'s fat, salt, and spice levels. Generally, acidic wines cut through fatty foods, tannic wines complement protein-rich dishes, and sweet wines balance spicy foods.\n\nOur sommelier recommends starting with classic pairings: Pinot Noir with grilled salmon, Sauvignon Blanc with goat cheese salads, and Chardonnay with roasted chicken. Once you\'re comfortable with these combinations, experiment with more adventurous pairings like Riesling with spicy Asian cuisine or Syrah with lamb dishes.\n\nRemember, the most important rule is to trust your palate. If you enjoy the pairing, it\'s a success—regardless of what the textbooks say.',
    image: 'https://images.unsplash.com/photo-1573629493431-179264953287?auto=format&fit=crop&w=800&q=80',
    author: 'Marcus Chen',
    date: '2024-01-05',
    category: 'Wine & Drinks',
    readTime: 6
  },
  {
    id: '4',
    title: 'Behind the Kitchen Doors: A Day with Our Executive Chef',
    excerpt: 'Get an exclusive look into the precision and passion that drives our award-winning kitchen.',
    content: 'Have you ever wondered what happens behind those kitchen doors? We invited our executive chef, Sofia Martinez, to document a typical day at Palate—a revealing look at the dedication, skill, and creativity that go into every dish we serve.\n\nThe kitchen hums to life at 6:00 AM when the first delivery arrives. Chef Martinez begins her day by inspecting each ingredient, running her fingers over the marbling in steaks, smelling the freshness of seafood, and ensuring every product meets our exacting standards.\n\nBy 9:00 AM, the prep kitchen is in full swing. Line cooks chop, dice, and mince under Chef Martinez\'s watchful eye. Everything is prepared with military precision, each ingredient destined for its perfect moment on the plate.\n\nLunch service brings the first true test of the day\'s preparation. Orders fly in rapid succession, the kitchen forming a chaotic symphony of sizzling pans, shouted orders, and clinking glasses. Chef Martinez moves with calm authority, apparently effortless despite the pressure.\n\nEvening service allows for more creativity as guests order from our à la carte menu. This is where Chef Martinez shines, transforming seasonal ingredients into edible art that tells the story of our region and its bounties.',
    image: 'https://images.unsplash.com/photo-1550939577-335788555916?auto=format&fit=crop&w=800&q=80',
    author: 'Sarah Johnson',
    date: '2024-01-01',
    category: 'Behind the Scenes',
    readTime: 7
  },
  {
    id: '5',
    title: 'The Magic of Dessert: Chocolate Lava Cake',
    excerpt: 'Learn the science and art behind creating the perfect molten chocolate center.',
    content: 'There\'s something magical about cutting into a warm chocolate lava cake and watching that rich, liquid center ooze out onto the plate. What appears to be culinary magic is actually the result of precise science and careful technique.\n\nThe secret to a successful lava cake lies in the temperature and timing. The batter must be chilled just right, and the baking time must be exact—typically no more than 12 minutes at 425°F. Over-bake by even 30 seconds, and you\'ll lose that glorious center.\n\nAt Palate, we use a blend of premium dark chocolate (70% cocoa), unsalted butter, eggs, sugar, and flour in precise proportions. The chocolate and butter are melted together gently, then cooled before adding eggs one at a time. Flour is folded in last, being careful not to over-mix.\n\nOur pastry chef recommends serving the cake warm, accompanied by a scoop of premium vanilla bean ice cream and fresh berries. The contrast of temperatures and textures creates an experience that lingers in memory long after the last bite.',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db378?auto=format&fit=crop&w=800&q=80',
    author: 'Chef Emily Wilson',
    date: '2023-12-28',
    category: 'Desserts',
    readTime: 4
  },
  {
    id: '6',
    title: 'Seasonal Menu Updates: Winter edition',
    excerpt: 'Our winter menu features comforting dishes that celebrate the season\'s best ingredients.',
    content: 'Winter at Palate means embracing the season\'s bounty with rich, comforting dishes that warm both body and soul. Our chef has crafted a new menu that highlights citrus fruits, root vegetables, winter greens, and hearty grains.\n\nOur signature "Forest Floor" dish features wild mushroom risotto with chestnuts, sage brown butter, and toasted pumpkin seeds—a vegetarian main that rivals any meat dish in richness and complexity.\n\nFor our carnivorous guests, we offer "Hearth Roast," a pheasant breast with parsnip purée, braised cabbage, and a red wine reduction. This dish pays homage to traditional winter roasting techniques while showcasing modern culinary innovations.\n\nOur winter beverage menu includes a new selection of warm citrus sodas, spiced apple cider flights, and a special winter release from our local brewing partners—a holiday stout with notes of vanilla, cocoa, and orange peel.\n\nReserve your table early for our seasonal menu; these dishes are only available for a limited time while ingredients are at their peak.',
    image: 'https://images.unsplash.com/photo-1548412633-1233275575975?auto=format&fit=crop&w=800&q=80',
    author: 'Michael Anderson',
    date: '2023-12-15',
    category: 'Seasonal',
    readTime: 5
  }
];

function App() {
  return (
    <BlogProvider initialPosts={mockPosts}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <BlogContent />
        </main>
        <Footer />
      </div>
    </BlogProvider>
  );
}

function BlogContent() {
  const { posts, selectedPostId, selectedCategory, searchQuery } = useBlog();
  const [view, setView] = useState<'list' | 'detail' | 'not-found'>('list');

  useEffect(() => {
    if (selectedPostId) {
      setView('detail');
    } else if (selectedCategory || searchQuery) {
      setView('list');
    } else {
      setView('list');
    }
  }, [selectedPostId, selectedCategory, searchQuery]);

  if (view === 'not-found') {
    return <NotFound />;
  }

  if (view === 'detail' && selectedPostId) {
    return <BlogDetail postId={selectedPostId} />;
  }

  return (
    <>
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {selectedCategory 
            ? `${selectedCategory} Recipes & Stories`
            : searchQuery 
              ? `Results for "${searchQuery}"`
              : 'Latest from Our Kitchen'}
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our chef\'s recipes, culinary stories, and the passion behind every dish we serve.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <BlogList />
        </div>
        <aside className="md:w-64 space-y-6">
          <CategoryFilter />
        </aside>
      </div>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Palate</h3>
            <p className="text-gray-400">
              A culinary journey celebrating flavors, traditions, and the joy of good food shared with loved ones.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Menu</a></li>
              <li><a href="#" className="hover:text-white transition">Reservations</a></li>
              <li><a href="#" className="hover:text-white transition">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>123 Culinary Avenue</li>
              <li>Cityville, CA 90210</li>
              <li>hello@palaterestaurant.com</li>
              <li>(555) 123-4567</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Thursday: 5pm - 10pm</li>
              <li>Friday - Saturday: 5pm - 11pm</li>
              <li>Sunday: 4pm - 9pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Palate Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default App;
