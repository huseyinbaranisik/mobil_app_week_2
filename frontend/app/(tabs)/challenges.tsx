import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Trophy,
  Users,
  BarChart2,
  Medal,
  TrendingUp,
  Flame,
  Target,
  ChevronRight,
  Swords,
  X,
  CheckCircle,
  Globe,
} from 'lucide-react-native';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/components/ToastProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const RED = '#E63946';

const leaderboard = [
  { rank: 1, name: 'Volkan Bozdemir', avatar: 'https://i.pravatar.cc/150?img=3', score: 4831, badge: '🥇' },
  { rank: 2, name: 'Zehra Canan', avatar: 'https://i.pravatar.cc/150?img=5', score: 4210, badge: '🥈' },
  { rank: 3, name: 'Ahmet Yılmaz', avatar: 'https://i.pravatar.cc/150?img=7', score: 3920, badge: '🥉' },
  { rank: 4, name: 'Selin Kara', avatar: 'https://i.pravatar.cc/150?img=9', score: 3640, badge: '4' },
  { rank: 5, name: 'Burak Doğan', avatar: 'https://i.pravatar.cc/150?img=11', score: 3120, badge: '5' },
];

const menuItems = [
  { num: '01', title: 'World Challenge', subtitle: 'Compete with athletes worldwide.', icon: Trophy, action: 'world' },
  { num: '02', title: 'Join a Challenge', subtitle: 'Browse active challenges and join one.', icon: Users, action: 'join' },
  { num: '03', title: 'Compare Stats', subtitle: 'Compare your performance with others.', icon: BarChart2, action: 'stats' },
  { num: '04', title: 'Leaderboard', subtitle: 'See who ranks first globally.', icon: Medal, action: 'leaderboard' },
  { num: '05', title: 'Track Progress', subtitle: 'Follow your improvement over time.', icon: TrendingUp, action: 'progress' },
];

const activeChallenges = [
  { title: '30-Day Running Streak', participants: 1240, daysLeft: 14, progress: 0.5, icon: Flame, color: '#FF6B35' },
  { title: 'Weekly 50km Goal', participants: 890, daysLeft: 3, progress: 0.72, icon: Target, color: '#60A5FA' },
  { title: 'Daily 10K Steps', participants: 2100, daysLeft: 7, progress: 0.35, icon: Globe, color: '#A78BFA' },
];

export default function ChallengesScreen() {
  const [activeTab, setActiveTab] = useState<'menu' | 'leaderboard'>('menu');
  const [challengeModal, setChallengeModal] = useState<typeof activeChallenges[0] | null>(null);
  const router = useRouter();
  const { joinedChallenges, joinChallenge } = useAppStore();
  const { showToast } = useToast();

  const handleMenuAction = (action: string) => {
    if (action === 'leaderboard') {
      setActiveTab('leaderboard');
    } else if (action === 'world') {
      showToast('World Challenge season starts Feb 28', 'info');
    } else if (action === 'stats') {
      router.push('/duel');
    } else if (action === 'join') {
      showToast('Browse challenges below ↓', 'info');
    } else if (action === 'progress') {
      showToast('Progress tracking coming soon', 'coming-soon');
    }
  };

  const handleJoinChallenge = (challenge: typeof activeChallenges[0]) => {
    if (joinedChallenges.has(challenge.title)) {
      showToast(`Already joined "${challenge.title}"`, 'info');
    } else {
      joinChallenge(challenge.title);
      showToast(`Joined "${challenge.title}"! 🔥`, 'success');
    }
    setChallengeModal(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Dark Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 }}>
          <Text style={{ fontSize: 13, color: '#6B7280', fontWeight: '500' }}>Gamified</Text>
          <Text style={{ fontSize: 26, fontWeight: '900', color: '#FFFFFF', letterSpacing: -0.5 }}>
            DÜNYAYA MEYDAN OKU
          </Text>
          <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Challenge the world & start now</Text>
        </View>

        {/* Tab Switcher */}
        <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 16, backgroundColor: '#1A1A1A', borderRadius: 14, padding: 4 }}>
          {(['menu', 'leaderboard'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={{ flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center', backgroundColor: activeTab === tab ? RED : 'transparent' }}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: activeTab === tab ? '#FFF' : '#6B7280', textTransform: 'capitalize' }}>
                {tab === 'menu' ? 'Challenges' : 'Leaderboard'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'menu' ? (
          <View style={{ paddingHorizontal: 20, gap: 10, paddingBottom: 20 }}>
            {/* 1v1 Duel CTA */}
            <TouchableOpacity
              onPress={() => router.push('/duel')}
              style={{ backgroundColor: RED, borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}
            >
              <View>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '600' }}>LIVE NOW</Text>
                <Text style={{ color: '#FFF', fontSize: 20, fontWeight: '900', marginTop: 2 }}>1v1 Match</Text>
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 }}>Challenge a friend to a duel</Text>
              </View>
              <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 16, padding: 16 }}>
                <Swords size={28} color="#FFF" strokeWidth={2} />
              </View>
            </TouchableOpacity>

            {/* Menu Items */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <TouchableOpacity
                  key={item.num}
                  onPress={() => handleMenuAction(item.action)}
                  style={{ backgroundColor: '#111111', borderRadius: 18, padding: 18, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#222222' }}
                >
                  <View style={{ marginRight: 16 }}>
                    <Text style={{ fontSize: 28, fontWeight: '900', color: '#2A2A2A', letterSpacing: -1, position: 'absolute', top: -10, left: -2 }}>{item.num}</Text>
                    <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: '#1A1A1A', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#2A2A2A' }}>
                      <Icon size={20} color={RED} strokeWidth={2} />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 }}>{item.title}</Text>
                    <Text style={{ fontSize: 12, color: '#6B7280', lineHeight: 16 }}>{item.subtitle}</Text>
                  </View>
                  <ChevronRight size={18} color="#444" strokeWidth={2} />
                </TouchableOpacity>
              );
            })}

            {/* Active Challenges */}
            <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '800', marginTop: 10, marginBottom: 10 }}>Active Challenges</Text>
            {activeChallenges.map((challenge) => {
              const Icon = challenge.icon;
              const isJoined = joinedChallenges.has(challenge.title);
              return (
                <TouchableOpacity
                  key={challenge.title}
                  onPress={() => setChallengeModal(challenge)}
                  style={{ backgroundColor: '#111111', borderRadius: 18, padding: 16, borderWidth: isJoined ? 1.5 : 1, borderColor: isJoined ? challenge.color : '#222222', marginBottom: 4 }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                    <View style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: challenge.color + '22', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                      <Icon size={20} color={challenge.color} strokeWidth={2} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '800' }}>{challenge.title}</Text>
                      <Text style={{ color: '#6B7280', fontSize: 11, marginTop: 1 }}>
                        {challenge.participants.toLocaleString()} participants · {challenge.daysLeft}d left
                      </Text>
                    </View>
                    {isJoined && (
                      <View style={{ backgroundColor: challenge.color + '22', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4, flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                        <CheckCircle size={11} color={challenge.color} strokeWidth={2.5} />
                        <Text style={{ color: challenge.color, fontSize: 10, fontWeight: '800' }}>Joined</Text>
                      </View>
                    )}
                  </View>
                  <View style={{ backgroundColor: '#1A1A1A', borderRadius: 6, height: 6, overflow: 'hidden' }}>
                    <View style={{ backgroundColor: challenge.color, height: '100%', width: `${challenge.progress * 100}%`, borderRadius: 6 }} />
                  </View>
                  <Text style={{ color: '#6B7280', fontSize: 11, marginTop: 6, textAlign: 'right' }}>
                    {Math.round(challenge.progress * 100)}% complete
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <View style={{ paddingHorizontal: 20, paddingBottom: 20 }}>
            <Text style={{ color: '#9CA3AF', fontSize: 13, fontWeight: '600', marginBottom: 16, letterSpacing: 1 }}>
              GLOBAL RANKINGS · THIS WEEK
            </Text>

            {/* Top 3 Podium */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 24, gap: 12 }}>
              {/* 2nd */}
              <View style={{ alignItems: 'center', width: 90 }}>
                <TouchableOpacity onPress={() => showToast(`${leaderboard[1].name}: ${leaderboard[1].score.toLocaleString()} pts`, 'info')}>
                  <Image source={{ uri: leaderboard[1].avatar }} style={{ width: 56, height: 56, borderRadius: 28, borderWidth: 3, borderColor: '#9CA3AF' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginTop: 4 }}>🥈</Text>
                <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700', textAlign: 'center', marginTop: 2 }}>{leaderboard[1].name.split(' ')[0]}</Text>
                <Text style={{ color: '#9CA3AF', fontSize: 10 }}>{leaderboard[1].score.toLocaleString()} pts</Text>
                <View style={{ backgroundColor: '#1A1A1A', borderRadius: 10, width: 90, height: 70, marginTop: 8, alignItems: 'center', justifyContent: 'center', borderTopWidth: 3, borderTopColor: '#9CA3AF' }}>
                  <Text style={{ color: '#9CA3AF', fontSize: 24, fontWeight: '900' }}>2</Text>
                </View>
              </View>
              {/* 1st */}
              <View style={{ alignItems: 'center', width: 100 }}>
                <TouchableOpacity onPress={() => showToast(`${leaderboard[0].name}: ${leaderboard[0].score.toLocaleString()} pts 🥇`, 'success')}>
                  <View style={{ width: 68, height: 68, borderRadius: 34, borderWidth: 3, borderColor: '#FFD700', overflow: 'hidden' }}>
                    <Image source={{ uri: leaderboard[0].avatar }} style={{ width: '100%', height: '100%' }} />
                  </View>
                </TouchableOpacity>
                <Text style={{ fontSize: 22, marginTop: 4 }}>🥇</Text>
                <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '800', textAlign: 'center', marginTop: 2 }}>{leaderboard[0].name.split(' ')[0]}</Text>
                <Text style={{ color: '#FFD700', fontSize: 11, fontWeight: '700' }}>{leaderboard[0].score.toLocaleString()} pts</Text>
                <View style={{ backgroundColor: '#1A1A1A', borderRadius: 10, width: 100, height: 90, marginTop: 8, alignItems: 'center', justifyContent: 'center', borderTopWidth: 3, borderTopColor: '#FFD700' }}>
                  <Text style={{ color: '#FFD700', fontSize: 28, fontWeight: '900' }}>1</Text>
                </View>
              </View>
              {/* 3rd */}
              <View style={{ alignItems: 'center', width: 90 }}>
                <TouchableOpacity onPress={() => showToast(`${leaderboard[2].name}: ${leaderboard[2].score.toLocaleString()} pts`, 'info')}>
                  <Image source={{ uri: leaderboard[2].avatar }} style={{ width: 56, height: 56, borderRadius: 28, borderWidth: 3, borderColor: '#CD7F32' }} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, marginTop: 4 }}>🥉</Text>
                <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700', textAlign: 'center', marginTop: 2 }}>{leaderboard[2].name.split(' ')[0]}</Text>
                <Text style={{ color: '#9CA3AF', fontSize: 10 }}>{leaderboard[2].score.toLocaleString()} pts</Text>
                <View style={{ backgroundColor: '#1A1A1A', borderRadius: 10, width: 90, height: 56, marginTop: 8, alignItems: 'center', justifyContent: 'center', borderTopWidth: 3, borderTopColor: '#CD7F32' }}>
                  <Text style={{ color: '#CD7F32', fontSize: 20, fontWeight: '900' }}>3</Text>
                </View>
              </View>
            </View>

            {/* Rest */}
            <View style={{ gap: 8 }}>
              {leaderboard.slice(3).map((user) => (
                <TouchableOpacity
                  key={user.rank}
                  onPress={() => showToast(`${user.name}: ${user.score.toLocaleString()} pts`, 'info')}
                  style={{ backgroundColor: '#111111', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#1F1F1F' }}
                >
                  <Text style={{ color: '#444', fontSize: 16, fontWeight: '900', width: 30 }}>{user.rank}</Text>
                  <Image source={{ uri: user.avatar }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12 }} />
                  <Text style={{ flex: 1, color: '#FFF', fontSize: 14, fontWeight: '700' }}>{user.name}</Text>
                  <Text style={{ color: RED, fontSize: 14, fontWeight: '800' }}>{user.score.toLocaleString()} pts</Text>
                </TouchableOpacity>
              ))}

              {/* Your position */}
              <TouchableOpacity
                onPress={() => showToast('Tap to view your detailed stats', 'info')}
                style={{ backgroundColor: RED + '15', borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: RED + '40' }}
              >
                <Text style={{ color: RED, fontSize: 16, fontWeight: '900', width: 30 }}>12</Text>
                <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={{ width: 40, height: 40, borderRadius: 20, marginRight: 12, borderWidth: 2, borderColor: RED }} />
                <Text style={{ flex: 1, color: '#FFF', fontSize: 14, fontWeight: '700' }}>You (Alex K.)</Text>
                <Text style={{ color: RED, fontSize: 14, fontWeight: '800' }}>2,840 pts</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Challenge Detail Modal */}
      <Modal visible={!!challengeModal} animationType="slide" transparent onRequestClose={() => setChallengeModal(null)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' }} onPress={() => setChallengeModal(null)}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            {challengeModal && (
              <View style={{ backgroundColor: '#111', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 }}>
                <TouchableOpacity onPress={() => setChallengeModal(null)} style={{ position: 'absolute', top: 16, right: 16, backgroundColor: '#222', borderRadius: 20, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} color="#FFF" strokeWidth={2.5} />
                </TouchableOpacity>

                <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: challengeModal.color + '22', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <challengeModal.icon size={26} color={challengeModal.color} strokeWidth={2} />
                </View>

                <Text style={{ color: '#FFF', fontSize: 22, fontWeight: '900', marginBottom: 6 }}>{challengeModal.title}</Text>
                <Text style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>
                  {challengeModal.participants.toLocaleString()} participants · {challengeModal.daysLeft} days remaining
                </Text>

                <View style={{ backgroundColor: '#1A1A1A', borderRadius: 8, height: 8, overflow: 'hidden', marginBottom: 8 }}>
                  <View style={{ backgroundColor: challengeModal.color, height: '100%', width: `${challengeModal.progress * 100}%`, borderRadius: 8 }} />
                </View>
                <Text style={{ color: '#6B7280', fontSize: 12, marginBottom: 24 }}>{Math.round(challengeModal.progress * 100)}% completed</Text>

                <TouchableOpacity
                  onPress={() => handleJoinChallenge(challengeModal)}
                  style={{ backgroundColor: joinedChallenges.has(challengeModal.title) ? '#22C55E' : RED, borderRadius: 16, paddingVertical: 16, alignItems: 'center' }}
                >
                  <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '900' }}>
                    {joinedChallenges.has(challengeModal.title) ? '✓ Already Joined' : 'JOIN CHALLENGE'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
