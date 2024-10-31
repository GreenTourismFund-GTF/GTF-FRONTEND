import { useState } from 'react';
import { Switch } from '../../components/ui/switch';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Label } from '../../components/ui/label';

const SettingsPanel = () => {
  // Initialize state with mock data
  const [settings, setSettings] = useState([
    {
      id: 1,
      category: "Notifications",
      settings: [
        { id: 1, label: "Email Notifications", enabled: true, description: "Receive email updates" },
        { id: 2, label: "Push Notifications", enabled: false, description: "Get push notifications" }
      ]
    },
    {
      id: 2,
      category: "Privacy",
      settings: [
        { id: 3, label: "Profile Visibility", enabled: true, description: "Make profile visible to others" },
        { id: 4, label: "Activity Status", enabled: true, description: "Show when you're active" }
      ]
    }
  ]);

  // Handler for toggling switches
  const handleToggle = (sectionId: number, settingId: number) => {
    setSettings(prevSettings => 
      prevSettings.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            settings: section.settings.map(setting => 
              setting.id === settingId 
                ? { ...setting, enabled: !setting.enabled }
                : setting
            )
          };
        }
        return section;
      })
    );
  };

  return (
    <div className="space-y-6">
      {settings.map(section => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle>{section.category}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {section.settings.map(setting => (
                <div key={setting.id} className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={`switch-${setting.id}`} className="text-base font-medium">
                      {setting.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    id={`switch-${setting.id}`}
                    checked={setting.enabled}
                    onCheckedChange={() => handleToggle(section.id, setting.id)}
                    className="data-[state=checked]:bg-primary"
                    aria-label={`Toggle ${setting.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue="admin@example.com" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" defaultValue="********" />
            </div>
            <div className="pt-4">
              <Button>Save Changes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPanel;