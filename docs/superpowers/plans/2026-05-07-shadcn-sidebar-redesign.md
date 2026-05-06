# shadcn Sidebar & Header Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate sousChef AI to shadcn/ui, rebuild the sidebar and header with shadcn components, add a mobile Sheet drawer, and remove the direct `@radix-ui/themes` dependency.

**Architecture:** shadcn/ui (New York style) is installed into the existing Tailwind v4 project. Nav content is extracted into a shared `SidebarContent` component used by both the desktop sidebar and the mobile Sheet. The header is split into a desktop `Header` and a `MobileHeader` with a hamburger trigger. All direct `radix-ui` imports are replaced by shadcn-wrapped components.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, react-icons, react-router v7, react-i18next

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `components.json` | Create (auto by shadcn init) | shadcn configuration |
| `src/lib/utils.ts` | Create (auto by shadcn init) | `cn()` utility |
| `src/components/ui/button.tsx` | Create (auto by shadcn add) | shadcn Button |
| `src/components/ui/sheet.tsx` | Create (auto by shadcn add) | shadcn Sheet |
| `src/components/ui/dropdown-menu.tsx` | Create (auto by shadcn add) | shadcn DropdownMenu |
| `src/components/ui/scroll-area.tsx` | Create (auto by shadcn add) | shadcn ScrollArea |
| `src/components/ui/separator.tsx` | Create (auto by shadcn add) | shadcn Separator |
| `src/components/sidebarContent.tsx` | Create | Shared nav + history content |
| `src/components/sidebar.tsx` | Modify | Desktop sidebar wrapper |
| `src/components/header.tsx` | Modify | Desktop `Header` + `MobileHeader` |
| `src/components/mainLayout.tsx` | Modify | Sheet state, layout wiring |
| `src/index.css` | Modify | Add shadcn CSS variables with amber theme |
| `src/App.css` | Modify | Remove old sidebar/menu CSS classes |
| `src/App.tsx` | Modify | Remove `@radix-ui/themes/styles.css` import |

---

### Task 1: Install shadcn/ui

**Files:**
- Create: `components.json`
- Create: `src/lib/utils.ts`
- Modify: `src/index.css` (shadcn appends CSS variables)
- Modify: `vite.config.ts` (shadcn adds `@` alias)
- Modify: `tsconfig.json` / `tsconfig.app.json` (shadcn adds `@` path mapping)

- [ ] **Step 1: Run shadcn init**

```bash
npx shadcn@latest init
```

When prompted:
- Style: **New York**
- Base color: **Neutral**
- CSS variables: **Yes**
- Import alias: **@** (points to `./src`)

Expected: Creates `components.json`, `src/lib/utils.ts`, modifies `src/index.css`, adds `@` alias to Vite and TS config.

- [ ] **Step 2: Verify components.json was created**

```bash
cat components.json
```

Expected to contain `"style": "new-york"` and `"aliases"` with `"@"`.

- [ ] **Step 3: Verify build still passes**

```bash
yarn build
```

Expected: No TypeScript errors, build completes.

- [ ] **Step 4: Commit**

```bash
git add components.json src/lib/utils.ts src/index.css vite.config.ts
git commit -m "chore: initialize shadcn/ui with New York style"
```

---

### Task 2: Install shadcn components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/sheet.tsx`
- Create: `src/components/ui/dropdown-menu.tsx`
- Create: `src/components/ui/scroll-area.tsx`
- Create: `src/components/ui/separator.tsx`

- [ ] **Step 1: Add all required components in one command**

```bash
npx shadcn@latest add button sheet dropdown-menu scroll-area separator
```

Expected: Five new files under `src/components/ui/`.

- [ ] **Step 2: Verify files exist**

```bash
ls src/components/ui/
```

Expected: `button.tsx  dropdown-menu.tsx  scroll-area.tsx  separator.tsx  sheet.tsx`

- [ ] **Step 3: Verify build still passes**

```bash
yarn build
```

Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/
git commit -m "chore: add shadcn button, sheet, dropdown-menu, scroll-area, separator"
```

---

### Task 3: Customize CSS variables for amber/cream theme

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Update three CSS variables in the `:root` block shadcn added to `src/index.css`**

Find the `:root { ... }` block that shadcn appended and change exactly these three values (leave all other shadcn-generated variables untouched):

```css
:root {
  --background: #FFFEF8;
  --accent: #fde6ba;
  --accent-foreground: #2E3440;
  /* ... all other shadcn variables stay as generated ... */
}
```

- [ ] **Step 2: Start dev server and confirm page background is still cream**

```bash
yarn dev
```

Open `http://localhost:5173/souschef` and verify background is warm cream `#FFFEF8`. No visual regressions on existing pages.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: customize shadcn CSS variables for amber/cream theme"
```

---

### Task 4: Create SidebarContent shared component

**Files:**
- Create: `src/components/sidebarContent.tsx`

- [ ] **Step 1: Create the file with the full implementation**

```tsx
// src/components/sidebarContent.tsx
import { HiOutlinePencilSquare } from "react-icons/hi2";
import {
  LuBot,
  LuChefHat,
  LuDices,
  LuEllipsis,
  LuHistory,
  LuHandHeart,
} from "react-icons/lu";
import { Link, useLocation, useParams } from "react-router";
import { useChatHistory } from "./useHistory";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const SidebarContent = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const location = useLocation();
  const { history, clearHistory, removeHistory } = useChatHistory();

  const showHistory = history.slice().reverse();
  const isMoreThanFive = showHistory.length > 5;
  const visibleHistory = isMoreThanFive ? showHistory.slice(0, 5) : showHistory;

  const navItems = [
    { to: "/", icon: <LuBot className="w-5 h-5" />, label: "sousChef" },
    { to: "/random", icon: <LuDices className="w-5 h-5" />, label: t("random") },
    {
      to: "/recommendation",
      icon: <LuChefHat className="w-5 h-5" />,
      label: t("recommendation"),
    },
    {
      to: "/nutrition",
      icon: <LuHandHeart className="w-5 h-5" />,
      label: t("nutrition_daily"),
    },
    {
      to: "/history",
      icon: <LuHistory className="w-5 h-5" />,
      label: t("history"),
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-3 py-4">
        <span className="text-lg font-bold text-[#2E3440]">sousChef AI</span>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <HiOutlinePencilSquare className="w-5 h-5" />
          </Link>
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2">
        <nav className="flex flex-col gap-1 mb-2">
          {navItems.map((item) => (
            <Button
              key={item.to}
              variant="ghost"
              className={`w-full justify-start gap-2 font-bold text-[#2E3440] ${
                location.pathname === item.to
                  ? "bg-amber-200 hover:bg-amber-200"
                  : "hover:bg-amber-100"
              }`}
              asChild
            >
              <Link to={item.to}>
                {item.icon}
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        {history.length > 0 && (
          <>
            <Separator className="my-2" />
            <div className="flex justify-between items-center px-2 mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                History
              </span>
              <button
                onClick={() => clearHistory(id)}
                className="text-xs text-gray-500 hover:underline cursor-pointer"
              >
                Clear
              </button>
            </div>

            {visibleHistory.map((item) => (
              <div
                key={item.id}
                className="flex items-center group rounded-md hover:bg-amber-100"
              >
                <Link
                  to={`/detail/${item.id}`}
                  className="text-sm px-2 py-1.5 w-full truncate text-[#444]"
                >
                  {item.display}
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeHistory(item.id, id)}
                  className="opacity-0 group-hover:opacity-100 text-rose-500 hover:text-rose-500 hover:bg-transparent shrink-0 text-xs px-2"
                >
                  {t("delete")}
                </Button>
              </div>
            ))}

            {isMoreThanFive && (
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 hover:bg-amber-100 text-gray-600"
                asChild
              >
                <Link to="/history">
                  <LuEllipsis className="w-4 h-4 text-gray-500" />
                  {t("seeAll")}
                </Link>
              </Button>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
yarn build
```

Expected: No errors. (`SidebarContent` is not yet imported anywhere but should compile cleanly.)

- [ ] **Step 3: Commit**

```bash
git add src/components/sidebarContent.tsx
git commit -m "feat: add SidebarContent shared component with shadcn nav"
```

---

### Task 5: Rebuild Sidebar (desktop wrapper)

**Files:**
- Modify: `src/components/sidebar.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/sidebar.tsx`**

```tsx
// src/components/sidebar.tsx
import { SidebarContent } from "./sidebarContent";

export const Sidebar = () => {
  return (
    <aside
      className="w-[250px] h-screen shadow-[2px_0_8px_rgba(0,0,0,0.1)]"
      style={{ background: "linear-gradient(to bottom, #FFF6D1, #FFE4B5)" }}
    >
      <SidebarContent />
    </aside>
  );
};
```

- [ ] **Step 2: Verify build passes**

```bash
yarn build
```

Expected: No errors.

- [ ] **Step 3: Open dev server and verify desktop sidebar**

```bash
yarn dev
```

Open `http://localhost:5173/souschef` at ≥768px width. Confirm:
- Warm gradient sidebar visible on the left
- Nav links render with icons and bold text
- Active route (e.g. `/`) has `bg-amber-200` highlight
- Pencil icon navigates to `/`
- Chat history section appears if any history exists

- [ ] **Step 4: Commit**

```bash
git add src/components/sidebar.tsx
git commit -m "feat: rebuild desktop sidebar using SidebarContent and shadcn"
```

---

### Task 6: Rebuild Header and add MobileHeader

**Files:**
- Modify: `src/components/header.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/header.tsx`**

```tsx
// src/components/header.tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LuChevronDown, LuMenu, LuChefHat } from "react-icons/lu";
import { MdLanguage } from "react-icons/md";
import { usePersonality } from "../contexts/usePersonality";
import type { Personalitys } from "../contexts/personalityContext";
import { useTranslation } from "react-i18next";

const Personality = ({ compact = false }: { compact?: boolean }) => {
  const { t } = useTranslation();
  const { personality, setPersonality } = usePersonality();
  const personalities: {
    label: string;
    value: Personalitys;
    description: string;
  }[] = [
    {
      value: "souschef",
      label: t("mode.souschef.label"),
      description: t("mode.souschef.description"),
    },
    {
      value: "buddy",
      label: t("mode.buddy.label"),
      description: t("mode.buddy.description"),
    },
    {
      value: "chef-ian",
      label: t("mode.chef.label"),
      description: t("mode.chef.description"),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {compact ? (
          <Button variant="ghost" size="icon">
            <LuChefHat className="w-5 h-5" />
          </Button>
        ) : (
          <Button variant="outline" className="min-w-48 gap-1">
            {personalities.find((p) => p.value === personality)?.label ??
              "Select Personality"}
            <LuChevronDown className="w-4 h-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {personalities.map((mode) => (
          <DropdownMenuItem
            key={mode.value}
            onSelect={() => setPersonality(mode.value)}
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{mode.label}</span>
              <span className="text-xs text-gray-500 whitespace-pre-line">
                {mode.description}
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Language = ({ compact = false }: { compact?: boolean }) => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const normalizedLanguage = language.split("-")[0] as "th" | "en" | "cn";
  const languageLabelMap = {
    th: "ภาษาไทย",
    en: "English",
    cn: "中文",
  } as const;
  const languageLabel =
    languageLabelMap[normalizedLanguage] ?? languageLabelMap.en;

  const changeLanguage = (lng: "th" | "en" | "cn") => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {compact ? (
          <Button variant="ghost" size="icon">
            <MdLanguage className="w-5 h-5" />
          </Button>
        ) : (
          <Button variant="outline" className="gap-1">
            <MdLanguage className="w-5 h-5" />
            {languageLabel}
            <LuChevronDown className="w-4 h-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => changeLanguage("th")}>
          ภาษาไทย
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLanguage("en")}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => changeLanguage("cn")}>
          中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Header = () => {
  return (
    <div className="hidden md:flex justify-between mt-4">
      <div className="pl-6">
        <Personality />
      </div>
      <div className="pr-6">
        <Language />
      </div>
    </div>
  );
};

export const MobileHeader = ({
  onOpenSidebar,
}: {
  onOpenSidebar: () => void;
}) => {
  return (
    <div className="flex md:hidden items-center justify-between h-14 px-3 bg-[#FFFEF8] border-b border-amber-200 sticky top-0 z-50">
      <Button variant="ghost" size="icon" onClick={onOpenSidebar}>
        <LuMenu className="w-5 h-5" />
      </Button>
      <span className="font-bold text-[#2E3440]">sousChef AI</span>
      <div className="flex items-center gap-1">
        <Personality compact />
        <Language compact />
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Verify build passes**

```bash
yarn build
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/header.tsx
git commit -m "feat: rebuild header with shadcn DropdownMenu, add MobileHeader"
```

---

### Task 7: Update MainLayout to wire Sheet state

**Files:**
- Modify: `src/components/mainLayout.tsx`

- [ ] **Step 1: Replace the entire contents of `src/components/mainLayout.tsx`**

```tsx
// src/components/mainLayout.tsx
import { useState } from "react";
import { Header, MobileHeader } from "./header";
import { Sidebar } from "./sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarContent } from "./sidebarContent";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile top bar — visible only below md breakpoint */}
      <MobileHeader onOpenSidebar={() => setSidebarOpen(true)} />

      {/* Mobile sidebar Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className="w-[250px] p-0 border-r border-amber-200"
          style={{ background: "linear-gradient(to bottom, #FFF6D1, #FFE4B5)" }}
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar — fixed, hidden below md */}
      <div className="hidden md:block fixed top-0 left-0 h-full z-40">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 md:ml-[250px]">
        <div className="w-full z-50 md:fixed md:top-0 md:left-[250px] md:w-[calc(100%-250px)]">
          <Header />
        </div>
        <div className="lg:mt-[3rem] md:pl-[1.5rem] md:pt-[1rem] pt-[1rem] px-2">
          {children}
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Verify build passes**

```bash
yarn build
```

Expected: No errors.

- [ ] **Step 3: Test desktop layout**

```bash
yarn dev
```

At ≥768px width, verify:
- Warm gradient sidebar on left
- Personality and Language dropdown buttons in header (outline variant, bordered)
- Dropdowns open with amber hover on items
- Navigation between routes works

- [ ] **Step 4: Test mobile layout**

Resize to <768px (or use browser DevTools device simulation):
- Sticky top bar appears: hamburger icon left, "sousChef AI" center, chef-hat + globe icons right
- Tapping hamburger opens Sheet drawer from left with warm gradient and full nav
- Tapping a nav link closes the drawer and navigates correctly
- Personality and language icon buttons open their dropdowns

- [ ] **Step 5: Commit**

```bash
git add src/components/mainLayout.tsx
git commit -m "feat: wire Sheet drawer in MainLayout for mobile sidebar"
```

---

### Task 8: Remove @radix-ui/themes and clean up old CSS

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.css`

- [ ] **Step 1: Remove the `@radix-ui/themes/styles.css` import from `src/App.tsx`**

The file should become:

```tsx
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/home";
import "./App.css";
import { Detail } from "./pages/detail";
import { Recommendation } from "./pages/recommend";
import { RandomMenu } from "./pages/random";
import { History } from "./pages/history";
import { Nutrition } from "./pages/nutrition";
import { ChatHistoryProvider } from "./components/useHistory";

function App() {
  const url = import.meta.env.VITE_API_URL;
  return (
    <BrowserRouter basename="/souschef">
      <ChatHistoryProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail url={url} />} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/random" element={<RandomMenu url={url} />} />
          <Route path="/history" element={<History />} />
          <Route path="/nutrition" element={<Nutrition />} />
        </Routes>
      </ChatHistoryProvider>
    </BrowserRouter>
  );
}

export default App;
```

- [ ] **Step 2: Reduce `src/App.css` to only the lines still needed**

Replace the entire contents of `src/App.css` with:

```css
:root {
  --color-text: #2E3440;
}

body {
  background-color: #FFFEF8 !important;
}

.text-primary {
  color: var(--color-text);
}
```

(All `.sidebar`, `.sidebar-header`, `.sidebar-title`, `.sidebar-menu`, `.menu-item`, `.menu-group`, `.menu-history`, `.icon`, `.bold` classes are deleted — they are replaced by Tailwind utilities in the new components.)

- [ ] **Step 3: Verify clean build**

```bash
yarn build
```

Expected: No TypeScript errors, no missing style references, build output produced in `dist/`.

- [ ] **Step 4: Final smoke test in dev server**

```bash
yarn dev
```

Spot-check across all routes (`/`, `/random`, `/recommendation`, `/nutrition`, `/history`):
- Egg background animation still plays on pages that use it
- No console errors
- No visual regressions on page content (cards, inputs, chat)
- Sidebar and header render correctly on both desktop and mobile

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/App.css
git commit -m "chore: remove @radix-ui/themes and old sidebar CSS classes"
```
