import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = 3000;

// Enable JSON parsers and CORS for simple local interaction
app.use(cors());
app.use(express.json());

// Initialize Gemini client lazily to avoid crashing if secret keys are missing on system boot
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("⚠️ Warning: GEMINI_API_KEY environment variable is not defined. The AI Consultant will operate in demo fallback mode.");
    }
    // Instantiate with official SDK standard
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY_DISMISSED",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. API: Design Studio Health Check & Env check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    apiConfigured: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString()
  });
});

// 2. API: Curation Consultant Chat endpoint
app.post('/api/consult', async (req, res) => {
  try {
    const { prompt, language = 'en', history = [] } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Instruction prompt is required' });
    }

    const isChinese = language === 'zh';
    
    // Fallback static smart responses if API key is not configured so the app is robust on load
    if (!process.env.GEMINI_API_KEY) {
      console.log("No API Key found. Returning handcrafted elegant design concept as fallback.");
      setTimeout(() => {
        if (isChinese) {
          return res.json({
            text: `### AURA 设计总监高级空间草案 (Demo Fallback)

您好！由于目前系统未检测到内置的 **GEMINI_API_KEY**，我为您预先生成了一套契合您所描述意愿的精品空间提案：

#### 1. 空间体积与采光规划 [Aura Space]
- **日光捕获**：鉴于您提到的采光习惯，建议引入高通透的旋转中轴钢框门（极窄拉丝黑），配以大面积落地格栅压花玻璃，消除多余遮蔽。
- **空间体量**：通过高挑的定制立面与齐平拉直的顶板，减少顶板接缝。在过渡过道设置15度大洗角微弧造型，弱化边界界线。

#### 2. 定制材质搭配看板 [Tactility Canvas]
- **主地基**：**白橡木人字拼打蜡地板** 与 **燕麦灰色天然自流平微水泥** 对拼，形成软硬交织。
- **背景墙面**：**手工草灰泥矿物原土漆**，保留手指刀痕微凹凸漫反射。
- **五金极窄细节**：拉丝古铜色不锈钢卡缝与地脚线。

#### 3. 灯光分界线设计 [Luminance Axis]
- 舍弃喧嚣的装饰性大吊灯，全场隐藏在凹墙轨槽内的 **2700K 隐藏式黄昏极柔线性灯带**，搭配2个局部重点照明的单眼高演色防眩射灯。

**温馨建议**：请在 AI Studio 右上角 **Secrets** 内，设置 \`GEMINI_API_KEY\`，即可激活全功能实时定制 AI 咨询！`
          });
        } else {
          return res.json({
            text: `### AURA Studio Principal Design Manifesto (Demo Fallback)

Greetings. As the real-time **GEMINI_API_KEY** was not detected in this active sandbox environment, I have curated a tailored architectural blueprint simulating your inquiry:

#### 1. Spatial Structure & Illuminance Axis
- **Luminance Ingress**: Optimize light trajectories by establishing 4.2-meter high steel ribbon pivot windows paired with sandblasted reed-glass profiles. This removes visual weight and allows dynamic vertical ray casting.
- **Geometrical Envelopes**: Merge secondary ceilings flush with joinery heads. Smooth transition portals using soft 15° radiused curves to soften high brutalist volumes.

#### 2. Selected Textural Canvas
- **Primary Foundation**: Combine seamless **Oatmeal Microcement flooring** with **Sanded Blonde Oak slabs** to construct cohesive tectonic zones.
- **Architectural Plasters**: Troweled **raw clay mud paste with straw fiber inserts**, offering full diffuse light scattering.
- **Metal Alignments**: Recessed matte black oxide slot channels and polished stainless trim lines.

#### 3. Low-Frequency Lighting Manifesto
- We propose a zero-glare, indirect layout. Embed continuous **2700K Sunset-tone hidden LED ribbons** in recessed ceiling grooves, supported by precise high-CRI accent spots pointed at textured surfaces.

*To activate infinite generative blueprints, simply populate your \`GEMINI_API_KEY\` inside the Settings Secrets panel in the AI Studio menu.*`
          });
        }
      }, 1000);
      return;
    }

    // Call real Google Gen AI
    const ai = getGeminiClient();
    
    // Compose system instruction
    const systemInstruction = isChinese 
      ? `您是 AURA Studio 极简室内设计事务所的创意总监及首席建筑师。请站在殿堂级高尚建构大师的高度，为用户提供富于诗意、高度专业、触觉刻画深刻、工艺实用度极高、且具有北欧极简(Japandi)或东方侘寂美学深度的设计咨询。
请提供以下三大精细板块（Markdown格式输出，使用精美的小写英文子标题，不带系统或技术LARP字眼，保持人道人文设计感）：
1. 空间体量与采光规划 [Spatial Alignment & Daylighting]
2. 定制高级材质搭配 [Custom Tactral Canvas & Surfaces]
3. 空间色温与低频照度设计 [Low-Frequency Light & Chromatic Aura]
请给出具体的材质名字、灯光色温温标(如 2700K 暖黄)、家具摆设动线以及施工收口层面的顶级微观建议。语言应优雅、字字千金、高级、切忌苍白套话。`
      : `You are the AURA Studio Principal Spatial Creator and Architectural Director. Provide an ultra-premium, deeply poetic yet highly functional interior design critique and bespoke blueprint in response to the user's room details.
Adopt a world-class, minimal, sensory-oriented architectural tone (blending Norse minimalism, Japandi, and Wabi-Sabi sensitivity).
Structure your response gracefully in Markdown using these clear conceptual headers:
1. Spatial Volumes & Daylighting Axis (discuss light angles, window framing, pivot lines)
2. Carefully Selected Tactile Materials (give a precise list of custom surface materials, grain behaviors, and alignment details)
3. Chromatic Atmosphere & Low-Frequency Light Arrays (provide specific color codes, kelvin temps e.g. 2700K/3000K, and recessed spot setups)
Keep explanations highly scannable, sensory, clear, and technically detailed from an artistic standpoint.`;

    // Map history to official @google/genai contents list format
    // Each item has role: "user" | "model" (not "assistant")
    // and parts: [{ text: "..." }]
    const contents = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    // Call SDK Content Generation
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const textResult = response.text || "No response generated by model.";
    res.json({ text: textResult });

  } catch (error: any) {
    console.error("Gemini API server call error:", error);
    res.status(500).json({ 
      error: 'Curator engine encountered an issue.', 
      details: error.message || String(error)
    });
  }
});

// Serve frontend with Vite in dev, static build files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Mount Vite middleware for direct hot reload in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted.");
  } else {
    // Serve static files from the compiled bundle
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving static production assets from /dist.");
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AURA Server] Online and running live on http://localhost:${PORT}`);
  });
}

startServer();
