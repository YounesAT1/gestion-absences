"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Users,
  Calendar,
  Building,
  GraduationCap,
  CircleUser,
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Départements",
    value: "4",
    icon: Building,
    description: "Départements actifs",
    link: "/admin/departements",
  },
  {
    title: "Filières",
    value: "12",
    icon: GraduationCap,
    description: "Filières actives",
    link: "/admin/filieres",
  },
  {
    title: "Modules",
    value: "24",
    icon: BookOpen,
    description: "Modules actifs ce semestre",
    link: "/admin/modules",
  },
  {
    title: "Étudiants",
    value: "1,234",
    icon: Users,
    description: "Étudiants inscrits",
    link: "/admin/etudiants",
  },
  {
    title: "Enseignants",
    value: "17",
    icon: CircleUser,
    description: "Enseignants au travail",
    link: "/admin/enseignants",
  },
  {
    title: "Absences",
    value: "89",
    icon: Calendar,
    description: "Absences cette semaine",
    link: "/admin/absences",
  },
];

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Home() {
  return (
    <div className="space-y-6 p-8 ">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 relative">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
          Tableau de Bord
        </span>
        <span className="absolute bottom-0 left-0 w-1/4 h-1 bg-gradient-to-r from-purple-600 to-indigo-600"></span>
      </h1>{" "}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={item}>
            <Link href={stat.link}>
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-700">
                    {stat.title}
                  </CardTitle>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <stat.icon className="h-4 w-4 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
