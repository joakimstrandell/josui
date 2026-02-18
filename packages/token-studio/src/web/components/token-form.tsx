import * as React from 'react';
import type { SupportedTokenType, TokenItem } from '../../shared/types';
import {
  buildLiteralValue,
  buildModeValue,
  initialTokenFormState,
  type TokenFormState,
} from '../lib/value-editor';

interface TokenFormProps {
  rootName: string;
  onSubmit: (payload: {
    path: string;
    type: SupportedTokenType;
    description?: string;
    value: unknown;
    mode?: {
      light?: unknown;
      dark?: unknown;
    };
  }) => void;
  onCancel: () => void;
  editing?: TokenItem | null;
}

function toInitialState(rootName: string, editing?: TokenItem | null): TokenFormState {
  if (!editing) {
    return {
      ...initialTokenFormState,
      path: `${rootName}.`,
      type: 'string',
    };
  }

  const base: TokenFormState = {
    ...initialTokenFormState,
    path: editing.path,
    type: editing.type,
    description: editing.description ?? '',
    hasMode: editing.hasMode,
    modeLight: editing.mode?.light !== undefined ? JSON.stringify(editing.mode.light) : '',
    modeDark: editing.mode?.dark !== undefined ? JSON.stringify(editing.mode.dark) : '',
  };

  if (typeof editing.value === 'string' && /^\{.*\}$/.test(editing.value)) {
    return {
      ...base,
      valueMode: 'reference',
      reference: editing.value,
    };
  }

  if (editing.type === 'color' && typeof editing.value === 'object' && editing.value !== null) {
    const color = editing.value as { colorSpace?: 'oklch' | 'rgb' | 'hsl'; components?: number[] };
    return {
      ...base,
      colorSpace: color.colorSpace ?? 'oklch',
      colorComponents: Array.isArray(color.components)
        ? color.components.join(', ')
        : base.colorComponents,
    };
  }

  if (editing.type === 'dimension' && typeof editing.value === 'object' && editing.value !== null) {
    const dimension = editing.value as { value?: number; unit?: string };
    return {
      ...base,
      dimensionValue:
        typeof dimension.value === 'number' ? String(dimension.value) : base.dimensionValue,
      dimensionUnit: dimension.unit ?? base.dimensionUnit,
    };
  }

  if (editing.type === 'duration' && typeof editing.value === 'object' && editing.value !== null) {
    const duration = editing.value as { value?: number; unit?: string };
    return {
      ...base,
      durationValue:
        typeof duration.value === 'number' ? String(duration.value) : base.durationValue,
      durationUnit: duration.unit ?? base.durationUnit,
    };
  }

  if (editing.type === 'cubicBezier' && Array.isArray(editing.value)) {
    return {
      ...base,
      cubicBezier: editing.value.join(', '),
    };
  }

  if (editing.type === 'fontFamily') {
    return {
      ...base,
      fontFamily: Array.isArray(editing.value)
        ? editing.value.join(', ')
        : String(editing.value ?? ''),
    };
  }

  if (editing.type === 'number') {
    return {
      ...base,
      numberValue: String(editing.value ?? ''),
    };
  }

  if (editing.type === 'string') {
    return {
      ...base,
      stringValue: String(editing.value ?? ''),
    };
  }

  return {
    ...base,
  };
}

export function TokenForm({ rootName, onSubmit, onCancel, editing }: TokenFormProps) {
  const [form, setForm] = React.useState<TokenFormState>(() => toInitialState(rootName, editing));

  React.useEffect(() => {
    setForm(toInitialState(rootName, editing));
  }, [editing, rootName]);

  const update = <Key extends keyof TokenFormState>(key: Key, value: TokenFormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <form
      className="space-y-3 rounded-xl border border-[var(--line)] bg-white p-3"
      onSubmit={(event) => {
        event.preventDefault();

        onSubmit({
          path: form.path,
          type: form.type,
          description: form.description || undefined,
          value: buildLiteralValue(form),
          mode: buildModeValue(form),
        });
      }}
    >
      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Path
          <input
            className="rounded border border-[var(--line)] p-2"
            value={form.path}
            onChange={(event) => update('path', event.target.value)}
            placeholder={`${rootName}.group.token`}
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Type
          <select
            className="rounded border border-[var(--line)] p-2"
            value={form.type}
            onChange={(event) => update('type', event.target.value as SupportedTokenType)}
          >
            <option value="color">color</option>
            <option value="dimension">dimension</option>
            <option value="duration">duration</option>
            <option value="cubicBezier">cubicBezier</option>
            <option value="fontFamily">fontFamily</option>
            <option value="number">number</option>
            <option value="string">string</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        Description
        <input
          className="rounded border border-[var(--line)] p-2"
          value={form.description}
          onChange={(event) => update('description', event.target.value)}
        />
      </label>

      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Value mode
          <select
            className="rounded border border-[var(--line)] p-2"
            value={form.valueMode}
            onChange={(event) => update('valueMode', event.target.value as 'literal' | 'reference')}
          >
            <option value="literal">literal</option>
            <option value="reference">reference</option>
          </select>
        </label>

        {form.valueMode === 'reference' ? (
          <label className="flex flex-col gap-1 text-sm">
            Reference
            <input
              className="rounded border border-[var(--line)] p-2"
              value={form.reference}
              onChange={(event) => update('reference', event.target.value)}
              placeholder="{color.primary.500}"
            />
          </label>
        ) : null}
      </div>

      {form.valueMode === 'literal' ? (
        <div className="grid gap-3 md:grid-cols-2">
          {form.type === 'color' ? (
            <>
              <label className="flex flex-col gap-1 text-sm">
                colorSpace
                <select
                  className="rounded border border-[var(--line)] p-2"
                  value={form.colorSpace}
                  onChange={(event) =>
                    update('colorSpace', event.target.value as 'oklch' | 'rgb' | 'hsl')
                  }
                >
                  <option value="oklch">oklch</option>
                  <option value="rgb">rgb</option>
                  <option value="hsl">hsl</option>
                </select>
              </label>
              <label className="flex flex-col gap-1 text-sm">
                components
                <input
                  className="rounded border border-[var(--line)] p-2"
                  value={form.colorComponents}
                  onChange={(event) => update('colorComponents', event.target.value)}
                  placeholder="0.85, 0.17, 72"
                />
              </label>
            </>
          ) : null}

          {form.type === 'dimension' ? (
            <>
              <label className="flex flex-col gap-1 text-sm">
                value
                <input
                  className="rounded border border-[var(--line)] p-2"
                  value={form.dimensionValue}
                  onChange={(event) => update('dimensionValue', event.target.value)}
                  type="number"
                  step="any"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                unit
                <select
                  className="rounded border border-[var(--line)] p-2"
                  value={form.dimensionUnit}
                  onChange={(event) => update('dimensionUnit', event.target.value)}
                >
                  <option value="px">px</option>
                  <option value="rem">rem</option>
                  <option value="em">em</option>
                  <option value="%">%</option>
                </select>
              </label>
            </>
          ) : null}

          {form.type === 'duration' ? (
            <>
              <label className="flex flex-col gap-1 text-sm">
                value
                <input
                  className="rounded border border-[var(--line)] p-2"
                  value={form.durationValue}
                  onChange={(event) => update('durationValue', event.target.value)}
                  type="number"
                  step="any"
                />
              </label>
              <label className="flex flex-col gap-1 text-sm">
                unit
                <select
                  className="rounded border border-[var(--line)] p-2"
                  value={form.durationUnit}
                  onChange={(event) => update('durationUnit', event.target.value)}
                >
                  <option value="ms">ms</option>
                  <option value="s">s</option>
                </select>
              </label>
            </>
          ) : null}

          {form.type === 'cubicBezier' ? (
            <label className="flex flex-col gap-1 text-sm md:col-span-2">
              bezier points
              <input
                className="rounded border border-[var(--line)] p-2"
                value={form.cubicBezier}
                onChange={(event) => update('cubicBezier', event.target.value)}
                placeholder="0.25, 0.1, 0.25, 1"
              />
            </label>
          ) : null}

          {form.type === 'fontFamily' ? (
            <label className="flex flex-col gap-1 text-sm md:col-span-2">
              font family
              <input
                className="rounded border border-[var(--line)] p-2"
                value={form.fontFamily}
                onChange={(event) => update('fontFamily', event.target.value)}
                placeholder="Inter, system-ui, sans-serif"
              />
            </label>
          ) : null}

          {form.type === 'number' ? (
            <label className="flex flex-col gap-1 text-sm md:col-span-2">
              number
              <input
                className="rounded border border-[var(--line)] p-2"
                value={form.numberValue}
                onChange={(event) => update('numberValue', event.target.value)}
                type="number"
                step="any"
              />
            </label>
          ) : null}

          {form.type === 'string' ? (
            <label className="flex flex-col gap-1 text-sm md:col-span-2">
              string
              <input
                className="rounded border border-[var(--line)] p-2"
                value={form.stringValue}
                onChange={(event) => update('stringValue', event.target.value)}
              />
            </label>
          ) : null}
        </div>
      ) : null}

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.hasMode}
          onChange={(event) => update('hasMode', event.target.checked)}
        />
        Add light/dark mode values
      </label>

      {form.hasMode ? (
        <div className="grid gap-3 md:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            Light mode value (JSON or reference)
            <textarea
              className="h-24 rounded border border-[var(--line)] p-2"
              value={form.modeLight}
              onChange={(event) => update('modeLight', event.target.value)}
              placeholder="{color.gray.50}"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            Dark mode value (JSON or reference)
            <textarea
              className="h-24 rounded border border-[var(--line)] p-2"
              value={form.modeDark}
              onChange={(event) => update('modeDark', event.target.value)}
              placeholder="{color.gray.950}"
            />
          </label>
        </div>
      ) : null}

      <div className="flex gap-2">
        <button className="rounded bg-[var(--accent)] px-3 py-2 text-white" type="submit">
          {editing ? 'Update token' : 'Add token'}
        </button>
        <button
          className="rounded border border-[var(--line)] px-3 py-2"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
