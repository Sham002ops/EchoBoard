// import { Button } from "@repo/ui/button";
import Button from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Pencil, Share2, Users2, Sparkles, Github, Download } from "lucide-react";
import Link from "next/link";

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div>
      <header className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
              Collaborative Whiteboarding
              <span className="text-primary block">Made Simple</span>
            </h1>
            <div className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Create, collaborate, and share beautiful diagrams and sketches with our intuitive drawing tool. 
              No sign-up required.
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href={"/signin"}>
              <Button variant="primary" text="Sign in" size="lg" transition="3"/>
                 
                  {/* <Pencil className="ml-2 h-4 w-4" /> */}
               
              </Link>
              <Link href="/signup">
              <Button variant="primary" text="Sign up" size="lg" transition="3"/>
                  
                
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6 border-2 hover:border-primary transition-colors" title="Real-time Collaboration" >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
              </div>
              <div className="mt-4 text-muted-foreground">
                Work together with your team in real-time. Share your drawings instantly with a simple link.
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-primary transition-colors" title="Multiplayer Editing" >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Users2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Multiplayer Editing</h3>
              </div>
              <div className="mt-4 text-muted-foreground">
                Multiple users can edit the same canvas simultaneously. See whos drawing what in real-time.
              </div>
            </Card>

            <Card className="p-6 border-2 hover:border-primary transition-colors" title="Smart Drawing" >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Smart Drawing</h3>
              </div>
              <div className="mt-4 text-muted-foreground">
                Intelligent shape recognition and drawing assistance helps you create perfect diagrams.
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-8 sm:p-16">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                Ready to start creating?
              </h2>
              <div className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/80">
                Join thousands of users who are already creating amazing diagrams and sketches.
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button variant="primary" text="Open Canvas" size="lg" transition="3"/>
                  <Pencil className="ml-2 h-4 w-4" />
               
                <Button variant="secondary" text="View Gallery" size="lg" transition="3" />
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-sm text-muted-foreground">
              © 2024 Excalidraw Clone. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Download className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
}

export default App;