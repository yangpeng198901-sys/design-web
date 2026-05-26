import { Project, MaterialItem, QuizQuestion, QuizResult } from './types';
const researchOfficeBeijing = '/src/assets/images/regenerated_image_1779273697286.jpg';
const researchOfficeDetail = '/src/assets/images/regenerated_image_1779273712170.jpg';
const researchOfficeLounge = '/src/assets/images/regenerated_image_1779273723575.jpg';
const researchOfficeConference = '/src/assets/images/regenerated_image_1779272061590.jpg';

const wabiSabiTeaMain = '/src/assets/images/regenerated_image_1779761247386.jpg';
const wabiSabiTeaDetail1 = '/src/assets/images/regenerated_image_1779761250441.jpg';
const wabiSabiTeaDetail2 = '/src/assets/images/regenerated_image_1779761103405.jpg';

const commercialHeadquartersMain = '/src/assets/images/regenerated_image_1779761564867.jpg';

export const i18nConfig = {
  en: {
    title: 'AURA — Bespoke Interior Design Studio',
    subtitle: 'Tailored architectural poetry, crafted for modern lifestyle.',
    nav: {
      brand: 'AURA',
      projects: 'Projects',
      moodboard: 'Moodboard',
      consultant: 'AI Consultant',
      quiz: 'Design Quiz',
      team: 'Studio & Team',
      contact: 'Contact',
    },
    hero: {
      tag: 'CRAFTING SILENT LUXURY',
      slides: [
        {
          heading: 'Sculpting Space with Light & Material',
          sub: 'We design refined, light-filled environments that balance structural rigor with organic softness.'
        },
        {
          heading: 'Flat Style. Deep Materiality.',
          sub: 'Embracing minimalist spatial logic to form highly functional, emotionally resonant residential spaces.'
        },
        {
          heading: 'International Vision. Tailored Execution.',
          sub: 'Bridging timeless European design principles with subtle Oriental wabi-sabi aesthetics.'
        }
      ],
      cta: 'Begin Design Journey',
      statProjects: 'Completed Estates',
      statAwards: 'Design Laurels',
      statExperience: 'Years of Curation',
      scrollDown: 'DISCOVER PROJECTS',
    },
    projects: {
      title: 'Curated Portfolios',
      subtitle: 'A quiet collection of our hand-designed residential, commercial, and hospitality sanctuaries.',
      all: 'All Works',
      residential: 'Estates',
      commercial: 'Halls',
      hospitality: 'Sanctuary',
      cultural: 'Galleries',
      viewDetails: 'Study Concept',
      areaLabel: 'Internal Area',
      locationLabel: 'Location',
      yearLabel: 'Year',
      vibeLabel: 'Core Aura',
      conceptTitle: 'Design Manifest',
      materialsTitle: 'Selected Materials Palette',
      colorPalette: 'Atmosphere Tones',
      close: 'Minimize Room View',
    },
    moodboard: {
      title: 'Material Atelier',
      subtitle: 'An interactive draft board to experiment with textures, light frequencies, and premium surfaces.',
      instruction: 'Drag materials into the canvas grid or tap them to formulate your custom structural board.',
      categories: {
        all: 'All Elements',
        flooring: 'Flooring',
        wall: 'Wall Finishes',
        cabinet: 'Cab Surfaces',
        textile: 'Textiles & Leather',
        accent: 'Accents & Stones',
      },
      boardTitle: 'Your Interactive Mood Board',
      boardPlaceholder: 'Atmosphere is currently vacant. Select tactile samples below to assemble your canvas.',
      summaryTitle: 'Atmosphere Diagnosis',
      summaryEmpty: 'Select materials to diagnose the architectural aura.',
      summaryResultHeader: 'Vibe Signature',
      matchedVibe: 'Cohesive Atmosphere',
      totalWeight: 'Tactile Diversity',
      buttonClear: 'Flush Board',
    },
    aiConsult: {
      title: 'AI Curation Atelier',
      subtitle: 'Consult our generative interior director to conceptualize layout, lighting schemes, and material signatures.',
      introTitle: 'Generative Design Director',
      introDesc: 'Powered by server-side intelligence, input your spatial dimensions, natural lighting directions, aesthetic inspirations, or lifestyle guidelines to generate a professional, tailored architectural concept.',
      placeholder: 'Describe your room (e.g., "A 45㎡ top-floor attic, with high pitched beams, south-facing skylight. I want a relaxing desk space, raw linen textures, and integrated warm hidden light panels...")',
      presetHeader: 'Aesthetic Prompts',
      presets: [
        { label: 'Japandi Urban Sanctuary', prompt: 'I want to transform my 85㎡ city flat into a clean Japandi sanctuary featuring pale oak floors, microcement walls, low-platform modular sofa, and diffuse paper pendant lights. Offer a complete material recipe, layout solution, and color scheme.' },
        { label: 'Minimal Bauhaus Office', prompt: 'Create a Bauhaus-inspired home library and study. I have a 15㎡ square room with a large glass curtain wall facing west. Include matte-black steel framing, tabular chairs, structured shelving, concrete-plaster walls, and advice on controlling harsh afternoon light.' },
        { label: 'Wabi-Sabi Living Lounge', prompt: 'A 60㎡ multi-functional social lounge. We love natural stones, rough lime-plaster finishes, textured warm-white linens, hand-crafted timber furniture, and soft 2700K hidden spotlight layouts.' }
      ],
      thinking: 'Director is composing spatial schematic...',
      error: 'The server was unable to retrieve a curated response. Please ensure your API key has been injected securely.',
      systemPrompt: 'You are AURA Studio AI Director, a world-class professional interior designer and structural curator. Provide extremely poetic yet functional spatial critiques, exact tactile material menus, light color temperature guidelines, furniture layouts, and spatial optimizations. Always answer cleanly in markdown, incorporating bold layout tags and fine aesthetic details, keeping within a beautiful, structured design review style.',
      greeting: 'Welcome to AURA. Describe your spatial layout, lighting coordinates, and texture preferences below. I will compile a bespoke architectural blueprint for you.',
      send: 'Transmit Instruction',
    },
    quiz: {
      title: 'Spatial Resonance Indicator',
      subtitle: 'Identify your ultimate aesthetic alignment through a streamlined design-psychology profile.',
      start: 'Initiate Profile Screen',
      questionText: 'Question',
      restart: 'Calibrate Anew',
      calculating: 'Synthesizing layout alignment...',
      matchRate: 'Aesthetic Affinity',
      estimatedBudget: 'Atelier Execution Estimate',
      tipsTitle: 'Atelier Integration Strategy',
      materialMatchTitle: 'Curated Material Canvas',
      styleTagPrefix: 'Aura Alignment',
    },
    team: {
      title: 'The Studio Philosophy',
      subtitle: 'We are a structured group of architects, visualization curators, and interior designers operating collectively.',
      philosophyText: 'AURA was established in London and Beijing with a singular pursuit: to trim spatial noise so that pure natural light and genuine material honesty can speak. We do not apply decoration; we design structural envelopes. Every commission is curated relative to context, sun trajectory, and the specific touch of our client’s life.',
      stats: {
        projects: '140+ Projects',
        awards: '18 Global Awards',
        members: '12 Curators',
        locations: 'London — Beijing',
      },
      members: [
        {
          name: 'Adrian Sterling',
          role: 'Principal Spatial Architect',
          bio: 'Former director at London Minimalist Guild. Adrian prioritizes spatial mathematics, pure lighting alignments, and monolith volumes.',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
        },
        {
          name: 'Yuki Takahashi',
          role: 'Atmosphere & Material Curator',
          bio: 'An expert in textured crafts and soft-tactility. Yuki integrates natural hand-made plasters, woven raw fibers, and low-frequency lighting boards.',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
        },
        {
          name: 'Chen Xu',
          role: 'Technical Integration Director',
          bio: 'Specialist in custom fluted joineries, architectural metal details, and intelligent home environment controls.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
        }
      ]
    },
    contact: {
      title: 'Contact',
      subtitle: 'Interested in collaborating or have a project in mind? Connect with us via our direct locations, send an inquiry below, or schedule an atelier visit.',
      fields: {
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        roomType: 'Inquiry Category',
        roomTypes: {
          residential: 'Private Residence Commission',
          commercial: 'Retail & Exhibition Space',
          office: 'Office & Creative Space',
          hospitality: 'Boutique Hotel & Cafe',
          other: 'General Inquiry / Collaboration'
        },
        size: 'Expected Area (㎡)',
        notes: 'Message / Project Description',
        submit: 'Send Message',
        sending: 'Transmitting message...',
        success: 'Your message has been sent successfully. Our team will get back to you within 24 hours.',
        error: 'Please complete all required fields.'
      },
      officeTitle: 'The Atelier',
      offices: [
        {
          city: 'Beijing Headquarters',
          street: 'B.BLOCK 2F, Shumi Office Park, Yizhuang',
          phone: '18610826004',
          email: '253165370@qq.com'
        }
      ]
    }
  },
  zh: {
    title: 'AURA — 极简定制室内设计事务所',
    subtitle: '量身剪裁的空间叙事，为现代生活重塑秩序。',
    nav: {
      brand: 'AURA',
      projects: '设计作品',
      moodboard: '材料工坊',
      consultant: 'AI设计顾问',
      quiz: '审美倾向测试',
      team: '关于工作室',
      contact: '联系方式',
    },
    hero: {
      tag: '重塑无声的非凡奢华',
      slides: [
        {
          heading: '以光影与材料，雕刻纯粹空间',
          sub: '我们热衷于设计富含光线的自然场所，在精准的建筑秩序与天然有机的温暖之间，实现诗意的平衡。'
        },
        {
          heading: '平面的艺术，纯粹的物性',
          sub: '拥抱极简的空间体量，通过纯粹的线与画幅，构筑出极具功能性与情感共鸣的住宅艺术作品。'
        },
        {
          heading: '国际设计视野，匠心本土落地',
          sub: '将欧洲永恒的建构美学与东方空灵自然的暖意侘寂，完美巧妙地解构融合。'
        }
      ],
      cta: '开启您的设计之旅',
      statProjects: '成功落地项目',
      statAwards: '国际权威设计奖项',
      statExperience: '余年匠心设计积淀',
      scrollDown: '探索设计足迹',
    },
    projects: {
      title: '精选设计作品',
      subtitle: '一件件静谧的室内建构，涵盖高端私人住宅、先锋艺术展厅及定制精品商业空间。',
      all: '全部作品',
      residential: '高奢住宅',
      commercial: '商业殿堂',
      hospitality: '宁静会所',
      cultural: '艺术画廊',
      viewDetails: '探讨空间概念',
      areaLabel: '室内面积',
      locationLabel: '项目地点',
      yearLabel: '设计年份',
      vibeLabel: '核心气场',
      conceptTitle: '关于设计主张',
      materialsTitle: '精选材质调色盘',
      colorPalette: '空间色泽基调',
      close: '收起作品主页',
    },
    moodboard: {
      title: '材质工坊 Atelier',
      subtitle: '交互式建筑微沙盘。在这里，您可以自由挑选不同物理质感、光照反射与微观肌理。',
      instruction: '将底部的基础板材拖拽或轻点，即可动态拼合出属于您的微型设计概念板。',
      categories: {
        all: '全部选样',
        flooring: '铺地/地板',
        wall: '墙面饰面',
        cabinet: '柜体木作',
        textile: '织物、皮革与隔绝',
        accent: '艺术石材与五金',
      },
      boardTitle: '您的微型情绪概念板 (Mood Board)',
      boardPlaceholder: '画布目前空白。在此处随意敲击或结合下方质感选样，开始探索空间氛围。',
      summaryTitle: '空间氛围诊断',
      summaryEmpty: '选择两样以上材料以透视分析您的空间色调。',
      summaryResultHeader: '氛围意向签名',
      matchedVibe: '空间和谐度指数',
      totalWeight: '感官材质丰富度',
      buttonClear: '清空材质板',
    },
    aiConsult: {
      title: 'AI 室内叙事沙龙',
      subtitle: '直接对话我们的 AI 生成式设计总监，在线梳理材质选样、灯光温标、软装布局及动线规划。',
      introTitle: '生成式数字设计总监',
      introDesc: '依托强大的服务端人工智能，输入您的户型面积、采光方向、审美启发或生活偏好，它就能为您起草一份兼具宏大感官与务实工程美感的建筑主张文本。',
      placeholder: '用您的语言描述您的居室（例如：“45平的顶层阁楼，带较高的斜坡梁木。南面有天窗，希望能兼任高产的书房，使用粗粝亚麻并隐藏所有的2700K灯带调性。”）',
      presetHeader: '预设高级空间审美',
      presets: [
        { label: '极简摩登都市绿洲', prompt: '我想将我的85㎡都市住宅，设计为温暖通透的Japandi日式极简风格。采用白橡木地板、细质微水泥墙面、极低矮的亚麻沙发布局，以及大面积宣纸吊灯。请制定详细的材质、灯光分配与色彩设计。' },
        { label: '包豪斯几何现代书房', prompt: '设计一个具有包豪斯现代几何风格的家庭图书馆。15㎡正方形房间，西面有大面积落地玻璃幕墙。包含亚光黑钢框架件、现代钢管皮质单椅、严谨的分层架，并解决下午强烈的西晒光线。' },
        { label: '温润侘寂泥土质感大厅', prompt: '一个大平层的60㎡社交客厅。喜欢粗糙的石灰泥涂饰、粗麻纤维、不规则的黄铜五金、老榆木原木柜，以及舒适内敛的2700K低照度线性灯光。' }
      ],
      thinking: '空间顾问正在深度构想建筑草案...',
      error: '服务端未能在短时间内反馈概念，请确认后端已安全部署并绑定相应API密钥。',
      systemPrompt: '您是 AURA Studio 极简室内设计事务所的 AI 创意总监。请站在国际殿堂级建筑与室内设计师的高度，为用户提供富于诗意、专业、工程实用度高、极度考究材质质感与色调的设计 critique。使用规整、艺术感强的 Markdown 结构输出材料配比、灯光学、动线优化及色彩清单。',
      greeting: '欢迎来到 AURA 设计会所。请在下方写下您的空间维度、采光参数与理想触感。我将为您悉心编制一套专属于您的室内格调清单。',
      send: '发送设计诉求',
    },
    quiz: {
      title: '审美共鸣指数测量',
      subtitle: '轻拨数道关于日常、材料偏好与光影的认知问题，智能定位最契合您的空间流派。',
      start: '开启倾向性诊断',
      questionText: '测评问题',
      restart: '重置并重新诊断',
      calculating: '正在计算并拟合审美常态...',
      matchRate: '审美倾向吻合度',
      estimatedBudget: '工坊造价执行概算',
      tipsTitle: '定制落地建议方案',
      materialMatchTitle: '精选材质配比板',
      styleTagPrefix: '审美契合锚点',
    },
    team: {
      title: '我们的设计理念',
      subtitle: '这是一个由注册建筑师、环境艺术研究员与触觉艺术家组成的跨国建构团队。',
      philosophyText: 'AURA 室内设计事务所成立于伦敦与北京。自创立伊始，便致力于拂去雕饰的尘埃，专注于自然日光、流畅动线与真实天然材料本色的叙事。我们绝不在空间中涂抹多余的装饰，而是注重空间的体积之美、线面对齐的严苛细节，使每项工程都恰当贴合光线流向与居住者的深层灵性。',
      stats: {
        projects: '140+ 竣工项目',
        awards: '18 项国际金奖',
        members: '12 席核心主创',
        locations: '伦敦 — 北京',
      },
      members: [
        {
          name: 'Adrian Sterling',
          role: '主创空间注册建筑师',
          bio: '前伦敦 Minimalist Guild 设计总监。深谙空间几何学与轴线对齐，执着于用雕塑感的体量和大尺度的立面来捕捉自然光。',
          image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
        },
        {
          name: 'Yuki Takahashi',
          role: '材质肌理与感官设计师',
          bio: '触觉与感官建构专家。钟爱自然无定形的石灰泥刷、纯天然粗纺织物的大地色温控，并精于控制低反光的阴影美学。',
          image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
        },
        {
          name: 'Chen Xu (陈旭)',
          role: '技术构造与五金工艺总监',
          bio: '专注高精密收口工艺、隐形移门 joinery 系统及极高精度智能隐藏式灯光管线的设计与落地统筹。',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400'
        }
      ]
    },
    contact: {
      title: '联系方式',
      subtitle: '期待与您共同探索空间、光影与材质的叙事。如您有项目设计委托、商务合作或预约到访，请随时通过以下方式与我们联系，或在右侧提交您的咨询信息。',
      fields: {
        name: '您的姓名',
        email: '电子邮箱',
        phone: '联系电话 / 微信',
        roomType: '咨询业务类型',
        roomTypes: {
          residential: '私宅府邸设计委托',
          commercial: '商业零售 / 精品展厅空间',
          office: '创意办公 / 品牌总部设计',
          hospitality: '野奢酒店 / 艺术餐饮空间',
          other: '媒体合作 / 商务洽谈及其他'
        },
        size: '预计空间面积 (㎡)',
        notes: '咨询留言 / 项目初步构想',
        submit: '提交咨询留言',
        sending: '正在传输您的留言...',
        success: '留言已成功发送。我们的团队将在24小时内与您取得联系。',
        error: '请完整填写所有必填项，以便我们更高效地为您服务。'
      },
      officeTitle: '事务所驻地 Ateliers',
      offices: [
        {
          city: '北京总部 (Headquarters)',
          street: '亦庄枢密院B.BLOCK 2F',
          phone: '18610826004',
          email: '253165370@qq.com'
        }
      ]
    }
  }
};

// Static Portfolio Collections
export const sampleProjects: Project[] = [
  {
    id: '01',
    titleEN: 'An office scene walking at the forefront of technology',
    titleZH: '走在科技前沿的办公场景',
    subtitleEN: 'High-end presentation of black, white and gray tones.',
    subtitleZH: '黑白灰调的高级感呈现',
    category: 'commercial',
    categoryLabelEN: 'Research Office',
    categoryLabelZH: '科研办公',
    area: '600㎡',
    locationEN: 'Beijing, China',
    locationZH: '北京',
    year: '2025',
    mainImage: researchOfficeBeijing,
    gallery: [
      researchOfficeDetail,
      researchOfficeLounge,
      researchOfficeConference
    ],
    palette: ['#0A0A0A', '#404040', '#808080', '#D4D4D8', '#F4F4F5'],
    detail: {
      conceptEN: 'Adhering to the theme of black, white, and gray monochrome, this design utilizes organized architectural language to sculpt this scientific research venue into a serene, highly efficient, and futuristic workspace. Seam-free high-precision concrete flooring stretches continuously, paired with cool linear LED grids and ultra-clear frosted glass dividers, allowing natural and artificial light to diffuse softly for a sophisticated tech-forward aesthetic.',
      conceptZH: '本案设计秉承无极黑白灰的主旋律，通过极具建筑秩序感的设计语言，将科研场所塑造成一个静谧、高效且充满未来感的深思空间。大面积高精度微水泥地坪无缝延展，配合冷光线性灯带和超白雾面隔断，令自然光与科技灯光在玻璃表面柔和折射，呈现走在科技前沿的精细物性美学。',
      materialsEN: ['High-Precision Microcement', 'Stainless Steel & Frosted Glass Details', 'Acoustic Charcoal Wool Wall Panels', 'Cool Light Precision Linear LED Grids'],
      materialsZH: ['高精度防尘微水泥地坪', '超白雾面艺术玻璃隔断', '定制抗噪暗灰毛呢壁板', '冷光精密集成线性灯系统'],
      specs: {
        area: '600㎡',
        location: 'Beijing, Haidian',
        year: '2025',
        vibe: 'Monochrome Sci-Tech'
      }
    }
  },
  {
    id: '02',
    titleEN: 'Private Residence — Luxury Within Substance',
    titleZH: '私宅-奢华之中彰显内涵',
    subtitleEN: 'Style cannot constrain the imagination of life.',
    subtitleZH: '风格并不能约束生活的想象',
    category: 'residential',
    categoryLabelEN: 'Estates',
    categoryLabelZH: '住宅建构',
    area: '600㎡',
    locationEN: 'Beijing, China',
    locationZH: '中国 北京',
    year: '2025',
    mainImage: wabiSabiTeaMain,
    gallery: [
      wabiSabiTeaDetail1,
      wabiSabiTeaDetail2
    ],
    palette: ['#F3ECE5', '#E2D3C1', '#BBA28D', '#413A35', '#1F1E1C'],
    detail: {
      conceptEN: 'This project embodies the concept of "Luxury within Substance, Returning to the Essence of Living." Bypassing superficial symbols of traditional opulence, the design leverages warm volumetric geometry, honest and highly tactile materials, and soft, diffused architectural lighting to redefine premium residential comfort. Grounded in a calming warm-gray palette paired with textured stone slabs, organic wood blocks, and customized bouclé textiles, the spaces transition fluidly without rigid stylistic constraints, forming a self-contained sanctuary for modern living.',
      conceptZH: '本案承载着“奢华内敛，回归生活本质”的设计主张。空间摒弃一切流于表面、拼凑堆砌的传统奢华符号，而倾向于通过温润的体量关系、质朴而富有触感的纯粹材质以及柔和漫折射的光源组织，重塑尊贵人居的真谛。以沉稳的大地暖灰为基调，搭配肌理细腻的天然原石、深邃有温差的原木及定制羊毛圈圈织物，使各功能分区在流动包容的体量感中自然转换，创造出一个不受任一风格约束、让居住者灵魂得以安放的生活容器。',
      materialsEN: ['Italian Travertine & Stone', 'Custom Brushed Metal Parts', 'Rich Bouclé Statement Fabrics', 'Diffuse Arch-lighting Systems'],
      materialsZH: ['意大利罗马洞石大板', '拉丝哑光金属扣件', '珍稀羊毛圈圈呢软包', '几何漫射隐藏式暖光线'],
      specs: {
        area: '600㎡',
        location: 'Dongcheng, Beijing',
        year: '2025',
        vibe: 'Quiet Luxury / 质享奢华'
      }
    }
  },
  {
    id: '03',
    titleEN: 'Monochrome Grid Media Headquarters',
    titleZH: '极简单色网格 创意媒体总部办公厅',
    subtitleEN: 'Structured tubular steel lines met by neutral glass elements.',
    subtitleZH: '不锈钢结构管线与冷白雾面玻璃的纯粹建构。',
    category: 'commercial',
    categoryLabelEN: 'Halls',
    categoryLabelZH: '办公商业',
    area: '340㎡',
    locationEN: 'Munich, Germany',
    locationZH: '德国 慕尼黑',
    year: '2026',
    mainImage: commercialHeadquartersMain,
    gallery: [
      commercialHeadquartersMain
    ],
    palette: ['#FAFAFA', '#E5E5E5', '#A3A3A3', '#171717', '#4F46E5'],
    detail: {
      conceptEN: 'A highly functional office for global visionaries. Modeled with strict modularity, we installed continuous glass partitions block and exposed sandblasted ceiling trusses. Desks are custom welded out of pure tubular stainless steel and topped by solid white terrazzo panels for durable modern elegance.',
      conceptZH: '一个极具未来思维的高效率创意工场。全案以严苛的格栅尺度设计，采用通长白色极窄边框玻璃隔板与裸露的折射金属钢梁。办公桌由精制抛光圆管不锈钢拼焊而成，并覆顶白水泥大颗粒水磨石台面，确保冷峻工业质感与日常实用并存。',
      materialsEN: ['Polished Stainless Steel', 'Ultra-clear Fluted Glass', 'White Fine Aggregate Terrazzo', 'Light Gray Epoxy Flooring'],
      materialsZH: ['精研极窄管装不锈钢', '超白压花长虹玻璃', '白水泥颗粒大水磨石', '浅灰色高级防尘流平自流平'],
      specs: {
        area: '340㎡',
        location: 'Munich, Tech Corridor',
        year: '2026',
        vibe: 'Bauhaus Modernism'
      }
    }
  },
  {
    id: '04',
    titleEN: 'Vessel Boutique Hotel & Lounge',
    titleZH: '静泊 Vessel 艺术野奢温泉精品酒店',
    subtitleEN: 'An immersive stone lounge utilizing pure architectural mass.',
    subtitleZH: '在厚重的洞石矿包覆下，探索流水与皮肤的关系。',
    category: 'hospitality',
    categoryLabelEN: 'Sanctuary',
    categoryLabelZH: '野奢精品',
    area: '620㎡',
    locationEN: 'Kyoto, Japan',
    locationZH: '日本 京都',
    year: '2025',
    mainImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800'
    ],
    palette: ['#F3ECE5', '#DFCDBE', '#BBA28D', '#413A35', '#A56539'],
    detail: {
      conceptEN: 'We crafted the spa sanctuary hotel which simulates underground limestone caverns. Water flows across monolithic travertine slabs, while diffuse 2400K lighting arrays run inside recessed wall channels, creating a soft glowing horizon that relaxes guests instantly.',
      conceptZH: '我们雕刻出一座类似地下石灰岩溶洞的静谧疗愈温泉酒店。活水沿着巨型意大利罗马洞石台阶缓缓滑过，全场配合隐藏于凹型墙面刻槽中的2400K暖昏黄光带，点亮温柔的地平线，令身心获得最本源的澄澈。',
      materialsEN: ['Roman Travertine Marble', 'Recessed Low-Temp Diffuse LED', 'Rough Cast Micro-Plaster', 'Aged Cedar Timbers'],
      materialsZH: ['奢华罗马米黄洞石', '定制超低色温隐藏灯带', '颗粒感中粗粗糙石膏墙面', '防腐古碳老烘干雪松木'],
      specs: {
        area: '620㎡',
        location: 'Kyoto Outer Hills',
        year: '2025',
        vibe: 'Organic Sanctuary'
      }
    }
  }
];

// Material Catalog items
export const sampleMaterials: MaterialItem[] = [
  {
    id: 'm1',
    nameEN: 'Oatmeal Microcement',
    nameZH: '燕麦微水泥自流平',
    category: 'flooring',
    categoryLabelEN: 'Flooring',
    categoryLabelZH: '地面材料',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=300',
    colorHex: '#DDDCD7',
    textureDescriptionEN: 'Seamless plaster matte look, cold but warm and seamless texture, earthy modern touch.',
    textureDescriptionZH: '极冷漠却极其润泽的无缝一体墙地自流平饰面，带来无以伦比的现代统一感。'
  },
  {
    id: 'm2',
    nameEN: 'Sanded Blonde Oak Plat',
    nameZH: '疤结哑光白橡木大板',
    category: 'flooring',
    categoryLabelEN: 'Flooring',
    categoryLabelZH: '地面材料',
    image: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=300',
    colorHex: '#DECBA7',
    textureDescriptionEN: 'Raw natural wood grain, wirebrushed 8% gloss matte wax sealant, tactile raw lines.',
    textureDescriptionZH: '大面积天然疤结钢丝拉丝表面，环保蜡封工艺，保留木头微微起伏的温润粗糙。'
  },
  {
    id: 'm3',
    nameEN: 'Wabi Clay Plaster',
    nameZH: '手工泥土矿物墙漆',
    category: 'wall',
    categoryLabelEN: 'Wall Finishes',
    categoryLabelZH: '墙面饰面',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=300',
    colorHex: '#EAE5DB',
    textureDescriptionEN: 'Uneven thickness hand troweled clay plaster with straw fiber spots. Light diffuse is highly organic.',
    textureDescriptionZH: '厚度不匀的手抹矿物黏土泥，夹杂微细金色稻草，漫反射效果极其饱满高雅。'
  },
  {
    id: 'm4',
    nameEN: 'Walnut Joinery Panel',
    nameZH: '亚光黑胡桃木木作护墙板',
    category: 'wall',
    categoryLabelEN: 'Wall Finishes',
    categoryLabelZH: '墙面饰面',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=300',
    colorHex: '#4C3B30',
    textureDescriptionEN: 'Deep rich crown wood paneling with silent charcoal reflections, high stability joinery.',
    textureDescriptionZH: '优雅的深褐色黑胡桃经典皇冠大花纹理，暗沉静谧，非常适合做隔墙背景墙。'
  },
  {
    id: 'm5',
    nameEN: 'Fluted Reeded Glass',
    nameZH: '防爆极窄边框长虹玻璃',
    category: 'cabinet',
    categoryLabelEN: 'Cab Surfaces',
    categoryLabelZH: '柜体隔墙',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=300',
    colorHex: '#EAF0EE',
    textureDescriptionEN: 'Rhythm vertical flutes, hides storage shadows, lets clear colored lights bend.',
    textureDescriptionZH: '精密等距垂直排列压花隔栅玻璃，完美虚化柜内杂物影子，折射彩虹般霓虹。'
  },
  {
    id: 'm6',
    nameEN: 'Muted Black Matte Lacquer',
    nameZH: '防指纹超凡哑光黑漆面板',
    category: 'cabinet',
    categoryLabelEN: 'Cab Surfaces',
    categoryLabelZH: '柜体隔墙',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=300',
    colorHex: '#1A1A1A',
    textureDescriptionEN: 'Nanotech skin panel, absorbing 99% surface glare, silky feedback to fingertips.',
    textureDescriptionZH: '纳米级低反光防指纹材料面板，宛如寂静黑夜，触感如丝绸般。'
  },
  {
    id: 'm7',
    nameEN: 'Natural Travertine Slab',
    nameZH: '天然意国进口米白洞石',
    category: 'accent',
    categoryLabelEN: 'Accents & Stones',
    categoryLabelZH: '石材五金',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=300',
    colorHex: '#E2D3C1',
    textureDescriptionEN: 'Volcanic sediment fissures left un-filled for organic air gaps, soft sandstone aura.',
    textureDescriptionZH: '地层挤压沉积孔洞保留未封状态，自然狂野，自带雕塑级的高贵气息。'
  },
  {
    id: 'm8',
    nameEN: 'Brushed Bronze Hardware',
    nameZH: '拉丝高精度复古黄铜五金',
    category: 'accent',
    categoryLabelEN: 'Accents & Stones',
    categoryLabelZH: '石材五金',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=300',
    colorHex: '#B28E61',
    textureDescriptionEN: 'Electroplated micro-groove alloy metal, warmth metallic luster under spotlighting.',
    textureDescriptionZH: '微米级极窄横切拉丝做旧香槟铜，射灯照射下泛起一层高贵温润的暗金属柔光。'
  },
  {
    id: 'm9',
    nameEN: 'Sanded Bouclé Textile',
    nameZH: '圈圈洋毛手工织物',
    category: 'textile',
    categoryLabelEN: 'Textiles',
    categoryLabelZH: '高定针织',
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=300',
    colorHex: '#ECE7DF',
    textureDescriptionEN: 'Textured nubby wool loops blending beige and snow fibers. Highly cozy acoustic control.',
    textureDescriptionZH: '由高旦卷曲羊毛线圈与雪白色纤维粗混，多孔吸音性能极佳，是冬日沙发的不二选择。'
  }
];

// Aesthetic quiz questionnaire
export const designQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionEN: 'What constitutes your perfect morning context?',
    questionZH: '对您而言，一幅最梦幻的清晨场景是什么？',
    options: [
      { value: 'a', labelEN: 'Warm light beams cutting through raw materials, holding steam over local tea pots.', labelZH: '金色斜光懒懒穿透质朴土墙，在粗陶茶壶上泛起晨雾。', styleTag: 'Wabi-Sabi' },
      { value: 'b', labelEN: 'Silent shadows across a continuous seamless floor, clean horizontal lines containing everything.', labelZH: '微凉的静谧日光平铺在一片无缝的自流平地面，毫无赘余分隔线。', styleTag: 'Japandi' },
      { value: 'c', labelEN: 'Bright daylight reflecting off polished metal parts and grid bookshelves.', labelZH: '刺向玻璃 curtain 的白光在管状不锈钢钢椅和整齐的格栅架上折射出棱角。', styleTag: 'Bauhaus Minimalist' },
      { value: 'd', labelEN: 'Sunlit water ripples reflecting on rough beige limestone slabs.', labelZH: '落地玻璃映入周边的池塘波光，斜照在整堵暗金意式洞石墙面上。', styleTag: 'Organic luxury' }
    ]
  },
  {
    id: 2,
    questionEN: 'Pick your preferred touch screen feedback:',
    questionZH: '关于物理材质，您的指尖最渴望触摸到：',
    options: [
      { value: 'a', labelEN: 'The slight wavy bumps of raw timber with natural cracks and sand scars.', labelZH: '原木大板自然的裂隙、树疤与钢粗拉丝在指尖滑过的微颤。', styleTag: 'Wabi-Sabi' },
      { value: 'b', labelEN: 'Perfect velvet softness of skin matte cabinets with zero glare footprint.', labelZH: '吸光率极高的超哑光抗指纹柜板，那种细腻如天鹅绒般的摩挲感。', styleTag: 'Japandi' },
      { value: 'c', labelEN: 'High-polish cooling texture of heavy stainless panels or terrazzo tables.', labelZH: '重工业冷却不锈钢板、或粗骨料水磨石打磨那股沉甸甸的寒意。', styleTag: 'Bauhaus Minimalist' },
      { value: 'd', labelEN: 'Fluted structured clay plasters or organic linen weaves with dynamic thread weights.', labelZH: '粗粝的手作灰泥墙、或起伏不匀的高克重纯棉麻编织纹理。', styleTag: 'Organic luxury' }
    ]
  },
  {
    id: 3,
    questionEN: 'How do you view partition framing?',
    questionZH: '对于室内布局分割、隔墙，您抱持什么偏好？',
    options: [
      { value: 'a', labelEN: 'Low levels, loose bamboo grids or paper sliding doors that preserve dark mysteries.', labelZH: '偏爱极低矮的陈列、手制竹筛屏风、以及保持空间光影暧昧的主动阴暗。', styleTag: 'Wabi-Sabi' },
      { value: 'b', labelEN: 'Frameless glass panels, smooth hidden doors flush with walls.', labelZH: '极窄细框玻璃隔壁、对齐立面的墙门合一极简收口。', styleTag: 'Japandi' },
      { value: 'c', labelEN: 'Exposed structural framing, strict modular layout alignments.', labelZH: '暴露的纵向和横向结构轨道，严整均分的长宽格。', styleTag: 'Bauhaus Minimalist' },
      { value: 'd', labelEN: 'Curves and hollow niches carved out of massive architectural brick envelopes.', labelZH: '利用沉甸甸的墙体开凿出壁龛，或者带有柔和弧线的流畅弧面墙。', styleTag: 'Organic luxury' }
    ]
  }
];

export const quizResults: Record<string, QuizResult> = {
  'Wabi-Sabi': {
    styleNameEN: 'Meditative Wabi-Sabi Sanctuary',
    styleNameZH: '空灵内省 · 诗意侘寂',
    descEN: 'You align with temporal authenticity, aging organic material, and deep spatial quietude. You appreciate how a rough wall accepts light and represents natural erosion.',
    descZH: '您完美宿驻于材质的岁月沉淀、不对称的天然残缺、以及极度宁静的环境氛围。您珍视粗饰墙面捕捉微弱自然光的斑驳感，也认同物性最自然的流逝。',
    matchScore: 96,
    recommendedPalette: ['#EAE5DB', '#C29F78', '#5E5B55', '#2C2B29'],
    estimatedCostRange: '￥2,200 - ￥3,600 / ㎡',
    tipsEN: [
      'Utilize manual clay plaster rather than plain latex painting.',
      'Blend reclaimed wood joining and organic flax canvases.',
      'Maintain color temperatures at 2700K or warm sunset glow gradients.'
    ],
    tipsZH: [
      '用带稻草颗粒的稻草漆或手抹沙灰泥取代廉价平整的乳胶漆。',
      '在角落放置一两件年代斑驳回收的老榆木长凳或不规整石台。',
      '室内所有的软装灯带、局限射灯建议恒定在极舒缓的2700K甚至2400K低照度温标内。'
    ],
    relevantMaterials: ['m3', 'm2', 'm7']
  },
  'Japandi': {
    styleNameEN: 'Modern Japandi Minimalist',
    styleNameZH: '日式和风与北欧极简 · 摩登雅居',
    descEN: 'You appreciate high order, ultimate seamless alignments, pale timbers, and modern functionalism. You seek calming environments with zero spatial noise.',
    descZH: '您渴望至高无上的居住结构秩序，执着于分毫不差的线对线缝隙、极淡浅色温控原木，以及通透纯净的功能流线。对视觉和空间杂物有零容忍倾向。',
    matchScore: 98,
    recommendedPalette: ['#FAFAFA', '#DDDCD7', '#DECBA7', '#1A1A1A'],
    estimatedCostRange: '￥1,800 - ￥2,900 / ㎡',
    tipsEN: [
      'Install custom floor-to-ceiling skin cabinets with flush handles.',
      'Use light warm oak flooring paired with oatmeal micor-cement lines.',
      'Choose diffuse large paper pendants or architectural track lightings.'
    ],
    tipsZH: [
      '柜体门板选用通高无拉手反弹器的哑光亚麻色纳米板，与墙面彻底齐平。',
      '选用纹理极为温和的白橡木地板进行工字细拼，或直接大面积使用燕麦色微水泥。',
      '居室主光源配置大比例漫反射宣纸灯笼，或使用极窄单通道内置磁吸式轨道灯。'
    ],
    relevantMaterials: ['m1', 'm2', 'm5']
  },
  'Bauhaus Minimalist': {
    styleNameEN: 'Structural Bauhaus Grid',
    styleNameZH: '严谨建构 · 现代包豪斯网格',
    descEN: 'You are structurally expressive. You love high-contrast geometries, stainless tubing, exposed metallic lines, and robust architectural order.',
    descZH: '您的审美源自硬核与结构逻辑。您热爱高灰对比度的硬线、拉丝圆管不锈钢、剔透的镜玻璃，以及绝对工业化的秩序感。',
    matchScore: 94,
    recommendedPalette: ['#FFFFFF', '#E5E5E5', '#171717', '#4F46E5'],
    estimatedCostRange: '￥2,500 - ￥4,200 / ㎡',
    tipsEN: [
      'Build bold exposed iron framing or custom chrome accent elements.',
      'Use dense white concrete aggregations or large format dark stones.',
      'Direct structural 4000K cold lights to highlight high-tech details.'
    ],
    tipsZH: [
      '局部采用抛光圆管钢柱或悬挑不锈钢五金横梁进行吊顶或分区支撑。',
      '地面及餐桌面使用骨料饱满、大颗粒打磨出的白色水泥基水磨石大板。',
      '色温设定上适合在局部书架、展示架注入3500K-4000K的挺拔亮白色，凸显工艺级精准度。'
    ],
    relevantMaterials: ['m5', 'm6', 'm8']
  },
  'Organic luxury': {
    styleNameEN: 'Sculptured Modern Organic Majesty',
    styleNameZH: '雕塑感艺术奢华 · 曲线大自然',
    descEN: 'You lean towards organic majesty, soft curves, rare travertine structures, and high aesthetic weight. Your space serves as an physical gallery.',
    descZH: '您天生倾倒于宏大家具形态、丰润的舒缓流线、高耸的大理石镂刻质感、以及大比例的艺术收藏张力。您的空间当属一幅流动的艺术馆。',
    matchScore: 95,
    recommendedPalette: ['#F3ECE5', '#E2D3C1', '#BBA28D', '#413A35'],
    estimatedCostRange: '￥3,500 - ￥6,000 / ㎡',
    tipsEN: [
      'Inject flowing curved walls and high custom plaster-carved ceiling domes.',
      'Invest in monolithic travertine accents or raw limestone items.',
      'Blend hand-woven bouclé textiles on statement furniture pieces.'
    ],
    tipsZH: [
      '在走廊、岛台拐角做15度大尺度弧度拉弯收口，让过道与墙融合一体。',
      '定制一块未打蜡填坑孔、具有野性地层裂缝、带有大咬角凿边的古罗马进口洞石岛台。',
      '沙发选用大底盘全羊驼毛、圈圈呢羊毛混纺质地，形成云朵般膨胀的奢华承托。'
    ],
    relevantMaterials: ['m7', 'm8', 'm9']
  }
};
