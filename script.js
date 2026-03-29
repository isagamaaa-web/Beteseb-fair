    
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // Fast element data structure for quick lookups
    class FastElementLookup {
      constructor(elements) {
        this.elements = elements;
        this.nameMap = new Map();
        this.symbolMap = new Map();
        this.numberMap = new Map();
        this.allData = elements; // Store all elements for reference
        
        // Build lookup maps
        elements.forEach(el => {
          this.nameMap.set(el.name.toLowerCase(), el);
          this.symbolMap.set(el.s.toLowerCase(), el);
          this.numberMap.set(el.n, el);
          // Add common aliases
          if (el.s === 'Na') this.symbolMap.set('sodium', el);
          if (el.s === 'K') this.symbolMap.set('potassium', el);
          if (el.s === 'Fe') this.symbolMap.set('iron', el);
          if (el.s === 'Cu') this.symbolMap.set('copper', el);
          if (el.s === 'Ag') this.symbolMap.set('silver', el);
          if (el.s === 'Au') this.symbolMap.set('gold', el);
          if (el.s === 'Hg') this.symbolMap.set('mercury', el);
          if (el.s === 'Pb') this.symbolMap.set('lead', el);
          if (el.s === 'Sn') this.symbolMap.set('tin', el);
          if (el.s === 'Sb') this.symbolMap.set('antimony', el);
          if (el.s === 'W') this.symbolMap.set('tungsten', el);
        });
      }
      
      find(query) {
        query = query.toLowerCase().trim();
        
        // Check symbol
        if (this.symbolMap.has(query)) {
          return this.symbolMap.get(query);
        }
        
        // Check name
        if (this.nameMap.has(query)) {
          return this.nameMap.get(query);
        }
        
        // Check number
        const num = parseInt(query);
        if (!isNaN(num) && this.numberMap.has(num)) {
          return this.numberMap.get(num);
        }
        
        // Check partial matches in name
        for (const [name, element] of this.nameMap) {
          if (name.includes(query)) {
            return element;
          }
        }
        
        return null;
      }
      
      // Get all elements for reference
      getAll() {
        return this.allData;
      }
    }

    // Data: ALL 118 chemical elements WITH DISCOVERY DATES AND DISCOVERERS
    const ELEMENTS = [
      {n:1,s:'H',name:'Hydrogen',cat:'Nonmetal',summary:'Lightest element. Forms H2; major component of stars and important industrial feedstock.',can:'Form water, fuels, acids; fuel cell energy carrier, form isotopes, absorb or release energy, bond with multiple elements',cannot:'Exist often as single atoms under normal conditions,exist liquid at room temp, conduct electricity, exist freely on Earth',uses:'Fuel cells, ammonia production, rockets',discoveryYear:'1766',discoverer:'Henry Cavendish'},
      {n:2,s:'He',name:'Helium',cat:'Noble gas',summary:'Inert light gas. Low boiling point and used for cooling and balloons.',can:'Provide inert environment; cool to cryogenic temps',cannot:'Form stable compounds easily',uses:'Balloons, MRI cooling, cryogenics',discoveryYear:'1868',discoverer:'Pierre Janssen, Norman Lockyer'},
      {n:3,s:'Li',name:'Lithium',cat:'Alkali metal',summary:'Soft, reactive metal; key in rechargeable batteries.',can:'Store energy, form strong batteries',cannot:'Be left in air/water unprotected',uses:'Li-ion batteries, alloys, psychiatry (lithium salts)',discoveryYear:'1817',discoverer:'Johan August Arfwedson'},
      {n:4,s:'Be',name:'Beryllium',cat:'Alkaline earth',summary:'Light rigid metal, toxic dust; used in aerospace.',can:'Make strong lightweight alloys',cannot:'Be handled as dust safely',uses:'Aerospace, X-ray windows, nuclear',discoveryYear:'1798',discoverer:'Louis Nicolas Vauquelin'},
      {n:5,s:'B',name:'Boron',cat:'Metalloid',summary:'Hard, high-melting semiconductor-like element used in glasses and detergents.',can:'Harden glass, act as semiconductor dopant',cannot:'Conduct like metals',uses:'Borosilicate glass, detergents, semiconductors',discoveryYear:'1808',discoverer:'Joseph Louis Gay-Lussac, Louis Jacques Thénard'},
      {n:6,s:'C',name:'Carbon',cat:'Nonmetal',summary:'Basis of organic chemistry; forms many allotropes from graphite to diamond.',can:'Form millions of compounds; build life molecules',cannot:'Turn into other elements chemically',uses:'Organic chemistry, materials (graphene, diamonds)',discoveryYear:'Ancient',discoverer:'Known since antiquity'},
      {n:7,s:'N',name:'Nitrogen',cat:'Nonmetal',summary:'Inert diatomic gas at STP; essential for life and fertilizers.',can:'Form strong triple bonds; make ammonia',cannot:'React easily at room temp',uses:'Fertilizers, cryogenics, atmosphere control',discoveryYear:'1772',discoverer:'Daniel Rutherford'},
      {n:8,s:'O',name:'Oxygen',cat:'Nonmetal',summary:'Supports combustion and respiration; highly reactive with many elements.',can:'Support combustion, oxidize materials',cannot:'Burn alone',uses:'Medical oxygen, steelmaking, respiration',discoveryYear:'1774',discoverer:'Joseph Priestley, Carl Wilhelm Scheele'},
      {n:9,s:'F',name:'Fluorine',cat:'Halogen',summary:'Most reactive nonmetal; forms strong bonds and many compounds.',can:'React with nearly everything',cannot:'Be handled without containment',uses:'Fluorinated compounds, uranium processing',discoveryYear:'1886',discoverer:'Henri Moissan'},
      {n:10,s:'Ne',name:'Neon',cat:'Noble gas',summary:'Inert gas used in lighting for neon signs.',can:'Produce bright signage when electrified',cannot:'Form compounds easily',uses:'Neon lights, indicators',discoveryYear:'1898',discoverer:'William Ramsay, Morris Travers'},
      {n:11,s:'Na',name:'Sodium',cat:'Alkali metal',summary:'Reactive soft metal; common in salts and industrial chemicals.',can:'Form strong bases, salts',cannot:'Be stored in air/water without protection',uses:'Salt production, soap, street lighting',discoveryYear:'1807',discoverer:'Humphry Davy'},
      {n:12,s:'Mg',name:'Magnesium',cat:'Alkaline earth',summary:'Light metal that burns with bright white flame; structural uses.',can:'Strengthen alloys, burn brightly',cannot:'Resist strong acids well',uses:'Alloys, fireworks, medicine',discoveryYear:'1755',discoverer:'Joseph Black'},
      {n:13,s:'Al',name:'Aluminium',cat:'Post-transition',summary:'Light, corrosion-resistant metal used widely in industry.',can:'Resist corrosion, conduct electricity',cannot:'Be strongly magnetic',uses:'Aerospace, packaging, construction',discoveryYear:'1825',discoverer:'Hans Christian Ørsted'},
      {n:14,s:'Si',name:'Silicon',cat:'Metalloid',summary:'Semiconductor backbone used in electronics and glass.',can:'Act as semiconductor, form silicates',cannot:'Conduct like metals',uses:'Chips, solar cells, glass',discoveryYear:'1824',discoverer:'Jöns Jacob Berzelius'},
      {n:15,s:'P',name:'Phosphorus',cat:'Nonmetal',summary:'Essential to life (DNA/ATP); reactive allotropes exist.',can:'Build biological molecules, fertilize',cannot:'Be exposed as white P to air',uses:'Fertilizers, match heads, biochemistry',discoveryYear:'1669',discoverer:'Hennig Brand'},
      {n:16,s:'S',name:'Sulfur',cat:'Nonmetal',summary:'Yellow brittle solid used in industry, forms sulfuric acid.',can:'Make acids and sulfides',cannot:'Dissolve well in water',uses:'Sulfuric acid, vulcanization, fertilizers',discoveryYear:'Ancient',discoverer:'Known since antiquity'},
      {n:17,s:'Cl',name:'Chlorine',cat:'Halogen',summary:'Reactive green gas used as disinfectant and in compounds.',can:'Disinfect and form salts',cannot:'Be inhaled safely in pure form',uses:'Bleach, disinfection, PVC production',discoveryYear:'1774',discoverer:'Carl Wilhelm Scheele'},
      {n:18,s:'Ar',name:'Argon',cat:'Noble gas',summary:'Inert gas commonly used as shield gas in welding.',can:'Provide inert atmosphere',cannot:'Form many compounds',uses:'Welding, lighting, preservation',discoveryYear:'1894',discoverer:'Lord Rayleigh, William Ramsay'},
      {n:19,s:'K',name:'Potassium',cat:'Alkali metal',summary:'Essential biological metal, highly reactive when pure.',can:'Support biological functions, form salts',cannot:'Be stored unprotected',uses:'Fertilizers, biology, fireworks',discoveryYear:'1807',discoverer:'Humphry Davy'},
      {n:20,s:'Ca',name:'Calcium',cat:'Alkaline earth',summary:'Essential for bones; common in minerals like limestone.',can:'Form bones, build cement',cannot:'Be found free in nature',uses:'Construction (cement), biology, metallurgy',discoveryYear:'1808',discoverer:'Humphry Davy'},
      {n:21,s:'Sc',name:'Scandium',cat:'Transition metal',summary:'Light transition metal used in aerospace alloys.',can:'Strengthen aluminum alloys',cannot:'Be found in large deposits',uses:'Alloys, lighting',discoveryYear:'1879',discoverer:'Lars Fredrik Nilson'},
      {n:22,s:'Ti',name:'Titanium',cat:'Transition metal',summary:'Strong, corrosion-resistant metal widely used in aerospace and implants.',can:'Resist corrosion, be biocompatible',cannot:'React easily under normal conditions',uses:'Aircraft, implants, tools',discoveryYear:'1791',discoverer:'William Gregor'},
      {n:23,s:'V',name:'Vanadium',cat:'Transition metal',summary:'Used to strengthen steel and in catalysts.',can:'Increase steel strength',cannot:'Melt easily',uses:'Alloys, catalysts',discoveryYear:'1801',discoverer:'Andrés Manuel del Río'},
      {n:24,s:'Cr',name:'Chromium',cat:'Transition metal',summary:'Shiny metal used for plating and stainless steel.',can:'Provide corrosion resistance',cannot:'Be safe as hexavalent chromium',uses:'Plating, stainless steel',discoveryYear:'1797',discoverer:'Louis Nicolas Vauquelin'},
      {n:25,s:'Mn',name:'Manganese',cat:'Transition metal',summary:'Key alloying element for steel and batteries.',can:'Strengthen steel and act in enzymes',cannot:'Replace iron in magnetic roles',uses:'Steelmaking, batteries',discoveryYear:'1774',discoverer:'Johan Gottlieb Gahn'},
      {n:26,s:'Fe',name:'Iron',cat:'Transition metal',summary:'Abundant metal, magnetic, basis for steel production.',can:'Be magnetic and form alloys',cannot:'Resist corrosion unalloyed',uses:'Construction, tools, machinery',discoveryYear:'Ancient',discoverer:'Known since antiquity'},
      {n:27,s:'Co',name:'Cobalt',cat:'Transition metal',summary:'Magnetic metal used in high-performance alloys and batteries.',can:'Be magnetic, make superalloys',cannot:'Be easily substituted in some alloys',uses:'Magnets, batteries, superalloys',discoveryYear:'1735',discoverer:'Georg Brandt'},
      {n:28,s:'Ni',name:'Nickel',cat:'Transition metal',summary:'Corrosion-resistant metal used in alloys and plating.',can:'Plate and resist oxidation',cannot:'React aggressively',uses:'Stainless steel, plating, batteries',discoveryYear:'1751',discoverer:'Axel Fredrik Cronstedt'},
      {n:29,s:'Cu',name:'Copper',cat:'Transition metal',summary:'Excellent conductor used for wiring and plumbing.',can:'Conduct electricity and heat excellently',cannot:'Remain untarnished indefinitely',uses:'Electrical wiring, plumbing, coins',discoveryYear:'Ancient',discoverer:'Known since antiquity'},
      {n:30,s:'Zn',name:'Zinc',cat:'Transition metal',summary:'Used to galvanize steel and in batteries.',can:'Protect steel from corrosion',cannot:'Conduct like copper',uses:'Galvanization, alloys, batteries',discoveryYear:'1746',discoverer:'Andreas Sigismund Marggraf'},
      {n:31,s:'Ga',name:'Gallium',cat:'Post-transition',summary:'Low-melting metal used in semiconductors and LEDs.',can:'Melt near hand temperature, alloy with semiconductors',cannot:'Remain solid in warm hands',uses:'LEDs, semiconductors',discoveryYear:'1875',discoverer:'Paul-Émile Lecoq de Boisbaudran'},
      {n:32,s:'Ge',name:'Germanium',cat:'Metalloid',summary:'Semiconductor element used in electronics and fiber optics.',can:'Act as semiconductor',cannot:'Conduct as well as metals',uses:'Fiber optics, electronics',discoveryYear:'1886',discoverer:'Clemens Winkler'},
      {n:33,s:'As',name:'Arsenic',cat:'Metalloid',summary:'Toxic metalloid used historically in pesticides and semiconductors.',can:'Act as semiconductor dopant',cannot:'Be safely ingested',uses:'Semiconductors, historically pesticides',discoveryYear:'~1250',discoverer:'Albertus Magnus'},
      {n:34,s:'Se',name:'Selenium',cat:'Nonmetal',summary:'Photoconductive element used in electronics and glass.',can:'Conduct better when illuminated',cannot:'Conduct well in dark',uses:'Solar cells, glass additives',discoveryYear:'1817',discoverer:'Jöns Jacob Berzelius'},
      {n:35,s:'Br',name:'Bromine',cat:'Halogen',summary:'Liquid halogen used in flame retardants and chemical synthesis.',can:'Disinfect and form organics',cannot:'Be handled without protection',uses:'Flame retardants, synthesis',discoveryYear:'1826',discoverer:'Antoine Jérôme Balard'},
      {n:36,s:'Kr',name:'Krypton',cat:'Noble gas',summary:'Noble gas used in specialty lighting and lasers.',can:'Produce bright light in discharge lamps',cannot:'Form compounds readily',uses:'Lighting, lasers',discoveryYear:'1898',discoverer:'William Ramsay, Morris Travers'},
      {n:37,s:'Rb',name:'Rubidium',cat:'Alkali metal',summary:'Highly reactive metal used in research and atomic clocks.',can:'Be used in precise clocks',cannot:'Be stored without care',uses:'Research, atomic clocks',discoveryYear:'1861',discoverer:'Robert Bunsen, Gustav Kirchhoff'},
      {n:38,s:'Sr',name:'Strontium',cat:'Alkaline earth',summary:'Produces red flames; used in fireworks and magnets.',can:'Produce bright red flame colors',cannot:'Be handled carelessly',uses:'Fireworks, ferrite magnets',discoveryYear:'1790',discoverer:'Adair Crawford'},
      {n:39,s:'Y',name:'Yttrium',cat:'Transition metal',summary:'Used in LEDs and superconductors; rare-earth metal.',can:'Support phosphors and alloys',cannot:'Be cheap or abundant',uses:'LED phosphors, superconductors',discoveryYear:'1794',discoverer:'Johan Gadolin'},
      {n:40,s:'Zr',name:'Zirconium',cat:'Transition metal',summary:'Corrosion-resistant metal used in nuclear reactors and ceramics.',can:'Withstand high heat and corrosion',cannot:'React easily under normal conditions',uses:'Nuclear cladding, ceramics',discoveryYear:'1789',discoverer:'Martin Heinrich Klaproth'},
      {n:41,s:'Nb',name:'Niobium',cat:'Transition metal',summary:'Used in superconducting alloys and high-strength steel.',can:'Enable superconductivity in alloys',cannot:'Be produced in huge quantities',uses:'Superconductors, alloys',discoveryYear:'1801',discoverer:'Charles Hatchett'},
      {n:42,s:'Mo',name:'Molybdenum',cat:'Transition metal',summary:'High-melting metal used in high-temperature alloys and catalysts.',can:'Provide strength at high temp',cannot:'Melt easily',uses:'High-temp alloys, catalysts',discoveryYear:'1778',discoverer:'Carl Wilhelm Scheele'},
      {n:43,s:'Tc',name:'Technetium',cat:'Transition metal',summary:'First artificially produced element; radioactive medical tracer.',can:'Be used in medical imaging',cannot:'Be stable long-term',uses:'Nuclear medicine (tracers)',discoveryYear:'1937',discoverer:'Carlo Perrier, Emilio Segrè'},
      {n:44,s:'Ru',name:'Ruthenium',cat:'Transition metal',summary:'Hard, corrosion-resistant metal used as a catalyst.',can:'Act as catalyst and harden alloys',cannot:'Be abundant',uses:'Catalysts, electronics',discoveryYear:'1844',discoverer:'Karl Ernst Claus'},
      {n:45,s:'Rh',name:'Rhodium',cat:'Transition metal',summary:'Precious metal used in catalytic converters and plating.',can:'Catalyze reactions, resist corrosion',cannot:'Be inexpensive',uses:'Catalytic converters, plating',discoveryYear:'1803',discoverer:'William Hyde Wollaston'},
      {n:46,s:'Pd',name:'Palladium',cat:'Transition metal',summary:'Catalyst metal that absorbs hydrogen; used in electronics.',can:'Absorb hydrogen and catalyze',cannot:'Be immune to price swings',uses:'Catalysts, electronics',discoveryYear:'1803',discoverer:'William Hyde Wollaston'},
      {n:47,s:'Ag',name:'Silver',cat:'Transition metal',summary:'Best electrical conductor and used in photography and jewelry.',can:'Conduct electricity excellently',cannot:'Resist tarnishing without maintenance',uses:'Electronics, jewelry, photography',discoveryYear:'Ancient',discoverer:'Known since antiquity'},
      {n:48,s:'Cd',name:'Cadmium',cat:'Transition metal',summary:'Toxic metal used in batteries and pigments; environmental concern.',can:'Serve in NiCd batteries',cannot:'Be used freely due to toxicity',uses:'Batteries, pigments (declining)',discoveryYear:'1817',discoverer:'Friedrich Stromeyer'},
      {n:49,s:'In',name:'Indium',cat:'Post-transition',summary:'Soft metal used in touchscreens and solders.',can:'Make transparent conductive films',cannot:'Withstand high heat unalloyed',uses:'Touchscreens, solders',discoveryYear:'1863',discoverer:'Ferdinand Reich, Hieronymous Richter'},
      {n:50,s:'Sn',name:'Tin',cat:'Post-transition',summary:'Used for plating and solder; corrosion-resistant coating.',can:'Protect other metals via plating',cannot:'Form very hard alloys alone',uses:'Solder, plating',discoveryYear:'Ancient',discoverer:'Known since antiquity'},
      {n:51,s:'Sb',name:'Antimony',cat:'Metalloid',summary:'Used to harden lead and in flame retardants; toxic in some forms.',can:'Harden alloys and act as flame retardant',cannot:'Be safely ingested',uses:'Flame retardants, alloys',discoveryYear:'Ancient',discoverer:'Known since antiquity'},
      {n:52,s:'Te',name:'Tellurium',cat:'Metalloid',summary:'Brittle semiconductor used in some solar cells.',can:'Act in semiconductors and alloys',cannot:'Be structural metal',uses:'Solar materials, alloys',discoveryYear:'1782',discoverer:'Franz-Joseph Müller von Reichenstein'},
      {n:53,s:'I',name:'Iodine',cat:'Halogen',summary:'Essential trace element for thyroid function and antiseptics.',can:'Disinfect and supply iodine nutrition',cannot:'Remain stable indefinitely in light',uses:'Medicinal antiseptics, nutrition',discoveryYear:'1811',discoverer:'Bernard Courtois'},
      {n:54,s:'Xe',name:'Xenon',cat:'Noble gas',summary:'Inert gas that forms a few compounds; used in lighting and anesthesia.',can:'Illuminate lamps and act as anesthetic',cannot:'React easily',uses:'Flash lamps, anesthesia',discoveryYear:'1898',discoverer:'William Ramsay, Morris Travers'},
      {n:55,s:'Cs',name:'Cesium',cat:'Alkali metal',summary:'Highly reactive metal used in atomic clocks and research.',can:'Be used in precise clocks',cannot:'Be exposed to air or water',uses:'Atomic clocks, research',discoveryYear:'1860',discoverer:'Robert Bunsen, Gustav Kirchhoff'},
      {n:56,s:'Ba',name:'Barium',cat:'Alkaline earth',summary:'Heavy alkaline earth used in X-ray contrast agents (compounds).',can:'Improve contrast in imaging (compounds)',cannot:'Be ingested as soluble salts',uses:'X-ray contrast (sulfate), fireworks',discoveryYear:'1808',discoverer:'Humphry Davy'},
      {n:57,s:'La',name:'Lanthanum',cat:'Lanthanide',summary:'Rare-earth used in camera lenses and batteries.',can:'Improve optical properties',cannot:'Be abundant economically',uses:'Camera lenses, batteries',discoveryYear:'1839',discoverer:'Carl Gustaf Mosander'},
      {n:58,s:'Ce',name:'Cerium',cat:'Lanthanide',summary:'Used in glass polishing and catalysis; reactive among lanthanides',can:'Act as catalyst and polishing agent',cannot:'Be stored without oxidation',uses:'Catalysts, glass polishing',discoveryYear:'1803',discoverer:'Jöns Jacob Berzelius, Wilhelm Hisinger'},
      {n:59,s:'Pr',name:'Praseodymium',cat:'Lanthanide',summary:'Rare-earth used in magnets and alloys.',can:'Contribute to strong magnets',cannot:'Be cheap',uses:'Magnets, alloys',discoveryYear:'1885',discoverer:'Carl Auer von Welsbach'},
      {n:60,s:'Nd',name:'Neodymium',cat:'Lanthanide',summary:'Critical for strong permanent magnets used in motors and headphones.',can:'Form strong permanent magnets',cannot:'Be corrosion-resistant alone',uses:'Magnets, lasers',discoveryYear:'1885',discoverer:'Carl Auer von Welsbach'},
      {n:61,s:'Pm',name:'Promethium',cat:'Lanthanide',summary:'Radioactive lanthanide with limited commercial use; produced synthetically.',can:'Provide small radioactive sources',cannot:'Be found naturally in appreciable amounts',uses:'Research, luminous paints (limited)',discoveryYear:'1945',discoverer:'Jacob A. Marinsky, Lawrence Glendenin, Charles D. Coryell'},
      {n:62,s:'Sm',name:'Samarium',cat:'Lanthanide',summary:'Used in high-temperature magnets and nuclear reactors.',can:'Make stable magnets for high temp',cannot:'Be produced cheaply',uses:'Magnets, nuclear control',discoveryYear:'1879',discoverer:'Lecoq de Boisbaudran'},
      {n:63,s:'Eu',name:'Europium',cat:'Lanthanide',summary:'Gives red color in screens and is used in phosphors.',can:'Emit red luminescence in phosphors',cannot:'Be abundant',uses:'Display phosphors, lasers',discoveryYear:'1901',discoverer:'Eugène-Anatole Demarçay'},
      {n:64,s:'Gd',name:'Gadolinium',cat:'Lanthanide',summary:'Used as MRI contrast agent and in magnets.',can:'Improve MRI contrast, be strongly magnetic',cannot:'Be used without safety checks',uses:'MRI contrast agents, magnets',discoveryYear:'1880',discoverer:'Jean Charles Galissard de Marignac'},
      {n:65,s:'Tb',name:'Terbium',cat:'Lanthanide',summary:'Used in green phosphors and magnetic materials.',can:'Emit green light in phosphors',cannot:'Be structurally strong alone',uses:'Phosphors, magnets',discoveryYear:'1843',discoverer:'Carl Gustaf Mosander'},
      {n:66,s:'Dy',name:'Dysprosium',cat:'Lanthanide',summary:'Used to stabilize magnets at high temperatures.',can:'Stabilize magnets at high temp',cannot:'Be replaced easily in some alloys',uses:'Magnets, nuclear reactors',discoveryYear:'1886',discoverer:'Lecoq de Boisbaudran'},
      {n:67,s:'Ho',name:'Holmium',cat:'Lanthanide',summary:'Strong magnetic properties used in research and specialized magnets.',can:'Show strong magnetic moments',cannot:'Be commonly used in mass-market products',uses:'Research magnets, lasers',discoveryYear:'1878',discoverer:'Jacques-Louis Soret, Marc Delafontaine'},
      {n:68,s:'Er',name:'Erbium',cat:'Lanthanide',summary:'Used in optical amplifiers and pink glass.',can:'Amplify signals in fiber optics',cannot:'Be used as structural metal',uses:'Optical amplifiers, lasers',discoveryYear:'1843',discoverer:'Carl Gustaf Mosander'},
      {n:69,s:'Tm',name:'Thulium',cat:'Lanthanide',summary:'One of the rarer lanthanides; used in portable X-ray sources.',can:'Provide X-ray sources in compact devices',cannot:'Be produced in large quantities',uses:'Portable X-ray devices',discoveryYear:'1879',discoverer:'Per Teodor Cleve'},
      {n:70,s:'Yb',name:'Ytterbium',cat:'Lanthanide',summary:'Used in lasers and specialized alloys.',can:'Act in laser technology',cannot:'Be widely used',uses:'Lasers, alloys',discoveryYear:'1878',discoverer:'Jean Charles Galissard de Marignac'},
      {n:71,s:'Lu',name:'Lutetium',cat:'Lanthanide',summary:'Dense rare-earth used in PET scan detectors and catalysts.',can:'Work as catalyst and in detectors',cannot:'Be abundant',uses:'PET detectors, catalysts',discoveryYear:'1907',discoverer:'Georges Urbain, Carl Auer von Welsbach'},
      {n:72,s:'Hf',name:'Hafnium',cat:'Transition metal',summary:'Used in nuclear control rods and high-temp alloys.',can:'Absorb neutrons, resist heat',cannot:'Be cheaply substituted in nuclear uses',uses:'Nuclear control rods, superalloys',discoveryYear:'1923',discoverer:'Dirk Coster, George de Hevesy'},
      {n:73,s:'Ta',name:'Tantalum',cat:'Transition metal',summary:'Highly corrosion-resistant metal used in capacitors and implants.',can:'Resist corrosion, hold capacitors',cannot:'Be easily corroded',uses:'Capacitors, implants, alloys',discoveryYear:'1802',discoverer:'Anders Gustav Ekeberg'},
      {n:74,s:'W',name:'Tungsten',cat:'Transition metal',summary:'Very high melting point metal used in filaments and tools.',can:'Withstand extreme heat',cannot:'Melt easily',uses:'Filaments, cutting tools',discoveryYear:'1783',discoverer:'Juan José Elhuyar, Fausto Elhuyar'},
      {n:75,s:'Re',name:'Rhenium',cat:'Transition metal',summary:'Used in high-temperature superalloys and catalysts.',can:'Improve high-temp alloy performance',cannot:'Be produced in large amounts',uses:'Superalloys, catalysts',discoveryYear:'1925',discoverer:'Walter Noddack, Ida Tacke, Otto Berg'},
      {n:76,s:'Os',name:'Osmium',cat:'Transition metal',summary:'Densest naturally occurring element; hard and brittle.',can:'Provide extreme density and hardness',cannot:'Be used widely due to rarity and toxicity of some compounds',uses:'Alloys, fountain pen tips',discoveryYear:'1803',discoverer:'Smithson Tennant'},
      {n:77,s:'Ir',name:'Iridium',cat:'Transition metal',summary:'Exceptionally corrosion-resistant precious metal.',can:'Resist corrosion even at high temp',cannot:'Be easily obtained',uses:'Electronics, crucibles, spark plugs',discoveryYear:'1803',discoverer:'Smithson Tennant'},
      {n:78,s:'Pt',name:'Platinum',cat:'Transition metal',summary:'Stable precious metal with catalytic properties.',can:'Catalyze reactions and resist corrosion',cannot:'Be inexpensive',uses:'Catalysts, jewelry, fuel cells',discoveryYear:'1735',discoverer:'Antonio de Ulloa'},
      {n:79,s:'Au',name:'Gold',cat:'Transition metal',summary:'Highly corrosion-resistant precious metal used in finance and electronics.',can:'Conduct electricity and resist corrosion',cannot:'Be reactive chemically',uses:'Electronics, jewelry, finance',discoveryYear:'Ancient',discoverer:'Known since antiquity'},
      {n:80,s:'Hg',name:'Mercury',cat:'Transition metal',summary:'Liquid metal at room temperature; toxic vapors.',can:'Be used in thermometers and amalgams',cannot:'Be handled without care due to toxicity',uses:'Specialized instruments (declining)',discoveryYear:'Ancient',discoverer:'Known since antiquity'},
      {n:81,s:'Tl',name:'Thallium',cat:'Post-transition',summary:'Toxic metal historically used in electronics and poisons.',can:'Serve in specialized electronics',cannot:'Be used safely in many applications',uses:'Electronics (limited), research',discoveryYear:'1861',discoverer:'William Crookes'},
      {n:82,s:'Pb',name:'Lead',cat:'Post-transition',summary:'Dense toxic metal used in batteries and shielding.',can:'Shield radiation and form batteries',cannot:'Be used in paints or pipes safely',uses:'Batteries, shielding (reduced modern use)',discoveryYear:'Ancient',discoverer:'Known since antiquity'},
      {n:83,s:'Bi',name:'Bismuth',cat:'Post-transition',summary:'Heavy metal with low toxicity compared to lead; used in medicines.',can:'Replace lead in some applications',cannot:'Be extremely common',uses:'Medicines, cosmetics, alloys',discoveryYear:'~1500',discoverer:'Claude François Geoffroy'},
      {n:84,s:'Po',name:'Polonium',cat:'Post-transition',summary:'Extremely radioactive and rare; used in research.',can:'Emit alpha particles',cannot:'Be handled safely without heavy shielding',uses:'Research, neutron initiators (limited)',discoveryYear:'1898',discoverer:'Marie Curie, Pierre Curie'},
      {n:85,s:'At',name:'Astatine',cat:'Halogen',summary:'Highly radioactive, extremely scarce; mostly of scientific interest.',can:'Exist briefly in trace amounts',cannot:'Be studied easily due to scarcity',uses:'Research',discoveryYear:'1940',discoverer:'Dale R. Corson, Kenneth Ross MacKenzie, Emilio Segrè'},
      {n:86,s:'Rn',name:'Radon',cat:'Noble gas',summary:'Radioactive gas produced by decay of radium; health hazard in homes.',can:'Accumulate in buildings, emit radiation',cannot:'Be smelled or seen',uses:'Geological tracing (limited)',discoveryYear:'1900',discoverer:'Friedrich Ernst Dorn'},
      {n:87,s:'Fr',name:'Francium',cat:'Alkali metal',summary:'Extremely rare and highly radioactive alkali metal with little practical use.',can:'Behave like other alkali metals briefly',cannot:'Be accumulated in macroscopic amounts',uses:'Research only',discoveryYear:'1939',discoverer:'Marguerite Perey'},
      {n:88,s:'Ra',name:'Radium',cat:'Alkaline earth',summary:'Radioactive alkaline earth formerly used in luminous paints; hazardous.',can:'Emit radiation useful in early radiography',cannot:'Be used safely without shielding',uses:'Research, historical luminous paints (discontinued)',discoveryYear:'1898',discoverer:'Marie Curie, Pierre Curie'},
      {n:89,s:'Ac',name:'Actinium',cat:'Actinide',summary:'Radioactive actinide used in radiation sources and research.',can:'Emit radiation for therapy',cannot:'Be handled without strict controls',uses:'Research, radiotherapy',discoveryYear:'1899',discoverer:'André-Louis Debierne'},
      {n:90,s:'Th',name:'Thorium',cat:'Actinide',summary:'Potential nuclear fuel with long half-life isotopes.',can:'Serve as nuclear fuel in some designs',cannot:'Be used without nuclear infrastructure',uses:'Nuclear fuel research',discoveryYear:'1828',discoverer:'Jöns Jakob Berzelius'},
      {n:91,s:'Pa',name:'Protactinium',cat:'Actinide',summary:'Rare, radioactive actinide mostly of scientific interest.',can:'Show complex nuclear properties',cannot:'Be used commercially',uses:'Research',discoveryYear:'1913',discoverer:'Kasimir Fajans, Oswald Helmuth Göhring'},
      {n:92,s:'U',name:'Uranium',cat:'Actinide',summary:'Primary fissile/fertile element used in nuclear power and weapons.',can:'Sustain nuclear chain reactions (enriched)',cannot:'Be used without heavy regulation',uses:'Nuclear fuel, weapons (historical)',discoveryYear:'1789',discoverer:'Martin Heinrich Klaproth'},
      {n:93,s:'Np',name:'Neptunium',cat:'Actinide',summary:'Radioactive element produced in reactors; research and limited applications.',can:'Be formed in reactors and studied',cannot:'Be widely used commercially',uses:'Research, nuclear materials',discoveryYear:'1940',discoverer:'Edwin McMillan, Philip H. Abelson'},
      {n:94,s:'Pu',name:'Plutonium',cat:'Actinide',summary:'Radioactive actinide central to some nuclear fuels and weapons.',can:'Support fission in reactors and weapons',cannot:'Be handled without extreme safeguards',uses:'Nuclear fuel, weapons, research',discoveryYear:'1940',discoverer:'Glenn T. Seaborg, Joseph W. Kennedy, Arthur Wahl'},
      {n:95,s:'Am',name:'Americium',cat:'Actinide',summary:'Used in smoke detectors (Am-241) and as a neutron source.',can:'Serve as small neutron sources',cannot:'Be used without regulation',uses:'Smoke detectors, research sources',discoveryYear:'1944',discoverer:'Glenn T. Seaborg, Ralph A. James, Leon O. Morgan'},
      {n:96,s:'Cm',name:'Curium',cat:'Actinide',summary:'Radioactive actinide used as heat source in space RTGs and research.',can:'Provide heat via radioactivity',cannot:'Be handled without shielding',uses:'Radioisotope heat sources (research)',discoveryYear:'1944',discoverer:'Glenn T. Seaborg, Ralph A. James, Albert Ghiorso'},
      {n:97,s:'Bk',name:'Berkelium',cat:'Actinide',summary:'Synthetic element used in research only.',can:'Be synthesized in small quantities',cannot:'Be used commercially',uses:'Research',discoveryYear:'1949',discoverer:'Glenn T. Seaborg, Stanley G. Thompson, Albert Ghiorso'},
      {n:98,s:'Cf',name:'Californium',cat:'Actinide',summary:'Powerful neutron emitter used in research and industry.',can:'Emit neutrons for radiography and start reactors',cannot:'Be produced in large quantities',uses:'Neutron sources, research',discoveryYear:'1950',discoverer:'Glenn T. Seaborg, Stanley G. Thompson, Kenneth Street Jr.'},
      {n:99,s:'Es',name:'Einsteinium',cat:'Actinide',summary:'Highly radioactive, produced in micrograms for research.',can:'Be studied in tiny amounts',cannot:'Be used in applications',uses:'Research',discoveryYear:'1952',discoverer:'Albert Ghiorso et al.'},
      {n:100,s:'Fm',name:'Fermium',cat:'Actinide',summary:'Synthetic, short-lived element used only for research.',can:'Exist briefly in labs',cannot:'Be used outside research',uses:'Research',discoveryYear:'1952',discoverer:'Albert Ghiorso et al.'},
      {n:101,s:'Md',name:'Mendelevium',cat:'Actinide',summary:'Synthetic element named after Mendeleev; research only.',can:'Be synthesized in particle accelerators',cannot:'Be used commercially',uses:'Research',discoveryYear:'1955',discoverer:'Albert Ghiorso, Glenn T. Seaborg, et al.'},
      {n:102,s:'No',name:'Nobelium',cat:'Actinide',summary:'Synthetic, unstable element for research.',can:'Be formed transiently',cannot:'Be used practically',uses:'Research',discoveryYear:'1966',discoverer:'Georgy Flerov et al.'},
      {n:103,s:'Lr',name:'Lawrencium',cat:'Actinide',summary:'Heavy synthetic element used exclusively in research.',can:'Provide insight into heavy-element chemistry',cannot:'Be used commercially',uses:'Research',discoveryYear:'1961',discoverer:'Albert Ghiorso, Torbjørn Sikkeland, Almon Larsh'},
      {n:104,s:'Rf',name:'Rutherfordium',cat:'Transition metal (synthetic)',summary:'Short-lived synthetic element used in research.',can:'Be created briefly in labs',cannot:'Be used commercially',uses:'Research',discoveryYear:'1964',discoverer:'Georgy Flerov et al.'},
      {n:105,s:'Db',name:'Dubnium',cat:'Transition metal (synthetic)',summary:'Synthetic element produced for research.',can:'Be studied for nuclear chemistry',cannot:'Be produced abundantly',uses:'Research',discoveryYear:'1967',discoverer:'Georgy Flerov et al.'},
      {n:106,s:'Sg',name:'Seaborgium',cat:'Transition metal (synthetic)',summary:'Synthetic heavy element discovered in nuclear research.',can:'Provide data on heavy-element trends',cannot:'Be used outside labs',uses:'Research',discoveryYear:'1974',discoverer:'Albert Ghiorso et al.'},
      {n:107,s:'Bh',name:'Bohrium',cat:'Transition metal (synthetic)',summary:'Very short-lived synthetic element for research.',can:'Be made in tiny amounts',cannot:'Be practical',uses:'Research',discoveryYear:'1981',discoverer:'Peter Armbruster, Gottfried Münzenberg'},
      {n:108,s:'Hs',name:'Hassium',cat:'Transition metal (synthetic)',summary:'Synthetic element with short half-life; research only.',can:'Help test relativistic effects in chemistry',cannot:'Be used commercially',uses:'Research',discoveryYear:'1984',discoverer:'Peter Armbruster, Gottfried Münzenberg'},
      {n:109,s:'Mt',name:'Meitnerium',cat:'Synthetic',summary:'Extremely short-lived synthetic element discovered in nuclear research.',can:'Be synthesized in labs',cannot:'Be found naturally',uses:'Research',discoveryYear:'1982',discoverer:'Peter Armbruster, Gottfried Münzenberg'},
      {n:110,s:'Ds',name:'Darmstadtium',cat:'Synthetic',summary:'Short-lived synthetic; research interest.',can:'Be studied briefly',cannot:'Be used practically',uses:'Research',discoveryYear:'1994',discoverer:'Sigurd Hofmann et al.'},
      {n:111,s:'Rg',name:'Roentgenium',cat:'Synthetic',summary:'Synthetic superheavy element; research only.',can:'Be produced in atom-scale amounts',cannot:'Be used commercially',uses:'Research',discoveryYear:'1994',discoverer:'Sigurd Hofmann et al.'},
      {n:112,s:'Cn',name:'Copernicium',cat:'Synthetic',summary:'Likely a very short-lived metal; studied for relativistic chemistry.',can:'Show unique heavy-element behavior',cannot:'Be stable',uses:'Research',discoveryYear:'1996',discoverer:'Sigurd Hofmann et al.'},
      {n:113,s:'Nh',name:'Nihonium',cat:'Synthetic',summary:'Very unstable superheavy element with brief existence in labs.',can:'Be synthesized',cannot:'Be stored',uses:'Research',discoveryYear:'2004',discoverer:'RIKEN team (Japan)'},
      {n:114,s:'Fl',name:'Flerovium',cat:'Synthetic',summary:'Superheavy element that may exhibit noble-gas-like properties.',can:'Possibly be relatively inert for a heavy element',cannot:'Be studied easily',uses:'Research',discoveryYear:'1999',discoverer:'Joint Institute for Nuclear Research'},
      {n:115,s:'Mc',name:'Moscovium',cat:'Synthetic',summary:'Highly unstable superheavy element used in research.',can:'Be synthesized briefly',cannot:'Be practical',uses:'Research',discoveryYear:'2004',discoverer:'Joint Institute for Nuclear Research'},
      {n:116,s:'Lv',name:'Livermorium',cat:'Synthetic',summary:'Short-lived synthetic element in the superheavy region.',can:'Provide research insight',cannot:'Be used outside labs',uses:'Research',discoveryYear:'2000',discoverer:'Joint Institute for Nuclear Research'},
      {n:117,s:'Ts',name:'Tennessine',cat:'Synthetic',summary:'Superheavy halogen-like element produced in tiny amounts.',can:'Show halogen-like behavior in theory',cannot:'Be used practically',uses:'Research',discoveryYear:'2010',discoverer:'Joint Institute for Nuclear Research, Oak Ridge National Laboratory'},
      {n:118,s:'Og',name:'Oganesson',cat:'Noble gas (synthetic)',summary:'Heaviest known element; predicted to have unusual properties.',can:'Help test theoretical chemistry at extremes',cannot:'Be produced in useful quantities',uses:'Research',discoveryYear:'2006',discoverer:'Joint Institute for Nuclear Research'}
    ];

    // Initialize the application
    function initApp() {
      // Create fast lookup
      const elementLookup = new FastElementLookup(ELEMENTS);
      
      // Build category options dynamically
      const categorySet = new Set(ELEMENTS.map(e => e.cat));
      const categoryFilter = document.getElementById('categoryFilter');
      
      // Clear default option and add sorted categories
      categoryFilter.innerHTML = '<option value="all">All categories</option>';
      Array.from(categorySet).sort().forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        categoryFilter.appendChild(opt);
      });

      const grid = document.getElementById('grid');
      const searchInput = document.getElementById('searchInput');
      const clearBtn = document.getElementById('clearBtn');
      const resultCount = document.getElementById('resultCount');
      const sortSelect = document.getElementById('sortSelect');

      // Optimized render function
      function renderList(list) {
        grid.innerHTML = '';
        
        if (list.length === 0) {
          grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--muted)">No elements found. Try a different search.</div>';
          resultCount.textContent = 'No elements found';
          return;
        }
        
        // Use DocumentFragment for batch DOM operations
        const fragment = document.createDocumentFragment();
        
        list.forEach(el => {
          const card = document.createElement('div');
          card.className = 'card';
          card.setAttribute('tabindex', '0');
          card.setAttribute('role', 'listitem');
          
          card.innerHTML = `
            <div class="top">
              <div>
                <div class="symbol">${el.s}</div>
                <div class="number">${el.n}</div>
              </div>
              <div style="text-align:right">
                <div class="name">${el.name}</div>
                <div class="meta">${el.cat}</div>
              </div>
            </div>
            <div style="font-size:13px;color:var(--muted)">${el.summary}</div>
            <div class="discovery-info">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              Discovered: ${el.discoveryYear} by ${el.discoverer}
            </div>
          `;
          
          card.addEventListener('click', () => openModal(el));
          card.addEventListener('keydown', (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.preventDefault();
              openModal(el);
            }
          });
          
          fragment.appendChild(card);
        });
        
        grid.appendChild(fragment);
        resultCount.textContent = `Showing ${list.length} element${list.length !== 1 ? 's' : ''}`;
      }

      function openModal(el) {
        document.getElementById('modalSymbol').textContent = el.s;
        document.getElementById('modalNumber').textContent = `#${el.n}`;
        document.getElementById('modalCategory').textContent = el.cat;
        document.getElementById('modalDiscovery').textContent = `Discovered: ${el.discoveryYear}`;
        document.getElementById('modalDiscoverer').innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          Discovered by: ${el.discoverer}
        `;
        document.getElementById('modalName').textContent = `${el.name} (${el.s})`;
        document.getElementById('modalSummary').textContent = el.summary + (el.uses ? ` Uses: ${el.uses}.` : '');
        document.getElementById('modalCan').textContent = `Can: ${el.can || '—'}`;
        document.getElementById('modalCannot').textContent = `Cannot: ${el.cannot || '—'}`;
        
        const mb = document.getElementById('modalBackdrop');
        mb.style.display = 'flex';
        mb.setAttribute('aria-hidden', 'false');
        document.getElementById('closeModal').focus();
      }

      // Modal close handlers
      document.getElementById('closeModal').addEventListener('click', () => {
        const mb = document.getElementById('modalBackdrop');
        mb.style.display = 'none';
        mb.setAttribute('aria-hidden', 'true');
      });
      
      document.getElementById('modalBackdrop').addEventListener('click', (e) => {
        if (e.target.id === 'modalBackdrop') {
          const mb = document.getElementById('modalBackdrop');
          mb.style.display = 'none';
          mb.setAttribute('aria-hidden', 'true');
        }
      });

      // Search + filter + sort logic
      function normalize(q) {
        return (q || '').toString().trim().toLowerCase();
      }
      
      function matches(el, q) {
        if (!q) return true;
        q = normalize(q);
        return el.name.toLowerCase().includes(q) || 
               el.s.toLowerCase() === q || 
               el.s.toLowerCase().includes(q) || 
               String(el.n) === q || 
               el.summary.toLowerCase().includes(q) || 
               (el.cat && el.cat.toLowerCase().includes(q)) ||
               (el.discoverer && el.discoverer.toLowerCase().includes(q)) ||
               (el.discoveryYear && el.discoveryYear.toLowerCase().includes(q));
      }

      // Debounced applyAll function for better performance
      const applyAll = debounce(function() {
        let q = searchInput.value;
        let cat = categoryFilter.value;
        let sort = sortSelect.value;
        
        let filtered = ELEMENTS.filter(el => matches(el, q));
        
        if (cat && cat !== 'all') {
          filtered = filtered.filter(el => el.cat === cat);
        }
        
        if (sort === 'name') {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'symbol') {
          filtered.sort((a, b) => a.s.localeCompare(b.s));
        } else if (sort === 'discovery') {
          filtered.sort((a, b) => {
            // Handle elements with non-year discovery dates
            const yearA = isNaN(a.discoveryYear) ? 0 : parseInt(a.discoveryYear);
            const yearB = isNaN(b.discoveryYear) ? 0 : parseInt(b.discoveryYear);
            return yearA - yearB;
          });
        } else {
          filtered.sort((a, b) => a.n - b.n);
        }
        
        renderList(filtered);
      }, 150);

      // Event listeners
      searchInput.addEventListener('input', () => applyAll());
      categoryFilter.addEventListener('change', () => applyAll());
      sortSelect.addEventListener('change', () => applyAll());
      
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        categoryFilter.value = 'all';
        sortSelect.value = 'number';
        applyAll();
        searchInput.focus();
      });

      // PDF Download functionality
      document.getElementById('downloadPdf').addEventListener('click', function() {
        // Create a simple PDF download
        const element = document.createElement('a');
        const content = `
          Periodic Table Elements Guide
          =============================
          
          This guide contains information about all 118 chemical elements.
          
          Created by: Beteseb Academy
          Date: ${new Date().toLocaleDateString()}
          
          ELEMENTS:
          ${ELEMENTS.map(e => `${e.n}. ${e.name} (${e.s}) - Discovered: ${e.discoveryYear} by ${e.discoverer}`).join('\n')}
          
          For more detailed information, visit our website!
        `;
        
        const blob = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(blob);
        element.download = 'elements-guide.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        
        // Show notification
        alert('Elements guide downloaded! The file contains discovery information for all 118 elements.');
      });

      // Initial render
      renderList(ELEMENTS);

      // Keyboard shortcut: focus search with '/'
      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
          e.preventDefault();
          searchInput.focus();
        }
      });

      return elementLookup; // Return lookup for chatbot to use
    }

    // AI Chatbot Implementation with Typing Animation
    function initChatbot(elementLookup) {
      const chatbotToggler = document.querySelector(".chatbot-toggler");
      const closeBtn = document.querySelector(".close-btn");
      const chatbox = document.querySelector(".chatbox");
      const chatInput = document.querySelector(".chat-input textarea");
      const sendChatBtn = document.querySelector("#send-btn");
      
      let userMessage = null;
      const inputInitHeight = chatInput.scrollHeight;
      
      // Cache for element data - use the lookup from initApp
      const lookup = elementLookup;
      
      // Toggle chatbot
      chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
      closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
      
      // Create chat message
      const createChatLi = (message, className) => {
        const chatLi = document.createElement("div");
        chatLi.classList.add("chat", className);
        
        if (className === "outgoing") {
          chatLi.innerHTML = `<p>${message}</p>`;
        } else {
          chatLi.innerHTML = `<span>🧪</span><p>${message}</p>`;
        }
        
        return chatLi;
      };

      // Create typing animation element
      const createTypingAnimation = () => {
        const typingDiv = document.createElement("div");
        typingDiv.classList.add("chat", "incoming");
        typingDiv.innerHTML = `
          <span>🧪</span>
          <div class="typing-animation">
            <div class="typing-dot" style="--delay: 0s"></div>
            <div class="typing-dot" style="--delay: 0.2s"></div>
            <div class="typing-dot" style="--delay: 0.4s"></div>
          </div>
        `;
        return typingDiv;
      };
      
      // Format element information from website data
      const formatElementResponse = (element) => {
        return `**${element.name} (${element.s}) - Atomic Number: ${element.n}**\n\n` +
               `**📝 Summary:** ${element.summary}\n\n` +
               `**📊 Category:** ${element.cat}\n` +
               `**🔬 Discovered:** ${element.discoveryYear} by ${element.discoverer}\n` +
               `**⚡ Key Uses:** ${element.uses || 'Various applications'}\n\n` +
               `**✅ Can:** ${element.can || '—'}\n` +
               `**❌ Cannot:** ${element.cannot || '—'}\n\n` +
               `*(This information is from our website's periodic table database)*`;
      };
      
      // Format category information
      const formatCategoryResponse = (category, elements) => {
        const categoryElements = elements.filter(e => e.cat.toLowerCase().includes(category.toLowerCase())).slice(0, 10);
        const elementList = categoryElements.map(e => `${e.name} (${e.s})`).join(', ');
        
        return `**${category} Elements**\n\n` +
               `There are ${elements.filter(e => e.cat.toLowerCase().includes(category.toLowerCase())).length} ${category} elements in our periodic table.\n\n` +
               `**Examples from our database:**\n${elementList}\n\n` +
               `**Typical properties from our data:**\n` +
               `${categoryElements[0]?.summary || ''}\n\n` +
               `*(Based on information from our website)*`;
      };
      
      // Format discovery information
      const formatDiscoveryResponse = (query) => {
        const elements = lookup.getAll();
        const discoveries = elements.filter(e => 
          e.discoverer.toLowerCase().includes(query) || 
          e.discoveryYear.toLowerCase().includes(query)
        ).slice(0, 5);
        
        if (discoveries.length > 0) {
          return `**Elements related to "${query}" in our database:**\n\n` +
                 discoveries.map(e => `• **${e.name} (${e.s})**: Discovered ${e.discoveryYear} by ${e.discoverer}`).join('\n') +
                 `\n\n*(Based on our website's discovery records)*`;
        }
        return null;
      };
      
      // Fast local response generator - ONLY using website data
      const generateResponse = (userQuery) => {
        userQuery = userQuery.toLowerCase().trim();
        
        // First, check if the query is asking about a specific element
        // Look for patterns like "tell me about X", "what is X", "X element", etc.
        const elementPatterns = [
          /tell me about (?:the element )?([a-z]+)/i,
          /what is ([a-z]+)(?:\?)?$/i,
          /information (?:about|on) ([a-z]+)/i,
          /details (?:about|on) ([a-z]+)/i,
          /^([a-z]+)$/i,  // Just the element name
          /^([a-z]+) element$/i,
          /properties of ([a-z]+)/i,
          /facts about ([a-z]+)/i,
          /everything about ([a-z]+)/i
        ];
        
        let elementName = null;
        for (const pattern of elementPatterns) {
          const match = userQuery.match(pattern);
          if (match && match[1]) {
            elementName = match[1].toLowerCase();
            break;
          }
        }
        
        // Also check for symbol patterns like "H", "He", etc.
        const symbolMatch = userQuery.match(/\b([A-Z][a-z]?)\b/);
        if (symbolMatch && symbolMatch[1]) {
          const symbol = symbolMatch[1].toLowerCase();
          const element = lookup.find(symbol);
          if (element) {
            return formatElementResponse(element);
          }
        }
        
        // If we found an element name, look it up
        if (elementName) {
          const element = lookup.find(elementName);
          if (element) {
            return formatElementResponse(element);
          }
        }
        
        // Check for category queries
        const categories = ['alkali metal', 'alkaline earth', 'transition metal', 'halogen', 'noble gas', 'lanthanide', 'actinide', 'metalloid', 'nonmetal', 'post-transition'];
        for (const cat of categories) {
          if (userQuery.includes(cat.toLowerCase())) {
            return formatCategoryResponse(cat, lookup.getAll());
          }
        }
        
        // Check for discovery queries
        if (userQuery.includes('discover') || userQuery.includes('found') || userQuery.includes('who found')) {
          // Try to find discoverer
          const discovererMatch = userQuery.match(/who discovered ([a-z]+)/i);
          if (discovererMatch && discovererMatch[1]) {
            const element = lookup.find(discovererMatch[1]);
            if (element) {
              return `**${element.name}** was discovered in **${element.discoveryYear}** by **${element.discoverer}**.\n\n*(This information is directly from our website's element database)*`;
            }
          }
          
          // Show recent discoveries
          const elements = lookup.getAll();
          const recent = [...elements].filter(e => !isNaN(e.discoveryYear) && e.discoveryYear > 1900)
                                      .sort((a,b) => b.discoveryYear - a.discoveryYear)
                                      .slice(0, 5);
          return `**Recent Element Discoveries from our website:**\n\n` +
                 recent.map(e => `• **${e.name} (${e.s})**: ${e.discoveryYear} by ${e.discoverer}`).join('\n') +
                 `\n\n*All discovery information is from our periodic table database.*`;
        }
        
        // Check for atomic number queries
        const atomicNumMatch = userQuery.match(/atomic number (\d+)/i) || userQuery.match(/element (\d+)/i);
        if (atomicNumMatch && atomicNumMatch[1]) {
          const num = parseInt(atomicNumMatch[1]);
          const element = lookup.find(num.toString());
          if (element) {
            return formatElementResponse(element);
          }
        }
        
        // Check for "how many elements" type queries
        if (userQuery.includes('how many elements') || userQuery.includes('total elements')) {
          const total = lookup.getAll().length;
          const categories = new Set(lookup.getAll().map(e => e.cat)).size;
          return `**Our website's Periodic Table Database:**\n\n` +
                 `• Total elements: **${total}**\n` +
                 `• Element categories: **${categories}**\n` +
                 `• Elements with discovery dates: **${lookup.getAll().filter(e => e.discoveryYear !== 'Ancient').length}**\n` +
                 `• Ancient known elements: **${lookup.getAll().filter(e => e.discoveryYear === 'Ancient').length}**\n\n` +
                 `All information is from our periodic table website.`;
        }
        
        // Check for periodic table information
        if (userQuery.includes('periodic table')) {
          const elements = lookup.getAll();
          const groupCounts = {};
          elements.forEach(e => {
            groupCounts[e.cat] = (groupCounts[e.cat] || 0) + 1;
          });
          
          const groupList = Object.entries(groupCounts)
            .sort((a,b) => b[1] - a[1])
            .map(([cat, count]) => `• ${cat}: ${count} elements`)
            .join('\n');
          
          return `**Our Periodic Table Database**\n\n` +
                 `Contains all **${elements.length}** chemical elements with complete information.\n\n` +
                 `**Element Groups on our website:**\n${groupList}\n\n` +
                 `**Features:**\n` +
                 `• Element cards with summaries\n` +
                 `• Discovery dates and discoverers\n` +
                 `• Search and filter functionality\n` +
                 `• Detailed properties (can/cannot do)\n` +
                 `• Downloadable elements guide\n\n` +
                 `Ask me about any specific element from our database!`;
        }
        
        // If we can't find specific information, provide a helpful message
        return `I have information about all 118 chemical elements from our website's periodic table database.\n\n` +
               `**You can ask me about:**\n` +
               `• **Specific elements**: "Tell me about Hydrogen", "What is Gold?", "Facts about Oxygen"\n` +
               `• **Element symbols**: "H", "He", "Au", "Fe"\n` +
               `• **Element groups**: "Alkali metals", "Halogens", "Noble gases"\n` +
               `• **Discovery**: "Who discovered Radium?", "Discovery of Plutonium"\n` +
               `• **Atomic numbers**: "Element 92", "Atomic number 79"\n` +
               `• **Periodic table**: "How many elements?", "Periodic table information"\n\n` +
               `All responses come directly from our website's element database. What would you like to know?`;
      };
      
      // Handle chat with typing animation (max 3 seconds)
      const handleChat = () => {
        userMessage = chatInput.value.trim();
        if (!userMessage) return;
        
        // Clear input and adjust height
        chatInput.value = "";
        chatInput.style.height = `${inputInitHeight}px`;
        
        // Append user message
        chatbox.appendChild(createChatLi(userMessage, "outgoing"));
        chatbox.scrollTo(0, chatbox.scrollHeight);
        
        // Show typing animation
        const typingAnimation = createTypingAnimation();
        chatbox.appendChild(typingAnimation);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        
        // Generate response (max 3 seconds delay)
        const startTime = Date.now();
        const response = generateResponse(userMessage);
        const elapsedTime = Date.now() - startTime;
        
        // Ensure typing animation shows for at least 0.5 seconds but max 3 seconds
        const typingDuration = Math.min(Math.max(500, elapsedTime), 3000);
        
        setTimeout(() => {
          // Remove typing animation
          if (typingAnimation.parentNode) {
            typingAnimation.remove();
          }
          
          // Add response
          const incomingChatLi = createChatLi(response, "incoming");
          chatbox.appendChild(incomingChatLi);
          chatbox.scrollTo(0, chatbox.scrollHeight);
        }, typingDuration);
      };
      
      // Event listeners for chat
      sendChatBtn.addEventListener("click", handleChat);
      
      chatInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleChat();
        }
      });
      
      chatInput.addEventListener("input", () => {
        chatInput.style.height = `${inputInitHeight}px`;
        chatInput.style.height = `${chatInput.scrollHeight}px`;
      });
      
      chatbotToggler.addEventListener("click", () => {
        setTimeout(() => {
          chatInput.focus();
        }, 300);
      });
      
      // Welcome message
      console.log("⚡ Chemistry AI Chatbot initialized - Using website element data only with 3-second typing animation");
      console.log("Ask me about any element from our periodic table database!");
    }

    // Performance-optimized startup
    function optimizeStartup() {
      // Use requestAnimationFrame for smoother animations
      const raf = window.requestAnimationFrame || 
                  function(callback) { setTimeout(callback, 1000/60); };
      
      // Start initialization on next frame
      raf(() => {
        const elementLookup = initApp(); // Get the lookup from initApp
        initChatbot(elementLookup); // Pass lookup to chatbot
        
        // Show chatbot instructions
        console.log("=== Chemistry AI Chatbot Instructions ===");
        console.log("1. Click the 🤖 button to open the chatbot");
        console.log("2. Ask about any element - all responses come from this website's data");
        console.log("3. Examples: 'Tell me about Hydrogen', 'What is Gold?', 'Discovery of Radium'");
      });
    }

    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeStartup);
    } else {
      optimizeStartup();
    }