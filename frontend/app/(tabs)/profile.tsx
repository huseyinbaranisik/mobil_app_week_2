import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Settings,
  ChevronRight,
  Award,
  Activity,
  Flame,
  Heart,
  Utensils,
  Calculator,
  Bell,
  Shield,
  LogOut,
  Star,
  TrendingUp,
} from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const RED = '#E63946';

const stats = [
  { label: 'Workouts', value: '124', unit: 'total', color: '#E63946' },
  { label: 'Distance', value: '456', unit: 'km', color: '#60A5FA' },
  { label: 'Calories', value: '28.4K', unit: 'kcal', color: '#FBBF24' },
  { label: 'Streak', value: '14', unit: 'days', color: '#34D399' },
];

const achievements = [
  { icon: '🏃', title: 'First 5K', date: 'Jan 2026', earned: true },
  { icon: '🔥', title: '7-Day Streak', date: 'Dec 2025', earned: true },
  { icon: '⚡', title: 'Speed Demon', date: 'Nov 2025', earned: true },
  { icon: '🏔️', title: '1000m Elevation', date: '—', earned: false },
];

const menuSections = [
  {
    title: 'Health Tools',
    items: [
      { icon: Utensils, label: 'Calorie Index', route: '/calorie-index', color: '#E63946' },
      { icon: Calculator, label: 'BMR Calculator', route: '/bmr-calculator', color: '#60A5FA' },
      { icon: Activity, label: 'Body Metrics', color: '#34D399' },
      { icon: Heart, label: 'Heart Rate Zones', color: '#F97316' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { icon: Bell, label: 'Notifications', color: '#A78BFA' },
      { icon: Shield, label: 'Privacy & Security', color: '#6B7280' },
      { icon: Settings, label: 'App Settings', color: '#9CA3AF' },
    ],
  },
];

function RingProgress({ progress, size = 60, stroke = 6, color = RED }: {
  progress: number;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const strokeDashoffset = circ * (1 - progress);
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: [{ rotate: '-90deg' }] }}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke="#F0F0F0" strokeWidth={stroke} fill="none" />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingTop: 12,
            paddingBottom: 16,
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: '900', color: '#111', letterSpacing: -0.5 }}>
            Profile
          </Text>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#FFF',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Settings size={18} color="#111" strokeWidth={1.8} />
          </TouchableOpacity>
        </View>

        {/* Profile Hero */}
        <View
          style={{
            backgroundColor: '#FFF',
            marginHorizontal: 20,
            borderRadius: 24,
            padding: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 4,
            marginBottom: 16,
          }}
        >
          <View style={{ position: 'relative', marginBottom: 12 }}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 3,
                borderColor: RED,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: RED,
                borderRadius: 10,
                width: 22,
                height: 22,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: '#FFF',
              }}
            >
              <Text style={{ color: '#FFF', fontSize: 12 }}>✏️</Text>
            </View>
          </View>

          <Text style={{ fontSize: 20, fontWeight: '900', color: '#111', marginBottom: 2 }}>
            Alex Kowalski
          </Text>
          <Text style={{ fontSize: 13, color: '#9CA3AF', fontWeight: '500', marginBottom: 12 }}>
            @alexfit · Istanbul, Turkey
          </Text>

          <View
            style={{
              backgroundColor: RED + '15',
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 6,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              marginBottom: 16,
            }}
          >
            <Star size={14} color={RED} strokeWidth={2.5} fill={RED} />
            <Text style={{ fontSize: 13, fontWeight: '800', color: RED }}>Pro Athlete · Level 12</Text>
          </View>

          {/* Progress rings */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
            {[
              { label: 'Goal', progress: 0.78, color: RED },
              { label: 'Fitness', progress: 0.65, color: '#60A5FA' },
              { label: 'Nutrition', progress: 0.52, color: '#FBBF24' },
            ].map((ring) => (
              <View key={ring.label} style={{ alignItems: 'center' }}>
                <View style={{ position: 'relative', width: 56, height: 56, alignItems: 'center', justifyContent: 'center' }}>
                  <RingProgress progress={ring.progress} size={56} stroke={5} color={ring.color} />
                  <View style={{ position: 'absolute' }}>
                    <Text style={{ fontSize: 12, fontWeight: '900', color: '#111', textAlign: 'center' }}>
                      {Math.round(ring.progress * 100)}%
                    </Text>
                  </View>
                </View>
                <Text style={{ fontSize: 10, color: '#9CA3AF', fontWeight: '600', marginTop: 4 }}>
                  {ring.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Grid */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 10, marginBottom: 16 }}>
          {stats.map((stat) => (
            <View
              key={stat.label}
              style={{
                width: (SCREEN_WIDTH - 50) / 2,
                backgroundColor: '#FFF',
                borderRadius: 18,
                padding: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: stat.color + '18',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <TrendingUp size={18} color={stat.color} strokeWidth={2.5} />
              </View>
              <Text style={{ fontSize: 24, fontWeight: '900', color: '#111', letterSpacing: -1 }}>
                {stat.value}
              </Text>
              <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600', marginTop: 2 }}>
                {stat.unit} · {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View
          style={{
            backgroundColor: '#FFF',
            marginHorizontal: 20,
            borderRadius: 24,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.06,
            shadowRadius: 8,
            elevation: 2,
            marginBottom: 16,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <Text style={{ fontSize: 16, fontWeight: '800', color: '#111' }}>Achievements</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 12, color: RED, fontWeight: '700' }}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {achievements.map((ach) => (
              <View
                key={ach.title}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  opacity: ach.earned ? 1 : 0.4,
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: ach.earned ? '#FFF8E0' : '#F5F5F5',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: ach.earned ? 2 : 1,
                    borderColor: ach.earned ? '#FBBF24' : '#E5E7EB',
                    marginBottom: 6,
                  }}
                >
                  <Text style={{ fontSize: 22 }}>{ach.icon}</Text>
                </View>
                <Text style={{ fontSize: 9, fontWeight: '700', color: '#111', textAlign: 'center', lineHeight: 12 }}>
                  {ach.title}
                </Text>
                <Text style={{ fontSize: 8, color: '#9CA3AF', marginTop: 2 }}>{ach.date}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <View key={section.title} style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '700',
                color: '#9CA3AF',
                paddingHorizontal: 20,
                marginBottom: 8,
                letterSpacing: 0.8,
              }}
            >
              {section.title.toUpperCase()}
            </Text>
            <View
              style={{
                backgroundColor: '#FFF',
                marginHorizontal: 20,
                borderRadius: 20,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              {section.items.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <View key={item.label}>
                    <TouchableOpacity
                      onPress={() => (item as any).route && router.push((item as any).route)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 16,
                        paddingVertical: 15,
                      }}
                    >
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          backgroundColor: item.color + '18',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 14,
                        }}
                      >
                        <Icon size={18} color={item.color} strokeWidth={2} />
                      </View>
                      <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: '#111' }}>
                        {item.label}
                      </Text>
                      <ChevronRight size={16} color="#D1D5DB" strokeWidth={2} />
                    </TouchableOpacity>
                    {idx < section.items.length - 1 && (
                      <View style={{ height: 1, backgroundColor: '#F5F5F5', marginLeft: 66 }} />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

        {/* Sign Out */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 20,
            paddingVertical: 16,
            borderRadius: 16,
            borderWidth: 1.5,
            borderColor: '#FEE2E2',
            backgroundColor: '#FFF5F5',
            marginBottom: 32,
            gap: 8,
          }}
        >
          <LogOut size={16} color={RED} strokeWidth={2} />
          <Text style={{ fontSize: 15, fontWeight: '700', color: RED }}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
