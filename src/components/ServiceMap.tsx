import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Brain, Hand, Activity, ExternalLink, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface ServiceMapProps {
  services: any[];
  searchedZipCode?: string;
}

const ServiceMap = ({ services, searchedZipCode }: ServiceMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || services.length === 0) return;

    // Clean up existing map
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Initialize the map
    map.current = L.map(mapContainer.current).setView([32.7767, -97.3308], 10);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map.current);

    // Add highlighted area for searched zip code
    if (searchedZipCode) {
      const searchedService = services.find(service => service.zip_code === searchedZipCode);
      
      if (searchedService && searchedService.latitude && searchedService.longitude) {
        const searchedCoords: [number, number] = [searchedService.latitude, searchedService.longitude];
        
        const highlightCircle = L.circle(searchedCoords, {
          radius: 2000,
          color: '#10b981',
          weight: 3,
          fillColor: '#10b981',
          fillOpacity: 0.2,
          className: 'searched-zip-highlight'
        }).addTo(map.current);

        const pulseCircle = L.circle(searchedCoords, {
          radius: 2000,
          color: '#10b981',
          weight: 2,
          fillColor: '#10b981',
          fillOpacity: 0.1,
          className: 'searched-zip-pulse'
        }).addTo(map.current);

        let scale = 1;
        const animatePulse = () => {
          scale += 0.02;
          if (scale > 1.5) scale = 1;
          pulseCircle.setRadius(2000 * scale);
          setTimeout(animatePulse, 50);
        };
        animatePulse();
      }
    }

    // Add markers for each service
    services.forEach((service) => {
      const zipCoordinates: { [key: string]: [number, number] } = {
        '76054': [32.8233, -97.1833],
        '75201': [32.7833, -96.8039],
        '75202': [32.7833, -96.7939],
        '75203': [32.7733, -96.8139],
        '76051': [32.8333, -97.1933],
        '76052': [32.8433, -97.2033],
        '76102': [32.7533, -97.3333],
        '76103': [32.7433, -97.3433],
        '76104': [32.7333, -97.3533],
      };

      const coords = (service.latitude && service.longitude) 
        ? [service.latitude, service.longitude] 
        : zipCoordinates[service.zip_code] || [32.7767, -97.3308];

      const customIcon = L.divIcon({
        html: `
          <div style="position: relative;">
            <div style="
              background: white;
              border: 3px solid #3b82f6;
              border-radius: 50%;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            ">
              <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%;"></div>
            </div>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(coords, { icon: customIcon }).addTo(map.current);

      const popupContent = `
        <div style="padding: 8px; font-family: Arial, sans-serif;">
          <div style="font-weight: bold; font-size: 14px;">
            ${service.city}, ${service.state}
          </div>
          <div style="color: #666; font-size: 12px;">
            ${service.zip_code}
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      markers.current.push(marker);
    });

    if (markers.current.length > 0) {
      const group = new L.featureGroup(markers.current);
      map.current.fitBounds(group.getBounds().pad(0.1));
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [services]);

  if (!services.length) return null;

  // Service configuration
  const serviceTypes = [
    {
      key: "speech_therapy",
      statusKey: "speech_therapy_status",
      name: "Speech Therapy",
      icon: Brain,
      description: "Communication and language development support",
    },
    {
      key: "occupational_therapy",
      statusKey: "occupational_therapy_status",
      name: "Occupational Therapy",
      icon: Hand,
      description: "Daily living skills and fine motor development",
    },
    {
      key: "physical_therapy",
      statusKey: "physical_therapy_status",
      name: "Physical Therapy",
      icon: Activity,
      description: "Movement and gross motor skill improvement",
    },
  ];

  // Helper function to get the most restrictive status across all locations for a service
  const getServiceStatus = (service: any) => {
    const statuses = services.map(location => location[service.statusKey]);
    
    // Priority: unavailable > needs_confirmation > available
    if (statuses.some(s => s === 'unavailable')) return 'red';
    if (statuses.some(s => s === 'needs_confirmation')) return 'yellow';
    if (statuses.some(s => s === 'available')) return 'green';
    return 'red'; // default
  };

  // Determine availability for each service type
  const allServices = serviceTypes.map(service => ({
    ...service,
    status: getServiceStatus(service),
  }));

  const getStatusColor = (status: string) => {
    return status; // status is already green/yellow/red
  };

  const getStatusColors = (status: string) => {
    const colors = {
      green: {
        bg: "bg-green-500",
        text: "text-green-700",
        border: "border-green-300",
        badge: "bg-green-500/20 text-green-700 border-green-300",
      },
      yellow: {
        bg: "bg-yellow-500",
        text: "text-yellow-700",
        border: "border-yellow-300",
        badge: "bg-yellow-500/20 text-yellow-700 border-yellow-300",
      },
      red: {
        bg: "bg-red-500",
        text: "text-red-700",
        border: "border-red-300",
        badge: "bg-red-500/20 text-red-700 border-red-300",
      },
    };
    return colors[status as keyof typeof colors] || colors.green;
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
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-6xl mx-auto mt-8 md:mt-12 px-2 sm:px-0"
    >
      <Card className="p-4 sm:p-6 gradient-card border-white/20 shadow-xl">
        <div className="text-center mb-4 sm:mb-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Service Coverage Map</h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            Interactive map showing our therapy service coverage in your area
          </p>
        </div>

        {/* Map */}
        <div className="w-full h-64 sm:h-96 rounded-lg overflow-hidden border-2 border-white/20 mb-4 sm:mb-6">
          <div ref={mapContainer} className="w-full h-full"></div>
        </div>

        {/* Service Availability Cards */}
        <div className="grid gap-3 mb-6">
          {allServices.map((service, index) => {
            const Icon = service.icon;
            const status = getStatusColor(service.status);
            const colors = getStatusColors(status);

            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Card className={`p-3 sm:p-4 border-2 ${colors.border}`}>
                  <div className="flex flex-col gap-3">
                    {/* Service Name and Icon Row */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`p-2 rounded-full ${colors.bg}/20 flex-shrink-0`}>
                        <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.text}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-base">{service.name}</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{service.description}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${colors.text} ${colors.border} font-semibold text-xs sm:text-sm whitespace-nowrap flex-shrink-0`}
                      >
                        {getStatusBadgeText(status)}
                      </Badge>
                    </div>
                    
                    {/* Description on Mobile */}
                    <p className="text-xs text-muted-foreground sm:hidden pl-0 sm:pl-[50px]">{service.description}</p>
                    
                    {/* Action Button */}
                    <div className="w-full">
                      {status === "yellow" && (
                        <Button
                          onClick={() => window.location.href = "tel:+19728851550"}
                          variant="outline"
                          size="sm"
                          className="border-yellow-300 text-yellow-600 hover:bg-yellow-50 w-full text-sm"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Call </span>(972) 885-1550
                        </Button>
                      )}
                      {status === "green" && (
                        <Button
                          onClick={() => window.open("https://www.sanctumhealthpartners.com/referral-form", "_blank")}
                          variant="outline"
                          size="sm"
                          className="border-green-300 text-green-600 hover:bg-green-50 w-full text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Referral Form
                        </Button>
                      )}
                      {status === "red" && (
                        <Button
                          onClick={() => window.open("https://www.sanctumhealthpartners.com/tele-therapy", "_blank")}
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600 hover:bg-red-50 w-full text-sm"
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
        <Card className="p-3 sm:p-4 gradient-card border-white/20">
          <h4 className="text-xs sm:text-sm font-semibold mb-3 text-center">Color Legend</h4>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 flex-shrink-0"></div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-medium">Green</p>
                <p className="text-xs text-muted-foreground hidden sm:block">Available</p>
                <p className="text-[10px] text-muted-foreground sm:hidden">Available</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0"></div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-medium">Yellow</p>
                <p className="text-xs text-muted-foreground hidden sm:block">Confirm</p>
                <p className="text-[10px] text-muted-foreground sm:hidden">Confirm</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1 sm:gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-medium">Red</p>
                <p className="text-xs text-muted-foreground hidden sm:block">Not Available</p>
                <p className="text-[10px] text-muted-foreground sm:hidden">Not Available</p>
              </div>
            </div>
          </div>
        </Card>
      </Card>
    </motion.div>
  );
};

export default ServiceMap;
