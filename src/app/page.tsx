import VehicleWeightAnalysis from '@/components/weight-analysis/VehicleWeightAnalysis';
import { sampleWeightData } from '@/data/sampleWeightData';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="container mx-auto">
        <VehicleWeightAnalysis data={sampleWeightData} />
      </div>
    </main>
  );
}