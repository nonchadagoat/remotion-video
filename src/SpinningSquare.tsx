import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SpinningSquare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Square pops in, then keeps spinning
  const scale = spring({ frame, fps, config: { damping: 12 } });
  const rotation = interpolate(frame, [0, 150], [0, 360]);

  // Text fades and slides in after the square appears
  const textProgress = spring({ frame: frame - 15, fps, config: { damping: 200 } });
  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [30, 0]);

  return (
    <AbsoluteFill className="bg-[#f5f5f0] items-center justify-center">
      <div
        className="w-[260px] h-[260px] rounded-3xl bg-[#1a1a1a]"
        style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
      />
      <div
        className="mt-24 text-[80px] font-bold text-[#1a1a1a] font-sans"
        style={{ opacity: textOpacity, transform: `translateY(${textY}px)` }}
      >
        wassup everyone
      </div>
    </AbsoluteFill>
  );
};
