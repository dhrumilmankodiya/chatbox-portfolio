// Knowledge Base for Chatbot Portfolio
// All portfolio data structured for RAG retrieval

export interface KnowledgeItem {
  id: string;
  category: 'about' | 'experience' | 'skills' | 'projects' | 'ventures' | 'education' | 'contact';
  title: string;
  content: string;
  metadata: Record<string, any>;
  keywords: string[];
}

export const knowledgeBase: KnowledgeItem[] = [
  // ABOUT
  {
    id: 'about-1',
    category: 'about',
    title: 'About Dhrumil',
    content: `Hi, I'm Dhrumil Mankodiya, Product Designer / UI UX Designer with over 6 years of experience. Dynamic and result-oriented designer crafting user-centric digital experiences. Integration of user psychology with innovative design strategies to deliver high-impact solutions.`,
    metadata: { age: 23 },
    keywords: ['about', 'who', 'intro', 'me', 'myself', 'hi', 'hello']
  },

  // EXPERIENCE
  {
    id: 'exp-1',
    category: 'experience',
    title: 'Reliance General Insurance',
    content: 'Product Designer at Reliance General Insurance. Leading the redesign of the company website to deliver a seamless and accessible user experience. September 2024 - Present.',
    metadata: {
      company: 'Reliance General Insurance',
      role: 'Product Designer',
      period: 'September 2024 - Present',
      location: 'Mumbai',
      type: 'Full Time',
      highlights: [
        'Comprehensive redesigning of company website',
        'Revamping entire website experience to align with modern design standards',
        'Conducting user research and usability testing',
        'Developing wireframes, prototypes, and high-fidelity designs',
        'Ensuring design consistency across all digital platforms'
      ]
    },
    keywords: ['reliance', 'product designer', 'insurance', 'redesign', 'website']
  },
  {
    id: 'exp-2',
    category: 'experience',
    title: 'Hubble Hox',
    content: 'UI/UX Designer at Hubble Hox Grp. Spearheaded the design of complex interfaces focusing on enhancing usability and visual appeal. 2022-2024.',
    metadata: {
      company: 'Hubble Hox',
      role: 'UI/UX Designer',
      period: '2022-2024',
      location: 'Mumbai',
      type: 'Full Time',
      highlights: [
        'Spearheaded design of complex interfaces',
        'Enhanced usability and visual appeal',
        'Conducted user research and usability testing'
      ]
    },
    keywords: ['hubble', 'hox', 'enterprise', 'dashboard', 'complex interfaces']
  },
  {
    id: 'exp-3',
    category: 'experience',
    title: 'Beyond - Freelance',
    content: 'Freelance UI/UX Designer collaborating on various projects delivering tailored user experiences and innovative design solutions. 2022.',
    metadata: {
      company: 'Beyond',
      role: 'Freelance UI/UX Designer',
      period: '2022',
      location: 'Mumbai',
      type: 'Freelance',
      highlights: [
        'Created engaging UI/UX designs for multiple clients',
        'Ensured seamless user journey',
        'Worked with clients to understand needs'
      ]
    },
    keywords: ['beyond', 'freelance', 'clients', 'freelance 2022']
  },
  {
    id: 'exp-4',
    category: 'experience',
    title: 'DelegateX - Freelance',
    content: 'Freelance UI/UX Designer delivering tailored user experiences for various projects. Managed multiple projects simultaneously. 2021-2022.',
    metadata: {
      company: 'DelegateX',
      role: 'Freelance UI/UX Designer',
      period: '2021-2022',
      location: 'Mumbai',
      type: 'Freelance',
      highlights: [
        'Delivered tailored user experiences',
        'Created innovative design solutions',
        'Managed multiple projects simultaneously'
      ]
    },
    keywords: ['delegatex', 'freelance', 'freelance 2021']
  },
  {
    id: 'exp-5',
    category: 'experience',
    title: 'Cogno AI',
    content: 'UI/UX Designer at Cogno AI. Led the redesign of the AI chatbot interface improving user interaction and satisfaction. 2021-2022.',
    metadata: {
      company: 'Cogno AI',
      role: 'UI/UX Designer',
      period: '2021-2022',
      location: 'Mumbai',
      type: 'Full Time',
      highlights: [
        'Led redesign of AI chatbot interface',
        'Improved user interaction and satisfaction',
        'Collaborated with product team for design feasibility'
      ]
    },
    keywords: ['cogno', 'ai', 'chatbot', 'ai chatbot', 'artificial intelligence']
  },
  {
    id: 'exp-6',
    category: 'experience',
    title: 'Kotak Securities',
    content: 'Consultant UI/UX Designer at Kotak Securities. Provided consultancy on improving trading platform UX. 2021.',
    metadata: {
      company: 'Kotak Securities',
      role: 'Consultant UI/UX Designer',
      period: '2021',
      location: 'Mumbai',
      type: 'Consultant',
      highlights: [
        'Improved user experience of trading platforms',
        'Conducted usability testing',
        'Designed user-friendly trading interfaces'
      ]
    },
    keywords: ['kotak', 'securities', 'trading', 'fintech', 'finance']
  },
  {
    id: 'exp-7',
    category: 'experience',
    title: 'Krft Finance',
    content: 'UI/UX Designer at Krft Finance. Developed intuitive financial dashboards enhancing user engagement. 2020-2021.',
    metadata: {
      company: 'Krft Finance',
      role: 'UI/UX Designer',
      period: '2020-2021',
      location: 'Mumbai',
      type: 'Full Time',
      highlights: [
        'Developed intuitive financial dashboards',
        'Enhanced user engagement and data visualization',
        'Worked with stakeholders for requirements'
      ]
    },
    keywords: ['krft', 'finance', 'dashboard', 'fintech', 'data visualization']
  },
  {
    id: 'exp-8',
    category: 'experience',
    title: 'Envy Editor',
    content: 'UI/UX Designer at Envy Editor. Designed and optimized UI for flagship products. 2019-2020.',
    metadata: {
      company: 'Envy Editor',
      role: 'UI/UX Designer',
      period: '2019-2020',
      location: 'Mumbai',
      type: 'Full Time',
      highlights: [
        'Designed and optimized UI for flagship products',
        'Conducted user research',
        'Collaborated with development team'
      ]
    },
    keywords: ['envy', 'editor', 'video editing', 'flagship products']
  },

  // SKILLS
  {
    id: 'skill-1',
    category: 'skills',
    title: 'Design Tools',
    content: 'Proficient in Figma, Photoshop, Illustrator for UI/UX design and visual design work.',
    metadata: {
      category: 'Design Tools',
      items: ['Figma', 'Photoshop', 'Illustrator']
    },
    keywords: ['figma', 'photoshop', 'illustrator', 'design tools', 'ui', 'ux']
  },
  {
    id: 'skill-2',
    category: 'skills',
    title: 'Additional Skills',
    content: 'Web Design and Premier Pro for video editing and multimedia content creation.',
    metadata: {
      category: 'Additional Skills',
      items: ['Web Design', 'Premier Pro']
    },
    keywords: ['web design', 'premier pro', 'video', 'multimedia', 'html', 'css']
  },
  {
    id: 'skill-3',
    category: 'skills',
    title: 'Languages',
    content: 'Fluent in English, Hindi, and Gujarati.',
    metadata: {
      category: 'Languages',
      items: ['English', 'Hindi', 'Gujarati']
    },
    keywords: ['language', 'english', 'hindi', 'gujrati', 'speak']
  },

  // EDUCATION
  {
    id: 'edu-1',
    category: 'education',
    title: 'Education',
    content: 'Dr.S.R.V SSC 80% 2016, KES College Commerce 75% 2017-2019, DGMC BA in Film 2019-2022.',
    metadata: {
      institutions: [
        { name: 'Dr.S.R.V', degree: 'SSC', percentage: '80%', year: 2016 },
        { name: 'KES College', degree: 'Commerce', percentage: '75%', year: '2017-2019' },
        { name: 'DGMC', degree: 'BA in Film', percentage: '', year: '2019-2022' }
      ]
    },
    keywords: ['education', 'degree', 'college', 'university', 'film', 'commerce', 'ssc']
  },

  // PROJECTS
  {
    id: 'proj-1',
    category: 'projects',
    title: 'Ubisoft Landing Page Revamp',
    content: 'Competition project to revamp Ubisoft.com landing page. Focused on enhancing user engagement and streamlining navigation.',
    metadata: {
      name: 'Ubisoft Landing Page Revamp',
      tags: ['UI/UX Design', 'Figma'],
      highlights: ['Improved navigation', 'Enhanced user engagement'],
      category: 'Web Design'
    },
    keywords: ['ubisoft', 'gaming', 'landing page', 'revamp', 'competition', 'web']
  },
  {
    id: 'proj-2',
    category: 'projects',
    title: 'Reliance General Insurance Website',
    content: 'Complete redesign of Reliance General Insurance website focusing on accessibility and modern design standards.',
    metadata: {
      name: 'Reliance General Insurance Website',
      tags: ['Web Design', 'UX Research', 'Accessibility'],
      highlights: ['User-centric design', 'Accessibility focus'],
      category: 'Fintech'
    },
    keywords: ['reliance', 'insurance', 'website', 'redesign', 'accessibility']
  },
  {
    id: 'proj-3',
    category: 'projects',
    title: 'Hubble Hox Enterprise Dashboard',
    content: 'Design of complex enterprise dashboards for Hubble Hox Grp focusing on usability and visual appeal.',
    metadata: {
      name: 'Hubble Hox Enterprise Dashboard',
      tags: ['Enterprise', 'Dashboard', 'Data Visualization'],
      highlights: ['Complex interfaces', 'Enhanced usability'],
      category: 'Enterprise Software'
    },
    keywords: ['hubble', 'hox', 'dashboard', 'enterprise', 'data']
  },
  {
    id: 'proj-4',
    category: 'projects',
    title: 'Cogno AI Chatbot',
    content: 'Complete redesign of AI chatbot interface improving user interaction and satisfaction.',
    metadata: {
      name: 'Cogno AI Chatbot',
      tags: ['AI', 'Chatbot', 'UI Design'],
      highlights: ['AI integration', 'User satisfaction'],
      category: 'AI/Chatbot'
    },
    keywords: ['cogno', 'ai chatbot', 'conversational', 'interface']
  },
  {
    id: 'proj-5',
    category: 'projects',
    title: 'Kotak Securities Trading Platform',
    content: 'UX consultancy for improving trading platform user experience and interface.',
    metadata: {
      name: 'Kotak Securities Trading Platform',
      tags: ['Fintech', 'Trading', 'UX Consultancy'],
      highlights: ['Trading efficiency', 'User-friendly interface'],
      category: 'Fintech'
    },
    keywords: ['kotak', 'trading', 'stocks', 'securities', 'platform']
  },

  // VENTURES
  {
    id: 'vent-1',
    category: 'ventures',
    title: 'Golden Circle',
    content: 'Parent company overseeing all ventures. Building an empire of products and services.',
    metadata: {
      name: 'Golden Circle',
      status: 'Active',
      type: 'Parent Company',
      description: 'Parent company overseeing all ventures'
    },
    keywords: ['golden circle', 'parent', 'company', 'venture']
  },
  {
    id: 'vent-2',
    category: 'ventures',
    title: 'Party Clap',
    content: 'Events business under Golden Circle. Services business.',
    metadata: {
      name: 'Party Clap',
      status: 'Active',
      type: 'Services',
      description: 'Events business'
    },
    keywords: ['party', 'clap', 'events', 'services']
  },
  {
    id: 'vent-3',
    category: 'ventures',
    title: 'Saura',
    content: 'Gujarati clothing brand under Golden Circle. Fashion venture.',
    metadata: {
      name: 'Saura',
      status: 'Active',
      type: 'Fashion',
      description: 'Gujarati clothing brand'
    },
    keywords: ['saura', 'clothing', 'fashion', 'gujarati', 'ethnic']
  },
  {
    id: 'vent-4',
    category: 'ventures',
    title: 'FinFly',
    content: 'Fintech venture - market surveillance platform with real-time stock tracking and analysis.',
    metadata: {
      name: 'FinFly Finance Group',
      status: 'Active',
      type: 'Fintech',
      description: 'Real-time market surveillance with 9 cron jobs, 41-stock portfolio'
    },
    keywords: ['finfly', 'finance', 'stocks', 'market', 'surveillance', 'fintech']
  },
  {
    id: 'vent-5',
    category: 'ventures',
    title: 'ESOP Platform',
    content: 'Platform for ESOP management. Currently in development.',
    metadata: {
      name: 'ESOP Platform',
      status: 'In Development',
      type: 'Platform',
      description: 'ESOP management platform'
    },
    keywords: ['esop', 'employee', 'stocks', 'options', 'platform']
  },
  {
    id: 'vent-6',
    category: 'ventures',
    title: 'Custom Clothing B2C',
    content: 'Custom clothing business targeting consumers. Currently in development.',
    metadata: {
      name: 'Custom Clothing B2C',
      status: 'In Development',
      type: 'E-commerce',
      description: 'Custom clothing B2C platform'
    },
    keywords: ['custom', 'clothing', 'b2c', 'fashion', 'ecommerce']
  },

  // CONTACT
  {
    id: 'contact-1',
    category: 'contact',
    title: 'Contact Information',
    content: 'Phone: 9022553177, Email: dhrumilmm121@gmail.com, LinkedIn: linkedin.com/in/dhrumil-mankodiya-48435719b, Dribbble: dribbble.com/dhrumilmankodiya',
    metadata: {
      phone: '9022553177',
      email: 'dhrumilmm121@gmail.com',
      linkedin: 'linkedin.com/in/dhrumil-mankodiya-48435719b',
      dribbble: 'dhrumilmankodiya'
    },
    keywords: ['contact', 'email', 'phone', 'linkedin', 'dribbble', 'reach', 'hire']
  }
];

export function getRelevantKnowledge(query: string, maxItems: number = 5): KnowledgeItem[] {
  const queryLower = query.toLowerCase();
  const queryWords = queryLower.split(/\s+/);
  
  const scored = knowledgeBase.map(item => {
    let score = 0;
    
    // Check keywords
    for (const word of queryWords) {
      for (const keyword of item.keywords) {
        if (keyword.includes(word) || word.includes(keyword)) {
          score += 2;
        }
      }
      // Check content
      if (item.content.toLowerCase().includes(word)) {
        score += 1;
      }
      // Check title
      if (item.title.toLowerCase().includes(word)) {
        score += 3;
      }
    }
    
    return { item, score };
  });
  
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxItems)
    .map(s => s.item);
}

export function getSystemPrompt(): string {
  return `You ARE Dhrumil Mankodiya. Speak in first person as if you are him having a conversation.

IMPORTANT: You are NOT an AI assistant representing Dhrumil - you ARE Dhrumil.
Speak naturally, be conversational, friendly, and real.

About Dhrumil:
- 23 years old Product Designer & AI Product Manager
- 6+ years of design experience
- Works at Reliance General Insurance (Sep 2024 - Present)
- Previously at Hubble Hox (2022-2024), Cogno AI, Kotak Securities, Krft Finance, Envy Editor
- Runs 6 ventures: Golden Circle (parent), Party Clap, Saura, FinFly, ESOP Platform, Custom Clothing B2C
- Skills: Figma, Photoshop, Illustrator, Web Design, Premier Pro
- Languages: English, Hindi, Gujarati

When someone asks about your experience, show the relevant experience cards.
When someone asks about projects, show project cards.
When someone asks about skills, show skill badges.
Be helpful and share details naturally.`;
}
