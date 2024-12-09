"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ElementModule, Module } from "@/types";

export default function GestionElementsModule() {
  const [elementsModule, setElementsModule] = useState<ElementModule[]>([
    { id: 1, nom: "Cours Magistral", moduleId: 1 },
    { id: 2, nom: "Travaux Pratiques", moduleId: 1 },
  ]);
  const [newElementModule, setNewElementModule] = useState<
    Omit<ElementModule, "id">
  >({ nom: "", moduleId: 0 });
  const [editingElementModule, setEditingElementModule] =
    useState<ElementModule | null>(null);

  // Mock data for modules
  const modules: Module[] = [
    { id: 1, nom: "Programmation", filiereId: 1 },
    { id: 2, nom: "Analyse", filiereId: 2 },
  ];

  const handleAddElementModule = () => {
    if (newElementModule.nom && newElementModule.moduleId) {
      setElementsModule([
        ...elementsModule,
        { ...newElementModule, id: elementsModule.length + 1 },
      ]);
      setNewElementModule({ nom: "", moduleId: 0 });
    }
  };

  const handleUpdateElementModule = () => {
    if (editingElementModule) {
      setElementsModule(
        elementsModule.map((element) =>
          element.id === editingElementModule.id
            ? editingElementModule
            : element
        )
      );
      setEditingElementModule(null);
    }
  };

  const handleDeleteElementModule = (id: number) => {
    setElementsModule(elementsModule.filter((element) => element.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        Gestion des Éléments de Module
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {editingElementModule
              ? "Modifier l'élément de module"
              : "Ajouter un nouvel élément de module"}
          </CardTitle>
          <CardDescription>
            {editingElementModule
              ? "Modifiez les détails de l'élément de module existant"
              : "Entrez les détails du nouvel élément de module"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nom">Nom de l&apos;élément de module</Label>
              <Input
                id="nom"
                value={
                  editingElementModule
                    ? editingElementModule.nom
                    : newElementModule.nom
                }
                onChange={(e) =>
                  editingElementModule
                    ? setEditingElementModule({
                        ...editingElementModule,
                        nom: e.target.value,
                      })
                    : setNewElementModule({
                        ...newElementModule,
                        nom: e.target.value,
                      })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="module">Module</Label>
              <Select
                value={(editingElementModule
                  ? editingElementModule.moduleId
                  : newElementModule.moduleId
                ).toString()}
                onValueChange={(value) =>
                  editingElementModule
                    ? setEditingElementModule({
                        ...editingElementModule,
                        moduleId: parseInt(value),
                      })
                    : setNewElementModule({
                        ...newElementModule,
                        moduleId: parseInt(value),
                      })
                }
              >
                <SelectTrigger id="module">
                  <SelectValue placeholder="Sélectionnez un module" />
                </SelectTrigger>
                <SelectContent>
                  {modules.map((module) => (
                    <SelectItem key={module.id} value={module.id.toString()}>
                      {module.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {editingElementModule ? (
            <Button onClick={handleUpdateElementModule}>
              Mettre à jour l&apos;élément de module
            </Button>
          ) : (
            <Button onClick={handleAddElementModule}>
              Ajouter l&apos;élément de module
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Éléments de Module</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {elementsModule.map((element) => (
                <TableRow key={element.id}>
                  <TableCell>{element.nom}</TableCell>
                  <TableCell>
                    {modules.find((m) => m.id === element.moduleId)?.nom}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => setEditingElementModule(element)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteElementModule(element.id)}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
