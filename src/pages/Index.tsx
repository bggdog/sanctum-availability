import { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope, Heart, Users } from "lucide-react";
import FloatingElements from "@/components/FloatingElements";
import ZipCodeSearch from "@/components/ZipCodeSearch";
import ServiceMap from "@/components/ServiceMap";

const Index = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchedZipCode, setSearchedZipCode] = useState<string>("");

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  const handleZipCodeSearch = (zipCode: string) => {
    setSearchedZipCode(zipCode);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingElements />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen sm:min-h-screen flex items-center justify-center px-4 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto text-center w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 sm:mb-12"
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="p-3 sm:p-4 rounded-full gradient-hero shadow-2xl"
                >
                  <Stethoscope className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
                </motion.div>
              </div>
              
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-br from-primary via-primary-glow to-accent bg-clip-text text-transparent px-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Find Your Therapy Services
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Discover comprehensive Speech, Occupational, and Physical Therapy services 
                available in your area with our interactive coverage map
              </motion.p>
            </motion.div>

            {/* Search Component */}
            <ZipCodeSearch onResultsFound={handleSearchResults} onZipCodeSearched={handleZipCodeSearch} />

            {/* Map Component - moved up to appear right after search */}
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 max-w-6xl mx-auto"
              >
                <ServiceMap 
                  services={searchResults} 
                  searchedZipCode={searchedZipCode}
                />
              </motion.div>
            )}

            {/* Service Stats */}
            {!searchResults.length && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 sm:mt-16 grid md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
              >
                {[
                  { icon: Stethoscope, title: "Speech Therapy", desc: "Communication & Language" },
                  { icon: Heart, title: "Occupational Therapy", desc: "Daily Living Skills" },
                  { icon: Users, title: "Physical Therapy", desc: "Movement & Mobility" }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="text-center p-6 rounded-xl gradient-card border-white/20 shadow-lg"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      className="flex justify-center mb-4"
                    >
                      <div className="p-3 rounded-full bg-primary/10">
                        <item.icon className="w-8 h-8 text-primary" />
                      </div>
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>


        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="py-12 px-4 mt-20 border-t border-white/10"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">
              Comprehensive therapy services to help you thrive. 
              <span className="text-primary font-medium"> Your health is our priority.</span>
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;