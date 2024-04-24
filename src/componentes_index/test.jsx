
import { motion, useViewportScroll, useTransform } from "framer-motion";

const ParallaxComponent = () => {
  const { scrollY } = useViewportScroll();
  const y1 = useTransform(scrollY, [0, 100], [0, -100]);
  const y2 = useTransform(scrollY, [0, 100], [0, 100]);

  return (
    <div style={{ height: "200vh" }}>
      <motion.div
        style={{
          width: "100%",
          height: "100vh",
          background: "blue",
          y: y1,
        }}
      />
      <motion.div
        style={{
          width: "100%",
          height: "100vh",
          background: "red",
          y: y2,
        }}
      />
    </div>
  );
};

export default ParallaxComponent;
