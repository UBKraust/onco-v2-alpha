"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, TrendingUp, Calendar, Plus, Award } from "lucide-react"
import { useState } from "react"

export default function NavigatorGoalsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const goals = [
    {
      id: "1",
      title: "Îmbunătățirea Aderenței Pacienților",
      description: "Creșterea aderenței medii la tratament cu 10%",
      category: "adherence",
      targetValue: 90,
      currentValue: 87,
      unit: "%",
      deadline: "2024-12-31",
      status: "in-progress",
      priority: "high",
    },
    {
      id: "2",
      title: "Reducerea Timpului de Răspuns",
      description: "Reducerea timpului mediu de răspuns la sub 2 ore",
      category: "response-time",
      targetValue: 2,
      currentValue: 2.3,
      unit: "ore",
      deadline: "2024-11-30",
      status: "in-progress",
      priority: "medium",
    },
    {
      id: "3",
      title: "Creșterea Satisfacției Pacienților",
      description: "Atingerea unui scor de satisfacție de 4.8/5",
      category: "satisfaction",
      targetValue: 4.8,
      currentValue: 4.7,
      unit: "/5",
      deadline: "2024-12-15",
      status: "in-progress",
      priority: "high",
    },
    {
      id: "4",
      title: "Finalizarea Sesiunilor Educaționale",
      description: "Completarea a 15 sesiuni educaționale în această lună",
      category: "education",
      targetValue: 15,
      currentValue: 12,
      unit: "sesiuni",
      deadline: "2024-11-30",
      status: "in-progress",
      priority: "medium",
    },
  ]

  const achievements = [
    {
      id: "1",
      title: "Expert în Comunicare",
      description: "A menținut un timp de răspuns sub 1 oră pentru 30 de zile consecutive",
      earnedDate: "2024-10-15",
      category: "communication",
    },
    {
      id: "2",
      title: "Mentor Pacienți",
      description: "A ajutat 50+ pacienți să-și îmbunătățească aderența la tratament",
      earnedDate: "2024-09-20",
      category: "mentoring",
    },
  ]

  const calculateProgress = (current: number, target: number, isReverse = false) => {
    if (isReverse) {
      // Pentru obiective unde valoarea mai mică este mai bună (ex: timp de răspuns)
      const progress = Math.max(0, Math.min(100, (target / current) * 100))
      return progress > 100 ? 100 : progress
    }
    return Math.max(0, Math.min(100, (current / target) * 100))
  }

  const GoalCard = ({ goal }: { goal: any }) => {
    const isReverse = goal.category === "response-time"
    const progress = calculateProgress(goal.currentValue, goal.targetValue, isReverse)

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <CardTitle className="text-lg">{goal.title}</CardTitle>
            </div>
            <Badge
              variant={goal.priority === "high" ? "destructive" : goal.priority === "medium" ? "default" : "secondary"}
            >
              {goal.priority === "high"
                ? "Prioritate Înaltă"
                : goal.priority === "medium"
                  ? "Prioritate Medie"
                  : "Prioritate Scăzută"}
            </Badge>
          </div>
          <CardDescription>{goal.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progres</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Curent</p>
                <p className="font-semibold">
                  {goal.currentValue}
                  {goal.unit}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Țintă</p>
                <p className="font-semibold">
                  {goal.targetValue}
                  {goal.unit}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Deadline</p>
                <p className="font-semibold">{goal.deadline}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <Badge variant="outline">
                {goal.status === "in-progress"
                  ? "În Progres"
                  : goal.status === "completed"
                    ? "Finalizat"
                    : "Planificat"}
              </Badge>
              <Button variant="outline" size="sm">
                Actualizează
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Obiective și Realizări</h1>
          <p className="text-muted-foreground">Monitorizează progresul și realizările profesionale</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Obiectiv Nou
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Obiective Active</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goals.length}</div>
            <p className="text-xs text-muted-foreground">În progres</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progres Mediu</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">78%</div>
            <p className="text-xs text-muted-foreground">Toate obiectivele</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Realizări</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{achievements.length}</div>
            <p className="text-xs text-muted-foreground">Câștigate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deadline-uri</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">În următoarele 30 zile</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="goals" className="space-y-4">
        <TabsList>
          <TabsTrigger value="goals">Obiective Active</TabsTrigger>
          <TabsTrigger value="achievements">Realizări</TabsTrigger>
          <TabsTrigger value="analytics">Analiză</TabsTrigger>
        </TabsList>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {goals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id}>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  </div>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">
                      {achievement.category === "communication" ? "Comunicare" : "Mentoring"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Câștigat: {achievement.earnedDate}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analiză Performanță</CardTitle>
              <CardDescription>Vizualizarea progresului în timp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-muted-foreground">Grafic progres obiective (placeholder)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
