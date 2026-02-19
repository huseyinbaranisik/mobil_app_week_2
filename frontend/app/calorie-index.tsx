import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react-native';
import { useAppStore, FoodLogEntry } from '@/store/appStore';
import { useToast } from '@/components/ToastProvider';

const RED = '#E63946';

const foodData: Omit<FoodLogEntry, 'addedAt'>[] = [
  { id: '1', name: 'Honey', nameTR: 'Bal', kcal: 307, portion: '100 gram' },
  { id: '2', name: 'White Cheese', nameTR: 'Beyaz Peynir', kcal: 275, portion: '100 gram' },
  { id: '3', name: 'String Cheese', nameTR: 'Dil Peyniri', kcal: 271, portion: '100 gram' },
  { id: '4', name: 'Cream', nameTR: 'Kaymak', kcal: 624, portion: '100 gram' },
  { id: '5', name: 'Kaşar Cheese', nameTR: 'Kaşar Peyniri', kcal: 413, portion: '100 gram' },
  { id: '6', name: 'Marmalade', nameTR: 'Marmelat', kcal: 280, portion: '100 gram' },
  { id: '7', name: 'Muesli', nameTR: 'Müsli', kcal: 30, portion: '1 tbsp' },
  { id: '8', name: 'Pastrami', nameTR: 'Pastırma', kcal: 250, portion: '100 gram' },
  { id: '9', name: 'Molasses', nameTR: 'Pekmez', kcal: 60, portion: '1 tbsp' },
  { id: '10', name: 'Egg', nameTR: 'Yumurta', kcal: 155, portion: '100 gram' },
  { id: '11', name: 'Apple', nameTR: 'Elma', kcal: 52, portion: '100 gram' },
  { id: '12', name: 'Banana', nameTR: 'Muz', kcal: 89, portion: '100 gram' },
  { id: '13', name: 'Orange', nameTR: 'Portakal', kcal: 47, portion: '100 gram' },
  { id: '14', name: 'Watermelon', nameTR: 'Karpuz', kcal: 30, portion: '100 gram' },
  { id: '15', name: 'Chicken Breast', nameTR: 'Tavuk Göğsü', kcal: 165, portion: '100 gram' },
  { id: '16', name: 'Salmon', nameTR: 'Somon', kcal: 208, portion: '100 gram' },
  { id: '17', name: 'Red Meat', nameTR: 'Kırmızı Et', kcal: 250, portion: '100 gram' },
  { id: '18', name: 'Rice', nameTR: 'Pilav', kcal: 130, portion: '100 gram' },
  { id: '19', name: 'Pasta', nameTR: 'Makarna', kcal: 158, portion: '100 gram' },
  { id: '20', name: 'Bread', nameTR: 'Ekmek', kcal: 265, portion: '100 gram' },
];

const categoryMap: Record<string, string> = {
  '1': 'Breakfast', '2': 'Breakfast', '3': 'Breakfast', '4': 'Breakfast',
  '5': 'Breakfast', '6': 'Breakfast', '7': 'Breakfast', '8': 'Breakfast',
  '9': 'Breakfast', '10': 'Breakfast',
  '11': 'Fruits', '12': 'Fruits', '13': 'Fruits', '14': 'Fruits',
  '15': 'Proteins', '16': 'Proteins', '17': 'Proteins',
  '18': 'Carbs', '19': 'Carbs', '20': 'Carbs',
};

const categories = ['All', 'Breakfast', 'Fruits', 'Proteins', 'Carbs'];

function getKcalColor(kcal: number) {
  if (kcal < 100) return '#34D399';
  if (kcal < 300) return '#FBBF24';
  return RED;
}

export default function CalorieIndexScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [logVisible, setLogVisible] = useState(false);
  const { calorieLog, addFood, removeFood, clearLog, totalCalories } = useAppStore();
  const { showToast } = useToast();

  const filtered = foodData.filter((food) => {
    const cat = categoryMap[food.id];
    const matchesCat = activeCategory === 'All' || cat === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.nameTR.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const grouped: Record<string, typeof filtered> = {};
  filtered.forEach((item) => {
    const cat = categoryMap[item.id] || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });

  const handleAdd = (food: typeof foodData[0]) => {
    addFood({ ...food, addedAt: Date.now() });
    showToast(`+${food.kcal} kcal — ${food.name} added`, 'success');
  };

  const total = totalCalories();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
        <TouchableOpacity onPress={() => router.back()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
          <ArrowLeft size={20} color="#111" strokeWidth={2} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 10, color: '#9CA3AF', fontWeight: '700', letterSpacing: 1 }}>HEALTH TOOLS</Text>
          <Text style={{ fontSize: 18, fontWeight: '900', color: '#111' }}>Kalori Cetveli</Text>
        </View>
        {/* Daily Log button */}
        <TouchableOpacity
          onPress={() => setLogVisible(true)}
          style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: calorieLog.length > 0 ? RED : '#F5F5F5', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, gap: 6 }}
        >
          <ShoppingCart size={15} color={calorieLog.length > 0 ? '#FFF' : '#6B7280'} strokeWidth={2} />
          {calorieLog.length > 0 && (
            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '800' }}>{total} kcal</Text>
          )}
          {calorieLog.length === 0 && (
            <Text style={{ color: '#6B7280', fontSize: 12, fontWeight: '700' }}>Log</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Description banner */}
      <View style={{ backgroundColor: RED, marginHorizontal: 20, marginTop: 16, borderRadius: 16, padding: 14, marginBottom: 12 }}>
        <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '800', textAlign: 'center' }}>KALORİ CETVELİ</Text>
        <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11, textAlign: 'center', marginTop: 4 }}>
          Tap "Ekle" to log food to your daily calorie tracker.
        </Text>
      </View>

      {/* Search */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, backgroundColor: '#F5F5F5', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 11, marginBottom: 12 }}>
        <Search size={16} color="#9CA3AF" strokeWidth={2} />
        <TextInput
          placeholder="Search food (e.g. Honey, Egg...)"
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={{ flex: 1, marginLeft: 8, fontSize: 14, color: '#111', fontWeight: '500' }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X size={15} color="#9CA3AF" strokeWidth={2} />
          </TouchableOpacity>
        )}
      </View>

      {/* Category Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 8, paddingBottom: 12 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setActiveCategory(cat)}
            style={{ paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, backgroundColor: activeCategory === cat ? RED : '#F5F5F5' }}
          >
            <Text style={{ fontSize: 12, fontWeight: '700', color: activeCategory === cat ? '#FFF' : '#6B7280' }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Empty state */}
      {filtered.length === 0 && (
        <View style={{ alignItems: 'center', paddingVertical: 60 }}>
          <Text style={{ fontSize: 36, marginBottom: 12 }}>🍽️</Text>
          <Text style={{ fontSize: 16, fontWeight: '800', color: '#111' }}>No foods found</Text>
          <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 6 }}>Try a different search term</Text>
          <TouchableOpacity onPress={() => { setSearchQuery(''); setActiveCategory('All'); }} style={{ marginTop: 16, backgroundColor: RED, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ color: '#FFF', fontWeight: '700' }}>Clear Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Food List */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {Object.keys(grouped).map((cat) => (
          <View key={cat} style={{ marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8, backgroundColor: '#F5F5F5' }}>
              <Text style={{ fontSize: 11, fontWeight: '800', color: '#6B7280', letterSpacing: 1, flex: 1 }}>
                {cat.toUpperCase()} ÜRÜNLERİ
              </Text>
            </View>

            {grouped[cat].map((food, idx) => {
              const timesAdded = calorieLog.filter((e) => e.id.startsWith(food.id + '_')).length;
              return (
                <View key={food.id}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#FFF' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>{food.name}</Text>
                      <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 1 }}>
                        {food.nameTR} · {food.portion}
                        {timesAdded > 0 && <Text style={{ color: '#22C55E', fontWeight: '700' }}> · ×{timesAdded} added</Text>}
                      </Text>
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: '900', color: getKcalColor(food.kcal), letterSpacing: -0.5 }}>{food.kcal}</Text>
                    <Text style={{ fontSize: 11, color: '#9CA3AF', fontWeight: '600', marginLeft: 3, marginRight: 8 }}>kcal</Text>
                    <TouchableOpacity
                      onPress={() => handleAdd(food)}
                      style={{ backgroundColor: RED, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 4 }}
                    >
                      <Plus size={12} color="#FFF" strokeWidth={3} />
                      <Text style={{ color: '#FFF', fontSize: 11, fontWeight: '800' }}>Ekle</Text>
                    </TouchableOpacity>
                  </View>
                  {idx < grouped[cat].length - 1 && (
                    <View style={{ height: 1, backgroundColor: '#F5F5F5', marginHorizontal: 20 }} />
                  )}
                </View>
              );
            })}
          </View>
        ))}
        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Daily Log Modal */}
      <Modal visible={logVisible} animationType="slide" transparent onRequestClose={() => setLogVisible(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'flex-end' }} onPress={() => setLogVisible(false)}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={{ backgroundColor: '#FFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '75%' }}>
              {/* Modal Header */}
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: '900', color: '#111' }}>Daily Food Log</Text>
                  <Text style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{calorieLog.length} items logged today</Text>
                </View>
                {calorieLog.length > 0 && (
                  <TouchableOpacity
                    onPress={() => { clearLog(); showToast('Daily log cleared', 'info'); }}
                    style={{ backgroundColor: '#FEE2E2', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, flexDirection: 'row', alignItems: 'center', gap: 4 }}
                  >
                    <Trash2 size={13} color={RED} strokeWidth={2} />
                    <Text style={{ color: RED, fontSize: 12, fontWeight: '700' }}>Clear</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => setLogVisible(false)} style={{ backgroundColor: '#F5F5F5', borderRadius: 20, width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                  <X size={18} color="#111" strokeWidth={2.5} />
                </TouchableOpacity>
              </View>

              {calorieLog.length === 0 ? (
                <View style={{ alignItems: 'center', paddingVertical: 48 }}>
                  <Text style={{ fontSize: 40, marginBottom: 12 }}>🍽️</Text>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#111' }}>No foods logged yet</Text>
                  <Text style={{ fontSize: 13, color: '#9CA3AF', marginTop: 6 }}>Tap "Ekle" on any food to add it here</Text>
                </View>
              ) : (
                <>
                  <ScrollView style={{ maxHeight: 380 }}>
                    {calorieLog.map((entry, idx) => (
                      <View key={entry.id}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 13 }}>
                          <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 14, fontWeight: '700', color: '#111' }}>{entry.name}</Text>
                            <Text style={{ fontSize: 11, color: '#9CA3AF' }}>{entry.nameTR} · {entry.portion}</Text>
                          </View>
                          <Text style={{ fontSize: 16, fontWeight: '900', color: getKcalColor(entry.kcal) }}>{entry.kcal}</Text>
                          <Text style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 3, marginRight: 10 }}>kcal</Text>
                          <TouchableOpacity
                            onPress={() => { removeFood(entry.id); showToast(`Removed ${entry.name}`, 'info'); }}
                            style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <Minus size={14} color={RED} strokeWidth={2.5} />
                          </TouchableOpacity>
                        </View>
                        {idx < calorieLog.length - 1 && <View style={{ height: 1, backgroundColor: '#F5F5F5', marginHorizontal: 20 }} />}
                      </View>
                    ))}
                  </ScrollView>

                  {/* Total */}
                  <View style={{ margin: 20, backgroundColor: '#111', borderRadius: 20, padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={{ color: '#9CA3AF', fontSize: 13, fontWeight: '700' }}>Total Today</Text>
                      <Text style={{ color: RED, fontSize: 32, fontWeight: '900', letterSpacing: -1 }}>{total}</Text>
                    </View>
                    <Text style={{ color: '#6B7280', fontSize: 12, marginTop: 2 }}>kcal consumed · {calorieLog.length} items</Text>
                    <View style={{ backgroundColor: '#1A1A1A', borderRadius: 8, height: 6, marginTop: 12, overflow: 'hidden' }}>
                      <View style={{ backgroundColor: RED, height: '100%', width: `${Math.min((total / 2000) * 100, 100)}%`, borderRadius: 8 }} />
                    </View>
                    <Text style={{ color: '#6B7280', fontSize: 11, marginTop: 4 }}>{total} / 2000 kcal daily target</Text>
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
