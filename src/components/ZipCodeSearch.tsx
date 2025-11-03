import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ZipCodeSearchProps {
  onResultsFound: (results: any[]) => void;
  onZipCodeSearched?: (zipCode: string) => void;
}

const ZipCodeSearch = ({ onResultsFound, onZipCodeSearched }: ZipCodeSearchProps) => {
  const [zipCode, setZipCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!zipCode.trim()) {
      toast({
        title: "Please enter a zip code",
        description: "We need your zip code to check service availability.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in your .env file.");
      }

      const { data, error } = await supabase
        .from("zip_code_services")
        .select("*")
        .eq("zip_code", zipCode.trim());

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      if (data && data.length > 0) {
        onResultsFound(data);
        onZipCodeSearched?.(zipCode.trim());
        toast({
          title: "Services found!",
          description: `Found ${data.length} service area(s) for ${zipCode}`,
        });
      } else {
        onResultsFound([]);
        onZipCodeSearched?.(zipCode.trim());
        toast({
          title: "No services available",
          description: `We don't currently serve ${zipCode}. Check back soon!`,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Search error:", error);
      
      let errorMessage = "Please try again in a moment.";
      if (error?.message?.includes("Supabase is not configured")) {
        errorMessage = "Supabase configuration is missing. Please check your environment variables.";
      } else if (error?.message?.includes("Failed to fetch") || error?.message?.includes("NetworkError") || error?.code === "ERR_NAME_NOT_RESOLVED") {
        errorMessage = "Cannot connect to your Supabase database. Your project may still be restoring. Please check your Supabase dashboard to ensure the project is active.";
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Search failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="p-8 gradient-card backdrop-blur-sm border-white/20 shadow-2xl">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center mb-6"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Find Your Services
          </h2>
          <p className="text-muted-foreground">
            Enter your zip code to discover available therapy services
          </p>
        </motion.div>

        <div className="space-y-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-12 h-12 text-lg border-2 focus:border-primary transition-all duration-300"
              maxLength={10}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>

          <Button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full h-12 text-lg font-semibold gradient-hero hover:scale-105 transition-all duration-300 shadow-lg"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              "Search Services"
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ZipCodeSearch;