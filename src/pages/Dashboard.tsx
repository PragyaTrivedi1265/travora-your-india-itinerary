import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import destinationsImage from '@/assets/destinations-collage.jpg';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    numberOfDays: 1,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleCreateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setCreating(true);
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + formData.numberOfDays - 1);

      const { error } = await supabase.from('itineraries').insert({
        user_id: user.id,
        title: formData.title,
        destination: formData.destination,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your itinerary has been created.",
      });

      setFormData({
        title: '',
        destination: '',
        numberOfDays: 1,
      });
      navigate('/history');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
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
              Create Your Journey
            </h1>
            <p className="text-muted-foreground text-lg">
              Plan the perfect itinerary for your next adventure
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-elegant animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  New Itinerary
                </CardTitle>
                <CardDescription>
                  Fill in the details to start planning your trip
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateItinerary} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Trip Title</Label>
                    <Input
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., European Adventure"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      required
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      placeholder="e.g., Paris, France"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfDays">Number of Days</Label>
                    <Input
                      id="numberOfDays"
                      type="number"
                      min="1"
                      max="365"
                      required
                      value={formData.numberOfDays}
                      onChange={(e) => setFormData({ ...formData, numberOfDays: parseInt(e.target.value) || 1 })}
                      placeholder="e.g., 7"
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={creating}>
                    {creating ? 'Creating...' : 'Create Itinerary'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <img
                src={destinationsImage}
                alt="Travel destinations"
                className="rounded-lg shadow-elegant object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;