import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  type ComponentProps,
  type CSSProperties,
  type ReactNode,
} from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@josui/core-web";

export type ChartConfig = Record<
  string,
  {
    label?: string;
    icon?: React.ComponentType;
    color?: string;
    theme?: Record<string, string>;
  }
>;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

export function useChart() {
  const context = useContext(ChartContext);
  if (!context) throw new Error("useChart must be used within a <ChartContainer />");
  return context;
}

export interface ChartContainerProps extends ComponentProps<"div"> {
  config: ChartConfig;
  children: ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"];
}

export const ChartContainer = forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div
          data-chart={chartId}
          ref={ref}
          className={cn(
            "flex aspect-video justify-center text-xs",
            "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
            "[&_.recharts-cartesian-grid_line[stroke=#ccc]]:stroke-border/50",
            "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
            "[&_.recharts-dot[stroke=#fff]]:stroke-transparent",
            "[&_.recharts-layer]:outline-none",
            "[&_.recharts-polar-grid_[stroke=#ccc]]:stroke-border",
            "[&_.recharts-radial-bar-background-sector]:fill-muted-background",
            "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted-background",
            "[&_.recharts-reference-line_[stroke=#ccc]]:stroke-border",
            "[&_.recharts-sector[stroke=#fff]]:stroke-transparent",
            "[&_.recharts-sector]:outline-none",
            "[&_.recharts-surface]:outline-none",
            className,
          )}
          {...props}
        >
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  },
);
ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = useMemo(
    () => Object.entries(config).filter(([, cfg]) => cfg.color || cfg.theme),
    [config],
  );

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart="${id}"] {
${colorConfig
  .map(([key, cfg]) => {
    const color = cfg.color || cfg.theme?.light || "";
    return color ? `  --color-${key}: ${color};` : "";
  })
  .filter(Boolean)
  .join("\n")}
}
.dark [data-chart="${id}"] {
${colorConfig
  .map(([key, cfg]) => {
    const color = cfg.theme?.dark || cfg.color || "";
    return color ? `  --color-${key}: ${color};` : "";
  })
  .filter(Boolean)
  .join("\n")}
}`,
      }}
    />
  );
};

export const ChartTooltip = RechartsPrimitive.Tooltip;

export interface ChartTooltipContentProps extends ComponentProps<"div"> {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot" | "dashed";
  nameKey?: string;
  labelKey?: string;
  active?: boolean;
  payload?: Array<{
    name?: string;
    value?: number;
    dataKey?: string | number;
    color?: string;
    payload?: Record<string, unknown>;
    fill?: string;
  }>;
  label?: string;
  labelFormatter?: (value: string, payload: unknown[]) => ReactNode;
  formatter?: (
    value: number,
    name: string,
    item: unknown,
    index: number,
    payload: unknown[],
  ) => ReactNode;
  labelClassName?: string;
  color?: string;
}

export const ChartTooltipContent = forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = useMemo(() => {
      if (hideLabel || !payload?.length) return null;
      const item = payload[0];
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = config[key] || config[item?.dataKey as string];
      const value =
        !labelKey && typeof label === "string"
          ? itemConfig?.label || label
          : (item?.payload as Record<string, unknown>)?.[key] || label;

      if (labelFormatter)
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value as string, payload)}
          </div>
        );
      if (!value) return null;
      return <div className={cn("font-medium", labelClassName)}>{value as string}</div>;
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);

    if (!active || !payload?.length) return null;
    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        ref={ref}
        className={cn(
          "border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl",
          className,
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = config[key] || config[item.dataKey as string];
            const indicatorColor =
              color || (item.payload as Record<string, string>)?.fill || item.color;

            return (
              <div
                key={`${item.dataKey}-${index}`}
                className={cn(
                  "[&>svg]:text-muted-foreground flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, payload as unknown[])
                ) : (
                  <>
                    {!hideIndicator && (
                      <div
                        className={cn(
                          "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                          indicator === "dot" && "h-2.5 w-2.5 rounded-full",
                          indicator === "line" && "w-1",
                          indicator === "dashed" &&
                            "w-0 border-[1.5px] border-dashed bg-transparent",
                        )}
                        style={
                          {
                            "--color-bg": indicatorColor,
                            "--color-border": indicatorColor,
                          } as CSSProperties
                        }
                      />
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value !== undefined && (
                        <span className="text-foreground font-mono font-medium tabular-nums">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
ChartTooltipContent.displayName = "ChartTooltipContent";

export const ChartLegend = RechartsPrimitive.Legend;

export interface ChartLegendContentProps extends ComponentProps<"div"> {
  hideIcon?: boolean;
  nameKey?: string;
  payload?: Array<{ value?: string; dataKey?: string; color?: string }>;
  verticalAlign?: "top" | "bottom";
}

export const ChartLegendContent = forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart();
    if (!payload?.length) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className,
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = config[key];
          return (
            <div
              key={item.value}
              className="[&>svg]:text-muted-foreground flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3"
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  },
);
ChartLegendContent.displayName = "ChartLegendContent";
