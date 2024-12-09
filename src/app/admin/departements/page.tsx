"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Departement, Filiere } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteConfirmationDialog } from "@/components/DeleteConfirmationDialo";

export default function GestionDepartements() {
  const [departements, setDepartements] = useState<Departement[]>([
    { id: 1, nom: "Sciences et Technologies", filieres: [1, 2] },
    { id: 2, nom: "Lettres et Sciences Humaines", filieres: [3] },
    { id: 3, nom: "Droit et Sciences Politiques", filieres: [4] },
    { id: 4, nom: "Sciences Économiques et Gestion", filieres: [2] },
  ]);
  const [filieres, setFilieres] = useState<Filiere[]>([
    { id: 1, nom: "Informatique", departementId: 1 },
    { id: 2, nom: "Mathématiques", departementId: 1 },
    { id: 3, nom: "Littérature Française", departementId: 2 },
    { id: 4, nom: "Droit", departementId: 3 },
  ]);
  const [newDepartement, setNewDepartement] = useState<string>("");
  const [editingDepartement, setEditingDepartement] =
    useState<Departement | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    id: number | null;
  }>({
    isOpen: false,
    id: null,
  });

  const handleAddDepartement = () => {
    if (newDepartement) {
      setDepartements([
        ...departements,
        { id: departements.length + 1, nom: newDepartement, filieres: [] },
      ]);
      setNewDepartement("");
    }
  };

  const handleUpdateDepartement = () => {
    if (editingDepartement) {
      setDepartements(
        departements.map((dept) =>
          dept.id === editingDepartement.id ? editingDepartement : dept
        )
      );
      setEditingDepartement(null);
    }
  };

  const handleDeleteDepartement = (id: number) => {
    setDeleteConfirmation({ isOpen: true, id });
  };

  const confirmDelete = () => {
    if (deleteConfirmation.id !== null) {
      setDepartements(
        departements.filter((dept) => dept.id !== deleteConfirmation.id)
      );
      setFilieres(
        filieres.filter(
          (filiere) => filiere.departementId !== deleteConfirmation.id
        )
      );
      setDeleteConfirmation({ isOpen: false, id: null });
    }
  };

  const handleFiliereChange = (
    deptId: number,
    filiereId: number,
    checked: boolean
  ) => {
    setDepartements((prevDepts) =>
      prevDepts.map((dept) => {
        if (dept.id === deptId) {
          const updatedFilieres = checked
            ? [...dept.filieres, filiereId]
            : dept.filieres.filter((id) => id !== filiereId);
          return { ...dept, filieres: updatedFilieres };
        }
        return dept;
      })
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Gestion des Départements</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {editingDepartement
              ? "Modifier le département"
              : "Ajouter un nouveau département"}
          </CardTitle>
          <CardDescription>
            {editingDepartement
              ? "Modifiez les détails du département existant"
              : "Entrez le nom du nouveau département"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="nom">Nom du département</Label>
            <Input
              id="nom"
              value={
                editingDepartement ? editingDepartement.nom : newDepartement
              }
              onChange={(e) =>
                editingDepartement
                  ? setEditingDepartement({
                      ...editingDepartement,
                      nom: e.target.value,
                    })
                  : setNewDepartement(e.target.value)
              }
            />
          </div>
          <div className="flex flex-col space-y-1.5 mt-4">
            <Label className="mb-4">Filières associées</Label>
            <div className="grid grid-cols-2 gap-2">
              {filieres.map((filiere) => (
                <div key={filiere.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filiere-${filiere.id}`}
                    checked={
                      editingDepartement
                        ? editingDepartement.filieres.includes(filiere.id)
                        : departements
                            .find((d) => d.id === filiere.departementId)
                            ?.filieres.includes(filiere.id) || false
                    }
                    onCheckedChange={(checked) => {
                      if (editingDepartement) {
                        handleFiliereChange(
                          editingDepartement.id,
                          filiere.id,
                          checked as boolean
                        );
                      } else {
                        handleFiliereChange(
                          filiere.departementId,
                          filiere.id,
                          checked as boolean
                        );
                      }
                    }}
                  />
                  <Label htmlFor={`filiere-${filiere.id}`}>{filiere.nom}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {editingDepartement ? (
            <Button onClick={handleUpdateDepartement}>
              Mettre à jour le département
            </Button>
          ) : (
            <Button onClick={handleAddDepartement}>
              Ajouter le département
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Liste des Départements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Filières associées</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departements.map((dept) => (
                <TableRow key={dept.id}>
                  <TableCell>{dept.nom}</TableCell>
                  <TableCell>
                    {departements
                      .find((d) => d.id === dept.id)
                      ?.filieres.map(
                        (fId) => filieres.find((f) => f.id === fId)?.nom
                      )
                      .filter(Boolean)
                      .join(", ")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => setEditingDepartement(dept)}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteDepartement(dept.id)}
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
        itemName="ce département"
      />
    </div>
  );
}
