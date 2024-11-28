// Corrected and improved code for VehicleWeightAnalysis.tsx

"use client";

import { FC, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  Car,
  Caravan,
  Info,
  User,
  Calendar,
  Hash,
  File,
  FileText,
  Scale,
  CircleDot,
} from "lucide-react";
import { TabButton } from "./TabButton";
import { WeightDisplay } from "./WeightDisplay";
import { InfoCard } from "./InfoCard";
import { DetailsGrid } from "./DetailsGrid";
import { WeightAnalysisCard } from "./WeightAnalysisCard";
import { WeightAnalysisData } from "../../types/weight-analysis";
import Image from "next/image";

// Import images
import FrontLeftImage from "../../../public/Front Left.png";
import FrontRightImage from "../../../public/Front Right.png";
import RearLeftImage from "../../../public/Rear Left.png";
import RearRightImage from "../../../public/Rear Right.png";

interface VehicleWeightAnalysisProps {
  data: WeightAnalysisData;
}

const tabTitleMap: Record<string, string> = {
  details: "Info",
  unloaded: "Vehicle Only",
  loaded: "Vehicle + Trailer",
  trailer: "Trailer",
};

export const VehicleWeightAnalysis: FC<VehicleWeightAnalysisProps> = ({
  data,
}) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] =
    useState<keyof typeof tabTitleMap>("unloaded");

  const currentVehicle =
    activeTab !== "details"
      ? data.vehicle[activeTab as "loaded" | "unloaded"]
      : null;

  // Calculate weights
  const frontAxleWeight = currentVehicle
    ? currentVehicle.frontLeft + currentVehicle.frontRight
    : 0;
  const rearAxleWeight = currentVehicle
    ? currentVehicle.rearLeft + currentVehicle.rearRight
    : 0;
  const vehicleWeight = frontAxleWeight + rearAxleWeight;

  const trailerAxleWeights = data.trailer.axles.reduce(
    (total: number, axle: { left: number; right: number }) =>
      total + axle.left + axle.right,
    0
  );

  const totalCombinationMass =
    vehicleWeight +
    trailerAxleWeights +
    (activeTab === "loaded" ? data.trailer.towballWeight : 0);

  // Calculate towing capacity
  const towingCapacity = trailerAxleWeights;

  // Calculate Aggregate Trailer Mass (ATM)
  const aggregateTrailerMass = trailerAxleWeights + data.trailer.towballWeight;

  return (
    <Card className="w-full max-w-4xl bg-white shadow-xl rounded-xl overflow-hidden">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Scale className="h-6 w-6 text-white" />
                </div>
                <span>Mass Analysis: {tabTitleMap[activeTab]}</span>
              </CardTitle>
            </div>
          </div>
          <div></div>
          <InfoCard
            title="Report Details"
            icon={File}
            data={{ reportInfo: data.reportInfo }}
          >
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Name</div>
                    <div className="font-medium">
                      {data.reportInfo.customer.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Phone</div>
                    <div className="font-medium">
                      {data.reportInfo.customer.phone}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Email</div>
                    <div className="font-medium">
                      {data.reportInfo.customer.email}
                    </div>
                  </div>
                </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-500" />
                <span>{data.reportInfo.reportType}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{data.reportInfo.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-500" />
                <span>{data.reportInfo.reportNumber}</span>
              </div>
            </div>
          </InfoCard>

          <div className="flex gap-2 p-1 bg-white rounded-full shadow-sm">
            <TabButton
              id="details"
              label="Info"
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <TabButton
              id="unloaded"
              label="Vehicle Only"
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <TabButton
              id="loaded"
              label="Vehicle + Trailer"
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <TabButton
              id="trailer"
              label="Trailer"
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {activeTab === "details" && (
            <>
              <InfoCard
                title="Customer Details"
                icon={User}
                data={{ reportInfo: data.reportInfo }}
              >
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-500">Name</div>
                    <div className="font-medium">
                      {data.reportInfo.customer.name}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Phone</div>
                    <div className="font-medium">
                      {data.reportInfo.customer.phone}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Email</div>
                    <div className="font-medium">
                      {data.reportInfo.customer.email}
                    </div>
                  </div>
                </div>
              </InfoCard>
              <InfoCard
                title="Vehicle Details"
                icon={Car}
                data={{ reportInfo: data.reportInfo }}
              >
                <DetailsGrid details={data.vehicle.details} />
              </InfoCard>
              <InfoCard
                title="Trailer Details"
                icon={Caravan}
                data={{ reportInfo: data.reportInfo }}
              >
                <DetailsGrid details={data.trailer.details} />
              </InfoCard>
            </>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-8 bg-gradient-to-br from-gray-50 to-gray-100">
        {(activeTab === "unloaded" || activeTab === "loaded") &&
          currentVehicle && (
            <>
              <InfoCard
                title="Vehicle Details"
                icon={Car}
                data={{ reportInfo: data.reportInfo }}
              >
                <DetailsGrid details={data.vehicle.details} />
              </InfoCard>
              
              <InfoCard
                title={`Measured Mass`}
                icon={Scale} // Use the icon if applicable
                data={{ reportInfo: data.reportInfo }} // Pass relevant data here if needed
              />

              {/* Vehicle Section */}
              <div className="space-y-6">
                {/* Updated Wheel Weights Section */}
                <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-md">
                  <div className="flex items-center gap-2 mb-4">
                    <CircleDot className="h-5 w-5 text-gray-400" />
                    <span className="font-semibold text-gray-700 text-lg">
                      Wheel Weights
                    </span>
                  </div>
                  <div className="grid grid-cols-6 gap-4 items-center">
                    <Image
                      src={FrontLeftImage}
                      alt="Front Left"
                      className="col-span-1 rounded-lg"
                      layout="intrinsic"
                    />
                    <WeightDisplay
                      className="col-span-2 text-center"
                      label="Front Left"
                      weight={currentVehicle.frontLeft}
                      isHighlighted={
                        activeSection === "front" || activeSection === "gvm"
                      }
                    />
                    <Image
                      src={FrontRightImage}
                      alt="Front Right"
                      className="col-span-1 rounded-lg"
                      layout="intrinsic"
                    />
                    <WeightDisplay
                      label="Front Right"
                      weight={currentVehicle.frontRight}
                      isHighlighted={
                        activeSection === "front" || activeSection === "gvm"
                      }
                      className="col-span-2 text-center"
                    />
                    <Image
                      src={RearLeftImage}
                      alt="Rear Left"
                      className="col-span-1 rounded-lg"
                      layout="intrinsic"
                    />
                    <WeightDisplay
                      label="Rear Left"
                      weight={currentVehicle.rearLeft}
                      isHighlighted={
                        activeSection === "rear" || activeSection === "gvm"
                      }
                      className="col-span-2 text-center"
                    />
                    <Image
                      src={RearRightImage}
                      alt="Rear Right"
                      className="col-span-1 rounded-lg"
                      layout="intrinsic"
                    />
                    <WeightDisplay
                      label="Rear Right"
                      weight={currentVehicle.rearRight}
                      isHighlighted={
                        activeSection === "rear" || activeSection === "gvm"
                      }
                      className="col-span-2 text-center"
                    />
                  </div>
                </div>

                {/* Weight Analysis Section */}
                <div className="space-y-4">
                  <WeightAnalysisCard
                    title="Front Axle"
                    current={frontAxleWeight}
                    max={currentVehicle.specs.frontAxleMax}
                    formula={`${currentVehicle.frontLeft}kg + ${currentVehicle.frontRight}kg = ${frontAxleWeight}kg`}
                    section="front"
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                  />
                  <WeightAnalysisCard
                    title="Rear Axle"
                    current={rearAxleWeight}
                    max={currentVehicle.specs.rearAxleMax}
                    formula={`${currentVehicle.rearLeft}kg + ${currentVehicle.rearRight}kg = ${rearAxleWeight}kg`}
                    section="rear"
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                  />
                  <WeightAnalysisCard
                    title="Gross Vehicle Mass (GVM)"
                    current={vehicleWeight}
                    max={currentVehicle.specs.gvmMax}
                    formula={`Front: ${frontAxleWeight}kg + Rear: ${rearAxleWeight}kg = ${vehicleWeight}kg`}
                    section="gvm" // Set the section to 'gvm' for hover/click handling
                    activeSection={activeSection}
                    onSectionChange={setActiveSection} // This will activate highlighting for all wheels
                  />
                  {activeTab === "loaded" && (
                    <>

                      <WeightAnalysisCard
                        title="Tow Ball Load (TBL)"
                        current={data.trailer.towballWeight}
                        max={data.vehicle.unloaded.specs.towballMax}
                        formula={`Tow Ball Weight: ${data.trailer.towballWeight}kg`}
                        section="towball"
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                      >
                      </WeightAnalysisCard>
                      
                      <WeightAnalysisCard
                        title="Towing Capacity (TC)"
                        current={towingCapacity}
                        max={data.trailer.specs.gtmMax}
                        formula={`Trailer GTM: ${trailerAxleWeights}kg`}
                        section="towingCapacity"
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                      >
                      </WeightAnalysisCard>

                      <WeightAnalysisCard
                        title="Gross Combination Mass (GCM)"
                        current={totalCombinationMass}
                        max={currentVehicle.specs.gcmMax}
                        formula={`Vehicle (${vehicleWeight}kg) + Trailer (${
                          trailerAxleWeights + data.trailer.towballWeight
                        }kg) = ${totalCombinationMass}kg`}
                        section="gcm"
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                      >
                      </WeightAnalysisCard>
                    
                    </>
                  )}
                </div>
              </div>
            </>
          )}

        {activeTab === "trailer" && (
          <>
            <InfoCard
              title="Trailer Details"
              icon={Caravan}
              data={{ reportInfo: data.reportInfo }}
            >
              <DetailsGrid details={data.trailer.details} />
            </InfoCard>
            {/* Trailer Section */}
            <div className="space-y-6 pt-6 border-t border-gray-200">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Front Axle
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <WeightDisplay
                      label="Left"
                      weight={data.trailer.axles[0].left}
                      isHighlighted={activeSection === "trailerFront"}
                    />
                    <WeightDisplay
                      label="Right"
                      weight={data.trailer.axles[0].right}
                      isHighlighted={activeSection === "trailerFront"}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Rear Axle
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <WeightDisplay
                      label="Left"
                      weight={data.trailer.axles[1].left}
                      isHighlighted={activeSection === "trailerRear"}
                    />
                    <WeightDisplay
                      label="Right"
                      weight={data.trailer.axles[1].right}
                      isHighlighted={activeSection === "trailerRear"}
                    />
                  </div>
                </div>

                <WeightAnalysisCard
                  title="Tow Ball Load (TBL)"
                  current={data.trailer.towballWeight}
                  max={data.trailer.specs.towballMax}
                  formula={`Tow Ball Weight: ${data.trailer.towballWeight}kg`}
                  section="towball"
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                >
                </WeightAnalysisCard>
               
                <WeightAnalysisCard
                  title="Gross Trailer Mass (GTM)"
                  current={trailerAxleWeights}
                  max={data.trailer.specs.gtmMax}
                  formula={`Front: ${
                    data.trailer.axles[0].left + data.trailer.axles[0].right
                  }kg + Rear: ${
                    data.trailer.axles[1].left + data.trailer.axles[1].right
                  }kg = ${trailerAxleWeights}kg`}
                  section="grossTrailerMass"
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                >
                </WeightAnalysisCard>

                <WeightAnalysisCard
                  title="Aggregate Trailer Mass (ATM)"
                  current={aggregateTrailerMass}
                  max={data.trailer.specs.atmMax}
                  formula={`GTM: ${trailerAxleWeights}kg + Tow Ball Load: ${data.trailer.towballWeight}kg = ${aggregateTrailerMass}kg`}
                  section="aggregateTrailerMass"
                  activeSection={activeSection}
                  onSectionChange={setActiveSection}
                  details="The total weight of the trailer and its load when uncoupled from the tow vehicle, including the Tow Ball Load (TBL)."
                >
                 
                </WeightAnalysisCard>


              </div>
            </div>
          </>
        )}

        {/* Disclaimer */}
        <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>
              This report is advisory only and cannot be used for insurance,
              registration, or certification purposes. While all care is taken
              to ensure the accuracy of information, we accept no responsibility
              for any non-compliance associated with manufacturers, legislative
              or regulatory requirements.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleWeightAnalysis;
