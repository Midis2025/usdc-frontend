export interface JobPosting {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  mode: string;
  datePosted: string;
  validThrough: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  preferred: string[];
  environment: string;
  whyItMatters: string;
}

export const jobs: JobPosting[] = [
  {
    slug: "site-operations-leader-alabama",
    title: "Site Operations Leader / Alabama",
    department: "Operations",
    location: "Columbiana, Alabama",
    type: "Full-time",
    mode: "On-site",
    datePosted: "2026-07-15",
    validThrough: "2027-01-15",
    overview:
      "USDC operates AI infrastructure facilities serving GPU-as-a-Service and colocation customers. We are hiring a Site Operations Leader to own day-to-day operations at our Alabama facility and will be accountable for operational excellence as we bring additional facilities online. Your goals are to operate this site at Tier 3 (99.982% uptime), GPU infrastructure (99.9% availability), 100% SOP/MOP coverage & Change Management.\n\nThis is a hands-on, technical leadership role, based at our site. The right person has operated critical data center facilities, CPU/GPU infrastructures, built maintenance programs, managed onsite teams and held vendors accountable. You will be the most senior operational authority onsite.",
    responsibilities: [
      "Own day-to-day operations of live, GPU-dense, liquid-cooled data center facilities.",
      "Build and maintain a structured preventative maintenance program for all MEP systems: chiller plant, generators, ATS, fire suppression and power distribution.",
      "Develop and maintain SOPs, MOPs and emergency operating procedures grounded in industry best practices.",
      "Serve as onsite incident commander for MEP and infrastructure events.",
      "Monitor facility health through BMS/DCIM systems and drive resolution of anomalies before they become incidents.",
      "Monitor CPU/GPU rack health and Network health through DCIM systems and drive resolution of anomalies before they become incidents. Drive resolutions and escalations with support vendors.",
      "Manage RMA process with support vendors of GPU, MEP components while holding them accountable to their contracted SLA/SLO.",
      "Manage a growing team of multicraft technicians and site support personnel.",
      "Manage a team of smart hands operators with skills in networking, racks and compute infrastructure.",
      "Own work assignment, scheduling, shift coverage, performance management and training.",
      "Build a metrics-driven culture of operational discipline, accountability and continuous improvement.",
      "Interface with MEP vendors, ensuring contractual obligations and SLAs are met.",
      "Provide oversight of managed service providers supporting current and future facilities.",
      "Hold vendors accountable through documented performance tracking and regular business reviews.",
      "Support ISO 27001, ISO 22237 and SOC 2 certification efforts by owning facility-level evidence generation and operational documentation.",
      "Provide operational oversight during commissioning of new facilities, working alongside commissioning engineers and compliance partners with decision authority."
    ],
    qualifications: [
      "5+ years of experience operating mission-critical customer facing data center facilities (not IT infrastructure or enterprise server rooms).",
      "Direct experience building or managing a preventative maintenance program for MEP systems (cooling, power, fire suppression).",
      "Exposure to compliance programs such as SOC 2, ISO 27001, or ISO 22237.",
      "Demonstrated understanding of chiller plant operations, generator/ATS testing and fire suppression systems.",
      "Experience managing onsite technical teams in a 24/7 critical environment.",
      "Experience with vendor and/or MSP oversight and accountability.",
      "Familiarity with BMS/DCIM monitoring systems.",
      "Willingness to be based onsite in Columbiana, Alabama."
    ],
    preferred: [
      "Experience with liquid-cooled, high-density GPU compute environments.",
      "Experience with facility commissioning from the operator's perspective.",
      "Background in hyperscale, colocation, or AI infrastructure environments."
    ],
    environment:
      "On-site technical leadership role at our Columbiana, Alabama facility. Requires being the most senior operational authority onsite in a 24/7 critical environment.",
    whyItMatters:
      "This role is critical for driving operational excellence and high-availability (99.9% GPU availability, Tier 3 uptime) for our cutting-edge AI infrastructure as we scale."
  },
  {
    slug: "chiller-operator-columbiana",
    title: "Chiller Operator / Data Center Mechanical Technician",
    department: "Operations",
    location: "Columbiana, AL 35051",
    type: "Full-time",
    mode: "On-site",
    datePosted: "2026-03-02",
    validThrough: "2026-09-30",
    overview:
      "We are seeking an experienced Chiller Operator / Mechanical Technician to support mission-critical cooling infrastructure in a high-availability data center environment. This role is responsible for the operation, monitoring, maintenance and optimization of chilled water systems and associated mechanical equipment supporting redundant (N+1 / 2N) configurations. The ideal candidate has hands-on experience with industrial chillers, closed-loop cooling systems, pumps, heat exchangers and control systems.",
    responsibilities: [
      "Operate, start up, shut down and monitor water-cooled and air-cooled chillers, cooling towers and pumping systems.",
      "Maintain optimal system performance under continuous load conditions, monitoring flow rates and pressures.",
      "Operate and maintain N+1 and 2N redundant configurations and execute controlled failover procedures.",
      "Maintain and troubleshoot closed-loop chilled water systems, including expansion tanks and loop pressurization.",
      "Perform preventative and corrective maintenance on chillers, pumps, valves, actuators and VFDs.",
      "Utilize BMS / BAS / SCADA systems for monitoring and respond to alerts and alarms in real time.",
      "Follow all safety protocols, lockout/tagout procedures and maintain OSHA compliance standards.",
    ],
    qualifications: [
      "5+ years of experience operating and maintaining industrial or data center cooling systems.",
      "Hands-on experience with major chiller manufacturers (e.g., Trane, Carrier, York, Daikin).",
      "Strong understanding of hydronic systems, closed-loop cooling and redundant mechanical design.",
      "Ability to read P&IDs, mechanical drawings and electrical schematics.",
      "Experience in mission-critical or Tier III / Tier IV environments preferred.",
    ],
    preferred: [
      "EPA Certification (Universal).",
      "Experience with high-density AI / HPC cooling environments or direct-to-chip liquid cooling.",
      "Background in commissioning support and load bank testing.",
    ],
    environment:
      "24/7 critical infrastructure facility. May require shift work, on-call rotation and emergency response availability.",
    whyItMatters:
      "This position is critical to ensuring infrastructure reliability, scalability and operational excellence in a high-performance computing environment.",
  },
  {
    slug: "data-center-mep-engineer-manager",
    title: "Data Center MEP Engineer / MEP Manager",
    department: "Engineering",
    location: "Columbiana, AL",
    type: "Full-time",
    mode: "On-site",
    datePosted: "2026-03-02",
    validThrough: "2026-09-30",
    overview:
      "USDC is looking for a Data Center MEP Engineer / MEP Manager to lead the design, commissioning and operational oversight of mission-critical mechanical, electrical and plumbing systems in a high-performance data center facility. The ideal candidate combines deep technical expertise with strong project leadership capabilities across complex infrastructure environments.",
    responsibilities: [
      "Lead MEP engineering design reviews, ensuring compliance with Tier III/IV standards and local codes.",
      "Oversee installation, commissioning and integration of critical electrical and mechanical systems.",
      "Manage and coordinate with contractors, vendors and cross-functional teams during build-out and operations phases.",
      "Develop and maintain preventive maintenance programs for all MEP systems including UPS, generators, switchgear, chillers and fire suppression.",
      "Drive energy efficiency improvements and capacity planning across the facility.",
      "Ensure compliance with all safety, environmental and regulatory standards.",
      "Provide technical leadership for incident response and root-cause analysis.",
    ],
    qualifications: [
      "Bachelor's degree in Mechanical, Electrical, or related Engineering discipline.",
      "7+ years of experience in MEP engineering, with at least 3 years in data center environments.",
      "Proven track record managing MEP projects from design through commissioning.",
      "Deep understanding of redundant power and cooling architectures (N+1, 2N, 2N+1).",
      "Proficiency with BMS/BAS, SCADA and CMMS platforms.",
    ],
    preferred: [
      "Professional Engineer (PE) license or equivalent certification.",
      "Experience with high-density compute or AI/HPC infrastructure.",
      "LEED or energy management certifications.",
    ],
    environment:
      "Full-time, on-site role at USDC's Columbiana, AL facility. Occasional travel to other sites may be required.",
    whyItMatters:
      "This role directly shapes the reliability and scalability of USDC's data center infrastructure, ensuring world-class uptime for mission-critical AI workloads.",
  },
  {
    slug: "chiller-operator-north-tonawanda",
    title: "Chiller Operator / Data Center Mechanical Technician",
    department: "Operations",
    location: "1070 Erie Ave, North Tonawanda, NY 14120",
    type: "Full-time",
    mode: "On-site",
    datePosted: "2026-03-02",
    validThrough: "2026-09-30",
    overview:
      "We are seeking an experienced Chiller Operator / Mechanical Technician to support mission-critical cooling infrastructure at our North Tonawanda facility. This role is responsible for the operation, monitoring, maintenance and optimization of chilled water systems and associated mechanical equipment supporting redundant (N+1 / 2N) configurations.",
    responsibilities: [
      "Operate, start up, shut down and monitor water-cooled and air-cooled chillers, cooling towers and pumping systems.",
      "Maintain optimal system performance under continuous load conditions, monitoring flow rates and pressures.",
      "Operate and maintain N+1 and 2N redundant configurations and execute controlled failover procedures.",
      "Maintain and troubleshoot closed-loop chilled water systems, including expansion tanks and loop pressurization.",
      "Perform preventative and corrective maintenance on chillers, pumps, valves, actuators and VFDs.",
      "Utilize BMS / BAS / SCADA systems for monitoring and respond to alerts and alarms in real time.",
      "Follow all safety protocols, lockout/tagout procedures and maintain OSHA compliance standards.",
    ],
    qualifications: [
      "5+ years of experience operating and maintaining industrial or data center cooling systems.",
      "Hands-on experience with major chiller manufacturers (e.g., Trane, Carrier, York, Daikin).",
      "Strong understanding of hydronic systems, closed-loop cooling and redundant mechanical design.",
      "Ability to read P&IDs, mechanical drawings and electrical schematics.",
      "Experience in mission-critical or Tier III / Tier IV environments preferred.",
    ],
    preferred: [
      "EPA Certification (Universal).",
      "Experience with high-density AI / HPC cooling environments or direct-to-chip liquid cooling.",
      "Background in commissioning support and load bank testing.",
    ],
    environment:
      "24/7 critical infrastructure facility. May require shift work, on-call rotation and emergency response availability.",
    whyItMatters:
      "This position is critical to ensuring infrastructure reliability, scalability and operational excellence in a high-performance computing environment.",
  },
];

export function getJobBySlug(slug: string): JobPosting | undefined {
  return jobs.find((j) => j.slug === slug);
}

export function getAllSlugs(): string[] {
  return jobs.map((j) => j.slug);
}
