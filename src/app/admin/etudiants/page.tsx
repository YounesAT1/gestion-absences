"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Etudiant = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  filiere: string;
};

const etudiants: Etudiant[] = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Alice",
    email: "alice.dupont@email.com",
    filiere: "Informatique",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Bob",
    email: "bob.martin@email.com",
    filiere: "Physique",
  },
  {
    id: 3,
    nom: "Brown",
    prenom: "Charlie",
    email: "charlie.brown@email.com",
    filiere: "Mathématiques",
  },
  {
    id: 4,
    nom: "Lee",
    prenom: "David",
    email: "david.lee@email.com",
    filiere: "Chimie",
  },
];

export default function EtudiantsPage() {
  const [newEtudiant, setNewEtudiant] = useState<Omit<Etudiant, "id">>({
    nom: "",
    prenom: "",
    email: "",
    filiere: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEtudiant((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the new student data to your backend
    console.log("Nouvel étudiant:", newEtudiant);
    alert("Étudiant ajouté avec succès!");
    setNewEtudiant({ nom: "", prenom: "", email: "", filiere: "" });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Gestion des Étudiants</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Ajouter un nouvel étudiant</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  name="nom"
                  value={newEtudiant.nom}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  name="prenom"
                  value={newEtudiant.prenom}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={newEtudiant.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="filiere">Filière</Label>
              <Input
                id="filiere"
                name="filiere"
                value={newEtudiant.filiere}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit">Ajouter l&apos;étudiant</Button>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Liste des Étudiants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prénom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Filière</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {etudiants.map((etudiant) => (
                <TableRow key={etudiant.id}>
                  <TableCell>{etudiant.nom}</TableCell>
                  <TableCell>{etudiant.prenom}</TableCell>
                  <TableCell>{etudiant.email}</TableCell>
                  <TableCell>{etudiant.filiere}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
