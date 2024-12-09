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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

type Absence = {
  id: number;
  etudiant: string;
  module: string;
  date: Date;
  justifiee: boolean;
};

const absences: Absence[] = [
  {
    id: 1,
    etudiant: "Alice Dupont",
    module: "Mathématiques",
    date: new Date(2023, 5, 15),
    justifiee: true,
  },
  {
    id: 2,
    etudiant: "Bob Martin",
    module: "Physique",
    date: new Date(2023, 5, 16),
    justifiee: false,
  },
  {
    id: 3,
    etudiant: "Charlie Brown",
    module: "Informatique",
    date: new Date(2023, 5, 17),
    justifiee: true,
  },
  {
    id: 4,
    etudiant: "David Lee",
    module: "Chimie",
    date: new Date(2023, 5, 18),
    justifiee: false,
  },
];

export default function AbsencesPage() {
  const [selectedModule, setSelectedModule] = useState<string | undefined>(
    undefined
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filteredAbsences = absences.filter(
    (absence) =>
      (!selectedModule || absence.module === selectedModule) &&
      (!selectedDate ||
        format(absence.date, "yyyy-MM-dd") ===
          format(selectedDate, "yyyy-MM-dd"))
  );

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Gestion des Absences</h1>
      <div className="flex space-x-4 mb-6">
        <Select onValueChange={(value) => setSelectedModule(value)}>
          <SelectTrigger className="w-[300px]">
            <SelectValue placeholder="Sélectionner un module" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Mathématiques">Mathématiques</SelectItem>
            <SelectItem value="Physique">Physique</SelectItem>
            <SelectItem value="Informatique">Informatique</SelectItem>
            <SelectItem value="Chimie">Chimie</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Sélectionner une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Liste des Absences</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Étudiant</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Justifiée</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAbsences.map((absence) => (
                <TableRow key={absence.id}>
                  <TableCell>{absence.etudiant}</TableCell>
                  <TableCell>{absence.module}</TableCell>
                  <TableCell>{format(absence.date, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{absence.justifiee ? "Oui" : "Non"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
