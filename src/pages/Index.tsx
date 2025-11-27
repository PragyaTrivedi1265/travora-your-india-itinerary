import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Clock, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import heroImage from '@/assets/hero-india.jpg';
import foodImage from '@/assets/indian-food.jpg';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            filter: 'brightness(0.5)',
          }}
        />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 animate-fade-in">
            Smart Journeys Made Simple
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Plan your perfect Indian adventure with AI-powered itineraries
          </p>
          <Link to="/auth">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 animate-fade-in shadow-elegant" 
              style={{ animationDelay: '0.2s' }}
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-display font-bold text-center mb-12 animate-fade-in">
            Why Choose Travora?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-card shadow-elegant animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Planning</h3>
              <p className="text-muted-foreground">
                AI-powered itineraries optimized for the best travel experience
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card shadow-elegant animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-muted-foreground">
                Create comprehensive travel plans in minutes, not hours
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card shadow-elegant animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized</h3>
              <p className="text-muted-foreground">
                Tailored recommendations based on your preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-display font-bold mb-6">
                Discover Authentic Flavors
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Every itinerary includes curated food recommendations, from traditional thalis to street food delights. Experience the rich culinary heritage of India with carefully selected breakfast, lunch, and dinner suggestions.
              </p>
              <Link to="/auth">
                <Button size="lg">
                  Start Planning <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <img 
                src={foodImage} 
                alt="Indian cuisine" 
                className="rounded-lg shadow-elegant object-cover w-full h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-display font-bold mb-6 animate-fade-in">
            Ready to Explore India?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Join thousands of travelers who have made their journeys unforgettable with Travora
          </p>
          <Link to="/auth">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 animate-fade-in" 
              style={{ animationDelay: '0.2s' }}
            >
              Create Your Itinerary <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2025 Travora. Smart journeys made simple.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;