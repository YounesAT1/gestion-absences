export type Departement = {
  id: number;
  nom: string;
  filieres: number[];
};

export type Filiere = {
  id: number;
  nom: string;
  departementId: number;
};

export type Module = {
  id: number;
  nom: string;
  filiereId: number;
};

export type ElementModule = {
  id: number;
  nom: string;
  moduleId: number;
};

export type Enseignant = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  departementId: number;
};

export type Etudiant = {
  id: number;
  nom: string;
  prenom: string;
  numeroEtudiant: string;
  filiereId: number;
};

export type Groupe = {
  id: number;
  nom: string;
  type: "TD" | "TP";
  elementModuleId: number;
};

export type Absence = {
  id: number;
  etudiantId: number;
  elementModuleId: number;
  date: string;
  justifiee: boolean;
};
