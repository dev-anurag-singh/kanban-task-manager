import { LogoLarge } from "@/components/Logo";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Page() {
  return (
    <div className="h-full overflow-auto">
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-16 md:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 text-center">
          <LogoLarge />
          <h1 className="text-4xl sm:text-5xl md:text-6xl mt-6 font-bold leading-tight tracking-tight">
            Organize your work with a modern Kanban
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Create boards, manage tasks, and collaborate effortlessly.
            Beautiful, fast, and built for focus.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/signup">Get started for free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/30 px-6 py-16 md:px-10">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Boards & Columns</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Structure projects into boards and customizable columns to match
              your workflow.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tasks & Subtasks</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Break work into manageable pieces, track progress, and stay on top
              of details.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Drag & Drop</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Reorder tasks with intuitive drag-and-drop for a seamless planning
              experience.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Light & Dark</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Comfortable theming with automatic dark mode for late-night focus
              sessions.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Keyboard Friendly</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Navigate quickly and keep momentum with keyboard-first
              interactions.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Secure by Default</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Authentication and data handling designed to keep your work safe
              and private.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-6 pb-24 pt-8 md:px-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 rounded-xl border bg-background px-6 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="sm:text-3xl text-2xl font-semibold">
              Ready to get organized?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Start managing your tasks in minutes with Kanban.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg">
              <Link href="/signup">Create account</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/app">Open app</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
