import Dexie from 'dexie';

export interface ICDCode {
  code_system: 'ICD-10' | 'ICD-11';
  code: string;
  description: string;
}

class ICDDatabase extends Dexie {
  icd10!: Dexie.Table<any, number>;
  icd11!: Dexie.Table<any, number>;
  
  constructor() {
    super('Synex420ICD');
    this.version(1).stores({
      icd10: '++id, code, description',
      icd11: '++id, code, description'
    });
  }
}

export const db = new ICDDatabase();

export async function initICD(onProgress?: (progress: number) => void) {
  const count10 = await db.icd10.count();
  const count11 = await db.icd11.count();
  
  // If we have data, we're good
  if (count10 > 10 && count11 > 10) return;
  
  try {
    if (onProgress) onProgress(0);
    
    // Load ICD-10
    const res10 = await fetch('/data/icd/icd10-full.json');
    const data10 = await res10.json();
    await db.icd10.clear();
    await db.icd10.bulkPut(data10.map((item: any) => ({ ...item, code_system: 'ICD-10' })));
    
    if (onProgress) onProgress(50);
    
    // Load ICD-11 in chunks to avoid crash
    const res11 = await fetch('/data/icd/icd11-mms.json');
    const data11 = await res11.json();
    await db.icd11.clear();
    
    const chunkSize = 1000; // Smaller chunks for smaller mock data, user suggested 5000
    for (let i = 0; i < data11.length; i += chunkSize) {
      const chunk = data11.slice(i, i + chunkSize);
      await db.icd11.bulkPut(chunk.map((item: any) => ({ ...item, code_system: 'ICD-11' })));
      
      const progress = 50 + Math.floor((i / data11.length) * 50);
      if (onProgress) onProgress(progress);
    }
    
    if (onProgress) onProgress(100);
  } catch (error) {
    console.error("Failed to initialize ICD database:", error);
    throw error;
  }
}

export async function searchICD(query: string, version: 'ICD-10' | 'ICD-11'): Promise<ICDCode[]> {
  const table = version === 'ICD-10' ? db.icd10 : db.icd11;
  const lowerQuery = query.toLowerCase();
  
  // Dexie filter is flexible. For 70k records, we use filter and limit for performance.
  return await table
    .filter(item => 
      item.code.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    )
    .limit(50)
    .toArray() as ICDCode[];
}
