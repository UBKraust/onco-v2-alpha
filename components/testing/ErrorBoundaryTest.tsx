"use client"

import { Component, type ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundaryTest extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error Boundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-red-600">An error occurred while rendering this component.</p>
                {this.state.error && (
                  <details className="text-sm">
                    <summary className="cursor-pointer font-medium">Error Details</summary>
                    <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto">
                      {this.state.error.message}
                      {"\n"}
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
                <Button
                  onClick={() => this.setState({ hasError: false, error: undefined })}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      )
    }

    return this.props.children
  }
}

// Test component that can trigger errors
export function ErrorTrigger() {
  const triggerError = () => {
    throw new Error("Test error triggered for demonstration")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Error Boundary Test</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-600">Click the button below to test error boundary functionality:</p>
        <Button onClick={triggerError} variant="destructive">
          Trigger Test Error
        </Button>
      </CardContent>
    </Card>
  )
}
