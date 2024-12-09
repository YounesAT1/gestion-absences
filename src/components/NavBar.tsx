"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LogIn, UserPlus } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Départements",
    href: "/admin/departements",
    description: "Gérez les départements de l'établissement.",
  },
  {
    title: "Filières",
    href: "/admin/filieres",
    description: "Administrez les filières d'études disponibles.",
  },
  {
    title: "Modules",
    href: "/admin/modules",
    description: "Gérez les modules d'enseignement.",
  },
  {
    title: "Étudiants",
    href: "/admin/etudiants",
    description: "Gérez les informations des étudiants.",
  },
  {
    title: "Enseignants",
    href: "/admin/enseignants",
    description: "Gérez les informations des enseignants.",
  },
  {
    title: "Absences",
    href: "/admin/absences",
    description: "Suivez et gérez les absences des étudiants.",
  },
];

export function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            PrésenceProf
          </span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Administration</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Accueil
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex items-center space-x-4">
          <Link href="/login" passHref>
            <Button
              variant="ghost"
              className="text-gray-700 hover:text-purple-600"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Connexion
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button
              variant="default"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Inscription
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
