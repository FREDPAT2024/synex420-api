import { useToast } from '../components/ui/Toast';
import React, { useState, useEffect } from 'react';
import { patientService } from '../lib/dbService';
import { Loader2, Save, User as UserIcon, MapPin, HeartPulse, UserPlus, Phone, X, Info, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../components/workspace/PageHeader';
import { WorkspacePanel } from '../components/workspace/WorkspacePanel';
import { SynexInput } from '../components/ui/SynexInput';
import { SynexSelect } from '../components/ui/SynexSelect';

export default function PatientRegistration() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState<{ years: number; months: number } | null>(null);
  const [formData, setFormData] = useState({
    patientId: `SYN-${Math.floor(Math.random() * 1000000)}`,
    opNo: '',
    ipNo: '',
    firstName: '',
    middleName: '',
    lastName: '',
    sex: '',
    dob: '',
    phone: '',
    nationalId: '',
    patientType: 'OPD',
    paymentMethod: 'Cash',
    countyOfBirth: '',
    residence: '',
    bloodGroup: '',
    allergies: '',
    occupation: '',
    branch: 'Main Branch',
    status: 'Active',
    wardNumber: '',
    bedNumber: '',
    doctorName: '',
    admittedBy: '',
    insuranceProvider: '',
    policyNumber: '',
    guardianName: '',
    guardianPhone: '',
    nextOfKin: {
      name: '',
      phone: '',
      relationship: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (formData.dob) {
      const birthDate = new Date(formData.dob);
      const today = new Date();
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      
      if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
        years--;
        months = (months + 12) % 12;
      }
      
      setAge({ years, months });
    } else {
      setAge(null);
    }
  }, [formData.dob]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Reset error for field on change
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }

    if (name.startsWith('nok.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        nextOfKin: { ...prev.nextOfKin, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.sex) newErrors.sex = "Sex is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.nationalId) newErrors.nationalId = "National ID is required";
    if (!formData.patientType) newErrors.patientType = "Patient type is required";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Payment method is required";
    
    // Phone validation
    const phoneRegex = /^\+254\d{9}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Format must be +254XXXXXXXXX";
    }

    // Guardian validation for minors
    if (age && age.years < 18) {
      if (!formData.guardianName) newErrors.guardianName = "Guardian name is required for minors";
      if (!formData.guardianPhone) {
        newErrors.guardianPhone = "Guardian phone is required for minors";
      } else if (!phoneRegex.test(formData.guardianPhone)) {
        newErrors.guardianPhone = "Format must be +254XXXXXXXXX";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await patientService.registerPatient(formData);
      toast('success', 'Patient Registered', 'ID: ' + formData.patientId);
      // Reset form or redirect logic could go here
    } catch (error) {
      console.error(error);
      toast('error', 'Registration Failed', 'Please check system logs and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full space-y-6 animate-in fade-in duration-700">
      <PageHeader 
        title="Patient Registration" 
        subtitle="Create a new OPD, IPD, or ER record in the Master Patient Index."
        actions={
          <>
            <button 
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <X className="mr-2 h-4 w-4" /> Cancel
            </button>
            <button 
              type="button"
              onClick={handleSubmit} 
              disabled={loading}
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#3B82F6] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Finalize Registration
            </button>
          </>
        }
      />

      <form onSubmit={handleSubmit} className="w-full space-y-8 pb-20">
        {/* Identity & Basic Info */}
        <WorkspacePanel>
          <div className="border-b border-[#E2E8F0] px-8 py-5 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <UserIcon className="text-[#3B82F6]" size={18} />
              Identity & Basic Demographics
            </h3>
            <span className="text-[10px] font-black text-slate-400 bg-white border border-slate-200 px-3 py-1 rounded-full uppercase tracking-widest">
              Standard Protocol 4.0
            </span>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
             <SynexInput 
               label="System Patient ID" 
               value={formData.patientId} 
               disabled 
               className="bg-[#F1F5F9] font-mono font-bold text-slate-600 shadow-inner"
             />
             
             <SynexInput 
               label="First Name" 
               name="firstName" 
               required 
               value={formData.firstName} 
               onChange={handleChange} 
               error={errors.firstName}
               placeholder="Legal first name"
             />

             <SynexInput 
               label="Middle Name" 
               name="middleName" 
               value={formData.middleName} 
               onChange={handleChange} 
               placeholder="Optional"
             />

             <SynexInput 
               label="Last Name" 
               name="lastName" 
               required 
               value={formData.lastName} 
               onChange={handleChange} 
               error={errors.lastName}
               placeholder="Legal last name"
             />

             <div className="relative">
               <SynexSelect 
                 label="Sex" 
                 name="sex" 
                 required 
                 value={formData.sex} 
                 onChange={handleChange} 
                 error={errors.sex}
                 placeholder="Select gender..."
                 options={[
                   { value: 'Male', label: 'Male' },
                   { value: 'Female', label: 'Female' },
                   { value: 'Other', label: 'Other' }
                 ]}
               />
               <div className="absolute right-0 -top-1 group cursor-help">
                 <Info size={14} className="text-slate-300" />
                 <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] rounded shadow-xl hidden group-hover:block z-50">
                   Used for clinical decisions, lab ranges, and prescriptions.
                 </div>
               </div>
             </div>

             <div className="space-y-1.5">
               <div className="flex items-center justify-between">
                 <SynexInput 
                   label="Date of Birth" 
                   name="dob" 
                   type="date" 
                   required 
                   value={formData.dob} 
                   onChange={handleChange} 
                   error={errors.dob}
                   className="w-full"
                 />
                 {age && (
                   <span className="text-[10px] font-black text-[#3B82F6] bg-blue-50 px-2 py-1 rounded border border-blue-100 ml-2 mt-6">
                     Age: {age.years}Y {age.months}M
                   </span>
                 )}
               </div>
             </div>

             <SynexInput 
               label="Phone Number" 
               name="phone" 
               required 
               value={formData.phone} 
               onChange={handleChange} 
               error={errors.phone}
               placeholder="+2547XXXXXXXX"
             />

             <SynexInput 
               label="National ID / Passport" 
               name="nationalId" 
               required 
               value={formData.nationalId} 
               onChange={handleChange} 
               error={errors.nationalId}
               placeholder="Identification No"
             />

             <SynexSelect 
               label="Patient Type" 
               name="patientType" 
               required 
               value={formData.patientType} 
               onChange={handleChange} 
               error={errors.patientType}
               options={[
                 { value: 'OPD', label: 'Outpatient (OPD)' },
                 { value: 'IPD', label: 'Inpatient (IPD)' },
                 { value: 'ER', label: 'Emergency (ER)' }
               ]}
             />

             <SynexSelect 
               label="Payment Method" 
               name="paymentMethod" 
               required 
               value={formData.paymentMethod} 
               onChange={handleChange} 
               error={errors.paymentMethod}
               options={[
                 { value: 'Cash', label: 'Cash' },
                 { value: 'Insurance', label: 'Insurance' },
                 { value: 'Mobile Money', label: 'Mobile Money (M-Pesa)' },
                 { value: 'Corporate', label: 'Corporate Credit' }
               ]}
             />

             <SynexInput 
               label="OP Number" 
               name="opNo" 
               value={formData.opNo} 
               onChange={handleChange} 
               placeholder="e.g. OP-882"
             />

             <SynexInput 
               label="Occupation" 
               name="occupation" 
               value={formData.occupation} 
               onChange={handleChange} 
               placeholder="e.g. Teacher"
             />
          </div>
        </WorkspacePanel>

        {/* Guardian Section for Minors */}
        {age && age.years < 18 && (
          <WorkspacePanel className="border-orange-200 bg-orange-50/10 animate-in slide-in-from-top-4 duration-500">
            <div className="border-b border-orange-100 px-8 py-5 bg-orange-50/50 flex items-center justify-between">
              <h3 className="text-lg font-bold text-orange-900 flex items-center gap-2">
                <ShieldCheck className="text-orange-500" size={18} />
                Guardian Information (Minor Detected)
              </h3>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SynexInput 
                label="Guardian Full Name" 
                name="guardianName" 
                required 
                value={formData.guardianName} 
                onChange={handleChange} 
                error={errors.guardianName}
                placeholder="Name of parent or legal guardian"
              />
              <SynexInput 
                label="Guardian Phone" 
                name="guardianPhone" 
                required 
                value={formData.guardianPhone} 
                onChange={handleChange} 
                error={errors.guardianPhone}
                placeholder="+2547XXXXXXXX"
              />
            </div>
          </WorkspacePanel>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <WorkspacePanel>
              <div className="border-b border-[#E2E8F0] px-8 py-5 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="text-[#3B82F6]" size={18} />
                  Residence & Geographics
                </h3>
              </div>
              <div className="p-8 space-y-6">
                <SynexInput 
                  label="County of Birth" 
                  name="countyOfBirth" 
                  value={formData.countyOfBirth} 
                  onChange={handleChange} 
                />
                <SynexInput 
                  label="Current Residence" 
                  name="residence" 
                  value={formData.residence} 
                  onChange={handleChange} 
                />
              </div>
           </WorkspacePanel>

           <WorkspacePanel>
              <div className="border-b border-[#E2E8F0] px-8 py-5 bg-slate-50/50">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <HeartPulse className="text-[#3B82F6]" size={18} />
                  Clinical Baseline Risk
                </h3>
              </div>
              <div className="p-8 space-y-6">
                <SynexSelect 
                  label="Blood Group" 
                  name="bloodGroup" 
                  value={formData.bloodGroup} 
                  onChange={handleChange} 
                  options={[
                    { value: 'A+', label: 'A+' },
                    { value: 'A-', label: 'A-' },
                    { value: 'B+', label: 'B+' },
                    { value: 'B-', label: 'B-' },
                    { value: 'O+', label: 'O+' },
                    { value: 'O-', label: 'O-' },
                    { value: 'AB+', label: 'AB+' },
                    { value: 'AB-', label: 'AB-' }
                  ]}
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Allergies</label>
                  <textarea 
                    name="allergies" 
                    onChange={handleChange} 
                    value={formData.allergies}
                    className="w-full bg-white border border-[#E2E8F0] rounded-xl p-4 text-sm font-medium focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all shadow-sm min-h-[100px] resize-none" 
                    placeholder="N/A if none"
                  />
                </div>
              </div>
           </WorkspacePanel>
        </div>

        {formData.patientType === 'IPD' && (
           <WorkspacePanel className="animate-in slide-in-from-top duration-500">
              <div className="border-b border-[#E2E8F0] px-8 py-5 bg-blue-50/50">
                <h3 className="text-lg font-bold text-[#3B82F6] flex items-center gap-2">
                  <UserPlus size={18} />
                  Admission Tracking
                </h3>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                <SynexInput label="Ward Number" name="wardNumber" value={formData.wardNumber} onChange={handleChange} />
                <SynexInput label="Bed Number" name="bedNumber" value={formData.bedNumber} onChange={handleChange} />
                <SynexInput label="Doctor Name" name="doctorName" value={formData.doctorName} onChange={handleChange} />
                <SynexInput label="Admitted By" name="admittedBy" value={formData.admittedBy} onChange={handleChange} />
              </div>
           </WorkspacePanel>
        )}

        <WorkspacePanel>
          <div className="border-b border-[#E2E8F0] px-8 py-5 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#3B82F6]" />
              Insurance & Coverage
            </h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <SynexSelect 
                label="Insurance Provider" 
                name="insuranceProvider" 
                value={formData.insuranceProvider} 
                onChange={handleChange} 
                options={[
                  { value: 'NHIF', label: 'NHIF' },
                  { value: 'AAR', label: 'AAR Insurance' },
                  { value: 'Jubilee', label: 'Jubilee Insurance' },
                  { value: 'Britam', label: 'Britam' },
                  { value: 'APA', label: 'APA Insurance' },
                  { value: 'CIC', label: 'CIC General' },
                  { value: 'UAP', label: 'UAP Old Mutual' },
                  { value: 'Other', label: 'Other Insurance' }
                ]}
                placeholder="None / Cash"
              />
              <SynexInput 
                label="Policy / Membership No." 
                name="policyNumber" 
                value={formData.policyNumber} 
                onChange={handleChange} 
                placeholder="e.g. NHIF-12345678" 
              />
          </div>
        </WorkspacePanel>

        <WorkspacePanel>
          <div className="border-b border-[#E2E8F0] px-8 py-5 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Phone className="text-[#3B82F6]" size={18} />
              Emergency Contact (NOK)
            </h3>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <SynexInput 
                label="Full Name" 
                name="nok.name" 
                required 
                value={formData.nextOfKin.name} 
                onChange={handleChange} 
              />
              <SynexInput 
                label="Phone Number" 
                name="nok.phone" 
                required 
                value={formData.nextOfKin.phone} 
                onChange={handleChange} 
              />
              <SynexSelect 
                label="Relationship" 
                name="nok.relationship" 
                required 
                value={formData.nextOfKin.relationship} 
                onChange={handleChange} 
                options={[
                  { value: 'Spouse', label: 'Spouse' },
                  { value: 'Parent', label: 'Parent' },
                  { value: 'Sibling', label: 'Sibling' },
                  { value: 'Child', label: 'Child' },
                  { value: 'Friend', label: 'Friend' },
                  { value: 'Other', label: 'Other' }
                ]}
                placeholder="Select..."
              />
          </div>
        </WorkspacePanel>
      </form>
    </div>
  );
}

