import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions,
  StatusBar,
  Animated,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath, Rect } from 'react-native-svg';
import { Bell, Plus, Droplets, X, Clock, Zap, ChevronRight } from 'lucide-react-native';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/components/ToastProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const RED = '#E63946';

const EXERCISE_DETAILS: Record<string, { description: string; duration: string; level: string; exercises: string[] }> = {
  '1': {
    description: 'Kickstart your day with energizing morning exercises that boost metabolism and flexibility.',
    duration: '25–40 min',
    level: 'Beginner',
    exercises: ['Jumping Jacks', 'High Knees', 'Arm Circles', 'Torso Twists', 'Standing Toe Touch', 'Neck Rolls', 'Hip Circles', 'March in Place'],
  },
  '2': {
    description: 'Find your inner balance with guided yoga routines for flexibility, strength, and mindfulness.',
    duration: '30–60 min',
    level: 'All Levels',
    exercises: ['Sun Salutation', 'Downward Dog', 'Warrior I', 'Warrior II', 'Tree Pose', 'Child\'s Pose', 'Cobra Pose', 'Savasana', 'Cat-Cow', 'Pigeon Pose', 'Bridge Pose', 'Seated Forward Fold'],
  },
  '3': {
    description: 'Effective home workouts requiring zero equipment. Perfect for any small space.',
    duration: '20–45 min',
    level: 'Intermediate',
    exercises: ['Push-Ups', 'Bodyweight Squats', 'Lunges', 'Plank', 'Mountain Climbers', 'Burpees', 'Tricep Dips', 'Glute Bridges', 'Side Plank', 'Diamond Push-Ups', 'Reverse Lunges', 'Superman Hold', 'Flutter Kicks', 'Wall Sit', 'Bear Crawl'],
  },
  '4': {
    description: 'Discreet desk exercises to stay active throughout your workday without leaving the office.',
    duration: '5–15 min',
    level: 'Beginner',
    exercises: ['Desk Push-Ups', 'Chair Squats', 'Calf Raises', 'Seated Leg Raises', 'Shoulder Shrugs', 'Wrist Stretches', 'Neck Stretches', 'Ankle Rotations', 'Seated Torso Twist', 'Eye Rest Exercise'],
  },
  '5': {
    description: 'Inclusive sports designed for all abilities. Adaptive exercises that everyone can enjoy.',
    duration: '20–40 min',
    level: 'All Abilities',
    exercises: ['Seated Arm Circles', 'Chair Marching', 'Seated Leg Extensions', 'Hand Squeezes', 'Seated Trunk Rotation', 'Resistance Band Pulls'],
  },
  '6': {
    description: 'Guided visual and audio-based sports experiences for users with visual impairments.',
    duration: '20–35 min',
    level: 'All Levels',
    exercises: ['Audio-Guided Walk', 'Balance Training', 'Tactile Ball Exercises', 'Partner Running', 'Rhythm Clapping', 'Seated Stretching'],
  },
};

const exerciseCategories = [
  { id: '1', title: 'Morning\nExercises', subtitle: '8 Exercises', color: '#FF6B6B', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80' },
  { id: '2', title: 'Yoga', subtitle: '12 Exercises', color: '#A78BFA', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80' },
  { id: '3', title: 'Home\nSports', subtitle: '15 Exercises', color: '#34D399', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80' },
  { id: '4', title: 'Office\nSports', subtitle: '10 Exercises', color: '#60A5FA', image: 'https://images.unsplash.com/photo-1522898467493-49726bf28798?w=400&q=80' },
  { id: '5', title: 'Accessible\nSports', subtitle: '6 Exercises', color: '#FBBF24', image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80' },
  { id: '6', title: 'Visual\nSports', subtitle: '5 Exercises', color: '#F97316', image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&q=80' },
];

function WaterSilhouette({ fillPercent }: { fillPercent: number }) {
  const svgWidth = 160;
  const svgHeight = 280;
  const clampedFill = Math.max(0, Math.min(fillPercent, 100));
  const fillY = svgHeight * (1 - clampedFill / 100);

  const silhouettePath = `
    M 80 10
    C 95 10, 105 20, 105 35
    C 105 50, 95 60, 80 60
    C 65 60, 55 50, 55 35
    C 55 20, 65 10, 80 10
    Z
    M 60 65 C 40 68, 28 80, 25 100 L 20 145 L 45 148 L 50 120 L 50 185
    L 30 270 L 55 270 L 80 200 L 105 270 L 130 270 L 110 185 L 110 120
    L 115 148 L 140 145 L 135 100 C 132 80, 120 68, 100 65 Z
  `;

  return (
    <Svg width={svgWidth} height={svgHeight} viewBox="0 0 160 280">
      <Defs>
        <LinearGradient id="waterGradH" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#5BC8F5" stopOpacity="0.9" />
          <Stop offset="1" stopColor="#1A7FC1" stopOpacity="1" />
        </LinearGradient>
        <ClipPath id="silhouetteClipH">
          <Path d={silhouettePath} />
        </ClipPath>
        <ClipPath id="waterClipH">
          <Rect x="0" y={fillY} width={svgWidth} height={svgHeight} />
        </ClipPath>
      </Defs>
      <Path d={silhouettePath} fill="#E8F4FD" stroke="#B8DDF5" strokeWidth="2" />
      <Path d={silhouettePath} fill="url(#waterGradH)" clipPath="url(#waterClipH)" />
      <Path
        d={`M 0 ${fillY + 3} Q 40 ${fillY - 6} 80 ${fillY + 3} Q 120 ${fillY + 12} 160 ${fillY + 3} L 160 ${svgHeight} L 0 ${svgHeight} Z`}
        fill="url(#waterGradH)"
        clipPath="url(#silhouetteClipH)"
        opacity={0.4}
      />
    </Svg>
  );
}

function PressableButton({
  onPress,
  children,
  style,
}: {
  onPress: () => void;
  children: React.ReactNode;
  style: object;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scale, { toValue: 0.94, useNativeDriver: true, speed: 40 }).start();
  const onPressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 40 }).start();

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[style, { transform: [{ scale }] }]}>{children}</Animated.View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const { waterIntake, waterGoal, addWater, resetWater } = useAppStore();
  const { showToast } = useToast();
  const fillPercent = Math.min((waterIntake / waterGoal) * 100, 100);

  const [selectedExercise, setSelectedExercise] = useState<(typeof exerciseCategories)[0] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddWater = (amount: number) => {
    if (waterIntake >= waterGoal) {
      showToast('Daily water goal already reached! 💧', 'info');
      return;
    }
    addWater(amount);
    const newIntake = Math.min(waterIntake + amount, waterGoal);
    if (newIntake >= waterGoal) {
      showToast('Daily water goal reached! 🎉', 'success');
    } else {
      showToast(`+${amount} ml added`, 'success');
    }
  };

  const openExercise = (cat: (typeof exerciseCategories)[0]) => {
    setSelectedExercise(cat);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedExercise(null), 300);
  };

  const detail = selectedExercise ? EXERCISE_DETAILS[selectedExercise.id] : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 }}>
          <View>
            <Text style={{ fontSize: 13, color: '#9CA3AF', fontWeight: '500' }}>Good Morning</Text>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#111111', letterSpacing: -0.5 }}>
              Vitality Connect
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <TouchableOpacity
              onPress={() => showToast('No new notifications', 'info')}
              style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFF', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 }}
            >
              <Bell size={20} color="#111" strokeWidth={1.8} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showToast('Profile coming soon', 'coming-soon')}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={{ width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: RED }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Row */}
        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginBottom: 16, gap: 10 }}>
          {[
            { label: 'Steps', value: '8,432', unit: 'steps' },
            { label: 'Calories', value: '342', unit: 'kcal' },
            { label: 'Distance', value: '5.2', unit: 'km' },
          ].map((stat) => (
            <TouchableOpacity
              key={stat.label}
              onPress={() => showToast(`${stat.label}: ${stat.value} ${stat.unit}`, 'info')}
              style={{ flex: 1, backgroundColor: '#FFF', borderRadius: 16, padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 }}
            >
              <Text style={{ fontSize: 18, fontWeight: '800', color: '#111' }}>{stat.value}</Text>
              <Text style={{ fontSize: 10, color: '#9CA3AF', fontWeight: '500', marginTop: 1 }}>{stat.unit}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Water Tracker Card */}
        <View style={{ backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 24, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Droplets size={18} color={RED} strokeWidth={2} />
              <Text style={{ fontSize: 16, fontWeight: '800', color: '#111', marginLeft: 6 }}>Daily Water Intake</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                resetWater();
                showToast('Water intake reset to 0', 'info');
              }}
            >
              <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600' }}>Reset</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 16 }}>Daily goal: {waterGoal} ml</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ alignItems: 'center' }}>
              <WaterSilhouette fillPercent={fillPercent} />
              <View style={{ marginTop: 8, alignItems: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: '900', color: '#1A7FC1' }}>{waterIntake}</Text>
                <Text style={{ fontSize: 12, color: '#9CA3AF', fontWeight: '600' }}>/ {waterGoal} ml</Text>
              </View>
            </View>

            <View style={{ flex: 1, paddingLeft: 20, gap: 10 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#111', marginBottom: 4 }}>Add water</Text>
              {[200, 350, 500].map((amount) => (
                <PressableButton
                  key={amount}
                  onPress={() => handleAddWater(amount)}
                  style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: waterIntake >= waterGoal ? '#F5F5F5' : '#F0F9FF', borderRadius: 12, padding: 12, borderWidth: 1.5, borderColor: waterIntake >= waterGoal ? '#E5E7EB' : '#B8DDF5' }}
                >
                  <Plus size={14} color={waterIntake >= waterGoal ? '#9CA3AF' : '#1A7FC1'} strokeWidth={2.5} />
                  <Text style={{ fontSize: 14, fontWeight: '700', color: waterIntake >= waterGoal ? '#9CA3AF' : '#1A7FC1', marginLeft: 6 }}>
                    {amount} ml
                  </Text>
                </PressableButton>
              ))}
              <View style={{ backgroundColor: '#F0F9FF', borderRadius: 10, height: 6, marginTop: 4, overflow: 'hidden' }}>
                <View style={{ backgroundColor: '#1A7FC1', height: '100%', width: `${fillPercent}%`, borderRadius: 10 }} />
              </View>
              <Text style={{ fontSize: 11, color: fillPercent >= 100 ? '#22C55E' : '#9CA3AF', textAlign: 'right', fontWeight: fillPercent >= 100 ? '700' : '400' }}>
                {fillPercent >= 100 ? '✓ Goal reached!' : `${Math.round(fillPercent)}% of daily goal`}
              </Text>
            </View>
          </View>
        </View>

        {/* Daily Exercises */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#111', letterSpacing: -0.3 }}>Daily Exercises</Text>
            <TouchableOpacity onPress={() => showToast('Full exercise library coming soon', 'coming-soon')}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: RED }}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            {exerciseCategories.map((cat) => (
              <TouchableHighlight
                key={cat.id}
                onPress={() => openExercise(cat)}
                underlayColor="transparent"
                style={{ width: (SCREEN_WIDTH - 52) / 2, height: 140, borderRadius: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 }}
              >
                <View style={{ width: '100%', height: '100%' }}>
                  <Image source={{ uri: cat.image }} style={{ width: '100%', height: '100%', position: 'absolute' }} resizeMode="cover" />
                  <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.38)' }} />
                  <View style={{ position: 'absolute', top: 10, right: 10 }}>
                    <View style={{ backgroundColor: RED, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 }}>
                      <Text style={{ color: '#FFF', fontSize: 9, fontWeight: '700' }}>NEW</Text>
                    </View>
                  </View>
                  <View style={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                    <Text style={{ color: '#FFF', fontSize: 15, fontWeight: '800', lineHeight: 18 }}>{cat.title}</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, marginTop: 2 }}>{cat.subtitle}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </View>

        {/* Next Reminder */}
        <TouchableOpacity
          onPress={() => showToast('Reminder set for 06:00 PM', 'success')}
          style={{ backgroundColor: RED, marginHorizontal: 20, borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}
        >
          <View>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' }}>Next Reminder</Text>
            <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '900', marginTop: 2 }}>06:00 PM</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, marginTop: 2 }}>
              {waterGoal - waterIntake > 0 ? `${waterGoal - waterIntake} ml remaining` : 'Goal complete!'}
            </Text>
          </View>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, padding: 16, alignItems: 'center' }}>
            <Droplets size={28} color="#FFF" strokeWidth={2} />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Exercise Detail Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} onPress={closeModal}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingBottom: 40 }}>
              {selectedExercise && (
                <>
                  <Image source={{ uri: selectedExercise.image }} style={{ width: '100%', height: 180, borderTopLeftRadius: 28, borderTopRightRadius: 28 }} resizeMode="cover" />
                  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 180, borderTopLeftRadius: 28, borderTopRightRadius: 28, backgroundColor: 'rgba(0,0,0,0.35)' }} />
                  <TouchableOpacity onPress={closeModal} style={{ position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                    <X size={18} color="#FFF" strokeWidth={2.5} />
                  </TouchableOpacity>
                  <View style={{ position: 'absolute', top: 130, left: 20 }}>
                    <Text style={{ color: '#FFF', fontSize: 22, fontWeight: '900' }}>{selectedExercise.title.replace('\n', ' ')}</Text>
                    <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{selectedExercise.subtitle}</Text>
                  </View>

                  <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, gap: 6 }}>
                        <Clock size={14} color="#6B7280" strokeWidth={2} />
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#6B7280' }}>{detail?.duration}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, gap: 6 }}>
                        <Zap size={14} color="#6B7280" strokeWidth={2} />
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#6B7280' }}>{detail?.level}</Text>
                      </View>
                    </View>

                    <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 16 }}>{detail?.description}</Text>

                    <Text style={{ fontSize: 14, fontWeight: '800', color: '#111', marginBottom: 10 }}>Exercises</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                      {detail?.exercises.map((ex) => (
                        <View key={ex} style={{ backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6 }}>
                          <Text style={{ fontSize: 12, color: '#374151', fontWeight: '600' }}>{ex}</Text>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity
                      onPress={() => {
                        closeModal();
                        showToast(`${selectedExercise?.title.replace('\n', ' ')} started! 💪`, 'success');
                      }}
                      style={{ backgroundColor: RED, borderRadius: 16, paddingVertical: 16, alignItems: 'center', shadowColor: RED, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 }}
                    >
                      <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '900', letterSpacing: 0.5 }}>START WORKOUT</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
