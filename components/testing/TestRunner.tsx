"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Play } from "lucide-react"

interface TestCase {
  id: string
  name: string
  description: string
  category: "integration" | "unit" | "e2e"
  status: "pending" | "running" | "passed" | "failed"
  duration?: number
  error?: string
}

const testCases: TestCase[] = [
  {
    id: "patient-load",
    name: "Patient Data Loading",
    description: "Test patient data loads correctly from API",
    category: "integration",
    status: "pending",
  },
  {
    id: "navigation-flow",
    name: "Navigation Flow",
    description: "Test navigation between patient list and details",
    category: "e2e",
    status: "pending",
  },
  {
    id: "card-rendering",
    name: "Card Components Rendering",
    description: "Test all 19 patient detail cards render correctly",
    category: "unit",
    status: "pending",
  },
  {
    id: "responsive-design",
    name: "Responsive Design",
    description: "Test mobile and desktop layouts",
    category: "e2e",
    status: "pending",
  },
  {
    id: "error-handling",
    name: "Error Handling",
    description: "Test error boundaries and fallback states",
    category: "integration",
    status: "pending",
  },
]

export function TestRunner() {
  const [tests, setTests] = useState<TestCase[]>(testCases)
  const [isRunning, setIsRunning] = useState(false)

  const runTest = async (testId: string) => {
    setTests((prev) => prev.map((test) => (test.id === testId ? { ...test, status: "running" } : test)))

    // Simulate test execution
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const success = Math.random() > 0.3 // 70% success rate for demo

    setTests((prev) =>
      prev.map((test) =>
        test.id === testId
          ? {
              ...test,
              status: success ? "passed" : "failed",
              duration: Math.floor(Math.random() * 3000) + 500,
              error: success ? undefined : "Test failed: Mock error for demonstration",
            }
          : test,
      ),
    )
  }

  const runAllTests = async () => {
    setIsRunning(true)

    for (const test of tests) {
      await runTest(test.id)
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: TestCase["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "running":
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
    }
  }

  const getStatusColor = (status: TestCase["status"]) => {
    switch (status) {
      case "passed":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "running":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const passedTests = tests.filter((t) => t.status === "passed").length
  const failedTests = tests.filter((t) => t.status === "failed").length
  const totalTests = tests.length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Medical Dashboard Test Suite</CardTitle>
            <Button onClick={runAllTests} disabled={isRunning} className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              {isRunning ? "Running Tests..." : "Run All Tests"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{passedTests}</div>
              <div className="text-sm text-gray-600">Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{failedTests}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">{totalTests}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>

          <div className="space-y-3">
            {tests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(test.status)}
                  <div>
                    <div className="font-medium">{test.name}</div>
                    <div className="text-sm text-gray-600">{test.description}</div>
                    {test.error && <div className="text-sm text-red-600 mt-1">{test.error}</div>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(test.status)}>{test.category}</Badge>
                  <Badge variant="outline">{test.status}</Badge>
                  {test.duration && <span className="text-sm text-gray-500">{test.duration}ms</span>}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => runTest(test.id)}
                    disabled={test.status === "running" || isRunning}
                  >
                    Run
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
