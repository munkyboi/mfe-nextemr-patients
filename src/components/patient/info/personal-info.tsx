import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function PatientPersonalInfo() {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-4">
              <div>
                <CardTitle className="text-2xl flex items-center">
                  John Doe{' '}
                  <Badge className="ml-2 text-[10px] bg-blue-500">VIP</Badge>
                </CardTitle>
                <CardDescription>Patient ID: 12345678</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="columns-2 gap-4">
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Date of Birth
                </p>
                <p>April 15, 1985 (38 years)</p>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Gender
                </p>
                <p>Male</p>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Marital Status
                </p>
                <p>Single</p>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Nationality
                </p>
                <p>American</p>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Address
                </p>
                <p>
                  Street 123, Road Name Ave., Cebu City, Cebu, Philippines 6000
                </p>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Blood Type
                </p>
                <p>O Positive</p>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Primary Physician
                </p>
                <p>Dr. Sarah Johnson</p>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Registered Facility
                </p>
                <p>Cosmopolitan Clinic</p>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Member Since
                </p>
                <p>12 March 2004</p>
              </div>
              <div className="space-y-1 mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Last Visit
                </p>
                <p>
                  14 Feb 2024 <span className="text-gray-400">(Monday)</span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>Vital Statistics</CardTitle>
            <CardDescription>Last updated: April 8, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Height
                </p>
                <p>5'11" (180 cm)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Weight
                </p>
                <p>175 lbs (79.4 kg)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">BMI</p>
                <p>24.4 (Normal)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Blood Pressure
                </p>
                <p>120/80 mmHg</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>Vital Statistics</CardTitle>
            <CardDescription>Last updated: April 8, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Height
                </p>
                <p>5'11" (180 cm)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Weight
                </p>
                <p>175 lbs (79.4 kg)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">BMI</p>
                <p>24.4 (Normal)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Blood Pressure
                </p>
                <p>120/80 mmHg</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export { PatientPersonalInfo };
