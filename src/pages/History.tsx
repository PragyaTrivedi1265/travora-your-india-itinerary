import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Calendar, MapPin, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { format } from 'date-fns';

interface Itinerary {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

const History = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchItineraries();
    }
  }, [user]);

  const fetchItineraries = async () => {
    try {
      const { data, error } = await supabase
        .from('itineraries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItineraries(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('itineraries')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Itinerary deleted successfully.",
      });
      
      fetchItineraries();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading || loadingData) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl text-muted-foreground">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-display font-bold text-foreground mb-2">
              Your Travel History
            </h1>
            <p className="text-muted-foreground text-lg">
              View and manage all your itineraries
            </p>
          </div>

          {itineraries.length === 0 ? (
            <Card className="text-center py-12 animate-fade-in">
              <CardContent>
                <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No itineraries yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start creating your first travel plan!
                </p>
                <Button onClick={() => navigate('/dashboard')}>
                  Create Itinerary
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {itineraries.map((itinerary, index) => (
                <Card 
                  key={itinerary.id} 
                  className="shadow-elegant animate-fade-in hover:shadow-xl transition-all"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-2xl font-display">
                          {itinerary.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <MapPin className="w-4 h-4" />
                          {itinerary.destination}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(itinerary.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {format(new Date(itinerary.start_date), 'MMM dd, yyyy')} - {format(new Date(itinerary.end_date), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;