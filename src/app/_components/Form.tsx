import { motion } from 'framer-motion';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useState, FormEvent } from 'react';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Users, Palette, Settings, Lightbulb, Rocket, Smartphone, Expand, CheckSquare } from 'lucide-react'; // Lucide Icons

interface Rating {
  design: string;
  functionality: string;
  innovation: string;
  feasibility: string;
  userExperience: string;
  scalability: string;
  demonstration: string;
}

const TeamEvaluationForm: React.FC = () => {
  const [teamName, setTeamName] = useState<string>('');
  const [ratings, setRatings] = useState<Rating>({
    design: '',
    functionality: '',
    innovation: '',
    feasibility: '',
    userExperience: '',
    scalability: '',
    demonstration: '',
  });

  const handleRatingChange = (category: keyof Rating, value: string) => {
    setRatings((prevRatings) => ({ ...prevRatings, [category]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      teamName,
      ratings,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 p-8 rounded-lg scale-90 shadow-xl max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-100">
        Team Evaluation Formx
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Team Name */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="team-name" className="text-gray-300">Team Name</Label>
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-400" />
            <Input
              type="text"
              id="team-name"
              placeholder="Enter team name"
              className="p-2 border rounded-lg w-full bg-gray-800 border-gray-700 text-gray-300"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
        </div>

        {/* Design Dropdown */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="design" className="text-gray-300">Design</Label>
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-gray-400" />
            <Select onValueChange={(value) => handleRatingChange('design', value)}>
              <SelectTrigger className="w-full p-2 border rounded-lg bg-gray-800 border-gray-700 text-gray-300">
                <SelectValue placeholder="Rate design (1-10)" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Functionality Dropdown */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="functionality" className="text-gray-300">Functionality</Label>
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-gray-400" />
            <Select onValueChange={(value) => handleRatingChange('functionality', value)}>
              <SelectTrigger className="w-full p-2 border rounded-lg bg-gray-800 border-gray-700 text-gray-300">
                <SelectValue placeholder="Rate functionality (1-10)" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Innovation Dropdown */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="innovation" className="text-gray-300">Innovation</Label>
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-gray-400" />
            <Select onValueChange={(value) => handleRatingChange('innovation', value)}>
              <SelectTrigger className="w-full p-2 border rounded-lg bg-gray-800 border-gray-700 text-gray-300">
                <SelectValue placeholder="Rate innovation (1-10)" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Feasibility Dropdown */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="feasibility" className="text-gray-300">Feasibility</Label>
          <div className="flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-gray-400" />
            <Select onValueChange={(value) => handleRatingChange('feasibility', value)}>
              <SelectTrigger className="w-full p-2 border rounded-lg bg-gray-800 border-gray-700 text-gray-300">
                <SelectValue placeholder="Rate feasibility (1-10)" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* User Experience Dropdown */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="user-experience" className="text-gray-300">User Experience</Label>
          <div className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-gray-400" />
            <Select onValueChange={(value) => handleRatingChange('userExperience', value)}>
              <SelectTrigger className="w-full p-2 border rounded-lg bg-gray-800 border-gray-700 text-gray-300">
                <SelectValue placeholder="Rate user experience (1-10)" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Scalability Dropdown */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="scalability" className="text-gray-300">Scalability</Label>
          <div className="flex items-center space-x-2">
            <Expand className="w-5 h-5 text-gray-400" />
            <Select onValueChange={(value) => handleRatingChange('scalability', value)}>
              <SelectTrigger className="w-full p-2 border rounded-lg bg-gray-800 border-gray-700 text-gray-300">
                <SelectValue placeholder="Rate scalability (1-10)" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Demonstration Dropdown */}
        <div className="flex flex-col space-y-1">
          <Label htmlFor="demonstration" className="text-gray-300">Demonstration</Label>
          <div className="flex items-center space-x-2">
            <CheckSquare className="w-5 h-5 text-gray-400" />
            <Select onValueChange={(value) => handleRatingChange('demonstration', value)}>
              <SelectTrigger className="w-full p-2 border rounded-lg bg-gray-800 border-gray-700 text-gray-300">
                <SelectValue placeholder="Rate demonstration (1-10)" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-gray-300">
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={String(i + 1)}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Submit Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full"
        >
          <Button type="submit" className="w-full p-2 bg-blue-600 text-white rounded-lg">
            Submit Evaluation
          </Button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default TeamEvaluationForm;
