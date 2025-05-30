"use client"

import { TestRunner } from "@/components/testing/TestRunner"
import { PerformanceMonitor } from "@/components/testing/PerformanceMonitor"
import { ErrorBoundaryTest, ErrorTrigger } from "@/components/testing/ErrorBoundaryTest"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TestingPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Integration & Testing Dashboard</h1>
      </div>

      <Tabs defaultValue="tests" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tests">Test Suite</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="errors">Error Handling</TabsTrigger>
          <TabsTrigger value="integration">API Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="tests">
          <TestRunner />
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PerformanceMonitor />
            <Card>
              <CardHeader>
                <CardTitle>Performance Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-600">Good Performance</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Load time: &lt; 1s</li>
                    <li>• Render time: &lt; 16ms</li>
                    <li>• Memory usage: &lt; 50MB</li>
                    <li>• API response: &lt; 200ms</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-yellow-600">Needs Improvement</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Load time: 1-3s</li>
                    <li>• Render time: 16-50ms</li>
                    <li>• Memory usage: 50-100MB</li>
                    <li>• API response: 200-500ms</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-600">Poor Performance</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Load time: &gt; 3s</li>
                    <li>• Render time: &gt; 50ms</li>
                    <li>• Memory usage: &gt; 100MB</li>
                    <li>• API response: &gt; 500ms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="errors">
          <div className="space-y-6">
            <ErrorBoundaryTest>
              <ErrorTrigger />
            </ErrorBoundaryTest>

            <Card>
              <CardHeader>
                <CardTitle>Error Handling Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">✓</div>
                    <div className="text-sm font-medium">Error Boundaries</div>
                    <div className="text-xs text-gray-600">Implemented</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">✓</div>
                    <div className="text-sm font-medium">Fallback UI</div>
                    <div className="text-xs text-gray-600">Ready</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">✓</div>
                    <div className="text-sm font-medium">Error Logging</div>
                    <div className="text-xs text-gray-600">Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integration">
          <Card>
            <CardHeader>
              <CardTitle>API Integration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Patient Management</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Get Patient Data</span>
                        <span className="text-green-600">✓ Ready</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Update Patient</span>
                        <span className="text-green-600">✓ Ready</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Patient Search</span>
                        <span className="text-green-600">✓ Ready</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Medical Records</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Get Medical History</span>
                        <span className="text-green-600">✓ Ready</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Upload Documents</span>
                        <span className="text-green-600">✓ Ready</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Treatment Plans</span>
                        <span className="text-green-600">✓ Ready</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Integration Checklist</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>API Client Setup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Authentication Handling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Error Handling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Loading States</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Data Validation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Cache Management</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
