import { motion } from "framer-motion";
import { Brain, Hand, Activity, MapPin, Phone, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ServiceCardsProps {
  services: any[];
}

const ServiceCards = ({ services }: ServiceCardsProps) => {
  if (!services.length) return null;

  const serviceTypes = [
    {
      key: "speech_therapy",
      name: "Speech Therapy",
      icon: Brain,
      description: "Communication and language development support",
      color: "text-therapy-speech",
      bgColor: "bg-therapy-speech",
    },
    {
      key: "occupational_therapy",
      name: "Occupational Therapy",
      icon: Hand,
      description: "Daily living skills and fine motor development",
      color: "text-therapy-occupational",
      bgColor: "bg-therapy-occupational",
    },
    {
      key: "physical_therapy",
      name: "Physical Therapy",
      icon: Activity,
      description: "Movement and gross motor skill improvement",
      color: "text-therapy-physical",
      bgColor: "bg-therapy-physical",
    },
  ];

  // Get all unique services across all locations
  // For now, all services with true are green, false are red
  // In the future, you can add per-service status fields to the database
  const allServices = serviceTypes.map(service => ({
    ...service,
    availability: services.some(location => location[service.key]),
    // You could add a service-specific status field here if needed
    status: services.some(location => location[service.key]) ? 'available' : 'unavailable'
  }));

  const getStatusColor = (service: any) => {
    // Green: Service is available
    if (service.availability) {
      return "green";
    }
    // Red: Service not available
    // In future: Add a "pending" or "needs_confirmation" status for yellow
    return "red";
  };

  const getStatusBgColor = (status: string) => {
    if (status === "green") return "bg-green-500";
    if (status === "yellow") return "bg-yellow-500";
    if (status === "red") return "bg-red-500";
    return "bg-gray-500";
  };

  const getStatusTextColor = (status: string) => {
    if (status === "green") return "text-green-700";
    if (status === "yellow") return "text-yellow-700";
    if (status === "red") return "text-red-700";
    return "text-gray-700";
  };

  const getStatusBorderColor = (status: string) => {
    if (status === "green") return "border-green-300";
    if (status === "yellow") return "border-yellow-300";
    if (status === "red") return "border-red-300";
    return "border-gray-300";
  };

  const getStatusBadgeText = (status: string) => {
    if (status === "green") return "Available";
    if (status === "yellow") return "Confirm Availability";
    if (status === "red") return "Not Available";
    return "Unknown";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Service Availability</h3>
        <p className="text-muted-foreground text-lg">
          Check what therapy services are available in your area
        </p>
      </div>

      {/* Service Status Cards */}
      <div className="grid gap-4 mb-8">
        {allServices.map((service, index) => {
          const Icon = service.icon;
          const status = getStatusColor(service);

          return (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="relative"
            >
              <Card className={`p-4 gradient-card border-2 ${getStatusBorderColor(status)} hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${getStatusBgColor(status)}/20`}>
                      <Icon className={`w-6 h-6 ${status === "green" ? "text-green-600" : status === "yellow" ? "text-yellow-600" : "text-red-600"}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={`${getStatusTextColor(status)} ${getStatusBorderColor(status)} font-semibold`}
                    >
                      {getStatusBadgeText(status)}
                    </Badge>
                    {status === "red" && (
                      <Button
                        onClick={() => window.open("https://www.sanctumhealthpartners.com/tele-therapy", "_blank")}
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Try Teletherapy
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Card className="p-6 gradient-card border-white/20">
          <h4 className="text-lg font-semibold mb-4 text-center">Color Legend</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <div>
                <p className="font-medium">Green</p>
                <p className="text-sm text-muted-foreground">Service available</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <div>
                <p className="font-medium">Yellow</p>
                <p className="text-sm text-muted-foreground">Confirm availability</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <div>
                <p className="font-medium">Red</p>
                <p className="text-sm text-muted-foreground">Not available in your area</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Location Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="space-y-4 mt-8"
      >
        <h4 className="text-xl font-semibold text-center mb-4">Service Locations</h4>
        {services.map((location, index) => (
          <motion.div
            key={location.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
          >
            <Card className="p-4 gradient-card border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-lg">
                    {location.city}, {location.state} {location.zip_code}
                  </h5>
                  <div className="flex gap-2 mt-2">
                    {location.speech_therapy && (
                      <Badge className="bg-green-500/20 text-green-700 border-green-300">
                        ✓ Speech
                      </Badge>
                    )}
                    {location.occupational_therapy && (
                      <Badge className="bg-green-500/20 text-green-700 border-green-300">
                        ✓ Occupational
                      </Badge>
                    )}
                    {location.physical_therapy && (
                      <Badge className="bg-green-500/20 text-green-700 border-green-300">
                        ✓ Physical
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Coverage Level</div>
                  <div className="flex gap-1 mt-1">
                    {[...Array(location.service_coverage_level || 5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-green-500"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ServiceCards;
