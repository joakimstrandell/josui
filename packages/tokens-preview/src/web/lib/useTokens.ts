import { useEffect, useState } from "react";
import { readTokens, type RawToken } from "./readTokens.ts";
import { groupTokens, type Category, type TokenGroup } from "./groupTokens.ts";
import { connectLiveReload } from "./liveReload.ts";

export interface TokensState {
  tokens: RawToken[];
  groups: Map<Category, TokenGroup>;
  version: number;
}

export function useTokens(): TokensState {
  const [version, setVersion] = useState(0);
  const [state, setState] = useState<Pick<TokensState, "tokens" | "groups">>({
    tokens: [],
    groups: new Map(),
  });

  useEffect(() => {
    const refresh = () => {
      const tokens = readTokens();
      setState({ tokens, groups: groupTokens(tokens) });
    };

    const link = document.getElementById("tp-user-tokens") as HTMLLinkElement | null;
    if (link && !link.sheet) {
      link.addEventListener("load", refresh, { once: true });
    } else {
      refresh();
    }

    const disconnect = connectLiveReload(() => {
      // Wait a tick for the stylesheet swap to apply
      setTimeout(() => {
        refresh();
        setVersion((v) => v + 1);
      }, 50);
    });

    return disconnect;
  }, []);

  return { ...state, version };
}
