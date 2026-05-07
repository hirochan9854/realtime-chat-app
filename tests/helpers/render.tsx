import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";

// プロバイダーを追加する場合はここでラップ
function AllProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export { customRender as render };
export { screen, waitFor, within } from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
