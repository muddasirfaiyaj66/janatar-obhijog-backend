export const COMPLAINT_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
  CLOSED: 'closed',
} as const;

export const COMPLAINT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export const COMPLAINT_VISIBILITY = {
  PUBLIC: 'public',
  PRIVATE: 'private',
} as const;

export const DEPARTMENTS = {
  MUNICIPALITY: 'municipality',
  HEALTH: 'health',
  EDUCATION: 'education',
  WATER_SUPPLY: 'water-supply',
  ELECTRICITY: 'electricity',
  TRANSPORT: 'transport',
  ROAD_INFRASTRUCTURE: 'road-infrastructure',
  DRAINAGE: 'drainage',
  WASTE_MANAGEMENT: 'waste-management',
  LAW_ENFORCEMENT: 'law-enforcement',
  CORRUPTION: 'corruption',
  LAND_DISPUTES: 'land-disputes',
  ENVIRONMENTAL: 'environmental',
  SOCIAL_WELFARE: 'social-welfare',
  CONSUMER_RIGHTS: 'consumer-rights',
  SECURITY: 'security',
  TRAFFIC: 'traffic',
  PUBLIC_ORDER: 'public-order',
  OTHER: 'other',
} as const;

export type TDepartment = keyof typeof DEPARTMENTS;