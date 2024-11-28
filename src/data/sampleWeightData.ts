import { WeightAnalysisData } from '@/types/weight-analysis';

export const sampleWeightData: WeightAnalysisData = {
  reportInfo: {
    reportNumber: "190923230",
    date: "22/11/2024",
    reportType: "Combination Mass Analysis",
    customer: {
      name: "David Leinen",
      phone: "0402611592",
      email: "dleinen89@gmail.com"
    }
  },
  vehicle: {
    details: {
      year: "2020",
      make: "Ford",
      model: "Ranger",
      variant: "Wildtrack",
      type: "Utility",
      registration: "ABC123"
    },
    unloaded: {
      frontLeft: 712,
      frontRight: 700,
      rearLeft: 720,
      rearRight: 700,
      specs: {
        frontAxleMax: 1400,
        rearAxleMax: 1800,
        gvmMax: 3200,
        towballMax: 350,
        gcmMax: 6000,
        btcMax: 3500
      }
    },
    loaded: {
      frontLeft: 680,
      frontRight: 680,
      rearLeft: 850,
      rearRight: 850,
      specs: {
        frontAxleMax: 1400,
        rearAxleMax: 1800,
        gvmMax: 3200,
        towballMax: 350,
        gcmMax: 6000,
        btcMax: 3500
      }
    }
  },
  trailer: {
    details: {
      year: "2017",
      make: "Jayco",
      model: "Silverline",
      variant: "OB",
      type: "Caravan",
      registration: "ZXC987"
    },
    towballWeight: 300,
    axles: [
      { left: 750, right: 735 },
      { left: 0, right: 0 }, // Center axle with zero values
      { left: 760, right: 740 }
    ],
    specs: {
      gtmMax: 2950,
      towballMax: 320,
      atmMax: 3200,
      axleGroupMax: 3000
    }
  }
};
