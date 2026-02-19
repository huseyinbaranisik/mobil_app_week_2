import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Calendar, Clock, Users, ChevronRight, X, CheckCircle, Navigation } from 'lucide-react-native';
import { useAppStore } from '@/store/appStore';
import { useToast } from '@/components/ToastProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const RED = '#E63946';

const events = [
  {
    id: '1',
    title: 'Belgrad Forest Trekking',
    type: 'Trekking',
    location: 'Sarıyer, Istanbul',
    date: '08 Jan 2026',
    time: '08:00 - 12:00',
    participants: 24,
    maxParticipants: 30,
    distance: '12 km',
    elevation: '320 m',
    difficulty: 'Moderate',
    description: 'Explore the ancient Belgrad Forest along scenic trails. A moderate trek through diverse woodland featuring historic Ottoman dams, wildlife sightings, and breathtaking valley views.',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    featured: true,
  },
  {
    id: '2',
    title: 'Morning Run – Bosphorus',
    type: 'Running',
    location: 'Beşiktaş, Istanbul',
    date: '15 Jan 2026',
    time: '07:00 - 08:30',
    participants: 18,
    maxParticipants: 25,
    distance: '5 km',
    elevation: '42 m',
    difficulty: 'Easy',
    description: 'A scenic 5K run along the iconic Bosphorus shoreline. Perfect for all fitness levels. We meet at Beşiktaş pier and run north toward Ortaköy.',
    image: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&q=80',
    featured: false,
  },
  {
    id: '3',
    title: 'Manisa Running Friends',
    type: 'Running',
    location: 'Manisa City Park',
    date: '20 Jan 2026',
    time: '06:30 - 08:00',
    participants: 41,
    maxParticipants: 50,
    distance: '8 km',
    elevation: '90 m',
    difficulty: 'Easy–Medium',
    description: 'Join the Manisa running community for a relaxed group run through the city park. All paces welcome. Post-run breakfast at the clubhouse.',
    image: 'https://images.unsplash.com/photo-1502904550040-7534597429ae?w=800&q=80',
    featured: false,
  },
  {
    id: '4',
    title: 'Cycling – Princes Islands',
    type: 'Cycling',
    location: 'Büyükada, Istanbul',
    date: '22 Jan 2026',
    time: '09:00 - 14:00',
    participants: 12,
    maxParticipants: 20,
    distance: '22 km',
    elevation: '180 m',
    difficulty: 'Moderate',
    description: 'Cycle around the car-free Princes\' Islands. Ferry departs at 08:00 from Kabataş. Bikes available to rent on the island. A beautiful coastal cycling experience.',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
    featured: false,
  },
  {
    id: '5',
    title: 'Yoga in the Park',
    type: 'Yoga',
    location: 'Gülhane Park, Istanbul',
    date: '25 Jan 2026',
    time: '08:00 - 09:30',
    participants: 15,
    maxParticipants: 20,
    distance: '-',
    elevation: '-',
    difficulty: 'Beginner',
    description: 'Start your Sunday with a peaceful outdoor yoga session in Gülhane Park. Bring your own mat. All levels welcome. Instructor-led flow focused on breathwork and flexibility.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80',
    featured: false,
  },
];

const categories = ['All', 'Running', 'Trekking', 'Cycling', 'Yoga', 'Swimming'];

const typeColors: Record<string, string> = {
  Running: '#E63946',
  Trekking: '#34D399',
  Cycling: '#60A5FA',
  Yoga: '#A78BFA',
  Swimming: '#1A7FC1',
};

type Event = typeof events[0];

export default function DiscoverScreen() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  const { joinedEvents, joinEvent, leaveEvent } = useAppStore();
  const { showToast } = useToast();

  const filtered = events.filter((e) => {
    const matchesCategory = activeCategory === 'All' || e.type === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = filtered.find((e) => e.featured);
  const regular = filtered.filter((e) => !e.featured);

  const openEvent = (event: Event) => {
    setSelectedEvent(event);
    setDetailVisible(true);
  };

  const handleJoin = (event: Event) => {
    if (joinedEvents.has(event.id)) {
      leaveEvent(event.id);
      showToast(`Left "${event.title}"`, 'info');
    } else {
      if (event.participants >= event.maxParticipants) {
        showToast('Event is full. You\'ve been added to the waitlist.', 'info');
      } else {
        joinEvent(event.id);
        showToast(`Joined "${event.title}"! 🎉`, 'success');
      }
    }
    setDetailVisible(false);
  };

  const spotsLeft = (e: Event) => e.maxParticipants - e.participants - (joinedEvents.has(e.id) ? 1 : 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 16 }}>
          <Text style={{ fontSize: 13, color: '#9CA3AF', fontWeight: '500' }}>Explore</Text>
          <Text style={{ fontSize: 24, fontWeight: '900', color: '#111', letterSpacing: -0.5 }}>Events</Text>
        </View>

        {/* Search */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 14, paddingVertical: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3, marginBottom: 16 }}>
          <Search size={18} color="#9CA3AF" strokeWidth={2} />
          <TextInput
            placeholder="Search events or location..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, marginLeft: 10, fontSize: 14, color: '#111', fontWeight: '500' }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={16} color="#9CA3AF" strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingBottom: 16 }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={{ paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20, backgroundColor: activeCategory === cat ? RED : '#FFF', borderWidth: 1.5, borderColor: activeCategory === cat ? RED : '#E5E7EB', shadowColor: activeCategory === cat ? RED : 'transparent', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: activeCategory === cat ? 3 : 0 }}
            >
              <Text style={{ fontSize: 13, fontWeight: '700', color: activeCategory === cat ? '#FFF' : '#6B7280' }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Empty state */}
        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 60, paddingHorizontal: 40 }}>
            <Text style={{ fontSize: 40, marginBottom: 12 }}>🔍</Text>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#111', marginBottom: 8 }}>No events found</Text>
            <Text style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', lineHeight: 20 }}>
              Try a different search term or category filter.
            </Text>
            <TouchableOpacity onPress={() => { setSearchQuery(''); setActiveCategory('All'); }} style={{ marginTop: 20, backgroundColor: RED, borderRadius: 12, paddingHorizontal: 24, paddingVertical: 12 }}>
              <Text style={{ color: '#FFF', fontWeight: '700' }}>Clear Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Featured Event */}
        {featured && (
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#9CA3AF', marginBottom: 10, letterSpacing: 1 }}>FEATURED</Text>
            <TouchableOpacity
              onPress={() => openEvent(featured)}
              style={{ borderRadius: 24, overflow: 'hidden', height: 280, shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 8 }}
            >
              <Image source={{ uri: featured.image }} style={{ width: '100%', height: '100%', position: 'absolute' }} resizeMode="cover" />
              <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.45)' }} />
              <View style={{ position: 'absolute', top: 16, left: 16 }}>
                <View style={{ backgroundColor: typeColors[featured.type] || RED, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5 }}>
                  <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '800' }}>{featured.type}</Text>
                </View>
              </View>
              {joinedEvents.has(featured.id) && (
                <View style={{ position: 'absolute', top: 16, right: 16, backgroundColor: '#22C55E', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <CheckCircle size={11} color="#FFF" strokeWidth={2.5} />
                  <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '800' }}>Joined</Text>
                </View>
              )}
              <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 }}>
                <Text style={{ color: '#FFF', fontSize: 22, fontWeight: '900', marginBottom: 8 }}>{featured.title}</Text>
                <View style={{ flexDirection: 'row', gap: 16, marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MapPin size={13} color="rgba(255,255,255,0.85)" strokeWidth={2} />
                    <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginLeft: 4, fontWeight: '600' }}>{featured.location}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Calendar size={13} color="rgba(255,255,255,0.85)" strokeWidth={2} />
                    <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12, marginLeft: 4, fontWeight: '600' }}>{featured.date}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleJoin(featured)}
                  style={{ backgroundColor: joinedEvents.has(featured.id) ? '#22C55E' : RED, borderRadius: 14, paddingVertical: 14, alignItems: 'center' }}
                >
                  <Text style={{ color: '#FFF', fontSize: 15, fontWeight: '800', letterSpacing: 0.3 }}>
                    {joinedEvents.has(featured.id) ? 'LEAVE EVENT' : 'JOIN EVENT'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Events List */}
        {regular.length > 0 && (
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '800', color: '#111' }}>Upcoming Events</Text>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => showToast('All events calendar coming soon', 'coming-soon')}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: RED }}>View All</Text>
                <ChevronRight size={14} color={RED} />
              </TouchableOpacity>
            </View>

            <View style={{ gap: 12 }}>
              {regular.map((event) => (
                <TouchableOpacity
                  key={event.id}
                  onPress={() => openEvent(event)}
                  style={{ backgroundColor: '#FFF', borderRadius: 20, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 3, flexDirection: 'row', borderWidth: joinedEvents.has(event.id) ? 1.5 : 0, borderColor: '#22C55E' }}
                >
                  <Image source={{ uri: event.image }} style={{ width: 100, height: 120 }} resizeMode="cover" />
                  <View style={{ flex: 1, padding: 14, justifyContent: 'space-between' }}>
                    <View>
                      <View style={{ backgroundColor: (typeColors[event.type] || RED) + '18', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginBottom: 6 }}>
                        <Text style={{ fontSize: 10, fontWeight: '800', color: typeColors[event.type] || RED }}>{event.type.toUpperCase()}</Text>
                      </View>
                      <Text style={{ fontSize: 15, fontWeight: '800', color: '#111', marginBottom: 4 }}>{event.title}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                        <MapPin size={11} color="#9CA3AF" strokeWidth={2} />
                        <Text style={{ fontSize: 11, color: '#6B7280', marginLeft: 3, fontWeight: '500' }}>{event.location}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Clock size={11} color="#9CA3AF" strokeWidth={2} />
                        <Text style={{ fontSize: 11, color: '#6B7280', marginLeft: 3, fontWeight: '500' }}>{event.date} · {event.time}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Users size={11} color="#9CA3AF" strokeWidth={2} />
                        <Text style={{ fontSize: 11, color: '#6B7280', marginLeft: 3 }}>{event.participants}/{event.maxParticipants}</Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleJoin(event)}
                        style={{ backgroundColor: joinedEvents.has(event.id) ? '#22C55E' : RED, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7 }}
                      >
                        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '800' }}>
                          {joinedEvents.has(event.id) ? '✓ Joined' : 'Join'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Event Detail Modal */}
      <Modal visible={detailVisible} animationType="slide" transparent onRequestClose={() => setDetailVisible(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' }} onPress={() => setDetailVisible(false)}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            {selectedEvent && (
              <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '90%' }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ position: 'relative' }}>
                    <Image source={{ uri: selectedEvent.image }} style={{ width: '100%', height: 220, borderTopLeftRadius: 28, borderTopRightRadius: 28 }} resizeMode="cover" />
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 220, backgroundColor: 'rgba(0,0,0,0.3)', borderTopLeftRadius: 28, borderTopRightRadius: 28 }} />
                    <TouchableOpacity onPress={() => setDetailVisible(false)} style={{ position: 'absolute', top: 16, right: 16, backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                      <X size={18} color="#FFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <View style={{ position: 'absolute', top: 16, left: 16 }}>
                      <View style={{ backgroundColor: typeColors[selectedEvent.type] || RED, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 5 }}>
                        <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '800' }}>{selectedEvent.type}</Text>
                      </View>
                    </View>
                    {joinedEvents.has(selectedEvent.id) && (
                      <View style={{ position: 'absolute', bottom: 16, right: 16, backgroundColor: '#22C55E', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <CheckCircle size={13} color="#FFF" strokeWidth={2.5} />
                        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '800' }}>You're in!</Text>
                      </View>
                    )}
                  </View>

                  <View style={{ padding: 20 }}>
                    <Text style={{ fontSize: 22, fontWeight: '900', color: '#111', marginBottom: 4 }}>{selectedEvent.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                      <MapPin size={14} color="#9CA3AF" strokeWidth={2} />
                      <Text style={{ fontSize: 13, color: '#6B7280', marginLeft: 5, fontWeight: '600' }}>{selectedEvent.location}</Text>
                    </View>

                    {/* Info Grid */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
                      {[
                        { label: 'Date', value: selectedEvent.date },
                        { label: 'Time', value: selectedEvent.time },
                        { label: 'Distance', value: selectedEvent.distance },
                        { label: 'Difficulty', value: selectedEvent.difficulty },
                        { label: 'Elevation', value: selectedEvent.elevation },
                        { label: 'Spots Left', value: `${Math.max(0, selectedEvent.maxParticipants - selectedEvent.participants)}` },
                      ].map((item) => (
                        <View key={item.label} style={{ backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, minWidth: '44%', flex: 1 }}>
                          <Text style={{ fontSize: 10, color: '#9CA3AF', fontWeight: '700', letterSpacing: 0.5, marginBottom: 2 }}>{item.label.toUpperCase()}</Text>
                          <Text style={{ fontSize: 14, fontWeight: '800', color: '#111' }}>{item.value}</Text>
                        </View>
                      ))}
                    </View>

                    <Text style={{ fontSize: 13, color: '#6B7280', lineHeight: 21, marginBottom: 24 }}>{selectedEvent.description}</Text>

                    {/* Participants */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                      <Users size={15} color="#6B7280" strokeWidth={2} />
                      <Text style={{ fontSize: 13, color: '#6B7280', marginLeft: 6, fontWeight: '600' }}>
                        {selectedEvent.participants} joined · {Math.max(0, selectedEvent.maxParticipants - selectedEvent.participants)} spots remaining
                      </Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 12, paddingBottom: 24 }}>
                      <TouchableOpacity
                        onPress={() => showToast('Directions feature coming soon', 'coming-soon')}
                        style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Navigation size={20} color="#6B7280" strokeWidth={2} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleJoin(selectedEvent)}
                        style={{ flex: 1, backgroundColor: joinedEvents.has(selectedEvent.id) ? '#22C55E' : RED, borderRadius: 14, paddingVertical: 16, alignItems: 'center', shadowColor: joinedEvents.has(selectedEvent.id) ? '#22C55E' : RED, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 5 }}
                      >
                        <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '900' }}>
                          {joinedEvents.has(selectedEvent.id) ? 'LEAVE EVENT' : 'JOIN EVENT'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
