export const researchAreas = [
  {
    id: 'forest',
    num: '01',
    icon: 'Trees',
    title: 'Forest & Ecosystem Mapping',
    desc: 'Forest fragmentation, canopy height, aboveground biomass, and biodiversity assessment using multi-source remote sensing data.',
    accent: '#2a9d8f',
  },
  {
    id: 'geoai',
    num: '02',
    icon: 'Cpu',
    title: 'GeoAI & Deep Learning',
    desc: 'Convolutional neural networks, multi-modal learning, and retrieval-augmented models for geospatial applications.',
    accent: '#e76f51',
  },
  {
    id: 'climate',
    num: '03',
    icon: 'CloudRain',
    title: 'Climate & Disaster Risk',
    desc: 'Landslide susceptibility, flood hazard mapping, and climate-driven habitat change using spatial modeling.',
    accent: '#264653',
  },
  {
    id: 'urban',
    num: '04',
    icon: 'Building2',
    title: 'Urban & Land Use Analysis',
    desc: 'Urban sprawl monitoring, heat island dynamics, land cover change detection, and sustainable urban planning.',
    accent: '#f4a261',
  },
  {
    id: 'air',
    num: '05',
    icon: 'Wind',
    title: 'Air Quality & Public Health',
    desc: 'Geospatial modelling of air pollutants, COPD clusters, and health equity using satellite-derived environmental data.',
    accent: '#2a9d8f',
  },
  {
    id: 'agri',
    num: '06',
    icon: 'Sprout',
    title: 'Agriculture & Food Security',
    desc: 'Crop type mapping, field boundary segmentation, and land suitability analysis using SAR and optical time-series.',
    accent: '#e9c46a',
  },
  {
    id: 'ecology',
    num: '07',
    icon: 'MapPin',
    title: 'Spatial Ecology & SDM',
    desc: 'Species distribution modelling (MaxEnt), soundscape mapping, and biodiversity monitoring across mountain ecosystems.',
    accent: '#2a9d8f',
  },
  {
    id: 'water',
    num: '08',
    icon: 'Droplets',
    title: 'Water Resources',
    desc: "Groundwater potential delineation, water quality assessment, and streamflow trend analysis in Pakistan's river basins.",
    accent: '#264653',
  },
]

export const focusAreas = [
  'Satellite image analysis and land cover change detection',
  'GeoAI and deep learning for Earth observation',
  'Forest mapping, biodiversity and ecosystem monitoring',
  'Climate resilience and disaster risk assessment',
  'Urban sprawl and spatial decision-making',
  'Cloud-based geospatial analytics (Google Earth Engine)',
  'Multi-modal AI: satellite, audio, text, sensor fusion',
  'Capacity building in GIS and remote sensing',
]

// Each tool: { name, logo }. `logo` can be a CDN URL or a local file in public/logos/.
// If a logo image fails to load (or logo is ''), the pill gracefully shows just the name.
export const tools = [
  { name: 'Google Earth Engine', logo: 'https://cdn.jsdelivr.net/npm/simple-icons/icons/googleearthengine.svg' },
  { name: 'ArcGIS Pro',          logo: 'https://cdn.jsdelivr.net/npm/simple-icons/icons/arcgis.svg' },
  { name: 'QGIS',                logo: 'https://cdn.jsdelivr.net/npm/simple-icons/icons/qgis.svg' },
  { name: 'Python',              logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'R',                   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
  { name: 'PyTorch',             logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'TensorFlow',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Sentinel-1 / 2',      logo: '/logos/sentinel.png' },
  { name: 'Landsat',             logo: '/logos/landsat.png' },
  { name: 'MODIS',               logo: '/logos/modis.png' },
  { name: 'LiDAR',               logo: '' },
  { name: 'SAR',                 logo: '' },
]
