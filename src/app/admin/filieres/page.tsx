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
import { Filiere, Departement, Module } from "@/types";
import { motion } from "framer-motion";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialo";

export default function GestionFilieres() {
  const [filieres, setFilieres] = useState<Filiere[]>([
    { id: 1, nom: "Informatique", departementId: 1 },
    { id: 2, nom: "Mathématiques", departementId: 1 },
    { id: 3, nom: "Physique", departementId: 2 },
    { id: 4, nom: "Chimie", departementId: 2 },
  ]);
  const [newFiliere, setNewFiliere] = useState<Omit<Filiere, "id">>({
    nom: "",
    departementId: 0,
  });
  const [editingFiliere, setEditingFiliere] = useState<Filiere | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({
    isOpen: false,
    id: null,
  });

  const departements: Departement[] = [
    { id: 1, nom: "Sciences et Technologies" },
    { id: 2, nom: "Sciences Fondamentales" },
  ];

  const modules: Module[] = [
    { id: 1, nom: "Programmation", filiereId: 1 },
    { id: 2, nom: "Analyse", filiereId: 2 },
    { id: 3, nom: "Algèbre", filiereId: 2 },
    { id: 4, nom: "Bases de données", filiereId: 1 },
    { id: 5, nom: "Mécanique quantique", filiereId: 3 },
    { id: 6, nom: "Chimie organique", filiereId: 4 },
  ];

  const handleAddFiliere = () => {
    if (newFiliere.nom && newFiliere.departementId) {
      setFilieres([...filieres, { ...newFiliere, id: filieres.length + 1 }]);
      setNewFiliere({ nom: "", departementId: 0 });
    }
  };

  const handleUpdateFiliere = () => {
    if (editingFiliere) {
      setFilieres(
        filieres.map((filiere) =>
          filiere.id === editingFiliere.id ? editingFiliere : filiere
        )
      );
      setEditingFiliere(null);
    }
  };

  const handleDeleteFiliere = (id: number) => {
    setDeleteConfirmation({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.id !== null) {
      setFilieres(
        filieres.filter((filiere) => filiere.id !== deleteConfirmation.id)
      );
      setDeleteConfirmation({ isOpen: false, id: null });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <motion.h1
        className="text-4xl font-bold mb-6 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Gestion des Filières
      </motion.h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {editingFiliere
              ? "Modifier la filière"
              : "Ajouter une nouvelle filière"}
          </CardTitle>
          <CardDescription>
            {editingFiliere
              ? "Modifiez les détails de la filière existante"
              : "Entrez les détails de la nouvelle filière"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nom">Nom de la filière</Label>
              <Input
                id="nom"
                value={editingFiliere ? editingFiliere.nom : newFiliere.nom}
                onChange={(e) =>
                  editingFiliere
                    ? setEditingFiliere({
                        ...editingFiliere,
                        nom: e.target.value,
                      })
                    : setNewFiliere({ ...newFiliere, nom: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="departement">Département</Label>
              <Select
                value={(editingFiliere
                  ? editingFiliere.departementId
                  : newFiliere.departementId
                ).toString()}
                onValueChange={(value) =>
                  editingFiliere
                    ? setEditingFiliere({
                        ...editingFiliere,
                        departementId: parseInt(value),
                      })
                    : setNewFiliere({
                        ...newFiliere,
                        departementId: parseInt(value),
                      })
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
          </div>
        </CardContent>
        <CardFooter>
          {editingFiliere ? (
            <Button onClick={handleUpdateFiliere} className="btn-primary">
              Mettre à jour la filière
            </Button>
          ) : (
            <Button onClick={handleAddFiliere} className="btn-primary">
              Ajouter la filière
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Filières</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Modules associés</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filieres.map((filiere) => (
                <TableRow key={filiere.id}>
                  <TableCell>{filiere.nom}</TableCell>
                  <TableCell>
                    {
                      departements.find((d) => d.id === filiere.departementId)
                        ?.nom
                    }
                  </TableCell>
                  <TableCell>
                    {modules
                      .filter((m) => m.filiereId === filiere.id)
                      .map((m) => m.nom)
                      .join(", ")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => setEditingFiliere(filiere)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteFiliere(filiere.id)}
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

      <DeleteConfirmationDialog
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        itemName="cette filière"
      />
    </div>
  );
}
