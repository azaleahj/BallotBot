import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function HomePage() {
  const { logoutMutation } = useAuth();
  const [zipcode, setZipcode] = useState("");
  const [issue, setIssue] = useState("");
  const [showResults, setShowResults] = useState(false);

  const { data: electionData, isLoading } = useQuery({
    queryKey: ["/api/election-data"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const CandidateCard = ({ candidate }: { candidate: any }) => (
    <Card key={candidate.name}>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{candidate.name}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              candidate.party === "Democratic" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"
            }`}>
              {candidate.party}
            </span>
          </div>
          <p className="text-muted-foreground">{candidate.stance}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Voter Information Portal</h1>
          <Button variant="outline" onClick={() => logoutMutation.mutate()}>
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Search Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="zipcode">Zipcode</Label>
                  <Input
                    id="zipcode"
                    value={zipcode}
                    onChange={(e) => setZipcode(e.target.value)}
                    placeholder="Enter zipcode"
                  />
                </div>
                <div>
                  <Label htmlFor="issue">Issue</Label>
                  <Input
                    id="issue"
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                    placeholder="Enter issue"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Show Candidates
                </Button>
              </form>
            </CardContent>
          </Card>

          {showResults && (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Presidential Candidates' Stances on {issue || 'Selected Issue'}</h2>
                {electionData?.presidential.map((candidate: any) => (
                  <CandidateCard key={candidate.name} candidate={candidate} />
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">New York Senate Race</h2>
                {electionData?.senate.map((candidate: any) => (
                  <CandidateCard key={candidate.name} candidate={candidate} />
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">New York Governor's Race</h2>
                {electionData?.governor.map((candidate: any) => (
                  <CandidateCard key={candidate.name} candidate={candidate} />
                ))}
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">New York City Mayor's Race</h2>
                {electionData?.mayor.map((candidate: any) => (
                  <CandidateCard key={candidate.name} candidate={candidate} />
                ))}
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}