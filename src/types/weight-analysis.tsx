export type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
};

export type ReportInfo = {
  reportNumber: string;
  date: string;
  reportType: string;
  customer: CustomerInfo;

};

export type VehicleDetails = {
  year: string;
  make: string;
  model: string;
  variant: string;
  type: string;
  registration: string;
};

export type VehicleSpecs = {
  frontAxleMax: number;
  rearAxleMax: number;
  gvmMax: number;
  towballMax: number;
  gcmMax: number;
  btcMax: number;
};

export type VehicleWeights = {
  frontLeft: number;
  frontRight: number;
  rearLeft: number;
  rearRight: number;
  specs: VehicleSpecs;
};

export type TrailerAxle = {
  left: number;
  right: number;
};

export type TrailerSpecs = {
  gtmMax: number;
  towballMax: number;
  atmMax: number;
  axleGroupMax: number;
};

export type TrailerData = {
  details: VehicleDetails;
  towballWeight: number;
  axles: TrailerAxle[];
  specs: TrailerSpecs;
};

export type VehicleData = {
  details: VehicleDetails;
  unloaded: VehicleWeights;
  loaded: VehicleWeights;
};

export type WeightAnalysisData = {
  reportInfo: ReportInfo;
  vehicle: VehicleData;
  trailer: TrailerData;
};