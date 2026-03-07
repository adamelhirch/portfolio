import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Scene = {
  start: number;
  end: number;
  kicker: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  accent: string;
};

const FPS = 30;
const SCENE_DURATIONS = [8, 12, 16, 16, 14, 12, 12];

const sceneStarts = SCENE_DURATIONS.reduce<number[]>((acc, duration, index) => {
  if (index === 0) {
    return [0];
  }

  const previousStart = acc[index - 1] + SCENE_DURATIONS[index - 1] * FPS;
  return [...acc, previousStart];
}, []);

const sceneEnds = sceneStarts.map((start, index) => start + SCENE_DURATIONS[index] * FPS);

export const CV_DURATION_IN_FRAMES = sceneEnds[sceneEnds.length - 1];

const SCENES: Scene[] = [
  {
    start: sceneStarts[0],
    end: sceneEnds[0],
    kicker: "ADAM EL HIRCH",
    title: "CV oral 2026",
    subtitle: "Data Engineering | IA/NLP | Full-Stack",
    bullets: [
      "BUT Informatique AGED - IUT Paul Sabatier",
      "Recherche de stage: 10 a 16 semaines des avril 2026",
    ],
    accent: "#7cf7d4",
  },
  {
    start: sceneStarts[1],
    end: sceneEnds[1],
    kicker: "PROFIL",
    title: "Positionnement",
    bullets: [
      "Transformer la data en produit utile",
      "Execution rigoureuse: priorisation, ownership, livraison",
      "Focus: data engineering, NLP, architecture logicielle",
    ],
    accent: "#9cb8ff",
  },
  {
    start: sceneStarts[2],
    end: sceneEnds[2],
    kicker: "PROJET CLE 2026",
    title: "Yelp Data Engineering & NLP",
    subtitle: "Project Architect / Project Manager",
    bullets: [
      "Pilotage d'une equipe de 5 sur Linear",
      "Pipeline: JSONL -> nettoyage -> Parquet -> NLP",
      "TF-IDF, Word2Vec, dashboards insights",
    ],
    accent: "#87d8ff",
  },
  {
    start: sceneStarts[3],
    end: sceneEnds[3],
    kicker: "PROJET CLE 2025",
    title: "SeriesFlix",
    subtitle: "Search & Recommendation Engine",
    bullets: [
      "15 000+ sous-titres indexes",
      "Stack: Flask, React, PostgreSQL, BM25",
      "Recommandation personnalisee par similarite cosinus",
    ],
    accent: "#ffc58f",
  },
  {
    start: sceneStarts[4],
    end: sceneEnds[4],
    kicker: "PROJETS COMPLEMENTAIRES",
    title: "NutriSight + CandiGO",
    bullets: [
      "NutriSight: ETL KNIME + dashboards Power BI",
      "CandiGO: plateforme IA de candidatures optimisees ATS",
      "Impact annonce: de 1h a 10min par candidature",
    ],
    accent: "#ffd96c",
  },
  {
    start: sceneStarts[5],
    end: sceneEnds[5],
    kicker: "COMPETENCES",
    title: "Stack technique",
    bullets: [
      "Python, JavaScript, SQL, API REST",
      "ETL, BI, Power BI, Docker, Git, Agile",
      "Francais, Anglais B2, Espagnol bilingue",
    ],
    accent: "#a9f09f",
  },
  {
    start: sceneStarts[6],
    end: sceneEnds[6],
    kicker: "OBJECTIF",
    title: "Stage data / IA / software",
    bullets: [
      "Contribuer sur des projets a impact concret",
      "adamelhirch.com | linkedin.com/in/adam-el-hirch",
    ],
    accent: "#ffb3dd",
  },
];

const getSceneOpacity = (frame: number, start: number, end: number) => {
  const fadeIn = interpolate(frame, [start, start + 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(frame, [end - 16, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return Math.min(fadeIn, fadeOut);
};

const SceneCard: React.FC<{ scene: Scene }> = ({ scene }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = Math.max(0, frame - scene.start);
  const opacity = getSceneOpacity(frame, scene.start, scene.end);

  const cardY = interpolate(frame, [scene.start, scene.start + 22], [52, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleScale = spring({
    fps,
    frame: localFrame,
    config: {
      damping: 200,
      stiffness: 130,
      mass: 1,
    },
  });

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translateY(${cardY}px)`,
        alignItems: "center",
        justifyContent: "center",
        padding: "84px 96px 108px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1540,
          borderRadius: 30,
          border: `1px solid ${scene.accent}70`,
          background: "rgba(9, 14, 24, 0.72)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.4)",
          padding: "52px 58px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            color: scene.accent,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 1.8,
            textTransform: "uppercase",
          }}
        >
          {scene.kicker}
        </div>

        <div
          style={{
            color: "#ffffff",
            fontSize: 68,
            lineHeight: 1.06,
            fontWeight: 800,
            marginBottom: scene.subtitle ? 4 : 8,
            transform: `scale(${0.965 + titleScale * 0.035})`,
            transformOrigin: "left center",
          }}
        >
          {scene.title}
        </div>

        {scene.subtitle ? (
          <div
            style={{
              color: "#cfd8ee",
              fontSize: 30,
              fontWeight: 500,
              lineHeight: 1.18,
              marginBottom: 8,
            }}
          >
            {scene.subtitle}
          </div>
        ) : null}

        {scene.bullets.map((bullet, index) => {
          const bulletStart = scene.start + 18 + index * 12;
          const bulletOpacity = interpolate(frame, [bulletStart, bulletStart + 16], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const bulletX = interpolate(frame, [bulletStart, bulletStart + 16], [24, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={`${scene.kicker}-${index}`}
              style={{
                color: "#edf2ff",
                fontSize: 39,
                lineHeight: 1.24,
                opacity: bulletOpacity,
                transform: `translateX(${bulletX}px)`,
              }}
            >
              {`• ${bullet}`}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const MyComposition: React.FC = () => {
  const frame = useCurrentFrame();

  const progress = interpolate(frame, [0, CV_DURATION_IN_FRAMES], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = Math.sin(frame / 26) * 18;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 18% 18%, #2a3666 0%, #1a2240 45%, #0b101d 100%)",
        fontFamily: "Inter, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif",
      }}
    >
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(circle at 82% 14%, rgba(124, 247, 212, 0.2), transparent 36%), radial-gradient(circle at 20% 86%, rgba(255, 217, 108, 0.16), transparent 34%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          top: 140,
          right: -140 + pulse,
          background: "rgba(156, 184, 255, 0.12)",
          filter: "blur(2px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 430,
          height: 430,
          borderRadius: "50%",
          bottom: 44,
          left: -90 - pulse * 0.6,
          background: "rgba(124, 247, 212, 0.12)",
          filter: "blur(2px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "rgba(255,255,255,0.1)",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #7cf7d4, #9cb8ff, #ffd96c)",
          }}
        />
      </div>

      {SCENES.map((scene) => (
        <SceneCard key={scene.kicker} scene={scene} />
      ))}

      <div
        style={{
          position: "absolute",
          left: 68,
          bottom: 34,
          color: "rgba(255,255,255,0.65)",
          fontSize: 23,
          letterSpacing: 0.3,
        }}
      >
        adamelhirch.com
      </div>

      <div
        style={{
          position: "absolute",
          right: 68,
          bottom: 34,
          color: "rgba(255,255,255,0.65)",
          fontSize: 23,
          letterSpacing: 0.3,
        }}
      >
        CV oral - Grandes lignes
      </div>
    </AbsoluteFill>
  );
};
