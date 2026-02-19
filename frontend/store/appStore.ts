import { create } from 'zustand';

export type FoodLogEntry = {
  id: string;
  name: string;
  nameTR: string;
  kcal: number;
  portion: string;
  addedAt: number;
};

type AppStore = {
  // Water tracker
  waterIntake: number;
  waterGoal: number;
  addWater: (ml: number) => void;
  resetWater: () => void;

  // Calorie log
  calorieLog: FoodLogEntry[];
  addFood: (food: FoodLogEntry) => void;
  removeFood: (id: string) => void;
  clearLog: () => void;
  totalCalories: () => number;

  // Joined events
  joinedEvents: Set<string>;
  joinEvent: (id: string) => void;
  leaveEvent: (id: string) => void;

  // Challenge joins
  joinedChallenges: Set<string>;
  joinChallenge: (title: string) => void;
};

export const useAppStore = create<AppStore>((set, get) => ({
  waterIntake: 1200,
  waterGoal: 3400,
  addWater: (ml) =>
    set((s) => ({ waterIntake: Math.min(s.waterIntake + ml, s.waterGoal) })),
  resetWater: () => set({ waterIntake: 0 }),

  calorieLog: [],
  addFood: (food) =>
    set((s) => ({
      calorieLog: [
        ...s.calorieLog,
        { ...food, id: food.id + '_' + Date.now() },
      ],
    })),
  removeFood: (id) =>
    set((s) => ({ calorieLog: s.calorieLog.filter((f) => f.id !== id) })),
  clearLog: () => set({ calorieLog: [] }),
  totalCalories: () => get().calorieLog.reduce((sum, f) => sum + f.kcal, 0),

  joinedEvents: new Set(),
  joinEvent: (id) =>
    set((s) => {
      const next = new Set(s.joinedEvents);
      next.add(id);
      return { joinedEvents: next };
    }),
  leaveEvent: (id) =>
    set((s) => {
      const next = new Set(s.joinedEvents);
      next.delete(id);
      return { joinedEvents: next };
    }),

  joinedChallenges: new Set(),
  joinChallenge: (title) =>
    set((s) => {
      const next = new Set(s.joinedChallenges);
      next.add(title);
      return { joinedChallenges: next };
    }),
}));
