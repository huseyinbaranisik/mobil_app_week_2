import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Info } from 'lucide-react-native';

const RED = '#E63946';

function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

const activityLevels = [
  { id: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise', multiplier: 1.2 },
  { id: 'light', label: 'Lightly Active', desc: '1-3 days/week', multiplier: 1.375 },
  { id: 'moderate', label: 'Moderately Active', desc: '3-5 days/week', multiplier: 1.55 },
  { id: 'very', label: 'Very Active', desc: '6-7 days/week', multiplier: 1.725 },
  { id: 'extra', label: 'Extra Active', desc: 'Physical job + training', multiplier: 1.9 },
];

export default function BMRScreen() {
  const router = useRouter();
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [age, setAge] = useState('28');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!w || !h || !a) return;
    const bmr = calculateBMR(w, h, a, gender);
    setResult(Math.round(bmr));
  };

  const selectedActivity = activityLevels.find((l) => l.id === activityLevel);
  const tdee = result ? Math.round(result * (selectedActivity?.multiplier || 1.55)) : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: '#F0F0F0',
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F5F5F5',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <ArrowLeft size={20} color="#111" strokeWidth={2} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 10, color: '#9CA3AF', fontWeight: '700', letterSpacing: 1 }}>
            HEALTH TOOLS
          </Text>
          <Text style={{ fontSize: 18, fontWeight: '900', color: '#111' }}>Basal Metabolizma</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Info Banner */}
          <View
            style={{
              backgroundColor: '#F0F9FF',
              marginHorizontal: 20,
              marginTop: 16,
              borderRadius: 16,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 10,
              marginBottom: 20,
            }}
          >
            <View style={{ marginTop: 1 }}><Info size={16} color="#1A7FC1" strokeWidth={2} /></View>
            <Text style={{ flex: 1, fontSize: 12, color: '#1A7FC1', lineHeight: 18, fontWeight: '500' }}>
              Basal Metabolic Rate (BMR) is the number of calories your body needs at rest. Multiply by your activity level to get daily caloric needs (TDEE).
            </Text>
          </View>

          {/* Gender Selector */}
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#111', marginBottom: 10 }}>
              Gender
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {(['male', 'female'] as const).map((g) => (
                <TouchableOpacity
                  key={g}
                  onPress={() => setGender(g)}
                  style={{
                    flex: 1,
                    paddingVertical: 14,
                    borderRadius: 14,
                    alignItems: 'center',
                    backgroundColor: gender === g ? RED : '#F5F5F5',
                    borderWidth: gender === g ? 0 : 1.5,
                    borderColor: '#E5E7EB',
                  }}
                >
                  <Text style={{ fontSize: 20, marginBottom: 4 }}>
                    {g === 'male' ? '♂' : '♀'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: gender === g ? '#FFF' : '#6B7280',
                      textTransform: 'capitalize',
                    }}
                  >
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Inputs */}
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              {[
                { label: 'Weight (kg)', value: weight, setter: setWeight, placeholder: '70' },
                { label: 'Height (cm)', value: height, setter: setHeight, placeholder: '175' },
                { label: 'Age', value: age, setter: setAge, placeholder: '28' },
              ].map((input) => (
                <View key={input.label} style={{ flex: 1 }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#9CA3AF', marginBottom: 6, letterSpacing: 0.5 }}>
                    {input.label.toUpperCase()}
                  </Text>
                  <TextInput
                    value={input.value}
                    onChangeText={input.setter}
                    keyboardType="numeric"
                    placeholder={input.placeholder}
                    placeholderTextColor="#D1D5DB"
                    style={{
                      backgroundColor: '#F5F5F5',
                      borderRadius: 12,
                      paddingHorizontal: 12,
                      paddingVertical: 14,
                      fontSize: 18,
                      fontWeight: '800',
                      color: '#111',
                      textAlign: 'center',
                    }}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Activity Level */}
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#111', marginBottom: 10 }}>
              Activity Level
            </Text>
            <View style={{ gap: 8 }}>
              {activityLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  onPress={() => setActivityLevel(level.id)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: activityLevel === level.id ? RED + '10' : '#F5F5F5',
                    borderRadius: 14,
                    padding: 14,
                    borderWidth: 1.5,
                    borderColor: activityLevel === level.id ? RED : 'transparent',
                  }}
                >
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: activityLevel === level.id ? RED : '#D1D5DB',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 12,
                    }}
                  >
                    {activityLevel === level.id && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: RED,
                        }}
                      />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '700',
                        color: activityLevel === level.id ? RED : '#111',
                      }}
                    >
                      {level.label}
                    </Text>
                    <Text style={{ fontSize: 11, color: '#9CA3AF', marginTop: 1 }}>
                      {level.desc} · ×{level.multiplier}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Calculate Button */}
          <TouchableOpacity
            onPress={handleCalculate}
            style={{
              backgroundColor: RED,
              marginHorizontal: 20,
              borderRadius: 16,
              paddingVertical: 16,
              alignItems: 'center',
              shadowColor: RED,
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.35,
              shadowRadius: 12,
              elevation: 6,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 }}>
              HESAPLA / CALCULATE
            </Text>
          </TouchableOpacity>

          {/* Results */}
          {result !== null && (
            <View style={{ paddingHorizontal: 20, marginBottom: 32 }}>
              <View
                style={{
                  backgroundColor: '#111111',
                  borderRadius: 20,
                  padding: 20,
                  gap: 16,
                }}
              >
                <Text style={{ color: '#9CA3AF', fontSize: 12, fontWeight: '700', letterSpacing: 1 }}>
                  YOUR RESULTS
                </Text>
                {/* BMR */}
                <View style={{ alignItems: 'center', paddingVertical: 8 }}>
                  <Text style={{ color: '#6B7280', fontSize: 13, fontWeight: '600' }}>
                    Basal Metabolic Rate (BMR)
                  </Text>
                  <Text
                    style={{
                      color: RED,
                      fontSize: 52,
                      fontWeight: '900',
                      letterSpacing: -2,
                      marginTop: 4,
                    }}
                  >
                    {result}
                  </Text>
                  <Text style={{ color: '#9CA3AF', fontSize: 14, fontWeight: '600' }}>
                    kcal / day (at rest)
                  </Text>
                </View>

                {/* Divider */}
                <View style={{ height: 1, backgroundColor: '#222' }} />

                {/* TDEE */}
                <View style={{ alignItems: 'center', paddingVertical: 4 }}>
                  <Text style={{ color: '#6B7280', fontSize: 13, fontWeight: '600' }}>
                    Total Daily Energy (TDEE)
                  </Text>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 40,
                      fontWeight: '900',
                      letterSpacing: -1.5,
                      marginTop: 4,
                    }}
                  >
                    {tdee}
                  </Text>
                  <Text style={{ color: '#9CA3AF', fontSize: 14, fontWeight: '600' }}>
                    kcal / day (with activity)
                  </Text>
                </View>

                {/* Goals */}
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {[
                    { label: 'Lose Weight', kcal: (tdee || 0) - 500, color: '#34D399' },
                    { label: 'Maintain', kcal: tdee || 0, color: '#FBBF24' },
                    { label: 'Gain Muscle', kcal: (tdee || 0) + 500, color: '#60A5FA' },
                  ].map((goal) => (
                    <View
                      key={goal.label}
                      style={{
                        flex: 1,
                        backgroundColor: '#1A1A1A',
                        borderRadius: 14,
                        padding: 12,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: goal.color, fontSize: 16, fontWeight: '900' }}>
                        {goal.kcal}
                      </Text>
                      <Text style={{ color: '#6B7280', fontSize: 9, fontWeight: '600', textAlign: 'center', marginTop: 2 }}>
                        {goal.label}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
