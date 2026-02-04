# Nice Healthcare - Clinician Dispatch Dashboard

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:5173
```

## 📋 Important Resources

**📊 [Presentation Slides](https://docs.google.com/presentation/d/1d6SZ3m2114kMJi7AR-UuAIAxQxiAPMyP/edit?usp=drive_link&ouid=116334341324263710450&rtpof=true&sd=true)**: Project overview and key findings for interview discussion

**🏗️ [System Design Documentation](https://deluxe-daffodil-ce678a.netlify.app/)**: Scalability architecture and technical diagrams

**🚀 [Live Application](https://stellular-baklava-557562.netlify.app/)**: Deployed clinician dispatch dashboard

---


## Tech Stack

- React 18 + TypeScript
- Haversine formula for distance calculation

## Features

- Patient address input with validation
- Lab dropoff toggle
- Optimal clinician matching (minimizes total distance)
- Top 3 alternative options shown
- Distance savings vs worst case
- Performance metrics display

## Algorithm

**Approach**: Greedy optimization  
**Complexity**: O(n × m) where n = clinicians, m = labs

1. Geocode patient address to coordinates
2. Calculate total round-trip distance using Haversine
3. Return clinician with minimum distance

**Distance Calculation**: Haversine formula calculates crow-flies distance between coordinates. Accurate within ±20-30% of actual driving distance.

---

## Assumptions Made

### 1. Distance Calculation
**Assumption**: Using Haversine formula (crow-flies distance)  
**Reality**: Production needs Google Maps Distance Matrix API for actual driving routes  
**Trade-off**: Haversine is fast and free but ignores roads, traffic, and restrictions. Google Maps costs $5/1000 requests but provides real-world accuracy.

### 2. Lab Selection
**Assumption**: Always select nearest lab to patient  
**Reality**: Should consider lab hours, capacity, and test capabilities  
**Trade-off**: Simple nearest-distance works for MVP but production needs lab availability data.

### 3. Clinician Availability
**Assumption**: All clinicians are available at their home address  
**Reality**: Clinicians are mobile and have schedules  
**Trade-off**: Simplified for assignment but production requires calendar integration and GPS tracking.

### 4. Single Visit Optimization
**Assumption**: Each visit optimized independently  
**Reality**: Clinicians do 6-10 visits per day  
**Trade-off**: Greedy local optimization is simple but doesn't consider daily route clustering. Production needs batch optimization (TSP solver).

### 5. Address Validation
**Assumption**: Basic string validation only  
**Reality**: Need geocoding service to verify addresses exist  
**Trade-off**: Lightweight validation for demo but production needs Google Places Autocomplete.

---

## Q1: Production Limitations & User Issues

### Critical Issues

**1. Distance Inaccuracy**
- **Problem**: Haversine shows 15 miles, actual driving is 24 miles
- **User Impact**: Clinicians arrive late, routes take longer than estimated
- **Fix**: Integrate Google Maps Distance Matrix API (~$250/month)

**2. No Real-Time Availability**
- **Problem**: Shows all clinicians as available
- **User Impact**: May assign already-booked clinician, requires manual reassignment
- **Fix**: Calendar system integration (Google Calendar API or internal scheduling DB)

**3. Lab Hours Ignored**
- **Problem**: May route to closed lab at 5:15pm
- **User Impact**: Sample sits in car overnight, 24-hour test delay
- **Fix**: Lab hours database + time-aware routing

**4. No Traffic Awareness**
- **Problem**: 5pm assignment ignores rush hour
- **User Impact**: 30-minute estimate becomes 75 minutes actual
- **Fix**: Google Maps with `departure_time=now` for traffic data

### Medium Priority

**5. Address Validation Weak**
- **Problem**: Accepts typos, doesn't verify addresses exist
- **Fix**: Google Places Autocomplete API

**6. No Urgency Levels**
- **Problem**: Urgent visits treated same as routine checkups
- **Fix**: Priority queue system (urgent < 30min, same-day, scheduled)

### Low Priority

**7. Scalability at 500+ Clinicians**
- **Problem**: O(n×m) becomes slow (current: 5ms → future: 2000ms)
- **Fix**: Spatial indexing (R-tree) to search nearby candidates only

---

## Q2: Factors Beyond Drive Time

### Clinician Factors

**Current Location** (Most Important)
- Home base irrelevant if clinician just finished visit 30 miles away
- Need GPS tracking to use actual current location

**Skills & Certifications**
- Pediatrics, X-ray technician, ultrasound, phlebotomy
- Wrong assignment = wasted visit or safety issue

**Workload Balancing**
- Track visits/day, miles/day, hours worked
- Prevent burnout, ensure fairness

**Equipment Availability**
- Portable X-ray, ultrasound, EKG machines
- Can't do X-ray without the machine

### Patient Factors

**Time Windows**
- Patient wants "2pm-4pm" but nearest clinician fully booked
- Should assign 2nd-nearest who's available in that window

**Continuity of Care**
- Chronic condition patients do better seeing same clinician