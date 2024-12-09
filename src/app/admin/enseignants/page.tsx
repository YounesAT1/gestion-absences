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
import { Enseignant, Departement } from "@/types";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialo";

export default function GestionEnseignants() {
  const [enseignants, setEnseignants] = useState<Enseignant[]>([
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@example.com",
      departementId: 1,
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Marie",
      email: "marie.martin@example.com",
      departementId: 2,
    },
  ]);
  const [newEnseignant, setNewEnseignant] = useState<Omit<Enseignant, "id">>({
    nom: "",
    prenom: "",
    email: "",
    departementId: 0,
  });
  const [editingEnseignant, setEditingEnseignant] = useState<Enseignant | null>(
    null
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({
    isOpen: false,
    id: null,
  });

  const departements: Departement[] = [
    { id: 1, nom: "Sciences et Technologies" },
    { id: 2, nom: "Lettres et Sciences Humaines" },
  ];

  const handleAddEnseignant = () => {
    if (
      newEnseignant.nom &&
      newEnseignant.prenom &&
      newEnseignant.email &&
      newEnseignant.departementId
    ) {
      setEnseignants([
        ...enseignants,
        { ...newEnseignant, id: enseignants.length + 1 },
      ]);
      setNewEnseignant({ nom: "", prenom: "", email: "", departementId: 0 });
    }
  };

  const handleUpdateEnseignant = () => {
    if (editingEnseignant) {
      setEnseignants(
        enseignants.map((enseignant) =>
          enseignant.id === editingEnseignant.id
            ? editingEnseignant
            : enseignant
        )
      );
      setEditingEnseignant(null);
    }
  };

  const handleDeleteEnseignant = (id: number) => {
    setDeleteConfirmation({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.id !== null) {
      setEnseignants(
        enseignants.filter(
          (enseignant) => enseignant.id !== deleteConfirmation.id
        )
      );
      setDeleteConfirmation({ isOpen: false, id: null });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestion des Enseignants</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {editingEnseignant
              ? "Modifier l'enseignant"
              : "Ajouter un nouvel enseignant"}
          </CardTitle>
          <CardDescription>
            {editingEnseignant
              ? "Modifiez les détails de l'enseignant existant"
              : "Entrez les détails du nouvel enseignant"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="nom">Nom</Label>
              <Input
                id="nom"
                value={
                  editingEnseignant ? editingEnseignant.nom : newEnseignant.nom
                }
                onChange={(e) =>
                  editingEnseignant
                    ? setEditingEnseignant({
                        ...editingEnseignant,
                        nom: e.target.value,
                      })
                    : setNewEnseignant({
                        ...newEnseignant,
                        nom: e.target.value,
                      })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="prenom">Prénom</Label>
              <Input
                id="prenom"
                value={
                  editingEnseignant
                    ? editingEnseignant.prenom
                    : newEnseignant.prenom
                }
                onChange={(e) =>
                  editingEnseignant
                    ? setEditingEnseignant({
                        ...editingEnseignant,
                        prenom: e.target.value,
                      })
                    : setNewEnseignant({
                        ...newEnseignant,
                        prenom: e.target.value,
                      })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={
                  editingEnseignant
                    ? editingEnseignant.email
                    : newEnseignant.email
                }
                onChange={(e) =>
                  editingEnseignant
                    ? setEditingEnseignant({
                        ...editingEnseignant,
                        email: e.target.value,
                      })
                    : setNewEnseignant({
                        ...newEnseignant,
                        email: e.target.value,
                      })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="departement">Département</Label>
              <Select
                value={(editingEnseignant
                  ? editingEnseignant.departementId
                  : newEnseignant.departementId
                ).toString()}
                onValueChange={(value) =>
                  editingEnseignant
                    ? setEditingEnseignant({
                        ...editingEnseignant,
                        departementId: parseInt(value),
                      })
                    : setNewEnseignant({
                        ...newEnseignant,
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
          {editingEnseignant ? (
            <Button onClick={handleUpdateEnseignant}>
              Mettre à jour l&apos;enseignant
            </Button>
          ) : (
            <Button onClick={handleAddEnseignant}>
              Ajouter l&apos;enseignant
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Enseignants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enseignants.map((enseignant) => (
                <TableRow key={enseignant.id}>
                  <TableCell>{enseignant.nom}</TableCell>
                  <TableCell>{enseignant.prenom}</TableCell>
                  <TableCell>{enseignant.email}</TableCell>
                  <TableCell>
                    {
                      departements.find(
                        (d) => d.id === enseignant.departementId
                      )?.nom
                    }
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => setEditingEnseignant(enseignant)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteEnseignant(enseignant.id)}
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
        itemName="cet enseignant"
      />
    </div>
  );
}
