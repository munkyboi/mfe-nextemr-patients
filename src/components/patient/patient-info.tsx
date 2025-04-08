import { Mail, Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PatientPersonalInfo from './info/personal-info';

export default function ProfileScreen() {
  return (
    <div className="fluid mx-auto">
      <Card className="border-none shadow-none m-0 p-0">
        <CardHeader className="relative h-48 p-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-t-lg" />
          <div className="absolute -bottom-16 left-8">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage
                src="https://emroneair.netlify.app/img/profile.jpg"
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Mail className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-background/80 backdrop-blur-sm"
            >
              <Pen className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-20 pb-6">
          <div className="space-y-4">
            <PatientPersonalInfo />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
