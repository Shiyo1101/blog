import { Moon, Sun } from "pixelarticons/react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "theme-light" | "dark" | "system";

const DARK_CLASS_NAME = "dark";

const getInitialTheme = (): Theme =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains(DARK_CLASS_NAME)
    ? "dark"
    : "theme-light";

export function ModeToggle() {
  const [theme, setTheme] = React.useState<Theme>(getInitialTheme);

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        globalThis.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle(DARK_CLASS_NAME, isDark);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="secondary" size="icon" />}>
        <Sun className="size-6 dark:hidden" />
        <Moon className="hidden size-6 dark:block" />
        <span className="sr-only">テーマを切り替える</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("theme-light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
