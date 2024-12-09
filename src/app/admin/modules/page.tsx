"use client";

import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Module, Filiere, Departement } from "@/types";
import { motion } from "framer-motion";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialo";

export default function GestionModules() {
  const [modules, setModules] = useState<Module[]>([
    { id: 1, nom: "Programmation", filiereId: 1 },
    { id: 2, nom: "Analyse", filiereId: 2 },
    { id: 3, nom: "Algèbre", filiereId: 2 },
    { id: 4, nom: "Bases de données", filiereId: 1 },
    { id: 5, nom: "Réseaux", filiereId: 1 },
    { id: 6, nom: "Systèmes d'exploitation", filiereId: 1 },
    { id: 7, nom: "Probabilités", filiereId: 2 },
  ]);
  const [newModule, setNewModule] = useState<Omit<Module, "id">>({
    nom: "",
    filiereId: 0,
  });
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({
    isOpen: false,
    id: null,
  });

  const [filieres, setFilieres] = useState<Filiere[]>([
    { id: 1, nom: "Informatique", departementId: 1 },
    { id: 2, nom: "Mathématiques", departementId: 1 },
    { id: 3, nom: "Physique", departementId: 2 },
    { id: 4, nom: "Chimie", departementId: 2 },
  ]);

  const [departements, setDepartements] = useState<Departement[]>([
    { id: 1, nom: "Sciences et Technologies" },
    { id: 2, nom: "Sciences Fondamentales" },
  ]);

  const [selectedDepartement, setSelectedDepartement] = useState<number | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(modules.length / itemsPerPage);

  const indexOfLastModule = currentPage * itemsPerPage;
  const indexOfFirstModule = indexOfLastModule - itemsPerPage;
  const currentModules = modules.slice(indexOfFirstModule, indexOfLastModule);

  useEffect(() => {
    if (selectedDepartement) {
      setNewModule((prev) => ({ ...prev, filiereId: 0 }));
      setEditingModule(null);
    }
  }, [selectedDepartement]);

  const handleAddModule = () => {
    if (newModule.nom && newModule.filiereId) {
      setModules([...modules, { ...newModule, id: modules.length + 1 }]);
      setNewModule({ nom: "", filiereId: 0 });
    }
  };

  const handleUpdateModule = () => {
    if (editingModule) {
      setModules(
        modules.map((module) =>
          module.id === editingModule.id ? editingModule : module
        )
      );
      setEditingModule(null);
    }
  };

  const handleDeleteModule = (id: number) => {
    setDeleteConfirmation({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.id !== null) {
      setModules(
        modules.filter((module) => module.id !== deleteConfirmation.id)
      );
      setDeleteConfirmation({ isOpen: false, id: null });
    }
  };

  const filteredFilieres = selectedDepartement
    ? filieres.filter((f) => f.departementId === selectedDepartement)
    : filieres;

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-4xl font-bold mb-6 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Gestion des Modules
      </motion.h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {editingModule ? "Modifier le module" : "Ajouter un nouveau module"}
          </CardTitle>
          <CardDescription>
            {editingModule
              ? "Modifiez les détails du module existant"
              : "Entrez les détails du nouveau module"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nom">Nom du module</Label>
              <Input
                id="nom"
                value={editingModule ? editingModule.nom : newModule.nom}
                onChange={(e) =>
                  editingModule
                    ? setEditingModule({
                        ...editingModule,
                        nom: e.target.value,
                      })
                    : setNewModule({ ...newModule, nom: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="departement">Département</Label>
              <Select
                value={selectedDepartement?.toString() || ""}
                onValueChange={(value) =>
                  setSelectedDepartement(parseInt(value))
                }
              >
                <SelectTrigger id="departement">
                  <SelectValue placeholder="Sélectionnez un département" />
                </SelectTrigger>
                <SelectContent>
                  {departements.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id.toString()}>
                      {dept.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="filiere">Filière</Label>
              <Select
                value={(editingModule
                  ? editingModule.filiereId
                  : newModule.filiereId
                ).toString()}
                onValueChange={(value) =>
                  editingModule
                    ? setEditingModule({
                        ...editingModule,
                        filiereId: parseInt(value),
                      })
                    : setNewModule({ ...newModule, filiereId: parseInt(value) })
                }
              >
                <SelectTrigger id="filiere">
                  <SelectValue placeholder="Sélectionnez une filière" />
                </SelectTrigger>
                <SelectContent>
                  {filteredFilieres.map((filiere) => (
                    <SelectItem key={filiere.id} value={filiere.id.toString()}>
                      {filiere.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {editingModule ? (
            <Button onClick={handleUpdateModule} className="btn-primary">
              Mettre à jour le module
            </Button>
          ) : (
            <Button onClick={handleAddModule} className="btn-primary">
              Ajouter le module
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Filière</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentModules.map((module) => {
                const filiere = filieres.find((f) => f.id === module.filiereId);
                const departement = filiere
                  ? departements.find((d) => d.id === filiere.departementId)
                  : null;
                return (
                  <TableRow key={module.id}>
                    <TableCell>{module.nom}</TableCell>
                    <TableCell>{filiere?.nom}</TableCell>
                    <TableCell>{departement?.nom}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="mr-2"
                        onClick={() => setEditingModule(module)}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDeleteModule(module.id)}
                      >
                        Supprimer
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      <DeleteConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        itemName="ce module"
      />
    </div>
  );
}
