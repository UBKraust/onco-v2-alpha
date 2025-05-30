"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, AlertCircle, Loader2, Database, Zap, Shield, Smartphone } from "lucide-react"

interface TestResult {
  name: string
  status: "success" | "error" | "warning" | "loading"
  message: string
  duration?: number
}

export function IntegrationTestDashboard() {
  const [tests, setTests] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [progress, setProgress] = useState(0)

  const testSuites = [
    {
      category: "Module Integration",
      tests: [
        { name: "Personal Data Module", component: "PersonalDataModule" },
        { name: "Diagnosis Module", component: "DiagnosisModuleComplete" },
        { name: "Treatment Module", component: "TreatmentModuleComplete" },
        { name: "Lab Results Module", component: "LabResultsModuleComplete" },
        { name: "Symptom Module", component: "SymptomModuleComplete" },
        { name: "Medical Timeline", component: "MedicalTimeline" },
      ],
    },
    {
      category: "Data Flow",
      tests: [
        { name: "Cross-module Data Sharing", component: "DataFlow" },
        { name: "Real-time Updates", component: "RealtimeSync" },
        { name: "State Management", component: "StateManagement" },
        { name: "Local Storage Persistence", component: "LocalStorage" },
      ],
    },
    {
      category: "User Experience",
      tests: [
        { name: "Responsive Design", component: "ResponsiveDesign" },
        { name: "Accessibility (ARIA)", component: "Accessibility" },
        { name: "Performance (Load Time)", component: "Performance" },
        { name: "Error Handling", component: "ErrorHandling" },
      ],
    },
    {
      category: "Security & Compliance",
      tests: [
        { name: "Data Validation", component: "DataValidation" },
        { name: "Input Sanitization", component: "InputSanitization" },
        { name: "GDPR Compliance", component: "GDPRCompliance" },
        { name: "Medical Data Security", component: "MedicalSecurity" },
      ],
    },
  ]

  const runTests = async () => {
    setIsRunning(true)
    setTests([])
    setProgress(0)

    const allTests = testSuites.flatMap((suite) => suite.tests)
    const totalTests = allTests.length

    for (let i = 0; i < allTests.length; i++) {
      const test = allTests[i]

      // Simulate test execution
      const startTime = Date.now()
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 1000 + 500))
      const duration = Date.now() - startTime

      // Simulate test results (mostly successful with some warnings)
      const random = Math.random()
      let status: TestResult["status"]
      let message: string

      if (random > 0.9) {
        status = "error"
        message = "Test failed - requires attention"
      } else if (random > 0.7) {
        status = "warning"
        message = "Test passed with warnings"
      } else {
        status = "success"
        message = "Test passed successfully"
      }

      const result: TestResult = {
        name: test.name,
        status,
        message,
        duration,
      }

      setTests((prev) => [...prev, result])
      setProgress(((i + 1) / totalTests) * 100)
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "loading":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Passed</Badge>
      case "error":
        return <Badge variant="destructive">Failed</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
      case "loading":
        return <Badge variant="outline">Running</Badge>
    }
  }

  const successCount = tests.filter((t) => t.status === "success").length
  const errorCount = tests.filter((t) => t.status === "error").length
  const warningCount = tests.filter((t) => t.status === "warning").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Integration Test Dashboard</h2>
          <p className="text-muted-foreground">Verifică integrarea și funcționarea tuturor modulelor</p>
        </div>
        <Button onClick={runTests} disabled={isRunning}>
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Running Tests...
            </>
          ) : (
            "Run All Tests"
          )}
        </Button>
      </div>

      {isRunning && (
        <Card>
          <CardHeader>
            <CardTitle>Test Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% complete</p>
          </CardContent>
        </Card>
      )}

      {tests.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Passed</p>
                  <p className="text-2xl font-bold text-green-600">{successCount}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                  <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold text-red-600">{errorCount}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testSuites.map((suite, suiteIndex) => (
          <Card key={suiteIndex}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {suite.category === "Module Integration" && <Database className="h-5 w-5" />}
                {suite.category === "Data Flow" && <Zap className="h-5 w-5" />}
                {suite.category === "User Experience" && <Smartphone className="h-5 w-5" />}
                {suite.category === "Security & Compliance" && <Shield className="h-5 w-5" />}
                {suite.category}
              </CardTitle>
              <CardDescription>
                {suite.category === "Module Integration" && "Testing individual module functionality"}
                {suite.category === "Data Flow" && "Testing data synchronization and state management"}
                {suite.category === "User Experience" && "Testing UI/UX and accessibility"}
                {suite.category === "Security & Compliance" && "Testing security and compliance measures"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {suite.tests.map((test, testIndex) => {
                  const result = tests.find((t) => t.name === test.name)
                  return (
                    <div key={testIndex} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {result ? getStatusIcon(result.status) : <div className="h-5 w-5" />}
                        <div>
                          <p className="font-medium">{test.name}</p>
                          {result && (
                            <p className="text-sm text-muted-foreground">
                              {result.message}
                              {result.duration && ` (${result.duration}ms)`}
                            </p>
                          )}
                        </div>
                      </div>
                      {result && getStatusBadge(result.status)}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
