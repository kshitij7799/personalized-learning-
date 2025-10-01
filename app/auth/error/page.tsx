import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default async function ErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-sm">
        <Card className="border-none shadow-xl">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-center">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent>
            {params?.error ? (
              <p className="text-sm text-muted-foreground text-center">Error: {params.error}</p>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                An unspecified error occurred during authentication.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
