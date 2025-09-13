
import { useState } from "react";
import { TrendingUp, DollarSign, BarChart3, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FeaturesSection = () => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const navigate = useNavigate();

  const features = [
    {
      id: "real-time",
      icon: TrendingUp,
      title: "Real-time Data",
      description: "Access live market data and historical price information",
      navigateToPage: true
    },
    {
      id: "prediction",
      icon: DollarSign,
      title: "Stock Prediction",
      description: "Machine learning models for accurate forecasting",
      scrollToSection: true
    },
    {
      id: "charts",
      icon: BarChart3,
      title: "Interactive Charts",
      description: "Visualize trends and predictions with dynamic charts",
      expandedContent: (
        <div className="space-y-4 text-slate-300">
          {/* Text removed as requested */}
        </div>
      )
    }
  ];

  const toggleFeature = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    
    if (feature?.scrollToSection) {
      scrollToSection('charts');
      return;
    }

    if (feature?.navigateToPage && featureId === 'real-time') {
      navigate('/stocks');
      return;
    }
    
    setExpandedFeature(expandedFeature === featureId ? null : featureId);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "charts") {
      const element = document.getElementById("live-market-preview");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="px-6 py-16 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => {
          const isExpanded = expandedFeature === feature.id;
          const IconComponent = feature.icon;
          
          return (
            <Card 
              key={feature.id}
              className={`bg-white/5 border-white/10 transition-all duration-300 ${
                isExpanded ? 'bg-white/10 scale-105' : 'hover:bg-white/10 hover:scale-105'
              }`}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  feature.id === 'real-time' ? 'bg-blue-500/20' :
                  feature.id === 'prediction' ? 'bg-purple-500/20' : 'bg-green-500/20'
                }`}>
                  <IconComponent className={`h-6 w-6 ${
                    feature.id === 'real-time' ? 'text-blue-400' :
                    feature.id === 'prediction' ? 'text-purple-400' : 'text-green-400'
                  }`} />
                </div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
                <CardDescription className="text-slate-400">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => toggleFeature(feature.id)}
                  variant="ghost"
                  className="w-full text-slate-300 hover:text-white hover:bg-white/10"
                >
                  {feature.navigateToPage ? (
                    <>
                      View All Stocks <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  ) : feature.scrollToSection ? (
                    <>
                      View Charts <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  ) : isExpanded ? (
                    <>
                      Hide Details <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Learn More <ChevronDown className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                
                {isExpanded && feature.expandedContent && (
                  <div className="animate-fade-in border-t border-white/10 pt-4">
                    {feature.expandedContent}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;
