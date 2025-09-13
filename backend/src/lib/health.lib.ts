import mongoose from 'mongoose';

export type ServicesStatus = 'connected' | 'disconnected';

export interface HealthStatus {
  status: 'OK' | 'FAIL';
  timestamp: string;
  uptime: number;
  services: {
    database: ServicesStatus;
  };
}

export const getHealthStatus = async (): Promise<HealthStatus> => {
  const dbStatus: ServicesStatus =
    mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  const status: HealthStatus = {
    status: dbStatus === 'connected' ? 'OK' : 'FAIL',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    services: {
      database: dbStatus,
    },
  };

  return status;
};
