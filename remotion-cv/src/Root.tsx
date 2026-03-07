import "./index.css";
import { Composition } from "remotion";
import { CV_DURATION_IN_FRAMES, MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OralCV"
        component={MyComposition}
        durationInFrames={CV_DURATION_IN_FRAMES}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
