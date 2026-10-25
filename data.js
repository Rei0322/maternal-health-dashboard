// All figures sourced from primary reports — see index.html footer for full APA citations.

const MORTALITY_DATA = [
  { label: 'Norway', value: 0.0, group: 'peer' },
  { label: 'Switzerland', value: 1.2, group: 'peer' },
  { label: 'Sweden', value: 2.6, group: 'peer' },
  { label: 'Netherlands', value: 2.8, group: 'peer' },
  { label: 'Japan', value: 3.4, group: 'peer' },
  { label: 'Australia', value: 3.5, group: 'peer' },
  { label: 'Germany', value: 3.5, group: 'peer' },
  { label: 'United Kingdom', value: 5.5, group: 'peer' },
  { label: 'Canada', value: 8.4, group: 'peer' },
  { label: 'South Korea', value: 8.8, group: 'peer' },
  { label: 'U.S. — Asian', value: 13.2, group: 'us-sub' },
  { label: 'Chile', value: 14.3, group: 'peer' },
  { label: 'U.S. — Hispanic', value: 16.9, group: 'us-sub' },
  { label: 'U.S. — White', value: 19.0, group: 'us-sub' },
  { label: 'U.S. — All women', value: 22.3, group: 'us' },
  { label: 'U.S. — Black', value: 49.5, group: 'us-sub' },
];
const MORTALITY_YEAR = '2022';
const MORTALITY_SOURCE = 'Gunja et al., 2024, The Commonwealth Fund';
const PEER_AVERAGE = 4.9; // mean of the 11 non-U.S. peer countries above (54.0 / 11 = 4.91)

// Timing of pregnancy-related deaths in the U.S., 2017–2019 data
const TIMING_DATA = [
  { label: 'During pregnancy', value: 22 },
  { label: 'Day of delivery', value: 13 },
  { label: '1–6 days postpartum', value: 12 },
  { label: '7–42 days postpartum', value: 23 },
  { label: '43–365 days postpartum', value: 30 },
];
const TIMING_SOURCE = 'Agency for Healthcare Research and Quality, 2023';

// Paid maternity leave, weeks — OECD Family Database, PF2.1 (2025 table)
const LEAVE_DATA = [
  { label: 'United States', value: 0.0, group: 'us' },
  { label: 'Australia', value: 2.0, group: 'peer' },
  { label: 'South Korea', value: 12.9, group: 'peer' },
  { label: 'Sweden', value: 12.9, group: 'peer' },
  { label: 'Germany', value: 14.0, group: 'peer' },
  { label: 'Japan', value: 14.0, group: 'peer' },
  { label: 'Switzerland', value: 14.0, group: 'peer' },
  { label: 'Canada', value: 16.0, group: 'peer' },
  { label: 'France', value: 16.0, group: 'peer' },
  { label: 'Netherlands', value: 16.0, group: 'peer' },
  { label: 'Chile', value: 18.0, group: 'peer' },
  { label: 'Norway', value: 18.0, group: 'peer' },
  { label: 'New Zealand', value: 26.0, group: 'peer' },
  { label: 'United Kingdom', value: 39.0, group: 'peer' },
];
const OECD_AVERAGE_LEAVE = 18.4;
const LEAVE_SOURCE = 'OECD Family Database, PF2.1, 2025';

// Maternity care workforce, providers per 1,000 live births — 2018 data
const WORKFORCE_DATA = [
  { label: 'Canada', obgyn: 8, midwife: 4 },
  { label: 'United States', obgyn: 11, midwife: 4 },
  { label: 'Netherlands', obgyn: 10, midwife: 25 },
  { label: 'France', obgyn: 11, midwife: 30 },
  { label: 'Norway', obgyn: 12, midwife: 53 },
  { label: 'United Kingdom', obgyn: 11, midwife: 43 },
  { label: 'Switzerland', obgyn: 22, midwife: 32 },
  { label: 'Germany', obgyn: 27, midwife: 30 },
  { label: 'New Zealand', obgyn: 8, midwife: 46 },
  { label: 'Australia', obgyn: 7, midwife: 68 },
  { label: 'Sweden', obgyn: 12, midwife: 66 },
];
const WORKFORCE_SOURCE = 'Tikkanen et al., 2020, The Commonwealth Fund';
