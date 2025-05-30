"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Plus, Calendar, User, CheckCircle2, AlertCircle } from "lucide-react"
import { useNavigatorData } from "@/hooks/useNavigatorData"

export default function NavigatorTasksPage() {
  const { tasks, updateTaskStatus } = useNavigatorData()

  const pendingTasks = tasks.filter((task) => task.status === "pending")
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress")
  const completedTasks = tasks.filter((task) => task.status === "completed")
  const overdueTasks = tasks.filter((task) => task.status === "overdue")

  const handleTaskStatusChange = (taskId: string, newStatus: any) => {
    updateTaskStatus(taskId, newStatus)
  }

  const TaskCard = ({ task }: { task: any }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={task.status === "completed"}
              onCheckedChange={(checked) => handleTaskStatusChange(task.id, checked ? "completed" : "pending")}
            />
            <div>
              <CardTitle className="text-lg">{task.title}</CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </div>
          </div>
          <Badge
            variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
          >
            {task.priority === "high"
              ? "Prioritate Înaltă"
              : task.priority === "medium"
                ? "Prioritate Medie"
                : "Prioritate Scăzută"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>Pacient: {task.patientName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Scadență: {task.dueDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>Durată estimată: {task.estimatedDuration} min</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-muted-foreground">Atribuit de: {task.assignedBy}</div>
          <div className="flex space-x-2">
            {task.status === "pending" && (
              <Button variant="outline" size="sm" onClick={() => handleTaskStatusChange(task.id, "in-progress")}>
                Începe
              </Button>
            )}
            {task.status === "in-progress" && (
              <Button variant="default" size="sm" onClick={() => handleTaskStatusChange(task.id, "completed")}>
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Finalizează
              </Button>
            )}
            <Button variant="ghost" size="sm">
              Detalii
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sarcini și Task-uri</h1>
          <p className="text-muted-foreground">Gestionează sarcinile zilnice și responsabilitățile</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Sarcină Nouă
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">În Așteptare</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks.length}</div>
            <p className="text-xs text-muted-foreground">Sarcini de început</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">În Progres</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inProgressTasks.length}</div>
            <p className="text-xs text-muted-foreground">Sarcini active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Finalizate</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
            <p className="text-xs text-muted-foreground">Sarcini complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Întârziate</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">Necesită atenție</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">În Așteptare ({pendingTasks.length})</TabsTrigger>
          <TabsTrigger value="in-progress">În Progres ({inProgressTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Finalizate ({completedTasks.length})</TabsTrigger>
          <TabsTrigger value="overdue">Întârziate ({overdueTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p>Nu ai sarcini în așteptare!</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {inProgressTasks.length > 0 ? (
            inProgressTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <p>Nu ai sarcini în progres momentan.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p>Nu ai sarcini finalizate astăzi.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          {overdueTasks.length > 0 ? (
            overdueTasks.map((task) => <TaskCard key={task.id} task={task} />)
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p>Nu ai sarcini întârziate!</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
