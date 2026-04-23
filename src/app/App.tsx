import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Heart, Utensils, Leaf, ChefHat, ShoppingBag, Sparkles, User, LogIn } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import LoginModal from './components/LoginModal';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Removed invalid useEffect that called .play() on an iframe ref


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.1], [1, 0.95]);
  const textY = useTransform(smoothProgress, [0, 0.1], [0, -30]);

  const section2Y = useTransform(smoothProgress, [0.12, 0.18], [80, 0]);
  const section2Opacity = useTransform(smoothProgress, [0.12, 0.18], [0, 1]);

  const section3Y = useTransform(smoothProgress, [0.35, 0.42], [80, 0]);
  const section3Opacity = useTransform(smoothProgress, [0.35, 0.42], [0, 1]);

  return (
    <>
      <div ref={containerRef} className="relative bg-gradient-to-b from-emerald-50 via-white to-green-50" style={{ position: 'relative' }}>
        {/* Fixed Navigation */}
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Leaf className="text-emerald-600 w-8 h-8" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                HealthBite
              </span>
            </motion.div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-emerald-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-emerald-600 transition-colors">How It Works</a>
              <a href="#chefs" className="text-gray-700 hover:text-emerald-600 transition-colors">For Chefs</a>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setShowLogin(true); setIsSignup(false); }}
                className="px-4 py-2 text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setShowLogin(true); setIsSignup(true); }}
                className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full hover:shadow-lg transition-all"
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <motion.section
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="https://res.cloudinary.com/dv0stxj1g/video/upload/v1776965370/WhatsApp_Video_2026-04-23_at_8.28.18_PM_kwxr5f.mp4" type="video/mp4" />
            </video>
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-emerald-900/70 pointer-events-none" />
          </div>

          {/* Hero Content */}
          <motion.div
            style={{ y: textY }}
            className="relative z-10 text-center px-6 max-w-5xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Health & Wellness</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <span className="block text-6xl md:text-7xl lg:text-8xl font-bold mb-4 text-white drop-shadow-2xl">
                Eat According to
              </span>
              <span className="block text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-emerald-400 via-green-300 to-teal-300 bg-clip-text text-transparent drop-shadow-2xl">
                Your Mood & Health
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-white drop-shadow-lg mb-10 max-w-3xl mx-auto"
            >
              AI-based personalized meals crafted by home chefs, tailored to your health conditions, mood, and dietary needs
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full text-lg font-semibold flex items-center gap-2 shadow-xl"
              >
                <ShoppingBag className="w-5 h-5" />
                Order Your Meal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-emerald-600 rounded-full text-lg font-semibold border-2 border-emerald-500 flex items-center gap-2"
              >
                <ChefHat className="w-5 h-5" />
                Become a Chef
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-16 flex items-center justify-center gap-8 text-sm text-white/90"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <Heart className="w-4 h-4 text-red-400" />
                <span>100% Homemade</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>Organic Ingredients</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>AI Personalized</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          style={{ y: section2Y, opacity: section2Opacity }}
          id="features"
          className="flex items-center justify-center px-6 py-16"
        >
          <div className="max-w-7xl w-full">
            <motion.div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Why Choose <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">HealthBite</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Revolutionary AI technology meets authentic home cooking
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sparkles className="w-12 h-12" />,
                  title: "AI Mood Detection",
                  description: "Our AI analyzes your mood and suggests meals that boost your emotional wellbeing",
                  color: "from-purple-500 to-pink-500",
                  image: "https://images.unsplash.com/photo-1598449526978-cd11daa040c9?w=600"
                },
                {
                  icon: <Heart className="w-12 h-12" />,
                  title: "Health-Focused",
                  description: "Customized for your specific health conditions, allergies, and dietary restrictions",
                  color: "from-red-500 to-orange-500",
                  image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=600"
                },
                {
                  icon: <ChefHat className="w-12 h-12" />,
                  title: "Homemade Quality",
                  description: "Every meal prepared fresh by verified home chefs in your community",
                  color: "from-emerald-500 to-teal-500",
                  image: "https://images.unsplash.com/photo-1651571835216-dedabe98dcc7?w=600"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <ImageWithFallback
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className={`inline-block p-3 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* How It Works Section */}
        <motion.section
          style={{ y: section3Y, opacity: section3Opacity }}
          id="how-it-works"
          className="flex items-center justify-center px-6 py-16 bg-gradient-to-br from-emerald-50 to-green-100"
        >
          <div className="max-w-7xl w-full">
            <motion.div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Simple as <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">1-2-3</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {[
                {
                  step: "01",
                  title: "Tell Us How You Feel",
                  description: "Share your mood, health goals, and any dietary restrictions with our AI",
                  image: "https://images.unsplash.com/photo-1649925548772-3dbd70852613?w=500"
                },
                {
                  step: "02",
                  title: "Get Personalized Menu",
                  description: "AI curates perfect meals from local home chefs based on your needs",
                  image: "https://images.unsplash.com/photo-1645932058657-750f3c2656ca?w=500"
                },
                {
                  step: "03",
                  title: "Enjoy Fresh & Healthy",
                  description: "Receive fresh, homemade meals delivered to your doorstep",
                  image: "https://images.unsplash.com/photo-1662982693758-f69fcb81e7d2?w=500"
                }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="text-8xl font-bold text-emerald-200 absolute -top-8 -left-4 -z-0">
                    {step.step}
                  </div>
                  <div className="relative z-10 bg-white rounded-3xl overflow-hidden shadow-xl p-6">
                    <div className="h-56 rounded-2xl overflow-hidden mb-6">
                      <ImageWithFallback
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Chef Section */}
        <motion.section
          id="chefs"
          className="flex items-center justify-center px-6 py-16"
        >
          <div className="max-w-6xl w-full">
            <div className="bg-gradient-to-r from-emerald-600 to-green-500 rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
              />

              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <ChefHat className="w-16 h-16 mb-6" />
                  <h2 className="text-5xl md:text-6xl font-bold mb-6">
                    Become a Home Chef
                  </h2>
                  <p className="text-xl mb-8 text-emerald-50">
                    Turn your passion for cooking into a thriving business. Join our community of verified home chefs and share your culinary magic.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Flexible working hours",
                      "Earn from your kitchen",
                      "Connect with health-conscious customers",
                      "Full support & training"
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <Leaf className="w-4 h-4" />
                        </div>
                        <span className="text-lg">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-emerald-600 rounded-full text-lg font-semibold shadow-xl"
                  >
                    Apply as Chef
                  </motion.button>
                </div>

                <div className="relative">
                  <motion.div
                    animate={{
                      y: [0, -20, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1765267642339-e6e1c8ed5b88?w=600"
                      alt="Home chef cooking"
                      className="w-full h-96 object-cover"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer CTA */}
        <motion.section className="py-20 px-6 bg-gradient-to-b from-white to-emerald-50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Ready to Start Your
              <span className="block bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                Health Journey?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-10"
            >
              Join thousands of happy customers eating better, feeling better
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setShowLogin(true); setIsSignup(true); }}
              className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-full text-xl font-semibold shadow-2xl"
            >
              Get Started Free
            </motion.button>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="text-emerald-400 w-8 h-8" />
                <span className="text-2xl font-bold">HealthBite</span>
              </div>
              <p className="text-gray-400">
                AI-powered healthy meals, crafted with love by home chefs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
                <li><a href="#chefs" className="hover:text-emerald-400 transition-colors">For Chefs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Get the latest health tips and offers</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-full bg-gray-800 text-white flex-1 outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button className="px-4 py-2 bg-emerald-500 rounded-full hover:bg-emerald-600 transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2026 HealthBite. All rights reserved.</p>
          </div>
        </footer>
      </div>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        isSignup={isSignup}
        onToggleMode={() => setIsSignup(!isSignup)}
      />
    </>
  );
}
