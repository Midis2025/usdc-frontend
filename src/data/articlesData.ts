/* Single source of truth for News & Insights articles.
   Consumed by the /news-insights page and the homepage NEWS & INSIGHT section. */

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  readTime: string;
  date: string;
  featured?: boolean;
  trending?: boolean;
  url?: string;
  content: string;
}

export const articlesData: Article[] = [
  {
    id: "nvidia-cloverleaf-investment",
    title: "Nvidia invests in data center developer Cloverleaf Infrastructure",
    excerpt: "Nvidia has taken a minority stake in Cloverleaf Infrastructure to help develop the power and site infrastructure behind AI data center projects across the United States.",
    category: "Data Centers",
    image: "/gpu_board_1.avif",
    readTime: "3 Min Read",
    date: "August 21, 2026",
    url: "https://www.reuters.com/technology/nvidia-invests-data-center-developer-cloverleaf-infrastructure-2026-08-21/",
    content: "Nvidia has made a minority investment in privately held Cloverleaf Infrastructure to develop the infrastructure needed to power AI data center projects across the United States, the companies said. Financial terms were not disclosed by either party, though the Wall Street Journal reported that Nvidia was expected to invest several hundred million dollars in the developer. The investment is intended to help Cloverleaf secure and develop sites, while Nvidia supports the wider infrastructure buildout required for AI computing. Founded in 2024, Cloverleaf works with utilities, energy providers and investors to lock in power and supporting infrastructure for data center sites, and has delivered multiple gigawatt-scale projects across North America. The deal underlines how chipmakers are moving upstream into power and land development as electricity access, rather than silicon supply, increasingly becomes the binding constraint on AI capacity."
  },
  {
    id: "ai-infrastructure-billions",
    title: "Factbox: Companies pouring billions to advance AI infrastructure",
    excerpt: "A running Reuters tally of the multibillion-dollar commitments technology companies, cloud providers and investors have made to build out AI computing capacity.",
    category: "Infrastructure",
    image: "/news_ai_network.avif",
    readTime: "4 Min Read",
    date: "July 22, 2026",
    url: "https://www.reuters.com/business/autos-transportation/companies-pouring-billions-advance-ai-infrastructure-2026-07-22/",
    content: "Since the launch of ChatGPT in 2022, technology companies, chipmakers, cloud providers and infrastructure investors have committed extraordinary sums to expanding the compute and power capacity that artificial intelligence depends on. This Reuters factbox tracks those commitments as they are announced, covering chip supply agreements, multi-year cloud capacity deals, joint ventures and direct investment into data center development. The scale of the pledges spans from multibillion-dollar model-training partnerships to hundred-billion-dollar infrastructure programs backed by sovereign and institutional capital. Taken together, the entries illustrate a buildout in which securing electricity, land and grid interconnection has become as strategically important as securing accelerators, and in which the capital intensity of AI infrastructure now rivals that of traditional utility and energy megaprojects."
  },
  {
    id: "blackwell-expansion",
    title: "Microsoft Expects to Spend $80 Bn on Ai-enabled data centers in fiscal 2025",
    excerpt: "An in-depth look at USDC's latest grid-scale integration, enabling rapid deployment of liquid-cooled Blackwell architectures within\na 12-month timeline. Microsoft Expects to Spend $80 Bn on Ai-enabled data centers in fiscal 2025.",
    category: "Infrastructure",
    image: "/news_ai_chip.avif",
    readTime: "6 Min Read",
    date: "January 13, 2025",
    url: "https://blogs.microsoft.com/on-the-issues/2025/01/03/the-golden-opportunity-for-american-ai/",
    content: "USDC has officially finalized the grid-interconnection agreements for its newest AI-dedicated datacenter campus. This facility is engineered specifically to house ultra-high-density Blackwell compute clusters. By integrating dedicated 115kV high-voltage substations directly on-site, the deployment accelerates the infrastructure timeline from the industry-average 3 years down to just 4 months. Powering these systems requires extreme heat rejection. Our proprietary liquid-to-air cooling loops run directly to the rack level, maintaining thermal equilibrium even during massive parallel training runs. As demand for compute grows exponentially, scaling with modular containment structures will remain the cornerstone of USDC's deployment strategies."
  },
  {
    id: "liquid-cooling-air-death",
    title: "McKinsey & Co on AI power: Expanding data center capacity to meet growing demand",
    excerpt: "Analyzing the thermodynamic limits of standard air systems and why modular liquid-to-air cooling loops are critical for the next wave of gigawatt clusters.",
    category: "Technology",
    image: "/arms200_server.avif",
    readTime: "5 Min Read",
    date: "December 30, 2024",
    trending: true,
    url: "https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/ai-power-expanding-data-center-capacity-to-meet-growing-demand",
    content: "Traditional air-cooled servers are rapidly approaching their physical heat dissipation limits. As modern GPUs exceed 700W to 1000W thermal design power (TDP), pushing cold air through server racks is no longer economically or physically viable. USDC is transitioning all high-density nodes to direct-to-chip liquid cooling systems. By bringing water/glycol loops directly into contact with copper cold plates mounted on the processing silicon, heat transfer efficiency is increased by over 40x. This architectural pivot reduces the Power Usage Effectiveness (PUE) to an exceptional 1.12, saving millions of kilowatt-hours annually and paving the path for next-generation compute density."
  },
  {
    id: "microgrid-clean-energy",
    title: "AI Power: Expanding data center capacity to meet growing demand",
    excerpt: "USDC pioneers multi-source energy orchestration, combining grid connection with dedicated onsite solar and battery storage systems.",
    category: "Data Centers",
    image: "/about_globe_full.avif",
    readTime: "4 Min Read",
    date: "December 21, 2024",
    trending: true,
    url: "https://www.usdatacenters.ai/news/revolutionizing-data-center-efficiency-the-rise-of-liquid-cooling-systems-ntr54-wfnkl",
    content: "Grid bottlenecks are currently the largest constraint for high-performance computing deployment. To combat this, USDC's engineering team is rolling out localized microgrid designs. These microgrids dynamically switch and blend power sources between traditional grid interconnections, utility-scale onsite solar PV systems and battery energy storage systems (BESS). An AI-driven energy orchestration engine forecasts real-time grid prices and solar output, charging batteries during off-peak hours and discharging them during peak stress times. This ensures 99.999% uptime while maximizing the utilization of clean, renewable energy."
  }
];

export const sortedArticles: Article[] = [...articlesData].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
