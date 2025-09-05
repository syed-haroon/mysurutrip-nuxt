import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Lead {
  id: string;
  tripType: 'honeymoon' | 'family' | 'business' | 'friends' | 'solo';
  checkIn: string;
  checkOut: string;
  guestCount: number;
  foodPreferences: string[];
  addOns: string[];
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    whatsappOptIn: boolean;
  };
  wishlistItems: (string | undefined)[];
  createdAt: string;
  status: 'pending' | 'contacted' | 'quoted' | 'booked';
}

export const useLeadsStore = defineStore('leads', () => {
  const leads = ref<Lead[]>([]);

  // Load from localStorage on store initialization
  if (import.meta.client) {
    const saved = localStorage.getItem('leads');
    if (saved) {
      leads.value = JSON.parse(saved);
    }
  }

  // Save to localStorage whenever leads change
  const saveToStorage = () => {
    if (import.meta.client) {
      localStorage.setItem('leads', JSON.stringify(leads.value));
    }
  };

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: Lead = {
      ...lead,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    leads.value.push(newLead);
    saveToStorage();
    return newLead;
  };

  const updateLeadStatus = (id: string, status: Lead['status']) => {
    const lead = leads.value.find(l => l.id === id);
    if (lead) {
      lead.status = status;
      saveToStorage();
      return true;
    }
    return false;
  };

  const getLeadsByStatus = (status: Lead['status']) => {
    return leads.value.filter(lead => lead.status === status);
  };

  const getLeadsByTripType = (tripType: Lead['tripType']) => {
    return leads.value.filter(lead => lead.tripType === tripType);
  };

  return {
    leads,
    addLead,
    updateLeadStatus,
    getLeadsByStatus,
    getLeadsByTripType,
  };
}, {
  persist: true,
});
