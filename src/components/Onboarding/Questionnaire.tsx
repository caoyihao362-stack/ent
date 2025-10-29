import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { supabase } from '../../lib/supabase';
import { generateSeedData } from '../../lib/seedData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const SPORTS_OPTIONS = [
  { id: 'running', label: '跑步', icon: '🏃' },
  { id: 'swimming', label: '游泳', icon: '🏊' },
  { id: 'gym', label: '健身房', icon: '💪' },
  { id: 'cycling', label: '骑行', icon: '🚴' },
  { id: 'yoga', label: '瑜伽', icon: '🧘' },
  { id: 'basketball', label: '篮球', icon: '🏀' },
  { id: 'soccer', label: '足球', icon: '⚽' },
  { id: 'hiking', label: '徒步', icon: '🥾' },
];

interface QuestionnaireProps {
  onComplete: () => void;
}

export const Questionnaire = ({ onComplete }: QuestionnaireProps) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [frequency, setFrequency] = useState(3);
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const toggleSport = (sportId: string) => {
    setSelectedSports((prev) =>
      prev.includes(sportId)
        ? prev.filter((id) => id !== sportId)
        : [...prev, sportId]
    );
  };

  const validateInputs = (): boolean => {
    if (frequency < 0 || frequency > 7) {
      setValidationError(t.questionnaire.validation.frequencyRange);
      return false;
    }

    const heightNum = parseFloat(height);
    if (height && (heightNum < 100 || heightNum > 230)) {
      setValidationError(t.questionnaire.validation.heightRange);
      return false;
    }

    const weightNum = parseFloat(weight);
    if (weight && (weightNum < 30 || weightNum > 200)) {
      setValidationError(t.questionnaire.validation.weightRange);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSports.length === 0) {
      setError(t.questionnaire.selectSportsError);
      return;
    }

    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    setError('');
    setValidationError(null);

    try {
      const preferences = {
        user_id: user?.id,
        sports_preferences: selectedSports,
        height: parseFloat(height) || 0,
        weight: parseFloat(weight) || 0,
        weekly_frequency: frequency,
        fitness_goal: fitnessGoal,
      };

      const { error: insertError } = await supabase
        .from('user_preferences')
        .insert([preferences]);

      if (insertError) throw insertError;

      await generateSeedData(user?.id || '', preferences);

      onComplete();
    } catch (err: any) {
      setError(err.message || t.questionnaire.selectSportsError);
    } finally {
      setLoading(false);
    }
  };

  const handleValidationDismiss = () => {
    setValidationError(null);
  };

  const FREQUENCY_OPTIONS = [
    { value: 1, label: t.questionnaire.frequencyOptions[1] },
    { value: 2, label: t.questionnaire.frequencyOptions[2] },
    { value: 3, label: t.questionnaire.frequencyOptions[3] },
    { value: 4, label: t.questionnaire.frequencyOptions[4] },
    { value: 5, label: t.questionnaire.frequencyOptions[5] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-4 pb-24 overflow-y-auto">
      <div className="max-w-2xl mx-auto pt-8">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              {t.questionnaire.title}
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              {t.questionnaire.subtitle}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900">
                  {t.questionnaire.sportsPreferences}
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    {t.questionnaire.multiSelect}
                  </span>
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SPORTS_OPTIONS.map((sport) => (
                    <button
                      key={sport.id}
                      type="button"
                      onClick={() => toggleSport(sport.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedSports.includes(sport.id)
                          ? 'border-purple-600 bg-purple-50 shadow-md scale-105'
                          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow'
                      }`}
                    >
                      <div className="text-3xl mb-2">{sport.icon}</div>
                      <div
                        className={`text-sm font-medium ${
                          selectedSports.includes(sport.id)
                            ? 'text-purple-700'
                            : 'text-gray-700'
                        }`}
                      >
                        {sport.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900">
                  {t.questionnaire.bodyInfo}
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-sm text-gray-700">
                      {t.questionnaire.height}
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      placeholder={t.questionnaire.heightPlaceholder}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-sm text-gray-700">
                      {t.questionnaire.weight}
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      placeholder={t.questionnaire.weightPlaceholder}
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold text-gray-900">
                  {t.questionnaire.frequency}
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {FREQUENCY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFrequency(option.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        frequency === option.value
                          ? 'border-purple-600 bg-purple-50 shadow-md'
                          : 'border-gray-200 bg-white hover:border-purple-300'
                      }`}
                    >
                      <span
                        className={`text-sm font-medium ${
                          frequency === option.value
                            ? 'text-purple-700'
                            : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="goal" className="text-lg font-semibold text-gray-900">
                  {t.questionnaire.fitnessGoal}
                </Label>
                <Input
                  id="goal"
                  type="text"
                  placeholder={t.questionnaire.goalPlaceholder}
                  value={fitnessGoal}
                  onChange={(e) => setFitnessGoal(e.target.value)}
                  className="text-base"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 py-6 text-base font-semibold"
                disabled={loading}
              >
                {loading ? t.questionnaire.saving : t.questionnaire.complete}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {validationError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader>
              <CardTitle className="text-red-600 flex items-center gap-2">
                <span className="text-2xl">⚠️</span>
                {t.questionnaire.validation.invalidData}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{validationError}</p>
              <Button
                onClick={handleValidationDismiss}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
              >
                {t.common.confirm}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
