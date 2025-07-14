import React, { createContext, useContext, useState, useEffect } from 'react';
import { SWMS, WorkTask, ProjectInfo, AIGenerationRequest } from '../types';
import { useAuth } from './AuthContext';

interface SWMSContextType {
  swmsList: SWMS[];
  currentSWMS: SWMS | null;
  createNewSWMS: () => string;
  updateSWMS: (id: string, updates: Partial<SWMS>) => void;
  deleteSWMS: (id: string) => void;
  duplicateSWMS: (id: string) => string;
  generateAITasks: (request: AIGenerationRequest) => Promise<WorkTask[]>;
  addManualTask: (swmsId: string, task: Omit<WorkTask, 'id' | 'order'>) => void;
  updateTask: (swmsId: string, taskId: string, updates: Partial<WorkTask>) => void;
  deleteTask: (swmsId: string, taskId: string) => void;
  reorderTasks: (swmsId: string, tasks: WorkTask[]) => void;
  completeSWMS: (id: string) => void;
  getSWMSById: (id: string) => SWMS | undefined;
  isGenerating: boolean;
}

const SWMSContext = createContext<SWMSContextType | undefined>(undefined);

export const useSWMS = () => {
  const context = useContext(SWMSContext);
  if (context === undefined) {
    throw new Error('useSWMS must be used within a SWMSProvider');
  }
  return context;
};

export const SWMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [swmsList, setSWMSList] = useState<SWMS[]>([]);
  const [currentSWMS, setCurrentSWMS] = useState<SWMS | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (user) {
      // Load user's SWMS documents
      const stored = localStorage.getItem(`swms_${user.id}`);
      if (stored) {
        setSWMSList(JSON.parse(stored));
      }
    }
  }, [user]);

  const saveToStorage = (list: SWMS[]) => {
    if (user) {
      localStorage.setItem(`swms_${user.id}`, JSON.stringify(list));
    }
  };

  const createNewSWMS = (): string => {
    if (!user) throw new Error('User not authenticated');

    const newSWMS: SWMS = {
      id: Date.now().toString(),
      userId: user.id,
      status: 'draft',
      projectInfo: {
        jobName: '',
        jobNumber: '',
        startDate: '',
        projectAddress: '',
        tradeType: '',
        projectDescription: '',
        duration: 0,
        creatorName: user.fullName,
        creatorRole: '',
        principalContractor: '',
        projectManager: '',
        siteSupervisor: '',
        authoriserName: '',
        authoriserMobile: '',
      },
      workTasks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isLocked: false
    };

    const updatedList = [...swmsList, newSWMS];
    setSWMSList(updatedList);
    setCurrentSWMS(newSWMS);
    saveToStorage(updatedList);
    
    return newSWMS.id;
  };

  const updateSWMS = (id: string, updates: Partial<SWMS>) => {
    const updatedList = swmsList.map(swms => 
      swms.id === id 
        ? { ...swms, ...updates, updatedAt: new Date().toISOString() }
        : swms
    );
    setSWMSList(updatedList);
    saveToStorage(updatedList);
    
    if (currentSWMS?.id === id) {
      setCurrentSWMS({ ...currentSWMS, ...updates, updatedAt: new Date().toISOString() });
    }
  };

  const deleteSWMS = (id: string) => {
    const updatedList = swmsList.map(swms =>
      swms.id === id
        ? { ...swms, status: 'deleted' as const, updatedAt: new Date().toISOString() }
        : swms
    );
    setSWMSList(updatedList);
    saveToStorage(updatedList);
  };

  const duplicateSWMS = (id: string): string => {
    if (!user) throw new Error('User not authenticated');
    
    const original = swmsList.find(s => s.id === id);
    if (!original) throw new Error('SWMS not found');

    const duplicate: SWMS = {
      ...original,
      id: Date.now().toString(),
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: undefined,
      isLocked: false,
      projectInfo: {
        ...original.projectInfo,
        jobName: `${original.projectInfo.jobName} (Copy)`,
        jobNumber: '',
        startDate: '',
      }
    };

    const updatedList = [...swmsList, duplicate];
    setSWMSList(updatedList);
    saveToStorage(updatedList);
    
    return duplicate.id;
  };

  const generateAITasks = async (request: AIGenerationRequest): Promise<WorkTask[]> => {
    setIsGenerating(true);
    
    // Simulate AI generation with delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated tasks - in real app, this would call your GPT API
    const mockTasks: WorkTask[] = [
      {
        id: '1',
        trade: request.tradeType,
        taskName: 'Site Setup and Safety Preparation',
        taskDescription: 'Establish work area, set up safety barriers and signage',
        toolsEquipment: 'Safety barriers, warning signs, first aid kit, fire extinguisher',
        ppe: 'Hard hat, safety vest, safety boots, gloves',
        hazards: 'Slips, trips, falls\nVehicle movement\nPublic access\nWeather conditions\nUneven surfaces\nObstructions\nPoor lighting\nNoise exposure',
        controls: 'Elimination: Remove unnecessary obstacles\nSubstitution: Use non-slip materials\nEngineering: Install barriers and signage\nAdministrative: Conduct toolbox talk\nPPE: Wear appropriate safety equipment',
        originalRiskScore: { magnitude: 3, likelihood: 3, score: 9, riskLevel: 'M' },
        residualRiskScore: { magnitude: 2, likelihood: 2, score: 4, riskLevel: 'L' },
        taskComplexity: 'Low',
        legislation: 'WHS Act 2011 s.19\nWHS Regulation 2017 r.213\nAS 1742.3-2019 Traffic Control',
        order: 1
      },
      {
        id: '2',
        trade: request.tradeType,
        taskName: 'Material Handling and Storage',
        taskDescription: 'Receive, handle and store materials safely on site',
        toolsEquipment: 'Forklift (HRWL required), pallet jack, lifting equipment, storage racks',
        ppe: 'Hard hat, safety vest, safety boots, gloves, eye protection',
        hazards: 'Manual handling injuries\nCrushing from falling materials\nBack strain\nCuts and abrasions\nStruck by moving equipment\nPoor lifting technique\nOverloading\nUnstable stacking',
        controls: 'Elimination: Use mechanical aids where possible\nSubstitution: Lighter materials where feasible\nEngineering: Proper storage systems\nAdministrative: Manual handling training\nPPE: Appropriate protective equipment',
        originalRiskScore: { magnitude: 4, likelihood: 3, score: 12, riskLevel: 'H' },
        residualRiskScore: { magnitude: 2, likelihood: 2, score: 4, riskLevel: 'L' },
        taskComplexity: 'Moderate',
        legislation: 'WHS Act 2011 s.19\nWHS Regulation 2017 r.60-67\nAS 4024.1-2019 Safeguarding',
        order: 2
      }
    ];

    setIsGenerating(false);
    return mockTasks;
  };

  const addManualTask = (swmsId: string, task: Omit<WorkTask, 'id' | 'order'>) => {
    const swms = swmsList.find(s => s.id === swmsId);
    if (!swms) return;

    const newTask: WorkTask = {
      ...task,
      id: Date.now().toString(),
      order: swms.workTasks.length + 1
    };

    const updatedTasks = [...swms.workTasks, newTask];
    updateSWMS(swmsId, { workTasks: updatedTasks });
  };

  const updateTask = (swmsId: string, taskId: string, updates: Partial<WorkTask>) => {
    const swms = swmsList.find(s => s.id === swmsId);
    if (!swms) return;

    const updatedTasks = swms.workTasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );

    updateSWMS(swmsId, { workTasks: updatedTasks });
  };

  const deleteTask = (swmsId: string, taskId: string) => {
    const swms = swmsList.find(s => s.id === swmsId);
    if (!swms) return;

    const updatedTasks = swms.workTasks.filter(task => task.id !== taskId);
    updateSWMS(swmsId, { workTasks: updatedTasks });
  };

  const reorderTasks = (swmsId: string, tasks: WorkTask[]) => {
    const reorderedTasks = tasks.map((task, index) => ({
      ...task,
      order: index + 1
    }));

    updateSWMS(swmsId, { workTasks: reorderedTasks });
  };

  const completeSWMS = (id: string) => {
    updateSWMS(id, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      isLocked: true
    });
  };

  const getSWMSById = (id: string) => {
    return swmsList.find(s => s.id === id);
  };

  return (
    <SWMSContext.Provider value={{
      swmsList,
      currentSWMS,
      createNewSWMS,
      updateSWMS,
      deleteSWMS,
      duplicateSWMS,
      generateAITasks,
      addManualTask,
      updateTask,
      deleteTask,
      reorderTasks,
      completeSWMS,
      getSWMSById,
      isGenerating
    }}>
      {children}
    </SWMSContext.Provider>
  );
};