import React, { useState, useEffect } from 'react';
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
import { ArrowLeft, Share2, ChevronDown } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const RED = '#E63946';

const user1 = {
  name: 'Volkan Ali Bozdemir',
  subtitle: 'Kategori 1',
  avatar: 'https://i.pravatar.cc/150?img=3',
  initials: 'VB',
  color: '#60A5FA',
};

const user2 = {
  name: 'Zehra Canan Bozdemir',
  subtitle: 'Kategori 2',
  avatar: 'https://i.pravatar.cc/150?img=5',
  initials: 'ZB',
  color: '#34D399',
};

const metrics = [
  {
    label: 'Time',
    val1: '1:00:09',
    val2: '57:59',
    winner: 2,
    unit: '',
  },
  {
    label: 'Distance',
    val1: '5K',
    val2: '5K',
    winner: 0,
    unit: '',
  },
  {
    label: 'Pace',
    val1: '12:02',
    val2: '11:36',
    winner: 2,
    unit: 'min/km',
  },
  {
    label: 'Speed',
    val1: '4 km/s',
    val2: '5 km/s',
    winner: 2,
    unit: '',
  },
  {
    label: 'Calories',
    val1: '265',
    val2: '306',
    winner: 2,
    unit: 'kcal',
  },
  {
    label: 'Elevation',
    val1: '136',
    val2: '141',
    winner: 2,
    unit: 'm',
  },
];

export default function DuelScreen() {
  const router = useRouter();
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(1), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
          }}
        >
          <ArrowLeft size={20} color="#111" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: '900', color: '#111', letterSpacing: -0.3 }}>
          Bire bir yarış
        </Text>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F5F5F5',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Share2 size={18} color="#111" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Subtitle */}
        <View
          style={{
            backgroundColor: '#F8F8F8',
            marginHorizontal: 20,
            marginTop: 16,
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text style={{ fontSize: 12, color: '#6B7280', fontWeight: '600' }}>
            Kaydırın: Bu yarışa 5 puan toplarsın
          </Text>
          <ChevronDown size={14} color="#9CA3AF" strokeWidth={2} />
        </View>

        {/* VS Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 16,
          }}
        >
          {/* User 1 */}
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: user1.color + '22',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                borderColor: user1.color,
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: '900', color: user1.color }}>
                {user1.initials}
              </Text>
            </View>
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#111', textAlign: 'center' }}>
              {user1.name}
            </Text>
            <Text style={{ fontSize: 10, color: '#9CA3AF', marginTop: 1 }}>{user1.subtitle}</Text>
          </View>

          {/* VS Badge */}
          <View style={{ alignItems: 'center', paddingHorizontal: 8 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: RED,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: RED,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.4,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '900' }}>VS</Text>
            </View>
          </View>

          {/* User 2 */}
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: user2.color + '22',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 3,
                borderColor: user2.color,
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: '900', color: user2.color }}>
                {user2.initials}
              </Text>
            </View>
            <Text style={{ fontSize: 12, fontWeight: '800', color: '#111', textAlign: 'center' }}>
              {user2.name}
            </Text>
            <Text style={{ fontSize: 10, color: '#9CA3AF', marginTop: 1 }}>{user2.subtitle}</Text>
          </View>
        </View>

        {/* Date */}
        <View style={{ alignItems: 'center', marginBottom: 16 }}>
          <Text style={{ fontSize: 12, color: '#9CA3AF', fontWeight: '600' }}>8 May 2021</Text>
        </View>

        {/* Metrics Table */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: '#FFF',
            borderRadius: 20,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#F0F0F0',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 4,
            marginBottom: 20,
          }}
        >
          {metrics.map((metric, idx) => (
            <View key={metric.label}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  backgroundColor: idx % 2 === 0 ? '#FFF' : '#FAFAFA',
                }}
              >
                {/* Value 1 */}
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '900',
                      color: metric.winner === 1 ? RED : '#111',
                      letterSpacing: -0.5,
                    }}
                  >
                    {metric.val1}
                  </Text>
                  {metric.unit ? (
                    <Text style={{ fontSize: 10, color: '#9CA3AF', fontWeight: '500' }}>
                      {metric.unit}
                    </Text>
                  ) : null}
                </View>

                {/* Label */}
                <View style={{ alignItems: 'center', minWidth: 80 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '700',
                      color: '#9CA3AF',
                      textAlign: 'center',
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    {metric.label}
                  </Text>
                  {metric.winner !== 0 && (
                    <View
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: metric.winner === 1 ? user1.color : user2.color,
                        marginTop: 4,
                      }}
                    />
                  )}
                </View>

                {/* Value 2 */}
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '900',
                      color: metric.winner === 2 ? RED : '#111',
                      letterSpacing: -0.5,
                    }}
                  >
                    {metric.val2}
                  </Text>
                  {metric.unit ? (
                    <Text style={{ fontSize: 10, color: '#9CA3AF', fontWeight: '500' }}>
                      {metric.unit}
                    </Text>
                  ) : null}
                </View>
              </View>

              {idx < metrics.length - 1 && (
                <View
                  style={{ height: 1, backgroundColor: '#F0F0F0', marginHorizontal: 20 }}
                />
              )}
            </View>
          ))}
        </View>

        {/* Winner Badge */}
        <View
          style={{
            backgroundColor: user2.color + '15',
            marginHorizontal: 20,
            borderRadius: 16,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
            borderWidth: 1.5,
            borderColor: user2.color + '30',
          }}
        >
          <Text style={{ fontSize: 28 }}>🏆</Text>
          <View>
            <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '600' }}>Winner</Text>
            <Text style={{ fontSize: 16, fontWeight: '900', color: '#111' }}>
              {user2.name}
            </Text>
            <Text style={{ fontSize: 12, color: user2.color, fontWeight: '700', marginTop: 1 }}>
              Better pace & speed achieved
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginBottom: 24 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 14,
              borderWidth: 2,
              borderColor: '#E5E7EB',
              paddingVertical: 14,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '800', color: '#6B7280' }}>Share Race</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 14,
              backgroundColor: RED,
              paddingVertical: 14,
              alignItems: 'center',
              shadowColor: RED,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: '800', color: '#FFF' }}>Detailed Analysis</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
