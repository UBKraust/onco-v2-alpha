import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Video, Award, Play, CheckCircle } from "lucide-react"

export default function TrainingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Training și Educație</h1>
        <p className="text-muted-foreground">Materiale de training, quiz-uri și tutoriale pentru utilizatori</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursuri Completate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">din 12 disponibile</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progres General</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <Progress value={67} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificări</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Obținute cu succes</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cursuri Disponibile</CardTitle>
            <CardDescription>Materiale de training pentru îmbunătățirea competențelor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Introducere în Navigarea Pacienților",
                type: "Video",
                duration: "45 min",
                status: "completed",
                progress: 100,
              },
              {
                title: "Comunicarea Eficientă cu Pacienții",
                type: "Curs",
                duration: "2 ore",
                status: "in-progress",
                progress: 60,
              },
              {
                title: "Gestionarea Situațiilor de Criză",
                type: "Workshop",
                duration: "1.5 ore",
                status: "available",
                progress: 0,
              },
              {
                title: "Înțelegerea Tratamentelor Oncologice",
                type: "Curs",
                duration: "3 ore",
                status: "available",
                progress: 0,
              },
            ].map((course, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {course.type === "Video" ? (
                    <Video className="h-8 w-8 text-blue-500" />
                  ) : (
                    <BookOpen className="h-8 w-8 text-green-500" />
                  )}
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-sm text-muted-foreground">{course.duration}</p>
                    {course.status === "in-progress" && <Progress value={course.progress} className="w-32 mt-1" />}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      course.status === "completed"
                        ? "default"
                        : course.status === "in-progress"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {course.status === "completed"
                      ? "Completat"
                      : course.status === "in-progress"
                        ? "În progres"
                        : "Disponibil"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    {course.status === "completed" ? <CheckCircle className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quiz și Evaluări</CardTitle>
            <CardDescription>Testează-ți cunoștințele dobândite</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Quiz Comunicare Pacienți", score: 85, status: "completed" },
              { title: "Evaluare Proceduri Medicale", score: 92, status: "completed" },
              { title: "Test Situații de Urgență", score: null, status: "available" },
              { title: "Examen Final Certificare", score: null, status: "locked" },
            ].map((quiz, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{quiz.title}</p>
                  {quiz.score && <p className="text-sm text-muted-foreground">Scor: {quiz.score}%</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      quiz.status === "completed" ? "default" : quiz.status === "available" ? "secondary" : "outline"
                    }
                  >
                    {quiz.status === "completed" ? "Completat" : quiz.status === "available" ? "Disponibil" : "Blocat"}
                  </Badge>
                  <Button variant="outline" size="sm" disabled={quiz.status === "locked"}>
                    {quiz.status === "completed" ? "Revizuiește" : "Începe"}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
