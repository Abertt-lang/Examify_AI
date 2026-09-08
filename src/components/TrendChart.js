import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import Svg, { Path, Circle, Line, Text as SvgText } from "react-native-svg";
import colors from "../theme/colors";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function TrendChart({ data, width = 300, height = 150 }) {
  const drawAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(drawAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, [data, drawAnim]);

  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Sin datos de tendencia aún</Text>
      </View>
    );
  }

  const padding = 30;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxPercent = Math.max(...data.map((d) => d.percent), 100);
  const minPercent = Math.min(...data.map((d) => d.percent), 0);
  const range = maxPercent - minPercent || 1;

  const points = data.map((d, i) => ({
    x: padding + (i / (data.length - 1 || 1)) * chartWidth,
    y: padding + chartHeight - ((d.percent - minPercent) / range) * chartHeight,
    percent: d.percent,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const getColor = (percent) => {
    if (percent >= 80) return colors.primaryGreen;
    if (percent >= 60) return "#FF9800";
    return "#E05B5B";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tendencia de calificaciones</Text>

      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = padding + chartHeight - (val / 100) * chartHeight;
          return (
            <React.Fragment key={val}>
              <Line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                stroke="#F0F3F6"
                strokeWidth={1}
              />
              <SvgText
                x={padding - 8}
                y={y + 4}
                fontSize={10}
                fill={colors.textMuted}
                textAnchor="end"
              >
                {val}%
              </SvgText>
            </React.Fragment>
          );
        })}

        {/* Line path */}
        <AnimatedPath
          d={pathD}
          stroke={colors.primaryGreen}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <Circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={6}
            fill={getColor(p.percent)}
            stroke={colors.white}
            strokeWidth={2}
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => (
          <SvgText
            key={`label-${i}`}
            x={p.x}
            y={height - 8}
            fontSize={10}
            fill={colors.textMuted}
            textAnchor="middle"
          >
            {`#${i + 1}`}
          </SvgText>
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textDark,
    marginBottom: 12,
  },
  emptyContainer: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 13,
    color: colors.textMuted,
  },
});